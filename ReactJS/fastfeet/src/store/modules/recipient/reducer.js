import produce from 'immer';

export default function orders(state = [], action) {
  switch (action.type) {
    case '@recipient/RECIPIENT_SUCCESS':
      return produce(state, (draft) => {
        draft.splice(0);
        // console.log('OrdRed: ', action.payload);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@recipient/RECIPIENT_FILTER_SUCCESS':
      return produce(state, (draft) => {
        // console.log('OrdRed: ', action.payload);
        draft.splice(0);
        draft.push(...action.payload);
        // draft.order.push(action.payload);
      });
    case '@recipient/RECIPIENT_INSERT_SUCCESS':
      return produce(state, (draft) => {
        draft.push(...action.payload);
      });
    case '@recipient/RECIPIENT_UPDATE_SUCCESS':
      return produce(state, (draft) => {
        const deliverymanIndex = draft.findIndex(
          (d) => d.id === action.payload.id
        );
        // console.logT deliverymanIndex: ', deliverymanIndex);
        // console.log('AcPay: ', action.payload);

        draft[deliverymanIndex] = action.payload;
      });
    case '@recipient/RECIPIENT_REMOVE_SUCCESS':
      return produce(state, (draft) => {
        const deliverymanIndex = draft.findIndex(
          (d) => d.id === action.payload.id
        );

        if (deliverymanIndex >= 0) {
          draft.splice(deliverymanIndex, 1);
        }
      });
    default:
      return state;
  }
}
