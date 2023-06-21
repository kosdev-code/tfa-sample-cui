import { ServiceFactory, resolveServiceUrl } from "@kosdev-code/kos-ui-sdk";
const { URL } = resolveServiceUrl("FOS_AVAILABILITY_SERVICE");
const { getAll } = ServiceFactory.build({
  basePath: `${URL}/api/beverages/availabilities`,
});

//   {
//     "beverage": {
//         "id": 1475655,
//         "name": "Fanta Zero Cherry"
//     },
//     "available": false,
//     "visible": false
// },
export interface FosAvailabilityResponse {
  beverage: {
    id: number;
    name: string;
  };
  available: boolean;
  visible: boolean;
}

export interface FosAvailabilityChangeResponse {
  changes: Record<number, FosAvailabilityResponse>;
}
/**
 * @category Service
 * Retrieves the initial Fos Availability data.
 */
export const getFosAvailability = async () => {
  const response = await getAll<FosAvailabilityResponse>({ fos: true });
  return response;
};
