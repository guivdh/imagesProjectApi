import {ParameterCategory} from "../../entities/parameter-category.entity";
import {ApiProperty} from "@nestjs/swagger";
import {DTOMapping} from "../../../../core/decorators/mapping.decorator";
import {ParameterCategoryDTO} from "../parameter-category/parameter-category.dto";

export class ParameterDTO {

    @ApiProperty()
    @DTOMapping()
    id: number;

    @ApiProperty()
    @DTOMapping()
    logicValue: string;

    @ApiProperty()
    @DTOMapping()
    labelFr: string;

    @ApiProperty()
    @DTOMapping()
    isLogic: boolean;

    @ApiProperty()
    @DTOMapping()
    isActive: boolean;

    @ApiProperty({type: ParameterCategory})
    @DTOMapping({ dtoOrEntity: ParameterCategoryDTO })
    parameterCategory: ParameterCategory;

}
