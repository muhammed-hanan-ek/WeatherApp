import { useState } from 'react';
import './App.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  const getBackgroundImage = () => {
    if (!weatherData) return 'url("https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=")';

    switch (weatherData.weather[0].main) {
      case 'Clear':
        return 'url("https://img.freepik.com/free-photo/white-cloud-blue-sky_1203-9447.jpg")';
      case 'Clouds':
        return 'url("https://t3.ftcdn.net/jpg/03/10/45/78/360_F_310457894_HIpFBaxSQxiptoVgx0y1o4ZGXyH92YO9.jpg")';
      case 'Rain':
        return 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcRiYsQuvvUNAVt3JnzqyyZkUwbybuXm5nlQ&s")';
      case 'Snow':
        return 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3YiC2sGf5psBA-TyunUwj9rwps2wT2j8bjw&s")';
      case 'Thunderstorm':
        return 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNv2iBB-hPttGtAOA1y_XU3GqRD8r2GMsvAw&s")';
      case 'Drizzle':
        return 'url("https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/rain-drops-on-window-1827098_1920.jpg?w=900")';
      default:
        return 'url("https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=")';
    }
  };

  return (
    <div id="main" className="container-fluid">
      <div className="row d-flex" style={{ height: '100vh' }}>
        <div className="col-lg-4"></div>
        <div
          className="col-lg-4 shadow p-4 rounded-5"
          id="main2"
          style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mt-5 d-flex mb-5">
              <FloatingLabel
                className="w-100"
                controlId="floatingSearch"
                label="Search here"
              >
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="Search here"
                />
              </FloatingLabel>
              <button
                style={{ width: '70px' }}
                className="btn btn-primary ms-2 rounded"
                type="submit"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>

          {/* Display city name heading */}
          {city && (
            <h3 className="text-center text-light mb-4">
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </h3>
          )}

          {error && <p className="text-light">{error}</p>}

          {weatherData && (
            <>
              <div className="ms-3 pt-5 d-flex">
                <i id="icon" className="fa-solid fa-cloud-rain text-light"></i>
                <div className="ms-3">
                  <h1 id="celcius" className="text-light fw-bold">
                    {weatherData.main.temp}℃
                  </h1>
                  
                </div>
              </div>

              <div className="container ms-1 mt-5 shadow text-light border rounded py-2 px-3 row w-100">
                <div className="col-lg-6 p-2">
                  <div className="mt-3 d-flex">
                    <i
                      style={{ fontSize: '40px' }}
                      className="fa-solid fa-temperature-three-quarters text-light"
                    ></i>
                    <h2 className="ms-2">{weatherData.main.temp}℃</h2>
                  </div>
                  <p>Temperature</p>

                  <div className="mt-5 d-flex">
                    <i
                      style={{ fontSize: '40px' }}
                      className="fa-solid fa-wind text-light"
                    ></i>
                    <h3 className="ms-2">{weatherData.wind.speed} km/h</h3>
                  </div>
                  <p>Wind Speed</p>
                </div>

                <div className="col-lg-6">
                  <div className="mt-3 d-flex">
                    <i
                      style={{ fontSize: '40px' }}
                      className="fa-solid fa-eye text-light"
                    ></i>
                    <h2 className="ms-2">{weatherData.visibility / 1000} km</h2>
                  </div>
                  <p>Visibility</p>

                  <div className="mt-5 d-flex">
                    <i
                      style={{ fontSize: '40px' }}
                      className="fa-solid fa-cloud-showers-heavy text-light"
                    ></i>
                    <h2 className="ms-2">
                      {weatherData.rain ? weatherData.rain['1h'] : '0'} mm
                    </h2>
                  </div>
                  <p>Rain (Last 1 hour)</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default App;
