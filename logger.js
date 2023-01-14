"use strict";

// variable to store whether logging is enabled or not
let enableLogging = false;

// gets the value of logsEnabled from chrome storage
chrome.storage.sync.get("logsEnabled", e => {
  // sets the value of enableLogging to the value of logsEnabled
  enableLogging = e && e.logsEnabled;
  console.info(`Logging enabled: ${enableLogging}`);
});

// function to enable/disable logging
const enableLogs = e => {
  enableLogging = e;
  chrome.storage.sync.set({ logsEnabled: e }, () => {
    console.info(`Logging enabled: ${enableLogging}`);
  });
};

// object with methods to log messages
const Logger = {
  warn: e => {
    enableLogging && console.warn(`${new Date()}: ${e}`);
  },
  error: e => {
    enableLogging && console.error(`${new Date()}: ${e}`);
  },
  info: e => {
    enableLogging && console.info(`${new Date()}: ${e}`);
  },
  time: e => {
    enableLogging && console.time(e);
  },
  timeEnd: e => {
    enableLogging && console.timeEnd(e);
  },
  trace: e => {
    enableLogging && console.trace(e);
  }
};
