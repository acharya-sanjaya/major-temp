const useFilter = (data: Record<string, any>[], searchKey: string): Record<string, any>[] => {
  const lowerSearchKey = searchKey.toLowerCase();
  if (!lowerSearchKey || data.length === 0) {
    return data;
  }

  const filteredData = data.filter((item) => {
    return Object.keys(item).some((key) => {
      if (key === "id") return false;
      const value = item[key]?.toString().toLowerCase() || "";
      return value.includes(lowerSearchKey);
    });
  });

  return filteredData;
};

export default useFilter;
