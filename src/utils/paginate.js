import _ from "lodash";

export function paginate(movieList, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return _.slice(movieList, startIndex, endIndex);
}
