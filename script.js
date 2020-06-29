//step:01 
    //get the user input from  the search-for-a-city box
            //this will be used to make a button and used to create the queryURL 
        //create event listener for search button (or for when user hits enter key) so that when it is clicked
            //the existing buttons are cleared 
            //the new city is added to the array of cities that will be rendered into buttons
            //the button display has a limit of 7 



//variable holding all city inputs
var cities = ["Annapolis", "baltimore"];

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
    if (cities.length > 7) {
        cities.shift();
    }
    //the input field is cleared
    userInput.val("");
    //run the renderButtons function
    renderButtons();
});

//step:02
    //make the query url so that...
        //the key is given a variable for easy legibility
        //the user input variable is used in the url construction 
        //the 5 day weather forcast is targeted 

//variables to hold the api key and city name
var APIkey = "f3a5e880c02f964b81ed551a1ebed72e";
    //placeholder stagnant city name while testing
var cityName = "annapolis";
//make query URL using the city variable as a search feature
var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + 
cityName + "&units=imperial&appid=" +
APIkey;

$.ajax({
    url: queryURL,
    method: "GET"
    })

    .then(function(response) {
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
                $("#today-uv").text("UV Index: " + response.daily[0].uvi);
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
//step:03
        //the buttons are rendered:
            //a for loop is created in which each for each city    
                //a new button is created
                //the user input becomes the inner text of the button 
                //the button is assigned the class city-button 
                //the button is prepended to the 'saved-cities' div
                    //will prepending make this show up first if it is the last item in the array? or when i push will i need to add it to the beginning of the array

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
        //give it the inner text of the current city
        cityButton.text(cities[i]);
        //add it to the top of the city-button div
        $(".saved-cities").prepend(cityButton);
    }
}
//step:04 
    //make the data from the user's most recent selected city populates the two areas on the right of the site
    
    //in the loop for the city buttons
        //add an event listener so that when the button is clicked
            //in the today's weather area
                //the header recieves as its inner html the name of the city searched, the current date, and the icon of the weather forcast
                //the today-temp p recieves temperature information
                //the today-today-humid p recieves humidity information
                //the today-wind p recieves wind-speed information
                //the today-uv p recieves uv index information
            //in the 5 day forcast area
                //a new for-loop or for-each statement so that
                    //the day-display div is cleared 
                    //a new div is created
                    //the div is given the class "future forecast"
                        //a new h3 is created with the class "date"
                            //the h3 is given the inner text of that day's date from the API
                        //a new h2 is created with the class "weather-icon"
                            //the h2 is given the inner html of that day's icon from the API
                        //a new p is created with the class "temp"
                            //the p is given the inner text of that day's temp from the API
                        //a new p is created withthe class "humidity"
                            //the p is given the inner text of that days humidity from the API
                    //the new h3, h2, and ps are appended to the future-forcast div
                    //the future forcast div is appended to the day display div
        
//step:05 
    //local storage
        //the city array to local storage and pull it to populate the page
        //the current clicked city button will be saved to local storage so that its info populates the dashboard when opened

 