import { Temperature } from "apps/weather/loaders/temperature.ts";
import Icon, {
  AvailableIcons,
} from "deco-sites/pbtraining/components/ui/Icon.tsx";

export interface WheatherButtonIcon {
  type: AvailableIcons;
  size?: number;
  /** @format color-input */
  color?: string;
}

export interface WeatherButtonText {
  size?: number;
  /** @format color-input */
  color?: string;
  weight?: "thin" | "normal" | "bold";
}

export interface Props {
  align?: "left" | "center" | "right";
  containerWidth?: number;
  /**  @title Icon */
  icon?: WheatherButtonIcon;
  text?: WeatherButtonText;
  /** @format color-input */
  backgroundColor?: string;
  temperature: Temperature | null;
}

const ALIGN = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export default function Section(
  { align, containerWidth, icon, temperature, backgroundColor, text }: Props,
) {
  return (
    <div
      className={`flex flex-row ${
        align ? ALIGN[align] : "justify-center"
      } m-1 rounded-lg`}
      style={{
        maxWidth: containerWidth ?? 800,
        margin: "0 auto",
      }}
    >
      <button
        className="btn"
        style={{
          backgroundColor: backgroundColor,
          color: icon?.color ?? text?.color,
          fontSize: text?.size,
        }}
      >
        {icon && (
          <div class="flex gap-1">
            <Icon
              id={icon.type}
              size={icon.size ?? 24}
              strokeWidth={2}
            />
          </div>
        )}
        <span
          class={text?.weight ? `font-${text.weight}` : `font-normal`}
          style={{ color: text?.color }}
        >
          {temperature?.celsius}°C
        </span>
      </button>
    </div>
  );
}
