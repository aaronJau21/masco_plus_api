import { User } from '../user/user.entity';
import { Auth } from './auth.entity';

export interface AuthRepository {
  login(auth: Auth): Promise<User>;
}
