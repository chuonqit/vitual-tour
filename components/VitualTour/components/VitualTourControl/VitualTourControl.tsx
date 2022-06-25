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
  const [volume, setVolume] = React.useState<number>(1);
  const [playing, setPlaying] = React.useState<boolean>(false);

  const togglePlay = () => setPlaying(!playing);

  React.useEffect(() => {
    audio.load();
    audio.src = audioURL;
    audio.autoplay = true;
    audio.muted = false;
  }, [audioURL]);

  React.useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
    audio.volume = volume;
  }, [playing, volume]);

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

  return { volume, setVolume, playing, setPlaying, setAudioURL, togglePlay };
};

const VitualTourControl = ({ viewer, loaded }: Props) => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  const { volume, setVolume, playing, setPlaying, togglePlay, setAudioURL } =
    useAudio();

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
    setVolume(1);
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
          <div className={styles.ctrl} onClick={() => togglePlay()}>
            {playing ? <FaPause title="Tạm dừng" /> : <FaPlay title="Phát" />}
          </div>
          {playing && (
            <div className={styles.ctrl}>
              <div className={styles.ctrlVolume}>
                <div onClick={() => setVolume(volume == 0 ? 1 : 0)}>
                  {volume > 0.6 ? (
                    <FaVolumeUp />
                  ) : volume > 0 ? (
                    <FaVolumeDown />
                  ) : (
                    <FaVolumeMute />
                  )}
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
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
