import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param, Patch,
  Post, Query,
} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Parameter} from "../entities/parameter.entity";
import {ParameterDTO} from "../dto/parameter/parameter.dto";
import {ParameterService} from "../services/parameter.service";
import {ParameterCategoryService} from "../services/parameter-category.service";
import { Roles } from '../../../core/decorators/role.decorator';
import { RoleEnum } from '../../user/enums/role.enum';
import { UpdateParameterDTO } from '../dto/parameter/update-parameter.dto';
import { ParameterCategory } from '../entities/parameter-category.entity';

@ApiTags('parameters')
@Controller({
    path: 'parameter-categories/:categoryId/parameters',
})
@ApiBearerAuth()
export class ParameterController {
  constructor(
      private readonly parameterService: ParameterService,
      private readonly parameterCategoryService: ParameterCategoryService,
  ) {
  }

  @Get()
  @ApiResponse({status: 200, type: ParameterDTO, isArray: true})
  async getAll(@Param('categoryId') categoryId: number): Promise<ParameterDTO[]> {
    const category = await this.parameterCategoryService.findOneById(categoryId);
    if (!category) {
        throw new NotFoundException();
    }
    return Parameter.toDTOList(await this.parameterService.findAllByCode(category.name), ParameterDTO);
  }

  @Get('by-code')
  @ApiResponse({status: 200, type: ParameterDTO, isArray: true})
  // categoryId contains the category code
  async getAllActiveByCode(
      @Param('categoryId') categoryId: string,
      @Query('ShowParameterID') ShowParameterID: number,
      @Query('ShowInactive') ShowInactive: boolean
  ): Promise<ParameterDTO[]> {
    return Parameter.toDTOList(await this.parameterService.findActiveAllByCode(categoryId, ShowParameterID, ShowInactive), ParameterDTO);
  }

  @Get(':id')
  @ApiResponse({status: 200, type: ParameterDTO})
  async getOne(@Param('categoryId') categoryId: number, @Param('id') id: number): Promise<ParameterDTO> {
    const category = await this.parameterCategoryService.findOneById(categoryId);
    if (!category) {
      throw new NotFoundException();
    }

    const parameter = await this.parameterService.findOneByCodeAndId(category.name, id);
    if (!parameter) {
      throw new NotFoundException();
    }

    return parameter.toDTO(ParameterDTO);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: HttpStatus.OK })
  @Roles(RoleEnum.ADMINISTRATOR)
  async createOne(@Param('categoryId') categoryId: number, @Body() dto: UpdateParameterDTO): Promise<ParameterDTO>{
    let newParameter = new Parameter();
    newParameter.labelFr = dto.labelFr;

    newParameter.isActive = true;
    newParameter.logicValue = '';
    newParameter.parameterCategory = new ParameterCategory();
    newParameter.parameterCategory.id = categoryId;

    let parameter = this.parameterService.create(newParameter);
    parameter = await this.parameterService.insert(parameter);
    return parameter.toDTO(ParameterDTO);
  }

  @Post(':id/toggle')
  @ApiResponse({ status: 200, type: ParameterDTO })
  @Roles(RoleEnum.ADMINISTRATOR)
  async toggle(@Param('id') id: number): Promise<ParameterDTO> {
    let parameter = await this.parameterService.findOneById(id);
    if (!parameter){
      throw new NotFoundException();
    }
    parameter.isActive = !parameter.isActive;
    await this.parameterService.save(parameter);

    return parameter.toDTO(ParameterDTO);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: HttpStatus.OK })
  @Roles(RoleEnum.ADMINISTRATOR)
  async patchOne(@Param('id') parameterId: number, @Body() dto: UpdateParameterDTO): Promise<ParameterDTO>{
    const currentParameter = await this.parameterService.findOneById(parameterId, {relations: ['parameterCategory']});

    currentParameter.labelFr = dto.labelFr;
    await this.parameterService.save(currentParameter);

    return currentParameter.toDTO(ParameterDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: HttpStatus.OK })
  @Roles(RoleEnum.ADMINISTRATOR)
  async removeParameter(@Param('id') parameterId: number){
    const parameter = await this.parameterService.findOneById(parameterId);
    await this.parameterService.delete(parameter);
    return true
  }
}
