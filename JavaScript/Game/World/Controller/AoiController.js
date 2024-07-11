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
      Net_1.Net.Register(23307, AoiController.egr),
      Net_1.Net.Register(23556, AoiController.tgr),
      Net_1.Net.Register(15061, AoiController.igr),
      Net_1.Net.Register(28076, AoiController.ogr),
      Net_1.Net.Register(8100, AoiController.rgr),
      Net_1.Net.Register(11465, AoiController.ngr),
      Net_1.Net.Register(14725, AoiController.sgr),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(23307),
      Net_1.Net.UnRegister(23556),
      Net_1.Net.UnRegister(15061),
      Net_1.Net.UnRegister(28076),
      Net_1.Net.UnRegister(8100),
      Net_1.Net.UnRegister(11465),
      Net_1.Net.UnRegister(14725),
      !0
    );
  }
  static agr(e, o) {
    var r = new Array();
    for (const l of e) {
      var t = MathUtils_1.MathUtils.LongToNumber(l.Ekn);
      ControllerHolder_1.ControllerHolder.CreatureController.CheckDelayRemove(
        t,
        l.mVn,
        l.R5n,
      ),
        ControllerHolder_1.ControllerHolder.CreatureController.CheckPendingRemove(
          t,
          l.mVn,
          l.R5n,
        ),
        ModelManager_1.ModelManager.CreatureModel.RemoveCreaturePendingSet.has(
          t,
        )
          ? ModelManager_1.ModelManager.CreatureModel.RemoveRemoveCreaturePending(
              t,
            )
          : ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t)
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "World",
                  3,
                  "[AoiController.AddEntityPb]更新先行创建实体的信息。",
                  ["CreatureDataId", t],
                ),
              ModelManager_1.ModelManager.CreatureModel.GetEntity(t)
                .Entity.GetComponent(0)
                .SetPbDataByProtocol(l))
            : (t =
                ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(
                  l,
                ))?.Valid && r.push(t);
    }
    if (ModelManager_1.ModelManager.GameModeModel.MapDone)
      for (const i of r)
        ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
          i,
        ),
          AoiController.AddMonsterSizeTag(i);
  }
  static lgr(e, o, r, t) {
    var o = 0.5 * o,
      l = new UE.Vector(e.PTs + o, e.UTs + o, 0.5 * (e.xTs + e.wTs)),
      o = new UE.Vector(o, o, 0.5 * (e.xTs - e.wTs)),
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
    void 0 !== this._gr &&
      (TimerSystem_1.TimerSystem.Has(this._gr) &&
        TimerSystem_1.TimerSystem.Remove(this._gr),
      (this._gr = void 0)),
      void 0 !== this.ugr &&
        (TimerSystem_1.TimerSystem.Has(this.ugr) &&
          TimerSystem_1.TimerSystem.Remove(this.ugr),
        (this.ugr = void 0));
  }
  static AddMonsterSizeTag(e) {
    var o = e.Entity?.GetComponent(0)?.GetMonsterComponent()?.FightConfigId;
    const r = e.Entity?.GetComponent(185);
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
  ((_a = AoiController).egr = (e) => {
    for (const r of e.sfs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r);
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
        o,
        "LeaveAoiNotify",
        Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
      );
    }
  }),
  (AoiController.tgr = (e) => {
    for (const r of e.PMs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r.rkn);
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
        o,
        "RemoveEntityAoiNotify",
        r.Ikn,
      );
    }
  }),
  (AoiController.igr = (e) => {
    (ModelManager_1.ModelManager.AoiModel.MinCoordinate.X = e.kys),
      (ModelManager_1.ModelManager.AoiModel.MinCoordinate.Y = e.Fys),
      (ModelManager_1.ModelManager.AoiModel.MaxCoordinate.X = e.Nys),
      (ModelManager_1.ModelManager.AoiModel.MaxCoordinate.Y = e.Vys);
  }),
  (AoiController.ogr = (e) => {
    AoiController.agr(e.AMs, e.y9n);
  }),
  (AoiController.rgr = (e) => {
    for (const r of e.PMs) {
      var o = MathUtils_1.MathUtils.LongToNumber(r.rkn);
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
        o,
        "EntityRemoveNotify",
        r.Ikn,
      );
    }
  }),
  (AoiController.ugr = void 0),
  (AoiController._gr = void 0),
  (AoiController.sgr = (e) => {
    var o = TimerSystem_1.TimerSystem.Forever(() => {
      _a.lgr(e.DTs, e.LTs, 2e3, e.ATs);
    }, 2e3);
    o &&
      (void 0 !== _a._gr &&
        TimerSystem_1.TimerSystem.Has(_a._gr) &&
        TimerSystem_1.TimerSystem.Remove(_a._gr),
      (_a._gr = o));
  }),
  (AoiController.ngr = (o) => {
    var e = TimerSystem_1.TimerSystem.Forever(() => {
      for (const e of o.RTs) _a.lgr(e, o.LTs, 2e3);
    }, 2e3);
    e &&
      (void 0 !== _a.ugr &&
        TimerSystem_1.TimerSystem.Has(_a.ugr) &&
        TimerSystem_1.TimerSystem.Remove(_a.ugr),
      (_a.ugr = e));
  });
//# sourceMappingURL=AoiController.js.map
