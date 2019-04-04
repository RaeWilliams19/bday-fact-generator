function getInputAndDisplayData() {
  const button = document.getElementsByTagName('button')[0];

  button.addEventListener('click', () => {
    let input = document.getElementsByName('birthday')[0].value;
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/
    const error = document.getElementsByClassName('error-message')[0];

    if (regex.test(input)) {
      const p = document.getElementsByClassName('card-text')[0];
      const factDiv = document.getElementsByClassName('fact')[0];

      error.style.display = "none"
      p.textContent = ' ';
      factDiv.style.display = "inline"

      birthdayToday(input);
      fetchOnThisDay(input);
      fecthTrivia(input);
    } else {
      error.style.display = "inline"
    }
  })
}

function fetchOnThisDay(input) {
  fetch(`http://numbersapi.com/${input}/date?json`)
    .then((res) => res.json())
    .then((data) => {
      onThisDay(data);
    })
    .catch((err) => {
      console.log('Fetch Error : ', err);
    });
}

function fecthTrivia(input) {
  const dateArray = input.split('/');
  const mm = removeLeadingZero(dateArray[0]);
  const dd = removeLeadingZero(dateArray[1]);

  fetch(`http://numbersapi.com/${mm}?json`)
    .then((res) => res.json())
    .then((data) => {
      writeTrivia(data, 'monthTrivia');
    })
    .catch((err) => {
      console.log('Fetch Error : ', err);
    });

  fetch(`http://numbersapi.com/${dd}?json`)
    .then((res) => res.json())
    .then((data) => {
      writeTrivia(data, 'dayTrivia');
    })
    .catch((err) => {
      console.log('Fetch Error : ', err);
    });
}

function birthdayToday(input) {
  let today = new Date();
  const dd = addLeadingZero(today.getDate());
  const mm = addLeadingZero(today.getMonth() + 1); 
  
  today = mm + '/' + dd;
  
  const birthdayMsg = document.getElementsByClassName('birthday-msg')[0];
  birthdayMsg.style.display = input === today ? "inline" : "none";
}

function addLeadingZero(num) {
  return num < 10 ? num = '0' + num : num;
}

function removeLeadingZero(num) {
  return num < 10 ? num.replace(/^0+/g, '') : num;
}

function onThisDay(data) {
  const onThisDay = document.getElementsByClassName('onThisDay')[0]
  const text = document.createTextNode(data.text);
  onThisDay.appendChild(text);
}

function writeTrivia(data, className){
  const trivia = document.getElementsByClassName(className)[0]
  const text = document.createTextNode(data.text);
  trivia.appendChild(text);
}

window.onload = function () {
  getInputAndDisplayData();
}
