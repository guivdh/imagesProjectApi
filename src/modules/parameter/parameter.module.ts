import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Parameter} from './entities/parameter.entity';
import {ParameterCategory} from './entities/parameter-category.entity';
import {ParameterService} from "./services/parameter.service";
import {ParameterCategoryService} from "./services/parameter-category.service";
import {ParameterController} from "./controllers/parameter.controller";
import {ParameterCategoryController} from "./controllers/parameter-category.controller";
import {ParameterRepository} from "./repositories/parameter.repository";
import {ParameterCategoryRepository} from "./repositories/parameter-category.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Parameter,
            ParameterCategory,
            ParameterRepository,
            ParameterCategoryRepository
        ]),
    ],
    controllers: [
        ParameterCategoryController,
        ParameterController,
    ],
    providers: [
        ParameterService,
        ParameterCategoryService,
    ],
    exports: [
        ParameterService,
        ParameterCategoryService,
    ],
})
export class ParameterModule {
}
