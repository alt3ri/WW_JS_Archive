"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviourUiBlur = void 0);
const UE = require("ue"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiLayerType_1 = require("../../Define/UiLayerType"),
  UiManager_1 = require("../../UiManager"),
  UiBlurLogic_1 = require("./UiBlurLogic");
class UiBehaviourUiBlur {
  constructor() {
    (this.A_r = void 0), (this.CurrentView = void 0), (this.fXn = !1);
  }
  OnAfterUiStart() {
    0 != (this.A_r & UiLayerType_1.UIBLUR_TYPE) &&
      ((this.fXn = !0),
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView),
      UiBehaviourUiBlur.Gah.add(this.CurrentView.GetViewId()),
      this.kah());
  }
  OnAfterUiShow() {
    this.fXn &&
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView);
  }
  kah() {
    var e;
    this.fXn &&
      (e = Array.from(UiBehaviourUiBlur.Gah).pop()) &&
      (e = UiManager_1.UiManager.GetView(e)) &&
      (ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e.Info.Name)
        .PartialBlur
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.kuro.LGUIBlurTexture.save 1",
          )
        : UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.kuro.LGUIBlurTexture.save 0",
          ));
  }
  ChangeNeedBlurState(e) {
    this.fXn = e;
  }
  SetCurrentLayer(e) {
    this.A_r = e;
  }
  SetViewInfo(e) {
    this.CurrentView = e;
  }
  OnBeforeDestroy() {
    UiBehaviourUiBlur.Gah.delete(this.CurrentView.GetViewId()),
      this.kah(),
      this.fXn &&
        this.A_r === UiLayerType_1.ELayerType.Pop &&
        UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
  }
}
(exports.UiBehaviourUiBlur = UiBehaviourUiBlur).Gah = new Set();
//# sourceMappingURL=UiBehaviorUiBlur.js.map
