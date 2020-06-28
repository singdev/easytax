
function onChangeEmailField(emailField, value) {
    console.log(value);
    if (validateEmail(value) == false) {
        emailField.classList.add("invalide")
        document.querySelector(".message-email").classList.remove("hide-element");
    } else {
        emailField.classList.remove("invalide")
        document.querySelector(".message-email").classList.add("hide-element");
    }
    onChangeVerify();
}

function onChangePhoneField(phoneField, value) {
    phoneField.value = addThreeSpace(value);
    if (validatePhoneNumberFromGabon(value) == false) {
        phoneField.classList.add("invalide");
        document.querySelector(".message-phone").classList.remove("hide-element");
    } else {
        phoneField.value = addThreeSpace(value);
        document.querySelector(".message-phone").classList.add("hide-element");
        phoneField.classList.remove("invalide");
    }
    onChangeVerify();
}

function onChangePhoneField(phoneField, value) {
    phoneField.value = addThreeSpace(value);
    if (validatePhoneNumberFromGabon(value) == false) {
        phoneField.classList.add("invalide");
        document.querySelector(".message-phone").classList.remove("hide-element");
    } else {
        phoneField.value = addThreeSpace(value);
        document.querySelector(".message-phone").classList.add("hide-element");
        phoneField.classList.remove("invalide");
    }
    onChangeVerify();
}

function onChangeNomField(field, value) {
    if (value.length == 0) {
        field.classList.add("invalide");
        document.querySelector(".message-nom").classList.remove("hide-element");
    } else {
        document.querySelector(".message-nom").classList.add("hide-element");
        field.classList.remove("invalide");
    }
    onChangeVerify();
}

function onChangePasswordField(field, value) {
    if (value.length < 6) {
        field.classList.add("invalide");
        document.querySelector(".message-password").classList.remove("hide-element");
    } else {
        document.querySelector(".message-password").classList.add("hide-element");
        field.classList.remove("invalide");
    }
    onChangeVerify();
}

function onChangeVerify() {
    const phone = document.querySelector("input[name='telephone']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const nom = document.querySelector("input[name='nom']").value;

    document.querySelector("input[type='submit']").disabled =
        (!validatePhoneNumberFromGabon(phone) || !validateEmail(email)
            || password.length < 6 || nom.length == 0);
}
