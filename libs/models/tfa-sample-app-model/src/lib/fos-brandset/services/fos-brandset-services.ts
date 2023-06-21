import { ServiceFactory, resolveServiceUrl } from "@kosdev-code/kos-ui-sdk";
const { URL } = resolveServiceUrl("FOS_BRANDSET_SERVICE");
const { getOne } = ServiceFactory.build({
  basePath: `${URL}/core/bundle/core.json`,
});

interface FosBrandsetResponse {
  id: string;
}
/**
 * @category Service
 * Retrieves the initial Fos Brandset data.
 */
export const getFosBrandsets = async () => {
  const response = await getOne<FosBrandsetResponse>({ fos: true });
  return response;
};
