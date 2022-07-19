//Cookies操作
const Cookies = {
    setCookie: function (name, value, lifespan, access_path) {
        let cookietext = name + "=" + value;
        if (lifespan != null) {
            let today = new Date();
            let expiredate = new Date();
            expiredate.setTime(
                today.getTime() + 1000 * 60 * 60 * 24 * lifespan
            );
            cookietext += "; expires=" + expiredate.toGMTString();
        }
        if (access_path != null) {
            cookietext += "; path=" + access_path;
        }
        document.cookie = cookietext;
        return null;
    },

    setDatedCookie: function (name, value, expire, access_path) {
        let cookietext =
            name +
            "=" +
            value +
            (expire == null ? "" : "; expires=" + expire.toGMTString());
        if (access_path != null) {
            cookietext += "; path=" + access_path;
        }
        document.cookie = cookietext;
        return null;
    },

    getCookie: function (Name) {
        let search = Name + "=";
        let CookieString = document.cookie;
        let offset, end;
        let result = null;
        if (CookieString.length > 0) {
            offset = CookieString.indexOf(search);

            if (offset != -1) {
                offset += search.length;
                end = CookieString.indexOf(";", offset);
                if (end == -1) end = CookieString.length;
                result = unescape(CookieString.substring(offset, end));
            }
        }
        return result;
    },

    deleteCookie: function (Name, Path) {
        Cookies.setCookie(Name, "Deleted", -1, Path);
    },

    clearAllCookie: function () {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = keys.length; i--;)
                document.cookie =
                    keys[i] + "=0;expires=" + new Date(0).toUTCString();
        }
    },
};
export default Cookies;