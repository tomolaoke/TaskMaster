const API_URL_SIGNUP = 'http://localhost:5000/api/users/signup';
const API_URL_LOGIN = 'http://localhost:5000/api/users/login';

document.addEventListener('DOMContentLoaded', () => {
  // Handle "Sign Up" Button Click
  const signupBtn = document.getElementById('signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      window.location.href = 'signup.html'; // Redirect to the registration page
    });
  }

  // Handle Login Modal
  const loginModal = document.getElementById('login-modal');
  const closeModal = document.getElementById('close-modal');
  const loginBtn = document.getElementById('login-btn');

  if (loginBtn && loginModal && closeModal) {
    // Open Login Modal
    loginBtn.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });

    // Close Login Modal
    closeModal.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    // Close modal on outside click
    window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });
  }

  // Handle Login Form Submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const response = await fetch(API_URL_LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token; // Assume response contains the token
          if (token) {
            localStorage.setItem('authToken', token); // Store token securely
            alert('Login successful!');
            // Redirect to the dashboard
            window.location.href = 'task.html';
          } else {
            throw new Error('Token not provided in response');
          }
        } else {
          const error = await response.json();
          alert(error.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again later.');
      }
    });
  }
});
