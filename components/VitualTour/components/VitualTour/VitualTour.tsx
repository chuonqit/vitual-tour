import React from "react";

import styles from "./VitualTour.module.css";

import Pannellum from "../../libs/Pannellum";
import Viewer from "../../libs/ViewerType";
import VitualTourControl from "../VitualTourControl/VitualTourControl";
import VitualTourGallery from "../VitualTourGallery/VitualTourGallery";

type Props = {};

type TPosition = {
  hfov: number;
  yaw: number;
  pitch: number;
};

type TInfo = {
  name: string;
  room: string;
  content: string;
  galleries: string[];
  annotation: {
    title: string;
    content: string;
  };
};

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
    image:
      "https://thumbs.dreamstime.com/b/snowy-mountains-panorama-4347925.jpg",
    sceneId: "snow",
  },
];

const Loading = ({ speed }: { speed: number }) => {
  const [percent, setPercent] = React.useState<number>(0);
  const [styleProgressBar, setStyleProgressBar] = React.useState<string>("");

  React.useEffect(() => {
    let progressValue = 0;
    let progressEndValue = 100;

    let progress = setInterval(() => {
      progressValue++;

      setPercent(progressValue);

      setStyleProgressBar(`conic-gradient(
        #ff5b00 ${progressValue * 3.6}deg,
        #ffc4a4 ${progressValue * 3.6}deg
      )`);

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    return () => clearInterval(progress);
  }, []);

  return (
    <div
      className={styles["loading-box"]}
      style={{
        backgroundImage:
          "url('https://caodang.fpt.edu.vn/wp-content/uploads/Poly-1-scaled.jpg')",
        opacity: percent == 100 ? 0 : 1,
        zIndex: percent == 100 ? -1 : 999,
      }}
    >
      <div
        className={styles["circular-progress"]}
        style={{ background: styleProgressBar }}
      >
        <div className={styles["value-container"]}>{percent}%</div>
      </div>
    </div>
  );
};

const VitualTour = (props: Props) => {
  const [position, setPosition] = React.useState<TPosition>({
    hfov: 0,
    yaw: 0,
    pitch: 0,
  });
  const [info, setInfo] = React.useState<TInfo>();
  const [viewer, setViewer] = React.useState<Viewer>();
  const [sceneId, setSceneId] = React.useState<string>("house");
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(true);
  const [slidesPerView, setSlidesPerView] = React.useState<number>(10);
  const pannellumRef = React.createRef<HTMLDivElement>();

  const menuToggle = () => setToggle(!toggle);

  const changeScene = (sceneId: string) => {
    viewer?.loadScene(sceneId);
    setSceneId(sceneId);
  };

  React.useEffect(() => {
    const loader = setTimeout(() => {
      setLoaded(false);
    }, 1500);

    return () => clearTimeout(loader);
  }, []);

  React.useEffect(() => {
    const viewer = Pannellum.viewer(pannellumRef.current, {
      default: {
        firstScene: "house",
        sceneFadeDuration: 1000,
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
              args: "sdkjad",
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
            },
          ],
        },
      },
    });

    viewer.on("load", () => {
      setSceneId(viewer.getScene());
      setInfo({
        name: viewer.getInfo().name,
        room: viewer.getRoom(),
        content: viewer.getInfo().content,
        galleries: viewer.getInfo().galleries,
        annotation: viewer.getAnnotation() && {
          title: viewer.getAnnotation().title,
          content: viewer.getAnnotation().content,
        },
      });
    });

    viewer.on("mouseup", () => {
      const hfov = viewer.getHfov();
      const pitch = viewer.getPitch();
      const yaw = viewer.getYaw();
      setPosition({ hfov, pitch, yaw });
    });

    setViewer(viewer);

    return () => viewer.destroy();
  }, [pannellumRef.current]);

  React.useEffect(() => {
    if (viewer) {
      viewer.setClickHandler(({ ...rest }) => {
        alert("Hotspot: " + rest.type);
      });
    }
  }, [viewer, position, sceneId]);

  const checkScreen = () => {
    if (window.innerWidth < 1000) {
      setToggle(true);
      setSlidesPerView(5);
    }
    if (window.innerWidth < 768) {
      setSlidesPerView(3);
    }
    if (window.innerWidth < 568) {
      setSlidesPerView(2);
    }
    if (window.innerWidth > 1200) {
      setToggle(false);
      setSlidesPerView(10);
    }
  };

  React.useEffect(() => {
    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <Loading speed={20} />
      <div
        className={styles["vitual-tour"]}
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <VitualTourControl viewer={viewer} toggle={toggle} />
        <div className={styles["vitual-header"]}>
          {info?.name && (
            <div className={styles["vitual-header-name"]}>{info.name}</div>
          )}
          {info?.room && (
            <div className={styles["vitual-header-room"]}>{info.room}</div>
          )}
        </div>
        {info?.annotation && (
          <div className={styles["vitual-annotation"]}>
            <h2 className={styles["vitual-annotation-title"]}>
              {info.annotation.title}
            </h2>
            <hr />
            <p className={styles["vitual-annotation-content"]}>
              {info.annotation.content}
            </p>
          </div>
        )}
        <div ref={pannellumRef} className={styles["vitual-tour-wrapper"]}></div>
        <VitualTourGallery
          galleries={galleries}
          sceneId={sceneId}
          toggle={toggle}
          slidesPerView={slidesPerView}
          onToggle={menuToggle}
          loadScene={(scene) => changeScene(scene)}
        />
      </div>
    </>
  );
};

// style={{
//   transform: toggle ? "translateY(0)" : "translateY(-106px)",
// }}

export default VitualTour;
