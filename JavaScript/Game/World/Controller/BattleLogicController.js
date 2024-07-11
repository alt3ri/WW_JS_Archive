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
  static ExecuteEntityLivingStatusNotify(e) {
    const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.J4n),
    );
    switch (
      (o?.Valid ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            20,
            "[CreatureController.EntityLivingStatusNotify] EntityLivingStatusNotify失败, Entity无效或不存在。",
            ["CreatureDataId", e.J4n],
          )),
      e.HEs)
    ) {
      case Protocol_1.Aki.Protocol.HEs.Proto_Dead: {
        this._0r(o);
        let t = !1;
        e.eRs.forEach((e) => {
          e.tRs &&
            e.q5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
            (o.Entity.Disable(
              "[BattleLogicController.BattleLogicController] 被收服的Entity先隐藏",
            ),
            (t = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CharOnRoleDead,
              o.Id,
            ),
            EventSystem_1.EventSystem.EmitWithTarget(
              o,
              EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
            ));
        }),
          t || o?.Entity?.GetComponent(15)?.ExecuteDeath();
        break;
      }
      case Protocol_1.Aki.Protocol.HEs.Proto_Alive:
        this.d0r(o);
    }
  }
  static d0r(e) {
    e?.Valid &&
      (e.IsInit
        ? e?.Entity?.GetComponent(175)?.ExecuteRevive()
        : e.Entity?.GetComponent(0)?.SetLivingStatus(
            Protocol_1.Aki.Protocol.HEs.Proto_Alive,
          ));
  }
  static _0r(e) {
    e = e.Entity.GetComponent(1)?.Owner;
    GlobalData_1.GlobalData.BpEventManager.当有角色死亡时.Broadcast(e);
  }
}
((exports.BattleLogicController = BattleLogicController).l0r = void 0),
  (BattleLogicController.u0r = void 0),
  (BattleLogicController.c0r = void 0),
  (BattleLogicController.m0r = void 0);
//# sourceMappingURL=BattleLogicController.js.map
