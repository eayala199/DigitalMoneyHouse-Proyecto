export type LoginFormData = {
  email: string;
  password: string;
};

export type UserType = {
  "dni": number,
  "email": string,
  "firstname": string,
  "lastname": string,
  "password": string,
  "phone"?: string  
}

export type UserData = {
  "user_id": number,
  "account_id": number,
  "email": string
}

export type UserLoginType = {
  "email": string,
  "password": string
}