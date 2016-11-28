    /*
     This File Was Coded By Amin Arjmand | Email: aminarj2000@gmail.com | Site: aminarjmand.com | Github Profile : https://github.com/sibche2013
     */

    //Find Latitude & Longitude
    function geolocationSuccess(position) {
        var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 10,
            center: userLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Draw the map
        var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

        // Place the marker
        var marker = new google.maps.Marker({
            map: mapObject,
            position: userLatLng,
            title: "Your Position:" + userLatLng + "",
            icon: "Marker.png",
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
            //description: "You Are Here"
        });

        //Write Address +  Latitude + Longitude
        function locationInfo() {
            var geocoder = new google.maps.Geocoder();
            var lat, lng, address;
            geocoder.geocode({'latLng': marker.getPosition()},
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            lat = marker.getPosition().lat();
                            lng = marker.getPosition().lng();
                            address = results[0].formatted_address;
                            document.getElementById("location").innerHTML = "<strong>Your Latitude Position: </strong>" + lat + "<br><strong>Your Langitude Position: </strong>" + lng + "<br><strong>Your Location Address: </strong>" + address;

                            //Add Description Box On Marker
                            infoWindow = new google.maps.InfoWindow();
                            infoWindow.setContent("<strong>Your Address: </strong>" + address);
                            infoWindow.open(map, marker);
                        } else {
                            document.getElementById("error").innerHTML += "Unable To Retrieve Your Address" + "<br />";
                        }
                    });
        }

        //Write Address On Documentation Load
        locationInfo();

        //Write Address By Changing The Marker Place
        google.maps.event.addListener(marker, "dragend", function (e) {
            locationInfo();

            //Print latitude & longitude Location On Dragging
            marker.title = "Your New Position: " + marker.getPosition().lat() + "," + marker.getPosition().lng();

            //Close Info Window After Changing Location And Open New Window
            infoWindow.close();
        });
    }

    //If Cant Reach To Google Maps And Have Error
    function geolocationError(error) {
        var x = document.getElementById("error");
        document.getElementById("error").style.display = "block";
        document.getElementById("location").style.display = "none";
        document.getElementById("map").style.display = "none";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "You denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }

    function geolocateUser() {
        // If the browser supports the Geolocation API
        if (navigator.geolocation) {
            var positionOptions = {
                enableHighAccuracy: true,
                timeout: 10 * 1000 // 10 seconds
            };
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
        }
        else
            document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
    }

    window.onload = geolocateUser;