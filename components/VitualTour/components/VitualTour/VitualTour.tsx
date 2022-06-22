import React from "react";

import styles from "./VitualTour.module.css";

import Pannellum from "../../libs/Pannellum";
import Viewer from "../../libs/ViewerType";
import VitualTourControl from "../VitualTourControl/VitualTourControl";
import VitualTourGallery from "../VitualTourGallery/VitualTourGallery";

type Props = {};

const galleries = [
  {
    label: "Label 1",
    image: "https://i.imgur.com/ZBE3gS3.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image: "https://i.imgur.com/ZBE3gS3.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image: "https://i.imgur.com/ZBE3gS3.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image: "https://i.imgur.com/ZBE3gS3.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "sky",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
  {
    label: "Label 1",
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
  {
    label: "Label 2",
    image: "https://pannellum.org//images/bma-0.jpg",
    sceneId: "house",
  },
];

const VitualTour = (props: Props) => {
  const [viewer, setViewer] = React.useState<Viewer>();
  const [sceneId, setSceneId] = React.useState<string>("house");
  const [toggle, setToggle] = React.useState<boolean>(false);
  const pannellumRef = React.createRef<HTMLDivElement>();

  const menuToggle = () => setToggle(!toggle);

  const changeScene = (sceneId: string) => {
    viewer?.loadScene(sceneId);
    setSceneId(sceneId);
  };

  React.useEffect(() => {
    const viewer = Pannellum.viewer(pannellumRef.current, {
      default: {
        firstScene: "house",
        sceneFadeDuration: 1000,
        autoLoad: true,
        showControls: false,
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

      scenes: {
        house: {
          room: "Room 1",
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
              draggable: true,
            },
            {
              pitch: -0.6,
              yaw: 37.1,
              type: "info",
              text: "Mason Circle",
              draggable: true,
            },
          ],
        },
        sky: {
          room: "Room 2",
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
              draggable: true,
            },
          ],
        },
        snow: {
          room: "Room 3",
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
              draggable: true,
            },
          ],
        },
      },
    });
    setViewer(viewer);

    viewer.on("load", () => {
      setSceneId(viewer.getScene());
    });

    return () => viewer.destroy();
  }, [pannellumRef.current]);

  return (
    <div className={styles["vitual-tour"]}>
      <VitualTourControl viewer={viewer} toggle={toggle} />
      <div className={styles["vitual-header"]}>
        <div className={styles["vitual-header-name"]}>
          {viewer?.getInfo().name}
        </div>
        <div className={styles["vitual-header-room"]}>{viewer?.getRoom()}</div>
      </div>
      {viewer?.getAnnotation() && (
        <div className={styles["vitual-annotation"]}>
          <h2 className={styles["vitual-annotation-title"]}>
            {viewer?.getAnnotation().title}
          </h2>
          <hr />
          <p className={styles["vitual-annotation-content"]}>
            {viewer?.getAnnotation().content}
          </p>
        </div>
      )}
      <div
        ref={pannellumRef}
        className={styles["vitual-tour-wrapper"]}
        style={{
          transform: toggle ? "translateY(0)" : "translateY(-106px)",
        }}
      ></div>
      <VitualTourGallery
        galleries={galleries}
        sceneId={sceneId}
        toggle={toggle}
        onToggle={menuToggle}
        loadScene={(scene) => changeScene(scene)}
      />
    </div>
  );
};

export default VitualTour;
