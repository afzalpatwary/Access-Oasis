(function () {
  emailjs.init("Y89vWKbOySYFIyrH7");
})();

const form = document.getElementById("signupForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Honeypot protection
  if (form.company.value) return;

  if (!form.email.value) {
    confirmation.textContent = "Please enter a valid email address.";
    return;
  }

  confirmation.textContent = "Submitting…";

  const templateParams = {
    name: form.name.value || "Not provided",
    email: form.email.value,
    updates: form.updates.checked ? "Yes" : "No",
    notes: form.notes.value || "None"
  };

  // Send admin email
  emailjs
    .send("service_t04cgsc", "template_xrlr4pb", templateParams)
    .then(() => {
      // Send auto-reply
      return emailjs.send(
        "service_t04cgsc",
        "template_s3d7925",
        templateParams
      );
    })
    .then(() => {
      // Accessible confirmation
      confirmation.textContent = "Submitted, thank you! Redirecting…";

      // WCAG-friendly delay before redirect
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 1200);
    })
    .catch(() => {
      confirmation.textContent =
        "There was an error sending your submission. Please try again.";
    });
});
