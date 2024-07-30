/* istanbul ignore file */
import { PostStatus } from "./PostStatus";
import { StateObject } from "./StateObject";

export interface Post extends StateObject {
  title: string;
  status: PostStatus | keyof typeof PostStatus;
  rating?: number | null;
  content?: string | null;
  author?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

