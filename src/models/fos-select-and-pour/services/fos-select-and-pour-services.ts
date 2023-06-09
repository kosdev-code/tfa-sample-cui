import { ServiceFactory, resolveServiceUrl } from "@coca-cola/kos-ui-core";
const { URL } = resolveServiceUrl("FOS_SELECT_AND_POUR_SERVICE");
const { modifyModel, deleteModel } = ServiceFactory.build({
  basePath: `${URL}/api/pour`,
});

interface FosSelectAndPourResponse {
  id: string;
}

export interface PourMessage {
  type: string;
}

export interface SelectBeverage {
  beverageId: string;
}

export const clearSelectedBeverage = async () => {
  const response = await deleteModel<FosSelectAndPourResponse>({
    fos: true,
    id: "delete",
    urlOverride: `${URL}/api/pour/beverages/select`,
    ordered: true,
  });
  return response;
};
export const selectBeverage = async (beverageId: string) => {
  const response = await modifyModel<FosSelectAndPourResponse>({
    fos: true,
    id: "select",
    urlOverride: `${URL}/api/pour/beverages/${beverageId}/select`,
  });
  return response;
};
/**
 * @category Service
 * Retrieves the initial Fos Select And Pour data.
 */
export const startPour = async () => {
  const response = await modifyModel<FosSelectAndPourResponse>({
    fos: true,
    id: "start",
    ordered: true,
  });
  return response;
};

export const stopPour = async () => {
  const response = await modifyModel<FosSelectAndPourResponse>({
    fos: true,
    id: "stop",
    ordered: true,
  });
  return response;
};
