"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddTrialCharacter = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTrialCharacter extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.vLe = !1), (this.MLe = void 0);
  }
  ExecuteInGm(e, r) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, r) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Event", 49, "[AddTrialEvent] 开始");
    this.vLe = e.AutoChange ?? !1;
    var t = e.ActiveRange,
      o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (t && o) {
      var i = Vector_1.Vector.Create(),
        t = (i.FromConfigVector(t.CheckPoint), t.CheckEnterRange),
        o = o.CheckGetComponent(3).ActorLocationProxy;
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
        this.ELe()
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
      this.ELe() &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Event", 49, "[AddTrialEvent] 编队完成"),
      this.FinishExecute(!0));
  }
  ELe() {
    if (!ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) return !1;
    for (const r of this.MLe) if (!this.tPr(r)) return !1;
    var e;
    return (
      !this.vLe ||
        (e = this.tPr(this.MLe[0])).IsControl() ||
        ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
          e.GetCreatureDataId(),
        ),
      !0
    );
  }
  tPr(e) {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
      !0,
    )) {
      var r = t.GetConfigId;
      if (!(r <= RoleDefine_1.ROBOT_DATA_MIN_ID)) {
        r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(r);
        if (r && r.GroupId === e) return t;
      }
    }
  }
}
exports.LevelEventAddTrialCharacter = LevelEventAddTrialCharacter;
//# sourceMappingURL=LevelEventAddTrialCharacter.js.map
