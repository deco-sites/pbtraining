import { IS_BROWSER } from "$fresh/runtime.ts";
import { totalVotes } from "../sdk/useVotes.ts";
import { invoke } from "deco-sites/pbtraining/runtime.ts";
import { useSignal, useSignalEffect } from "@preact/signals";

export default function Island() {
  const votesSignal = useSignal(totalVotes.value);

  const getTotalVotes = async () => {
    const votes = await invoke["deco-sites/pbtraining"].loaders.recoverVotes();
    votesSignal.value = votes.total;
  };

  if (IS_BROWSER) {
    useSignalEffect(() => {
      const asyncFunction = async () => {
        await getTotalVotes();
        setInterval(async () => {
          await getTotalVotes();
        }, 30000);
      };
      asyncFunction();
      totalVotes.value = votesSignal.peek();
    });
  }

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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
        <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
      </svg>
      <p className="ml-1">{votesSignal.value}</p>
    </div>
  );
}
