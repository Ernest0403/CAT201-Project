import React from "react";
import ItemListing from "./Component/ItemListing";

const DiningRoomCategories = [
  "Dining Table",
  "Dining Chair",
  "Bar Stool",
  "Bar Table",
  "Sideboard"
];

const DiningRoomPage = () => (
  <ItemListing
    title="Dining Room"
    dataEndpoint="https://example.com/api/living-room-products"
    categories={DiningRoomCategories}
    roomType="Dining Room"
  />
);

export default DiningRoomPage;
