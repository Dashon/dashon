import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Portfolio({ portfolio }) {
  const { category, title, image, link, description, logo } = portfolio;
  const [open, setOpen] = useState(false);

  const handleLightbox = (e) => {
    if (!link) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <a
        href={link ? link : "!#"}
        target={link ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="work-image"
        onClick={handleLightbox}
      >
        <div className="portfolio-item rounded shadow-dark bg-white overflow-hidden">
          <div className="thumb relative overflow-hidden h-48">
            <img src={image} alt={title} className="w-100 h-100 object-fit-cover transition-all" />
            <div className="mask"></div>
            {logo && (
              <div className="project-logo-overlay" style={{ position: "absolute", bottom: "15px", right: "15px", width: "40px", height: "40px", backgroundColor: "white", borderRadius: "8px", padding: "5px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <img src={logo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            )}
            <div className="category-tag" style={{ position: "absolute", top: "15px", left: "15px", backgroundColor: "rgba(108, 108, 229, 0.9)", color: "white", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
              {category}
            </div>
          </div>
          <div className="details padding-20">
            <h4 className="title m-0 mb-2 font-weight-bold">{title}</h4>
            {description && <p className="text-muted small m-0">{description}</p>}
          </div>
        </div>
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-item:hover .thumb img {
          transform: scale(1.1);
        }
        .portfolio-item {
          transition: transform 0.3s ease;
        }
        .portfolio-item:hover {
          transform: translateY(-5px);
        }
      `}} />
    </>
  );
}

export default Portfolio;
