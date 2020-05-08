console.log("Client side javascript is loaded");

const searchInput = document.getElementsByName("location")[0];
const weatherForm = document.getElementsByClassName("search-form")[0];
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  messageOne.textContent = 'Loading...';
  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          return console.log(data.error);
        }
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = 
        `${data.description}. It's ${data.temperature}°C out at ${data.time}. It feels like ${data.feelslike}°C.`;
        messageThree.textContent = `There is ${data.precipitation * 100}% chance of rain.`


      });
    }
  );
});
