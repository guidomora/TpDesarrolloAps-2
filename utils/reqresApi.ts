export interface ReqresUserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface FetchUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUserResponse[];
}

export interface CreatedUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

const BASE_URL = 'https://reqres.in/api';
const DEFAULT_HEADERS = { 'x-api-key': 'reqres-free-v1' };

export async function fetchUsersApi(page: number = 1): Promise<FetchUsersResponse> {
  const response = await fetch(`${BASE_URL}/users?page=${page}`, {
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener la lista de usuarios.');
  }

  return response.json();
}

export async function createUserApi(name: string, job: string): Promise<CreatedUserResponse> {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      ...DEFAULT_HEADERS,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, job }),
  });

  if (!response.ok) {
    throw new Error('No se pudo crear el usuario.');
  }

  return response.json();
}
