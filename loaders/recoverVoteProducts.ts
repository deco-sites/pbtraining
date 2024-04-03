import { FnContext } from "deco/types.ts";

interface ProductVotes {
  product: number;
}

export default async function loader(
  props: { productId: number },
  _req: Request,
  _ctx: FnContext,
): Promise<ProductVotes> {
  const votesResponse = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    {
      headers: {
        "x-api-key": "pbtraining",
      },
    },
  );

  const totalVotes = (await votesResponse.json()) as ProductVotes;

  return totalVotes;
}
