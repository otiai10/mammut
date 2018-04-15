
export interface IHTTPResponseConstructable<T> {
    construct: (dict: object) => T;
}
export function httperrorcheck(res: Response): Promise<any> {
    if (res.status >= 400) {
        return res.json().then(Promise.reject);
    }
    return res.json();
}

// export function httpdecode<T>(constructable: IHTTPResponseConstructable<T>): (res: Response) => Promise<any> {
//     return (res: Response): Promise<any> => {
//         return httperrorcheck(res).then((dict: object) => {
//            return Promise.resolve(constructable.construct(dict));
//         });
//     };
// }
