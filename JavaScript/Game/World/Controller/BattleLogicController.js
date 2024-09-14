"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleLogicController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager");
class BattleLogicController extends ControllerBase_1.ControllerBase {
  static ExecuteEntityLivingStatusNotify(t) {
    const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(t.s5n),
    );
    switch (
      (o?.Valid ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            20,
            "[CreatureController.EntityLivingStatusNotify] EntityLivingStatusNotify失败, Entity无效或不存在。",
            ["CreatureDataId", t.s5n],
          )),
      t.JEs)
    ) {
      case Protocol_1.Aki.Protocol.JEs.Proto_Dead: {
        this.l0r.Start(), this._0r(o), this.l0r.Stop();
        let e = !1;
        t.aRs.forEach((t) => {
          t.hRs &&
            t.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
            (this.u0r.Start(),
            o.Entity.Disable(
              "[BattleLogicController.BattleLogicController] 被收服的Entity先隐藏",
            ),
            this.u0r.Stop(),
            (e = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CharOnRoleDead,
              o.Id,
            ),
            EventSystem_1.EventSystem.EmitWithTarget(
              o,
              EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
            ));
        }),
          e ||
            (this.c0r.Start(),
            o?.Entity?.GetComponent(15)?.ExecuteDeath(),
            this.c0r.Stop());
        break;
      }
      case Protocol_1.Aki.Protocol.JEs.Proto_Alive:
        this.m0r.Start(), this.d0r(o), this.m0r.Stop();
    }
  }
  static d0r(t) {
    t?.Valid &&
      (t.IsInit
        ? t?.Entity?.GetComponent(176)?.ExecuteRevive()
        : t.Entity?.GetComponent(0)?.SetLivingStatus(
            Protocol_1.Aki.Protocol.JEs.Proto_Alive,
          ));
  }
  static _0r(t) {
    t = t.Entity.GetComponent(1)?.Owner;
    GlobalData_1.GlobalData.BpEventManager.当有角色死亡时.Broadcast(t);
  }
}
((exports.BattleLogicController = BattleLogicController).l0r =
  Stats_1.Stat.Create(
    "BattleLogicController.BroadcastDeadStat",
    "",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BattleLogicController.u0r = Stats_1.Stat.Create(
    "BattleLogicController.DisableEntityStat",
    "",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BattleLogicController.c0r = Stats_1.Stat.Create(
    "BattleLogicController.ExecuteDeadLogicStat",
    "",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BattleLogicController.m0r = Stats_1.Stat.Create(
    "BattleLogicController.ExecuteReviveLogicStat",
    "",
    StatDefine_1.BATTLESTAT_GROUP,
  ));
//# sourceMappingURL=BattleLogicController.js.map
