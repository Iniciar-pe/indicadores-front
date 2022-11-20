export class User {
  countLicense: string;
  email: string;
  id: string;
  lastName: string;
  name: string;
  status: string;
  avatar: string;
  description: string;
  user: string;
  business: string;
}

export class UserAssigned {
  email: string;
  id: string;
  lastName: string;
  name: string;
  status: string;
  avatar: string;
  user: string;
  business: string;
}

export class UserRequest {
  status: string;
  user: User[];
}

export class HistoryUser {
  start: string;
  end: string;
}