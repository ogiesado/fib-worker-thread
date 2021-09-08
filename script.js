const out = document.getElementById("out");
const input = document.getElementById("input");
const startButton = document.getElementById("start");
const errorMessage = document.getElementById("error");

const write = ({ prefix = "", message } = {}) => {
  const msg = createMessage(`${prefix}${message}`);
  out.appendChild(msg);

  return msg;
};

const createMessage = (message) => {
  const p = document.createElement("p");
  p.classList.add("message");
  p.textContent = message;

  return p;
};

const showError = (message) => {
  errorMessage.textContent = message;
};

const clearError = () => {
  showError("");
};

input.addEventListener("input", clearError);

const getFibonacci = () => {
  if (!/^[1-9][0-9]*/.test(input.value)) {
    showError("Enter a valid number");
    return;
  }

  const number = parseInt(input.value, 10);

  input.value = "";

  const worker = new Worker("worker.js");

  const msg = write({ message: `${number}: ` });

  let count = 0;

  const interval = setInterval(() => {
    let text;

    if (count >= 3) {
      count = 0;
      text = msg.textContent.substring(0, msg.textContent.length - 3);
    } else {
      count++;
      text = `${msg.textContent}.`;
    }

    msg.textContent = text;
  }, 1000);

  worker.postMessage(number);

  worker.onmessage = (e) => {
    clearInterval(interval);
    msg.textContent = `${msg.textContent.substring(
      0,
      msg.textContent.length - count
    )} ${e.data}`;
  };
};

startButton.addEventListener("click", getFibonacci);
