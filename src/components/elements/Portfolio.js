import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Portfolio({ portfolio }) {
  const { category, title, image, popupLink, link } = portfolio;
  const [open, setOpen] = useState(false);

  const handleLightbox = (e) => {
    if (!link) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleIcon = () => {
    if (link) {
      return <i className="icon-link"></i>;
    } else if (popupLink) {
      if (popupLink.length > 1) {
        if (popupLink.toString().match(/youtube/g)) {
          return <i className="icon-camrecorder"></i>;
        }
        return <i className="icon-picture"></i>;
      } else if (popupLink.toString().match(/youtube/g)) {
        return <i className="icon-camrecorder"></i>;
      } else {
        return <i className="icon-magnifier-add"></i>;
      }
    }
    return <i className="icon-magnifier-add"></i>;
  };

  const slides = popupLink
    ? popupLink.map((src) => ({ src }))
    : [];

  return (
    <>
      <a
        href={link ? link : "!#"}
        className="work-image"
        onClick={handleLightbox}
      >
        <div className="portfolio-item rounded shadow-dark">
          <div className="details">
            <span className="term text-capitalize">{category}</span>
            <h4 className="title">{title}</h4>
            <span className="more-button">{handleIcon()}</span>
          </div>
          <div className="thumb">
            <img src={image} alt="Portfolio-title" />
            <div className="mask"></div>
          </div>
        </div>
      </a>
      {popupLink && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
        />
      )}
    </>
  );
}

export default Portfolio;
