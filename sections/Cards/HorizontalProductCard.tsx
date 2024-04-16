import Image from "apps/website/components/Image.tsx";
import LikeButton from "../../islands/LikeButton.tsx";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/pbtraining/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/pbtraining/sdk/format.ts";

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
    return <div></div>;
  }

  const product = products[0];

  const { productID, image, description, name, offers, url } = product;
  const { price } = useOffer(offers);
  const productImage = image?.[0]?.url;

  return (
    <div class="w-full flex flex-col justify-center items-center">
      <div
        class={`sm:w-[80%] flex flex-col sm:flex-row ${maxScreenSize} sm:gap-5 gap-2 p-4 rounded-sm sm:max-h-[600px] m-8 overflow-hidden bg-gray-200`}
      >
        <div class=" sm:w-[20%] lg:w-[30%]">
          <Image
            src={productImage as string}
            class="md:hover:scale-105 ease-in duration-500 rounded-sm w-auto sm:w-full object-cover"
            width={180}
            height={120}
          />
        </div>
        <div class="flex flex-col gap-3 sm:gap-0 items-start sm:flex-row w-full sm:h-[100px] lg:h-[150px] xl:h-[200px]">
          <div class="flex flex-col gap-2 sm:gap-3 sm:w-[60%] w-full h-full">
            <div class="flex flex-col lg:gap-2">
              <h1 class="text-xl font-bold lg:text-[30px]">{name}</h1>
              <LikeButton productId={productID} />
            </div>
            <div
              id="1"
              class="line-clamp-3 sm:text-[16px] lg:text-[20px] font-medium"
              dangerouslySetInnerHTML={{ __html: description as string }}
            />
          </div>
          <div class="border-l-lime-800 sm:border-l flex flex-col sm:justify-between sm:items-start sm:w-[40%] sm:pl-4 w-full h-full">
            <p class="font-bold text-[18px] sm:text-[22px] lg:text-[30px]">
              {formatPrice(price, offers?.priceCurrency)}
            </p>
            <div class="cursor-pointer w-full">
              <a
                href={url}
                class="btn mt-2 bg-primary rounded-sm cursor-pointer w-full sm:w-[85%] font-medium"
              >
                Visitar Produto
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ margin: "auto", width: "80%" }}
      class="w-full flex justify-center items-center"
    >
      <div class="skeleton sm:h-[120px] lg:h-[170px] xl:h-[220px] w-full"></div>
    </div>
  );
}
