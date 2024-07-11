"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventChangePhantomFormation = void 0);
const Log_1 = require("../../Core/Common/Log");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelGeneralBase_1 = require("./LevelGeneralBase");
class LevelEventChangePhantomFormation extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.dLe = () => {
        const e = ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            49,
            "[ChangePhantomFormation] 队伍更新完成",
            ["isPhantom", e],
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnUpdateSceneTeam,
            this.dLe,
          ),
          this.FinishExecute(e);
      });
  }
  ExecuteInGm(e, n) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, n) {
    e || this.FinishExecute(!1);
    e = ModelManager_1.ModelManager.SceneTeamModel;
    e.IsPhantomTeam && e.IsTeamReady
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            49,
            "[ChangePhantomFormation] 当前已是声骸队伍",
          ),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            49,
            "[ChangePhantomFormation] 开始等待队伍更新",
          ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.dLe,
        ));
  }
}
exports.LevelEventChangePhantomFormation = LevelEventChangePhantomFormation;
// # sourceMappingURL=LevelEventChangePhantomFormation.js.map
