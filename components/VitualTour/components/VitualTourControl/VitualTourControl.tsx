import React from "react";
import Viewer from "../../libs/ViewerType";
import styles from "./VitualTourControl.module.css";
import {
  FaExpand,
  FaCompress,
  FaInfo,
  FaRegImages,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";

type Props = {
  viewer?: Viewer;
  toggle: boolean;
  content?: string;
  galleries?: string[];
};

const InfoModal = ({
  show,
  content,
  onToggle,
}: {
  show: boolean;
  content: string;
  onToggle: () => void;
}) => {
  const modalRef = React.createRef<HTMLDivElement>();

  const WindowCheck = (event: MouseEvent) => {
    if (event.target == modalRef.current) {
      onToggle();
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", WindowCheck);

    return () => window.removeEventListener("click", WindowCheck);
  }, [show]);

  return show ? (
    <>
      <div className={styles["modal-info"]} ref={modalRef}>
        <div className={styles["modal-wrapper"]}>
          <button
            type="button"
            className={styles["modal-header-button"]}
            onClick={onToggle}
          >
            <span>&times;</span>
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ height: 1000 }}
          ></div>
        </div>
      </div>
      <div className={styles["modal-overlay"]} onClick={onToggle} />
    </>
  ) : null;
};

const VitualTourControl = ({ viewer, toggle, content, galleries }: Props) => {
  const [infoModal, setInfoModal] = React.useState<boolean>(false);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);

  const onFullScreen = () => {
    setFullscreen(!fullscreen);
    viewer?.toggleFullscreen();
  };

  const onZoomIn = () => {
    viewer?.setHfov(viewer.getHfov() - 10);
  };

  const onZoomOut = () => {
    viewer?.setHfov(viewer.getHfov() + 10);
  };

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.ctrl} id="zoom-in" onClick={onZoomIn}>
          <FaSearchPlus />
        </div>
        <div className={styles.ctrl} id="zoom-out" onClick={onZoomOut}>
          <FaSearchMinus />
        </div>
        <div className={styles.ctrl} id="fullscreen" onClick={onFullScreen}>
          {fullscreen ? <FaCompress /> : <FaExpand />}
        </div>
      </div>
      <div
        className={styles["controls-bottom"]}
        style={{ transform: toggle ? "translateY(100px)" : "translateY(0)" }}
      >
        {content && (
          <button
            className={styles["controls-bottom-button"]}
            onClick={() => setInfoModal(!infoModal)}
          >
            <FaInfo />
          </button>
        )}
        {galleries && galleries.length > 0 && (
          <button className={styles["controls-bottom-button"]}>
            <FaRegImages />
          </button>
        )}
      </div>

      <InfoModal
        content={viewer?.getInfo().content}
        show={infoModal}
        onToggle={() => setInfoModal(!infoModal)}
      />
    </>
  );
};

export default VitualTourControl;
