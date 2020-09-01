import './styles.scss';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
    this.spanDays = document.querySelector(
      `${this.selector} .value[data-value="days"]`,
    );
    this.spanHours = document.querySelector(
      `${this.selector} .value[data-value="hours"]`,
    );
    this.spanMins = document.querySelector(
      `${this.selector} .value[data-value="mins"]`,
    );
    this.spanSecs = document.querySelector(
      `${this.selector} .value[data-value="secs"]`,
    );

    this._startTimer();
  }

  _leftTime() {
    const time = this.targetDate - Date.now();

    time > 0 ? this._calculateTime(time) : this._stopTimer();
  }

  _calculateTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this._updateTimeState(days, hours, mins, secs);
  }

  _updateTimeState(days, hours, mins, secs) {
    this.spanDays.textContent = this.pad(days);
    this.spanHours.textContent = this.pad(hours);
    this.spanMins.textContent = this.pad(mins);
    this.spanSecs.textContent = this.pad(secs);
  }

  _startTimer() {
    this._leftTime();

    this.intervalId = setInterval(() => {
      this._leftTime();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    console.log(this.intervalId);
  }

  pad(value) {
    return String(value).padStart(2, 0);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Apr 21,2021'),
});
