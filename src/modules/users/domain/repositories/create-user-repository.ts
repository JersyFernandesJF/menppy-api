export namespace CreateUserRepository {
  export interface Params {
    name: string;
    email: string;
    password: string;
  }

  export type Response = Promise<{
    id: string;
    name: string;
    email: string;
  }>;

  export interface Contract {
    create(params: CreateUserRepository.Params): CreateUserRepository.Response;
  }
}
