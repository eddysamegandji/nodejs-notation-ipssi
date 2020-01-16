$( document ).ready(() => {
    populateUsers();
})

function populateUsers() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/users",
        "method": "GET",
        "headers": {
          "Authorization": "JWT "+getCookie('token')
        }
      }
      
      $.ajax(settings).done(function (response) {
        for (let index = 0; index < response.length; index++) {
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            tdName.innerHTML = response[index].fullName;

            let tdMail = document.createElement('td');
            tdMail.innerHTML = response[index].email;

            let tdRole = document.createElement('td');
            tdRole.innerHTML = response[index].role;

            let tdAction = document.createElement('td');
            let buttonUpdate = document.createElement('button');
            buttonUpdate.classList.add('btn', 'btn-primary', 'm-2');
            buttonUpdate.innerHTML = "Modifier";
            let buttonDelete = document.createElement('button');
            buttonDelete.classList.add('btn', 'btn-danger', 'm-2');
            buttonDelete.innerHTML = "Supprimer";
            tdAction.append(buttonUpdate);
            tdAction.append(buttonDelete);
            
            tr.append(tdName, tdMail, tdRole, tdAction);
            $('#table-user').append(tr);
        }
      });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }