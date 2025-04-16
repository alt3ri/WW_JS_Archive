"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueEnvironmentTips = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueEnvironmentTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.tlo = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.tlo]]);
  }
  OnBeforeShow() {
    var e =
      ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      e.BuffDesc,
      ...e.BuffDescParam,
    );
  }
}
exports.WeeklyRogueEnvironmentTips = WeeklyRogueEnvironmentTips;
//# sourceMappingURL=WeeklyRogueEnvironmentTips.js.map
