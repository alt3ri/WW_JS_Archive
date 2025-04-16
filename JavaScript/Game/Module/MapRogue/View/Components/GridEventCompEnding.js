"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridEventCompEnding = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class GridEventCompEnding extends UiPanelBase_1.UiPanelBase {
  constructor(e, i = 4) {
    super(),
      (this.StepId = e),
      (this.StepType = i),
      (this.CanInteractCallback = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  Refresh() {
    var e = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(
      this.StepId,
    );
    e &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TitleKey),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextKey),
      this.CanInteractCallback?.(this.StepId, this.StepType));
  }
}
exports.GridEventCompEnding = GridEventCompEnding;
//# sourceMappingURL=GridEventCompEnding.js.map
