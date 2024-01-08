document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formObject = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
    };

    const res = await fetch("/user/register", {
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
