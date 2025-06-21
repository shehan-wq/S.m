// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// ... බලාපොරොත්තු වූ full code එක මෙහි ...
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE",
  messagingSenderId: "XXXX",
  appId: "XXX"
};
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #0f0f0f;
  color: #ffffff;
}
header {
  background-color: #1f1f1f;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}
nav {
  margin-top: 10px;
}
nav a {
  color: #00ffcc;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
  transition: color 0.3s ease;
}
nav a:hover {
  color: #ffffff;
}
main {
  padding: 30px;
  line-height: 1.6;
}
ul {
  list-style-type: circle;
  margin-left: 20px;
}
/* WhatsApp Floating Button */
.whatsapp-float {
  position: fixed;
  width: 55px;
  height: 55px;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  border-radius: 50px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
}
.whatsapp-float:hover {
  transform: scale(1.1);
}
.whatsapp-float img {
  width: 30px;
  height: 30px;
}
/* Button styling */
button, .btn {
  background-color: #00ffcc;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}
button:hover, .btn:hover {
  background-color: #00ddb0;
}
/* Firebase Login/Logout Links */
.auth-links {
  position: absolute;
  top: 20px;
  right: 20px;
}
.auth-links a {
  margin-left: 15px;
  color: #cccccc;
  text-decoration: none;
  font-size: 14px;
}
.auth-links a:hover {
  color: #ffffff;
}// Firebase Auth import කරලා තිබ්බොත්:
const auth = getAuth();

// reCAPTCHA verifier එක initialize කරන්න
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',  // or 'invisible'
  'callback': (response) => {
    // reCAPTCHA verified වෙලා තියෙන විට මෙහෙ action එක තියෙනවා
    console.log("reCAPTCHA passed!");
  }
}, auth);

// reCAPTCHA එක render කරන්න
recaptchaVerifier.render();
signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
  .then(confirmationResult => {
    window.confirmationResult = confirmationResult;
    // OTP යවලා තියෙනවා කියලා පණිවිඩයක් දක්වන්න
  })
  .catch(error => {
    console.log(error);
  });
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5IEqFLj25Syik7SBUCTrS7xHDEGJU9OI",
  authDomain: "fir-m-auth.firebaseapp.com",
  projectId: "fir-m-auth",
  storageBucket: "fir-m-auth.appspot.com",
  messagingSenderId: "506358518430",
  appId: "1:506358518430:web:4b3994472cef39e671a18f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    console.log("reCAPTCHA verified!");
  }
}, auth);
recaptchaVerifier.render();

document.getElementById('sendOTP').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phone').value;
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    alert("OTP Sent!");
  } catch (error) {
    console.error(error);
    alert("OTP send error: " + error.message);
  }
});

document.getElementById('verifyOTP').addEventListener('click', async () => {
  const otp = document.getElementById('otp').value;
  try {
    const result = await window.confirmationResult.confirm(otp);
    alert("Phone verified!");
  } catch (error) {
    alert("Invalid OTP");
  }
});