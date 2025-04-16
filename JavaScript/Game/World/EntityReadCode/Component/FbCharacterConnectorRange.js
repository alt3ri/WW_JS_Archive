"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCharacterConnectorRange = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbConnectorEffectConfig_1 = require("./FbConnectorEffectConfig"),
  FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbCharacterConnectorRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hQh = !1),
      (this.lQh = void 0),
      (this.ljh = !1),
      (this._jh = 0),
      (this.cjh = !1),
      (this.ujh = 0),
      (this.M$h = !1),
      (this.E$h = void 0),
      (this._$h = !1),
      (this.c$h = void 0),
      (this.u$h = !1),
      (this.d$h = void 0);
  }
  static Create(t) {
    if (t) return new FbCharacterConnectorRange(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EffectConfig() {
    return (
      this.hQh ||
        ((this.hQh = !0),
        (this.lQh = FbConnectorEffectConfig_1.FbConnectorEffectConfig.Create(
          this.FbDataInternal.effectConfig(),
        ))),
      this.lQh
    );
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
  get TagConditions() {
    if (!this.M$h) {
      (this.M$h = !0), (this.E$h = new Array());
      var i = this.FbDataInternal.tagConditionsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.E$h.push(this.FbDataInternal.tagConditions(t));
    }
    return this.E$h;
  }
  get MatchConditions() {
    if (!this._$h) {
      (this._$h = !0), (this.c$h = new Array());
      var i = this.FbDataInternal.matchConditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.matchConditions(
            t,
            new fb_component_1.DynamicEntityMatch(),
          );
          this.c$h.push(FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(s));
        }
    }
    return this.c$h;
  }
  get KeepConditions() {
    if (!this.u$h) {
      (this.u$h = !0), (this.d$h = new Array());
      var i = this.FbDataInternal.keepConditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.keepConditions(
            t,
            new fb_component_1.DynamicEntityMatch(),
          );
          this.d$h.push(FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(s));
        }
    }
    return this.d$h;
  }
}
exports.FbCharacterConnectorRange = FbCharacterConnectorRange;
//# sourceMappingURL=FbCharacterConnectorRange.js.map
