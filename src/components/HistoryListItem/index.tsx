import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";
import { Divider } from "../Divider";

export interface HistoryListItemProps {
  index: number;
  city: string;
  country: string;
  time: string;
  onSearch: (city: string, country: string) => void;
  onDelete: (time: string, city: string, country: string) => void;
}

export const HistoryListItem = (props: HistoryListItemProps) => {
  const { index, city, country, time, onSearch, onDelete } = props;

  return (
    <div>
      <div className="flex justify-between items-center text-sm">
        <p>
          {index}.{city}, <span className="uppercase">{country}</span>
        </p>
        <div className="flex items-center space-x-3">
          <p className="text-xs">{time}</p>
          <button onClick={() => onSearch(city, country)}>
            {
              <SearchIcon className="h-7 w-7 p-1 bg-gray-200 rounded-full flex justify-center items-center" />
            }
          </button>
          <button onClick={() => onDelete(time, country, city)}>
            {
              <TrashIcon className="h-7 w-7 p-1 bg-gray-200 rounded-full flex justify-center items-center" />
            }
          </button>
        </div>
      </div>
      <Divider color="gray-200" />
    </div>
  );
};
