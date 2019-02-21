


$(function() {
    $("#dosisEntry-SpeedSlider").slider();
    $("#dosisEntry-SpeedSlider").on("slide", function(slideEvt) {
        $("#dosisEntry-SpeedSliderVal").text(slideEvt.value);
    });


    $("#dosisEntry-AmountSlider").slider();
    $("#dosisEntry-AmountSlider").on("slide", function(slideEvt) {
        $("#dosisEntry-AmountSliderVal").text(slideEvt.value);
    });


    $("#dosisEntry-TemperatureSlider").slider();
    $("#dosisEntry-TemperatureSlider").on("slide", function(slideEvt) {
        $("#dosisEntry-TemperatureSliderVal").text(slideEvt.value);
    });


    $("#dosisEntry-oxygenLevelSlider").slider();
    $("#dosisEntry-oxygenLevelSlider").on("slide", function(slideEvt) {
        $("#dosisEntry-oxygenLevelSliderVal").text(slideEvt.value);
    });


    $("#dosisEntry-IRPowerPercentSlider").slider();
    $("#dosisEntry-IRPowerPercentSlider").on("slide", function(slideEvt) {
        $("#dosisEntry-IRPowerPercentSliderVal").text(slideEvt.value);
    });

    var RGBChange = function() {
        $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
    };

    var r = $('#R').slider();
    if ( r ) {
        r = r.on('slide', RGBChange)
             .data('slider');
    }

    var g = $('#G').slider();
    if ( g ) {
        g = g.on('slide', RGBChange)
             .data('slider');
    }

    var b = $('#B').slider();
    if ( b ) {
        b = b.on('slide', RGBChange)
            .data('slider');
    }

  })


// ---- ------ ----- ------ ------ ------ --------------

$(function() {
    $('#dosisEntry-toggle-LoadIn').change(function() {
        //$(this).prop('checked'))
    })
  })


$(function() {
    $('#dosisEntry-toggle-Extract').change(function() {
        //$(this).prop('checked'))
    })
  })


$(function() {
    $('#dosisEntry-toggle-Incubate').change(function() {
        //$(this).prop('checked'))
    })
  })


$(function() {
    $('#dosisEntry-toggle-Oxygenate').change(function() {
        //$(this).prop('checked'))
    })
  })

$(function() {
    $('#dosisEntry-toggle-Grow').change(function() {
        //$(this).prop('checked'))
    })
  })


if ( !gDosisMaxIndex ) var gDosisMaxIndex = -1;
if ( !gDosisEntryIndex ) var gDosisEntryIndex = 0;



