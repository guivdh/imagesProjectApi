import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {BadRequestException, Body, Controller, Get, HttpStatus, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateEstablishmentDTO} from "../../establishment/dto/create-establishment.dto";
import {ImageService} from "../services/image.service";

@ApiTags('images')
@Controller({
    path: 'images',
})
export class ImageController {
    constructor(
        private imageService: ImageService
    ) {
    }

    @Post('upload')
    @ApiResponse({ status: HttpStatus.CREATED})
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
        return true
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK})
    async getOne() {
        const images = await this.imageService.findAll();

        return true
    }

}
