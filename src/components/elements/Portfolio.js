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
      <div className="portfolio-card-container" style={{ height: "100%", width: "100%" }}>
        <a
          href={link ? link : "!#"}
          target={link ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="portfolio-card-link"
          style={{ 
            display: "flex", 
            flexDirection: "column",
            height: "100%", 
            width: "100%",
            textDecoration: "none",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#FFF",
            boxShadow: "0px 5px 20px 0px rgba(69, 67, 96, 0.1)",
            transition: "all 0.3s ease-in-out"
          }}
          onClick={handleLightbox}
        >
          {/* Top: Image Section with Overlays */}
          <div className="portfolio-image-wrap" style={{ 
            position: "relative", 
            width: "100%",
            paddingTop: "65%",
            overflow: "hidden",
            backgroundColor: "#F9F9FF"
          }}>
            <img 
              src={image} 
              alt={title} 
              style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                transition: "transform 0.4s ease"
              }} 
              className="portfolio-img"
            />
            
            {/* Category Tag Overlay (Top Right) */}
            <div className="category-tag" style={{ 
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "#FF4C60", 
              color: "white", 
              padding: "3px 10px", 
              borderRadius: "0 0 0 10px", 
              fontSize: "10px", 
              fontWeight: "700", 
              textTransform: "uppercase",
              zIndex: 2
            }}>
              {category}
            </div>

            {/* Logo Icon Overlay (Bottom Left) */}
            {logo && (
              <div className="project-logo-overlay" style={{ 
                position: "absolute",
                bottom: "12px",
                left: "12px",
                width: "40px", 
                height: "40px", 
                borderRadius: title.toLowerCase() === "sink" ? "22%" : "8px", 
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(5px)",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(0,0,0,0.05)",
                zIndex: 2
              }}>
                <img src={logo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            )}
          </div>

          {/* Bottom: Details Section */}
          <div className="portfolio-details" style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            flexGrow: 1
          }}>
            <h4 className="portfolio-title" style={{ 
              color: "#454360", 
              margin: "0 0 8px 0", 
              fontSize: "18px", 
              fontWeight: "700"
            }}>
              {title}
            </h4>
            
            {description && (
              <p className="portfolio-description" style={{ 
                color: "#5E5C7F", 
                fontSize: "14px", 
                margin: "0 0 15px 0", 
                lineHeight: "1.6"
              }}>
                {description}
              </p>
            )}

            <div style={{ marginTop: "auto" }}>
              <button 
                className="btn-ai-story" 
                style={{ 
                  padding: "6px 16px", 
                  fontSize: "12px", 
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#FF4C60",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  boxShadow: "0px 5px 20px 0px rgba(255, 76, 96, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent("open-chatbot", { 
                    detail: { query: `Tell me the real story of the ${title} project—the stuff that doesn't fit in a bullet point.` } 
                  }));
                }}
              >
                <i className="fas fa-robot"></i> View AI Story
              </button>
            </div>
          </div>
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-card-link:hover .portfolio-img {
          transform: scale(1.1);
        }
        .portfolio-card-link:hover {
          transform: translateY(-5px);
          box-shadow: 0px 10px 25px 0px rgba(69, 67, 96, 0.15) !important;
        }
        .btn-ai-story:hover {
          background-color: #ff3e3e !important;
          transform: translateY(-2px);
          box-shadow: 0px 8px 25px 0px rgba(255, 76, 96, 0.4) !important;
        }
      `}} />

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: image }]}
        />
      )}
    </>
  );
}

export default Portfolio;
