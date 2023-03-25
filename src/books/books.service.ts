import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schema/book.schema';

@Injectable() // is a decorator that marks the class as a NestJS service.
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>, // InjectModel is a decorator that injects a Mongoose model into the service.
  ) {}
  /**
  We use the BookDocument type to specify the type of the data returned by the Mongoose queries.
  Model<BookDocument> explicitly specifies that the model should return documents that conform to the schema defined in the Book class, 
    while Model<Book> does not provide that level of type safety.
  it is generally recommended to use Model<BookDocument> than Model<Book>.
  */
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec(); // Learn more about using .exec() or not: https://mongoosejs.com/docs/promises.html
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndRemove(id); // it returns the removed book if everything went smoothly.
  }

  // Need to add error handling
}
