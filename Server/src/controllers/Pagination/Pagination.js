export function paginate(data, pagina, limite) {
  const page = parseInt(pagina);
  const limit = parseInt(limite);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = data.slice(startIndex, endIndex);
  return results;
}
