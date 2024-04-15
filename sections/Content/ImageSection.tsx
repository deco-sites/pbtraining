import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title?: string;
  /**
   * @format textarea
   */
  containerWidth?: number;
  description?: string;
  information?: {
    location: "top" | "bottom";
    description: string;
    href?: string;
    fontSize?: number;
  };
  image: ImageWidget;
  placement: "left" | "right" | "center";
  cta?: {
    href?: string;
    text?: string;
  };
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const PLACEMENT = {
  left: "flex-col lg:flex-row-reverse",
  right: "flex-col lg:flex-row",
  center: "flex-col items-center",
};

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97";

export default function ImageSection({
  title,
  description,
  information,
  containerWidth,
  image = DEFAULT_IMAGE,
  placement,
  disableSpacing,
  cta,
}: Props) {
  return (
    <div class={containerWidth ? `max-w-[${containerWidth}]` : "w-full"}>
      <div
        class={`flex lg:container lg:max-w-6xl lg:mx-auto mx-5 md:mx-10 ${
          PLACEMENT[placement]
        } gap-12 md:gap-20 text-left items-center z-10 ${
          disableSpacing?.top ? "" : "pt-12 lg:pt-28"
        } ${disableSpacing?.bottom ? "" : "pb-12 lg:pb-28"}`}
      >
        <div class="w-full lg:w-1/2">
          {information && information.location === "top" && (
            <a
              href={information?.href ? information.href : ""}
              class="flex gap-2"
            >
              <span
                class={`text-zinc-400 text-[${
                  information.fontSize ? information.fontSize : 8
                }px] md:text-[${
                  information.fontSize ? information.fontSize : 8
                }px] leading-[150%]`}
              >
                {information?.description}
              </span>
            </a>
          )}
          <Image
            width={640}
            class="w-full object-fit z-10"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image}
            alt={image}
            decoding="async"
            loading="lazy"
          />
          {information && information.location === "bottom" && (
            <a
              href={information?.href ? information.href : ""}
              class="flex gap-2"
            >
              <span
                class={`text-zinc-400 text-[${
                  information.fontSize ? information.fontSize : 8
                }px] md:text-[${
                  information.fontSize ? information.fontSize : 8
                }px] leading-[150%]`}
              >
                {information?.description}
              </span>
            </a>
          )}
        </div>
        {title && description && (
          <div class="w-full lg:w-1/2 space-y-2 lg:space-y-4 lg:max-w-xl gap-4 z-10">
            <p class="text-[40px] leading-[110%] font-semibold">
              {title}
            </p>
            <p class="text-zinc-400 text-[16px] md:text-[18px] leading-[150%]">
              {description}
            </p>
            {cta?.href && cta?.text && (
              <a
                class="pt-4 flex gap-2 border-none text-secondary transition-colors duration-200 cursor-pointer"
                href={cta.href}
              >
                <span>{cta.text}</span>
                <Icon
                  id="ChevronRight"
                  width={24}
                  height={24}
                  strokeWidth={"2"}
                  class="text-secondary"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
