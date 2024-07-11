"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsBurstView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
class BusinessTipsBurstView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        e.TriggerEventRoleId,
      );
    await this.SetTextureAsync(e.HeadIcon, this.GetTexture(0));
  }
  OnBeforeShow() {
    TimerSystem_1.TimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenResultView();
    }, 2e3);
  }
}
exports.BusinessTipsBurstView = BusinessTipsBurstView;
//# sourceMappingURL=BusinessTipsBurstView.js.map
