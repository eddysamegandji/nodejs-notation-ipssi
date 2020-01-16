$().ready(function() {
    $("#form1").validate({
        rules : {
            mail : {
              required : true
            },
            password : {
              required : true,
              
            }
        },
          messages : {
            "mail" : "Veuillez fournir un email correcte",
            "password" : "Veuillez entrer votre mot de passe"
            
          }
        
   });

   $('#form1').submit((e) =>{
     e.preventDefault()
     var settings = {
        "url": "http://localhost:3000/auth/sign_in",
        "method": "POST",
        "data": {
          "email": $('#mail').val(),
          "password": $('#password').val()
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
   })

   
  });