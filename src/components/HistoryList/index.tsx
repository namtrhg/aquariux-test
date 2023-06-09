import { Divider } from "../Divider/Divider";
import { HistoryListItem } from "../HistoryListItem";

export interface SearchHistoryItem {
  city: string;
  country: string;
  time: string;
}

export interface ResultListProps {
  className?: string;
  searchHistory: SearchHistoryItem[];
  onSearch: (city: string, country: string) => void;
  onDelete: (time: string, country: string, city: string) => void;
  isSearching: boolean;
}

export const HistoryList = (props: ResultListProps) => {
  const { className, searchHistory, onSearch, onDelete, isSearching } = props;
  return (
    <div className={className}>
      <p className="font-bold">Search History</p>
      <Divider />
      {searchHistory.length !== 0 ? (
        <div>
          {searchHistory.map((item, index) => (
            <HistoryListItem
              key={index}
              index={index + 1}
              city={item.city}
              country={item.country}
              time={item.time}
              onSearch={() => onSearch(item.city, item.country)}
              onDelete={() => onDelete(item.time, item.country, item.city)}
              isSearching={isSearching}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">No record</p>
      )}
    </div>
  );
};
