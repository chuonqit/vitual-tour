import React from "react";

import styles from "./VitualTour.module.css";

import Pannellum from "../../libs/Pannellum";
import Viewer from "../../libs/ViewerType";
import VitualTourControl from "../VitualTourControl/VitualTourControl";
import VitualTourGallery from "../VitualTourGallery/VitualTourGallery";
import VitualType, {
  GalleryType,
  VitualSceneType,
} from "../../libs/VitualType";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  vituals: VitualType;
  galleries?: GalleryType[];
};

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

const VitualTour = ({ vituals, galleries }: Props) => {
  const [position, setPosition] = React.useState<TPosition>({
    hfov: 0,
    yaw: 0,
    pitch: 0,
  });
  const [info, setInfo] = React.useState<TInfo>();
  const [viewer, setViewer] = React.useState<Viewer>();
  const [sceneId, setSceneId] = React.useState<string>("house");
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [annotaionToggle, setAnnotaionToggle] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(true);
  const [slidesPerView, setSlidesPerView] = React.useState<number>(10);
  const pannellumRef = React.createRef<HTMLDivElement>();

  const menuToggle = () => setToggle(!toggle);

  const changeScene = (sceneId: string) => {
    viewer?.loadScene(sceneId);
    setSceneId(sceneId);
  };

  const checkScreenSlide = () => {
    if (window.innerWidth < 1000) {
      setSlidesPerView(5);
    }
    if (window.innerWidth < 768) {
      setSlidesPerView(3);
    }
    if (window.innerWidth < 568) {
      setSlidesPerView(2);
    }
    if (window.innerWidth > 1200) {
      setSlidesPerView(10);
    }
  };

  const sceneData = React.useMemo(() => {
    return vituals.scenes.reduce((object: any, current: VitualSceneType) => {
      return {
        ...object,
        [current._id]: { ...current },
      };
    }, {});
  }, [vituals]);

  React.useEffect(() => {
    const loader = setTimeout(() => {
      setLoaded(false);
    }, 1500);

    return () => clearTimeout(loader);
  }, []);

  React.useEffect(() => {
    const viewer = Pannellum.viewer(pannellumRef.current, {
      default: vituals.default,
      info: vituals.info,
      scenes: sceneData,
    });

    setViewer(viewer);

    return () => viewer.destroy();
  }, [pannellumRef.current, vituals]);

  React.useEffect(() => {
    if (viewer) {
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

      viewer.setClickHandler(({ ...rest }) => {
        alert("Hotspot: " + JSON.stringify(rest.args));
      });
    }
  }, [viewer, position, sceneId, info]);

  React.useEffect(() => {
    checkScreenSlide();

    window.addEventListener("resize", checkScreenSlide);

    return () => window.removeEventListener("resize", checkScreenSlide);
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
        <div
          className={styles["annotation"]}
          style={{
            transform: annotaionToggle ? "translateX(-286px)" : "translateX(0)",
          }}
        >
          {info?.annotation && (
            <>
              <div className={styles["vitual-annotation"]}>
                <h2 className={styles["vitual-annotation-title"]}>
                  {info.annotation.title}
                </h2>
                <hr />
                <p className={styles["vitual-annotation-content"]}>
                  {info.annotation.content}
                </p>
              </div>
              <div
                className={styles["annotation-button"]}
                onClick={() => setAnnotaionToggle(!annotaionToggle)}
              >
                {annotaionToggle ? <FaChevronRight /> : <FaChevronLeft />}
              </div>
            </>
          )}
        </div>
        <div ref={pannellumRef} className={styles["vitual-tour-wrapper"]}></div>
        <VitualTourGallery
          galleries={galleries}
          sceneId={sceneId}
          toggle={toggle}
          slidesPerView={slidesPerView}
          onToggle={menuToggle}
          loadScene={(scene) => changeScene(scene)}
          content={info?.content}
          infoGalleries={info?.galleries}
        />
      </div>
    </>
  );
};

// style={{
//   transform: toggle ? "translateY(0)" : "translateY(-106px)",
// }}

export default VitualTour;
