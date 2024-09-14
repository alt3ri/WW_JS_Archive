"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RepeatKeyTipsView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
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
    var i = this.OpenParam,
      i =
        ((this.Qxi = i.CurrentKeySettingRowData),
        (this.Xxi = i.RepeatKeySettingRowData),
        (this.oxi = i.InputControllerType),
        (this.$xi = i.OnCloseCallback),
        this.Qxi.GetSettingName()),
      t = this.Qxi.GetCurrentKeyNameRichText(this.oxi),
      s = this.Xxi.GetSettingName(),
      e = this.Xxi.GetCurrentKeyNameRichText(this.oxi);
    StringUtils_1.StringUtils.IsBlank(t)
      ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "NoneText"),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "NoneText"))
      : (this.GetText(1)?.SetText(t), this.GetText(5)?.SetText(t)),
      this.GetText(4)?.SetText(e),
      this.GetText(2)?.SetText(e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s);
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
