import React from "react";

const Selector = (props) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="grid grid-cols-13 gap-2">
        {letters.map((l) => {
          const count = props.done[l]?.length || 0;
          const isActive = props.current === l;
          return (
            <div
              key={l}
              onClick={() => props.setCurrent(l)}
              className={`relative cursor-pointer rounded-xl p-2 text-center font-bold text-lg transition-all select-none
                ${
                  isActive
                    ? "bg-amber-400 text-gray-950"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {l.toUpperCase()}
              {count > 0 && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center text-gray-500 text-sm mt-4">
        Hunting words starting with{" "}
        <span className="text-amber-400 font-bold text-base">
          {props.current.toUpperCase()}
        </span>{" "}
        — {props.done[props.current]?.length || 0} found
      </div>
    </div>
  );
};

export default Selector;
