var cookies = {};
(function() {

    this.get = function (name)
    {
      let match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : undefined;
    }

    this.set = function (name, value, options = {})
    {
        options = {
            path: '/',
        };

        if (options.expires instanceof Date) { options.expires = options.expires.toUTCString(); }

        let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        for (let item in options)
        {
            //cookie += '; ' + item;
            //if (options[item]) cookie += '=' + options[item];
            cookie += '; ' + item + ((options[item]) ? '=' + options[item] : '');
        }

console.log(cookie);

        document.cookie = cookie;
    }

}).apply(cookies);
