"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSlideRailComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbExchangeSlideRailConfig_1 = require("./FbExchangeSlideRailConfig");
class FbSlideRailComponent {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.dqc = !1),
      (this.mqc = 0),
      (this.fqc = !1),
      (this.gqc = 0),
      (this.Cqc = !1),
      (this.pqc = void 0);
  }
  static Create(i) {
    if (i) return new FbSlideRailComponent(i);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SlideSpeed() {
    return (
      this.dqc ||
        ((this.dqc = !0), (this.mqc = this.FbDataInternal.slideSpeed())),
      this.mqc
    );
  }
  get RailSplineEntityId() {
    return (
      this.fqc ||
        ((this.fqc = !0),
        (this.gqc = this.FbDataInternal.railSplineEntityId())),
      this.gqc
    );
  }
  get ExchangeRailConfigs() {
    if (!this.Cqc) {
      (this.Cqc = !0), (this.pqc = new Array());
      var t = this.FbDataInternal.exchangeRailConfigsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.exchangeRailConfigs(
            i,
            new fb_component_1.ExchangeSlideRailConfig(),
          );
          this.pqc.push(
            FbExchangeSlideRailConfig_1.FbExchangeSlideRailConfig.Create(e),
          );
        }
    }
    return this.pqc;
  }
}
exports.FbSlideRailComponent = FbSlideRailComponent;
//# sourceMappingURL=FbSlideRailComponent.js.map
