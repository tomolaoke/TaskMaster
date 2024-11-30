document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
  
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        const data = { name, email, password };
  
        try {
          const response = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
  
          if (response.ok) {
            alert("Sign-up successful!");
            window.location.href = "index.html"; // Redirect to login or homepage
          } else {
            const error = await response.json();
            alert(`Sign-up failed: ${error.message}`);
          }
        } catch (err) {
          console.error("Error during sign-up:", err);
          alert("An error occurred. Please try again.");
        }
      });
    } else {
      console.error("Sign-up form not found");
    }
  });
  