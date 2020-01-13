export type SettingsState = {
  isLoading: boolean;
};

export type SettingsAction = {
  type: string;
  payload: { isLoading: boolean };
};

export type Data = {
  user_name?: string;
  display_name?: string;
  email?: string;
  profile_image_url?: any;
};
