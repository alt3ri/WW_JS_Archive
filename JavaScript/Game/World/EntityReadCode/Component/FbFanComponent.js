"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFanComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFanEffectConfig_1 = require("./FbFanEffectConfig"),
  FbFanStateEffect_1 = require("./FbFanStateEffect"),
  UnionFanInteractOptionHelper_1 = require("./UnionFanInteractOptionHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbFanComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.YWh = !1),
      (this.zWh = void 0),
      (this.JWh = !1),
      (this.ZWh = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.eQh = !1),
      (this.tQh = void 0),
      (this.iQh = !1),
      (this.rQh = void 0),
      (this.oQh = !1),
      (this.nQh = 0),
      (this.sQh = !1),
      (this.aQh = 0),
      (this.Vvh = !1),
      (this.jvh = 0),
      (this.hQh = !1),
      (this.lQh = void 0),
      (this._Qh = !1),
      (this.cQh = void 0);
  }
  static Create(t) {
    if (t) return new FbFanComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get GearType() {
    return (
      this.YWh ||
        ((this.YWh = !0), (this.zWh = this.FbDataInternal.gearType())),
      this.zWh
    );
  }
  get InteractType() {
    var t, i;
    return (
      !this.JWh &&
        ((this.JWh = !0),
        (t = this.FbDataInternal.interactTypeType()),
        (i =
          UnionFanInteractOptionHelper_1.UnionFanInteractOptionHelper.GetUnionFanInteractOptionObject(
            t,
          ))) &&
        (this.ZWh =
          UnionFanInteractOptionHelper_1.UnionFanInteractOptionHelper.ReadUnionFanInteractOption(
            t,
            this.FbDataInternal.interactType(i),
          )),
      this.ZWh
    );
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
  get RotateActor() {
    return (
      this.eQh ||
        ((this.eQh = !0), (this.tQh = this.FbDataInternal.rotateActor())),
      this.tQh
    );
  }
  get OffsetActor() {
    return (
      this.iQh ||
        ((this.iQh = !0), (this.rQh = this.FbDataInternal.offsetActor())),
      this.rQh
    );
  }
  get CirclePerRound() {
    return (
      this.oQh ||
        ((this.oQh = !0), (this.nQh = this.FbDataInternal.circlePerRound())),
      this.nQh
    );
  }
  get InitCircle() {
    return (
      this.sQh ||
        ((this.sQh = !0), (this.aQh = this.FbDataInternal.initCircle())),
      this.aQh
    );
  }
  get TargetEntityId() {
    return (
      this.Vvh ||
        ((this.Vvh = !0), (this.jvh = this.FbDataInternal.targetEntityId())),
      this.jvh
    );
  }
  get EffectConfig() {
    return (
      this.hQh ||
        ((this.hQh = !0),
        (this.lQh = FbFanEffectConfig_1.FbFanEffectConfig.Create(
          this.FbDataInternal.effectConfig(),
        ))),
      this.lQh
    );
  }
  get EffectByState() {
    if (!this._Qh) {
      (this._Qh = !0), (this.cQh = new Array());
      var i = this.FbDataInternal.effectByStateLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.effectByState(
            t,
            new fb_component_1.FanStateEffect(),
          );
          this.cQh.push(FbFanStateEffect_1.FbFanStateEffect.Create(s));
        }
    }
    return this.cQh;
  }
}
exports.FbFanComponent = FbFanComponent;
//# sourceMappingURL=FbFanComponent.js.map
