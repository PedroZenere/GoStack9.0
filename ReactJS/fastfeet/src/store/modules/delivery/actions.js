export function DeliverymanRequest() {
  return {
    type: '@deliveryman/DELIVERYMAN_REQUEST',
  };
}

export function DeliverymanRequestFilter(q) {
  return {
    type: '@deliveryman/DELIVERYMAN_FILTER_REQUEST',
    payload: { q },
  };
}

export function DeliverymanSuccess(orders) {
  return {
    type: '@deliveryman/DELIVERYMAN_SUCCESS',
    payload: orders,
  };
}

export function DeliverymanFilterSuccess(deliverymans) {
  return {
    type: '@deliveryman/DELIVERYMAN_FILTER_SUCCESS',
    payload: deliverymans,
  };
}

export function DeliverymanInsertRequest(name, email) {
  return {
    type: '@deliveryman/DELIVERYMAN_INSERT_REQUEST',
    payload: { name, email },
  };
}

export function DeliverymanInsertSuccess(deliveryman) {
  return {
    type: '@deliveryman/DELIVERYMAN_INSERT_SUCCESS',
    payload: deliveryman,
  };
}

export function DeliverymanUpdateRequest(id, name, email) {
  return {
    type: '@deliveryman/DELIVERYMAN_UPDATE_REQUEST',
    payload: { id, name, email },
  };
}

export function DeliverymanUpdateSuccess(deliveryman) {
  return {
    type: '@deliveryman/DELIVERYMAN_UPDATE_SUCCESS',
    payload: deliveryman,
  };
}

export function removeDeliverymanRequest(id) {
  return {
    type: '@deliveryman/DELIVERYMAN_REMOVE_REQUEST',
    payload: { id },
  };
}

export function removeDeliverymanSuccess(id) {
  return {
    type: '@deliveryman/DELIVERYMAN_REMOVE_SUCCESS',
    payload: { id },
  };
}
