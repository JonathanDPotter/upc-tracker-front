import { Document } from "mongoose";

export interface Igroup extends Document {
  title: string;
  upcs: number[];
}

export interface IgroupUpdate {
  title: string;
  upcs: number[];
}
