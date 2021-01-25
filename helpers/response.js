const success = (method, title, data) => {
  const createSuccess = `${method} ${title} successful`;
  return ({
    message: createSuccess,
    messageCode: createSuccess.split(' ').join('_').toUpperCase(),
    data,
    status: 200,
  });
};

const login = (token, refresh) => ({
  message: 'login success',
  messageCode: 'LOGIN_SUCCESS',
  data: {
    token,
    refreshToken: refresh,
  },
  status: 200,
});

const fail = (error, message, msgCode, status) => ({
  status,
  message,
  messageCode: msgCode,
  error,
});

export {
  login, success, fail,
};
