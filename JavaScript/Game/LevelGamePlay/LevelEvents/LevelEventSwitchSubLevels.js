"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSwitchLevels = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSwitchLevels extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.WRe = (e) => {
        e && this.FinishExecute(!0);
      });
  }
  ExecuteNew(e, r) {
    if (e) {
      var t = e;
      switch (t.Type) {
        case IAction_1.ESwitchSubLevelsType.Directly:
          this.KRe(t);
          break;
        case IAction_1.ESwitchSubLevelsType.Preload:
          this.QRe(t);
      }
    }
  }
  QRe(e) {
    ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()
      ? this.FinishExecute(!0)
      : ControllerHolder_1.ControllerHolder.GameModeController.PreloadSubLevel(
          e.PreloadLevels,
        ).then(() => {
          this.FinishExecute(!0);
        });
  }
  KRe(e) {
    let r = void 0,
      t = void 0;
    if (e.TeleportEntityId) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
        e.TeleportEntityId,
      );
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            3,
            "[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
            ["TeleportEntityId", e.TeleportEntityId],
          )
        );
      var i = o.Transform.Pos,
        i =
          (i && (r = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0)),
          o.Transform.Rot);
      i && (t = Rotator_1.Rotator.Create(i.Y ?? 0, i.Z ?? 0, i.X ?? 0));
    }
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      if (ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip)
        return void this.WRe(!0);
      (r = void 0), (t = void 0);
    }
    ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
      e.UnloadLevels,
      e.LoadLevels,
      0,
      r,
      t,
      this.WRe,
    );
  }
}
exports.LevelEventSwitchLevels = LevelEventSwitchLevels;
//# sourceMappingURL=LevelEventSwitchSubLevels.js.map
