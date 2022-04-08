import { Role } from "./role";

export interface User {
  account : string,
  pwd : string,
  changePwd : string,
  valid : boolean,
  mail : string,
  phone : string,
  message : string,
  access_token : string,
  refresh_token : string,
  roles:Role[]
}
