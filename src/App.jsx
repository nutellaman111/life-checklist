import React, { useState } from "react";
import ChecklistItem from "./ChecklistItem";
import "./App.css";
import stripes from "./assets/stripes.png";
import banner from "./assets/illustration3.png";
import { useCallback } from "react";

export default function App() {
  const baseItems = [
    { text: "Watch a video", color: "#FF0000" },
    { text: "post a comment", color: "#d07d00ff" },
    { text: "Play a browser game", color: "#f4d35e" },
    { text: "Draw on MS Paint", color: "#aaf2ffff" },
    { text: "Download Chrome", color: "#f44242ff" },
    { text: "Download a game", color: "#4e6fb6ff" },
    { text: "Get called a slur ingame", color: "#4d0003ff" },
    { text: "Ragequit", color: "#ff0000ff" },
    { text: "Pull an all-nighter ingame", color: "#6430b8ff" },
    { text: "Try being a youtuber or streamer", color: "#c1121f" },
    { text: "Make a Discord account", color: "#52619aff" },
    { text: "Talk in a VC", color: "#43862bff" },
    { text: "Make an online friend", color: "#ba38abff" },
    {
      text: "Befriend someone 5+ timezones away",
      color: "#005f73",
    },
    { text: "Fall asleep in VC", color: "#570a96ff" },
    { text: "Download a non-Chrome browser", color: "#ff7139" },
    { text: "Gift a game", color: "#e63946" },
    { text: "make a microtransaction", color: "#48c162ff" },
    { text: "Make a meme", color: "#2ec4b6" },
    { text: "Go on Urban Dictionary", color: "#8ecae6" },
    { text: "Get Rickrolled", color: "#77a76aff" },
    { text: "Rickroll someone else", color: "#39aa97ff" },
    { text: "Stream on Twitch", color: "#a782ec" },
    { text: "Buy Youtuber merch", color: "#b8422dff" },
    { text: "Do the BDSM test", color: "#34004dff" },
    { text: "Read a fanfic", color: "#9d4edd" },
    { text: "Delete all your old posts", color: "#adb5bd" },
    { text: "Have an OC that represents you", color: "#ef476f" },
    { text: "Face reveal to an online friend", color: "#c77dff" },
    { text: "E-date", color: "#ff69eb" },
    { text: "Build a computer", color: "#4e5947ff" },
    { text: "Create a website", color: "#9fccdbff" },
    { text: "Use the Wayback Machine", color: "#3a545cff" },
    { text: "Edit a Wikipedia page", color: "#c6d5dcff" },
    { text: "Smurf in a game", color: "#219ebc" },
    { text: "Get an inappropriate pop up", color: "#5b33b2ff" },
    { text: "Pirate something", color: "#1a1616ff" },
    { text: "Visit Rule34", color: "#4b348bff" },
    { text: "Visit 4chan", color: "#2a9d8f" },
    { text: "Use a VPN", color: "#264653" },
    { text: "Have an online stalker", color: "#641c1cff" },
    { text: "Use hacks in a multiplayer game", color: "#9e0059" },
    { text: "Get banned or suspended", color: "#540c0bff" },
    { text: "Get hacked", color: "#26232eff" },
    { text: "Be a mod", color: "#4d2d13ff" },
    { text: "Post nudes publicly", color: "#2c0a48ff" },
    { text: "Get 100 likes on something", color: "#76a9f6ff" },
    { text: "Get 1k likes on something", color: "#8ec150ff" },
    { text: "Get 10k likes on something", color: "#d1c470ff" },
    { text: "Get 100k likes on something", color: "#ffbf00ff" },
    { text: "Get 1m likes on something", color: "#ff3700ff" },
    { text: "Use Tor", color: "#8d99ae" },
    { text: "Visit dark web", color: "#000000ff" },
    { text: "Post on 4chan", color: "#3ba373ff" },
  ];

  const [items, setItems] = useState(
    baseItems.map((item) => ({ ...item, completed: false }))
  );

  const toggle = useCallback((index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <>
      <div
        className="moving-dashed-stripes"
        style={{
          backgroundImage: `url(${stripes})`,
          backgroundRepeat: "repeat",
        }}
      />
      <div id="container">
        <img id="banner" src={banner} alt="Pixelated" className="pixelated" />
        <div id="tagline">
          inspired by{" "}
          <a
            href="https://neal.fun/life-checklist/"
            target="_blank"
            rel="noopener noreferrer"
          >
            neal.fun/life-checklist
          </a>
        </div>
        <div id="sticky">
          <div id="progress-bar-container">
            <div id="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <ProgressButton completed={completedCount} total={totalCount} />
        </div>
        <div id="checklist">
          {items.map((item, index) => (
            <ChecklistItem
              key={item.text}
              item={item}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ProgressButton({ completed, total }) {
  const [copied, setCopied] = React.useState(false); // also make sure useState is imported

  const handleCopy = () => {
    const text = `I completed ${completed}/${total} items on the chronically online life checklist.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      <button
        className="progress-button"
        type="button"
        onClick={handleCopy}
        aria-label={`Progress: ${completed} of ${total}`}
      >
        {!copied ? (
          <>
            <span className="progress-text">{`${completed}/${total}`}</span>
            <svg
              className="share-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </>
        ) : (
          <span className="progress-text">COPIED</span>
        )}
      </button>
    </div>
  );
}
