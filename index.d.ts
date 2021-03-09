declare type Transformer = (item: any, resolve: (val: any) => void, reject: (val: any) => void) => void;
export default function ThrottledQueue(items: any[], transformer: Transformer, concurrency?: number): Promise<any[]>;
export {};
