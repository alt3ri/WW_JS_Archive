"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroyCfg = void 0);
const UnionTeleControlDestroyConditionHelper_1 = require("./UnionTeleControlDestroyConditionHelper");
class FbDestroyCfg {
  constructor(t) {
    (this.FbDataInternal = t), (this.ich = !1), (this.rch = void 0);
  }
  static Create(t) {
    if (t) return new FbDestroyCfg(t);
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var e = this.FbDataInternal.conditionsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.conditionsType(t),
            i =
              UnionTeleControlDestroyConditionHelper_1.UnionTeleControlDestroyConditionHelper.GetUnionTeleControlDestroyConditionObject(
                o,
              );
          i &&
            void 0 !==
              (o =
                UnionTeleControlDestroyConditionHelper_1.UnionTeleControlDestroyConditionHelper.ReadUnionTeleControlDestroyCondition(
                  o,
                  this.FbDataInternal.conditions(t, i),
                )) &&
            this.rch.push(o);
        }
    }
    return this.rch;
  }
}
exports.FbDestroyCfg = FbDestroyCfg;
//# sourceMappingURL=FbDestroyCfg.js.map
