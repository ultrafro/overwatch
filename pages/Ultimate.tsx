export default function Ultimate({ fraction }: { fraction: number }) {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          //   background-color: rgba(0, 0, 255, 0.3);
        }

        .ultBox {
          width: 10vh;
          height: 10vh;
          position: relative;
        }

        .circle {
          width: 100%;
          height: 100%;
          border: 2px solid rgba(200, 200, 200, 0.2);
          //background-color: rgba(200, 200, 200, 0.2);
          border-radius: 50%;
          filter: drop-shadow(rgba(255, 255, 255, 1) 0px 0px 1px);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .percent {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform: skewX(-12deg);
        }

        .percentBig {
          font-size: 26px;
          padding: 2px;
        }

        .percentSmall {
          font-size: 8px;
        }

        .q {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 50%;
          top: 110%;
          font-size: 16px;
        }
      `}</style>

      <div className="ultBox">
        {fraction >= 1 && (
          <>
            <BlueCircle />
            <div
              className="q"
              style={{
                filter: "drop-shadow(rgba(0, 0, 255, 1) 0px 0px 1px)",
              }}
            >
              {"Q"}
            </div>
          </>
        )}
        {fraction < 1 && (
          <>
            <div className="circle" />
            <CircleBars fraction={fraction} />

            <div className="percent">
              <div className="percentBig">
                {Math.floor(fraction * 100).toFixed(0)}
              </div>
              <div className="percentSmall">{"%"}</div>
            </div>
            <div className="q">{"Q"}</div>
          </>
        )}
      </div>
    </div>
  );
}

export function BlueCircle() {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
          }

          .blueContainer {
            width: 100%;
            height: 100%;
            border: 3px solid rgba(0, 0, 200, 0.2);
            border-radius: 50%;
            filter: drop-shadow(rgba(0, 0, 255, 1) 0px 0px 1px);
            position: absolute;
            top: 0%;
            left: 0%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px 0 #00f, inset -100px -10px 20px 0 #33f,
              0 0 10px 20px #0ff;
            // box-shadow: 0 0 0px 5px #00f;
          }

          @keyframes slidein {
            0% {
              transform: scale(1) rotate(0deg);
            }

            50% {
              transform: scale(0.8) rotate(360deg);
            }

            100% {
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes slidein2 {
            0% {
              transform: scale(0.8) rotate(0deg);
            }

            50% {
              transform: scale(1) rotate(-360deg);
            }

            100% {
              transform: scale(0.8) rotate(0deg);
            }
          }

          .circle1 {
            animation-duration: 1.4s;
            animation-name: slidein;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .circle2 {
            animation-duration: 1.1s;
            animation-name: slidein2;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .rocket {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0%;
            left: 0%;
            background-image: url("/rocket.png");
            background-size: cover;
          }
        `}
      </style>
      <div className="blueContainer circle1" />
      <div className="blueContainer circle2" />
      <div className="rocket" />
    </div>
  );
}

export function CircleBars({ fraction }: { fraction: number }) {
  const bars: { theta: number; on: boolean }[] = [];
  const N = 36;
  for (let i = 0; i < N; i++) {
    const theta = (i / N) * 2 * Math.PI - (2 * Math.PI) / 2;
    bars.push({ theta: (theta * 180) / Math.PI, on: i / N <= fraction });
  }

  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .bar {
          //   width: 0.2vh;
          //   height: 1.5vh;
          width: 5%;
          height: 100%;
          //background-color: rgba(0, 200, 200, 0.2);
          border-radius: 2px;
          position: absolute;
          top: 50%;
          left: 50%;
          transition: transform 0.5s;
          transition-delay: 1s;
        }

        .miniBar {
          width: 100%;
          height: 15%;
          background-color: rgba(200, 200, 200, 0.2);
          border-radius: 2px;
          position: absolute;
          top: 80%;
          left: 0;
        }
      `}</style>

      {bars.map((bar, idx) => {
        return (
          <div
            key={"bar_idx_" + idx}
            className="bar"
            style={{
              transformOrigin: "center center",
              transform: `translate(-50%,-50%) rotate(${bar.theta}deg)`,

              //   transform: `rotate(${bar.theta}deg) translate(-50%,0%)`,
              //   transform: `rotate(${bar.theta}deg) translate(0,-50%)`,
              //   transform: `rotate(${bar.theta}deg) translate(${0}%,40px) `,
              //   transform: ` translate(${0}%,40px) `,
            }}
          >
            <div
              className="miniBar"
              style={{
                backgroundColor: bar.on
                  ? "rgba(234, 240, 67, 1.0)"
                  : "rgba(200, 200, 200, 0.2)",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
