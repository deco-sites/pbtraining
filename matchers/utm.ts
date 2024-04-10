import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utmCampaingValue: string;
}

/**
 * @title UTM
 * @description Match with a specific UTM
 * @icon question-mark
 */
const MatchQueryString = (
  { utmCampaingValue }: Props,
  { request }: MatchContext,
) => {
  const url = new URL(request.url);
  const utmValue = url.searchParams.get("utmcampaign");

  if (utmValue === utmCampaingValue) {
    return true;
  }
  return false;
};

export default MatchQueryString;
