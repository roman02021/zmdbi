import React, { useRef, useEffect } from "react";

export const RatingWheel = ({ rating, discover }) => {
  const canvasRef = useRef(null);
  const radius = (2 / 100) * rating;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 6;

    //Rating wheel border dependent on rating
    if (radius) {
      if (rating < 55) {
        ctx.strokeStyle = "orange";
      } else if (rating <= 30) {
        ctx.strokeStyle = "gray";
      } else {
        ctx.strokeStyle = "green";
      }

      ctx.arc(22, 22, 18, 0, radius * Math.PI);
      ctx.stroke();
    } else {
      ctx.strokeStyle = "red";
      ctx.arc(22, 22, 18, 0, 2 * Math.PI);
      ctx.stroke();
    }
    //Black middle of the rating wheel
    ctx.beginPath();
    ctx.arc(22, 22, 17, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    if (rating === 100) {
      ctx.font = "700 13px Roboto";
      ctx.fillText(`${rating}%`, 6, 26, 36);
    } else if (rating) {
      ctx.font = "700 14px Roboto";
      ctx.fillText(`${rating}%`, 9, 27, 36);
    } else {
      ctx.font = "700 14px Roboto";
      ctx.fillText(`NR`, 12, 27, 36);
    }
  }, []);

  // var myFont = new FontFace(
  //   "My Font",
  //   "url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap)"
  // );
  // let fontLoaded = false;
  // myFont.load().then(function (font) {
  //   // with canvas, if this is ommited won't work
  //   document.fonts.add(font);
  //   fontLoaded = true;
  //   console.log("Font loaded");
  // });

  return (
    <div style={{ fontFamily: "Roboto" }}>
      {discover ? (
        <canvas
          width="44px"
          height="44px"
          ref={canvasRef}
          {...rating}
          style={{
            borderColor: "blue",
            position: "absolute",
            top: "3px",
            right: "152px",
          }}
        ></canvas>
      ) : (
        <canvas
          width="44px"
          height="44px"
          ref={canvasRef}
          {...rating}
          style={{
            fontFamily: "Roboto",
            borderColor: "blue",
            position: "absolute",
            top: "1px",
            right: "108px",
          }}
        ></canvas>
      )}
    </div>
  );
};
export default RatingWheel;
