import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.Strategy';
import { Blog, BlogSchema } from './schema/blog.schema';
import { UserService } from './service/user/user.service';
import { UserControllerController } from './controller/user-controller/user-controller.controller';
import { UserRepository } from './repository/user.repository';
import { BlogRepository } from './repository/blog.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || '9645743868',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, JwtStrategy, UserRepository, BlogRepository],
  controllers: [UserControllerController],
  exports: [UserService, UserRepository, BlogRepository],
})
export class UserModule {}
