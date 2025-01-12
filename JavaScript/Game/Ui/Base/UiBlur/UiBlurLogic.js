"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBlurLogic = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  UiLayerType_1 = require("../../Define/UiLayerType"),
  UiModel_1 = require("../../UiModel");
class UiBlurLogic {
  static x_r(r) {
    if (r) {
      var i = r.GetOwner().GetComponentByClass(UE.TsUiBlur_C.StaticClass());
      let e = void 0;
      (e = i
        ? void 0 === i.OverrideItem
          ? r
          : i.OverrideItem.RootComponent
        : e)
        ? UE.LGUIBPLibrary.SetGlobalBlurUIItem(e, r.GetWorld())
        : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Blur", 11, "还原模糊"),
          UE.LGUIBPLibrary.ResetGlobalBlurUIItem(r.GetWorld()));
    }
  }
  static w_r(e) {
    return e.ChildPopView
      ? e.ChildPopView.GetPopViewRootItem()
      : e.GetRootItem();
  }
  static SetNormalUiRenderAfterBlur(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Blur", 11, "设置模糊", ["ViewName", e.Info.Name]),
      this.x_r(this.w_r(e));
  }
  static ResumeTopUiRenderAfterBlur() {
    var e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
    e?.IsShowOrShowing ||
    (e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal))
      ? this.SetNormalUiRenderAfterBlur(e)
      : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Blur", 11, "还原模糊"),
        UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
          GlobalData_1.GlobalData.GameInstance.GetWorld(),
        ));
  }
}
exports.UiBlurLogic = UiBlurLogic;
//# sourceMappingURL=UiBlurLogic.js.map
