import { Arguments } from './graph-api.types';
declare const graphApi: <T>({ endpoint, body }: Arguments) => Promise<T>;
export default graphApi;
