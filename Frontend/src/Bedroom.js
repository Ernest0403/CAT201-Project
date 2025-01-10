import React from "react";
import { useParams } from "react-router-dom";
import ItemListing from "./Component/ItemListing";

const BedroomCategories = [
  "Bed Frame",
  "Bedside Table",
  "Wardrobe",
  "Chest of Drawers",
  "Dressing Table"
];

const BedroomPage = () => {
  const { category } = useParams();

  return(
    <ItemListing
      title="Bedroom"
      categories={BedroomCategories}
      roomType="Bedroom"
      defaultCategory={category ? category.replace("-", " ") : ""}
    />
  );
};

export default BedroomPage;
