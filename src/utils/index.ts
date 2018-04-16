/**
 * httperrorcheck checks the HTTP response status code and let it reject.
 * @param {Response} res
 */
export function httperrorcheck(res: Response): Promise<any> {
    if (res.status >= 400) {
        return res.json().then((data: any) => Promise.reject(data));
    }
    return res.json();
}
