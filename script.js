document.addEventListener('DOMContentLoaded', function () {

    var form = document.getElementById('loginForm');
    var userInput = document.getElementById('username');
    var passInput = document.getElementById('password');
    var userErr = document.getElementById('usernameError');
    var passErr = document.getElementById('passwordError');
    var userBox = document.getElementById('usernameGroup');
    var passBox = document.getElementById('passwordGroup');
    var msg = document.getElementById('generalMessage');
    var eyeBtn = document.getElementById('togglePassword');
    var icon = document.getElementById('eyeIcon');

    eyeBtn.addEventListener('click', function () {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            icon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            passInput.type = 'password';
            icon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        userErr.textContent = '';
        passErr.textContent = '';
        userBox.classList.remove('error');
        passBox.classList.remove('error');
        msg.className = 'alert-box';
        msg.textContent = '';

        var username = userInput.value.trim();
        var password = passInput.value;
        var isValid = true;

        if (username === '') {
            userErr.textContent = 'Username or email is required.';
            userBox.classList.add('error');
            isValid = false;
        }

        if (password === '') {
            passErr.textContent = 'Password cannot be empty.';
            passBox.classList.add('error');
            isValid = false;
        } else if (password.length < 6) {
            passErr.textContent = 'Password is too short. Minimum 6 characters.';
            passBox.classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            msg.textContent = 'Please check the fields above.';
            msg.classList.add('error-banner');
        } else {
            msg.textContent = 'Login successful!';
            msg.classList.add('success');

            setTimeout(function () {
                form.reset();
                msg.className = 'alert-box';
                msg.textContent = '';
                passInput.type = 'password';
                icon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }, 2500);
        }
    });

    userInput.addEventListener('input', function () {
        if (userInput.value.trim() !== '') {
            userErr.textContent = '';
            userBox.classList.remove('error');
        }
    });

    passInput.addEventListener('input', function () {
        if (passInput.value.length >= 6) {
            passErr.textContent = '';
            passBox.classList.remove('error');
        }
    });

});
    