type Indexed<T = unknown> = {
    [key in string]: T;
};

function getValuesFromTo(from: Indexed, to: Indexed): void {
    for (const property in from) {
        if (!(property in to))
            to[property] = from[property];
        else
            // @ts-ignore
            getValuesFromTo(from[property], to[property]);
    }
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const res = lhs;
    getValuesFromTo(rhs, res);
    return res;
}

function last(arr: string[]) {
    return arr[arr.length-1];
}

function getObjByPath(path: string, value: unknown) {
    const fields = path.split('.');
    let obj = { [last(fields)]: value };
    for (let i = fields.length - 2; i >= 0; i--) {
        obj = { [fields[i]]: obj };
    }
    return obj;
}

function set(obj: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof obj !== 'object') return obj;
    const objByPath = getObjByPath(path, value);
    return merge(obj as Indexed, objByPath);
}

export default set;