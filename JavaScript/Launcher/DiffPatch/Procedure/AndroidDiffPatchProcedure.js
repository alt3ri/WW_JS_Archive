"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AndroidDiffPatchProcedure = void 0);
const UE = require("ue"),
  MobileDiffPatchProcedure_1 = require("./MobileDiffPatchProcedure");
class AndroidDiffPatchProcedure extends MobileDiffPatchProcedure_1.MobileDiffPatchProcedure {
  constructor(e, r) {
    super(e, r);
  }
  async HSr(r) {
    return new Promise((e) => {
      const c = UE.AndroidPermissionFunctionLibrary.AcquirePermissions(r),
        n = (r, o) => {
          c.OnPermissionsGrantedDynamicDelegate.Remove(n);
          var t = new Array(),
            s = r.Num();
          for (let e = 0; e < s; e++) {
            var i = r.Get(e);
            o.Get(e) || t.push(i);
          }
          e(t);
        };
      c.OnPermissionsGrantedDynamicDelegate.Add(n);
    });
  }
  async RequestPermission() {
    throw new Error("not implement");
  }
}
exports.AndroidDiffPatchProcedure = AndroidDiffPatchProcedure;
//# sourceMappingURL=AndroidDiffPatchProcedure.js.map
