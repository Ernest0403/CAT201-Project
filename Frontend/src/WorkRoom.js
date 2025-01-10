import React from "react";
import { useParams } from "react-router-dom";
import ItemListing from "./Component/ItemListing";

const WorkRoomCategories = [
  "Desk",
  "Chair",
  "Bookcase",
  "Children's Desk",
  "Children's Desk Chair"
];

const WorkRoomPage = () => {
  const { category } = useParams();

  return(
    <ItemListing
      title="Work/Study Room"
      categories={WorkRoomCategories}
      roomType="Work Room"
      defaultCategory={category ? category.replace("-", " ") : ""}
    />
  );
};

export default WorkRoomPage;
