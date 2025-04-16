"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingProgressItem = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PROGRESS_START_ANGLE = -77,
  PROGRESS_END_ANGLE = 0,
  PAUSE_TIME = 0,
  MIN_ANIM_TIME = 100;
class FishingProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GameConfig = void 0),
      (this.GameInfo = void 0),
      (this.cce = Rotator_1.Rotator.Create()),
      (this.hc_ = Rotator_1.Rotator.Create()),
      (this.qt_ = void 0),
      (this.kt_ = void 0),
      (this.lc_ = void 0),
      (this._c_ = void 0),
      (this.cc_ = !1),
      (this.Vbn = 0),
      (this.uc_ = 0),
      (this.K1t = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  Init(t, s) {
    (this.GameInfo = s),
      (this.GameConfig = t),
      (this.K1t = Math.max(t.HitColdTime, MIN_ANIM_TIME));
  }
  OnStart() {
    (this.qt_ = this.GetItem(1)),
      (this.kt_ = this.GetItem(3)),
      (this.lc_ = this.GetItem(4)),
      (this._c_ = this.GetItem(2));
  }
  OnBeforeDestroy() {
    (this.qt_ = void 0), (this.kt_ = void 0), (this._c_ = void 0);
  }
  OnTick(t) {
    var s = this.dc_();
    this.mc_(s, t), this.Nqe(s);
  }
  Nqe(t) {
    var s = Math.ceil(100 * t);
    this.GetText(0).SetText(s + "%"),
      (this.cce.Yaw = MathUtils_1.MathUtils.Lerp(
        PROGRESS_START_ANGLE,
        PROGRESS_END_ANGLE,
        t,
      )),
      this.qt_?.SetUIRelativeRotation(this.cce.ToUeRotator()),
      this.kt_?.SetUIRelativeRotation(this.cce.ToUeRotator()),
      this.lc_?.SetUIRelativeRotation(this.cce.ToUeRotator());
  }
  mc_(t, s) {
    let i = t;
    this.cc_ &&
      ((this.Vbn += s),
      (i =
        PAUSE_TIME < this.Vbn && this.Vbn <= PAUSE_TIME + this.K1t
          ? ((s = (this.Vbn - PAUSE_TIME) / this.K1t),
            MathUtils_1.MathUtils.Lerp(this.uc_, t, s))
          : ((this.cc_ = !1), t))),
      (this.hc_.Yaw = MathUtils_1.MathUtils.Lerp(
        PROGRESS_START_ANGLE,
        PROGRESS_END_ANGLE,
        i,
      )),
      this._c_?.SetUIRelativeRotation(this.hc_.ToUeRotator());
  }
  dc_() {
    var t = this.GameInfo.CurrentScore,
      s = this.GameConfig.MaxScore;
    return MathUtils_1.MathUtils.Clamp(t / s, 0, 1);
  }
  StartAnimProgress() {
    (this.uc_ = this.dc_()), (this.Vbn = 0), (this.cc_ = !0);
  }
  EnterNextRound() {
    this.uc_ = 0;
  }
}
exports.FishingProgressItem = FishingProgressItem;
//# sourceMappingURL=FishingProgressItem.js.map
