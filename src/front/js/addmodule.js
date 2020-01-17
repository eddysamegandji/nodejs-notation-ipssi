$(document).ready(() => {
    populateSession();
    populateInter();
});

$("#register-module").submit(e => {
  e.preventDefault();

  var $inputs = $("#register-module :input");

  var values = {};
  $inputs.each(function() {
    values[this.name] = $(this).val();
  });

  values = JSON.stringify(values);
  console.log(values);
  postModule(values);
  $("#register-module")[0].reset();
});

function postModule(value) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/module",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "JWT " + getCookie("token")
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

function populateSession() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/sessions",
        "headers": {
            "Authorization" : "JWT " + getCookie('token')
        },
        "method": "GET",
      }
      
    $.ajax(settings).done((response) => {
        console.log(response)
        for (let index = 0; index < response.length; index++) {
            let option = document.createElement('option');
            option.setAttribute('value', response[index]['_id']);
            option.innerHTML = response[index].name;
            $('#id_session').append(option);            
        }
    });
}

function populateInter() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/intervenant",
        "headers": {
            "Authorization" : "JWT " + getCookie('token')
        },
        "method": "GET",
      }
      
    $.ajax(settings).done((response) => {
        console.log(response)
        for (let index = 0; index < response.length; index++) {
            let option = document.createElement('option');
            option.setAttribute('value', response[index]['_id']);
            option.innerHTML = response[index].fullName;
            $('#id_intervenant').append(option);            
        }
    });
}