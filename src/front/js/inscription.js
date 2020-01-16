$(document).ready(function(){
    $('#inscription').validate({
        rules:{
            "fullName":{
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
       "data": values
     };     
      $.ajax(settings).done(function (response) {
       console.log(response);
       alert(response);
     });
  })