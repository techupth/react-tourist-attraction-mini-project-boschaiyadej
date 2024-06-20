import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function tripCard(props) {
  const copyToClipboard = (text, title) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert(`Copy ${title} to Clipboard`);
  };

  return (
    <div className="flex gap-5 p-5 max-sm:flex-col items-center w-full">
      <img
        className="trip-image-first min-w-[275px] w-[275px] h-[200px] rounded-3xl object-cover flex items-center"
        src={props.photosFirst}
        alt={props.title}
      />
      <div className="trip-text flex flex-col gap-1 w-full">
        <h2 className="trip-title font-bold text-xl">{props.title}</h2>
        <p className="trip-description text-sm text-gray-600">
          {props.description}
        </p>
        <a
          className="text-sm text-cyan-500 underline w-fit"
          href={props.url}
          target="_blank"
          rel="noreferrer"
        >
          อ่านต่อ
        </a>
        <div className="trip-tag text-sm flex flex-row gap-1">
          <p>หมวด</p>
          <p className="trips-tag-type flex flex-wrap text-gray-600">
            {props.tag}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="trip-photos-all flex gap-5 mt-2">
            {props.photosAll.map((photo, index) => (
              <img
                key={index}
                className="w-[60px] h-[60px] rounded-md object-cover"
                src={photo}
                alt={props.title}
              />
            ))}
          </div>
          <div className="trip-clipboard flex align-middle items-end">
            <div
              className="rounded-full border-cyan-500 border-2 p-1 cursor-pointer"
              onClick={() => copyToClipboard(props.url, props.title)}
            >
              <FontAwesomeIcon icon={faLink} className="text-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default tripCard;
