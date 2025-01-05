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
      dataEndpoint="https://example.com/api/living-room-products"
      categories={livingRoomCategories}
      roomType="Living Room"
      defaultCategory={category ? category.replace("-", " ") : ""}
    />
  );
};

export default LivingRoomPage;
