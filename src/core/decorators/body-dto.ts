import { createParamDecorator } from '@nestjs/common';

export const BodyDto = createParamDecorator((data, req) => JSON.parse(req.body.dto));
