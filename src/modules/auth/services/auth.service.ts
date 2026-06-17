import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../../database/index.js';
import { env } from '../../../config/env.js';
import { UnauthorizedError } from '../../../common/exceptions/app.exception.js';

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export class AuthService {
  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn as jwt.SignOptions['expiresIn'] },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}

export const authService = new AuthService();
