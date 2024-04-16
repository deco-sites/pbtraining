interface Response {
  total: number;
  product: number;
}

export default async function action(
  props: { productId: string },
  _req: Request,
  _ctx: unknown
): Promise<Response> {
  const votesResponse = await fetch("https://camp-api.deco.cx/event", {
    headers: {
      "x-api-key": "pbtraining",
    },
    body: JSON.stringify({
      productId: props.productId,
    }),
    method: "POST",
  });

  const totalVotes = (await votesResponse.json()) as Response;

  return totalVotes;
}
