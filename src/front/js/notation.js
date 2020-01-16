var moduleSelected;
$( document ).ready(() => {
    
    populateSelectModule();
    for (let index = 1; index <= 20; index++) {
        populateNoteModule(index);        
    }

    $('#note-container').hide();
    $('#ajout-success').hide();
    $('#ajout-fail').hide();

    $('#select-module').change((e) => {
        moduleSelected = $('#select-module').val();
        console.log(moduleSelected);
        $('#note-container').show();
        $('#ajout-success').hide();
        $('#ajout-fail').hide();
    })

});

$('#note-form').submit((e) => {
    e.preventDefault();

    var $inputs = $('#note-form :input');

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    values.id_module = moduleSelected;
    
    values = JSON.stringify(values);
    console.log(values);
    postNote(values)
    $('#note-form')[0].reset();
})

function populateSelectModule() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/module",
        "method": "GET",
      }
      
    $.ajax(settings).done((response) => {
        for (let index = 0; index < response.length; index++) {
            let option = document.createElement('option');
            option.setAttribute('value', response[index]['_id']);
            option.innerHTML = response[index].name;
            $('#select-module').append(option);            
        }
    });
}

function populateNoteModule(note) {
    let option = document.createElement('option');
    option.innerHTML = note + "/20";
    option.setAttribute("value", note);
    $('#note').append(option);
}

function postNote(value) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/note",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": value
      }
      
      $.ajax(settings).done((response) => {
        if (response._id) {
            $('#note-container').hide();
            $('#ajout-success').show();
        } else {
            $('#ajout-fail').show();
        }
      }).fail((e) => {
        $('#note-container').hide();
        $('#ajout-fail').show();
      });
}