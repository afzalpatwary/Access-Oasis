(function () {
  emailjs.init("Y89vWKbOySYFIyrH7");
})();

const form = document.getElementById("signupForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Invisible CAPTCHA (honeypot)
  if (form.company.value) {
    return;
  }

  // Basic email validation
  if (!form.email.value) {
    confirmation.textContent = "Please enter a valid email address.";
    confirmation.style.color = "#b00020"; // accessible red
    return;
  }

  confirmation.textContent = "Submitting...";
  confirmation.style.color = "#000";

  const templateParams = {
    name: form.name.value || "Not provided",
    email: form.email.value,
    updates: form.updates.checked ? "Yes" : "No",
    notes: form.notes.value || "None"
  };

  // 1️⃣ Send admin notification
  emailjs
    .send("service_t04cgsc", "template_xrlr4pb", templateParams)
    .then(() => {
      // 2️⃣ Send auto-reply to user
      return emailjs.send(
        "service_t04cgsc",
        "template_s3d7925",
        templateParams
      );
    })
    .then(() => {
      confirmation.textContent = "Submitted, thank you!";
      confirmation.style.color = "#1b7f3a"; // accessible green
      form.reset();
    })
    .catch(() => {
      confirmation.textContent =
        "There was an error sending your submission. Please try again.";
      confirmation.style.color = "#b00020";
    });
});
