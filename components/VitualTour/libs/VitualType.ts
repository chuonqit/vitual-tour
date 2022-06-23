export type VitualSceneType = {
  _id: string;
  room: string;
  hfov: number;
  pitch: number;
  yaw: number;
  type: "equirectangular";
  panorama: string;
  [x: string]: any;
  hotSpots: {
    pitch: number;
    yaw: number;
    type: string;
    text: string;
    sceneId?: string;
    [x: string]: any;
  }[];
};

export type GalleryType = {
  label: string;
  image: string;
  sceneId: string;
};

type VitualType = {
  default: {
    firstScene: string;
    sceneFadeDuration?: number;
    [x: string]: any;
  };
  info: {
    name: string;
    content?: string;
    galleries?: string[];
  };
  scenes: VitualSceneType[];
};

export default VitualType;
