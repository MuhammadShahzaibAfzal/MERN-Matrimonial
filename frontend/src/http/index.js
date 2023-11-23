import axios from "axios";

// create instance of axios
export const BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* LIST OF ENDPOINTS */
export const postPersonalDetails = (data) => {
  return api.post("/personal-details", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
    },
  });
};

export const postEducationalDetails = (data) => {
  return api.post("/educational-details", data);
};

export const postOccupationalDetails = (data) => {
  return api.post("/occupational-details", data);
};

export const postFamilyDetails = (data) => {
  return api.post("/family-details", data);
};

export const postAddtionalPersonalDetails = (data) => {
  return api.post("/additonal-personal-details", data);
};

export const postDesiredProfileDetails = (data) => {
  return api.post("/desired-profile-details", data);
};

export const login = (data) => {
  return api.post("/login", data);
};

export const refreshTokens = () => {
  return api.get("/refresh-tokens");
};

export const logout = () => {
  return api.get("/logout");
};

export const forgetPassword = (data) => {
  return api.post("/forget-password", data);
};
export const resetPassword = (data) => {
  return api.post("/reset-password", data);
};

export const changePassword = (data) => {
  return api.post("/change-password", data);
};

export const exploreProfiles = (filters) => {
  return api.get(
    `/get-profiles?religion=${filters.religion}&minAge=${filters.minAge}&maxAge=${filters.maxAge}&maritialStatus=${filters.maritialStatus}&height=${filters.height}&weight=${filters.weight}&smooking=${filters.smooking}&drinking=${filters.drinking}&food=${filters.food}`
  );
};

export const desiredProfiles = (filters) => {
  return api.get(
    `/get-profiles?religion=${filters.religion}&minAge=${filters.minAge}&maxAge=${filters.maxAge}&maritialStatus=${filters.maritialStatus}&height=${filters.height}&weight=${filters.weight}&smooking=${filters.smooking}&drinking=${filters.drinking}&food=${filters.food}`
  );
};

export const getProfile = (_id) => {
  return api.get(`/get-profiles/${_id}`);
};

export const likeProfile = (profileId) => {
  return api.post(`/like-profile`, { profileId });
};

export const updateProfile = (profileId, data) => {
  return api.put(`/update-profile/${profileId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
    },
  });
};

export const unLikeProfile = (profileId) => {
  return api.post(`/unLike-profile`, { profileId });
};

export const getLikedProfile = () => {
  return api.get(`/liked-profiles`);
};

export const createSubsription = (data) => {
  return api.post("/create-subscription", data);
};

export const createConversation = (data) => {
  return api.post("/create-conversation", data);
};

export const getConversations = () => {
  return api.get(`/conversations`);
};

export const getUser = (_id) => {
  return api.get(`/users/${_id}`);
};

export const getMessages = (_id) => {
  return api.get(`/messages/${_id}`);
};

export const sendMessage = (data) => {
  return api.post("/create-message", data);
};

export const getDashboardHomeData = () => {
  return api.get("/admin-home");
};

export const getRegisterdUsers = () => {
  return api.get("/registerd-users");
};

export const getPaidUsers = () => {
  return api.get("/paid-users");
};

// interceptor
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;
      // refresh token request
      try {
        await axios.get(`${BASE_URL}/api/refresh-tokens`, {
          withCredentials: true,
        });

        //  original Request again
        return api.request(originalRequest);
      } catch (error) {
        // console.log('Error comes in interceptor');
        // console.log(error);
      }
    } else {
      throw error;
    }
  }
);

// status of request
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});
