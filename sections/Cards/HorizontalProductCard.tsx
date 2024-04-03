import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import LikeButton from "../../islands/LikeButton.tsx";
interface ProductVotes {
  product: number;
}
interface Image {
  desktop: ImageWidget;
  mobile?: ImageWidget;
}

export interface Props {
  productId: number;
  image: Image;
  title: string;
  description: HTML;
  price: number;
  maxScreenSize:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
}

interface SectionProps {
  productId: number;
  image: Image;
  title: string;
  description: HTML;
  price: number;
  maxScreenSize:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  initialVotes: number;
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

export async function loader(
  props: Props,
  _req: Request,
  _ctx: unknown
): Promise<SectionProps> {
  const votesResponse = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    {
      headers: {
        "x-api-key": "pbtraining",
      },
    }
  );
  console.log(votesResponse);
  const totalVotes = (await votesResponse.json()) as ProductVotes;

  console.log({
    ...props,
    initialVotes: totalVotes.product,
  });

  return {
    ...props,
    initialVotes: totalVotes.product,
  };
}

export default function Section({
  image,
  title,
  description,
  price,
  maxScreenSize,
  productId,
  initialVotes,
}: SectionProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`flex flex-col md:flex-row justify-evenly ${maxScreenSize} pt-4 pb-4 max-w-4xl rounded-md md:max-h-[600px] m-8 overflow-hidden bg-gray-200`}
      >
        <div className="w-auto md:w-2/6 ml-3 mr-2 flex justify-center h-min overflow-hidden rounded-md">
          <Picture>
            <Source
              media="(max-width: 768px)"
              src={image?.mobile ?? image.desktop}
              width={300}
              height={300}
            />
            <Source
              media="(min-width: 768px)"
              src={image.desktop}
              width={600}
              height={600}
            />
            <img
              src={image.desktop}
              class="hover:scale-105 ease-in duration-500 w-auto h-auto object-cover"
            />
          </Picture>
        </div>
        <div className="flex flex-col mt-3 md:mt-0 md:flex-row md:w-4/6">
          <div className="max-w-max mb-2 pl-2 md:w-2/3">
            <h1 className="text-xl font-bold mb-5">{title}</h1>
            <LikeButton productId={productId} initialVotes={initialVotes} />
            <div
              id="1"
              className="line-clamp-3"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className="border-l-lime-800 md:border-l ml-3 mr-3 justify-center flex flex-col md:items-center items-stretch md:w-2/6">
            <p className="font-bold m-2 text-center">{price} €</p>
            <button className="btn mt-2 border-neutral-500 shadow-slate-300 btn-success">
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
