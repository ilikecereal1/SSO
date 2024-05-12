const searchParams = new URLSearchParams(window.location.search);
const userdata = [
  {
    email: "admin@ravenfuture.com",
    userPassword:
      "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
  },
];

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function hashValue(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

function check() {
  for (let i = 0; i < userdata.length; i++) {
    if (getCookie("token") == userdata[i]["email"]) {
      document.getElementById("status").textContent = "Status: Logged in";
    } else {
      window.location.href = `login?next=${window.location}`;
    }
  }
}

function login() {
  for (let i = 0; i < userdata.length; i++) {
    if (getCookie("token") == userdata[i]["email"]) {
      window.location = searchParams.get("next");
    }
  }
  let found = false;
  let email = prompt("Kindly enter your DJX or primary RavenFuture email.");
  for (let i = 0; i < userdata.length; i++) {
    if (email == userdata[i]["email"]) {
      found = true;
      let password = prompt(
        "Kindly enter your respective password for your account."
      );
      console.log(password);
      hashValue(password).then((hash) => {
        if (hash == userdata[i]["userPassword"]) {
          alert("Password is correct, kindly wait as we redirect you.");
          window.location = searchParams.get("next");
          setCookie("token", email, 30);
        } else {
          alert("Incorrect password, unable to redirect you, please retry.");
        }
      });
    }
  }
  if (!found) {
    alert("No account found.");
  }
}
