import Arrival from "./arrival/arrival";
import Banner from "./banner/banner";
import Brands from "./brands/brands";
import Men from "./menCategories/men";
import Saving from "./savingZone/saving";
import Slider from "./slider/slider";
import Women from "./womenCategories/women";

function Shop() {
  return (
    <>
      <Slider />
      <Arrival />
      <Saving/>
      <Banner/>
      <Men/>
      <Women/>
      <Brands/>
    </>
  );
}
export default Shop;
