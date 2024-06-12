import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function tripCard(props) {
  return (
    <div className="flex gap-5 p-5 max-sm:flex-col">
      <img
        className="trip-image-first w-[275px] h-[200px] rounded-3xl object-cover"
        src={props.photosFirst}
        alt={props.title}
      />
      <div className="trip-text flex flex-col gap-1">
        <h2 className="trip-title font-bold text-xl">{props.title}</h2>
        <p className="trip-description text-sm text-gray-600">
          {props.description}
        </p>
        <a
          className="text-sm text-cyan-500 underline"
          href={props.url}
          target="_blank"
          rel="noreferrer"
        >
          อ่านต่อ
        </a>
        <div className="trip-tag text-sm flex flex-row gap-2">
          <p>หมวด</p>
          <a className="trips-tag-type text-gray-600 underline" href="">
            {props.tag}
          </a>
        </div>
        <div className="flex justify-between">
          <div className="trip-photos-all flex gap-5">
            {props.photosAll.map((photo, index) => (
              <img
                key={index}
                className="w-[50px] h-[50px] rounded-md object-cover"
                src={photo}
                alt={props.title}
              />
            ))}
          </div>
          <div className="trip-clipboard flex align-middle items-center">
            <a className="rounded-full border-cyan-500 border-2 p-1" href="">
              <FontAwesomeIcon icon={faLink} className="text-cyan-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default tripCard;
