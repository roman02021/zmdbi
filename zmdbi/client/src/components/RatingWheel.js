import React, { useRef, useEffect } from "react";

export const RatingWheel = ({ rating, discover }) => {
  const canvasRef = useRef(null);
  const radius = (2 / 100) * rating;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 6;
    if (radius) {
      if (rating < 55) {
        ctx.strokeStyle = "orange";
      } else if (rating <= 30) {
        ctx.strokeStyle = "gray";
      } else {
        ctx.strokeStyle = "green";
      }

      ctx.arc(18, 18, 15, 0, radius * Math.PI);
      ctx.stroke();
    } else {
      ctx.strokeStyle = "red";
      ctx.arc(18, 18, 15, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(18, 18, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();

    ctx.fillStyle = "white";
    if (rating) {
      ctx.font = "12px Arial";
      ctx.fillText(`${rating}%`, 7, 23, 36);
    } else {
      ctx.font = "14px Arial";
      ctx.fillText(`NR`, 7, 23, 36);
    }
  }, []);
  return (
    <div>
      {discover ? (
        <canvas
          width="36px"
          height="36px"
          ref={canvasRef}
          {...rating}
          style={{
            borderColor: "blue",
            position: "absolute",
            top: "260px",
            right: "162px",
          }}
        ></canvas>
      ) : (
        <canvas
          width="36px"
          height="36px"
          ref={canvasRef}
          {...rating}
          style={{
            borderColor: "blue",
            position: "absolute",
            top: "191px",
            right: "115px",
          }}
        ></canvas>
      )}
    </div>
  );
};
export default RatingWheel;
