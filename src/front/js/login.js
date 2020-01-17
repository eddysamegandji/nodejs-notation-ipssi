$().ready(function() {
  $('#inscrire').click((e)=>{
    e.preventDefault();
    console.log("toto");
    window.location.href = "etudiantForm.html";
  });
   
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
            "mail" : "Veuillez fournir un email correct",
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
        document.cookie = "token="+ response.token; 
        document.cookie = "role="+ response.role;

        if(response.role == "0"){
            window.location.href = "backOffice.html";
        }else if(response.role == "2"){
          window.location.href = "notation.html";
        }
      }).fail(function (){
        document.getElementById("span").innerHTML ="e-mail ou mot de passe erroné!";
      });
   });

    

  });