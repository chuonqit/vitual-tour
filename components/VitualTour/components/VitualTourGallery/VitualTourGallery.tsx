import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import styles from "./VitualTourGallery.module.css";

import { FreeMode, Navigation, Thumbs } from "swiper";
import { GalleryType } from "../../libs/VitualType";
import { FaInfo, FaRegImages } from "react-icons/fa";

type Props = {
  galleries?: GalleryType[];
  sceneId: string;
  loadScene: (sceneId: string) => void;
  onToggle: (status: boolean) => void;
  toggle: boolean;
  content?: string;
  infoGalleries?: string[];
};

const InfoModal = ({
  show,
  content,
  onToggle,
}: {
  show: boolean;
  content?: string;
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
          <div dangerouslySetInnerHTML={{ __html: content! }}></div>
        </div>
      </div>
      <div className={styles["modal-overlay"]} onClick={onToggle} />
    </>
  ) : null;
};

const GalleryModal = ({
  show,
  galleries,
  onToggle,
}: {
  show: boolean;
  galleries?: string[];
  onToggle: () => void;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>();

  return show ? (
    <>
      <div className={styles["modal-gallery"]}>
        <div className={styles["modal-gallery-wrapper"]}>
          <button
            type="button"
            className={styles["modal-gallery-header-button"]}
            onClick={onToggle}
          >
            <span>&times;</span>
          </button>
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="pnlm-galleries-info-main"
          >
            {galleries?.map((item, key) => (
              <SwiperSlide key={key}>
                <img src={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={12}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="pnlm-galleries-info-thumbs"
          >
            {galleries?.map((item, key) => (
              <SwiperSlide key={key}>
                <img src={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles["modal-gallery-overlay"]} onClick={onToggle} />
    </>
  ) : null;
};

const VitualTourGallery = ({
  galleries,
  sceneId,
  loadScene,
  onToggle,
  toggle,
  content,
  infoGalleries,
}: Props) => {
  const [swiper, setSwiper] = React.useState<any>();
  const [infoModal, setInfoModal] = React.useState<boolean>(false);
  const [galleryModal, setGalleryModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const filteredIndex = galleries?.findIndex(
      (item) => item.sceneId === sceneId
    );
    swiper?.slideTo(filteredIndex);
  }, [sceneId]);

  const checkScreen = () => {
    if (window.innerWidth < 768) {
      onToggle(false);
    } else {
      onToggle(true);
    }
  };

  React.useEffect(() => {
    checkScreen();
  }, []);

  const prevButton = () => {
    if (galleries) {
      let index = galleries.findIndex((item) => item.sceneId === sceneId);
      index--;
      if (index < 0) {
        index = galleries.length - 1;
      }
      const prevItem = galleries.find((item, key) => key === index)!;
      loadScene(prevItem.sceneId);
    }
  };

  const nextButton = () => {
    if (galleries) {
      let index = galleries.findIndex((item) => item.sceneId === sceneId);
      index++;
      if (index >= galleries.length) {
        index = 0;
      }
      const nextItem = galleries.find((item, key) => key === index)!;
      loadScene(nextItem.sceneId);
    }
  };

  return (
    <>
      <div
        className={styles["controls-bottom"]}
        style={{
          transform:
            toggle || (galleries && galleries.length == 0)
              ? "translateY(110px)"
              : "translateY(0)",
        }}
      >
        {content && (
          <div
            className={styles["controls-bottom-button"]}
            onClick={() => setInfoModal(!infoModal)}
            title="Thông tin"
          >
            <FaInfo />
          </div>
        )}
        {infoGalleries && infoGalleries.length > 0 && (
          <div
            className={styles["controls-bottom-button"]}
            onClick={() => setGalleryModal(!galleryModal)}
            title="Thư viên hình ảnh"
          >
            <FaRegImages />
          </div>
        )}
      </div>

      <InfoModal
        content={content}
        show={infoModal}
        onToggle={() => setInfoModal(!infoModal)}
      />

      <GalleryModal
        show={galleryModal}
        galleries={infoGalleries}
        onToggle={() => setGalleryModal(!galleryModal)}
      />

      {galleries && galleries.length > 0 && (
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
            <div
              className={styles["pnlm-gallery-control"]}
              onClick={() => onToggle(toggle)}
            >
              <button
                className={
                  styles[
                    toggle
                      ? "pnlm-gallery-control-up"
                      : "pnlm-gallery-control-down"
                  ]
                }
              ></button>
            </div>
            <Swiper
              breakpoints={{
                340: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                968: {
                  slidesPerView: 4,
                },
                1300: {
                  slidesPerView: 6,
                },
                1500: {
                  slidesPerView: 10,
                },
              }}
              onSwiper={setSwiper}
              navigation={true}
              modules={[Navigation]}
              className={`${styles["pnlm-gallery-container"]} pnlm-gallery-container`}
            >
              {galleries.map((item, idx) => (
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
                    <span>Đến {item.label.toLowerCase()}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default VitualTourGallery;
