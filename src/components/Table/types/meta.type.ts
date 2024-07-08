import { DataType } from "./fetch-data.type";

export type MetaType = {
    page: number;
    per_page: number;
    total: number;
    total_pages: Number;
    data: DataType[];
} | null