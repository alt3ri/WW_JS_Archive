"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityStateComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbLockConfig_1 = require("./FbLockConfig"),
  FbStateChangeBehavior_1 = require("./FbStateChangeBehavior"),
  FbStateConfig_1 = require("./FbStateConfig"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityStateComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.DUh = !1),
      (this.BUh = void 0),
      (this.qUh = !1),
      (this.kUh = void 0),
      (this.HG_ = !1),
      (this.$G_ = !1),
      (this.GUh = !1),
      (this.OUh = void 0),
      (this.FUh = !1),
      (this.NUh = void 0),
      (this.VUh = !1),
      (this.jUh = void 0),
      (this.HUh = !1),
      (this.WUh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityStateComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get StateChangeCondition() {
    return (
      this.DUh ||
        ((this.DUh = !0),
        (this.BUh = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.stateChangeCondition(),
        ))),
      this.BUh
    );
  }
  get StateChangeBehaviors() {
    if (!this.qUh) {
      (this.qUh = !0), (this.kUh = new Array());
      var i = this.FbDataInternal.stateChangeBehaviorsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stateChangeBehaviors(
            t,
            new fb_component_1.StateChangeBehavior(),
          );
          this.kUh.push(
            FbStateChangeBehavior_1.FbStateChangeBehavior.Create(s),
          );
        }
    }
    return this.kUh;
  }
  get InstantActionsOnStateChange() {
    return (
      this.HG_ ||
        ((this.HG_ = !0),
        (this.$G_ = this.FbDataInternal.instantActionsOnStateChange())),
      this.$G_
    );
  }
  get LockConfig() {
    return (
      this.GUh ||
        ((this.GUh = !0),
        (this.OUh = FbLockConfig_1.FbLockConfig.Create(
          this.FbDataInternal.lockConfig(),
        ))),
      this.OUh
    );
  }
  get StateConfigs() {
    if (!this.FUh) {
      (this.FUh = !0), (this.NUh = new Array());
      var i = this.FbDataInternal.stateConfigsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stateConfigs(
            t,
            new fb_component_1.StateConfig(),
          );
          this.NUh.push(FbStateConfig_1.FbStateConfig.Create(s));
        }
    }
    return this.NUh;
  }
  get CycleStates() {
    if (!this.VUh) {
      (this.VUh = !0), (this.jUh = new Array());
      var i = this.FbDataInternal.cycleStatesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.jUh.push(this.FbDataInternal.cycleStates(t));
    }
    return this.jUh;
  }
  get PrefabPerformanceType() {
    return (
      this.HUh ||
        ((this.HUh = !0),
        (this.WUh = this.FbDataInternal.prefabPerformanceType())),
      this.WUh
    );
  }
}
exports.FbEntityStateComponent = FbEntityStateComponent;
//# sourceMappingURL=FbEntityStateComponent.js.map
