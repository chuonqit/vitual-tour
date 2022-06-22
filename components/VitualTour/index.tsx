import dynamic from "next/dynamic";

const VitualTour = dynamic(() => import("./components/VitualTour/VitualTour"), {
  ssr: false,
});

export default VitualTour;
