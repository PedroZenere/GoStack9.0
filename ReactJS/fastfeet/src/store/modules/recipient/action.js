export function RecipientRequest() {
  return {
    type: '@recipient/RECIPIENT_REQUEST',
  };
}

export function RecipientRequestFilter(q) {
  return {
    type: '@recipient/RECIPIENT_FILTER_REQUEST',
    payload: { q },
  };
}

export function RecipientSuccess(recipient) {
  return {
    type: '@recipient/RECIPIENT_SUCCESS',
    payload: recipient,
  };
}

export function RecipientFilterSuccess(recipient) {
  return {
    type: '@recipient/RECIPIENT_FILTER_SUCCESS',
    payload: recipient,
  };
}

export function RecipientInsertRequest(data) {
  return {
    type: '@recipient/RECIPIENT_INSERT_REQUEST',
    payload: data,
  };
}

export function RecipientInsertSuccess(recipient) {
  return {
    type: '@recipient/RECIPIENT_INSERT_SUCCESS',
    payload: recipient,
  };
}

export function RecipientUpdateRequest(id, recipient) {
  return {
    type: '@recipient/RECIPIENT_UPDATE_REQUEST',
    payload: { id, recipient },
  };
}

export function RecipientUpdateSuccess(order) {
  return {
    type: '@recipient/RECIPIENT_UPDATE_SUCCESS',
    payload: order,
  };
}

export function removeRecipientRequest(id) {
  return {
    type: '@recipient/RECIPIENT_REMOVE_REQUEST',
    payload: { id },
  };
}

export function removeRecipientSuccess(id) {
  return {
    type: '@recipient/RECIPIENT_REMOVE_SUCCESS',
    payload: { id },
  };
}
