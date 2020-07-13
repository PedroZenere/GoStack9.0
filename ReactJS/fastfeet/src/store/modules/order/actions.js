export function OrderRequest() {
  return {
    type: '@order/ORDER_REQUEST',
  };
}

export function OrderRequestFilter(q) {
  return {
    type: '@order/ORDER_FILTER_REQUEST',
    payload: { q },
  };
}

export function OrderSuccess(orders) {
  return {
    type: '@order/ORDER_SUCCESS',
    payload: orders,
  };
}

export function OrderFilterSuccess(orders) {
  return {
    type: '@order/ORDER_FILTER_SUCCESS',
    payload: orders,
  };
}

export function OrderInsertRequest(destinatario, entregador, product) {
  return {
    type: '@order/ORDER_INSERT_REQUEST',
    payload: { destinatario, entregador, product },
  };
}

export function OrderInsertSuccess(orders) {
  return {
    type: '@order/ORDER_INSERT_SUCCESS',
    payload: orders,
  };
}

export function OrderUpdateRequest(id, destinatario, entregador, product) {
  return {
    type: '@order/ORDER_UPDATE_REQUEST',
    payload: { id, destinatario, entregador, product },
  };
}

export function OrderUpdateSuccess(order) {
  return {
    type: '@order/ORDER_UPDATE_SUCCESS',
    payload: order,
  };
}

export function removeOrderRequest(id) {
  return {
    type: '@order/ORDER_REMOVE_REQUEST',
    payload: { id },
  };
}

export function removeOrderSuccess(id) {
  return {
    type: '@order/ORDER_REMOVE_SUCCESS',
    payload: { id },
  };
}
