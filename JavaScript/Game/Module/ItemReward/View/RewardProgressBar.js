"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardProgressBar = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ANIMATION_LENGTH = 500;
class RewardProgressBar extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.x0i = -0),
      (this.w0i = -0),
      (this.B0i = -0),
      (this.b0i = -0),
      (this.q0i = void 0),
      (this.G0i = []),
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
    (this.q0i = 0), (this.G0i.length = 0);
  }
  Refresh(t, i, s = ANIMATION_LENGTH) {
    let e;
    this.LBt(t),
      i &&
        i.length !== 0 &&
        (s <= 0
          ? (t = i[i.length - 1]) &&
            ((e = t.ToProgress),
            (t = t.MaxProgress),
            this.N0i(e, t),
            this.dkt(e, t))
          : this.PlayProgressAnimation(i, s));
  }
  PlayProgressAnimation(t, i = ANIMATION_LENGTH) {
    this.G0i = t;
    let s;
    let e;
    var t = this.G0i.shift();
    t &&
      ((s = t.FromProgress),
      (e = t.ToProgress),
      (t = t.MaxProgress),
      this.N0i(s, t),
      this.dkt(s, t),
      this.O0i(s, e, t, i));
  }
  O0i(t, i, s, e) {
    s < i
      ? (this.N0i(i, s), this.k0i(), this.dkt(i, s))
      : ((this.b0i = e),
        (this.q0i = e),
        (this.x0i = t),
        (this.w0i = i),
        (this.B0i = s));
  }
  Tick(t) {
    let i;
    void 0 !== this.q0i &&
      ((i = 1 - this.q0i / this.b0i),
      (i = MathUtils_1.MathUtils.Lerp(this.x0i, this.w0i, i)),
      this.N0i(Math.ceil(Math.min(i, this.w0i)), this.B0i),
      this.dkt(Math.min(i, this.w0i), this.B0i),
      this.q0i < 0 ? this.k0i() : (this.q0i -= t));
  }
  k0i() {
    (this.q0i = void 0),
      this.G0i.length > 0 && this.PlayProgressAnimation(this.G0i, this.b0i);
  }
  LBt(t) {
    const i = this.GetText(0);
    StringUtils_1.StringUtils.IsEmpty(t)
      ? i.SetUIActive(!1)
      : (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), i.SetUIActive(!0));
  }
  N0i(t, i) {
    this.GetText(1).SetText(Math.min(i, t) + "/" + i);
  }
  dkt(t, i) {
    this.GetSprite(2).SetFillAmount(t / i);
  }
}
exports.RewardProgressBar = RewardProgressBar;
// # sourceMappingURL=RewardProgressBar.js.map
