import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./VitualTourGallery.module.css";

import { Navigation } from "swiper";

type Props = {
  galleries?: {
    label: string;
    image: string;
    sceneId: string;
  }[];
  sceneId: string;
  loadScene: (sceneId: string) => void;
  onToggle: () => void;
  toggle: boolean;
};

const VitualTourGallery = ({
  galleries,
  sceneId,
  loadScene,
  onToggle,
  toggle,
}: Props) => {
  return (
    <div
      style={{
        transform: toggle ? "translateY(106px)" : "translateY(0)",
      }}
      className={styles["pnlm-gallery"]}
    >
      <div className={styles["pnlm-gallery-control"]}>
        <button
          className={
            styles[
              toggle ? "pnlm-gallery-control-up" : "pnlm-gallery-control-down"
            ]
          }
          onClick={onToggle}
        ></button>
      </div>
      <Swiper
        slidesPerView={10}
        navigation={true}
        modules={[Navigation]}
        className={styles["pnlm-gallery-container"]}
      >
        {galleries?.map((item, idx) => (
          <SwiperSlide
            className={`${styles["pnlm-gallery-item"]} ${
              item.sceneId === sceneId ? styles["pnlm-gallery-item-active"] : ""
            }`}
            key={idx}
            virtualIndex={idx}
            onClick={() => loadScene(item.sceneId)}
          >
            <img src={item.image} />
            <div className={styles["pnlm-gallery-item--label"]}>
              <span>{item.label}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VitualTourGallery;
