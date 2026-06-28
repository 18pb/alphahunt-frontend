import React from "react";

const msgStyles = {
  "✅ Found a new word!": "text-green-400 bg-green-400/10",
  "❌ Invalid word!": "text-red-400 bg-red-400/10",
  "⚠️ Word already found!": "text-amber-400 bg-amber-400/10",
};

const Input = (props) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
      <div className="text-gray-400 text-sm font-medium">
        Type a word starting with{" "}
        <span className="text-amber-400 font-bold">
          {props.current.toUpperCase()}
        </span>
      </div>
      <input
        type="text"
        value={props.input}
        placeholder={`${props.current}...`}
        className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-white text-xl outline-0 focus:border-amber-400 transition-colors placeholder-gray-700 uppercase"
        onChange={(e) => {
          const val = e.target.value.toLowerCase().trim();
          props.setInput(val);
          if (!val) {
            props.setMsg("");
            return;
          }
          const alreadyFound = props.done.includes(val);
          if (alreadyFound) {
            props.setMsg("⚠️ Word already found!");
            return;
          }
          const res = props.data.includes(val);
          if (!res) {
            props.setMsg("❌ Invalid word!");
          } else {
            props.setMsg("✅ Found a new word!");
            props.setDone(val);
          }
        }}
      />
      {props.msg && (
        <div
          className={`text-sm rounded-lg px-3 py-2 font-medium ${msgStyles[props.msg] || "text-gray-400"}`}
        >
          {props.msg}
        </div>
      )}
    </div>
  );
};

export default Input;
