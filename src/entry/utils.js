import { useCallback } from "react";

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

// Return the filter method.
export function useFilter(value, search) {
  return useCallback(
    function(data) {
      var isSearchMatch = !search
        ? true
        : data.title.toLowerCase().indexOf(search) > -1;
      var isFilterMatch = value === "all" ? true : data.color === value;
      return isSearchMatch && isFilterMatch;
    },
    [value, search]
  );
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
  const items = [];
  for (let i = 0; i < 3; i++) {
    const color = oneOf(["red", "green", "blue"]);
    const width = oneOf([1, 2]);
    const height = oneOf([1, 2]);

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const title = oneOf(alphabet) + oneOf(alphabet);
    const id = uuid++;

    items.push({ id, color, width, height, title });
  }

  return items;
}

// Grid static options.
export const layoutOptions = {
  dragReleaseDuration: 400,
  dragSortHeuristics: {
    sortInterval: 60
  },
  layoutDuration: 400,
  dragReleseEasing: "ease",
  layoutEasing: "ease",
  dragEnabled: true,
  dragContainer: document.body,
  // The placeholder of an item that is being dragged.
  dragPlaceholder: {
    enabled: true,
    duration: 400,
    createElement: function(item) {
      return item
    }
  }
};
