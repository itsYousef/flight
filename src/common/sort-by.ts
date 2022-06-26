import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class SortByData {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  field?: string

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  descending = true

  convertToPrismaFilter?() {
    const result = { orderBy: null }
    if (this.field) {
      result.orderBy = {}
      result.orderBy[this.field] = this.descending ? "desc" : "asc"
    }

    return result
  }
}