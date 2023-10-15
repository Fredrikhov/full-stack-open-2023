import { useEffect, useState } from "react";
import { getAll } from "../services/fetchData";

type TWeather = {
  wind: {
    speed: number;
    deg: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

interface ILand {
  land: string | undefined;
}

export const Weather = ({ land }: ILand) => {
  const [currentWeather, setCurrentWather] = useState<Partial<TWeather>>({});
  const API_KEY = import.meta.env.VITE_KEY;
  useEffect(() => {
    if (Object.keys(currentWeather).length === 0) {
      getWeather();
    } else {
      console.log(currentWeather);
    }
  });
  const getWeather = () => {
    try {
      getAll(
        `https://api.openweathermap.org/data/2.5/weather?q=${land}&units=metric&appid=${API_KEY}`
      ).then((response) => setCurrentWather(response));
    } catch (er) {
      console.log(`ERROR: ${er} `);
    } finally {
      console.log("Finally clause");
    }
  };
  console.log(API_KEY);

  return (
    <>
      <div>Weather in {land}</div>
      <img
        src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}@2x.png`}
      />
      <p>Temperature: {currentWeather.main?.temp} Celsius</p>
      <p>Wind: {currentWeather.wind?.speed} m/s</p>
    </>
  );
};
