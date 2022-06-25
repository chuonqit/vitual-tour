import React from "react";
import Viewer from "../../libs/ViewerType";
import styles from "./VitualTourControl.module.css";
import {
  FaExpand,
  FaCompress,
  FaSearchPlus,
  FaSearchMinus,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

type Props = {
  viewer?: Viewer;
  loaded: boolean;
};

const ConfirmModalAudio = ({
  onDone,
}: {
  onDone: (status: boolean) => void;
}) => {
  const [toggleModal, setToggleModal] = React.useState<boolean>(true);

  const onYes = () => {
    onDone(false);
    setToggleModal(false);
  };

  const onNo = () => {
    onDone(true);
    setToggleModal(false);
  };

  return toggleModal ? (
    <div className={styles["custom-modal-container"]}>
      <div className={styles["custom-modal"]}>
        <span>Bạn có muốn giữ lại âm thanh không?</span>
        <div className={styles["custom-modal-button-group"]}>
          <button className={styles["custom-modal-button"]} onClick={onYes}>
            Bật
          </button>
          <button
            className={`${styles["custom-modal-button"]} ${styles["custom-modal-button-no"]}`}
            onClick={onNo}
          >
            Tắt
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const VitualTourControl = ({ viewer, loaded }: Props) => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  const [toggleVolume, setToggleVolume] = React.useState<boolean>(true);
  const audioRef = React.createRef<HTMLAudioElement>();

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

  React.useEffect(() => {
    audioRef.current?.addEventListener("ended", () => audioRef.current?.play());
    return () => {
      audioRef.current?.removeEventListener("ended", () =>
        audioRef.current?.play()
      );
    };
  }, [audioRef.current]);

  const toggleMutedAudio = () => {
    if (audioRef.current) {
      setToggleVolume(!toggleVolume);
      audioRef.current.muted = toggleVolume;
    }
  };

  const modalChangeVolume = (status: boolean) => {
    if (audioRef.current) {
      audioRef.current.muted = status;
      setToggleVolume(!status);
    }
  };

  return (
    <>
      {!loaded && <ConfirmModalAudio onDone={modalChangeVolume} />}
      <audio
        ref={audioRef}
        src={viewer?.audio}
        autoPlay={true}
        controls={true}
        muted={false}
        style={{ display: "none" }}
      />
      <div className={styles.controlsWrapper}>
        <div className={styles.controls}>
          <div
            className={styles.ctrl}
            onClick={toggleMutedAudio}
            title="Tắt/Bật âm thanh"
          >
            {toggleVolume ? <FaVolumeUp /> : <FaVolumeMute />}
          </div>
        </div>
        <div className={styles.controls}>
          <div
            className={styles.ctrl}
            id="zoom-in"
            onClick={onZoomIn}
            title="Phóng to"
          >
            <FaSearchPlus />
          </div>
          <div
            className={styles.ctrl}
            id="zoom-out"
            onClick={onZoomOut}
            title="Thu nhỏ"
          >
            <FaSearchMinus />
          </div>
          <div
            className={`${styles.ctrl} ${styles["order-1"]}`}
            id="fullscreen"
            onClick={onFullScreen}
            title="Toàn màn hình"
          >
            {fullscreen ? <FaCompress /> : <FaExpand />}
          </div>
        </div>
      </div>
    </>
  );
};

export default VitualTourControl;
