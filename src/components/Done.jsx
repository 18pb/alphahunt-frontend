import React from "react";

const Done = (props) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white font-semibold">
          Words found for{" "}
          <span className="text-amber-400">{props.current.toUpperCase()}</span>
        </div>
        <div className="bg-amber-400/10 text-amber-400 text-sm font-bold px-3 py-1 rounded-full">
          {props.done.length} words
        </div>
      </div>
      <div className="flex gap-2 flex-wrap min-h-[48px]">
        {props.done.length === 0 ? (
          <div className="text-gray-600 text-sm">
            No words found yet — start typing!
          </div>
        ) : (
          props.done.map((elem, idx) => (
            <div
              key={idx}
              className="uppercase bg-gray-800 border border-gray-700 text-amber-400 px-3 py-1 rounded-lg text-sm font-bold tracking-wide"
            >
              {elem}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Done;
