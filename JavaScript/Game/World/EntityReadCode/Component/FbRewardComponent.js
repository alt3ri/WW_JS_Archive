"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRewardComponent = void 0);
const FbRewardRefreshConfig_1 = require("./FbRewardRefreshConfig");
class FbRewardComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.UBh = !1),
      (this.DBh = 0),
      (this.BBh = !1),
      (this.qBh = void 0),
      (this.kBh = !1),
      (this.GBh = void 0),
      (this.CPc = !1),
      (this.pPc = void 0);
  }
  static Create(t) {
    if (t) return new FbRewardComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get RewardId() {
    return (
      this.UBh ||
        ((this.UBh = !0), (this.DBh = this.FbDataInternal.rewardId())),
      this.DBh
    );
  }
  get RewardType() {
    return (
      this.BBh ||
        ((this.BBh = !0), (this.qBh = this.FbDataInternal.rewardType())),
      this.qBh
    );
  }
  get DropOnEvent() {
    return (
      this.kBh ||
        ((this.kBh = !0), (this.GBh = this.FbDataInternal.dropOnEvent())),
      this.GBh
    );
  }
  get RefreshConfig() {
    return (
      this.CPc ||
        ((this.CPc = !0),
        (this.pPc = FbRewardRefreshConfig_1.FbRewardRefreshConfig.Create(
          this.FbDataInternal.refreshConfig(),
        ))),
      this.pPc
    );
  }
}
exports.FbRewardComponent = FbRewardComponent;
//# sourceMappingURL=FbRewardComponent.js.map
