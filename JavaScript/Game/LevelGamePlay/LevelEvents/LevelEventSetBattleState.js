"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetBattleState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class NotifyData {
  constructor() {
    (this.Entities = void 0), (this.Target = void 0);
  }
}
class LevelEventSetBattleState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.MRe = new Array()),
      (this.SRe = 0),
      (this.ERe = 0),
      (this.aDe = void 0),
      (this.yRe = void 0),
      (this.IRe = void 0);
  }
  ExecuteInGm(t, e) {
    this.FinishExecute(!0);
  }
  ExecuteNew(t, e) {
    if (t)
      switch (((this.aDe = t.StateOption), this.aDe.Type)) {
        case IAction_1.ESetBattleStateType.SetBattleTag:
          if (this.aDe.SetTags && 0 !== this.aDe.SetTags.length) {
            var i = [];
            for (const a of this.aDe.SetTags) {
              i.push(a.EntityId);
              var o =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  a.EntityId,
                );
              a.BeforeHide && o?.Entity?.GetComponent(185)?.AddTag(447365096);
            }
            this.CreateWaitEntityTask(i),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Event",
                  34,
                  "LevelEventSetBattleState CreateWaitEntityTask",
                  ["EntityIds", i],
                );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                34,
                "LevelEventSetBattleState 未配置具体操作对象",
              ),
              this.FinishExecute(!1);
          break;
        case IAction_1.ESetBattleStateType.NotifyMonsterPerception:
          this.TRe(this.aDe);
          break;
        case IAction_1.ESetBattleStateType.NotifyMonsterPlayStandbyTags:
          this.LRe(this.aDe, e);
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Event", 34, "LevelEventSetBattleState 参数不合法"),
        this.FinishExecute(!1);
  }
  ExecuteWhenEntitiesReady() {
    switch (this.aDe.Type) {
      case IAction_1.ESetBattleStateType.SetBattleTag:
        this.DRe();
        break;
      case IAction_1.ESetBattleStateType.NotifyMonsterPerception:
        this.RRe(this.yRe);
    }
  }
  DRe() {
    var t = this.aDe;
    this.SRe = t.SetTags.length;
    for (const i of t.SetTags) {
      const o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        i.EntityId,
      );
      if (o?.IsInit) {
        const a = i.GameplayTag;
        var e = i.DelayTime;
        switch (i.SetType) {
          case IAction_1.ESetEntityTagType.Add:
            e && 0 < e
              ? this.MRe.push(
                  TimerSystem_1.TimerSystem.Delay(() => {
                    this.URe(i.EntityId, o, a);
                  }, e * TimeUtil_1.TimeUtil.InverseMillisecond),
                )
              : this.URe(i.EntityId, o, a);
            break;
          case IAction_1.ESetEntityTagType.Remove:
            e && 0 < e
              ? this.MRe.push(
                  TimerSystem_1.TimerSystem.Delay(() => {
                    this.ARe(i.EntityId, o, a);
                  }, e * TimeUtil_1.TimeUtil.InverseMillisecond),
                )
              : this.ARe(i.EntityId, o, a);
        }
      } else this.ERe += 1;
    }
    this.ERe >= this.SRe && this.FinishExecute(!0);
  }
  URe(t, e, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Event",
        34,
        "LevelEventSetBattleState AddTag",
        ["EntityId", t],
        ["TagName", i],
      );
    e = e.Entity.GetComponent(185);
    e
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Event",
            34,
            "LevelEventSetBattleState AddTagByName",
            ["EntityId", t],
            ["TagName", i],
          ),
        e.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)),
        (this.ERe += 1),
        this.ERe >= this.SRe && this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
  ARe(t, e, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Event",
        34,
        "LevelEventSetBattleState RemoveTag",
        ["EntityId", t],
        ["TagName", i],
      );
    e = e.Entity.GetComponent(185);
    e
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Event",
            34,
            "LevelEventSetBattleState RemoveTagByName",
            ["EntityId", t],
            ["TagName", i],
          ),
        e.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)),
        (this.ERe += 1),
        this.ERe >= this.SRe && this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
  TRe(t) {
    var e = [],
      i = [];
    for (const s of t.EntityIds) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (!o?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Event", 32, "被通知Entity不合法", ["ID", s]),
          void this.FinishExecute(!1)
        );
      o = o.Entity.GetComponent(38);
      if (!o?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Event", 32, "被通知Entity没有AIComponent", [
              "ID",
              s,
            ]),
          void this.FinishExecute(!1)
        );
      e.push(o.AiController), i.push(s);
    }
    switch (
      ((this.yRe = new NotifyData()),
      (this.yRe.Entities = e),
      t.PerceptionBehaviorOption.Type)
    ) {
      case IAction_1.EBattleStatePerceptionBehavior.NotifyGatherToEntity:
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          t.PerceptionBehaviorOption.EntityId,
        );
        a?.Valid
          ? (a = a.Entity.GetComponent(1))?.Valid
            ? ((this.yRe.Target = a),
              i.push(t.PerceptionBehaviorOption.EntityId),
              this.CreateWaitEntityTask(i))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Event",
                  34,
                  "未能获取到该实体对应的有效Actor",
                  ["entityId", t.PerceptionBehaviorOption.EntityId],
                ),
              this.FinishExecute(!1))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 34, "中心实体不合法", [
                "ID",
                t.PerceptionBehaviorOption.EntityId,
              ]),
            this.FinishExecute(!1));
        break;
      case IAction_1.EBattleStatePerceptionBehavior.NotifyGatherToPlayer:
        (this.yRe.Target =
          Global_1.Global.BaseCharacter.CharacterActorComponent),
          this.CreateWaitEntityTask(i);
    }
  }
  RRe(t) {
    for (const a of t.Entities) if (!a.CharActorComp.Entity.IsInit) return;
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "qianxing_notify_interval",
    );
    const i = Global_1.Global.BaseCharacter.CharacterActorComponent;
    i?.Valid
      ? t.Entities.sort((t, e) => {
          return (
            Vector_1.Vector.DistSquared(
              i.ActorLocationProxy,
              t.CharActorComp.ActorLocationProxy,
            ) -
            Vector_1.Vector.DistSquared(
              i.ActorLocationProxy,
              e.CharActorComp.ActorLocationProxy,
            )
          );
        })
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          32,
          "[NotifyGatherToEntity] 获取不到BaseCharacter的CharacterActorComponent，无法通知怪物靠近",
        );
    let o = 0;
    this.IRe = TimerSystem_1.TimerSystem.Loop(
      () => {
        t.Entities[o++].AiPerceptionEvents.ForceTriggerSceneItemDestroyEvent(
          t.Target.Owner,
        );
      },
      e,
      t.Entities.length,
    );
  }
  LRe(t, e) {
    if (0 !== t.StandbyTags.length && 1 === e.Type) {
      e = EntitySystem_1.EntitySystem.Get(e.EntityId);
      if (e && e.GetComponent(38)?.AiController?.AiPatrol) {
        const o = e.GetComponent(1);
        var e = e.GetComponent(39),
          i = Math.floor(
            MathUtils_1.MathUtils.GetRandomFloatNumber(0, t.StandbyTags.length),
          );
        const a = Protocol_1.Aki.Protocol.vds.create();
        (a.rkn = MathUtils_1.MathUtils.NumberToLong(
          o.CreatureData.GetCreatureDataId(),
        )),
          (a.Dkn = e?.GetCurrentPatrolSplineId() ?? 0),
          (a.Akn = e?.GetLastPointRawIndex() ?? -1),
          (a.Ukn =
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
              t.StandbyTags[i],
            ) ?? 0),
          Net_1.Net.Call(14969, a, (t) => {
            t &&
              t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "AI",
                51,
                "请求状态机切换生态表演失败",
                ["CreatureId", a.rkn],
                ["PbDataId", o.CreatureData.GetPbDataId()],
                ["SplineId", a.Dkn],
                ["Index", a.Akn],
                ["Tag", a.Ukn],
              );
          });
      }
    }
    this.FinishExecute(!0);
  }
  OnReset() {
    for (const t of this.MRe)
      TimerSystem_1.TimerSystem.Has(t) && TimerSystem_1.TimerSystem.Remove(t);
    void 0 !== this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.MRe.length = 0),
      (this.SRe = 0),
      (this.ERe = 0);
  }
}
exports.LevelEventSetBattleState = LevelEventSetBattleState;
//# sourceMappingURL=LevelEventSetBattleState.js.map
