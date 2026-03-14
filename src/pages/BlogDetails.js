import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import Header from "../components/layouts/Header";

function BlogDetails(props) {
  const [content, setContent] = useState("");
  const blogId = props.match.params.id;
  const blogFile = props.match.params.title;

  useEffect(() => {
    import(`../blogs/${blogFile}.md`)
      .then((res) => res.default)
      .then((res) => {
        fetch(res)
          .then((result) => result.text())
          .then((result) => setContent(result));
      });
  }, [content, blogFile]);



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

  // document.body.classList.add("dark");
  //Uncomment the above line if you use dark version

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogFile.replace(/-/g, ' '),
    "image": "https://dashon.co/images/blog-default.jpg", 
    "author": {
      "@type": "Person",
      "name": "Dashon Howard",
      "url": "https://dashon.co/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dashon Howard",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dashon.co/images/logo_v2.png"
      }
    },
    "datePublished": "2024-03-14", // Ideally this comes from blog metadata
    "description": `Read more about ${blogFile.replace(/-/g, ' ')} on Dashon Howard's blog.`
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <Header
        logoSource="/images/logo_v2.png"
        toggleMenu={toggleMenu}
        headerToggler={headerToggler}
      />
      <main className={toggleMenu ? "content open" : "content"}>
        <div className="spacer" data-height="96"></div>
        <div className="blog-page-section">
          <div className="container">
            <div className="blog-single shadow-dark p-30">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        </div>
        <div className="spacer" data-height="96"></div>
      </main>
    </>
  );
}

export default BlogDetails;
