import { formatDuration, intervalToDuration, isBefore } from 'date-fns';
import React from 'react';
import styles from './Timer.module.scss';

function addZero(number) {
  return parseInt(number, 10) < 10 ? '0' + number : number;
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getTimerInfo(this.props.date),
    };
  }

  componentDidMount() {
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
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    if (!targetDate) {

      return result;
    }
    const currentDate = new Date();
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
    return (
      <div className={styles.Timer}>
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