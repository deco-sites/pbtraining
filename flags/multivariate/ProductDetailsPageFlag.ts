export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

/**
 * @title Props Variants
 */
export default function ProductDetailsPageFlag(
  props: MultivariateProps<ProductDetailsPage | null>
): MultivariateFlag<ProductDetailsPage | null> {
  return multivariate(props);
}
