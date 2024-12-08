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

type Post =
  {
    id: string;
    body: string;
    reactions?: Reaction[];
    comments?: PostComment[];
    createdAt: string;
  }

type Reaction = {
  id: string;
  userId: string;
  postId: string;
  reacts: {
    "👍"?: number;
    "❤️"?: number;
    "😂"?: number;
    "😮"?: number;
    "😢"?: number;
    "👏"?: number;
  };
  createdAt: string;
};

type ReactionKeys =
  "\uD83D\uDC4D"
  | "\u2764\uFE0F"
  | "\uD83D\uDE02"
  | "\uD83D\uDE2E"
  | "\uD83D\uDE22"
  | "\uD83D\uDC4F";


type PostComment = {
  id: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: string;
}