import {User} from "../User/user.model";

export class Workplace {
  idWorkplace: number;
  code: String;
  name: String;
}

export class Post {
  idPost: number;
  text: String;
  timestamp: String;
  username: String;
  userId: number;
  workplaceId?: number;
}

export class Workplace_has_User {
  idWorkplace: number;
  idUser: number;
}

export class Workplace_has_Post {
  idWorkplace: number;
  idPost: number;
}
