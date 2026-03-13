import React from "react";
import { Link } from "react-router-dom";
import Blog from "../elements/Blog";
import Pagetitle from "../elements/Pagetitle";

const allBlogs = [
  {
    id: 1,
    title: "The Rise of AI-First Engineering in 2025",
    image: "images/blog/ai-first.png",
    filesource: "../../blogs/rise-of-ai-first-engineering.md",
    date: "01 February, 2025",
    author: "Dashon Howard",
    category: "Engineering",
  },
  {
    id: 2,
    title: "Mastering Advanced React Patterns in 2025",
    image: "images/blog/react-2025.png",
    filesource: "../../blogs/mastering-advanced-react-patterns.md",
    date: "01 April, 2025",
    author: "Dashon Howard",
    category: "React",
  },
  {
    id: 3,
    title: "Scalable Architecture for Digital Nomads",
    image: "images/blog/nomad-arch.png",
    filesource: "../../blogs/scalable-architecture-digital-nomads.md",
    date: "01 June, 2025",
    author: "Dashon Howard",
    category: "Architecture",
  },
  {
    id: 4,
    title: "The Future of Web Accessibility and AEO",
    image: "images/blog/accessibility.png",
    filesource: "../../blogs/future-of-web-accessibility-aeo.md",
    date: "01 August, 2025",
    author: "Dashon Howard",
    category: "AEO",
  },
  {
    id: 5,
    title: "Building High-Performance Desktop Apps with Modern Web Tech",
    image: "images/blog/desktop-apps.png",
    filesource: "../../blogs/high-performance-desktop-apps.md",
    date: "01 October, 2025",
    author: "Dashon Howard",
    category: "Desktop",
  },
  {
    id: 6,
    title: "2025 Year in Review: State of Full Stack Development",
    image: "images/blog/2025-review.png",
    filesource: "../../blogs/2025-year-in-review.md",
    date: "01 December, 2025",
    author: "Dashon Howard",
    category: "Review",
  },
];

function Blogs() {
  return (
    <section id="blog">
      <div className="container">
        <Pagetitle title="Latest Posts" />
        <div className="row blog-wrapper">
          {allBlogs.map((blogItem) => (
            <div className="col-md-4" key={blogItem.id}>
              <Blog blogData={blogItem} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="spacer" data-height="30"></div>
          <Link to="/blogs" className="btn btn-default">
            Show all blogs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Blogs;
