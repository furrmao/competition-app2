
/**
 * Contacts3 view model
 */

var app = app || {};

app.Contacts3 = (function () {
    'use strict'



    // Activities model
    var contacts3Model = (function () {


        function getData() {

            var space = "zpp0viuq4x1e";
            var contentType = "4ygwXLGXPWWuWcQGiSeyGa";
            var authorisation = "Bearer 31d5775c68437c57df39ebdde118dff797e89a545408ccb981abdb2908e79b60";

//        var url = "https://cdn.contentful.com/spaces/" + space + "/entries";
            var url = 'data/contacts-mapped.json';


            var promise = $.ajax({
                url: url,
                dataType: "json",
                data: {
                    content_type: contentType
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', authorisation),
                        xhr.setRequestHeader('Content-Type', 'application/json')
                }});

            return promise;
        }

        getData()
            .done(function (data, status) { // success

                console.log('GETDATA() SUCCESS!!!');
                console.log('GETDATA() SUCCESS DATA:', data);
                console.log('GETDATA() SUCCESS STATUS:', status);

            })
            .fail(function (xhr, status) { // error

                console.log('GETDATA() ERROR!!!');
                console.log('GETDATA() XHR:', xhr);
                console.log('GETDATA() STATUS:', status);

            })
            .always(function (data, status) { // complete

                console.log('GETDATA() COMPLETE!!!');
                console.log('GETDATA() COMPLETE DATA:', data);
                console.log('GETDATA() COMPLETE STATUS:', status);

            });

        var fetchedData = null;


        var data = {items:[
            {"title":"Joe Bloggs"},
            {"title":"Fred Bloggs"}
        ]};

        var ds = new kendo.data.DataSource({
            data: data,
            schema: {
                data: "items",
                type: "json",
                model:{title:"title"}
            }
        });

//        ds.fetch(function(){ // fetch callback
//            fetchedData = ds.data();
//            console.log('FETCHED DATA', fetchedData);
//
//        });


        var model = {
            message: 'This is a message from the view model',
            contacts: ds

        };

        return model

    }());

    // Contacts3 view model
    var contacts3ViewModel = (function () {

        console.log('define contacts3ViewModel');

//        var init = function () {
//            console.log('seed init Hit!');
//        };

        // Navigate to activityView When some activity is selected
        var activitySelected = function (e) {
            console.log("activitySelected");

            app.mobileApp.navigate('views/vw-checklist-questions.html');
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };


        return {
//            init:init(),
            seed: contacts3Model,
            contacts: contacts3Model.contacts,
            activitySelected: activitySelected
        };

    }());

    return contacts3ViewModel;

}());


