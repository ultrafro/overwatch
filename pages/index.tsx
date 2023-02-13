import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import overwatchStyles from "@/styles/OverwatchUIStyles.module.css";
import PlayerPortrait from "./PlayerPortrait";
import PlayerInfo from "./PlayerInfo";
import Ultimate from "./Ultimate";
import Abilities from "./Abilities";
// import overwatchStyles from "@/styles/OverwatchUIStyles.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // console.log(overwatchStyles);
  return (
    <>
      <div className={"container"}>
        <div className="playerInfo">
          <PlayerInfo />
        </div>
        <div className="ult">
          <Ultimate fraction={0.75} />
        </div>

        <div className="abilities">
          <Abilities />
        </div>

        <style jsx>{`
          .container {
            height: 100vh;
            width: 100vw;
            position: absolute;
            background-image: url("/bg.jpg");
            object-fit: contain;
            top: 0;
            color: white;
            font-family: "Overwatch";
            overflow: hidden;
          }

          .playerInfo {
            position: absolute;
            bottom: 10vh;
            left: 10vh;
            width: 100%;
            height: 100%;
            transform-origin: center;
            transform: rotate(-1.5deg);
          }

          .ult {
            position: absolute;
            bottom: 10vh;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }

          .abilities {
            position: absolute;
            bottom: 10vh;
            right: 15vh;

            transform-origin: center;
            transform: rotate(1.5deg);
          }
        `}</style>
      </div>
    </>
  );
}
