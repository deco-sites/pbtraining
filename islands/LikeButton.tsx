import { useSignal, useSignalEffect } from "@preact/signals";
import { totalVotes } from "../sdk/useVotes.ts";
import { invoke } from "deco-sites/pbtraining/runtime.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Bounce, toast } from "react-toastify";
import { sendEvent } from "../sdk/analytics.tsx";

export default function Island(props: { productId: string }) {
  const votesProduct = {
    voted: useSignal(false),
    quantity: useSignal(0),
  };

  const getTotalVotesProduct = async (productId: string) => {
    const votes = await invoke[
      "deco-sites/pbtraining"
    ].loaders.recoverVoteProducts({ productId });
    votesProduct.quantity.value = votes;
  };

  useSignalEffect(() => {
    const asyncFunction = async () => {
      await getTotalVotesProduct(props.productId);
      setInterval(async () => {
        await getTotalVotesProduct(props.productId);
      }, 30000);
    };
    if (IS_BROWSER) {
      asyncFunction();
    }
  });

  let votes = {
    total: 0,
    product: 0,
  };

  const vote = async () => {
    if (IS_BROWSER) {
      votes = await invoke["deco-sites/pbtraining"].actions.createVote({
        productId: props.productId,
      });
    }

    sendEvent({
      name: "post_score",
      params: {
        score: votes.product,
        level: 1,
        character: props.productId,
      },
    });

    totalVotes.value = votes.total;
    votesProduct.voted.value = true;
    votesProduct.quantity.value = votes.product;
    toast.success("Obrigado pelo voto!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <div className="flex mb-2">
        <button
          onClick={vote}
          disabled={votesProduct.voted.value ? true : false}
        >
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
            style={{ display: !votesProduct.voted.value ? "block" : "none" }}
            className="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"
          >
            <use href="/sprites.svg#Vote" />
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
            style={{ display: votesProduct.voted.value ? "block" : "none" }}
            className="icon icon-tabler icons-tabler-outline icon-tabler-mood-check"
          >
            <use href="/sprites.svg#Voted" />
          </svg>
        </button>
        <p className="from-neutral-700 ml-1">{votesProduct.quantity.value}</p>
      </div>
    </>
  );
}
