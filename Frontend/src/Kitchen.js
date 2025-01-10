import React from "react";
import { useParams } from "react-router-dom";
import ItemListing from "./Component/ItemListing";

const KitchenCategories = [
  "Base Cabinet",
  "Wall Cabinet",
  "Wine Rack",
  "Wine Rack",
  "Kitchen Cart"
];

const KitchenPage = () => {
  const { category } = useParams();

  return(
    <ItemListing
      title="Kitchen"
      categories={KitchenCategories}
      roomType="Kitchen"
      defaultCategory={category ? category.replace("-", " ") : ""}
    />
  );
};

export default KitchenPage;
