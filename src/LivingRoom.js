import React from "react";
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

const LivingRoomPage = () => (
  <ItemListing
    title="Living Room"
    dataEndpoint="https://example.com/api/living-room-products"
    categories={livingRoomCategories}
    roomType="Living Room"
  />
);

export default LivingRoomPage;
