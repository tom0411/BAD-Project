header();

function header() {
    const notlogged = document.getElementById("not-logged-in");
    const logged = document.getElementById("logged-in");
    if (!user) {
        notlogged.hidden = false;
        return;
    }

    logged.hidden = false;
    document.getElementById("username").textContent = user.username;
}
