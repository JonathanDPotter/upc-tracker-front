import { Document } from "mongoose";

export interface Igroup extends Document {
  title: string;
  upcs: number[];
}

export interface IgroupUpload {
  title: string;
  upcs: number[];
}
