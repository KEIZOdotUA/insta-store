export default function filterProductsByQuery(products, query) {
  return products.filter((product) => product.available
      && product.name.toLowerCase().includes(query.toLowerCase()));
}
