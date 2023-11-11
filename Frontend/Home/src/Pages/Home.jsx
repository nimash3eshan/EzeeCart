import { Box } from "@chakra-ui/react";
import React from "react";
import BudgetBazaar from "../Components/BudgetBazaar";
import DailyEssentails from "../Components/DailyEssentials";
import DealsOfTheDay from "../Components/DealsOfTheDay";
import FestiveSpecials from "../Components/FestiveSpecials";
import { Curosel } from "../Components/Navbar/Curosel";
import PrimeMall from "../Components/PrimeMall";
import TrendingFashionZone from "../Components/TrendingFashionZone";
import YourGadgetsStore from "../Components/YourGadgetsStore";
import ProductDisplay from "../Components/ProductDisplay";

const Home = () => {
  return (
    <Box bg={"#eef6f9"}>
      <Curosel/>
      <ProductDisplay />
      {/* <DealsOfTheDay />
      <YourGadgetsStore />
      <DailyEssentails />
      <PrimeMall />
      <FestiveSpecials />
      <TrendingFashionZone />
      <BudgetBazaar /> */}
    </Box>
  );
};

export default Home;
