"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpGotoLevelPlay = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AsyncTask_1 = require("../../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGotoLevelPlay extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(),
      (this.StepSize = 1),
      (this.SelectIndex = -1),
      (this.OnRogueSubLevelNotify = (s, i) => {
        var e = new AsyncTask_1.AsyncTask(
          "RogueBattleSubLevelNotify",
          async () => {
            ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
            const o = s.fL_,
              r = s.mL_;
            var e = Vector_1.Vector.Create(s.iPs, s.rPs, s.gqs),
              t = new UE.Rotator(0, s.fqs, 0);
            await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
              15,
              3,
            );
            const a = new CustomPromise_1.CustomPromise();
            return (
              ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(
                o,
                r,
                0,
                e,
                t,
                (e) => {
                  e
                    ? a.SetResult(!0)
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "RogueBattle",
                          34,
                          "常驻肉鸽子关卡切换失败",
                          ["unloads", o],
                          ["newLoads", r],
                        ),
                      (this.OpExecuteClientId = 0),
                      this.Execute(i));
                },
              ),
              await Promise.all([
                a.Promise,
                UiManager_1.UiManager.CloseViewAsync("RogueBattleTeamEditView"),
              ]),
              (this.OpExecuteClientId = 1),
              this.Execute(i),
              await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                15,
                1,
              ),
              !0
            );
          },
        );
        TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
      });
  }
  ToString() {
    return `[LevelPlay] IncId:${this.IncId} Step:` + this.CurrentStep;
  }
  OnStartExecute(e) {
    this.Data.sr1.pr1
      ? UiManager_1.UiManager.OpenView("RogueBattleTeamEditView", this.IncId)
      : this.Execute(e);
  }
  OnExecute(e) {
    this.OnRogueSubLevelNotify(this.Data.sr1.qUc, e);
  }
  OnFinish(e) {}
}
exports.MapRogueOpGotoLevelPlay = MapRogueOpGotoLevelPlay;
//# sourceMappingURL=MapRogueOpGotoLevelPlay.js.map
