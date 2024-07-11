"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RepeatKeyTipsView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RepeatKeyTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.QPi = void 0),
      (this.XPi = void 0),
      (this.oPi = 0),
      (this.$Pi = void 0),
      (this.YPi = !1),
      (this.CAi = () => {
        (this.YPi = !0), this.CloseMe();
      }),
      (this.gAi = () => {
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
        [6, this.CAi],
        [7, this.gAi],
      ]);
  }
  OnStart() {
    var i,
      t,
      s,
      h = this.OpenParam,
      h =
        ((this.QPi = h.CurrentKeySettingRowData),
        (this.XPi = h.RepeatKeySettingRowData),
        (this.oPi = h.InputControllerType),
        (this.$Pi = h.OnCloseCallback),
        this.QPi.GetCurrentKeyName(this.oPi));
    h &&
      ((h = this.QPi.GetSettingName()),
      (i = this.QPi.GetCurrentKeyNameRichText(this.oPi)),
      (t = this.XPi.GetSettingName()),
      (s = this.XPi.GetCurrentKeyNameRichText(this.oPi)),
      this.GetText(1)?.SetText(i),
      this.GetText(4)?.SetText(s),
      this.GetText(5)?.SetText(i),
      this.GetText(2)?.SetText(s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), h),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t));
  }
  OnBeforeDestroy() {
    this.$Pi && this.$Pi(this.YPi),
      (this.QPi = void 0),
      (this.XPi = void 0),
      (this.oPi = 0),
      (this.$Pi = void 0);
  }
}
exports.RepeatKeyTipsView = RepeatKeyTipsView;
//# sourceMappingURL=RepeatKeyTipsView.js.map
