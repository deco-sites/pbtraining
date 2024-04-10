export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import { ProductListingPage } from "apps/commerce/types.ts";

/**
 * @title Props Variants
 */
export default function ProductDetailsPageFlag(
  props: MultivariateProps<ProductListingPage | null>,
): MultivariateFlag<ProductListingPage | null> {
  return multivariate(props);
}
