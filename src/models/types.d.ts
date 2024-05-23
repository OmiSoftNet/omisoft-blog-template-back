import { Document, PaginateModel } from "mongoose";

export type ModelWithPagination<T> = Document & PaginateModel<T>;
