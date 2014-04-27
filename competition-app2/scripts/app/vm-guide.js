/**
 * guide view model
 */

var app = app || {};

app.Guide = (function () {
    'use strict'



    // Activities model
    var guideModel = (function () {

        console.log('define guide model');


        var model = {
            message: 'This is a message from the view model'
        };



//        return {
//            seed: model
//        };

        return model

    }());

    // Seed view model
    var guideViewModel = (function () {

        var data = {
                "title":"Dawn Raid",
                "checklists":[
                    {
                        "title":"",
                        "questions":{

                        }
                    }
                ]
            };

        console.log('define guideViewModel');

        var init = function () {
            console.log('guide init Hit!');
        };

        var show = function(){
            console.log('guide show Hit!');
        };

        // Navigate to activityView When some activity is selected
        var selectChecklist = function (e) {
            console.log("CHECKLIST SELECTED");
            console.log("CHECKLIST SELECTED e", e);

            app.mobileApp.navigate('views/vw-checklist-questions.html');
        };

        var selectChecklist2 =  function (custom) {

            var pane = $("#rightPane").data("kendoMobilePane");

            console.log('PANE', pane);

//            pane.replace("#dawnRaidIntro");


//            console.log("CHECKLIST2 SELECTED");
//            console.log("CHECKLIST2 SELECTED custom", custom);

//            app.mobileApp.navigate('views/vw-checklist-questions.html');
        };

        var navigatePane = function(e){
            var pane = $("#rightPane").data("kendoMobilePane");
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };


        return {
            init:init(),
            show:show(),
            data:data,
            testText:'Hello',
            seed: guideModel,
            selectChecklist: selectChecklist,
            selectChecklist2: selectChecklist2
        };

    }());

    return guideViewModel;

}());
