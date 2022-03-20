import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
} from "./candy-machine";
import * as anchor from "@project-serum/anchor";
import { AlertState, toDate } from "./utils";
import { MintState } from "../mint-indicator/mint-state.const";

const CandyMachineContext = createContext<CandyMachineContextState>(null);
const txTimeoutInMilliseconds = 30000;

export interface CandyItemsState {
  available: number;
  redeemed: number;
}

export interface CandyMachineContextState {
  candyMachine?: CandyMachineAccount;
  wallet: WalletContextState;
  anchorWallet?: anchor.Wallet;
  isActive: boolean;
  itemsState: CandyItemsState;
  mintStartDate: Date;
  mintEndDate: Date;
  mintState: MintState;
  onMint: () => Promise<void>;
  isUserMinting: boolean;
  alertState: AlertState;
  setAlertState: Dispatch<SetStateAction<AlertState>>;
}

export const CandyMachineProvider = ({
  candyMachineId,
  connection,
  children,
}) => {
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [isActive, setIsActive] = useState(false);
  const [endDate, setEndDate] = useState<Date>();
  const [itemsState, setItemsState] = useState<CandyItemsState>();
  const [mintState, setMintState] = useState<MintState>(MintState.NOT_STARTED);
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (candyMachineId) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          candyMachineId,
          connection
        );
        let active =
          cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
        if (active) {
          setMintState(MintState.STARTED);
        }
        // datetime to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.date) {
          setEndDate(toDate(cndy.state.endSettings.number));
          if (
            cndy.state.endSettings.number.toNumber() <
            new Date().getTime() / 1000
          ) {
            active = false;
            setMintState(MintState.COMPLETED);
          }
        }
        // amount to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.amount) {
          let limit = Math.min(
            cndy.state.endSettings.number.toNumber(),
            cndy.state.itemsAvailable
          );
          if (cndy.state.itemsRedeemed < limit) {
            setItemsState({
              available: limit,
              redeemed: cndy.state.itemsRedeemed,
            });
          } else {
            setItemsState({
              available: limit,
              redeemed: limit,
            });
            cndy.state.isSoldOut = true;
          }
        } else {
          setItemsState({
            available: cndy.state.itemsAvailable,
            redeemed: cndy.state.itemsRedeemed,
          });
        }

        if (cndy.state.isSoldOut) {
          active = false;
          setMintState(MintState.SOLD_OUT);
        }

        setIsActive((cndy.state.isActive = active));
        setCandyMachine(cndy);
      } catch (e) {
        console.log("There was a problem fetching Candy Machine state");
        console.log(e);
      }
    }
  }, [anchorWallet, candyMachineId, connection]);

  useEffect(() => {
    refreshCandyMachineState();
  }, [anchorWallet, refreshCandyMachineState]);

  const onMint = async () => {
    try {
      setIsUserMinting(true);
      document.getElementById("#identity")?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            txTimeoutInMilliseconds,
            connection,
            true
          );
        }

        if (status && !status.err) {
          // manual update since the refresh might not detect
          // the change immediately
          let redeemed = itemsState.redeemed + 1;
          let remaining = itemsState.available - redeemed;
          setItemsState({
            available: itemsState.available,
            redeemed: redeemed,
          });
          setIsActive((candyMachine.state.isActive = remaining > 0));
          candyMachine.state.isSoldOut = remaining == 0;
          if (remaining == 0) {
            setMintState(MintState.SOLD_OUT);
          }
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
      // updates the candy machine state to reflect the lastest
      // information on chain
      refreshCandyMachineState();
    } finally {
      setIsUserMinting(false);
    }
  };

  return (
    <CandyMachineContext.Provider
      value={{
        candyMachine: candyMachine,
        wallet: wallet,
        anchorWallet: anchorWallet,
        isActive: isActive,
        itemsState: itemsState,
        mintStartDate: toDate(candyMachine?.state.goLiveDate),
        mintEndDate: endDate,
        mintState: mintState,
        onMint: onMint,
        isUserMinting: isUserMinting,
        alertState: alertState,
        setAlertState: setAlertState,
      }}
    >
      {children}
    </CandyMachineContext.Provider>
  );
};

export const useCandyMachine = () => useContext(CandyMachineContext);
