import PlayerHealth, { HealthBar } from "./PlayerHealth";

export default function PlayerPortrait({ src }: { src: string }) {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            position: relative;
            top: -20px;
            left: 0;
            width: 10vh;
            height: 10vh;
          }
        `}
      </style>
      <Hex />
      <PlayerHexImage src={src} />
      <HexDown />
    </div>
  );
}

export function Hex() {
  const points: { x: number; y: number }[] = [];
  const cutoutPoints: { x: number; y: number }[] = [];

  const radius = 50;

  for (let i = 0; i < 6; i++) {
    const theta = (-i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = radius * Math.cos(theta) + radius;
    const y = radius * Math.sin(theta) + radius;
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    path += `L ${points[i].x} ${points[i].y} `;
  }
  path += "Z";

  const cutoutRadius = 45;
  for (let i = 0; i < 6; i++) {
    const theta = (i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = cutoutRadius * Math.cos(theta) + radius;
    const y = cutoutRadius * Math.sin(theta) + radius;
    cutoutPoints.push({ x, y });
  }

  path += `M ${cutoutPoints[0].x} ${cutoutPoints[0].y} `;
  for (let i = 1; i < cutoutPoints.length; i++) {
    path += `L ${cutoutPoints[i].x} ${cutoutPoints[i].y} `;
  }
  path += "Z";

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
      >
        <path fill="#ccc" d={path}></path>
      </svg>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
          display: flex;
          position: absolute;
          top: 0px;
          left: 0px;
        }
      `}</style>
    </div>
  );
}

export function PlayerHexImage({ src }: { src: string }) {
  const points: { x: number; y: number }[] = [];
  const cutoutPoints: { x: number; y: number }[] = [];

  const radius = 50;
  const smallRadius = 42;
  const nub = radius - smallRadius * Math.cos((30 * Math.PI) / 180);

  points.push({ x: nub, y: 0 });
  points.push({ x: 2 * radius - nub, y: 0 });

  for (let i = 2; i < 5; i++) {
    const theta = (-i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = smallRadius * Math.cos(theta) + radius;
    const y = 100 - smallRadius * Math.sin(theta) - radius;
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    path += `L ${points[i].x} ${points[i].y} `;
  }
  path += "Z";

  return (
    <div className={"container"}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fillRule="evenodd"
      >
        <defs>
          <pattern
            id="pattern1"
            height="100%"
            width="100%"
            patternContentUnits="objectBoundingBox"
          >
            <image
              height="1"
              width="1"
              preserveAspectRatio="none"
              xlinkHref={src}
            />
          </pattern>
        </defs>
        <path fill="url(#pattern1)" d={path}></path>
      </svg>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
          display: flex;
          position: absolute;
          top: 0px;
          left: 0px;
        }
      `}</style>
    </div>
  );
}

export function HexDown() {
  const points: { x: number; y: number }[] = [];
  const cutoutPoints: { x: number; y: number }[] = [];

  const radius = 50;
  const smallRadius = 42;
  const nub = radius - smallRadius * Math.cos((30 * Math.PI) / 180);

  for (let i = 2; i < 5; i++) {
    const theta = (-i / 6) * Math.PI * 2 + Math.PI / 2;
    const x = smallRadius * Math.cos(theta) + radius;
    const y = 100 - smallRadius * Math.sin(theta) - radius;
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    path += `L ${points[i].x} ${points[i].y} `;
  }
  //   path += "Z";

  return (
    <div className={"container"}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fillRule="evenodd"
      >
        <path stroke="#fff" fill="none" strokeWidth="2.5px" d={path}></path>
      </svg>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
          display: flex;
          position: absolute;
          top: 1.5vh;
          left: 0px;
        }
      `}</style>
    </div>
  );
}
