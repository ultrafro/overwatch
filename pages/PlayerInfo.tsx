import PlayerHealth from "./PlayerHealth";
import PlayerPortrait from "./PlayerPortrait";

export default function PlayerInfo({
  src,
  health,
  maxHealth,
}: {
  src?: string;
  health?: number;
  maxHealth?: number;
}) {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          width: 40%;
          height: 100%;
          justify-content: flex-start;
          align-items: flex-end;
        }
      `}</style>
      <PlayerPortrait src={src ?? "/hisham.png"} />
      <PlayerHealth health={health ?? 150} maxHealth={maxHealth ?? 200} />
    </div>
  );
}
