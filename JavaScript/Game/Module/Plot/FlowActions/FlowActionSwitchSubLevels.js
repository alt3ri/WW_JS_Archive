"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSwitchSubLevels = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSwitchSubLevels extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.WRe = (e) => {
        e && this.FinishExecute(!0);
      });
  }
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e)
      if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode())
        this.FinishExecute(!0);
      else
        switch (e.Type) {
          case IAction_1.ESwitchSubLevelsType.Directly:
            this.KRe(e);
            break;
          case IAction_1.ESwitchSubLevelsType.Preload:
            this.QRe(e);
        }
  }
  QRe(e) {
    ControllerHolder_1.ControllerHolder.GameModeController.PreloadSubLevel(
      e.PreloadLevels,
    ),
      this.FinishExecute(!0);
  }
  KRe(e) {
    let r = void 0,
      o = void 0;
    if (e.TeleportEntityId) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
        e.TeleportEntityId,
      );
      if (!t)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            3,
            "[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
            ["TeleportEntityId", e.TeleportEntityId],
          )
        );
      var i = t.Transform.Pos,
        i =
          (i && (r = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0)),
          t.Transform.Rot);
      i && (o = Rotator_1.Rotator.Create(i.Y ?? 0, i.Z ?? 0, i.X ?? 0));
    }
    ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
      e.UnloadLevels,
      e.LoadLevels,
      0,
      r,
      o,
      this.WRe,
    );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSwitchSubLevels = FlowActionSwitchSubLevels;
//# sourceMappingURL=FlowActionSwitchSubLevels.js.map
