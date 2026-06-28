import React, { useEffect, useState } from "react";
import axios from "axios";
import Selector from "../components/Selector";
import Input from "../components/Input";
import Done from "../components/Done";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api";

const Game = () => {
  const [current, setCurrent] = useState("a");
  const [input, setInput] = useState("");
  const [allWords, setAllWords] = useState([]);
  const [data, setData] = useState([]);
  const [done, setDone] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentDone = done[current] || [];
  const totalFound = Object.values(done).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  const addWord = (word) => {
    const updated = { ...done, [current]: [...(done[current] || []), word] };
    setDone(updated);
    axios.post(
      `${BASE_URL}/api/progress`,
      { done: updated },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchAllWords = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt",
      );
      const words = response.data
        .split("\n")
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
      setAllWords(words);
      setData(words.filter((w) => w.startsWith("a")));
      setLoading(false);
    };
    fetchAllWords();
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDone(res.data.done || {});
      } catch (err) {
        console.log("Progress fetch failed:", err);
      }
    };
    fetchProgress();
  }, []);

  useEffect(() => {
    if (allWords.length === 0) return;
    setMsg("");
    setInput("");
    setData(allWords.filter((w) => w.startsWith(current)));
  }, [current]);

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="text-amber-400 font-bold text-2xl tracking-tight">
          AlphaHunt
        </div>
        <div className="flex items-center gap-4">
          <div className="text-gray-400 text-sm">
            Total found:{" "}
            <span className="text-amber-400 font-bold">{totalFound}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 border border-gray-700 rounded-xl px-4 py-2 text-sm hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-3">
          <div className="text-amber-400 text-2xl font-bold">
            Loading words...
          </div>
          <div className="text-gray-500 text-sm">
            Fetching dictionary, please wait
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
          <Selector current={current} setCurrent={setCurrent} done={done} />
          <Input
            input={input}
            setInput={setInput}
            data={data}
            msg={msg}
            setMsg={setMsg}
            done={currentDone}
            setDone={addWord}
            current={current}
          />
          <Done done={currentDone} current={current} />
        </div>
      )}
    </div>
  );
};

export default Game;
