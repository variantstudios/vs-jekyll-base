

function queryString() {
  var queryString = window.location.search;
  var varArray = queryString.split('&');
  for (var i = 0; i < varArray.length; i++) {
    var param = varArray[i].split('=');
    return param[1];
  }
}


// fade in
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || 'block';

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .009) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}






if ($('body').hasClass('contact')) {
  if (queryString() === 'true') {
    //$('#contact-message').show();
    // $('#contact-form').hide();
    var el = document.querySelector('#contact-message');
    fadeIn(el);
    $('.hide').hide();
  } else {
    $('#contact-message').hide();
    // $('#contact-form').show();
    $('.hide').show();
  }
}

var CaptchaCallback = function() { // eslint-disable-line no-unused-vars
  if ($('#RecaptchaField1').length) {
    grecaptcha.render('RecaptchaField1', {
      sitekey: '6LeuZjwUAAAAANhqRiDEgtaygHtLtW8yQptaTmNB'
    });
  }
  if ($('#RecaptchaField2').length) {
    grecaptcha.render('RecaptchaField2', {
      sitekey: '6LeuZjwUAAAAANhqRiDEgtaygHtLtW8yQptaTmNB'
    });
  }
};

