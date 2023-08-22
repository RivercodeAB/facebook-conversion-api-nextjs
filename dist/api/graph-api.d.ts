type Arguments = {
    endpoint: string;
    body: any;
};
/**
 * Facebook Graph API client.
 *
 * @param endpoint
 * @param body
 * @constructor
 */
declare const graphApi: <T>({ endpoint, body }: Arguments) => Promise<T>;
export default graphApi;
