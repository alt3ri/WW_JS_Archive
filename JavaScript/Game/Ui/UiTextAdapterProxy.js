"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTextAdapterProxy = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  TickSystem_1 = require("../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  Global_1 = require("../Global"),
  LguiUtil_1 = require("../Module/Util/LguiUtil"),
  FONT_SIZE = 38,
  DELAY_REFRESH_TIME = 100;
class UiTextAdapterProxy {
  constructor(t) {
    (this.BindText = t),
      (this.$Js = 0),
      (this.DefaultToggleItemHeight = 0),
      (this.Qoa = void 0),
      (this.Rqe = void 0),
      (this.hMa = void 0),
      (this.E1a = !0),
      (this.lMa = void 0),
      (this.wbc = void 0),
      (this.dua = () => {
        var t = Global_1.Global.CharacterController,
          i = (0, puerts_1.$ref)(0),
          s = (0, puerts_1.$ref)(0),
          t = (t.GetViewportSize(i, s), (0, puerts_1.$unref)(i)),
          i = (0, puerts_1.$unref)(s);
        return new UE.IntPoint(t, i);
      }),
      (this.J_ = () => {
        var t = this.dua();
        (this.hMa?.X === t.X && this.hMa?.Y === t.Y) ||
          ((this.hMa = t), this.y1a());
      });
  }
  Init() {
    (this.wbc = this.BindText.GetOwner().GetUIItem().GetParentAsUIItem()),
      (this.Qoa = this.wbc
        .GetOwner()
        .GetComponentByClass(UE.UISizeControlByOther.StaticClass())),
      (this.$Js = this.BindText.GetSize()),
      (this.DefaultToggleItemHeight = this.wbc.GetHeight()),
      (this.hMa = this.dua()),
      this.StartTick();
  }
  SetLocalText(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.BindText, t, i), this.kf1();
  }
  SetText(t) {
    this.BindText.SetText(t), this.kf1();
  }
  kf1() {
    this.lMa ||
      (this.lMa = TimerSystem_1.TimerSystem.Delay(() => {
        this.y1a(), (this.lMa = void 0);
      }, DELAY_REFRESH_TIME));
  }
  StartTick() {
    this.StopTick(),
      (this.Rqe = TickSystem_1.TickSystem.Add(
        this.J_,
        "UiTextSizeFitter." + this.BindText.GetName(),
      ));
  }
  StopTick() {
    this.Rqe &&
      (TickSystem_1.TickSystem.Remove(this.Rqe.Id), (this.Rqe = void 0));
  }
  Clear() {
    this.StopTick(),
      this.lMa &&
        TimerSystem_1.TimerSystem.Has(this.lMa) &&
        (TimerSystem_1.TimerSystem.Remove(this.lMa), (this.lMa = void 0));
  }
  y1a() {
    var t;
    this.BindText &&
      this.wbc &&
      (this.BindText.GetRealSize(),
      (t = this.BindText.GetRenderLineNum() < 2),
      this.E1a !== t) &&
      ((this.E1a = t),
      this.E1a
        ? (this.Qoa?.SetControlHeight(!1),
          this.BindText.SetFontSize(this.$Js),
          this.BindText.GetRealSize(),
          this.BindText.GetRenderLineNum() < 2 ||
            this.BindText.SetFontSize(FONT_SIZE),
          this.wbc?.SetHeight(this.DefaultToggleItemHeight))
        : (this.BindText.SetFontSize(FONT_SIZE),
          this.Qoa?.SetControlHeight(!0),
          this.BindText.SetFontSize(FONT_SIZE),
          this.BindText.GetRealSize(),
          this.BindText.GetRenderLineNum() < 2
            ? (this.Qoa?.SetControlHeight(!1), (this.E1a = !0))
            : this.Qoa?.SetControlHeight(!0)));
  }
}
exports.UiTextAdapterProxy = UiTextAdapterProxy;
//# sourceMappingURL=UiTextAdapterProxy.js.map
