import type { NextPage } from "next";
import VitualTour from "../components/VitualTour";
import VitualType from "../components/VitualTour/libs/VitualType";

const objects: VitualType = {
  default: {
    firstScene: "s1",
    sceneFadeDuration: 2000,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
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
      _id: "s1",
      room: "Cổng trường",
      hfov: 120,
      pitch: 2.560059534087423,
      yaw: -6.0999394487377,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_5 - Panorama.jpg",
      hotSpots: [
        {
          pitch: -1.6817577380068454,
          yaw: -7.47775691446502,
          type: "location",
          text: "Đi vao trường",
          sceneId: "s2",
        },
        {
          pitch: 2.2525645875702685,
          yaw: 69.62000532412344,
          type: "location",
          text: "Văn phòng tuyển sinh",
          sceneId: "s6",
          rotateZ: 275,
        },
      ],
    },
    {
      _id: "s2",
      room: "Trong cổng trường",
      hfov: 120,
      pitch: -13.795890318357479,
      yaw: -11.457470392963955,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_4 - Panorama.jpg",
      annotation: {
        title: "Title annotation",
        content: "content annotation...",
      },
      hotSpots: [
        {
          pitch: -12.159867651311774,
          yaw: 4.124520086838669,
          type: "location",
          text: "Tiến về trước",
          rotateX: 65,
          rotateZ: 326,
          sceneId: "s4",
          scale: 2,
        },
        {
          pitch: -16.458667426406652,
          yaw: -52.48980602263002,
          type: "location",
          text: "Tiến về trước",
          rotateX: 65,
          rotateZ: 320,
          scale: 2,
          sceneId: "s5",
        },
        {
          pitch: -0.31206132707564577,
          yaw: 111.12476164182975,
          type: "location",
          text: "Tiến về trước",
          sceneId: "s1",
        },
      ],
    },
    {
      _id: "s3",
      room: "Giữa",
      hfov: 120,
      pitch: 8.87939240232977,
      yaw: -19.03292053745656,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_2 - Panorama.jpg",
      annotation: {
        title: "Title annotation 2",
        content: "content annotation 2...",
      },
      hotSpots: [
        {
          pitch: 1.4055932721675313,
          yaw: 158.44165845810073,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s5",
        },
        {
          pitch: 1.2951617304721086,
          yaw: 120.4941583923635,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s2",
        },
      ],
    },
    {
      _id: "s4",
      room: "Sân",
      hfov: 120,
      pitch: -8.513453542673043,
      yaw: 1.6060941594909082,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_1 - Panorama.jpg",
      hotSpots: [
        {
          pitch: -0.6,
          yaw: 37.1,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s3",
        },
        {
          pitch: 1.2588168728243564,
          yaw: 149.5344376965289,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s2",
        },
        {
          pitch: -0.4715513658380949,
          yaw: -138.89816216143754,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s5",
        },
      ],
    },
    {
      _id: "s5",
      room: "Xa",
      hfov: 120,
      pitch: -7.762240015854479,
      yaw: 38.02380976579377,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_3 - Panorama.jpg",
      hotSpots: [
        {
          pitch: -0.6,
          yaw: 37.1,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s4",
        },
        {
          pitch: 0.526137804340487,
          yaw: 89.87705307569496,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s1",
        },
      ],
    },
    {
      _id: "s6",
      room: "Văn phòng tuyển sinh",
      hfov: 120,
      pitch: 0.22161119027438048,
      yaw: 2.9575494472599075,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_6 - Panorama.jpg",
      hotSpots: [
        {
          pitch: -0.6,
          yaw: 37.1,
          type: "location",
          text: "Nhà gửi xe",
          sceneId: "s7",
        },
        {
          pitch: 0.1688714249333521,
          yaw: -49.11504008604996,
          type: "location",
          text: "Cổng trường",
          sceneId: "s1",
        },
      ],
    },
    {
      _id: "s7",
      room: "Nhà gửi xe",
      hfov: 120,
      pitch: -2.226901272758658,
      yaw: -12.713143083163914,
      type: "equirectangular",
      panorama: "/panoramas/25_6_2022_fpoly_1 - Panorama_7 - Panorama.jpg",
      hotSpots: [
        {
          pitch: 0.7617120873809606,
          yaw: -62.062604878692554,
          rotateZ: 50,
          type: "location",
          text: "Nội dung tooltip",
          sceneId: "s6",
        },
      ],
    },
  ],
};

const galleries = [
  {
    label: "Cổng trường",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_5 - Panorama.jpg",
    sceneId: "s1",
  },
  {
    label: "Văn phòng tuyển sinh",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_6 - Panorama.jpg",
    sceneId: "s6",
  },
  {
    label: "Trong cổng trường",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_4 - Panorama.jpg",
    sceneId: "s2",
  },
  {
    label: "Sân trường",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_1 - Panorama.jpg",
    sceneId: "s4",
  },
  {
    label: "Tên ên tên",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_2 - Panorama.jpg",
    sceneId: "s3",
  },
  {
    label: "Xa",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_3 - Panorama.jpg",
    sceneId: "s5",
  },
  {
    label: "Nhà gửi xe",
    image: "/panoramas/25_6_2022_fpoly_1 - Panorama_7 - Panorama.jpg",
    sceneId: "s7",
  },
];

const Home: NextPage = () => {
  return <VitualTour vituals={objects} galleries={galleries} />;
};

export default Home;
