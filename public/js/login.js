document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formObject = {
        email: form.email.value,
        password: form.password.value,
    };

    const res = await fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(formObject),
    });

    const json = await res.json();

    if (json.error) {
        alert(json.error);
        return;
    }
});
