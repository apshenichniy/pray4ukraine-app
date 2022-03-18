import { intervalToDuration, isBefore } from 'date-fns';
import React from 'react';
import { TimerSize } from './timer-size.const';
import styles from './Timer.module.scss';

function addZero(number) {
  return parseInt(number, 10) < 10 ? '0' + number : number;
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getTimerInfo(null),
    };
  }

  componentDidMount() {
    this.tick();
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      ...this.getTimerInfo(this.props.date),
    });
  }

  getTimerInfo(date) {
    const result = {
      days: 0,
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    if (!targetDate) {

      return result;
    }
    const currentDate = new Date();
    currentDate.setMilliseconds(0);
    if (isBefore(targetDate, currentDate)) {
      
      return result;
    }
    const duration = intervalToDuration({
      start: currentDate,
      end: targetDate,
    });

    result.days = duration.days;
    result.hours = addZero(duration.hours);
    result.minutes = addZero(duration.minutes);
    result.seconds = addZero(duration.seconds);

    return result;
  }

  render() {
    const { size } = this.props;
    return (
      <div className={`${styles.Timer} ${size === TimerSize.SMALL ? styles.small : null}`}>
        <div className={styles.unit}>
          <div className={styles.counter}>{this.state.days}</div>
          <div className={styles.unitName}>days</div>
          <div className={styles.mobileUnitName}>day</div>
        </div>
        <div className={styles.unit}>
          <div className={styles.counter}>{this.state.hours}</div>
          <div className={styles.unitName}>hours</div>
          <div className={styles.mobileUnitName}>hour</div>
        </div>
        <div className={styles.unit}>
          <div className={styles.counter}>{this.state.minutes}</div>
          <div className={styles.unitName}>minutes</div>
          <div className={styles.mobileUnitName}>min</div>
        </div>
        <div className={styles.unit}>
          <div className={styles.counter}>{this.state.seconds}</div>
          <div className={styles.unitName}>seconds</div>
          <div className={styles.mobileUnitName}>sec</div>
        </div>
      </div>
    )
  }
}

export default Timer;