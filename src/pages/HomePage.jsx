import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import EventIcon from "@mui/icons-material/Event";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CircularProgress, useMediaQuery } from "@mui/material";

import axios from "../axios";
import ImageCard from "../component/card/Image";
import ImageTitle from "../component/card/ImageTitle";
import ImageTitleDate from "../component/card/ImageTitleDate";
import TitleCard from "../component/card/Title";
import Title from "../component/card/Title";
import Carousel from "../component/carousel/Carousel";
import CarouselWrapper from "../component/carousel/CarouselWrapper";
import EventList from "../component/EventList/EventList";
import Footer from "../component/Footer/Footer";
import Header from "../component/header/header";
import Widget from "../component/widget/widget";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Homepage.css";
import Twitter from "../component/Twitter/Twitter";

const HomePage = props => {
  const [latestNews, setLatestNews] = useState([]);
  const [frontEvents, setFronEvents] = useState();
  const [carouselData, setCarouselData] = useState();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [loading, setloading] = useState({
    loading1: true,
    loading2: true,
    loading3: true,
  });

  const settings = {
    // centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : latestNews.length >= 3 ? 3 : 2,
    slidesGap: 50,
    // centerMode: true, // add this property
    // centerPadding: "50px", // add this property

    // slidesToScroll: 1,
  };

  useEffect(() => {
    axios
      .get("news/latest/")
      .then(res => {
        setloading(prev => ({
          ...prev,
          loading1: false,
        }));

        setLatestNews(res.data);
      })
      .catch(err => console.log(err));

    axios
      .get("events/front/")
      .then(res => {
        setloading(prev => ({
          ...prev,
          loading2: false,
        }));
        setFronEvents(res?.data);
      })
      .catch(err => console.log(err));

    axios.get("api//featured").then(response => {
      setloading(prev => ({
        ...prev,
        loading3: false,
      }));

      const arr1 = response.data.events;
      const arr2 = response.data.news;
      const mergedArray = arr1.reduce((acc, curr, index) => {
        acc.push({ event: curr });
        if (arr2[index]) {
          acc.push({ news: arr2[index] });
        }
        return acc;
      }, []);
      if (arr2.length > arr1.length) {
        mergedArray.push(...arr2.slice(arr1.length).map(news => ({ news })));
      }
      setCarouselData(mergedArray);
    });
  }, []);
  return (
    <>
      {!loading.loading1 && !loading.loading2 && !loading.loading3 ? (
        <section>
          <Carousel data={carouselData} />
          <main className="container">
            <div>
              <div className="middle_widgets">
                <div>
                  <Widget
                    Icon={EventIcon}
                    link="champion"
                    text="snooker - Billiards"
                  />
                  <EventList
                    data={frontEvents && frontEvents["snooker-billiards"]}
                  />
                </div>
                <div>
                  <Widget Icon={EventIcon} link="champion" text="Pool" />
                  <EventList data={frontEvents?.pool} />
                </div>
                <div>
                  <Widget Icon={TwitterIcon} link="champion" text="Tweets" />
                  <Twitter />
                </div>
              </div>
            </div>
            <section className="latest-news">
              <h4>Latest News</h4>
              <Slider {...settings}>
                {/* <ImageTitleDate />
              <ImageTitleDate /> */}
                {latestNews.map(data => (
                  <>
                    <ImageTitleDate
                      key={data.id}
                      id={data.id}
                      slug={data.slug}
                      title={data.title}
                      timestamp={data.timestamp}
                      image={`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}${
                        data.image
                      }`}
                    />
                  </>
                ))}
              </Slider>
            </section>
          </main>
          <section style={{ background: "#EBEBEB", marginTop: "2rem" }}>
            <CarouselWrapper />
          </section>
          <Footer></Footer>
        </section>
      ) : (
        <div
          id="loader"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default HomePage;
