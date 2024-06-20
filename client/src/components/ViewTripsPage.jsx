import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function ViewTripsPage() {
  const [tripsData, setTripsData] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTripsData = async (keywords) => {
    setIsLoading(true);
    try {
      const Response = await axios.get(
        `http://localhost:4001/trips?keywords=${keywords}`
      );
      setTripsData(Response.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTripsData(keywords);
  }, [keywords]);

  const handleTag = (tag) => {
    if (!keywords.includes(tag)) {
      setKeywords(keywords ? `${keywords} ${tag}` : tag);
    }
  };

  const handleClearKeyword = () => {
    setKeywords("");
  };

  return (
    <>
      <div className="w-full h-fit flex  flex-col items-center mx-auto item  px-[10%] pt-10">
        <h1 className="title-page flex justify-center text-cyan-500 text-4xl font-medium my-5">
          เที่ยวไหนดี
        </h1>
        <div className="search-box flex justify-start w-[80%] border-gray border-b-[3px]">
          <div className="search-box-text w-[30%] flex justify-start pb-5">
            <label className="align-top" htmlFor="searchInput">
              ค้นหาที่เที่ยว
            </label>
          </div>
          <div className="search-box-input w-full flex justify-start items-end">
            <input
              id="searchInput"
              className="w-full p-1 focus:outline-none"
              type="text"
              placeholder="หาที่เที่ยวแล้วไปกัน ..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          {keywords ? (
            <div className="flex items-end cursor-pointer pb-2">
              <FontAwesomeIcon icon={faX} onClick={handleClearKeyword} />
            </div>
          ) : null}
        </div>
        {isLoading ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-cyan-500 mt-10"
            role="status"
          ></div>
        ) : (
          <div className="venue-list flex flex-col gap-5">
            {tripsData.map((item) => (
              <TripCard
                key={item.id}
                photosFirst={item.photos[0]}
                title={item.title}
                description={
                  item.description.length > 100
                    ? `${item.description.substring(0, 100)} ...`
                    : item.description
                }
                tag={item.tags.map((type, tagIndex) =>
                  tagIndex !== item.tags.length - 1 ? (
                    <p
                      key={tagIndex}
                      className="trips-tag-type mx-1 px-1 underline cursor-pointer"
                      onClick={() => handleTag(type)}
                    >
                      {type}
                    </p>
                  ) : (
                    <div className="flex flex-row" key={tagIndex}>
                      <p>และ</p>
                      <p
                        className="trips-tag-type mx-1 px-1 underline cursor-pointer"
                        onClick={() => handleTag(type)}
                      >
                        {type}
                      </p>
                    </div>
                  )
                )}
                photosAll={item.photos.slice(1, 4)}
                url={item.url}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewTripsPage;
