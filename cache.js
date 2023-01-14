"use strict";

class Cache {
  constructor() {
    // creates a new map object
    let e = new Map;
    // assigns the get method to the class
    this.get = (t => s => {
      // assigns the domainName variable
      const o = s.domainName;
      // checks if the domainName is in the cache and if it's timestamp is less than or equal to 3e5
      let r = e.has(o) && e.get(o);
      if (r && Date.now() - r.timestamp <= 3e5) {
        Logger.info(`Cache hit for ${o}`);
      } else {
        Logger.info(`Cache missed for ${o}`);
        try {
          // assigns the response and timestamp variables
          const i = t(s);
          r = {
            response: i,
            timestamp: Date.now()
          }, i && e.size < 2500 && "debug" !== o && e.set(o, r);
        } catch (e) {
          return Logger.error(`UCC fail open for ${o} due to ${e.message}`), {
            cancel: !1
          }
        }
      }
      // returns the response variable
      return r.response;
    }), this.evictCache = (() => {
      // assigns the size variable
      const t = e.size;
      // iterates through the map
      for (let [t, s] of e)
        // checks if the timestamp is greater than 3e5
        Date.now() - s.timestamp > 3e5 && e.delete(t);
      Logger.info(`Evicted ${t - e.size} expired cache entries.`)
    });
  }
}
