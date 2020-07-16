import produce from 'immer';

const INTIAL_STATE = {
  data: [],
  loading: false,
};

export default function orders(state = INTIAL_STATE, action) {
  switch (action.type) {
    case '@order/ORDER_REQUEST':
      return produce(state, (draft) => {
        console.log('Chamou');
        draft.loading = true;
      });
    case '@order/ORDER_SUCCESS':
      return produce(state, (draft) => {
        // draft.splice(0);
        console.log('OrdRed: ', action.payload);
        draft.data = action.payload;
        draft.loading = false;
        // draft.order.push(action.payload);
      });
    case '@order/ORDER_FILTER_SUCCESS':
      return produce(state, (draft) => {
        // console.log('OrdRed: ', action.payload);
        draft.splice(0);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@order/ORDER_INSERT_SUCCESS':
      return produce(state, (draft) => {
        draft.push(...action.payload);
      });
    case '@order/ORDER_UPDATE_SUCCESS':
      return produce(state, (draft) => {
        const orderIndex = draft.findIndex((o) => o.id === action.payload.id);
        // console.log('orderIndex: ', orderIndex);
        // console.log('AcPay: ', action.payload);

        draft[orderIndex] = action.payload;
      });
    case '@order/ORDER_REMOVE_SUCCESS':
      return produce(state, (draft) => {
        const orderIndex = draft.findIndex((o) => o.id === action.payload.id);

        if (orderIndex >= 0) {
          draft.splice(orderIndex, 1);
        }
      });
    default:
      return state;
  }
}
