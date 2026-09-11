import { IsArray, IsIn, IsMongoId, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { CURRENCY_CODES } from '../../common/constants/currency';

export class CreateProductDto {
  @IsMongoId()
  businessId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsNumber()
  @Min(0)
  price: number;

  // Omitted by existing vendor clients — the schema default fills it in.
  @IsOptional()
  @IsIn(CURRENCY_CODES)
  currency?: string;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}
