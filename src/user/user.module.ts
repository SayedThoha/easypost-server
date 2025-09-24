import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.Strategy';
import { Blog, BlogSchema } from './schema/blog.schema';
import { UserService } from './service/user/user.service';
import { UserControllerController } from './controller/user-controller/user-controller.controller';
import { UserRepository } from './repository/user/user.repository';
import { BlogRepository } from './repository/blog/blog.repository';
import { BlogService } from './service/blog/blog.service';
import { BlogController } from './controller/blog-controller/blog/blog.controller';
import { IUserRepository } from './repository/user/IUser.Repository';
import { IBlogRepository } from './repository/blog/IBlog.Repository';
import { IUserService } from './service/user/IUser.service';
import { IBlogService } from './service/blog/IBlog.service';

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
  providers: [
    JwtStrategy,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IBlogRepository,
      useClass: BlogRepository,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IBlogService,
      useClass: BlogService,
    },
  ],
  controllers: [UserControllerController, BlogController],
  exports: [IUserRepository, IBlogRepository, IUserService, IBlogService],
})
export class UserModule {}
