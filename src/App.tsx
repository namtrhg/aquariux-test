/* eslint-disable react-hooks/rules-of-hooks */
import { Divider } from "./components/Divider";
import { FormInput } from "./components/FormInput";
import { Result, ResultProps } from "./components/Result";
import { HistoryList } from "./components/HistoryList";
import { useEffect, useState } from "react";
import { useGetTimezoneDate } from "./hooks/useGetTimezoneDate";
import { HistoryListItemProps } from "./components/HistoryListItem";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [data, setData] = useState<ResultProps>()
  const [searchHistory, setSearchHistory] = useState<Array<{ city: string, country: string, time: string }>>([])
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (city: string, country: string) => {
    if (!isSearching) {
      setIsSearching(true);
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const timezoneDate = await useGetTimezoneDate(data.timezone);
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        const newSearchEntry = {
          city: data.name,
          country: data.sys.country,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
        };
        searchHistory.unshift(newSearchEntry);
        if (searchHistory.length > 20) {
          searchHistory.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        setData({
          city: data.name,
          country: data.sys.country,
          status: data.weather[0].main,
          description: data.weather[0].description,
          temperatureMin: data.main.temp_min,
          temperatureMax: data.main.temp_max,
          humidity: data.main.humidity,
          time: timezoneDate
        });
        setError(null);
      } catch (error: any) {
        setError(error);
      }
      setTimeout(() => setIsSearching(false), 3000);
    }
  };

  const handleDelete = (time: string, country: string, city: string) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    const updatedHistory = history.filter((item: HistoryListItemProps) => item.time !== time)
    console.log(time, country, city);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
    setSearchHistory(updatedHistory)
  }

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    setSearchHistory(history)
  }, [data])

  return (
    <div className="p-2 lg:p-0 lg:container lg:mx-auto">
      <p className="font-bold">Today's Weather</p>
      <Divider />
      <FormInput handleSearch={handleSearch} isSearching={isSearching}/>
      {data && !error &&
        <Result className="mt-10 lg:px-10" city={data?.city} country={data?.country} status={data?.status} description={data?.description} temperatureMin={data?.temperatureMin} temperatureMax={data?.temperatureMax} humidity={data?.humidity} time={data?.time} />
      }
      {error && <div className="px-2 mt-4 bg-red-100 border border-red-500 rounded-sm">Not found</div>}
      <HistoryList className="mt-10" searchHistory={searchHistory} onSearch={handleSearch} onDelete={(time, country, city) => handleDelete(time, country, city)} />
    </div>
  );
}

export default App;
