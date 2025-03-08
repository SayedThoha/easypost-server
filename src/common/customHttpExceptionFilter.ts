import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    // Customize your error response here
    const errorResponse = {
      statusCode: status,
      message: exception.getResponse(), // You can modify this if needed
    };

    response.status(status).json(errorResponse);
  }
}
