export default function PlayerHealth({
  health,
  maxHealth,
}: {
  health: number;
  maxHealth: number;
}) {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 25vh;
          position: relative;
          top: -3vh;
          transform: skewX(-12deg);
          padding-left: 1vh;
          //   height: 100%;
        }

        .healthBars {
          display: flex;

          width: 100%;
          height: 1vh;
          position: relative;
        }

        .healthText {
          display: flex;
          flex-direction: row;
          width: 100%;
          position: relative;
        }
        .healthTextFirst {
          display: flex;
          font-size: 40px;
          position: relative;
          bottom: 0;
          align-self: flex-end;
        }
        .healthTextSecond {
          font-size: 25px;
          display: flex;
          position: relative;
          bottom: 0;
          align-self: flex-end;
        }
      `}</style>
      <div className={"healthText"}>
        <div className={"healthTextFirst"}>{`${health}`}</div>
        <div className={"healthTextSecond"}>{`/${maxHealth}`}</div>
      </div>

      <div className="healthBars">
        <MaxHealthBar />
        <HealthBar fraction={health / maxHealth} />
      </div>
    </div>
  );
}

function getGapPath(fraction?: number): string {
  const numCutouts = 8;
  const gap = 1;

  let cutoutPath = ``;

  for (let i = 0; i < numCutouts; i++) {
    const width = 100 / numCutouts;
    const startX = i * width;
    const stopX = i * width + gap;

    if (stopX > (fraction ?? 1) * 100) {
      continue;
    }

    cutoutPath += `M ${stopX} 0 `;
    cutoutPath += `L ${startX} 0 `;
    cutoutPath += `L ${startX} 100 `;
    cutoutPath += `L ${stopX} 100 `;
  }
  return cutoutPath;
}

export function MaxHealthBar() {
  let bgPath = `M 0 0 `;
  bgPath += `L 100 0`;
  bgPath += `L 100 100`;
  bgPath += `L 0 100`;

  const cutoutPath = getGapPath();
  const fullPath = bgPath + cutoutPath;

  return (
    <div className={"container"}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fillRule="evenodd"
        strokeLinecap="round"
        preserveAspectRatio="none"
      >
        <path fill="#ccc" d={fullPath}></path>
      </svg>
      <style jsx>{`
        .container {
          display: block;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
        }
      `}</style>
    </div>
  );
}

export function HealthBar({ fraction }: { fraction: number }) {
  let bgPath = `M 0 0 `;
  bgPath += `L ${fraction * 100}  0`;
  bgPath += `L ${fraction * 100}  100`;
  bgPath += `L 0 100`;

  const cutoutPath = getGapPath(fraction);
  const fullPath = bgPath + cutoutPath;
  //   const fullPath = bgPath;

  return (
    <div className={"container"}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fillRule="evenodd"
        strokeLinecap="round"
        preserveAspectRatio="none"
      >
        <path fill="#fff" d={fullPath}></path>
      </svg>
      <style jsx>{`
        .container {
          display: block;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
        }
      `}</style>
    </div>
  );
}
