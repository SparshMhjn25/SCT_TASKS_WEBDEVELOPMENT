  let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  let display = document.getElementById("display");
  let laps = document.getElementById("laps");
  let timer = null;
  let running = false;

  function updateDisplay() {
    let h = hours.toString().padStart(2, '0');
    let m = minutes.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');
    let ms = milliseconds.toString().padStart(3, '0');
    display.textContent = `${h}:${m}:${s}:${ms}`;
  }

  function stopwatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }

  function startStop() {
    if (!running) {
      timer = setInterval(stopwatch, 10); // run every 10ms
      running = true;
    }
  }

  function pause() {
    clearInterval(timer);
    running = false;
  }

  function reset() {
    clearInterval(timer);
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    updateDisplay();
    laps.innerHTML = "";
    running = false;
  }

  function lap() {
    if (running) {
      let li = document.createElement("div");
      li.classList.add("lap");
      li.textContent = display.textContent;
      laps.appendChild(li);
    }
  }

