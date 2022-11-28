export const filterForKey = (arrayToFilter, keyToFilter, valueToFilter) => {
  return arrayToFilter.filter(
    (element) => element[keyToFilter] === valueToFilter
  );
};
