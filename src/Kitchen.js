import React from "react";
import ItemListing from "./Component/ItemListing";

const KitchenCategories = [
  "Base Cabinet",
  "Wall Cabinet",
  "Wine Rack",
  "Wine Rack",
  "Kitchen Cart"
];

const KitchenPage = () => (
  <ItemListing
    title="Kitchen"
    dataEndpoint="https://example.com/api/living-room-products"
    categories={KitchenCategories}
    roomType="Kitchen"
  />
);

export default KitchenPage;
