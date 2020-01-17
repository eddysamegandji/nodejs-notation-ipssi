$(document).ready(function(){
    $('#inscription').validate({
        rules:{
            fullName:{
                "required":true,
                "maxlength":255
            },
            "email":{
                "required":true,
                
            },
            "emailConfirm":{
                "required":true,
                equalTo:"#email"
            },
            "password":{
                "required":true,
                minlength:6
            },
            "password_confirmation":{
                "required":true,
                equalTo:"#hash_password"
            },
        
        },
        messages : {
            "fullName" : {
                "required":"Veillez renseigner un nom",
                "maxlength":"255 caractères maximum"
            },
            "email":"Veillez renseigner une adresse mail",
            "emailConfirm":"Veillez renseigner une adresse mail",
            "password":{
                "required":"Veillez renseigner un mot de passe",
                "minlength":"6 caractères minimum"
            },
            "password_confirmation":{
                "required":"Veillez renseigner un mot de passe",
                "minlength":"6 caractères minimum"
            }
        }
    })
});

$('#inscription').submit((e) =>{
    e.preventDefault()
    var $inputs = $('#inscription :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    values = JSON.stringify(values);
    console.log(values);

    var settings = {
       "url": "http://localhost:3000/auth/register",
       "method": "POST",
       "headers" : {
           "Content-Type" : "application/json"
       },
       "data": values
     };     
      $.ajax(settings).done(function (response) {
       window.location.href = "login.html"
     });
  })