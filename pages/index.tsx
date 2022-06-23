import type { NextPage } from "next";
import VitualTour from "../components/VitualTour";
import VitualType from "../components/VitualTour/libs/VitualType";

const objects: VitualType = {
  default: {
    firstScene: "sky",
    sceneFadeDuration: 1200,
  },
  info: {
    name: "trường cao đẳng fpt polytechnic",
    content: "sdkakldajsdlajsdlajsdlkajsdlkasjdlkasd",
    galleries: [
      "https://swiperjs.com/demos/images/nature-1.jpg",
      "https://swiperjs.com/demos/images/nature-2.jpg",
      "https://swiperjs.com/demos/images/nature-3.jpg",
      "https://swiperjs.com/demos/images/nature-4.jpg",
      "https://swiperjs.com/demos/images/nature-5.jpg",
      "https://swiperjs.com/demos/images/nature-6.jpg",
      "https://swiperjs.com/demos/images/nature-7.jpg",
      "https://swiperjs.com/demos/images/nature-8.jpg",
      "https://swiperjs.com/demos/images/nature-9.jpg",
      "https://swiperjs.com/demos/images/nature-10.jpg",
    ],
  },
  scenes: [
    {
      _id: "house",
      room: "Ngôi nhà",
      hfov: 120,
      pitch: 12.827447381555467,
      yaw: 116.75064961832777,
      type: "equirectangular",
      panorama: "https://pannellum.org//images/bma-0.jpg",
      annotation: {
        title: "Title annotation",
        content: "content annotation...",
      },
      hotSpots: [
        {
          pitch: -0.6,
          yaw: 37.1,
          type: "scene",
          text: "Mason Circle",
          sceneId: "sky",
        },
        {
          handler: true,
          pitch: 8.884999825237239,
          yaw: 87.38770793184939,
          type: "info",
          text: "Mason Circle",
          draggable: true,
          args: { name: 1, age: 2 },
        },
      ],
    },
    {
      _id: "sky",
      room: "Bầu trời bãi biển",
      hfov: 120,
      pitch: 12.827447381555467,
      yaw: 116.75064961832777,
      type: "equirectangular",
      panorama: "https://i.imgur.com/ZBE3gS3.jpg",
      annotation: {
        title: "Title annotation 2",
        content: "content annotation 2...",
      },
      hotSpots: [
        {
          pitch: -0.6,
          yaw: 37.1,
          type: "scene",
          text: "Mason Circle",
          sceneId: "snow",
        },
        {
          handler: true,
          pitch: 8.884999825237239,
          yaw: 87.38770793184939,
          type: "info",
          text: "Mason Circle",
          draggable: true,
          args: "dkljsldkfjlds",
        },
      ],
    },
    {
      _id: "snow",
      room: "Núi tuyết",
      hfov: 120,
      pitch: 12.827447381555467,
      yaw: 116.75064961832777,
      type: "equirectangular",
      panorama:
        "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
      hotSpots: [
        {
          pitch: -0.6,
          yaw: 37.1,
          rotateX: 20,
          rotateZ: 65,
          type: "scene",
          text: "Mason Circle",
          sceneId: "house",
        },
      ],
    },
  ],
};

const galleries = [
  {
    label: "Ngôi nhà",
    image: "https://pannellum.org/images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Bầu trời bãi biển",
    image: "https://i.imgur.com/ZBE3gS3.jpg",
    sceneId: "sky",
  },
  {
    label: "Núi tuyết",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
];

const Home: NextPage = () => {
  return <VitualTour vituals={objects} galleries={galleries} />;
};

export default Home;
