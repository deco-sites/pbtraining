import Image from "apps/website/components/Image.tsx";
import LikeButton from "../../islands/LikeButton.tsx";
import type { Product } from "apps/commerce/types.ts";

export interface HorizontalProductCardProps {
  products: Product[] | null;
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

export default function Section({
  products,
  maxScreenSize,
}: HorizontalProductCardProps) {
  if (products?.length === 0 || products === null) {
    return <></>;
  } else {
    const productId = products[0].productID;
    const image = products[0].image && products[0].image[0].url;
    const description = products[0].description;
    const name = products[0].name;
    const price = products[0].offers?.offers[0].price;
    const url = products[0].url;

    return productId && image && description && name && price && url
      ? (
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-col md:flex-row justify-stretch ${maxScreenSize} pt-4 pb-4 rounded-md md:max-h-[600px] m-8 overflow-hidden bg-gray-200`}
          >
            <div className="w-auto md:w-1/3 ml-3 mr-2 flex justify-center h-min bg-green-700">
              <div className="w-fit flex justify-center h-fit overflow-hidden rounded-md">
                <Image
                  src={image}
                  class="hover:scale-105 ease-in duration-500 w-auto h-auto object-cover rounded-md"
                  width={192}
                  height={192}
                />
              </div>
            </div>
            <div className="flex flex-col justify-normal mt-3 md:mt-0 md:flex-row md:w-2/3 bg-green-200">
              <div className="max-w-max mb-2 pl-2 md:w-2/3 bg-slate-800">
                <h1 className="text-xl font-bold mb-5">{name}</h1>
                <LikeButton productId={productId} />
                <div
                  id="1"
                  className="line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
              <div className="border-l-lime-800 md:border-l ml-3 mr-3 justify-center items-stretch flex flex-col md:items-center md:w-1/3 bg-blue-700">
                <p className="font-bold m-2 text-center">{price} €</p>
                <a
                  href={url}
                  className="btn mt-2 border-neutral-500 shadow-slate-300 btn-success"
                >
                  Visitar Produto
                </a>
              </div>
            </div>
          </div>
        </div>
      )
      : <></>;
  }
}
