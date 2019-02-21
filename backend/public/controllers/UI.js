////////EDIT MODAL
$(document).ready(function(){

  //Global procedure step counter variable
  var procedureCount = null;
  var notesCount = null;
  var mediaCount = null;

  $('.edit-reaction').on('click', function(){
      //Reset Procedure/Media fields
      $(".notesEditModal").empty();
      $(".mediaEditModal").empty();

      var moduleN = window.dosisApp.moduleType;
      $('#edit-moduleID').html(moduleN)

      //Grab ID and populate Name and Notes field
      $('#edit-form-id').val($(this).data('id'));
      $('#edit-form-name').val($(this).data('name'));
      $('#edit-form-notes').val($(this).data('notes'));

      //Populate Media fields
      mediaObj = $(this).data('media');
      mediaArray = mediaObj.split(','); //Split object received from db into JSON array by comma separated values
      console.log(mediaArray);

      for (var j = 0; j < mediaArray.length; j++) {
        mediaCount = j+1; //Steps start at 1, arrays (j) start at 0
        $('.mediaEditModal').append('<div style="height: 50px" class="form-control mediaFields"><p style="float: left; margin-right: 10px"><b>'+mediaCount+'</b></p><textarea style="width: 90%; height: 95%" id="savedMedia'+j+'" name="media[]"/></textarea><a href="javascript:void(0);" class="remove_media_EditModal" title="Remove media"><button style="float: right" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></a></div>'); //add input box
        $('#savedMedia'+j+'').append(mediaArray[j]);
        console.log(mediaCount);
      }


      //Populate notes fields
      notesObj = $(this).data('notes');
      notesArray = notesObj.split(','); //Split object received from db into JSON array by comma separated values
      console.log(notesArray);

      for (var i = 0; i < notesArray.length; i++) {
        notesCount = i+1; //Steps start at 1, arrays (i) start at 0
        $('.notesEditModal').append('<div style="height: 50px" class="form-control notesFields"><p style="float: left; margin-right: 10px"><b>'+notesCount+'</b></p><textarea style="width: 90%; height: 95%" id="savedNotes'+i+'" name="notes[]"/></textarea><a href="javascript:void(0);" class="remove_notes_EditModal" title="Remove notes"><button style="float: right" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></a></div>');//add input box
        $('#savedNotes'+i+'').append(notesArray[i]);
        console.log(notesCount);
      }

    });

    //Add Media step in Edit modal
    $(".new_media_EditModal").click(function(e){ //on add input button click
        e.preventDefault();
        mediaCount++;
        console.log(mediaCount);
        $(".mediaEditModal").append('<div style="height: 50px" class="form-control mediaFields"><p style="float: left; margin-right: 10px"><b>'+mediaCount+'</b></p><textarea style="width: 90%; height: 95%" name="media[]"/></textarea><a href="javascript:void(0);" class="remove_media_EditModal" title="Remove media"><button style="float: right" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></a></div>'); //add input box
    });

    //Remove media step in Edit Modal
    //.remove_media_EditModal class defined in .mediaEditModal append lines
    $(".mediaEditModal").on("click",".remove_media_EditModal", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        mediaCount--;
        console.log(mediaCount);
    });


    // Add Notes step in Edit modal
    $(".new_notes_EditModal").click(function(e){ //on add input button click
        e.preventDefault();
        notesCount++;
        console.log(notesCount);
        $(".notesEditModal").append('<div style="height: 50px" class="form-control notesFields"><p style="float: left; margin-right: 10px"><b>'+notesCount+'</b></p><textarea style="width: 90%; height: 95%" name="notes[]"/></textarea><a href="javascript:void(0);" class="remove_notes_EditModal" title="Remove notes"><button style="float: right" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></a></div>'); //add input box
    });

    //Remove Notes step in Edit Modal
    //.remove_notes_EditModal class defined in .notesEditModal append lines
    $(".notesEditModal").on("click",".remove_notes_EditModal", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        notesCount--;
        console.log(notesCount);
    });

});



