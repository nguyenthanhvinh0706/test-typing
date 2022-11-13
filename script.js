let TIME_LIMIT = 60;
let quotes_array = [
  "Vinh đi xe đạp bị ngã hôm qua.",
  "Chill đi cứ chill đi.",
  "Thanh không làm bài tập về nhà.",
  "Thao muốn mua 1 chiêc điện thoại mới",
  "Tôi thấy hoa vàn trên cỏ xanh."
];

let timer_text = document.querySelector(".curr_time");
let error_text = document.querySelector(".curr_errors");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let start_btn = document.querySelector(".start_btn");
let error_group = document.querySelector(".errors");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  curr_input = input_area.value;
  curr_input_array = curr_input.split('');
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      errors++;
    }
  });

  error_text.textContent = total_errors + errors;
  if (curr_input.length == current_quote.length) {
    updateQuote();
    total_errors += errors;
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timer_text.textContent = timeLeft + "s";
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  input_area.disabled = true;
  quote_text.textContent = "Ấn nút Restart để bắt đầu game mới.";
  restart_btn.style.display = "block";

}


function startGame() {

  resetValues();
  updateQuote();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  start_btn.style.display = "none"
  
}


function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Ấn vào nút Start để bắt đầu gõ.';
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  start_btn.style.display = "block";
  
}
