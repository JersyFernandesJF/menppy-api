import { compare, hash } from "bcryptjs";
import { CryptographyRepository } from "../protocols/cryptography";
import { Jwt, JwtPayload, sign, verify } from "jsonwebtoken";

class CryptographyAdapter implements CryptographyRepository {
  async hash(params: string): Promise<string> {
    return await hash(params, 12);
  }

  async hashCompare(params: { hash: string; value: string }): Promise<boolean> {
    return await compare(params.value, params.hash);
  }

  async encrypt(value: string): Promise<string> {
    return sign(value, process.env.JWT_SECRET);
  }

  async decrypt<JwtPayload>(value: any): Promise<JwtPayload> {
    return Promise.resolve(verify(value, process.env.JWT_SECRET) as JwtPayload);
  }
}

export const cryptographyAdapter = new CryptographyAdapter();
