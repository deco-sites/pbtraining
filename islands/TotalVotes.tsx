import { totalVotes } from "../sdk/useVotes.ts";
import { invoke } from "deco-sites/pbtraining/runtime.ts";
import { effect } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const getTotalVotes = async () => {
  const votes = await invoke["deco-sites/pbtraining"].loaders.recoverVotes();
  totalVotes.value = votes.total;
};

effect(() => {
  const asyncFunction = async () => {
    await getTotalVotes();
    setInterval(async () => {
      await getTotalVotes();
    }, 30000);
  };
  if (IS_BROWSER) {
    asyncFunction();
    totalVotes.value = totalVotes.peek();
  }
});

export default function Island() {
  return (
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-friends"
      >
        <use href="/sprites.svg#TotalVotes" />
      </svg>
      <p className="ml-1">{totalVotes.value}</p>
    </div>
  );
}
