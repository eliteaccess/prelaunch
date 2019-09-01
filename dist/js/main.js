$(document).ready(function () {
    var $form = $('#mc-embedded-subscribe-form')
    if ($form.length > 0) {
      $('form input[type="submit"]').bind('click', function (event) {
        if (event) event.preventDefault()
        register($form)
      })
    }
  })
  
  function register($form) {
    $('#mc-embedded-subscribe').val('Sending...');
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
      success: function (data) {
        $('#mc-embedded-subscribe').val('Sign Up For Updates')
        if (data.result === 'success') {
          // Yeahhhh Success
          console.log(data.msg)
          $('#mce-EMAIL').css('borderColor', '#ffffff')
          $('#subscribe-result').css('color', '#FFAD1C')
          $('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
          $('#subscribe-result p').css('margin-bottom', '0')
          $('h2').css('margin-top', '1rem')
          $('#mce-EMAIL').val('')
        } else {
          // Something went wrong, do something to notify the user.
          console.log(data.msg)
          $('#mce-EMAIL').css('borderColor', '#ff8282')
          $('#subscribe-result').css('color', '#ff8282')
          $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
        }
      }
    })
  };