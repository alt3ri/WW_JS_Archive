"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerMatchConfig = void 0);
const UnionEntityMatchHelper_1 = require("./UnionEntityMatchHelper");
class FbTriggerMatchConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.gFh = !1),
      (this.fFh = void 0),
      (this.iXh = !1),
      (this.rXh = 0);
  }
  static Create(t) {
    if (t) return new FbTriggerMatchConfig(t);
  }
  get EntityMatch() {
    var t, i;
    return (
      !this.gFh &&
        ((this.gFh = !0),
        (t = this.FbDataInternal.entityMatchType()),
        (i =
          UnionEntityMatchHelper_1.UnionEntityMatchHelper.GetUnionEntityMatchObject(
            t,
          ))) &&
        (this.fFh =
          UnionEntityMatchHelper_1.UnionEntityMatchHelper.ReadUnionEntityMatch(
            t,
            this.FbDataInternal.entityMatch(i),
          )),
      this.fFh
    );
  }
  get EntityMatchCount() {
    return (
      this.iXh ||
        ((this.iXh = !0), (this.rXh = this.FbDataInternal.entityMatchCount())),
      this.rXh
    );
  }
}
exports.FbTriggerMatchConfig = FbTriggerMatchConfig;
//# sourceMappingURL=FbTriggerMatchConfig.js.map
