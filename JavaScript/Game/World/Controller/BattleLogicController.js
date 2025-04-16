"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, a) {
    var r,
      i = arguments.length,
      l =
        i < 3
          ? e
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(e, o))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(t, e, o, a);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (r = t[n]) && (l = (i < 3 ? r(l) : 3 < i ? r(e, o, l) : r(e, o)) || l);
    return 3 < i && l && Object.defineProperty(e, o, l), l;
  };
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
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../Utils/CombatLog");
class BattleLogicController extends ControllerBase_1.ControllerBase {
  static ExecuteEntityLivingStatus(o, t, e) {
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(o.Id);
    if (a) {
      var r = MathUtils_1.MathUtils.LongToBigInt(e?.$8n ?? 0);
      MathUtils_1.MathUtils.LongToBigInt(e?.X8n ?? 0);
      switch (t.JEs) {
        case Protocol_1.Aki.Protocol.JEs.Proto_Dead: {
          this.l0r.Start(), this._0r(a), this.l0r.Stop();
          let e = !1;
          t.aRs.forEach((t) => {
            t.hRs &&
              t.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
              (this.u0r.Start(),
              o.GetComponent(178)?.DetachFromHost(!0, !1, !1),
              o.Disable(
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
              o.GetComponent(15)?.ExecuteDeath(r),
              this.c0r.Stop());
          break;
        }
        case Protocol_1.Aki.Protocol.JEs.Proto_Alive:
          this.m0r.Start(), this.d0r(a), this.m0r.Stop();
          break;
        case Protocol_1.Aki.Protocol.JEs.Proto_Init:
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          19,
          "[CreatureController.EntityLivingStatusNotify] EntityLivingStatusNotify失败, Entity无效或不存在。",
          ["CreatureDataId", t.s5n],
        );
  }
  static OnEntityLivingStatusNotify(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(t.s5n),
    );
    e?.Valid && e.Entity
      ? this.ExecuteEntityLivingStatus(e.Entity, t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          19,
          "[CreatureController.EntityLivingStatusNotify] EntityLivingStatusNotify失败, Entity无效或不存在。",
          ["CreatureDataId", t.s5n],
        );
  }
  static d0r(t) {
    t?.Valid &&
      (t.IsInit
        ? t?.Entity?.GetComponent(189)?.ExecuteRevive()
        : t.Entity?.GetComponent(0)?.SetLivingStatus(
            Protocol_1.Aki.Protocol.JEs.Proto_Alive,
          ));
  }
  static _0r(t) {
    t = t.Entity.GetComponent(1)?.Owner;
    GlobalData_1.GlobalData.BpEventManager.当有角色死亡时.Broadcast(t);
  }
}
(BattleLogicController.l0r = Stats_1.Stat.Create(
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
  )),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("qus", !0)],
    BattleLogicController,
    "ExecuteEntityLivingStatus",
    null,
  ),
  (exports.BattleLogicController = BattleLogicController);
//# sourceMappingURL=BattleLogicController.js.map
