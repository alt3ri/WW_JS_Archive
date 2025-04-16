"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundWeeklyRogueItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundWeeklyRogueItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
    ];
  }
  Update(e) {
    var a =
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig(),
      t = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Score;
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "PrefabTextItem_1382682910_Text",
      t,
      a.MaxScore,
    );
  }
}
exports.NewSoundWeeklyRogueItem = NewSoundWeeklyRogueItem;
//# sourceMappingURL=NewSoundWeeklyRogueItem.js.map
