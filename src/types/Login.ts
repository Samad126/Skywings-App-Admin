export type FormSubmitType = {
  login: string;
  password: string;
};

export type Login401Response = {
  success: false;
  message: string;
};

export type Login422Response = {
  message: string;
  errors: {
    password: Array<string>;
  };
};

export type Login200Response = {
  success: boolean;
  message: string;
  data: number;
};
