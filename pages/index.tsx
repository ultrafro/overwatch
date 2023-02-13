import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import overwatchStyles from "@/styles/OverwatchUIStyles.module.css";
import PlayerPortrait from "./PlayerPortrait";
import PlayerInfo from "./PlayerInfo";
import Ultimate from "./Ultimate";
import Abilities from "./Abilities";
import { useEffect, useState } from "react";
// import overwatchStyles from "@/styles/OverwatchUIStyles.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [ulting, setUlting] = useState<boolean>(false);
  const [health, setHealth] = useState<number>(200);
  const [ultCharge, setUltCharge] = useState<number>(0);

  useEffect(
    function whenLoad() {
      const onClick = () => {
        if (health <= 10) {
          setHealth(200);
        } else {
          setHealth(health - 10);
        }
        if (ultCharge <= 100 - 3.5) {
          setUltCharge(ultCharge + 3.5);
        } else {
          setUltCharge(100);
        }
      };

      window.addEventListener("pointerdown", onClick);

      return () => {
        window.removeEventListener("pointerdown", onClick);
      };
    },
    [health, ultCharge]
  );

  useEffect(
    function whenLoad() {
      const onKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === "q" && !ulting && ultCharge >= 100) {
          setUlting(true);
          setUltCharge(0);
          setTimeout(() => {
            setUlting(false);
          }, 1000);
        }
      };

      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("keydown", onKeyDown);
      };
    },
    [ultCharge, ulting]
  );

  // console.log(overwatchStyles);
  return (
    <>
      <div className={"container"}>
        <div className="playerInfo">
          <PlayerInfo health={health} />
        </div>
        <div className="ult">
          <Ultimate fraction={ultCharge / 100} />
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
            animation: ${ulting ? "shake 0.5s" : ""};
            animation-iteration-count: infinite;
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

          @keyframes shake {
            0% {
              transform: translate(1px, 1px) rotate(0deg);
            }
            10% {
              transform: translate(-1px, -2px) rotate(-1deg);
            }
            20% {
              transform: translate(-3px, 0px) rotate(1deg);
            }
            30% {
              transform: translate(3px, 2px) rotate(0deg);
            }
            40% {
              transform: translate(1px, -1px) rotate(1deg);
            }
            50% {
              transform: translate(-1px, 2px) rotate(-1deg);
            }
            60% {
              transform: translate(-3px, 1px) rotate(0deg);
            }
            70% {
              transform: translate(3px, 1px) rotate(-1deg);
            }
            80% {
              transform: translate(-1px, -1px) rotate(1deg);
            }
            90% {
              transform: translate(1px, 2px) rotate(0deg);
            }
            100% {
              transform: translate(1px, -2px) rotate(-1deg);
            }
          }
        `}</style>
      </div>
    </>
  );
}
