import React from "react";
import ItemListing from "./Component/ItemListing";

const BedroomCategories = [
  "Bed Frame",
  "Bedside Table",
  "Wardrobe",
  "Chest of Drawers",
  "Dressing Table"
];

const BedroomPage = () => (
  <ItemListing
    title="Bedroom"
    dataEndpoint="https://example.com/api/living-room-products"
    categories={BedroomCategories}
  />
);

export default BedroomPage;
