"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
let pf =
  (exports.isNodeEnvironment =
  exports.getPlatform =
  exports.setPlatform =
    void 0);
function setPlatform(t) {
  pf = t;
}
function getPlatform() {
  if (pf) return pf;
  throw new Error("Platform is not set");
}
function isNodeEnvironment() {
  try {
    return (
      "[object process]" === Object.prototype.toString.call(global.process)
    );
  } catch (t) {
    return !1;
  }
}
function init() {
  var t;
  isNodeEnvironment()
    ? ((t = require("./PlatformNodeJs")["platformNodeJs"]), setPlatform(t))
    : ((t = require("./PlatformUe")["platformUe"]), setPlatform(t));
}
(exports.setPlatform = setPlatform),
  (exports.getPlatform = getPlatform),
  (exports.isNodeEnvironment = isNodeEnvironment),
  init();
//# sourceMappingURL=Platform.js.map
