type User = {
  uid: string;
  firstName: string;
  lastName: string;
}

type UserRole =
  | "tech"
  | "tester"
  | "member"
  | "nonmember"
  | "client"

type Claims = {
  admin?: boolean;
  member?: boolean;
  tester?: boolean;
  role?: UserRole;
  email?: string;
  user_id?: string;
}