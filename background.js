"use strict";

// The following code creates a new class and assigns it to a variable
!function(e, t, s) {
  new class {
    constructor(e, t, s) {
      // creates a new cache object
      const o = new Cache;
      // binds the following methods to the class
      this._utils = e;
      this._onBeforeRequest = this._onBeforeRequest.bind(this);
      this._onBeforeSendHeaders = this._onBeforeSendHeaders.bind(this);
      this._parseResponse = this._parseResponse.bind(this);
      this._prepareResponse = this._prepareResponse.bind(this);
      this._validateUrl = this._validateUrl.bind(this);
      this._isLocalhostDebug = this._isLocalhostDebug.bind(this);
      this._isLocalhost = this._isLocalhost.bind(this);
      this._handleBlockpageResponse = this._handleBlockpageResponse.bind(this);
      this._handleDebugPageResponse = this._handleDebugPageResponse.bind(this);
      this._resolve = this._resolve.bind(this);
      this._start = this._start.bind(this);
      this._stop = this._stop.bind(this);

      // assigns the config variable to the class
      this._config = s;
      // assigns the serial number to the class
      s.deviceSerialNumber.then(e => {
        this.serialNo = e;
      });

      // assigns the _getData method to the class
      this._getData = ((e) => this._prepareResponse(this._parseResponse(this._resolve(e.domainName)), e.url));
      this._getData = this._getData.bind(this);
      this._cache = o.get(this._getData);
      this._evictCache = o.evictCache;
      this.appId = t.ids[chrome.runtime.id];

      // checks the platform the extension is running on
      chrome.runtime.getPlatformInfo(e => {
        if ("cros" === e.os) {
          this.init();
          this.start_google_analytics("UA-129271400-1");
        } else {
          this._updateExtensionIcon(false, () => Logger.info(`Umbrella Chromebook client is not supported for '${e.os}'. DNS protection shall be disabled.`));
        }
      });
    }

    // initializes the extension
    init() {
      Logger.info("Waiting to start the extension.");
      chrome.alarms.onAlarm.addListener(e => {
        if ("evictCache" === e.name) {
          this._evictCache();
        }
      });

      // adds listeners for online and offline events
      window.addEventListener("online", e => {
        Logger.info("Connected to internet once again.");
        this._start();
        this._updateExtensionIcon(true);
      });

      window.addEventListener("offline", e => {
        Logger.info("Lost internet connection.");
        this._stop();
        this._updateExtensionIcon(false);
      });

      // checks if the appId variable is
