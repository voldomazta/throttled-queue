export declare type Settler = (val: any) => void;
declare type Transformer = (item: any, resolve: Settler, reject: Settler) => void;
export default function tq(items: any[], transformer: Transformer, concurrency?: number): Promise<any[]>;
export {};
