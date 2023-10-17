export const parseErrors = (err) => {
  //check if the error is a validation error

  if (err?.response?.data?.error?.name === "ValidationError") {
    return {
      message: err.response.data.error.message,
      details: err.response.data.error.details,
    };
  }
  //check if it is a network error
  if (err?.message === "Network Error") {
    return {
      message: "unable to connect to the server endpoint provided",
      details: [],
    };
  }

  //check for forbidden error
  if (err?.response?.status === 403) {
    return {
      message: "Your role does not have access to this resource",
      details: [],
    };
  }

  //check for generic error
  return {
    message: "An unexpected error has occured, contact support",
    details: [],
  };
};
