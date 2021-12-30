//  Branches Module
import { BranchesAPI } from '../../src/utils/Axios';

export const getAllBranches = (params) => {
  return BranchesAPI.post('/api/v1/customer/branches/view', params);
};

export const getBranchForDelivery = (params) => {
  return BranchesAPI.post(
    '/api/v1/customer/branches/view_for_delivery',
    params,
  );
};

//ordertype can be pickup or delivery
export const getBranchSlots = (params) => {
  console.log('params',params);
  return BranchesAPI.post(
    `/api/v1/customer/branches/branches_slots_with_time`,
    params
  );
};
