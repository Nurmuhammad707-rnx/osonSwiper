import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from '../Store/productStore';

function StorePrice() {
  const { slug } = useParams(); 
  const { stores, getProductStores, loading } = useProductStore();

  useEffect(() => {
    console.log( slug);
    if (slug) {
      getProductStores(slug, 1);
    }
  }, [slug, getProductStores]);

  if (loading) return <p>yuklanmoqda...</p>;

  return (
    <div>
      <h2>Dorixonalar</h2>
{stores.length === 0 ? (
  <p>doori yo</p>
) : (
  stores.map((store, i) => (
    <div key={i} className="store-card">
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <p> {store.regionName}, {store.parentRegionName}</p>
      <p> {store.openTime} - {store.closedTime}</p>

      {store.productList.map((p, j) => (
        <div key={j} className="product-info">
          <strong>{p.productName}</strong>
          <p>{p.brandName}</p>
          <p> {p.price} so‘m</p>
          <p> {p.manufacturerName}</p>
          <p> Yaroqlilik: {new Date(p.expirationDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  ))
)}

    </div>
  );
}

export default StorePrice;
