"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RepeatKeyTipsView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RepeatKeyTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Qxi = void 0),
      (this.Xxi = void 0),
      (this.oxi = 0),
      (this.$xi = void 0),
      (this.Yxi = !1),
      (this.CPi = () => {
        (this.Yxi = !0), this.CloseMe();
      }),
      (this.gPi = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [6, this.CPi],
        [7, this.gPi],
      ]);
  }
  OnStart() {
    var i,
      t,
      s,
      h = this.OpenParam,
      h =
        ((this.Qxi = h.CurrentKeySettingRowData),
        (this.Xxi = h.RepeatKeySettingRowData),
        (this.oxi = h.InputControllerType),
        (this.$xi = h.OnCloseCallback),
        this.Qxi.GetCurrentKeyName(this.oxi));
    h &&
      ((h = this.Qxi.GetSettingName()),
      (i = this.Qxi.GetCurrentKeyNameRichText(this.oxi)),
      (t = this.Xxi.GetSettingName()),
      (s = this.Xxi.GetCurrentKeyNameRichText(this.oxi)),
      this.GetText(1)?.SetText(i),
      this.GetText(4)?.SetText(s),
      this.GetText(5)?.SetText(i),
      this.GetText(2)?.SetText(s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), h),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t));
  }
  OnBeforeDestroy() {
    this.$xi && this.$xi(this.Yxi),
      (this.Qxi = void 0),
      (this.Xxi = void 0),
      (this.oxi = 0),
      (this.$xi = void 0);
  }
}
exports.RepeatKeyTipsView = RepeatKeyTipsView;
//# sourceMappingURL=RepeatKeyTipsView.js.map
