function getInputAndDisplayData(){
    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
        const input = document.getElementsByName('birthday')[0].value;
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/
        if(regex.test(input)){
            const p = document.getElementsByClassName('card-text')[0];
            p.textContent = ' ';  
            const factDiv = document.getElementsByClassName('fact')[0];
            factDiv.style.display = "inline"
            birthdayToday(input);      
            fetchOnThisDay(input);
            fecthTrivia(input);
        } else {
            alert('Please enter a valid date in this format: MM/DD');
        }
    })
}

function fetchOnThisDay(input){
    fetch(`http://numbersapi.com/${input}/date?json`, {headers:{'content-type': 'application/json'}})
          .then((res) => res.json())
          .then((data) => {
                onThisDay(data);
            })
          .catch((err) => {
            console.log('Fetch Error : ', err);
          });
}

function fecthTrivia(input){
  const dateArray = input.split('/');
  let mm = dateArray[0];
  const dd = dateArray[1];

    if (mm < 10) {
      mm = mm.replace(/^0+/g, '');
    }

    if (dd < 10) {
      dd = dd.replace(/^0+/g, '');
    }
  
  fetch(`http://numbersapi.com/${mm}?json`, {headers:{'content-type': 'application/json'}})
          .then((res) => res.json())
          .then((data) => {
                monthTrivia(data);
            })
          .catch((err) => {
            console.log('Fetch Error : ', err);
          });
  fetch(`http://numbersapi.com/${dd}?json`, {headers:{'content-type': 'application/json'}})
          .then((res) => res.json())
          .then((data) => {
                dayTrivia(data);
            })
          .catch((err) => {
            console.log('Fetch Error : ', err);
          });
}

function birthdayToday(input){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = mm + '/' + dd;
    
    const birthdayMsg = document.getElementsByClassName('birthday-msg')[0];
    if(input === today){
        birthdayMsg.style.display = "inline";
    } else {
      birthdayMsg.style.display = "none";      
    }
}

function onThisDay(data){
  const onThisDay = document.getElementsByClassName('onThisDay')[0]
  const text = document.createTextNode(data.text);
  onThisDay.appendChild(text);
}

function monthTrivia(data){
  const trivia = document.getElementsByClassName('monthTrivia')[0]
  const text = document.createTextNode(data.text);
  trivia.appendChild(text);
}

function dayTrivia(data){
  const trivia = document.getElementsByClassName('dayTrivia')[0]
  const text = document.createTextNode(data.text);
  trivia.appendChild(text);
}

window.onload = function () {
    getInputAndDisplayData();
}