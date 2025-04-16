"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadIconEnergyBarCommon = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  HeadIconEnergyBarBase_1 = require("./HeadIconEnergyBarBase");
class HeadIconEnergyBarCommon extends HeadIconEnergyBarBase_1.HeadIconEnergyBarBase {
  constructor() {
    super(...arguments), (this.rdt = 0), (this.qE1 = 0), (this.DP_ = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart(),
      this.InitTweenAnim(3),
      this.InitTweenAnim(4),
      this.InitTweenAnim(5);
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      (this.rdt = this.PercentMachine.GetCurPercent()),
      this.Gdl(!0);
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Gdl(e = !1) {
    var s = this.PercentMachine.GetCurPercent();
    this.GetSprite(1)?.SetFillAmount(s),
      s > this.rdt && this.GE1(),
      this.FE1(1 <= s, e);
  }
  GE1() {
    var e = Time_1.Time.NowSeconds;
    e <= this.qE1 ||
      ((this.qE1 = e + this.Config.EffectCd), this.PlayTweenAnim(5));
  }
  FE1(e, s = !1) {
    (this.DP_ === e && !s) ||
      ((this.DP_ = e),
      this.DP_
        ? (this.StopTweenAnim(4), this.PlayTweenAnim(3))
        : (this.StopTweenAnim(3), this.PlayTweenAnim(4)));
  }
}
exports.HeadIconEnergyBarCommon = HeadIconEnergyBarCommon;
//# sourceMappingURL=HeadIconEnergyBarCommon.js.map
