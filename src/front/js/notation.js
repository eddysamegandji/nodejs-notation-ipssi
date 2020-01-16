var moduleSelected;
$( document ).ready(() => {
    
    populateSelectModule();
    for (let index = 1; index <= 20; index++) {
        populateNoteModule(index);        
    }

    $('#note-container').hide();

    $('#select-module').change((e) => {
        moduleSelected = $('#select-module').val();
        console.log(moduleSelected);
        $('#note-container').show();
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
    //postNote()
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