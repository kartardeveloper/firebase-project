import { getDatabase, ref, set, push } from "firebase/database";

const db = getDatabase();

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const jobType = document.querySelector("#job-type");
const age = document.querySelector("#age");
const phoneNumber = document.querySelector("#phone-number");
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    firstName.value == "" ||
    lastName.value == "" ||
    jobType.value == "" ||
    age.value == "" ||
    phoneNumber.value == ""
  ) {
    alert("Please fill out all fields!");
  } else {
    const users = ref(db, "users");
    const newUsers = push(users);
    set(newUsers, {
      firstName: firstName.value,
      lastName: lastName.value,
      jobType: jobType.value,
      age: age.value,
      phoneNumber: phoneNumber.value,
    });
    clearFields();
  }
});

function clearFields() {
  firstName.value = "";
  lastName.value = "";
  jobType.value = "";
  age.value = "";
  phoneNumber.value = "";
}