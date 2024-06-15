$(document).ready(function() {
    $('#change-password-form').submit(function(e) {
        e.preventDefault();

        const username = $('#username').val();
        const newPassword = $('#newPassword').val();
        const confirmedPassword = $('#confirmedPassword').val();

        if (newPassword !== confirmedPassword) {
            $('#message').text('Passwords do not match').removeClass().addClass('error').show();
            return;
        }

        $.ajax({
            url: '/admin/change-password',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                newPassword: newPassword,
                confirmedPassword: confirmedPassword
            }),
            success: function(response) {
                $('#message').text(response.message).removeClass().addClass('success').show();
                $('#change-password-form')[0].reset();
            },
            error: function(xhr) {
                const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'An error occurred';
                $('#message').text('Error: ' + errorMessage).removeClass().addClass('error').show();
            }
        });
    });
});