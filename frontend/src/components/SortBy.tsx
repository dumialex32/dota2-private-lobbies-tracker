import { useSearchParams } from "react-router-dom";
import FormRow from "./FormRow";

interface SortOption {
  value: string;
  label: string;
}

const SortBy: React.FC<{ sortOptions: SortOption[] }> = ({ sortOptions }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get("sort") || sortOptions[0].value;
  console.log(currentValue);
  const handleSortValue = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return (
    <FormRow label="Sort By">
      <select
        id="sortBySelect"
        value={currentValue}
        onChange={(e) => handleSortValue(e.target.value)}
      >
        {sortOptions.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
    </FormRow>
  );
};

export default SortBy;
