import produce from 'immer';

export default function deliveryman(state = [], action) {
  switch (action.type) {
    case '@deliveryman/DELIVERYMAN_SUCCESS':
      return produce(state, (draft) => {
        draft.splice(0);
        // console.log('OrdRed: ', action.payload);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@deliveryman/DELIVERYMAN_FILTER_SUCCESS':
      return produce(state, (draft) => {
        // console.log('OrdRed: ', action.payload);
        draft.splice(0);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@deliveryman/DELIVERYMAN_INSERT_SUCCESS':
      return produce(state, (draft) => {
        draft.push(...action.payload);
      });
    case '@deliveryman/DELIVERYMAN_UPDATE_SUCCESS':
      return produce(state, (draft) => {
        const deliveryIndex = draft.findIndex(
          (d) => d.id === action.payload.id
        );
        // console.log('orderIndex: ', orderIndex);
        // console.log('AcPay: ', action.payload);

        draft[deliveryIndex] = action.payload;
      });
    case '@deliveryman/DELIVERYMAN_REMOVE_SUCCESS':
      return produce(state, (draft) => {
        const deliveryIndex = draft.findIndex(
          (d) => d.id === action.payload.id
        );

        if (deliveryIndex >= 0) {
          draft.splice(deliveryIndex, 1);
        }
      });
    default:
      return state;
  }
}
