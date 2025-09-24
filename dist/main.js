"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const customHttpExceptionFilter_1 = require("./common/customHttpExceptionFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new customHttpExceptionFilter_1.CustomHttpExceptionFilter());
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,POST,PUT,PATCH,DELETE',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map