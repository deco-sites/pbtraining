import { signal } from "@preact/signals";
import { totalVotes } from "../sdk/useVotes.ts";

const votes = {
  voted: signal(false),
  quantity: signal(0),
};

export default function Island() {
  const vote = () => {
    totalVotes.value++;
    votes.voted.value = true;
    votes.quantity.value++;
  };

  return (
    <div className="flex mb-2">
      <button onClick={vote}>
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
          style={{ display: !votes.voted.value ? "block" : "none" }}
          className="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 10l.01 0" />
          <path d="M15 10l.01 0" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
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
          style={{ display: votes.voted.value ? "block" : "none" }}
          className="icon icon-tabler icons-tabler-outline icon-tabler-mood-check"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18" />
          <path d="M9 10h.01" />
          <path d="M15 10h.01" />
          <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1" />
          <path d="M15 19l2 2l4 -4" />
        </svg>
      </button>
      <p className="from-neutral-700 ml-1">{votes.quantity.value}</p>
    </div>
  );
}
