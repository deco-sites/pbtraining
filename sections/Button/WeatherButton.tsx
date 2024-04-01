import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature: Temperature | null;
}

export default function Section({ temperature }: Props) {
  return (
    <div className="flex flex-row justify-center m-1">
      <button className="btn">{temperature?.celsius}</button>
    </div>
  );
}
