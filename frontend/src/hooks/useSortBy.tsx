import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useSortBy = <T,>(
  data: T[],
  defaultKey?: string,
  defaultDirection: "asc" | "desc" = "asc"
) => {
  const [searchParams] = useSearchParams();

  const sortKey = searchParams.get("sort")?.split("-")[0] || defaultKey;
  const sortDirection = (searchParams.get("sort")?.split("-")[1] ||
    defaultDirection) as "asc" | "desc";

  const sortedData = useMemo(() => {
    if (!data || !sortKey) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0; // for unsupported types, keep the original order
    });
  }, [data, sortKey, sortDirection]);

  return { sortedData, sortKey, sortDirection };
};

export default useSortBy;