////////View Data

function showGraph(id) {
    return(() => {
               var viz = $("#data-log-OD").is(':visible');
               if ( viz ) {
                   requestMeasurements(id);
               } else {
                   setTimeout(showGraph(id), 1000);
               }
           })
}

function showEventLog(direction) {
    return(() => {
               requestDataLog(direction);
           })
}




$(document).ready(function() {

    ////////DATA LOG Modal

    $('.view-data').on('click', function(){
        //Reset Procedure/Media fields

        var moduleN = window.dosisApp.moduleType;


        $("#data-moduleID").html(moduleN);
        var id = $(this).data('id')
        $("#data-log").show();

        setTimeout(showGraph(id), 1000);


        //Grab ID and populate Name and Notes field
        //Populate Media fields
      });


    ////////EVENT LOG Modal


    $('.view-events').on('click', function(){
        //Reset Procedure/Media fields

        var moduleN = window.dosisApp.moduleType;


        $("#event-moduleID").html(moduleN);
        gReactionInView = $(this).data('id')
        $("#event-log").show();

        setTimeout(showEventLog(0), 1000);


        //Grab ID and populate Name and Notes field
        //Populate Media fields
      });

});





////////ADD Modal

$(document).ready(function() {

//Create Media Modal Setup
  $('#createMedia').on('click',(ev) => {
                          $('#myAddModalTitle').html("Add Media")
                          $('#myAddModalLabel').html("Media Name")
                          $("#add-form-type").val("media")
                      })

//Create Reaction Modal Setup
  $('#createReaction').on('click',(ev) => {
                              var moduleN = window.dosisApp.moduleType;
//                             $('#myAddModalTitle').html("Add Reaction")
                             $('#add-moduleID').html(moduleN)
                             $('#myAddModalLabel').html("Reaction Name")
                             $("#add-form-type").val(moduleN)
                      })

//Add Media Field in Add Modal
  var max_media_AddModal      = 10; //maximum input boxes allowed
  var y = 1; //initial text box count
  $(".new_media_AddModal").click(function(e){ //on add input button click
      e.preventDefault();
      if(y < max_media_AddModal){ //max input box allowed
          y++; //text box increment
          $(".mediaAddModal").append('<div style="height: 50px" class="form-control mediaFields"><p style="float: left; margin-right: 10px"><b>'+y+'</b></p><textarea style="width: 90%; height: 95%" name="media[]"/></textarea><a href="javascript:void(0);" class="remove_media_AddModal" title="Remove media"><button style="float: right" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></a></div>'); //add input box
      }
  });

  //Remove Media field in Add Modal
  $(".mediaAddModal").on("click",".remove_media_AddModal", function(e){ //user click on remove text
      e.preventDefault();
      $(this).parent('div').remove();
      y--;
  });

  //Add Notes Field in Add modal
    var max_notes_AddModal      = 10; //maximum input boxes allowed
    var x = 1; //initial text box count
    $(".new_notes_AddModal").click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_notes_AddModal){ //max input box allowed
            x++; //text box increment
            $(".notesAddModal").append('<div style="height: 50px" class="form-control notesFields"><p style="float: left; margin-right: 10px"><b>'+x+'</b></p><textarea style="width: 90%; height: 95%" name="procedure[]"/></textarea><a href="javascript:void(0);" class="remove_procedure_AddModal" title="Remove field"><button style="float: right" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></a></div>'); //add input box
        }
    });

    //Remove Notes Field in Add modal
    $(".notesAddModal").on("click",".remove_notes_AddModal", function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });

});



///////DELETE REACTION
$(document).ready(function() {
  $('.delete-reaction').on('click', function(){
      var id = $(this).data('id');
      var url = '/delete/'+id;
      if(confirm('Delete Reaction?')){
          $.ajax({
            url: url,
            type: 'DELETE',
            success: function(result){
              console.log('Deleting Reaction...');
              window.location.href='/';
            },
            error: function(err){
              console.log(err);
            }
          });
      }
  });
});
