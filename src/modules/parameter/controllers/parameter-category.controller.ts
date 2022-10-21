import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {FilterParameterCategoryDTO} from '../dto/parameter-category/filter-parameter-category.dto';
import {FullParameterCategoryDTO} from '../dto/parameter-category/full-parameter-category.dto';
import {ParameterCategoryDTO} from '../dto/parameter-category/parameter-category.dto';
import {ParameterCategory} from '../entities/parameter-category.entity';
import {ParameterCategoryService} from '../services/parameter-category.service';
import {Roles} from "../../../core/decorators/role.decorator";
import {RoleEnum} from "../../user/enums/role.enum";
import {UpdateParameterDTO} from "../dto/parameter/update-parameter.dto";
import {ParameterDTO} from "../dto/parameter/parameter.dto";

@ApiTags('parameter-categories')
@Controller({
    path: 'parameter-categories',
})
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ParameterCategoryController {
    constructor(
        private readonly parameterCategoryService: ParameterCategoryService,
    ) {
    }

    @Get()
    @ApiResponse({ status: 200, type: ParameterCategoryDTO, isArray: true })
    async getAll(): Promise<ParameterCategoryDTO[]> {
        return ParameterCategory.toDTOList(await this.parameterCategoryService.findAll(), ParameterCategoryDTO);
    }

    @Get('parameters')
    @ApiResponse({ status: 200, type: FullParameterCategoryDTO, isArray: true })
    async getAllParameters(@Query() dto: FilterParameterCategoryDTO): Promise<FullParameterCategoryDTO[]> {

        if (dto.names && !Array.isArray(dto.names)) {
            dto.names = [dto.names];
        }

        return ParameterCategory.toDTOList(await this.parameterCategoryService.findAllByFilter(dto), FullParameterCategoryDTO);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK })
    @Roles(RoleEnum.ADMINISTRATOR)
    async createOne(@Body() dto: ParameterCategoryDTO): Promise<ParameterCategoryDTO>{
        let parameterCategory = this.parameterCategoryService.create(dto);
        parameterCategory = await this.parameterCategoryService.save(parameterCategory);
        return parameterCategory.toDTO(ParameterCategoryDTO);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK })
    @Roles(RoleEnum.ADMINISTRATOR)
    async patchOne(@Param('id') categoryId: number, @Body() dto: ParameterCategoryDTO): Promise<ParameterCategoryDTO> {
        const currentCategory = await this.parameterCategoryService.findOneById(categoryId);

        Object.assign(currentCategory, dto)

        await this.parameterCategoryService.save(currentCategory)

        return currentCategory.toDTO(ParameterCategoryDTO)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK })
    @Roles(RoleEnum.ADMINISTRATOR)
    async removeCategory(@Param('id') categoryId: number){
        const category = await this.parameterCategoryService.findOneById(categoryId);
        await this.parameterCategoryService.delete(category);
        return true
    }
}
