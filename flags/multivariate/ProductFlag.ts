export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import type { Product } from "apps/commerce/types.ts";

/**
 * @title Props Variants
 */
export default function ProductFlag(
  props: MultivariateProps<Product[] | null>,
): MultivariateFlag<Product[] | null> {
  return multivariate(props);
}
