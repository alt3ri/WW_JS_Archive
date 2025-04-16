"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPreloadRole = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  WAITE_ENTITY_PRELOAD_TIME = 6e4;
class LevelEventPreloadRole extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, o) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, o) {
    var e = e.PreloadObjectType,
      r = e.Type,
      a = [];
    if ("PreloadTrialCharacterForSkill" === r)
      for (const n of e.CharacterGroupNew) a.push(n.CharacterId);
    else if ("PreloadPhantomCharacterForSkill" === r) {
      (r = e.Id),
        (e = PhantomFormationById_1.configPhantomFormationById.GetConfig(r));
      if (e) for (const i of e.Roles) a.push(i);
    }
    var t = [];
    for (const s of a) {
      var l =
        ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(s);
      l && t.push(l[0]);
    }
    t.length <= 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Event", 48, "[PreloadRole] 无预加载实体", [
            "RoleIdList",
            a,
          ]),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Event", 48, "[PreloadRole] 开始等待实体加载", [
            "CreatureDataIdList",
            t,
          ]),
        this.CreateWaitEntityTaskBigInt(t),
        WaitEntityTask_1.WaitEntityTask.Create(
          "LevelEventPreloadRole.ExecuteNew",
          t,
          (e) => {
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Event", 48, "[PreloadRole] 实体加载结束", [
                "Result",
                e,
              ]),
              this.FinishExecute(!0);
          },
          WAITE_ENTITY_PRELOAD_TIME,
        ));
  }
}
exports.LevelEventPreloadRole = LevelEventPreloadRole;
//# sourceMappingURL=LevelEventPreloadRole.js.map
