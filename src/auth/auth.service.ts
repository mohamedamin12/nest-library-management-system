import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service'; 
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './dto/current-user.dto';
import { RolesEnum } from 'src/user/enum/roles';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne(loginDto.username);
    console.log(user);

    if (user && bcrypt.compare(loginDto.password, user.password)) {
      console.log('done');

      return user;
    }
    console.log('none');

    return null;
  }

  async login(user) {
    const payload = {
      username: user.username,
      sub: user._id.toString(),
      roles: user.roles,
    };
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 12);
    const newUser = await this.userService.create({
      ...signupDto,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async thisIsMe(currentUser: CurrentUser, user): Promise<Boolean> {
    if (currentUser.sub === user._id.toString()) {
      return true;
    }
    return false;
  }
  
  async thisIsAdmin(currentUser: CurrentUser): Promise<boolean> {
    return currentUser.roles.some((role) => role === RolesEnum.ADMIN);
  }
}