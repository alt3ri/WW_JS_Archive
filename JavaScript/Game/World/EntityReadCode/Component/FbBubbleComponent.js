"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBubbleComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbConditionBubbleData_1 = require("./FbConditionBubbleData");
class FbBubbleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.ajh = !1),
      (this.hjh = void 0),
      (this.ljh = !1),
      (this._jh = 0),
      (this.cjh = !1),
      (this.ujh = 0),
      (this.djh = !1),
      (this.mjh = void 0),
      (this.tph = !1),
      (this.iph = 0);
  }
  static Create(t) {
    if (t) return new FbBubbleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get NpcIds() {
    if (!this.ajh) {
      (this.ajh = !0), (this.hjh = new Array());
      var i = this.FbDataInternal.npcIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.hjh.push(this.FbDataInternal.npcIds(t));
    }
    return this.hjh;
  }
  get EnterRange() {
    return (
      this.ljh ||
        ((this.ljh = !0), (this._jh = this.FbDataInternal.enterRange())),
      this._jh
    );
  }
  get LeaveRange() {
    return (
      this.cjh ||
        ((this.cjh = !0), (this.ujh = this.FbDataInternal.leaveRange())),
      this.ujh
    );
  }
  get Flows() {
    if (!this.djh) {
      (this.djh = !0), (this.mjh = new Array());
      var i = this.FbDataInternal.flowsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.flows(
            t,
            new fb_component_1.ConditionBubbleData(),
          );
          this.mjh.push(
            FbConditionBubbleData_1.FbConditionBubbleData.Create(s),
          );
        }
    }
    return this.mjh;
  }
  get TimberId() {
    return (
      this.tph ||
        ((this.tph = !0), (this.iph = this.FbDataInternal.timberId())),
      this.iph
    );
  }
}
exports.FbBubbleComponent = FbBubbleComponent;
//# sourceMappingURL=FbBubbleComponent.js.map
