"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorAction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Stats_1 = require("../../../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  MathCommon_1 = require("../../../../../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  CameraUtility_1 = require("../../../../../../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../../../../../../Character/TsBaseCharacter"),
  Global_1 = require("../../../../../../Global"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  WorldGlobal_1 = require("../../../../../../World/WorldGlobal"),
  SkillBehaviorBatchBulletTask_1 = require("../../../../../Bullet/BulletStaticMethod/SkillBehaviorBatchBulletTask"),
  BulletUtil_1 = require("../../../../../Bullet/BulletUtil"),
  SceneItemReferenceComponent_1 = require("../../../../../SceneItem/SceneItemReferenceComponent"),
  SkillBehaviorMisc_1 = require("./SkillBehaviorMisc"),
  tmpVector = Vector_1.Vector.Create(),
  tmpQuat = Quat_1.Quat.Create(),
  tmpRotator = Rotator_1.Rotator.Create();
class SkillBehaviorAction {
  static BeginGroup(t, a) {
    if (a.Entity.GetComponent(3).IsAutonomousProxy)
      for (let e = 0; e < t.Num(); e++) this.Begin(t.Get(e), a);
  }
  static Begin(e, t) {
    try {
      switch (e.ActionType) {
        case 0:
          this.tZo(e, t);
          break;
        case 1:
          this.bd(e, t);
          break;
        case 2:
          this.iZo(e, t);
          break;
        case 3:
          this.oZo(e, t);
          break;
        case 4:
          this.rZo(e, t);
          break;
        case 5:
          this.nZo(e, t);
          break;
        case 6:
          this.sZo(e, t);
          break;
        case 7:
          this.aZo(e, t);
          break;
        case 8:
          this.hZo(e, t);
          break;
        case 9:
          this.bst(e, t);
          break;
        case 10:
          this.lZo(e, t);
          break;
        case 11:
          this._Zo(e, t);
          break;
        case 12:
          this.Kpl(e, t);
          break;
        case 13:
          this.K4_(e, t);
          break;
        case 14:
          this.LQ_(t.Entity, e.CommonConf, t.Skill.SkillId);
      }
    } catch (e) {
      CombatLog_1.CombatLog.ErrorWithStack(
        "Skill",
        t.Entity,
        "SkillBehaviorAction.Begin异常",
        e,
        ["技能Id", t.Skill.SkillId],
        ["技能名", t.Skill.SkillName],
      );
    }
  }
  static LQ_(e, t, a) {
    SkillBehaviorBatchBulletTask_1.SkillBehaviorBatchBulletTask.Create(
      e,
      t,
      a,
    ).Start();
  }
  static End(a) {
    SkillBehaviorMisc_1.paramMap.get(a)?.forEach((t) => {
      try {
        switch (t.ActionType) {
          case 2:
            t.Entity.GetComponent(21).RemoveCueByHandle(t.GameplayCue);
            break;
          case 6:
            t.Entity.GetComponent(3).Actor.KuroSetMovementMode({
              Mode: t.MovementMode,
              Context: "[SkillBehaviorAction.End]",
            });
            break;
          case 7:
            t.Entity.GetComponent(
              3,
            ).Actor.CapsuleComponent.SetCollisionResponseToChannel(
              t.CollisionChannel,
              t.CollisionResponse,
            );
            break;
          case 8:
            t.SummonSkillComponent.EndSkill(
              t.SummonSkillId,
              "SkillBehaviorAction.End",
            );
        }
      } catch (e) {
        CombatLog_1.CombatLog.ErrorWithStack(
          "Skill",
          t.Entity,
          "SkillBehaviorAction.End异常",
          e,
          ["技能Id", a.SkillId],
          ["技能名", a.SkillName],
          ["技能行为", t.ActionType],
        );
      }
    }),
      SkillBehaviorMisc_1.paramMap.delete(a);
  }
  static CalculateLocation(t, a) {
    var i = a.Entity.GetComponent(3);
    let o = i.ActorLocation,
      e = i.ActorForward,
      r = Vector_1.Vector.ZeroVectorDouble;
    switch (t.LocationType) {
      case 0:
        break;
      case 1:
        if (a.SkillComponent.SkillTarget) {
          [o, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            a.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner,
          );
          var l = a.SkillComponent.GetTargetTransform().GetLocation(),
            c = (0, SkillBehaviorMisc_1.traceWall)(
              i,
              Vector_1.Vector.Create(o),
              Vector_1.Vector.Create(l),
              t.DebugTrace,
            );
          if (c && c[0]) {
            CombatLog_1.CombatLog.Info(
              "Skill",
              a.Entity,
              "SkillBehaviorAction.SetLocation技能目标胶囊体中心和技能目标锁定点之间有阻挡，设置位置失败",
              ["技能Id", a.Skill.SkillId],
              ["技能名", a.Skill.SkillName],
            );
            break;
          }
          o = l;
        }
        break;
      case 2:
        c =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
            32,
          ).GetCurrentTarget();
        c &&
          ([o, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            c.Entity.GetComponent(1).Owner,
          ));
        break;
      case 3:
        [o, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
          Global_1.Global.BaseCharacter,
        );
        break;
      case 4:
        l = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          a.Entity.GetComponent(0).GetSummonerId(),
        )?.Entity?.GetComponent(1);
        [o, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(l.Owner);
        break;
      case 5:
        [o, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4)
            .CameraActor,
        );
        break;
      case 6:
        c =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
            a.Entity.Id,
            t.BlackboardKey,
          );
        o = WorldGlobal_1.WorldGlobal.ToUeVector(c);
        break;
      case 7:
        (l =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
            a.Entity.Id,
            t.BlackboardKey,
          )),
          (c = EntitySystem_1.EntitySystem.Get(l));
        c?.Valid &&
          ([o, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            c.GetComponent(167).Owner,
          ));
    }
    switch (t.LocationForwardType) {
      case 0:
        break;
      case 1:
        e = i.Actor.D_GetActorForwardVector();
        break;
      case 2:
        var s = i.ActorLocation.op_Subtraction(o);
        e.Set(s.X, s.Y, 0);
        break;
      case 3:
        s = o.op_Subtraction(
          Global_1.Global.CharacterCameraManager.D_GetCameraLocation(),
        );
        e.Set(s.X, s.Y, 0);
        break;
      case 4:
        (e =
          Global_1.Global.BaseCharacter.D_K2_GetActorLocation().op_Subtraction(
            o,
          )).Set(e.X, e.Y, 0);
    }
    t.BestSpot &&
      4 === t.Strategy &&
      ((k = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()),
      (S = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
        a.Entity,
      )),
      (k = k.indexOf(S)) + 1 > t.AngleOffsets.Num()
        ? CombatLog_1.CombatLog.Error(
            "Skill",
            a.Entity,
            "SkillBehaviorAction.SetLocation当前施法者所处编队位置大于配置数组",
            ["技能Id", a.Skill.SkillId],
            ["技能名", a.Skill.SkillName],
            ["index", k],
          )
        : ((S = t.AngleOffsets.Get(k)),
          (e = e.RotateAngleAxis(S, Vector_1.Vector.UpVectorDouble))));
    var _,
      n = Vector_1.Vector.Create(o),
      k = new UE.TransformDouble(
        e.Rotation(),
        o,
        Vector_1.Vector.OneVectorDouble,
      ),
      S = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.LocationOffset);
    if (((o = k.TransformPositionNoScale(S)), t.Restrict)) {
      let e = i.ActorLocation;
      switch (t.RestrictType) {
        case 0:
          e = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
          break;
        case 1:
          break;
        case 2:
          a.Entity.GetComponent(0).IsMonster() &&
            ((_ = i.GetInitLocation()), e.Set(_.X, _.Y, _.Z));
      }
      k = o.op_Subtraction(e).Size2D();
      k > t.RestrictDistance &&
        ((S = t.RestrictDistance / k),
        MathUtils_1.MathUtils.LerpVector(e, o, S, o));
    }
    let v = Vector_1.Vector.Create(o);
    if (t.BestSpot) {
      if (
        (3 === t.Strategy &&
          (r = Global_1.Global.BaseCharacter.D_K2_GetActorLocation()),
        !n.Equals(v))
      )
        switch (t.Strategy) {
          case 4:
          case 0:
            var h = (0, SkillBehaviorMisc_1.traceWall)(i, n, v, t.DebugTrace);
            if (!h)
              return (
                CombatLog_1.CombatLog.Info(
                  "Skill",
                  a.Entity,
                  "SkillBehaviorAction.SetLocation撞墙停止射线起点和终点位置相同，设置位置失败",
                  ["技能Id", a.Skill.SkillId],
                  ["技能名", a.Skill.SkillName],
                ),
                r
              );
            v = h[1];
            break;
          case 1:
          case 2:
          case 3: {
            let e = !1;
            var m = Vector_1.Vector.Create(),
              M = Vector_1.Vector.Create();
            v.Subtraction(n, m);
            for (const p of SkillBehaviorMisc_1.angles) {
              m.RotateAngleAxis(p, Vector_1.Vector.UpVectorProxy, M),
                n.Addition(M, v);
              var u = (0, SkillBehaviorMisc_1.traceWall)(i, n, v, t.DebugTrace);
              if (!u)
                return (
                  CombatLog_1.CombatLog.Info(
                    "Skill",
                    a.Entity,
                    "SkillBehaviorAction.SetLocation四向查询射线起点和终点位置相同，设置位置失败",
                    ["技能Id", a.Skill.SkillId],
                    ["技能名", a.Skill.SkillName],
                  ),
                  r
                );
              if (!u[0]) {
                (e = !0), (v = u[1]);
                break;
              }
            }
            if (!e)
              return (
                CombatLog_1.CombatLog.Info(
                  "Skill",
                  a.Entity,
                  "SkillBehaviorAction.SetLocation四个方向都撞墙了，设置位置失败",
                  ["技能Id", a.Skill.SkillId],
                  ["技能名", a.Skill.SkillName],
                ),
                r
              );
            {
              let e = void 0;
              if (
                (2 === t.Strategy
                  ? 0 !== t.LocationType &&
                    (e = Vector_1.Vector.Create(i.ActorLocation))
                  : 3 === t.Strategy &&
                    (e = Vector_1.Vector.Create(
                      Global_1.Global.BaseCharacter.D_K2_GetActorLocation(),
                    )),
                e)
              ) {
                var h = Vector_1.Vector.Create(v),
                  b = (0, SkillBehaviorMisc_1.traceWall)(i, e, h, t.DebugTrace);
                if (!b)
                  return (
                    CombatLog_1.CombatLog.Info(
                      "Skill",
                      a.Entity,
                      "SkillBehaviorAction.SetLocation检测空气墙射线起点和终点位置相同，设置位置失败",
                      ["技能Id", a.Skill.SkillId],
                      ["技能名", a.Skill.SkillName],
                    ),
                    r
                  );
                var d = b[0];
                if (d) {
                  var B = d.GetHitCount();
                  for (let e = 0; e < B; e++)
                    if (
                      -1 !==
                      d.Actors.Get(e).Tags.FindIndex(
                        SceneItemReferenceComponent_1.AIR_WALL,
                      )
                    ) {
                      CombatLog_1.CombatLog.Info(
                        "Skill",
                        a.Entity,
                        "SkillBehaviorAction.SetLocation检测到空气墙",
                        ["技能Id", a.Skill.SkillId],
                        ["技能名", a.Skill.SkillName],
                      ),
                        (v = b[1]);
                      break;
                    }
                }
              }
            }
            break;
          }
        }
      if (t.OnGround) {
        k = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(i, v, t.DebugTrace);
        if (!k[0])
          return (
            CombatLog_1.CombatLog.Info(
              "Skill",
              a.Entity,
              "SkillBehaviorAction.SetLocation贴地没有找到合法的落脚点，设置位置失败",
              ["技能Id", a.Skill.SkillId],
              ["技能名", a.Skill.SkillName],
            ),
            r
          );
        (v = k[1]).Z += t.GroundOffset;
      }
    }
    o = v.ToUeVector();
    S = t.Navigation;
    if (0 < S) {
      var k = a.Entity.GetComponent(176),
        C = Vector_1.Vector.Create();
      if (
        (k.GravityUp.Multiply(S, C),
        !UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          o,
          void 0,
          void 0,
          void 0,
          C.ToUeVector(),
          S,
        ))
      ) {
        k = (0, puerts_1.$ref)(void 0);
        if (
          !UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(
            GlobalData_1.GlobalData.World,
            o,
            k,
            S,
          )
        )
          return (
            CombatLog_1.CombatLog.Info(
              "Skill",
              a.Entity,
              "SkillBehaviorAction.SetLocation没有找到合法的导航网格落点，设置位置失败",
              ["技能Id", a.Skill.SkillId],
              ["技能名", a.Skill.SkillName],
            ),
            r
          );
        o = (0, puerts_1.$unref)(k);
      }
    }
    return o;
  }
  static tZo(e, t) {
    var a,
      e = SkillBehaviorAction.CalculateLocation(e, t);
    e.Equals(
      Vector_1.Vector.ZeroVectorDouble,
      MathCommon_1.MathCommon.KindaSmallNumber,
    ) ||
      ((a = t.Entity.GetComponent(3)),
      CombatLog_1.CombatLog.Info(
        "Skill",
        t.Entity,
        "SkillBehaviorAction.SetLocation最终点",
        ["位置", e],
      ),
      a.SetActorLocation(e, SkillBehaviorMisc_1.CONTEXT + ".Final", !1));
  }
  static bd(e, t) {
    let a = void 0,
      i = void 0;
    switch (e.RotationType) {
      case 0:
        i = t.SkillComponent.SkillTarget;
        break;
      case 1:
        i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var o = t.Entity.GetComponent(0);
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          o.GetSummonerId(),
        );
        break;
      case 3:
        (a = tmpVector).FromUeVector(
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
            4,
          ).CameraActor.D_K2_GetActorLocation(),
        );
        break;
      case 4:
        t.SkillComponent.SkillTarget ===
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
          ? (a = tmpVector).FromUeVector(
              ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
                4,
              ).CameraActor.D_K2_GetActorLocation(),
            )
          : (i = t.SkillComponent.SkillTarget);
        break;
      default:
        i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
          t.Entity,
        );
    }
    i &&
      i.Entity !== t.Entity &&
      (a = i.Entity.GetComponent(1).ActorLocationProxy);
    var r = t.Entity.GetComponent(3);
    a
      ? (a.Subtraction(r.ActorLocationProxy, tmpVector),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          tmpVector,
          r.MoveComp.GravityUp,
          tmpQuat,
        ))
      : tmpQuat.DeepCopy(r.ActorQuatProxy),
      0 !== e.DirectionOffset &&
        (tmpRotator.Set(0, e.DirectionOffset, 0),
        tmpQuat.Multiply(tmpRotator.Quaternion(), tmpQuat)),
      tmpQuat.Rotator(tmpRotator),
      r.SetActorRotation(
        tmpRotator.ToUeRotator(),
        "SkillBehaviorAction.SetDirection",
      );
  }
  static iZo(t, a) {
    var i = a.Entity.GetComponent(21);
    for (let e = 0; e < t.Cues.Num(); e++) {
      var o = t.Cues.Get(e),
        r = i.AddCue(Number(o.CueId), { Sync: !0 });
      o.Stop &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
          Entity: a.Entity,
          ActionType: t.ActionType,
          GameplayCue: r,
        });
    }
  }
  static oZo(t, a) {
    for (let e = 0; e < t.Bullets.Num(); e++) {
      var i,
        o = t.Bullets.Get(e);
      for (let e = 0; e < o.bulletCount; e++) {
        let e = -1;
        a.Skill.SkillBehaviorAnimNotifyMessageId
          ? (i = a.Entity.GetComponent(3).Actor) instanceof
              TsBaseCharacter_1.default &&
            (e = BulletUtil_1.BulletUtil.CreateBulletFromAN(
              i,
              o.bulletRowName,
              a.Entity.GetComponent(3).ActorTransform,
              a.Skill.SkillId.toString(),
              !0,
              a.Skill.SkillBehaviorAnimNotifyMessageId,
            ))
          : (e =
              ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
                a.Entity,
                o.bulletRowName,
                a.Entity.GetComponent(3).ActorTransform,
                {
                  SkillId: a.Skill.SkillId,
                  SkillContextId: a.Skill.LFc,
                  SyncType: 1,
                  BattleFlags: a.Skill.BattleFlags,
                },
                a.Skill.LFc,
              ).Id),
          o.BlackboardKey &&
            ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
              a.Entity.Id,
              o.BlackboardKey,
              e,
            );
      }
    }
  }
  static rZo(e, t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Entity.Id);
    CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
      t,
      e.CameraModifierSettings,
      e.CameraEffectiveClientType,
      e.CameraModifierConditions,
    ) &&
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
        e.Tag,
        e.Duration,
        e.BlendInTime,
        e.BlendOutTime,
        e.CameraModifierSettings,
        void 0,
        e.BreakBlendOutTime,
        e.BlendInCurve,
        e.BlendOutCurve,
        void 0,
        e.CameraAttachSocket.toString(),
      );
  }
  static nZo(e, t) {
    ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
      e.CameraSequenceSettings,
      e.ResetLockOnCamera,
      e.AdditiveRotation,
      t.Entity.GetComponent(3).Actor,
      e.CameraAttachSocket,
      e.CameraDetectSocket,
      e.ExtraSphereLocation,
      e.ExtraDetectSphereRadius,
      e.IsShowExtraSphere,
    );
  }
  static sZo(e, t) {
    t.Entity.GetComponent(3).Actor.KuroSetMovementMode({
      Mode: e.BeginMovementMode,
      Context: "[SkillBehaviorAction.SetMovementMode]",
    }),
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
        Entity: t.Entity,
        ActionType: e.ActionType,
        MovementMode: e.EndMovementMode,
      });
  }
  static aZo(e, t) {
    var a = t.Entity.GetComponent(3).Actor.CapsuleComponent;
    e.CollisionRestore &&
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
        Entity: t.Entity,
        ActionType: e.ActionType,
        CollisionChannel: e.CollisionChannel,
        CollisionResponse: a.GetCollisionResponseToChannel(e.CollisionChannel),
      }),
      a.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
  }
  static hZo(e, t) {
    var a = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      t.Entity,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
      e.FollowIndex,
    );
    a &&
      ((a = a.Entity.GetComponent(39)),
      e.StopSummonSkill &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
          Entity: t.Entity,
          ActionType: e.ActionType,
          SummonSkillComponent: a,
          SummonSkillId: e.SummonSkillId,
        }),
      a.BeginSkill(e.SummonSkillId, {
        Target: t.SkillComponent.SkillTarget?.Entity,
        Reason: "SkillBehaviorAction.UseSummonSkill",
      }));
  }
  static bst(e, t) {
    let a = void 0;
    switch (e.BuffTarget) {
      case 0:
        a = t.Entity.GetComponent(172);
        break;
      case 1:
        a = t.SkillComponent.SkillTarget?.Entity?.GetComponent(172);
    }
    var i;
    a &&
      (e.Add
        ? ((i = t.Skill.SkillBehaviorAnimNotifyMessageId || t.Skill.LFc),
          (i = {
            InstigatorId:
              ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
                t.Entity.Id,
              ),
            Reason: "从技能行为添加Buff",
            PreMessageId: i,
          }),
          a.AddBuff(Number(e.BuffId), i))
        : a.RemoveBuff(Number(e.BuffId), -1, "从技能行为移除Buff"));
  }
  static lZo(e, t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 203);
    t?.Valid &&
      "None" !== e.Tag.TagName &&
      (e.Add ? t.AddTag(e.Tag.TagId) : t.RemoveTag(e.Tag.TagId));
  }
  static _Zo(e, t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 19);
    t?.Valid && t.TryExitWeakTime();
  }
  static Kpl(e, t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 39);
    t?.Valid &&
      t.PlaySkillMontageWithEndAbility(
        e.MontageIndex,
        e.StartSection,
        e.StartTime,
      );
  }
  static K4_(e, t) {
    var a = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 275);
    if (a?.Valid) {
      var i = e.UpdateCustomValue.ValueName,
        o = i.Num();
      for (let e = 0; e < o; e++) {
        var r = i.Get(e);
        a.UpdateCustomValue(r);
      }
    }
  }
}
exports.SkillBehaviorAction = SkillBehaviorAction;
//# sourceMappingURL=SkillBehaviorAction.js.map
