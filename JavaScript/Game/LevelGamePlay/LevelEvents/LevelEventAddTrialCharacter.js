"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddTrialCharacter = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTrialCharacter extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.vLe = !1), (this.MLe = void 0);
  }
  ExecuteNew(e, r) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Event", 49, "[AddTrialEvent] 开始");
    this.vLe = e.AutoChange ?? !1;
    var t = e.ActiveRange;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (t && o) {
      const i = Vector_1.Vector.Create();
      var t = (i.FromConfigVector(t.CheckPoint), t.CheckEnterRange);
      var o = o.CheckGetComponent(3).ActorLocationProxy;
      if (Vector_1.Vector.DistSquared(o, i) > t * t)
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Event",
              49,
              "[AddTrialEvent] 当前角色不在试用范围内，完成",
            ),
          void this.FinishExecute(!0)
        );
    }
    o = e.CharacterGroup;
    !o || o.length <= 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Event", 49, "[AddTrialEvent] 无试用角色id，完成"),
        this.FinishExecute(!0))
      : ((this.MLe = o),
        this.SLe()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Event", 49, "[AddTrialEvent] 开始时编队已完成"),
            this.FinishExecute(!0))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Event",
              49,
              "[AddTrialEvent] 编队未完成，开始等待",
            ));
  }
  OnTick(e) {
    this.MLe &&
      this.SLe() &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Event", 49, "[AddTrialEvent] 编队完成"),
      this.FinishExecute(!0));
  }
  SLe() {
    if (!ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) return !1;
    for (const r of this.MLe) if (!this.TPr(r)) return !1;
    let e;
    return (
      !this.vLe ||
        (e = this.TPr(this.MLe[0])).IsControl() ||
        ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
          e.GetCreatureDataId(),
          !0,
          !1,
        ),
      !0
    );
  }
  TPr(e) {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
      !0,
    )) {
      let r = t.GetConfigId;
      if (!(r <= RoleDefine_1.ROBOT_DATA_MIN_ID)) {
        r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(r);
        if (r && r.GroupId === e) return t;
      }
    }
  }
}
exports.LevelEventAddTrialCharacter = LevelEventAddTrialCharacter;
// # sourceMappingURL=LevelEventAddTrialCharacter.js.map
