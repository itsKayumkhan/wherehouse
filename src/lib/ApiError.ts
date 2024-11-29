const ApiError = (error) => {
    console.log(error)
    return error.response?.data?.message || "Something went wrong";
};

export default ApiError;
