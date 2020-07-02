//wait until everything is loaded to show items
$(document).ready(function () {
    
    //get cities array from local storage
    var cities = JSON.parse(localStorage.getItem("cities"));
    //if nothing is in local storage, default to 'Baltimore'
    cities = cities ? cities : ["Baltimore"];
    //display buttons for any existing items in the array
    renderButtons();

    //event listener for submit button 
    $("#city-submit").on("click", function(event) {
        event.preventDefault();
        //made a variable for the user input and a variable for the city value
        var userInput = $("#user-input");
        var city = userInput.val().trim();
        //if the user inputs nothing, nothing is added to the array
        if (city === "") {
            return;
        }
        //if the user inputs a city it is added to the array
        cities.push(city);
        //limit the array to 7 cities
        if (cities.length > 8) {
            cities.shift();
        }
        //the input field is cleared
        userInput.val("");
        //add cities array to local storage
        localStorage.setItem("cities", JSON.stringify(cities));
        //set the city searched as the selected city in local storage
        localStorage.setItem("selected-city", city);
        //run the renderButtons function
        renderButtons();
        //run the display city info function
        displayCityInfo();
    });

    //Set a default city and run the display city info function upon opening
    var defaultCity = "Baltimore"
    displayCityInfo();

    function displayCityInfo() {
        //variable to hold the api key
        var APIkey = "f3a5e880c02f964b81ed551a1ebed72e";
        //get the selected city name from local storage  
        var selectedCity = localStorage.getItem("selected-city");
        //if local storage is empty, display the default city
        selectedCity = selectedCity ? selectedCity : defaultCity;
        //make query URL using the selected city variable as a search feature
        var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + 
            selectedCity + "&units=imperial&appid=" +
            APIkey;
            console.log(selectedCity + "in function");

        $.ajax({
            url: queryURL,
            method: "GET"
            })

            .then(function(response) {
                console.log(response);
                //Populating today's weather forcast
                //making the icon into an image
                var iconCode = response.list[0].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                //making the title using the name from the current weather API, the current date from moment.js, and the weather icon we created
                $("#city-name").html(response.list[0].name + moment().format(" (M  / D / YYYY) ") + "<img id='today-icon' src=" + iconURL + " alt='Weather icon'>");
                //populating the rest of the information excluding UV, which isn't present in this API
                $("#today-temp").html("Temperature: " + response.list[0].main.temp + " &#8457;");
                $("#today-humid").text("Humidity: " + response.list[0].main.humidity + " %");
                $("#today-wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
            
                //creating new api using lat + long information for current city to find daily future forcast array
                var uvQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                    response.list[0].coord.lat +
                    "&lon=" + 
                    response.list[0].coord.lon +
                    "&exclude=current,minutely,hourly&units=imperial&appid=" +
                    APIkey;
                
                $.ajax({
                    url: uvQuery,
                    method: "GET"
                })
                    
                    .then(function(response) {
                        //use that new api first to find the UV index of the first day
                        $("#today-uv").text(response.daily[0].uvi);

                        //add styling to show uv index warnings
                        if (response.daily[0].uvi < 3) {
                            $("#today-uv").addClass("low-uv");
                        }else if (response.daily[0].uvi > 7) {
                            $("#today-uv").addClass("high-uv");
                        }else {
                            $("#today-uv").addClass("mid-uv");
                        }

                        //clear current day-display
                        $("#day-display").empty();
                        
                        //for 5 days
                        for (var i = 0; i < 5; i++) {
                            //create a div and assign it the class future-forcast
                            var futureForcast = $("<div>");
                            futureForcast.addClass("future-forcast");
                            
                            //create a header with the class date and give it the value of the date for the next 5 days
                            var date = $("<h3>");
                            date.addClass("date");
                            var today = moment();
                            //since i starts at zero, add 1 to start at adding 1
                            var tomorrow = today.add((i+1), 'days');
                            date.text(moment(tomorrow).format("M/D/YYYY"));
                            
                            //create a link for the weather icon 
                            var futureIconCode = response.daily[i+1].weather[0].icon;
                            var futureIconURL = "http://openweathermap.org/img/w/" + futureIconCode + ".png";
                            //create a new image tag with the class weather-icon
                            var forcastIcon = $("<img>");
                            forcastIcon.addClass("weather-icon");
                            //give it the src of the link we created an add an alternate
                            forcastIcon.attr("src", futureIconURL);
                            forcastIcon.attr("alt", "weather icon");

                            //create a p tag for the temp and give it the class temp
                            var temp = $("<p>");
                            temp.addClass("temp");
                            //make temp's inner html the temp for that day
                            temp.html("Temp: " + response.daily[i+1].temp.day + " &#8457;");

                            //create a p tag for humidity and give it the class humidity
                            var humidity = $("<p>");
                            humidity.addClass("humidity");
                            //make its text the humidity for that day
                            humidity.text("Humidity: " + response.daily[i+1].humidity);

                            //append the date, forcast icon, temp, and humidity to the future forcast div we created
                            futureForcast.append(date, forcastIcon, temp, humidity);
                            //append the forcast div to the day-display holding div
                            $("#day-display").append(futureForcast);
                        }
                    });
            });
    }
    //function for displaying the city buttons
    function renderButtons() {
        //clear current buttons
        $(".saved-cities").empty();
        //for each city in the array
        for (var i = 0; i < cities.length; i++) {
            //create a button
            var cityButton = $("<button>");
            //give it the city-button class 
            cityButton.addClass("city-button");
            //give it the data-name of the current city
            cityButton.attr("data-name", cities[i]);

            cityButton.attr("value", i);
            //give it the inner text of the current city
            cityButton.text(cities[i]);
            //add it to the top of the city-button div
            $(".saved-cities").prepend(cityButton);
        }
    }
    //click event for city buttons
    $(document).on("click", ".city-button", function() {
        //add selected city to local storage
        localStorage.setItem("selected-city", ($(this).attr("data-name")));
        //run the display info function
        displayCityInfo();
    });
});

 