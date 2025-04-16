"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityGroupCondition = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbEntityEventCondition_1 = require("./FbEntityEventCondition");
class FbEntityGroupCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.luh = !1),
      (this.v4i = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.ich = !1),
      (this.rch = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityGroupCondition(t);
  }
  get Count() {
    return (
      this.luh || ((this.luh = !0), (this.v4i = this.FbDataInternal.count())),
      this.v4i
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var i = this.FbDataInternal.conditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.conditions(
            t,
            new fb_condition_1.EntityEventCondition(),
          );
          this.rch.push(
            FbEntityEventCondition_1.FbEntityEventCondition.Create(n),
          );
        }
    }
    return this.rch;
  }
}
exports.FbEntityGroupCondition = FbEntityGroupCondition;
//# sourceMappingURL=FbEntityGroupCondition.js.map
