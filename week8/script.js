// ======================================================
// REGISTER
// ======================================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const formData =
                new FormData(registerForm);


            const data =
                Object.fromEntries(
                    formData.entries()
                );


            try {

                const response =
                    await fetch(
                        "/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                const result =
                    await response.json();


                const message =
                    document.getElementById(
                        "registerMessage"
                    );


                message.innerText =
                    result.message;


                if (result.success) {

                    message.style.color =
                        "green";


                    registerForm.reset();


                    setTimeout(
                        function () {

                            window.location.href =
                                "/login.html";

                        },
                        1500
                    );

                } else {

                    message.style.color =
                        "red";

                }

            } catch (error) {

                console.error(error);

                document.getElementById(
                    "registerMessage"
                ).innerText =
                    "Server error. Please try again.";

            }

        }
    );

}


// ======================================================
// LOGIN
// ======================================================

// ======================================================
// LOGIN
// ======================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        try {

            const response = await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })

            });


            const result = await response.json();

            console.log("Login response:", result);


            const message =
                document.getElementById("loginMessage");


            if (result.success) {

                message.innerText =
                    "Login successful! Redirecting...";

                message.style.color = "green";


                // Save logged-in user
                sessionStorage.setItem(
                    "loggedUser",
                    JSON.stringify(result.user)
                );


                // Redirect to dashboard
                setTimeout(function () {

                    window.location.href =
                        "/dashboard.html";

                }, 500);


            } else {

                message.innerText =
                    result.message;

                message.style.color = "red";

            }


        } catch (error) {

            console.error("Login error:", error);

            document.getElementById(
                "loginMessage"
            ).innerText =
                "Unable to connect to server.";

        }

    });

}


// ======================================================
// LOAD QUIZ QUESTIONS
// ======================================================

const questionsDiv =
    document.getElementById(
        "questions"
    );


if (questionsDiv) {

    loadQuestions();

}


let questions = [];


async function loadQuestions() {

    try {

        const response =
            await fetch(
                "/api/questions"
            );


        questions =
            await response.json();


        questionsDiv.innerHTML = "";


        questions.forEach(
            function (question, index) {

                const questionDiv =
                    document.createElement(
                        "div"
                    );


                questionDiv.className =
                    "question";


                let optionsHTML = "";


                question.options.forEach(
                    function (option) {

                        optionsHTML += `

                            <label class="option">

                                <input
                                    type="radio"
                                    name="question${index}"
                                    value="${option}"
                                >

                                ${option}

                            </label>

                        `;

                    }
                );


                questionDiv.innerHTML = `

                    <h3>
                        ${index + 1}.
                        ${question.question}
                    </h3>

                    ${optionsHTML}

                `;


                questionsDiv.appendChild(
                    questionDiv
                );

            }
        );


    } catch (error) {

        console.error(error);

        questionsDiv.innerHTML = `

            <p class="loading">
                Unable to load questions.
                Please refresh the page.
            </p>

        `;

    }

}


// ======================================================
// SUBMIT QUIZ
// ======================================================

const quizForm =
    document.getElementById(
        "quizForm"
    );


if (quizForm) {

    quizForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const answers = [];


            questions.forEach(
                function (question, index) {

                    const selected =
                        document.querySelector(
                            `input[name="question${index}"]:checked`
                        );


                    if (selected) {

                        answers.push(
                            selected.value
                        );

                    } else {

                        answers.push("");

                    }

                }
            );


            try {

                const response =
                    await fetch(
                        "/submit-quiz",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    answers
                                })
                        }
                    );


                const result =
                    await response.json();


                console.log(
                    "Quiz Result:",
                    result
                );


                if (result.success) {

                    // IMPORTANT:
                    // Save complete result
                    sessionStorage.setItem(
                        "quizResult",
                        JSON.stringify(
                            result
                        )
                    );


                    // Go to result page
                    window.location.href =
                        "/result.html";

                } else {

                    alert(
                        "Unable to submit quiz."
                    );

                }

            } catch (error) {

                console.error(error);

                alert(
                    "Server error while submitting quiz."
                );

            }

        }
    );

}