import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Pagetitle from "../elements/Pagetitle";
import Portfolio from "../elements/Portfolio";

const allData = [
  {
    id: 1,
    title: "CareerGym",
    category: "R&D",
    image: "images/works/careergym.png",
    logo: "images/works/CareerGym-logo.png",
    link: "https://careergym.app",
    description: "Your personal career fitness trainer."
  },
  {
    id: 2,
    title: "GitKetchup",
    category: "Beta",
    image: "images/works/gitketchup.png",
    logo: "images/works/Ketchup.logo.png",
    link: "https://gitketchup.com",
    description: "Turn git activity into cinematic stories."
  },
  {
    id: 3,
    title: "HeadsUp",
    category: "R&D",
    image: "images/works/headsup.png",
    logo: "images/works/HeadsUp-logo.png",
    link: "https://headsup.city",
    description: "AR property intelligence for investors."
  },
  {
    id: 4,
    title: "PlayAction Studios",
    category: "R&D",
    image: "images/works/playaction.png",
    logo: "images/works/Playaction-logo.png",
    link: "https://playactionstudios.com",
    description: "Film + interactive media experiments."
  },
  {
    id: 5,
    title: "Sink",
    category: "Coming Soon",
    image: "images/works/sink.png",
    logo: "images/works/Sink-Logo.svg",
    link: "https://sink.chat",
    description: "Encrypted chat for the paranoid."
  },
  {
    id: 6,
    title: "VibeFeedback",
    category: "Beta",
    image: "images/works/vibefeedback.png",
    logo: "images/works/VibeFeedback-logo.png",
    link: "https://vibefeedback.app",
    description: "Real-time feedback for events and teams."
  },
  {
    id: 7,
    title: "TravelDay",
    category: "Beta",
    image: "images/works/travelday.png",
    logo: "images/works/Travelday-logo.png",
    link: "https://travelday.world",
    description: "Travel safety copilot."
  }
];

const filters = [
  { id: 1, text: "Everything" },
  { id: 2, text: "Live" },
  { id: 3, text: "Beta" },
  { id: 4, text: "R&D" },
  { id: 5, text: "Coming Soon" }
];

function PortfolioSection() {
  const [getAllItems] = useState(allData);
  const [dataVisibleCount, setDataVisibleCount] = useState(6);
  const [dataIncrement] = useState(3);
  const [activeFilter, setActiveFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState([]);
  const [noMorePost, setNoMorePost] = useState(false);

  useEffect(() => {
    setActiveFilter(filters[0].text);
    setVisibleItems(getAllItems.filter((item) => item.id <= 6));
  }, [getAllItems]);

  const handleChange = (e) => {
    e.preventDefault();
    setActiveFilter(e.target.textContent.toLowerCase());
    let tempData;
    if (e.target.textContent === filters[0].text) {
      tempData = getAllItems.filter((data) => data.id <= dataVisibleCount);
    } else {
      tempData = getAllItems.filter(
        (data) =>
          data.category === e.target.textContent &&
          data.id <= dataVisibleCount
      );
    }
    setVisibleItems(tempData);
  };

  const handleLoadmore = (e) => {
    window.location.href = "https://semicolon-d.com";
    e.preventDefault();
    // let tempCount = dataVisibleCount + dataIncrement;
    // if (dataVisibleCount > getAllItems.length) {
    //   setNoMorePost(true);
    // } else {
    //   setDataVisibleCount(tempCount);
    //   if (activeFilter === filters[0].text.toLowerCase()) {
    //     console.log("they are same");
    //     setVisibleItems(getAllItems.filter((data) => data.id <= tempCount));
    //   } else {
    //     setVisibleItems(
    //       getAllItems.filter(
    //         (data) => data.category === activeFilter && data.id <= tempCount
    //       )
    //     );
    //   }
    // }
  };

  return (
    <section id="portfolio">
      <div className="container">
        <Pagetitle title="Portfolio" />
        {/* Start Portfolio Filters */}
        <ScrollAnimation
          animateIn="fadeInUp"
          animateOut="fadeInOut"
          animateOnce={true}
        >
          <ul className="portfolio-filter list-inline">
            {filters.map((filter) => (
              <li className="list-inline-item" key={filter.id}>
                <button
                  onClick={handleChange}
                  className={
                    filter.text.toLowerCase() === activeFilter
                      ? "text-capitalize current"
                      : "text-capitalize"
                  }
                >
                  {filter.text}
                </button>
              </li>
            ))}
          </ul>
        </ScrollAnimation>
        {/* End Portfolio Filters */}

        {/* Start Portfolio Items */}
        <div className="row portfolio-wrapper">
          {visibleItems.map((item) => (
            <div className="col-md-4 col-sm-6 grid-item" key={item.id}>
              <Portfolio portfolio={item} />
            </div>
          ))}
        </div>
        {/* End Portfolio Items */}

        <div className="load-more text-center mt-4">
          <button
            className="btn btn-default"
            onClick={handleLoadmore}
            disabled={noMorePost ? "disabled" : null}
          >
            {noMorePost ? (
              "No more items"
            ) : (
              <span>
                <i className="fas fa-spinner"></i> See more at Semicolon-D.com
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
