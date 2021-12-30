import {colors} from '../utils/Theme';

const GeneralConst = {
  optionType: {
    Delivery: 2,
    Pickup: 1,
  },
  orderStatus: {
    0: {
      id: 0,
      color: colors.pending,
      title: {
        en: 'New Order',
        ar: 'New Order',
      },
    },
    1: {
      id: 1,
      color: colors.pending,
      title: {
        en: 'Pending',
        ar: 'Pending',
      },
    },
    2: {
      id: 2,
      color: colors.pending,
      title: {
        en: 'In Progress',
        ar: 'In Progress',
      },
    },
    3: {
      id: 3,
      color: colors.onRoute,
      title: {
        en: 'En Route',
        ar: 'En Route',
      },
    },
    4: {
      id: 4,
      color: colors.delivered,
      title: {
        en: 'Delivered',
        ar: 'Delivered',
      },
    },
    5: {
      id: 5,
      color: colors.cancelled,
      title: {
        en: 'Cancelled',
        ar: 'Cancelled',
      },
    },
  },

  orderStatusPickup: {
    0: {
      id: 0,
      color: colors.pending,
      title: {
        en: 'New Order',
        ar: 'New Order',
      },
    },
    1: {
      id: 1,
      color: colors.pending,
      title: {
        en: 'Pending',
        ar: 'Pending',
      },
    },
    2: {
      id: 2,
      color: colors.pending,
      title: {
        en: 'In Progress',
        ar: 'In Progress',
      },
    },
    3: {
      id: 3,
      color: colors.onRoute,
      title: {
        en: 'Ready for Pickup',
        ar: 'Ready for Pickup',
      },
    },
    4: {
      id: 4,
      color: colors.delivered,
      title: {
        en: 'Completed',
        ar: 'Completed',
      },
    },
    5: {
      id: 5,
      color: colors.cancelled,
      title: {
        en: 'Cancelled',
        ar: 'Cancelled',
      },
    },
  },
};
export default GeneralConst;
