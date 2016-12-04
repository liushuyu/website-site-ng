function isStorageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

function packArgs(args, cb) {
    try {
        var archive_str = JSON.stringify(args);
    } catch (e) {
        return null;
    } finally {
        if (cb) {
            cb();
        }
    }
    return archive_str;
}

function unpackArgs(args, cb) {
    try {
        var unpacked_dict = JSON.parse(args);
        return unpacked_dict;
    } catch (e) {
        return undefined;
    } finally {
        if (cb) {
            cb();
        }
    }
}

function saveArgs(args, cb) {
    try {
        localStorage.setItem('news-draft', packArgs(args, cb));
        return true;
    } catch (e) {
        return false;
    }
}

function loadArgs(cb) {
    try {
        return unpackArgs(localStorage.getItem('news-draft'), cb);
    } catch (e) {
        return undefined;
    }
}
