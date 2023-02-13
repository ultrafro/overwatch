import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import overwatchStyles from "@/styles/OverwatchUIStyles.module.css";
import PlayerPortrait from "./PlayerPortrait";
import PlayerInfo from "./PlayerInfo";
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
        `}</style>
      </div>
    </>
  );
}
