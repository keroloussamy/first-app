import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { BookCategory } from '../schema/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEnum(BookCategory)
  category: BookCategory;
}
