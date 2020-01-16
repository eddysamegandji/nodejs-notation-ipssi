$(document).ready(() => {
  populateUsers();
  populateModules();
  populateSession();

  $("#addUser").click(() => {
    window.location.href = "adduser.html";
  });

  $("#addModule").click(() => {
    window.location.href = "addmodule.html";
  });

  $("#addSession").click(() => {
    window.location.href = "addsession.html";
  });
});

function populateUsers() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/users",
    method: "GET",
    headers: {
      Authorization: "JWT " + getCookie("token")
    }
  };

  $.ajax(settings).done(function(response) {
    for (let index = 0; index < response.length; index++) {
      let tr = document.createElement("tr");
      let tdName = document.createElement("td");
      tdName.innerHTML = response[index].fullName;

      let tdMail = document.createElement("td");
      tdMail.innerHTML = response[index].email;

      let tdRole = document.createElement("td");
      if (response[index].role == 0) {
        tdRole.innerHTML = "Admin";
      } else if (response[index].role == 1) {
        tdRole.innerHTML = "Intervenant";
      } else {
        tdRole.innerHTML = "Elève";
      }

      let tdAction = document.createElement("td");

      let buttonUpdate = document.createElement("button");
      buttonUpdate.classList.add("btn", "btn-primary", "m-2");
      buttonUpdate.innerHTML = "Modifier";

      let buttonDelete = document.createElement("button");
      buttonDelete.classList.add("btn", "btn-danger", "m-2");
      buttonDelete.innerHTML = "Supprimer";
      buttonDelete.addEventListener('click', (e) => {
        console.log('oto');
        deleteUser(response[index]._id)
      })

      tdAction.append(buttonUpdate);
      tdAction.append(buttonDelete);

      tr.append(tdName, tdMail, tdRole, tdAction);
      $("#table-user").append(tr);
    }
  });
}

function populateModules() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/module",
    method: "GET",
    headers: {
      Authorization: "JWT " + getCookie("token")
    }
  };

  $.ajax(settings).done(function(response) {
    for (let index = 0; index < response.length; index++) {
      let tr = document.createElement("tr");
      let tdName = document.createElement("td");
      tdName.innerHTML = response[index].name;

      let tdInter = document.createElement("td");
      tdInter.innerHTML = response[index].id_intervenant;

      let tdMoyenne = document.createElement("td");
      tdMoyenne.innerHTML = calcMoyenne(response[index]._id);

      let tdAction = document.createElement("td");
      let buttonUpdate = document.createElement("button");
      buttonUpdate.classList.add("btn", "btn-primary", "m-2");
      buttonUpdate.innerHTML = "Modifier";
      let buttonDelete = document.createElement("button");
      buttonDelete.classList.add("btn", "btn-danger", "m-2");
      buttonDelete.innerHTML = "Supprimer";
      tdAction.append(buttonUpdate);
      tdAction.append(buttonDelete);

      tr.append(tdName, tdInter, tdMoyenne, tdAction);
      $("#table-module").append(tr);
    }
  });
}

function populateSession() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/sessions",
    method: "GET",
    headers: {
      Authorization: "JWT " + getCookie("token")
    }
  };

  $.ajax(settings).done(function(response) {
    for (let index = 0; index < response.length; index++) {
      let tr = document.createElement("tr");
      let tdName = document.createElement("td");
      tdName.innerHTML = response[index].name;

      let tdYear = document.createElement("td");
      tdYear.innerHTML = response[index].year;

      let tdAction = document.createElement("td");
      let buttonUpdate = document.createElement("button");
      buttonUpdate.classList.add("btn", "btn-primary", "m-2");
      buttonUpdate.innerHTML = "Modifier";
      let buttonDelete = document.createElement("button");
      buttonDelete.classList.add("btn", "btn-danger", "m-2");
      buttonDelete.innerHTML = "Supprimer";
      tdAction.append(buttonUpdate);
      tdAction.append(buttonDelete);

      tr.append(tdName, tdYear, tdAction);
      $("#table-session").append(tr);
    }
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

function calcMoyenne(id) {
  // TODO get all note for module id and calc mean
  return Math.round(Math.random() * 2 * 10) + "/20";
}

function deleteUser(id) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/users/"+id,
    "method": "DELETE",
    "headers": {
      "Authorization": "JWT "+getCookie('token')
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}