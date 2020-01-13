export const UPDATE_PROFILE_REQUEST = "profile/update/REQUEST";
export const UPDATE_PROFILE_SUCCESS = "profile/update/SUCCESS";
export const UPDATE_PROFILE_FAIL = "profile/update/FAIL";

export const updateProfileRequest = () => ({
  type: UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = (data: any) => {
  const profile = {
    userName: data.user_name,
    displayName: data.display_name,
    email: data.email,
    profile_image_url: data.profile_image_url
  };
  return { type: UPDATE_PROFILE_SUCCESS, payload: { profile } };
};

export const updateProfileFail = () => ({
  type: UPDATE_PROFILE_FAIL
});
