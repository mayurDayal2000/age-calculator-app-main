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

  if (!day.value || day.value < 0 || day.value > 31) {
    day.parentElement.classList.add("error-input");
    day.nextElementSibling.textContent = !day.value ? "This field is required" : "Must be a valid day";
  } else {
    day.parentElement.classList.remove("error-input");
    day.nextElementSibling.textContent = "";
  }

  if (!month.value || month.value < 0 || month.value > 12) {
    month.parentElement.classList.add("error-input");
    month.nextElementSibling.textContent = !day.value ? "This field is required" : "Must be a valid month";
  } else {
    month.parentElement.classList.remove("error-input");
    month.nextElementSibling.textContent = "";
  }

  if (!year.value || year.value < 0 || year.value > today.getFullYear()) {
    year.parentElement.classList.add("error-input");
    year.nextElementSibling.textContent = !day.value ? "This field is required" : year.value > today.getFullYear() ? "Must be in the past" : "Must be a valid year";
  } else {
    year.parentElement.classList.remove("error-input");
    year.nextElementSibling.textContent = "";
  }
}

function calculateAge(day, month, year) {
  const dayValidate = day.value && day.value > 0 && day.value <= 31;
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

  results.forEach((result, index) => {
    result.textContent = age[index];
  });
});

form.reset();
