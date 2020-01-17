$(document).ready(() => {});

$("#register-user").submit(e => {
  e.preventDefault();

  var $inputs = $("#register-user :input");

  var values = {};
  $inputs.each(function() {
    values[this.name] = $(this).val();
  });

  values = JSON.stringify(values);
  console.log(values);
  postUser(values);
  $("#register-user")[0].reset();
});

function postUser(value) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/auth/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
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
