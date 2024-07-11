"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.error =
    exports.setErrorReportFun =
    exports.warn =
    exports.log =
      void 0);
const Platform_1 = require("../Platform/Platform");
function log(r) {
  (0, Platform_1.getPlatform)().Log(0, r);
}
function warn(r) {
  (0, Platform_1.getPlatform)().Log(1, r);
}
function setErrorReportFun(r) {
  (0, Platform_1.getPlatform)().SetErrorReportFun(r);
}
function error(r) {
  (0, Platform_1.getPlatform)().Log(2, r);
}
(exports.log = log),
  (exports.warn = warn),
  (exports.setErrorReportFun = setErrorReportFun),
  (exports.error = error);
//# sourceMappingURL=Log.js.map
