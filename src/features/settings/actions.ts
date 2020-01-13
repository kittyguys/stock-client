export const PROFILE_UPDATE = "settings/profile/update/REQUEST";
export const PROFILE_UPDATE_SUCCESS = "settings/profile/update/SUCCESS";
export const PROFILE_UPDATE_FAIL = "settings/profile/update/FAIL";

export const updateProfileRequest = () => ({
  type: PROFILE_UPDATE
});

export const updateProfileSuccess = () => ({
  type: PROFILE_UPDATE_SUCCESS
});

export const updateProfileFail = () => ({
  type: PROFILE_UPDATE_FAIL,
  payload: { status: false }
});
