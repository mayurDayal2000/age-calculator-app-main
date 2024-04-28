const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const results = document.querySelectorAll(".age-results span");

inputs.forEach((input) =>
  input.addEventListener("focus", (event) => {
    event.target.parentElement.classList.remove("error-input");
    event.target.nextElementSibling.textContent = "";
  })
);

function validateInputs(day, month, year) {
  const today = new Date();

  const daysCount = [31, isLeapYear(year.value) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const validateInput = (input, max, errorMsg) => {
    if (!input.value || input.value < 0 || input.value > max) {
      input.parentElement.classList.add("error-input");
      input.nextElementSibling.textContent = errorMsg;
    } else {
      input.parentElement.classList.remove("error-input");
      input.nextElementSibling.textContent = "";
    }
  };

  validateInput(day, daysCount[month.value - 1], !day.value ? "This field is required" : "Must be a valid day");
  validateInput(month, 12, !day.value ? "This field is required" : "Must be a valid month");
  validateInput(year, today.getFullYear(), !day.value ? "This field is required" : year.value > today.getFullYear() ? "Must be in the past" : "Must be a valid year");
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function calculateAge(day, month, year) {
  const daysCount = [31, isLeapYear(year.value) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const dayValidate = day.value && day.value > 0 && day.value <= daysCount[month.value - 1];
  const monthValidate = month.value && month.value > 0 && month.value <= 12;
  const yearValidate = year.value && year.value > 0 && year.value <= new Date().getFullYear();

  if (dayValidate && monthValidate && yearValidate) {
    const inputDate = new Date(year.value, month.value - 1, day.value);
    const today = new Date();

    let years = today.getFullYear() - inputDate.getFullYear();
    let months = today.getMonth() - inputDate.getMonth();
    let days = today.getDate() - inputDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    return [years, months, days];
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { day, month, year } = event.target.elements;

  validateInputs(day, month, year);

  const age = calculateAge(day, month, year);

  if (age) {
    results.forEach((result, index) => {
      result.textContent = age[index];
    });
  }
});

form.reset();
