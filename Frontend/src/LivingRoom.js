import React from "react";
import { useParams } from "react-router-dom";
import ItemListing from "./Component/ItemListing";

const livingRoomCategories = [
  "Sofas",
  "Coffee Tables",
  "Cabinet",
  "TV Cabinet",
  "Recliner",
  "Pouf",
  "Lounge Chair"
];

const LivingRoomPage = () => {
  const { category } = useParams();

  return(
    <ItemListing
      title="Living Room"
      categories={livingRoomCategories}
      roomType="Living room"
      defaultCategory={category ? category.replace("-", " ") : ""}
    />
  );
};

export default LivingRoomPage;
