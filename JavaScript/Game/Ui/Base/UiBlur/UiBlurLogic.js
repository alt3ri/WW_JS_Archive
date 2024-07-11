"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBlurLogic = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const UiLayerType_1 = require("../../Define/UiLayerType");
const UiModel_1 = require("../../UiModel");
class UiBlurLogic {
  static b1r(r) {
    if (r) {
      const i = r.GetOwner().GetComponentByClass(UE.TsUiBlur_C.StaticClass());
      let e = void 0;
      (e = i
        ? void 0 === i.OverrideItem
          ? r
          : i.OverrideItem.RootComponent
        : e)
        ? UE.LGUIBPLibrary.SetGlobalBlurUIItem(e, r.GetWorld())
        : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Blur", 11, "还原模糊"),
          UE.LGUIBPLibrary.ResetGlobalBlurUIItem(r.GetWorld()));
    }
  }
  static q1r(e) {
    return e.ChildPopView
      ? e.ChildPopView.GetPopViewRootItem()
      : e.GetRootItem();
  }
  static SetNormalUiRenderAfterBlur(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Blur", 11, "设置模糊", ["ViewName", e.Info.Name]),
      this.b1r(this.q1r(e));
  }
  static ResumeTopUiRenderAfterBlur() {
    let e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
    e?.IsShowOrShowing ||
    (e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal))
      ? this.SetNormalUiRenderAfterBlur(e)
      : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Blur", 11, "还原模糊"),
        UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
          GlobalData_1.GlobalData.GameInstance.GetWorld(),
        ));
  }
}
exports.UiBlurLogic = UiBlurLogic;
// # sourceMappingURL=UiBlurLogic.js.map
