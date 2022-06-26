import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class PaginationData {
  @ApiPropertyOptional({ type: Number })
  @Min(0)
  @Max(200)
  @IsNumber()
  take = 10;

  @ApiPropertyOptional({ type: Number })
  @Min(0)
  @IsNumber()
  skip = 0;

  convertToPrismaFilter?() {
    return {
      take: this.take,
      skip: this.skip
    }
  }
}

type Input<T> = {
  entity: Promise<T>;
  count: Promise<number>;
}

export function createPaginationResult<T>(input: Input<T>) {
  return Promise.all([input.entity, input.count])
    .then(([data, count]) => ({ data, count }))
}