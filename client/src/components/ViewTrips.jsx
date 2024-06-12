import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";
import axios from "axios";

function ViewTrips() {
  const [tripsData, setTripsData] = useState([]);
  const [keywords, setKeywords] = useState("");

  const getTripsData = async (keywords = "") => {
    try {
      const Response = await axios.get(
        `http://localhost:4001/trips?keywords=${keywords}`
      );
      setTripsData(Response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTripsData(keywords);
  }, [keywords]);

  return (
    <>
      <div className="w-full h-fit flex  flex-col items-center mx-auto item  px-[10%] pt-10">
        <h1 className="title-page flex justify-center text-cyan-500 text-4xl font-medium">
          เที่ยวไหนดี
        </h1>
        <div className="search-box flex justify-start w-[80%] border-gray border-b-[3px]">
          <div className="search-box-text w-[20%] flex justify-start pb-5">
            <p className="align-top">ค้นหาที่เที่ยว</p>
          </div>
          <div className="search-box-input w-full flex justify-start items-end">
            <input
              className="w-full p-1"
              type="text"
              placeholder="หาที่เที่ยวแล้วไปกัน ..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>
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
              tag={item.tags.map((type) => (
                <a className="trips-tag-type mx-1 px-1 underline">{type}</a>
              ))}
              photosAll={[item.photos[1], item.photos[2], item.photos[3]]}
              url={item.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewTrips;
