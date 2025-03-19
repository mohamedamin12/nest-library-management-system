// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/user/enum/roles';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);