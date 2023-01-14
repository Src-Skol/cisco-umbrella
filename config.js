"use strict;";

class Config {
  // getter function for deviceSerialNumber
  get deviceSerialNumber() {
    return new Promise(e => {
      chrome.enterprise.deviceAttributes.getDeviceSerialNumber(r => {
        Logger.info("Device Serial Number to be used : " + r);
        e(r);
      });
    });
  }
}
