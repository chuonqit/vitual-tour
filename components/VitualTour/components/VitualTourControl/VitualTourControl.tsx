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
  FaPlay,
  FaPause,
  FaVolumeDown,
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
    onDone(true);
    setToggleModal(false);
  };

  const onNo = () => {
    onDone(false);
    setToggleModal(false);
  };

  return toggleModal ? (
    <div className={styles["custom-modal-container"]}>
      <div className={styles["custom-modal"]}>
        <span>Bạn có muốn bật âm thanh không?</span>
        <div className={styles["custom-modal-button-group"]}>
          <button className={styles["custom-modal-button"]} onClick={onYes}>
            Có
          </button>
          <button
            className={`${styles["custom-modal-button"]} ${styles["custom-modal-button-no"]}`}
            onClick={onNo}
          >
            Không
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const useAudio = () => {
  const [audio] = React.useState(new Audio());
  const [audioURL, setAudioURL] = React.useState<string>("");
  const [playing, setPlaying] = React.useState<boolean>(false);

  const togglePlay = () => setPlaying(!playing);

  React.useEffect(() => {
    audio.load();
    audio.src = audioURL;
    audio.autoplay = true;
    audio.muted = false;
  }, [audioURL]);

  React.useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  React.useEffect(() => {
    audio.addEventListener("ended", () => {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    });
    return () => {
      audio.removeEventListener("ended", () => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      });
    };
  }, []);

  return { playing, setPlaying, setAudioURL, togglePlay };
};

const VitualTourControl = ({ viewer, loaded }: Props) => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  const { playing, setPlaying, togglePlay, setAudioURL } = useAudio();

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

  const modalChangeVolume = (status: boolean) => {
    setPlaying(status);
  };

  React.useEffect(() => {
    if (viewer) {
      setAudioURL(viewer.audio);
    }
  }, [viewer]);

  return (
    <>
      {!loaded && <ConfirmModalAudio onDone={modalChangeVolume} />}

      <div className={styles.controlsWrapper}>
        <div className={styles.controls}>
          <div className={styles.ctrl}>
            <div className={styles.ctrlVolume} onClick={() => togglePlay()}>
              {playing ? <FaVolumeUp /> : <FaVolumeMute />}
            </div>
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
