import './App.css';
import React, {useEffect, useState} from "react";
import logo from "./greenLogo.png";

function App() {

  // styling variables
  let backgroundBlurred = localStorage.getItem("backgroundBlurred") || true;

  // weather variables

  let srHour = "0";
  let srMinute = "0";
  let ssHour = "0";
  let ssMinute = "0";

  const unit = "imperial";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  function getWeather() {
    const apiKey = "9e611ff8686d07f0077515ec151bb366";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((event) => {
        const lat = event.coords.latitude;
        const lon = event.coords.longitude;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              console.error("response not ok");
            } else {
              return response.json();
            }
          })
          .then(weatherData => {
            // setData(weatherData);
            console.log("Success");

            setData(weatherData);

            console.log(weatherData);

            setLoading(false);

            let srDate = new Date(weatherData * 1000);
            let ssDate = new Date(weatherData * 1000);

            srHour = ('0' + srDate.getHours()).slice(-2);
            srMinute = ('0' + srDate.getMinutes()).slice(-2);

            ssHour = ('0' + ssDate.getHours()).slice(-2);
            ssMinute = ('0' + ssDate.getMinutes()).slice(-2);
          });
      })
    }
  }

  // useEffect(() => {
  //   const apiKey = "9e611ff8686d07f0077515ec151bb366";

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((event) => {
  //       const lat = event.coords.latitude;
  //       const lon = event.coords.longitude;
  //       let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  //       fetch(apiUrl)
  //         .then(response => {
  //           if (!response.ok) {
  //             console.error("response not ok");
  //           } else {
  //             return response.json();
  //           }
  //         })
  //         .then(weatherData => {
  //           // setData(weatherData);
  //           console.log("Success");

  //           setData(weatherData);

  //           console.log(weatherData);

  //           setLoading(false);

  //           let srDate = new Date(weatherData * 1000);
  //           let ssDate = new Date(weatherData * 1000);

  //           srHour = ('0' + srDate.getHours()).slice(-2);
  //           srMinute = ('0' + srDate.getMinutes()).slice(-2);

  //           ssHour = ('0' + ssDate.getHours()).slice(-2);
  //           ssMinute = ('0' + ssDate.getMinutes()).slice(-2);
  //         });
  //     })
  //   }
  // }, []);

  return (
    <div className="App">
      <div className="panel" id="side-menu">
        <div>

          <h2>Location</h2>
          <p>Geolocation (Automatic)</p>
          <p>Selection (Manual)</p>

        </div>

        <div>

          <h2>Units</h2>
          <p>Imperial (F)</p>
          <p>Metric (C)</p>

        </div>

        <div>

          <h2>Theme</h2>
          <p>Dark</p>
          <p>Light</p>

        </div>

        <div>

          <h2>Background</h2>
          <p>Nature</p>
          <p>Mountains</p>
          <label for="background-upload">Upload Image</label>
          <input id="background-upload" type="file" accept="image/png, image/jpg" />
          <p>Blur: {backgroundBlurred ? "ON" : "OFF"}</p>

        </div>

        <div id="jaxweather" onClick={() => {getWeather()}}>

          <img src={logo} alt="" />
          <h2>JaxWeather</h2>

        </div>
      </div>

      <div className="panel" id="info">

        <div id="weather-panel">

          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <h2>Weather in <span>{data.name}, {data.sys.country}</span></h2>

              <div id="temp">
                {Math.round(data.main.temp)}° {unit === "imperial" ? "F" : "C"}
              </div>

              <span id="desc">
                <img src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"} alt="" />
                <p id="desc-text"><u>{data.weather[0].description}</u></p>
              </span>

              <span>
                <p>Humidity: <span>{data.main.humidity}%</span></p>
                <p>Pressure: <span>{data.main.pressure / 1000} atmos.</span></p>
              </span>

              <span>
                <p>High: <span>{Math.round(data.main.temp_max)}° {unit === "imperial" ? "F" : "C"}</span></p>
                <p>Low: <span>{Math.round(data.main.temp_min)}° {unit === "imperial" ? "F" : "C"}</span></p>
              </span>

              {/* <span>
                <p>Sunrise: <span>{srHour}:{srMinute}</span></p>
                <p>Sunset: <span>{ssHour}:{ssMinute}</span></p>
              </span> */}
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;
