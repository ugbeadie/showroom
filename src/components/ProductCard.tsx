import React from "react";
import { Link } from "react-router-dom";

type ProductCardType = {
  id: string;
  title: string;
  image: string;
  price: number;
};

const ProductCard = ({ id, title, image, price }: ProductCardType) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />
        <h2 className="font-bold">{title}</h2>
        <p>${price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