function dosisHandleEntryChange(elementSource) {
    if ( elementSource.axisAppData ) {

        gDosisEntryIndex = elementSource.axisAppDataIndex;

        var settings = elementSource.axisAppData.settings;

        var v = settings.reactionname;
        var obj = $("#dosisEntry-" + "reactionname");
        if ( obj ) obj.val(v);

        v = settings.media;
        obj = $("#dosisEntry-" + "media");
        if ( obj ) obj.val(v);

        v = settings.SpeedSlider;
        obj = $("#dosisEntry-" + "SpeedSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "SpeedSliderVal").html(""+ v);

        v = settings.AmountSlider;
        obj = $("#dosisEntry-" + "AmountSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "AmountSliderVal").html(""+ v);

        v = settings.TemperatureSlider;
        obj = $("#dosisEntry-" + "TemperatureSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "TemperatureSliderVal").html(""+ v);

        v = settings.oxygenLevelSlider;
        obj = $("#dosisEntry-" + "oxygenLevelSlider");
        if ( obj ) obj.slider('setValue', v);
         $("#dosisEntry-" + "oxygenLevelSliderVal").html(""+ v);

        v = settings.IRPowerPercentSlider;
        obj = $("#dosisEntry-" + "IRPowerPercentSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "IRPowerPercentSliderVal").html(""+ v);

        v = settings.R;
        obj = $("#R");
        if ( obj ) obj.slider('setValue', v);

        v = settings.G;
        obj = $("#G");
        if ( obj ) obj.slider('setValue', v);

        v = settings.B;
        obj = $("#B");
        if ( obj ) obj.slider('setValue', v);

        v = settings.IndicateR;
        obj = $("#dosisEntry-" + "toggle-IndicateR");
        if ( obj ) obj.prop('checked', v);

        v = settings.IndicateG;
        obj = $("#dosisEntry-" + "toggle-IndicateG");
        if ( obj ) obj.prop('checked', v);

        v = settings.IndicateB;
        obj = $("#dosisEntry-" + "toggle-IndicateB");
        if ( obj ) obj.prop('checked', v);

        $('#dosisEntry-toggle-LoadIn').prop('checked', false);
        $('#dosisEntry-toggle-Extract').prop('checked', false);
        $('#dosisEntry-toggle-Incubate').prop('checked', false);
        $('#dosisEntry-toggle-Oxygenate').prop('checked', false);
        $('#dosisEntry-toggle-Grow').prop('checked', false);
    }
}




function unloadFormData(elementSource) {
    if ( elementSource.axisAppData ) {

        gDosisEntryIndex = elementSource.axisAppDataIndex;

        var settings = elementSource.axisAppData.settings;

        var v = settings.reactionname;
        var obj = $("#dosisEntry-" + "reactionname");
        if ( obj ) obj.val(v);

        v = settings.media;
        obj = $("#dosisEntry-" + "media");
        if ( obj ) obj.val(v);

        v = settings.SpeedSlider;
        obj = $("#dosisEntry-" + "SpeedSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "SpeedSliderVal").html(""+ v);

        v = settings.AmountSlider;
        obj = $("#dosisEntry-" + "AmountSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "AmountSliderVal").html(""+ v);

        v = settings.TemperatureSlider;
        obj = $("#dosisEntry-" + "TemperatureSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "TemperatureSliderVal").html(""+ v);

        v = settings.oxygenLevelSlider;
        obj = $("#dosisEntry-" + "oxygenLevelSlider");
        if ( obj ) obj.slider('setValue', v);
         $("#dosisEntry-" + "oxygenLevelSliderVal").html(""+ v);

        v = settings.IRPowerPercentSlider;
        obj = $("#dosisEntry-" + "IRPowerPercentSlider");
        if ( obj ) obj.slider('setValue', v);
        $("#dosisEntry-" + "IRPowerPercentSliderVal").html(""+ v);

        v = settings.R;
        obj = $("#R");
        if ( obj ) obj.slider('setValue', v);

        v = settings.G;
        obj = $("#G");
        if ( obj ) obj.slider('setValue', v);

        v = settings.B;
        obj = $("#B");
        if ( obj ) obj.slider('setValue', v);

        v = settings.IndicateR;
        obj = $("#dosisEntry-" + "toggle-IndicateR");
        if ( obj ) obj.prop('checked', v);

        v = settings.IndicateG;
        obj = $("#dosisEntry-" + "toggle-IndicateG");
        if ( obj ) obj.prop('checked', v);

        v = settings.IndicateB;
        obj = $("#dosisEntry-" + "toggle-IndicateB");
        if ( obj ) obj.prop('checked', v);

        $('#dosisEntry-toggle-LoadIn').prop('checked', false);
        $('#dosisEntry-toggle-Extract').prop('checked', false);
        $('#dosisEntry-toggle-Incubate').prop('checked', false);
        $('#dosisEntry-toggle-Oxygenate').prop('checked', false);
        $('#dosisEntry-toggle-Grow').prop('checked', false);
    }
}



function disableDosisNavButtons() {
    $("dosisEntry-start").prop('enabled',false);
    $("dosisEntry-stop").prop('enabled',false);
    $("dosisEntry-Prev").prop('enabled',false);
    $("dosisEntry-Next").prop('enabled',false);
}



function dosisDataSubmit() {

    var dataFetchPage = "/page";

    $.getJSON( dataFetchPage, {
      section :  pageID,
      page: pIndex
    }).done(function( data ) {
        for ( var i = 0; i < 6; i++ ) {
            dosisSetupEntryData(i,data);
        }
    });

}




$(function() {
    $("#dosisEntry-portfolioModal").on('show.bs.modal', (e) => {

                       if (e.relatedTarget.id !== "button-ops-create") {
                           var elementSource = document.getElementById(e.relatedTarget.id);
                           dosisHandleEntryChange(elementSource);
                       } else {

                           disableDosisNavButtons();

                           var obj = $("#dosisEntry-" + "reactionname");
                           if ( obj ) obj.val("");

                           obj = $("#dosisEntry-" + "media");
                           if ( obj ) obj.val("");

                           obj = $("#dosisEntry-" + "SpeedSlider");
                           if ( obj ) obj.slider('setValue', 0);
                           $("#dosisEntry-" + "SpeedSliderVal").html("0");

                           obj = $("#dosisEntry-" + "AmountSlider");
                           if ( obj ) obj.slider('setValue', 0);
                           $("#dosisEntry-" + "AmountSliderVal").html("0");

                           obj = $("#dosisEntry-" + "TemperatureSlider");
                           if ( obj ) obj.slider('setValue', 20);
                           $("#dosisEntry-" + "TemperatureSliderVal").html("20");

                           obj = $("#dosisEntry-" + "oxygenLevelSlider");
                           if ( obj ) obj.slider('setValue', 0);
                           $("#dosisEntry-" + "oxygenLevelSliderVal").html("0");

                           obj = $("#dosisEntry-" + "IRPowerPercentSlider");
                           if ( obj ) obj.slider('setValue', 0);
                            $("#dosisEntry-" + "IRPowerPercentSliderVal").html("0");

                           obj = $("#R");
                           if ( obj ) obj.slider('setValue', 0);

                           obj = $("#G");
                           if ( obj ) obj.slider('setValue', 0);

                           obj = $("#B");
                           if ( obj ) obj.slider('setValue', 0);

                           obj = $("#dosisEntry-" + "toggle-IndicateR");
                           if ( obj ) obj.prop('checked', false);

                           obj = $("#dosisEntry-" + "toggle-IndicateG");
                           if ( obj ) obj.prop('checked', false);

                           obj = $("#dosisEntry-" + "toggle-IndicateB");
                           if ( obj ) obj.prop('checked', false);

                           $('#dosisEntry-toggle-LoadIn').prop('checked', false);
                           $('#dosisEntry-toggle-Extract').prop('checked', false);
                           $('#dosisEntry-toggle-Incubate').prop('checked', false);
                           $('#dosisEntry-toggle-Oxygenate').prop('checked', false);
                           $('#dosisEntry-toggle-Grow').prop('checked', false);

                       }


    });
  })


//"#dosisEntry-portfolioModal" + index


function dosisPrevEntry() {
    if ( gDosisEntryIndex == 0 ) {
        gDosisEntryIndex = gDosisMaxIndex;
    } else gDosisEntryIndex--;
    var entryName = "dosisEntry-portfolioModal" + gDosisEntryIndex;
    var elementSource = document.getElementById(entryName);
    dosisHandleEntryChange(elementSource);
}

function dosisNextEntry() {
    gDosisEntryIndex++;
    if ( gDosisEntryIndex > gDosisMaxIndex ) {
        gDosisEntryIndex = 0;
    }
    var entryName = "dosisEntry-portfolioModal" + gDosisEntryIndex;
    var elementSource = document.getElementById(entryName);
    dosisHandleEntryChange(elementSource);
}


var gDosisMaxPage = 1;
var gDosisPageIndex = 0;


var responseData = [];


function dosisSetupEntryData(i,responseData) {

    var dosisEntryID = "#dosisEntry" + i
    var dosisEntryDescriptionID = "#dosisEntryDescription" + i;
    var dosisEntryTimeID = "#dosisEntryTime" + i;

    $(dosisEntryID).text(responseData[i].name);
    $(dosisEntryDescriptionID).text(responseData[i].description);
    $(dosisEntryTimeID).text(responseData[i].creationDate);

    var entryName = "dosisEntry-portfolioModal" + i;
    var attachPanel = document.getElementById(entryName);

    attachPanel["axisAppData"] = responseData[i];
    attachPanel["axisAppDataIndex"] = i;

    if ( i > gDosisMaxIndex )  gDosisMaxIndex = i;

}





function entryPageFetch(pageID,pIndex) {
  var dataFetchPage = "/page";
  $.getJSON( dataFetchPage, {
    section :  pageID,
    page: pIndex
  }).done(function( data ) {
      for ( var i = 0; i < 6; i++ ) {
          dosisSetupEntryData(i,data);
      }
  });
}



function appPrevPage(callSection) {

    if ( gDosisPageIndex == 0 ) {
        gDosisPageIndex = gDosisMaxPage;
    } else gDosisPageIndex--;

    gDosisMaxIndex = 0;

    entryPageFetch(callSection,gDosisPageIndex);

 }




function appNextPage(callSection) {

    gDosisPageIndex++;
    if ( gDosisPageIndex > gDosisMaxPage ) {
        gDosisPageIndex = 0;
    }

    gDosisMaxIndex = 0;

    entryPageFetch(callSection,gDosisPageIndex);

 }





