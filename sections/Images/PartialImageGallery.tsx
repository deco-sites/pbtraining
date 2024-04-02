import { Picture, Source } from "apps/website/components/Picture.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Image {
  desktop: ImageWidget;
  mobile?: ImageWidget;
}

export interface Props {
  images: Image[];
  length?: number;
}

export default function Section({ images, length = 3 }: Props) {
  return (
    <div className="flex flex-col justify-center items-center m-3 w-auto h-auto">
      {images
        .map((image) => (
          <div className="w-fit max-h-[600px] m-4 justify-center overflow-hidden rounded-md">
            <Picture>
              <Source
                media="(max-width: 768px)"
                src={image.mobile ?? image.desktop}
                width={800}
                height={1200}
              />
              <Source
                media="(min-width: 768px)"
                src={image.desktop}
                width={1200}
                height={800}
              />
              <img
                src={image.desktop}
                class="h-auto object-cover hover:scale-105 transition-all duration-500 cursor-pointer"
              />
            </Picture>
          </div>
        ))
        .splice(0, length)}
      <button
        className={images.length <= length ? "hidden" : "btn btn-outline"}
        {...usePartialSection({
          mode: "replace",
          props: { length: length + 1 },
        })}
      >
        +
      </button>
    </div>
  );
}
