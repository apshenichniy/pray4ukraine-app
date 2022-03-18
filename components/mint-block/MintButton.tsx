import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { CandyMachineAccount } from "./candy-machine";
import styles from "./Mint.module.scss";

export interface MintButtonProps {
  onMint: () => Promise<void>;
  candyMachine?: CandyMachineAccount;
  isMinting: boolean;
  isActive: boolean;
}

export const MintButton = ({
  onMint,
  candyMachine,
  isMinting,
  isActive,
}: MintButtonProps) => {
  const { requestGatewayToken, gatewayStatus } = useGateway();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
      onMint();
      setClicked(false);
    }
  }, [gatewayStatus, clicked, setClicked, onMint]);

  const getMintButtonContent = () => {
    if (candyMachine?.state.isSoldOut) {
      return "Sold Out";
    } else if (isMinting) {
      return <CircularProgress />;
    } else if (
      candyMachine?.state.isPresale ||
      candyMachine?.state.isWhitelistOnly
    ) {
      return "Whitelist Mint";
    } else if (clicked && candyMachine?.state.gatekeeper) {
      return <CircularProgress />;
    } else if (!isActive) {
      return "Mint Ended";
    }

    return "Mint Now";
  };

  return (
    <button
      className={styles.connectButton + " button"}
      disabled={clicked || isMinting || !isActive}
      onClick={async () => {
        setClicked(true);
        if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
          if (gatewayStatus === GatewayStatus.ACTIVE) {
            setClicked(true);
          } else {
            await requestGatewayToken();
          }
        } else {
          await onMint();
          setClicked(false);
        }
      }}
    >
      {getMintButtonContent()}
    </button>
  );
};
