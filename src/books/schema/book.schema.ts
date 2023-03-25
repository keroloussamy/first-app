import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Added JSDoc type annotations for better code readability.
/**
 * @typedef Book
 * @property {string} title
 * @property {string} description
 * @property {string} author
 * @property {number} [price=0] - Price of the book. Default is 0.
 * @property {number} [rating=0] - Rating of the book. Default is 0.
 * @property {string} image - URL to the book image.
 * @property {BookCategory} category - The category of the book. Must be one of the enum values.
 * @property {Date} createdAt - Timestamp of when the document was created
 * @property {Date} updatedAt - Timestamp of when the document was last updated
 */

export enum BookCategory {
  FICTION = 'Fiction',
  HISTORY = 'History',
  SCIENCE = 'Science',
  ART = 'Art',
  DRAMA = 'Drama',
  COMEDY = 'Comedy',
  SATIRE = 'Satire',
  TRAGEDY = 'Tragedy',
  ACTION = 'Action',
  CLASSICS = 'Classics',
}

/*
The @Schema() decorator marks a class as a schema definition. 
It maps our BOOK class to a MongoDB collection of the same name, but with an additional “s” at the end,
So the final mongo collection name will be books.
*/

@Schema({
  timestamps: true,
})

/*
@Prop()
-The schema types for these properties are automatically inferred thanks to TypeScript metadata (and reflection) capabilities.
 However, in more complex scenarios in which types cannot be implicitly reflected (for example, arrays or nested object structures), 
 types must be indicated explicitly, as follows
  @Prop([String])
  tags: string[];

-Takes options object
  @Prop({ required: true })

-To make a relation with owners collection
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

-Finally, the raw schema definition can also be passed to the decorator. This is useful when, for example, 
a property represents a nested object which is not defined as a class. For this, 
use the raw() function from the @nestjs/mongoose package, as follows:

  @Prop(raw({
  firstName: { type: String },
  lastName: { type: String }
  }))
  details: Record<string, any>;

Record<string, any> is a TypeScript type declaration that defines an object type where the keys are strings, and the values can be of any type.
The Record utility type is a built-in TypeScript type that allows you to create a new object type with a specific set of keys and value types. 
In this case, string is used to define the type of the object keys, and any is used to define the type of the object values.
*/
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ max: 5, default: 0 })
  rating: number;

  @Prop()
  image: string;

  @Prop({ type: String, enum: BookCategory })
  category: BookCategory;
}

// /**
//  * @function createBookModel
//  * @returns {ReturnType<typeof SchemaFactory.createForClass>} - A Mongoose model of a Book schema.
//  */

// export const createBookModel = () => {
//   const schema = SchemaFactory.createForClass(Book);
//   return schema;
// };

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDocument = Book & Document;
// export type BookDocument = mongoose.DocumentType<Book>; // Another way
// export type BookDocument = HydratedDocument<Book>; // Another way

/* 
BookDocument is a union of two types Book and Document, is a type that has all the properties of both of them.
Document is to represent MongoDB's document object.
combining multiple types into one using the & operator - is called intersection types in TypeScrip.
BookDocument is an intersection type that can be used in place of either Book or Document
*/

/* 
Alternatively, if you prefer not using decorators, you can define a schema manually. For example:

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

*/
