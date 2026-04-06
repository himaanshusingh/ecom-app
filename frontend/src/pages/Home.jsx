import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetter from "../components/NewsLetter";
import OurPolicy from "../components/OurPolicy";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </>
  );
}
