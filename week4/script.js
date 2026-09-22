document.getElementById("loginForm").addEventListener("submit", function(event) {

    // Prevent form from submitting normally
    event.preventDefault();

    // Get username and password
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let errorMessage = document.getElementById("errorMessage");

    // Validation 1: Empty fields
    if (username === "" && password === "") {

        errorMessage.innerHTML = "Please enter username and password.";
        return;
    }

    // Validation 2: Username empty
    if (username === "") {

        errorMessage.innerHTML = "Please enter username.";
        return;
    }

    // Validation 3: Password empty
    if (password === "") {

        errorMessage.innerHTML = "Please enter password.";
        return;
    }

    // Demo login credentials
    if (username === "admin" && password === "1234") {

        // Store login time
        let loginTime = new Date().toLocaleString();

        localStorage.setItem("loginTime", loginTime);

        // Redirect to success page
        window.location.href = "success.html";

    } else {

        errorMessage.innerHTML = "Invalid Username or Password.";

    }

});