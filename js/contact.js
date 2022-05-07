const form = document.querySelector("#contact-form");
form.onsubmit = () => {
  // prevention default submission occurs
  event.preventDefault();
  const name = document.querySelector("#name");
  const subject = document.querySelector("#subject");
  const email = document.querySelector("#email");
  const address = document.querySelector("#address");

  const errorsContainer = document.querySelector("#errors");
  const success = document.querySelector("#success");

  // to clean previous submission
  errorsContainer.innerHTML = "";
  success.innerHTML = "";

  const errors = [];

  // test name field
  if (name.value.trim().length < 1) {
    errors.push("Name required.");
  }

  //test subject field
  if (subject.value.trim().length < 10) {
    errors.push("Subject requires at least 10 characters");
  }
  // test email field using regex
  const emailValue = email.value.trim();
  if (
    !emailValue.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.push("Please insert valid email.");
  }

  // test address
  if (address.value.trim().length < 25) {
    errors.push("Address requires at least 25 characters");
  }
  if (errors.length) {
    let content = "";
    for (let i = 0; i < errors.length; i++) {
      content += `<li><strong>${errors[i]}</strong></li>`;
    }
    errorsContainer.innerHTML = content;
  } else {
    success.innerHTML = "Form submitted with success!";
  }
};
