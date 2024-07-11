"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorAction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../../../Camera/CameraController"),
  CameraUtility_1 = require("../../../../../../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../../../../../../Character/TsBaseCharacter"),
  Global_1 = require("../../../../../../Global"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  CombatDebugController_1 = require("../../../../../../Utils/CombatDebugController"),
  BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController"),
  WorldGlobal_1 = require("../../../../../../World/WorldGlobal"),
  BulletController_1 = require("../../../../../Bullet/BulletController"),
  BulletUtil_1 = require("../../../../../Bullet/BulletUtil"),
  SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
class SkillBehaviorAction {
  static Begin(a, r) {
    if (r.Entity.GetComponent(3).IsAutonomousProxy)
      try {
        for (let e = 0; e < a.Num(); e++) {
          var i = a.Get(e);
          switch (
            (CombatDebugController_1.CombatDebugController.CombatDebug(
              "Skill",
              r.Entity,
              "SkillBehaviorAction.Begin",
              ["技能Id", r.Skill.SkillId],
              ["技能名", r.Skill.SkillName],
              ["技能行为", i.ActionType],
            ),
            i.ActionType)
          ) {
            case 0:
              this.tZo(i, r);
              break;
            case 1:
              this.bd(i, r);
              break;
            case 2:
              this.iZo(i, r);
              break;
            case 3:
              this.oZo(i, r);
              break;
            case 4:
              this.rZo(i, r);
              break;
            case 5:
              this.nZo(i, r);
              break;
            case 6:
              this.sZo(i, r);
              break;
            case 7:
              this.aZo(i, r);
              break;
            case 8:
              this.hZo(i, r);
              break;
            case 9:
              this.bst(i, r);
              break;
            case 10:
              this.lZo(i, r);
              break;
            case 11:
              this._Zo(i, r);
          }
        }
      } catch (e) {
        e instanceof Error
          ? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Skill",
              r.Entity,
              "SkillBehaviorAction.Begin异常",
              e,
              ["技能Id", r.Skill.SkillId],
              ["技能名", r.Skill.SkillName],
            )
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              r.Entity,
              "SkillBehaviorAction.Begin异常",
              ["技能Id", r.Skill.SkillId],
              ["技能名", r.Skill.SkillName],
            );
      }
  }
  static End(r) {
    SkillBehaviorMisc_1.paramMap.get(r)?.forEach((a) => {
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        a.Entity,
        "SkillBehaviorAction.End",
        ["技能Id", r.SkillId],
        ["技能名", r.SkillName],
        ["技能行为", a.ActionType],
      );
      try {
        switch (a.ActionType) {
          case 2:
            a.GameplayCue.Destroy();
            break;
          case 6:
            a.Entity.GetComponent(163).CharacterMovement.SetMovementMode(
              a.MovementMode,
            );
            break;
          case 7:
            a.Entity.GetComponent(
              3,
            ).Actor.CapsuleComponent.SetCollisionResponseToChannel(
              a.CollisionChannel,
              a.CollisionResponse,
            );
            break;
          case 8:
            a.SummonSkillComponent.EndSkill(
              a.SummonSkillId,
              "SkillBehaviorAction.End",
            );
        }
      } catch (e) {
        e instanceof Error
          ? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Skill",
              a.Entity,
              "SkillBehaviorAction.End异常",
              e,
              ["技能Id", r.SkillId],
              ["技能名", r.SkillName],
              ["技能行为", a.ActionType],
            )
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              a.Entity,
              "SkillBehaviorAction.End异常",
              ["技能Id", r.SkillId],
              ["技能名", r.SkillName],
              ["技能行为", a.ActionType],
            );
      }
    }),
      SkillBehaviorMisc_1.paramMap.delete(r);
  }
  static tZo(a, r) {
    var i = r.Entity.GetComponent(3);
    let t = i.ActorLocation,
      e = i.ActorForward;
    switch (a.LocationType) {
      case 0:
        break;
      case 1:
        r.SkillComponent.SkillTarget &&
          (([t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            r.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner,
          )),
          (t = r.SkillComponent.GetTargetTransform().GetLocation()));
        break;
      case 2:
        var l =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
            29,
          ).GetCurrentTarget();
        l &&
          ([t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            l.Entity.GetComponent(1).Owner,
          ));
        break;
      case 3:
        [t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
          Global_1.Global.BaseCharacter,
        );
        break;
      case 4:
        l = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r.Entity.GetComponent(0).GetSummonerId(),
        )?.Entity?.GetComponent(1);
        [t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(l.Owner);
        break;
      case 5:
        [t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4)
            .CameraActor,
        );
        break;
      case 6:
        l = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
          r.Entity.Id,
          a.BlackboardKey,
        );
        t = WorldGlobal_1.WorldGlobal.ToUeVector(l);
        break;
      case 7:
        (l = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          r.Entity.Id,
          a.BlackboardKey,
        )),
          (l = EntitySystem_1.EntitySystem.Get(l));
        l?.Valid &&
          ([t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            l.GetComponent(154).Owner,
          ));
    }
    switch (a.LocationForwardType) {
      case 0:
        break;
      case 1:
        e = i.Actor.GetActorForwardVector();
        break;
      case 2:
        (e = i.ActorLocation.op_Subtraction(t)).Set(e.X, e.Y, 0);
        break;
      case 3:
        (e = t.op_Subtraction(
          Global_1.Global.CharacterCameraManager.GetCameraLocation(),
        )).Set(e.X, e.Y, 0);
    }
    var o,
      s = Vector_1.Vector.Create(t),
      c = new UE.Transform(e.Rotation(), t, Vector_1.Vector.OneVector);
    if (((t = c.TransformPositionNoScale(a.LocationOffset)), a.Restrict)) {
      let e = i.ActorLocation;
      switch (a.RestrictType) {
        case 0:
          e = Global_1.Global.BaseCharacter.K2_GetActorLocation();
          break;
        case 1:
          break;
        case 2:
          r.Entity.GetComponent(0).IsMonster() &&
            ((o = i.GetInitLocation()), e.Set(o.X, o.Y, o.Z));
      }
      var c = t.op_Subtraction(e).Size2D();
      c > a.RestrictDistance &&
        ((c = a.RestrictDistance / c),
        MathUtils_1.MathUtils.LerpVector(e, t, c, t));
    }
    let n = Vector_1.Vector.Create(t);
    if (!s.Equals(n) && a.BestSpot) {
      switch (a.Strategy) {
        case 0:
          var _ = (0, SkillBehaviorMisc_1.traceWall)(i, s, n, a.DebugTrace);
          if (!_) return;
          n = _[1];
          break;
        case 1: {
          let e = !1;
          var k = Vector_1.Vector.Create(),
            v = Vector_1.Vector.Create();
          n.Subtraction(s, k);
          for (const h of SkillBehaviorMisc_1.angles) {
            k.RotateAngleAxis(h, Vector_1.Vector.UpVectorProxy, v),
              s.Addition(v, n);
            var b = (0, SkillBehaviorMisc_1.traceWall)(i, s, n, a.DebugTrace);
            if (!b) return;
            if (!b[0]) {
              (e = !0), (n = b[1]);
              break;
            }
          }
          if (e) break;
          return;
        }
      }
      c = (0, SkillBehaviorMisc_1.traceGround)(i, n, a.DebugTrace);
      if (!c[0]) return;
      n = c[1];
    }
    if (
      ((t = n.ToUeVector()),
      0 < a.Navigation &&
        !UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          t,
          void 0,
          void 0,
          void 0,
          SkillBehaviorMisc_1.queryExtent,
        ))
    ) {
      c = (0, puerts_1.$ref)(void 0);
      if (
        !UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
          GlobalData_1.GlobalData.World,
          t,
          c,
          a.Navigation,
        )
      )
        return;
      t = (0, puerts_1.$unref)(c);
    }
    CombatDebugController_1.CombatDebugController.CombatDebug(
      "Skill",
      r.Entity,
      "SkillBehaviorAction.SetLocation",
      ["位置", t],
    ),
      i.SetActorLocation(t, SkillBehaviorMisc_1.CONTEXT + ".Final", !1);
  }
  static bd(e, a) {
    let r = void 0,
      i = void 0;
    switch (e.RotationType) {
      case 0:
        i = a.SkillComponent.SkillTarget;
        break;
      case 1:
        i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var t = a.Entity.GetComponent(0);
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t.GetSummonerId(),
        );
        break;
      case 3:
        r =
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
            4,
          ).CameraActor.K2_GetActorLocation();
        break;
      case 4:
        a.SkillComponent.SkillTarget ===
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
          ? (r =
              ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
                4,
              ).CameraActor.K2_GetActorLocation())
          : (i = a.SkillComponent.SkillTarget);
        break;
      default:
        i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
          a.Entity,
        );
    }
    i && i.Entity !== a.Entity && (r = i.Entity.GetComponent(1).ActorLocation);
    var l,
      o = a.Entity.GetComponent(3);
    let s = void 0;
    ((s = r
      ? (((l = r.op_Subtraction(o.ActorLocation)).Z = 0), l.Rotation())
      : o.ActorRotation).Yaw += e.DirectionOffset),
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        a.Entity,
        "SkillBehaviorAction.SetRotation",
        ["朝向", s],
      ),
      o.SetActorRotation(s, "SkillBehaviorAction.SetDirection");
  }
  static iZo(a, r) {
    var i = r.Entity.GetComponent(19);
    for (let e = 0; e < a.Cues.Num(); e++) {
      var t = a.Cues.Get(e),
        l = GameplayCueById_1.configGameplayCueById.GetConfig(t.CueId),
        l = i.CreateGameplayCue(l, { Sync: !0 });
      t.Stop &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(r.Skill).push({
          Entity: r.Entity,
          ActionType: a.ActionType,
          GameplayCue: l,
        });
    }
  }
  static oZo(a, r) {
    for (let e = 0; e < a.Bullets.Num(); e++) {
      var i,
        t = a.Bullets.Get(e);
      for (let e = 0; e < t.bulletCount; e++) {
        let e = -1;
        r.Skill.MontageContextId
          ? (i = r.Entity.GetComponent(3).Actor) instanceof
              TsBaseCharacter_1.default &&
            (e = BulletUtil_1.BulletUtil.CreateBulletFromAN(
              i,
              t.bulletRowName,
              r.Entity.GetComponent(3).ActorTransform,
              r.Skill.SkillId.toString(),
              !1,
              void 0,
            ))
          : (e = BulletController_1.BulletController.CreateBulletCustomTarget(
              r.Entity,
              t.bulletRowName,
              r.Entity.GetComponent(3).ActorTransform,
              { SkillId: r.Skill.SkillId },
              r.Skill.CombatMessageId,
            ).Id),
          t.BlackboardKey &&
            BlackboardController_1.BlackboardController.SetIntValueByEntity(
              r.Entity.Id,
              t.BlackboardKey,
              e,
            );
      }
    }
  }
  static rZo(e, a) {
    a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(a.Entity.Id);
    CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
      a,
      e.CameraModifierSettings,
      e.CameraEffectiveClientType,
      e.CameraModifierConditions,
    ) &&
      CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
        e.Tag,
        e.Duration,
        e.BlendInTime,
        e.BlendOutTime,
        e.CameraModifierSettings,
        void 0,
        e.BreakBlendOutTime,
        void 0,
        void 0,
        void 0,
        e.CameraAttachSocket.toString(),
      );
  }
  static nZo(e, a) {
    CameraController_1.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
      e.CameraSequenceSettings,
      e.ResetLockOnCamera,
      e.AdditiveRotation,
      a.Entity.GetComponent(3).Actor,
      e.CameraAttachSocket,
      e.CameraDetectSocket,
      e.ExtraSphereLocation,
      e.ExtraDetectSphereRadius,
      e.IsShowExtraSphere,
    );
  }
  static sZo(e, a) {
    a.Entity.GetComponent(163).CharacterMovement.SetMovementMode(
      e.BeginMovementMode,
    ),
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
        Entity: a.Entity,
        ActionType: e.ActionType,
        MovementMode: e.EndMovementMode,
      });
  }
  static aZo(e, a) {
    var r = a.Entity.GetComponent(3).Actor.CapsuleComponent;
    e.CollisionRestore &&
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
        Entity: a.Entity,
        ActionType: e.ActionType,
        CollisionChannel: e.CollisionChannel,
        CollisionResponse: r.GetCollisionResponseToChannel(e.CollisionChannel),
      }),
      r.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
  }
  static hZo(e, a) {
    var r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      a.Entity,
      Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantCustom,
      e.FollowIndex,
    );
    r &&
      ((r = r.Entity.GetComponent(33)),
      e.StopSummonSkill &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
          Entity: a.Entity,
          ActionType: e.ActionType,
          SummonSkillComponent: r,
          SummonSkillId: e.SummonSkillId,
        }),
      r.BeginSkill(e.SummonSkillId, {
        Target: a.SkillComponent.SkillTarget?.Entity,
        Context: "SkillBehaviorAction.UseSummonSkill",
      }));
  }
  static bst(e, a) {
    let r = void 0;
    switch (e.BuffTarget) {
      case 0:
        r = a.Entity.GetComponent(159);
        break;
      case 1:
        r = a.SkillComponent.SkillTarget?.Entity?.GetComponent(159);
    }
    var i, t;
    r &&
      (e.Add
        ? ((i = {
            InstigatorId:
              ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
                a.Entity.Id,
              ),
            Reason: "从技能行为添加Buff",
            PreMessageId: a.Skill.CombatMessageId,
          }),
          a.Skill.MontageContextId
            ? ((t = a.Entity.GetComponent(159)),
              r.AddBuffFromAnimNotify(e.BuffId, t, i))
            : r.AddBuff(e.BuffId, i))
        : r.RemoveBuff(e.BuffId, -1, "从技能行为移除Buff"));
  }
  static lZo(e, a) {
    a = EntitySystem_1.EntitySystem.GetComponent(a.Entity.Id, 188);
    a?.Valid &&
      "None" !== e.Tag.TagName &&
      (e.Add ? a.AddTag(e.Tag.TagId) : a.RemoveTag(e.Tag.TagId));
  }
  static _Zo(e, a) {
    a = EntitySystem_1.EntitySystem.GetComponent(a.Entity.Id, 18);
    a?.Valid && a.TryExitWeakTime();
  }
}
exports.SkillBehaviorAction = SkillBehaviorAction;
//# sourceMappingURL=SkillBehaviorAction.js.map
