"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassUpLevelView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
class BattlePassUpLevelView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    const e = ModelManager_1.ModelManager.BattlePassModel.BattlePassLevel;
    const i = this.OpenParam.IncreasedLevel;
    this.GetText(1).SetText(e.toString()),
      this.GetText(0).SetText((e - i).toString()),
      TimerSystem_1.TimerSystem.Delay(() => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }, 2e3);
  }
  OnAfterHide() {
    this.OpenParam.FirstUnlockPass &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
      );
  }
}
exports.BattlePassUpLevelView = BattlePassUpLevelView;
// # sourceMappingURL=BattlePassUpLevelView.js.map
