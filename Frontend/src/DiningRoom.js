import React from "react";
import { useParams } from "react-router-dom";
import ItemListing from "./Component/ItemListing";

const DiningRoomCategories = [
  "Dining Table",
  "Dining Chair",
  "Bar Stool",
  "Bar Table",
  "Sideboard"
];

const DiningRoomPage = () => {
  const { category } = useParams();

  return(
    <ItemListing
      title="Dining Room"
      categories={DiningRoomCategories}
      roomType="Dining Room"
      defaultCategory={category ? category.replace("-", " ") : ""}
    />
  );
};

export default DiningRoomPage;
