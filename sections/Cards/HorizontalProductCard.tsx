import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Image {
  desktop: ImageWidget;
  mobile?: ImageWidget;
}

export interface Props {
  images: Image[];
  length?: number;
  title: string;
  description: HTML;
  price: number;
}

// export function ErrorFallback() {
//   return (
//     <div className="flex flex-row justify-center m-1">
//       <div className="m-3">
//         <Picture>
//           <Source
//             media="(max-width: 768px)"
//             src={imageimageMobile ?? imageDesktop}
//             width={270}
//             height={377}
//           />
//           <Source
//             media="(min-width: 768px)"
//             src={imageDesktop}
//             width={500}
//             height={500}
//           />
//           <img src={imageDesktop} class="w-2/5 h-auto object-cover" />
//         </Picture>
//       </div>
//       <div className="flex flex-col md:flex-row w-3/5">
//         <div className="m-3">
//           <h1>Somália</h1>
//           <<p>{description}</p>>
//         </div>
//         <div className="m-3">
//           <p className="font-bold">{price} €</p>
//           <button className="btn btn-success">Finalizar compra</button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Section({
  images,
  title,
  description,
  price,
  length = 3,
}: Props) {
  return (
    <div className="flex flex-row justify-center m-1">
      <div className="m-3 w-3/6">
        {images
          .map((image) => (
            <Picture>
              <Source
                media="(max-width: 768px)"
                src={image.mobile ?? image.desktop}
                width={270}
                height={377}
              />
              <Source
                media="(min-width: 768px)"
                src={image.desktop}
                width={1200}
                height={800}
              />
              <img src={image.desktop} class="m-2 w-auto h-auto object-cover" />
            </Picture>
          ))
          .splice(0, length)}
        <button
          className={images.length == length ? "hidden" : "btn btn-outline"}
          {...usePartialSection({
            mode: "replace",
            props: { length: length + 1 },
          })}
        >
          +
        </button>
      </div>
      <div className="flex flex-col md:flex-row w-3/6">
        <div className="m-1 w-1/2">
          <h1 className="text-xl font-bold mb-5">{title}</h1>
          <div id="1" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="m-1 w-1/2 flex flex-col items-center">
          <p className="font-bold m-2">{price} €</p>
          <button className="btn btn-success">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}
