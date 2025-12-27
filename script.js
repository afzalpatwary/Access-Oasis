(function () {
  emailjs.init("Y89vWKbOySYFIyrH7");
})();

const form = document.getElementById("signupForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Invisible CAPTCHA (honeypot)
  if (form.company.value) {
    return; // bot detected, silently stop
  }

  if (!form.email.value) {
    confirmation.textContent = "Please enter a valid email address.";
    confirmation.classList.remove("success");
    return;
  }

  confirmation.textContent = "Submitting...";
  confirmation.classList.remove("success");

  const templateParams = {
    name: form.name.value || "Not provided",
    email: form.email.value,
    updates: form.updates.checked ? "Yes" : "No",
    notes: form.notes.value || "None"
  };

  // 1️⃣ Send admin email
  emailjs.send(
    "service_t04cgsc",
    "template_xrlr4pb",
    templateParams
  )
  .then(() => {
    // 2️⃣ Send auto-reply email
    return emailjs.send(
      "service_t04cgsc",
      "template_s3d7925",
      templateParams
    );
  })
  .then(() => {
    confirmation.textContent = "Submitted, thank you!";
    confirmation.classList.add("success"); // ✅ green text
    form.reset();
  })
  .catch(() => {
    confirmation.textContent =
      "There was an error sending your submission. Please try again.";
    confirmation.classList.remove("success");
  });
});
