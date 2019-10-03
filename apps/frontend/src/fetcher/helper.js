const sendFetch = (request, pendingFunc, successFunc, errorFunc) => {
  let status = null;
  pendingFunc();
  return fetch(request)
  .then(result => {
    status = result.ok;
    return result
  })
  .then(result => {
    if (request.method !== "DELETE"){
      return result.json();
    }
    return result
  })
  .then(result => {
    if (status) {
      successFunc(result);
    } else {
      errorFunc(result);
    }
    return result;
  })
  .catch(error => {
    errorFunc(error);
  });
};

export default sendFetch