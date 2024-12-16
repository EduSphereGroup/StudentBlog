import { Profile } from "./profile.entity";

export class User {
  id: string;
  name: string;
  profileId: Profile;
  username: string;
  password: string;
  email: string;

  constructor(
    id: string,
    name: string,
    profileId: Profile,
    username: string,
    password: string,
    email: string,
  ) {
    this.id = id;
    this.name = name;
    this.profileId = profileId;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
