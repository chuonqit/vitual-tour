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
  toggle: boolean;
  content?: string;
  galleries?: string[];
};

const VitualTourControl = ({ viewer, toggle, content, galleries }: Props) => {
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

  const playAudio = () => {
    audioRef.current?.play();
    setToggleVolume(false);
  };

  const stopAudio = () => {
    audioRef.current?.pause();
    setToggleVolume(true);
  };

  return (
    <>
      <audio
        controls
        ref={audioRef}
        autoPlay
        style={{ display: "none" }}
        src={viewer?.getAudioSrc()}
      />
      <div className={styles.controlsWrapper}>
        <div className={styles.controls}>
          {!toggleVolume ? (
            <div
              className={styles.ctrl}
              onClick={stopAudio}
              title="Tắt âm thanh"
            >
              <FaVolumeUp />
            </div>
          ) : (
            <div
              className={styles.ctrl}
              onClick={playAudio}
              title="Bật âm thanh"
            >
              <FaVolumeMute />
            </div>
          )}
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
