namespace Hasher {
  export type Params = string;
  export type Response = Promise<string>;

  export interface Contract {
    hash(params: Hasher.Params): Hasher.Response;
  }
}

export namespace HashCompany {
  export interface Contract {
    hashCompare(params: { hash: string; value: string }): Promise<boolean>;
  }
}

export namespace Encrypter {
  export interface Contract {
    encrypt(value: string): Promise<string>;
  }
}
export namespace Decrypter {
  export interface Contract {
    decrypt<R>(value: string): Promise<R>;
  }
}

export type CryptographyRepository = Hasher.Contract &
  HashCompany.Contract &
  Encrypter.Contract &
  Decrypter.Contract;
