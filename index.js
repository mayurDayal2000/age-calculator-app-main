const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { day, month, year } = event.target;

  console.log(isNaN(Number(day.value)));
});
