import React from "react";
import Viewer from "../../libs/ViewerType";
import styles from "./VitualTourControl.module.css";
import { FaExpand, FaCompress, FaInfo, FaRegImages } from "react-icons/fa";

type Props = {
  viewer?: Viewer;
  toggle: boolean;
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
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
      <div className={styles["modal-overlay"]} onClick={onToggle} />
    </>
  ) : null;
};

const VitualTourControl = ({ viewer, toggle }: Props) => {
  const [infoModal, setInfoModal] = React.useState<boolean>(false);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);

  const onFullScreen = () => {
    setFullscreen(!fullscreen);
    viewer?.toggleFullscreen();
  };

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.ctrl} id="fullscreen" onClick={onFullScreen}>
          {fullscreen ? <FaCompress /> : <FaExpand />}
        </div>
      </div>
      <div
        className={styles["controls-bottom"]}
        style={{ transform: toggle ? "translateY(100px)" : "translateY(0)" }}
      >
        {viewer?.getInfo().content && (
          <button
            className={styles["controls-bottom-button"]}
            onClick={() => setInfoModal(!infoModal)}
          >
            <FaInfo />
          </button>
        )}
        {viewer?.getInfo().galleries && viewer?.getInfo().galleries.length > 0 && (
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
