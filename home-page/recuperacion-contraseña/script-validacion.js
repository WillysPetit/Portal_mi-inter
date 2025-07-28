document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordResetForm');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordHelp = document.getElementById('passwordHelp');
    
    function validatePasswords() {
        const password1 = newPassword.value;
        const password2 = confirmPassword.value;
        
        if (password1 !== password2 && password2 !== '') {
            confirmPassword.classList.add('error');
            confirmPassword.classList.remove('success');
            passwordHelp.classList.add('show');
            return false;
        } else if (password2 !== '') {
            confirmPassword.classList.remove('error');
            confirmPassword.classList.add('success');
            passwordHelp.classList.remove('show');
            return true;
        }
        return false;
    }
    
    // Validar en tiempo real mientras se escribe
    confirmPassword.addEventListener('input', validatePasswords);
    
    // Validar al enviar el formulario
    form.addEventListener('submit', function(e) {
        if (!validatePasswords()) {
            e.preventDefault();
            // Enfocar el campo de confirmación si hay error
            confirmPassword.focus();
        }
    });
});

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('bi-eye-fill');
        icon.classList.add('bi-eye-slash-fill');
    } else {
        input.type = "password";
        icon.classList.remove('bi-eye-slash-fill');
        icon.classList.add('bi-eye-fill');
    }
}