import type { AnalyticsEvent, IEvent } from "apps/commerce/types.ts";

interface PostScoreInfoParams {
  score?: number;
  level?: number;
  character?: string;
}

/** @docs https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#add_shipping_info */
interface PostScoreEvent extends IEvent<PostScoreInfoParams> {
  name: "post_score";
}

export const sendEvent = <E extends AnalyticsEvent | PostScoreEvent>(
  event: E,
) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};
