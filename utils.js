"use strict";

class Utils {
    constructor() {
        this.getDomainName = this.getDomainName.bind(this);
    }

    // function to extract domain name from url
    getDomainName(url) {
        // regular expression to match the domain name in the url
        let match = /^http(s)?:\/\/([^/:]+)/i.exec(url);
        // return the extracted domain name or null if not found
        return match && match.length >= 3 ? match[2] : null;
    }
}
