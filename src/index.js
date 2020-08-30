import './styles.scss';

const spanDays = document.querySelector('.value[data-value="days"]');
const spanHours = document.querySelector('.value[data-value="hours"]');
const spanMins = document.querySelector('.value[data-value="mins"]');
const spanSecs = document.querySelector('.value[data-value="secs"]');

class CountdownTimer {
  constructor({
    selector,
    targetDate,
    time = 0,
    days = 0,
    hours = 0,
    mins = 0,
    secs = 0,
  }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.time = time;
    this.days = days;
    this.hours = hours;
    this.mins = mins;
    this.secs = secs;
  }

  leftTime() {
    return (this.time = this.targetDate - Date.now());
  }

  leftDays() {
    this.days = Math.floor(this.leftTime() / (1000 * 60 * 60 * 24));
  }

  leftHours() {
    this.hours = Math.floor(
      (this.leftTime() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
  }

  leftMins() {
    this.mins = Math.floor((this.leftTime() % (1000 * 60 * 60)) / (1000 * 60));
  }

  leftSeconds() {
    this.secs = Math.floor((this.leftTime() % (1000 * 60)) / 1000);
  }

  updateTime() {
    if (this.time >= 0) {
      this.leftDays();
      this.leftHours();
      this.leftMins();
      this.leftSeconds();
    } else {
      clearInterval(intervalId);
      this.days = 0;
      this.hours = 0;
      this.mins = 0;
      this.secs = 0;
      return;
    }
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 31,2020'),
});

let intervalId = null;
intervalId = setInterval(checkTheTime, 1000);
function checkTheTime() {
  timer.updateTime();
  spanDays.textContent = pad(timer.days);
  spanHours.textContent = pad(timer.hours);
  spanMins.textContent = pad(timer.mins);
  spanSecs.textContent = pad(timer.secs);
}

function pad(value) {
  return String(value).padStart(2, 0);
}
