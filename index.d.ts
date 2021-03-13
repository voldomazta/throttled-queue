export declare type Settler = (val?: any) => void;
declare type Executor = (item: any, resolve: Settler, reject: Settler) => void;
export default function tq(items: any[], executor: Executor, concurrency?: number): Promise<any[]>;
export {};
