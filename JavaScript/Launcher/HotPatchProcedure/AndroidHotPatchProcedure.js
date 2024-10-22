"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AndroidHotPatchProcedure = void 0);
const UE = require("ue"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  MobileHotPatchProcedure_1 = require("./MobileHotPatchProcedure");
class AndroidHotPatchProcedure extends MobileHotPatchProcedure_1.MobileHotPatchProcedure {
  constructor(e, r) {
    super(e, r);
  }
  async HSr(r) {
    return new Promise((e) => {
      const u = UE.AndroidPermissionFunctionLibrary.AcquirePermissions(r),
        i = (r, t) => {
          u.OnPermissionsGrantedDynamicDelegate.Remove(i);
          var o = new Array(),
            c = r.Num();
          for (let e = 0; e < c; e++) {
            var s = r.Get(e);
            t.Get(e) || o.push(s);
          }
          e(o);
        };
      u.OnPermissionsGrantedDynamicDelegate.Add(i);
    });
  }
  async Start() {
    return super.Start();
  }
}
exports.AndroidHotPatchProcedure = AndroidHotPatchProcedure;
//# sourceMappingURL=AndroidHotPatchProcedure.js.map
