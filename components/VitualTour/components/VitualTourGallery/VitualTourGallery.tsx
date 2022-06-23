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
  const prevButton = () => {
    if (galleries) {
      let index = galleries.findIndex((item) => item.sceneId === sceneId);
      index--;
      if (index >= 0) {
        const prevItem = galleries.find((item, key) => key === index)!;
        loadScene(prevItem.sceneId);
      }
    }
  };

  const nextButton = () => {
    if (galleries) {
      let index = galleries.findIndex((item) => item.sceneId === sceneId);
      index++;
      if (index < galleries.length) {
        const nextItem = galleries.find((item, key) => key === index)!;
        loadScene(nextItem.sceneId);
      } else {
        index = 0;
      }
    }
  };

  return (
    <>
      <div className={`pnlm-gallery-main-button`}>
        <div className="swiper-button-prev" onClick={prevButton}></div>
        <div className="swiper-button-next" onClick={nextButton}></div>
      </div>
      <div
        style={{
          transform: toggle ? "translateY(106px)" : "translateY(0)",
        }}
        className={styles["pnlm-gallery"]}
      >
        <div className={styles["pnlm-gallery-control"]} onClick={onToggle}>
          <button
            className={
              styles[
                toggle ? "pnlm-gallery-control-up" : "pnlm-gallery-control-down"
              ]
            }
          ></button>
        </div>
        <Swiper
          slidesPerView={10}
          navigation={true}
          modules={[Navigation]}
          className={`${styles["pnlm-gallery-container"]} pnlm-gallery-container`}
        >
          {galleries?.map((item, idx) => (
            <SwiperSlide
              className={`${styles["pnlm-gallery-item"]} ${
                item.sceneId === sceneId
                  ? styles["pnlm-gallery-item-active"]
                  : ""
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
    </>
  );
};

export default VitualTourGallery;
