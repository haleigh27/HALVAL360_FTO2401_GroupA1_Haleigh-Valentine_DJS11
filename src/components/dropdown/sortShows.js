// Sorting function
export default function sortShows(items, option) {
  const sortedArray = [...items];

  switch (option) {
    case 'a-z':
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'z-a':
      sortedArray.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'date_ascending':
      sortedArray.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      break;
    case 'date_descending':
      sortedArray.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      break;
    default:
      break;
  }

  return sortedArray;
}
