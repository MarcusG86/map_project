export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = "AIzaSyAmH9SvsLSUf76F6hTzXqA7bly0_46aNWk";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    // Alerts user if data is not retrieved from API
    window.gm_authFailure = () =>  {
      alert('Error loading page...');

       }
    document.body.appendChild(script);

  });

}



// Load foursquare API
export function load_places() {
  let city = "Phoenix, AZ";
  let query = "shopping";
  var apiURL =
    "https://api.foursquare.com/v2/venues/search?client_id=TZXA1I2LTTCSDSCHY0K31HPIBLDZ3GJCFZ1GIX2HWWHYL3SI&client_secret=LDTK5GXKLVQT4AGOKPIRJIRDTQGRFNYWJBKTMGW0ZYTQQ4UP&v=20180323&limit=50&near=" +
    city +
    "&query=" +
    query +
    "";
  return fetch(apiURL).then(resp => resp.json());
}
