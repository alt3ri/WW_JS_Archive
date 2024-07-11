"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardProgressBar = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ANIMATION_LENGTH = 500;
class RewardProgressBar extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.xfi = -0),
      (this.wfi = -0),
      (this.Bfi = -0),
      (this.bfi = -0),
      (this.qfi = void 0),
      (this.Gfi = []),
      this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ]),
      (this.BtnBindInfo = []);
  }
  Clear() {
    (this.qfi = 0), (this.Gfi.length = 0);
  }
  Refresh(t, i, s = ANIMATION_LENGTH) {
    var e;
    this.Ubt(t),
      i &&
        0 !== i.length &&
        (s <= 0
          ? (t = i[i.length - 1]) &&
            ((e = t.ToProgress),
            (t = t.MaxProgress),
            this.Nfi(e, t),
            this.C2t(e, t))
          : this.PlayProgressAnimation(i, s));
  }
  PlayProgressAnimation(t, i = ANIMATION_LENGTH) {
    this.Gfi = t;
    var s,
      e,
      t = this.Gfi.shift();
    t &&
      ((s = t.FromProgress),
      (e = t.ToProgress),
      (t = t.MaxProgress),
      this.Nfi(s, t),
      this.C2t(s, t),
      this.Ofi(s, e, t, i));
  }
  Ofi(t, i, s, e) {
    s < i
      ? (this.Nfi(i, s), this.kfi(), this.C2t(i, s))
      : ((this.bfi = e),
        (this.qfi = e),
        (this.xfi = t),
        (this.wfi = i),
        (this.Bfi = s));
  }
  Tick(t) {
    var i;
    void 0 !== this.qfi &&
      ((i = 1 - this.qfi / this.bfi),
      (i = MathUtils_1.MathUtils.Lerp(this.xfi, this.wfi, i)),
      this.Nfi(Math.ceil(Math.min(i, this.wfi)), this.Bfi),
      this.C2t(Math.min(i, this.wfi), this.Bfi),
      this.qfi < 0 ? this.kfi() : (this.qfi -= t));
  }
  kfi() {
    (this.qfi = void 0),
      0 < this.Gfi.length && this.PlayProgressAnimation(this.Gfi, this.bfi);
  }
  Ubt(t) {
    var i = this.GetText(0);
    StringUtils_1.StringUtils.IsEmpty(t)
      ? i.SetUIActive(!1)
      : (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), i.SetUIActive(!0));
  }
  Nfi(t, i) {
    this.GetText(1).SetText(Math.min(i, t) + "/" + i);
  }
  C2t(t, i) {
    this.GetSprite(2).SetFillAmount(t / i);
  }
}
exports.RewardProgressBar = RewardProgressBar;
//# sourceMappingURL=RewardProgressBar.js.map
