/**
 * Tiles view model
 */

var app = app || {};

app.Tiles = (function () {
    'use strict'
    
    // Tiles model
    var tilesModel = (function () {

        var url = "https://cdn.contentful.com/spaces/zpp0viuq4x1e/entries";
        var token = "Bearer 31d5775c68437c57df39ebdde118dff797e89a545408ccb981abdb2908e79b60";
        var contentTypeHeader = "application/json";
        var contentType = "3pkmDE66VieGaQm8GsSwIu";

        var assetDS = new kendo.data.DataSource({
            transport: {
                 read: {
                    url: url,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', token),
                        xhr.setRequestHeader('Content-Type', contentTypeHeader)
                    },
                    dataType: "json",
                    data: {
                        content_type: contentType
                    }
                }
            },
            schema: {
                data: "includes.Asset",
                type: "json",
                model: {
                    fields: {
                        imageId: "sys.id",
                        imageUrl: "fields.file.url"
                    }
                }
            }
        });

        var tilesDataSource = new kendo.data.DataSource({
            transport: {
               read: {
                    url: url,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', token),
                            xhr.setRequestHeader('Content-Type', contentTypeHeader)
                    },
                    dataType: "json",
                    data: { content_type: contentType }
                }
            },
            // filter: { field: "fields.image2", operator: "neq", value: "" },
            // filter: { field: "fields.type.sys.id", operator: "neq", value: "" },

            schema: {
                data: "items",
                type: "json",
                model: {
                    fields: {
                        name: "fields.name",
                        type: "fields.type",
                        size: "fields.size",
                        security: "fields.security",
                        imageId: "fields.image.sys.id",
                        content: "fields.content"
                    },
                    GetUrl: function () {

                        var data = assetDS.data();
                        var arrayLength = data.length;
                        var assetId = this.get('fields.image.sys.id');

                        for (var i = 0; i < arrayLength; i++) {
                            var asset = assetDS.at(i)
                            if (asset.imageId == assetId)
                                return asset.imageUrl;
                        }
                    }
                }
            },
            requestStart: function() {
//                kendo.ui.progress($("#tiles"), true);
            },
            requestEnd: function() {
//                kendo.ui.progress($("#tiles"), false);
            }

        });

//        assetDS.fetch(function(){
//
//            var data = assetDS.data();
//
//            console.log('TLES ASSET DATA', data);
//
//            tilesDataSource.fetch(function() {
//
//                var data2 = tilesDataSource.data();
//                console.log('TLES DATA', data2);
//
//            });
//        });

        return {
            tiles: tilesDataSource
        };
        
    }());

    // Tiles view model
    var tilesViewModel = (function () {

        var tileSelected = function (e) {

            //app.mobileApp.navigate('views/newsView.html?uid=' + e.data.uid);

          //  var content = e.data.content;

           //  alert(content);

            var tileType = e.data.type;

            if (tileType == 'Contact') {

              //   app.mobileApp.navigate('views/activityView.html?uid=' + e.data.security);

                 app.mobileApp.navigate('views/contactsView.html?uid=' + e.data.name);

            }
            else if (tileType == 'News') {

                app.mobileApp.navigate('views/newsView.html?uid=' + e.data.content);
            }
            else if (tileType == 'Promo') {

                alert('This is a prono tile');

            }
            else if (tileType == 'Checklist') {

                alert('Display Checklist');

            }


//            if (e.data.Type == "contact")
//            {
//		    	app.mobileApp.navigate('views/contactsView.html?uid=' + e.data.uid);
//       		}
//            else if (e.data.Type = "news")
//            {
//                var url = e.data.Link;
//               // alert(url);
//               // app.mobileApp.navigate('views/splitview.html?link=' + e.data.Link);
//                app.mobileApp.navigate('views/newsView.html?link=' + e.data.Link);
//            }
//            else
//            {
//                app.mobileApp.navigate('views/tileView.html?uid=' + e.data.uid);
//            }
        };
      
     var navigateHome = function () {
            
            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {
            
            app.helper.logout()
             .then(navigateHome, function (err) {
                 app.showError(err.message);
                 navigateHome();
            });
        };
        
        return {
            tiles: tilesModel.tiles,
            tileSelected: tileSelected,
            logout: logout
        };
        
    }());
    
    return tilesViewModel;
    
}());
