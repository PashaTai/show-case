import { Helmet } from "react-helmet";
import BioHero from "@/components/biography/bio-hero";
import BioIntro from "@/components/biography/bio-intro";
import Timeline from "@/components/biography/timeline";
import Achievements from "@/components/biography/achievements";

export default function Biography() {
  return (
    <>
      <Helmet>
        <title>Biography | Andrew Ivanov</title>
        <meta name="description" content="Learn about Andrew Ivanov's journey and achievements in the marketing industry over the past two decades." />
      </Helmet>
      <div className="space-y-0">
        <BioHero />
        <BioIntro />
        <Timeline />
        <Achievements />
      </div>
    </>
  );
}
