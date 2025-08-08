import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("https://dev.osonapteka.uz/api/web/Product/Popular")
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [slug]);


  return (
    <div>
      <h1>{product?.productName}</h1>
      <img src={product.imageURI} alt={product.productName} />
      <p>Brend: {product.brandName}</p>
      <p>Ishlab chiqaruvchi: {product.manufacturerName}</p>
      <p>Minimal narx: {product.minPrice?.toLocaleString()} сум</p>
      <p>Maksimal narx: {product.maxPrice?.toLocaleString()} сум</p>
    </div>
  );
}

export default ProductDetail;
