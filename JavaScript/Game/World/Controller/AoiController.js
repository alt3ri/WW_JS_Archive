"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AoiController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
  MonsterSizeIdById_1 = require("../../../Core/Define/ConfigQuery/MonsterSizeIdById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class AoiController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(5905, AoiController.Jgr),
      Net_1.Net.Register(28605, AoiController.zgr),
      Net_1.Net.Register(16692, AoiController.Zgr),
      Net_1.Net.Register(17140, AoiController.e0r),
      Net_1.Net.Register(17282, AoiController.t0r),
      Net_1.Net.Register(22720, AoiController.i0r),
      Net_1.Net.Register(20522, AoiController.o0r),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(5905),
      Net_1.Net.UnRegister(28605),
      Net_1.Net.UnRegister(16692),
      Net_1.Net.UnRegister(17140),
      Net_1.Net.UnRegister(17282),
      Net_1.Net.UnRegister(22720),
      Net_1.Net.UnRegister(20522),
      !0
    );
  }
  static r0r(e, o, r) {
    let t = 0;
    if (
      (0 === r.CallbackCount ? (r.IsFinished = !1) : (t = r.UserData),
      t >= e.length)
    )
      r.IsFinished = !0;
    else {
      e = e[t];
      if (((r.UserData = ++t), e)) {
        var l = MathUtils_1.MathUtils.LongToNumber(e.J4n);
        if (
          (ControllerHolder_1.ControllerHolder.CreatureController.CheckDelayRemove(
            l,
            e.jHn,
            e._9n,
          ),
          ControllerHolder_1.ControllerHolder.CreatureController.CheckPendingRemove(
            l,
            e.jHn,
            e._9n,
          ),
          ModelManager_1.ModelManager.CreatureModel.RemoveCreaturePendingSet.has(
            l,
          ))
        )
          ModelManager_1.ModelManager.CreatureModel.RemoveRemoveCreaturePending(
            l,
          );
        else if (
          ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(l)
        ) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "World",
              3,
              "[AoiController.AddEntityPb]更新先行创建实体的信息。",
              ["CreatureDataId", l],
            );
          const i = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
          void i.Entity.GetComponent(0).SetPbDataByProtocol(e);
        } else {
          const i =
            ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(
              e,
              "AOI",
            );
          i?.Valid &&
            ModelManager_1.ModelManager.GameModeModel.MapDone &&
            (ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
              i,
            ),
            AoiController.AddMonsterSizeTag(i));
        }
      } else r.IsFinished = !0;
    }
  }
  static s0r(e, o, r, t) {
    var o = 0.5 * o,
      l = new UE.Vector(e.XAs + o, e.YAs + o, 0.5 * (e.zAs + e.JAs)),
      o = new UE.Vector(o, o, 0.5 * (e.zAs - e.JAs)),
      e = new UE.Rotator(0, 0, 0),
      t = t ? new UE.LinearColor(1, 0, 0, 1) : new UE.LinearColor(0, 1, 0, 1),
      r = r / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    UE.KismetSystemLibrary.DrawDebugBox(
      GlobalData_1.GlobalData.World,
      l,
      o,
      t,
      e,
      r,
      1,
    );
  }
  static StopDrawDebugVoxel() {
    void 0 !== this.a0r &&
      (TimerSystem_1.TimerSystem.Has(this.a0r) &&
        TimerSystem_1.TimerSystem.Remove(this.a0r),
      (this.a0r = void 0)),
      void 0 !== this.h0r &&
        (TimerSystem_1.TimerSystem.Has(this.h0r) &&
          TimerSystem_1.TimerSystem.Remove(this.h0r),
        (this.h0r = void 0));
  }
  static AddMonsterSizeTag(e) {
    var o = e.Entity?.GetComponent(0)?.GetMonsterComponent()?.FightConfigId;
    const r = e.Entity?.GetComponent(188);
    o &&
      r?.Valid &&
      (e = MonsterBattleConfById_1.configMonsterBattleConfById?.GetConfig(o)) &&
      (o = MonsterSizeIdById_1.configMonsterSizeIdById?.GetConfig(
        e.MonsterSizeId,
      )) &&
      o.MonsterSizeTag?.forEach((e) => {
        r.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
      });
  }
}
(exports.AoiController = AoiController),
  ((_a = AoiController).Jgr = (e) => {
    for (const r of e.ySs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r);
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
        o,
        "LeaveAoiNotify",
        Protocol_1.Aki.Protocol.bks.Proto_RemoveTypeForce,
      );
    }
  }),
  (AoiController.zgr = (e) => {
    for (const r of e.WIs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r.P4n);
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
        o,
        "RemoveEntityAoiNotify",
        r.Z4n,
      );
    }
  }),
  (AoiController.Zgr = (e) => {
    (ModelManager_1.ModelManager.AoiModel.MinCoordinate.X = e.oDs),
      (ModelManager_1.ModelManager.AoiModel.MinCoordinate.Y = e.sDs),
      (ModelManager_1.ModelManager.AoiModel.MaxCoordinate.X = e.nDs),
      (ModelManager_1.ModelManager.AoiModel.MaxCoordinate.Y = e.aDs);
  }),
  (AoiController.e0r = (e, o) => {
    AoiController.r0r(e.jIs, e.eWn, o);
  }),
  (AoiController.t0r = (e) => {
    for (const r of e.WIs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r.P4n);
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
        o,
        "EntityRemoveNotify",
        r.Z4n,
      );
    }
  }),
  (AoiController.h0r = void 0),
  (AoiController.a0r = void 0),
  (AoiController.o0r = (e) => {
    var o = TimerSystem_1.TimerSystem.Forever(() => {
      _a.s0r(e.KAs, e.jAs, 2e3, e.QAs);
    }, 2e3);
    o &&
      (void 0 !== _a.a0r &&
        TimerSystem_1.TimerSystem.Has(_a.a0r) &&
        TimerSystem_1.TimerSystem.Remove(_a.a0r),
      (_a.a0r = o));
  }),
  (AoiController.i0r = (o) => {
    var e = TimerSystem_1.TimerSystem.Forever(() => {
      for (const e of o.WAs) _a.s0r(e, o.jAs, 2e3);
    }, 2e3);
    e &&
      (void 0 !== _a.h0r &&
        TimerSystem_1.TimerSystem.Has(_a.h0r) &&
        TimerSystem_1.TimerSystem.Remove(_a.h0r),
      (_a.h0r = e));
  });
//# sourceMappingURL=AoiController.js.map
