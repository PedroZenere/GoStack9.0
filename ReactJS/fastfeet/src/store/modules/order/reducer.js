import produce from 'immer';

export default function orders(state = [], action) {
  switch (action.type) {
    case '@order/ORDER_SUCCESS':
      return produce(state, (draft) => {
        console.log('OrdRed: ', action.payload);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@order/ORDER_FILTER_SUCCESS':
      return produce(state, (draft) => {
        // console.log('OrdRed: ', action.payload);
        draft.splice(0);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@order/ORDER_REMOVE_SUCCESS':
      return produce(state, (draft) => {
        const orderIndex = draft.findIndex((o) => o.id === action.payload.id);
        // console.log('OrdRed: ', action.payload);

        if (orderIndex >= 0) {
          draft.splice(orderIndex, 1);
        }
      });
    default:
      return state;
  }
}
