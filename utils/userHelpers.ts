import { CreatedUserResponse, ReqresUserResponse } from './reqresApi';

export interface User {
  id: string;
  name: string;
  email?: string;
  job?: string;
  createdAt?: string;
  avatar?: string;
}

export function mapReqresUsersToDomain(users: ReqresUserResponse[]): User[] {
  return users.map((user) => ({
    id: user.id.toString(),
    name: `${user.first_name} ${user.last_name}`.trim(),
    email: user.email,
    avatar: user.avatar,
  }));
}

export function buildCreatedUser(payload: CreatedUserResponse): User {
  return {
    id: payload.id,
    name: payload.name,
    job: payload.job,
    createdAt: payload.createdAt,
  };
}
