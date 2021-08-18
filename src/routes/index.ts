import userRoutes from './user';
import { UserController } from '../controller/UserController';

export interface RoutesPayload {
  method: string;
  route: string;
  controller: typeof UserController;
  action: string;
  openAuth?: boolean;
}

export const Routes: RoutesPayload[] = [...userRoutes];
