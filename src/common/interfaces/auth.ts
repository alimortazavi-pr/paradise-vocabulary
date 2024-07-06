export interface IAuthState {
  token: null | string;
  didTryAutoLogin: boolean;
  isAuth: boolean;
  isSigningUp: boolean;
}

export interface IValidationErrorsCheckMobileExist {
  paths: string[];
  messages: {
    mobile: string;
  };
}

export interface IAuthForm {
  firstName?: string;
  lastName?: string;
  mobile: string;
  code: string;
}

export interface IValidationErrorsAuthForm {
  paths: string[];
  messages: {
    firstName: string;
    lastName: string;
    mobile: string;
    code: string;
  };
}
