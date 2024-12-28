import React from "react";
import ItemListing from "./Component/ItemListing";

const WorkRoomCategories = [
  "Desk",
  "Chair",
  "Bookcase",
  "Children's Desk",
  "Children's Desk Chair"
];

const WorkRoomPage = () => (
  <ItemListing
    title="Work/Study Room"
    dataEndpoint="https://example.com/api/living-room-products"
    categories={WorkRoomCategories}
    roomType="Work/Study Room"
  />
);

export default WorkRoomPage;
