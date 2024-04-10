import { useSignal, useSignalEffect } from "@preact/signals";
import { forwardRef } from "preact/compat";
import { totalVotes } from "../sdk/useVotes.ts";
import { invoke } from "deco-sites/pbtraining/runtime.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
// import {
//   Bounce,
//   toast,
//   ToastContainer,
// } from "https://esm.sh/react-toastify@9.1.1?&external=react,react-dom&alias=react/jsx-runtime:preact/jsx-runtime&deps=preact@10.19.2&target=es2022";

export default function Island(props: { productId: string }) {
  const votesProduct = {
    voted: useSignal(false),
    quantity: useSignal(0),
  };

  //const Toaster = forwardRef(ToastContainer);

  const getTotalVotesProduct = async (productId: string) => {
    const votes = await invoke[
      "deco-sites/pbtraining"
    ].loaders.recoverVoteProducts({ productId });
    votesProduct.quantity.value = votes.product;
  };

  useSignalEffect(() => {
    const asyncFunction = () => {
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
      votes = await invoke["deco-sites/pbtraining"].actions.createVote(
        props.productId,
      );
    }
    totalVotes.value = votes.total;
    votesProduct.voted.value = true;
    votesProduct.quantity.value = votes.product;
    // toast("Thank you for the vote", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Bounce,
    // });
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
            style={{ display: votesProduct.voted.value ? "block" : "none" }}
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
        <p className="from-neutral-700 ml-1">{votesProduct.quantity.value}</p>
      </div>
      {/* <Toaster ref={toastId.value} /> */}
    </>
  );
}
