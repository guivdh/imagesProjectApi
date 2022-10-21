import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Image} from "../entities/image.entity";
import {ImageRepository} from "../repositories/image.repository";

@Injectable()
export class ImageService extends RepositoryService<Image> {
    constructor(
        protected readonly repo: ImageRepository,
    ) {
        super(repo);
    }

    async getAll(): Promise<Image[]> {
        return this.repo.find();
    }
}
