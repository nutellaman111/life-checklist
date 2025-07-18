import React, { useMemo } from "react";
import Color from "colorjs.io";

const ChecklistItem = React.memo(
  function ChecklistItem({ item, onToggle }) {
    const fillStyle = useMemo(
      () => ({
        backgroundColor: item.completed
          ? mixWithBlueAndSetBrightness(item.color, 60)
          : mixWithBlueAndSetBrightness(item.color, 98),
        cursor: "pointer",
      }),
      [item.completed, item.color]
    );

    const shadowStyle = useMemo(
      () => ({
        backgroundColor: item.completed
          ? mixWithBlueAndSetBrightness(item.color, 54)
          : mixWithBlueAndSetBrightness(item.color, 92),
      }),
      [item.completed, item.color]
    );

    return (
      <div
        className="item"
        onClick={() => {
          onToggle(item.id);
        }}
      >
        <div className="item-front" style={fillStyle}>
          <label className="item-checkbox-container">
            <input
              className="item-checkbox"
              type="checkbox"
              checked={item.completed}
              readOnly
            />
            <span className="item-checkmark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: item.completed ? "block" : "none" }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </label>
          <span className={`item-text ${item.completed ? "completed" : ""}`}>
            {item.text}
          </span>
        </div>
        <div className="item-shadow" style={shadowStyle} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.completed === nextProps.item.completed;
  }
);

function mixWithBlueAndSetBrightness(originalColorHex, brightness) {
  let original = new Color(originalColorHex).to("oklch");
  let blue = new Color("#28186eff").to("oklch");
  let mixed = original.mix(blue, 0.4, { space: "oklch" });
  mixed.l = brightness / 100;
  return mixed.to("srgb").toString({ format: "hex" });
}

export default ChecklistItem;
