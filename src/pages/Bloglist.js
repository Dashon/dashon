import React, { useState, useEffect } from "react";
import Header from "../components/layouts/Header";
import Blog from "../components/elements/Blog";
import Pagination from "../components/elements/Pagination";

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
  {
    id: 7,
    title: "Agentic AI: Beyond Simple Chatbots",
    image: "images/blog/agentic-ai.png",
    filesource: "../../blogs/agentic-ai-beyond-chatbots.md",
    date: "01 February, 2026",
    author: "Dashon Howard",
    category: "AI",
  },
  {
    id: 8,
    title: "Decentralized Web: Myths vs Reality in 2026",
    image: "images/blog/decentralized.png",
    filesource: "../../blogs/decentralized-web-myths-reality.md",
    date: "01 April, 2026",
    author: "Dashon Howard",
    category: "Web3",
  },
  {
    id: 9,
    title: "Personal Branding for Senior Engineers",
    image: "images/blog/branding.png",
    filesource: "../../blogs/personal-branding-senior-engineers.md",
    date: "01 June, 2026",
    author: "Dashon Howard",
    category: "Career",
  },
  {
    id: 10,
    title: "Optimizing for Answer Engines: A 2026 Deep Dive",
    image: "images/blog/aeo-deep-dive.png",
    filesource: "../../blogs/optimizing-for-answer-engines.md",
    date: "01 August, 2026",
    author: "Dashon Howard",
    category: "AEO",
  },
  {
    id: 11,
    title: "Sustainable Software Engineering Practices",
    image: "images/blog/sustainable.png",
    filesource: "../../blogs/sustainable-software-engineering.md",
    date: "01 October, 2026",
    author: "Dashon Howard",
    category: "Sustainability",
  },
  {
    id: 12,
    title: "2027 Outlook: What's Next for Software Engineers?",
    image: "images/blog/2027-outlook.png",
    filesource: "../../blogs/2027-outlook-future-of-engineering.md",
    date: "01 December, 2026",
    author: "Dashon Howard",
    category: "Future",
  },
];

function Bloglist() {
  // document.body.classList.add("dark");
  //Uncomment the above line if you use dark version

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    setPosts(allBlogs);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const [toggleMenu, setToggleMenu] = useState(false);

  const headerToggler = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };

  document.addEventListener("click", function (e) {
    if (e.target.closest(".content")) {
      setToggleMenu(false);
    }
  });

  return (
    <>
      <Header
        logoSource="/images/logo.svg"
        toggleMenu={toggleMenu}
        headerToggler={headerToggler}
      />
      <main className={toggleMenu ? "content open" : "content"}>
        <div className="spacer" data-height="96"></div>
        <div className="blog-page-section">
          <div className="container">
            <div className="row blog-wrapper fix-spacing">
              {currentPosts.map((blogItem) => (
                <div className="col-md-6" key={blogItem.id}>
                  <Blog blogData={blogItem} />
                </div>
              ))}
            </div>
            <div className="spacer" data-height="50"></div>
            {!(posts.length > postsPerPage) ? null : (
              <Pagination
                itemsPerPage={postsPerPage}
                totalItems={posts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
        <div className="spacer" data-height="96"></div>
      </main>
    </>
  );
}

export default Bloglist;
