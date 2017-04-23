export function get(key) {
    let res;

    if (!key) {
        return null;
    }

    try {
        res = JSON.parse(localStorage.getItem(key));
    } catch (e) {
        // do nothing
    }

    return res;
}

export function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    if (key) {
        localStorage.setItem(key, value);
    }
}

export function remove(key) {
    if (!key) {
        return null;
    }

    localStorage.removeItem(key);
    return true;
}

export function clear() {
    localStorage.clear();
}
