$(document).ready(() => {});

$("#register-session").submit(e => {
  e.preventDefault();

  var $inputs = $("#register-session :input");

  var values = {};
  $inputs.each(function() {
    values[this.name] = $(this).val();
  });

  values = JSON.stringify(values);
  console.log(values);
  postSession(values);
  $("#register-session")[0].reset();
});

function postSession(value) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/sessions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "JWT "+ getCookie('token')
    },
    processData: false,
    data: value
  };

  $.ajax(settings)
    .done(response => {
      if (response._id) {
        window.location.href = "backOffice.html";
      } else {
        alert("Erreur lors de l'ajout");
      }
    })
    .fail(e => {
      alert("Erreur lors de l'ajout");
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }