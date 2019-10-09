function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      'max-age': 3600,
      expires: new Date(),
    };
  
    if (options.expires) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
  
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function disableCheckboxes() {
    $('.check').each(function() {
      $(this).attr('disabled', true);
    });
    $('.save-btn').text('Сброс').click(() => {
      localStorage.clear();
      location.reload();
    });
  }
  
  function disableInput() {
    let cityName = `${getCookie('city').charAt(0).toUpperCase() + getCookie('city').slice(1).toLowerCase()}`;
    console.log(cityName);
    $('#cityInput').val(cityName);
    $('#cityInput').attr('disabled', true);
  }

  $(document).ready(function() {
    if (localStorage.key('checked')) disableCheckboxes();
    $.each(localStorage, function(key, value='checked') {
      if (localStorage.key(value)) {
        $(`#${key}`).attr(value, true);
      };
    });
  });

    cityInput.value = localStorage.getItem('cityInput');
    cityInput.oninput = () => {
      localStorage.setItem('cityInput', cityInput.value)
    };
  
  $('.save-btn').click(() => {
    $('.check').each(function() {
      if ($(this).prop('checked')) {
        console.log(this.id);
        localStorage.setItem(this.id, 'checked');
      };
      disableCheckboxes();
    });
  });

