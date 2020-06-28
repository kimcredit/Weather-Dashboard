//step:01 
    //get the user input from  the search-for-a-city box
            //this will be used to make a button and used to create the queryURL 
        //create event listener for search button (or for when user hits enter key) so that when it is clicked
            //the existing buttons are cleared 
            //the new city is added to the array of cities that will be rendered into buttons
            //the button display has a limit of 7 

//step:02
    //make the query url so that...
        //the key is given a variable for easy legibility
        //the user input variable is used in the url construction 
        //the 5 day weather forcast is targeted 

//step:03
        //the buttons are rendered:
            //a for loop is created in which each for each city    
                //a new button is created
                //the user input becomes the inner text of the button 
                //the button is assigned the class city-button 
                //the button is prepended to the 'saved-cities' div
                    //will prepending make this show up first if it is the last item in the array? or when i push will i need to add it to the beginning of the array

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