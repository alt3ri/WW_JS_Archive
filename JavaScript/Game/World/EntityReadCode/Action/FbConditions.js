"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditions = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCondition_1 = require("./FbCondition");
class FbConditions {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.hch = !1),
      (this.lch = void 0),
      (this.ich = !1),
      (this.rch = void 0);
  }
  static Create(t) {
    if (t) return new FbConditions(t);
  }
  get LogicOpType() {
    return (
      this.hch ||
        ((this.hch = !0), (this.lch = this.FbDataInternal.logicOpType())),
      this.lch
    );
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var i = this.FbDataInternal.conditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.conditions(
            t,
            new fb_action_1.Condition(),
          );
          this.rch.push(FbCondition_1.FbCondition.Create(s));
        }
    }
    return this.rch;
  }
}
exports.FbConditions = FbConditions;
//# sourceMappingURL=FbConditions.js.map
