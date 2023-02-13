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
          position: relative;
          width: 100%;
          height: 100%;
          left: 50%;
          top: 10%;
          font-size: 16px;
        }
      `}</style>

      <div className="ultBox">
        <div className="circle" />
        <CircleBars fraction={fraction} />
        <div className="percent">
          <div className="percentBig">
            {Math.floor(fraction * 100).toFixed(0)}
          </div>
          <div className="percentSmall">{"%"}</div>
        </div>
        <div className="q">{"Q"}</div>
      </div>
    </div>
  );
}

export function CircleBars({ fraction }: { fraction: number }) {
  const bars: { theta: number; on: boolean }[] = [];
  const N = 36;
  for (let i = 0; i < N; i++) {
    const theta = (-i / N) * 2 * Math.PI + Math.PI / 2;
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
