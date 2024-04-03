import { FnContext } from "deco/types.ts";

export interface TotalVotes {
  total: number;
}

export default async function loader(
  _props: unknown,
  _req: Request,
  _ctx: FnContext
): Promise<TotalVotes> {
  const votesResponse = await fetch("https://camp-api.deco.cx/events", {
    headers: {
      "x-api-key": "pbtraining",
    },
  });

  const totalVotes = (await votesResponse.json()) as TotalVotes;

  return totalVotes;
}
