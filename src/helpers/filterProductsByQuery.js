export default function filterProductsByQuery(products, query) {
  const transformedQuery = query.toLowerCase();

  return products.filter((product) => product.available
      && (product.name.toLowerCase().includes(transformedQuery)
        || product.id.toString().includes(transformedQuery)));
}
