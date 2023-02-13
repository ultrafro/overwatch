import { useEffect, useRef, useState } from "react";

export default function Abilities() {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            height: 100%;
            position: relative;
          }

          .bigNumber {
            font-size: 18px;
            align-self: center;
            transform: skewX(-12deg);
          }

          .smallNumber {
            font-size: 12px;
            align-self: center;
            transform: skewX(-12deg);
          }
        `}
      </style>

      <CooldownButtonFunctional
        src={"/rocket.png"}
        label={"shift"}
        keyCode={"Shift"}
        coolDown={6}
      />
      <CooldownButtonFunctional
        src={"/expand.png"}
        label={"E"}
        keyCode={"e"}
        coolDown={10}
      />
      <div className="bigNumber">2</div>
      <div className="smallNumber">/6</div>
    </div>
  );
}

export function CooldownButtonFunctional({
  src,
  label,
  keyCode,
  coolDown,
}: {
  src: string;
  label: string;
  keyCode: string;
  coolDown: number;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const keyPressTime = useRef<number | null>(null);

  useEffect(
    function onLoad() {
      let trackingInterval: number | null = null;

      const onKeyDown = (evt: KeyboardEvent) => {
        const elapsedSinceLastKeypress =
          Date.now() - (keyPressTime.current ?? 0);
        if (
          evt.key === keyCode &&
          elapsedSinceLastKeypress / 1000 - coolDown > 0
        ) {
          setTimeLeft(coolDown);
          keyPressTime.current = Date.now();

          trackingInterval = window.setInterval(() => {
            const elapsed = Date.now() - (keyPressTime.current ?? 0);
            const newTimeLeft = Math.max(0, coolDown - elapsed / 1000);

            setTimeLeft(newTimeLeft);

            if (newTimeLeft === 0) {
              setTimeLeft(0);
              typeof trackingInterval === "number" &&
                clearInterval(trackingInterval);
            }
          }, 10);
        }
      };

      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
        typeof trackingInterval === "number" && clearInterval(trackingInterval);
      };
    },
    [keyCode, coolDown]
  );

  return (
    <CooldownButton
      src={src}
      label={label}
      timeLeft={timeLeft}
      totalTime={coolDown}
    />
  );
}

export function CooldownButton({
  src,
  label,
  timeLeft,
  totalTime,
}: {
  src: string;
  label: string;
  timeLeft: number;
  totalTime: number;
}) {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            position: relative;
            padding-right: 10px;
            align-items: center;
          }

          .iconImage {
            width: 8vh;
            height: 8vh;
            background-color: rgba(255, 255, 255, ${timeLeft > 0 ? 0.1 : 1});
            border-radius: 20%;
            position: relative;
            transform: skewX(-12deg);
          }

          .icon {
            width: 60%;
            height: 60%;
            background-image: url(${src});
            background-size: cover;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .label {
            position: relative;
            top: 0;
            left: 0;
            padding-top: 8px;
            font-size: 10px;
            color: rgba(200, 200, 200, 1);
          }

          .countdown {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: ${100 * (1 - timeLeft / totalTime)}%;
            border-radius: 20%;
            background-color: rgba(234, 240, 67, 0.5);
            // transform: skewX(-12deg);
          }

          .countdownText {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            font-size: 32px;
          }
        `}
      </style>

      <div className="iconImage">
        <div className="icon" />
        {timeLeft && (
          <>
            <div className="countdown"></div>
            <div className="countdownText">
              {Math.floor(timeLeft).toFixed(0)}
            </div>
          </>
        )}
      </div>

      <div className="label"> {label}</div>
    </div>
  );
}
