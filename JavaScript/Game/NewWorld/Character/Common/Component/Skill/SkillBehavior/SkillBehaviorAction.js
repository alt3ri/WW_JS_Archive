"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorAction = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../../../Camera/CameraController");
const CameraUtility_1 = require("../../../../../../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../../../../../../Character/TsBaseCharacter");
const Global_1 = require("../../../../../../Global");
const GlobalData_1 = require("../../../../../../GlobalData");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CombatDebugController_1 = require("../../../../../../Utils/CombatDebugController");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const WorldGlobal_1 = require("../../../../../../World/WorldGlobal");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const BulletUtil_1 = require("../../../../../Bullet/BulletUtil");
const SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
class SkillBehaviorAction {
  static Begin(a, r) {
    if (r.Entity.GetComponent(3).IsAutonomousProxy)
      try {
        for (let e = 0; e < a.Num(); e++) {
          const i = a.Get(e);
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
              this.rzo(i, r);
              break;
            case 1:
              this.bd(i, r);
              break;
            case 2:
              this.nzo(i, r);
              break;
            case 3:
              this.szo(i, r);
              break;
            case 4:
              this.azo(i, r);
              break;
            case 5:
              this.hzo(i, r);
              break;
            case 6:
              this.lzo(i, r);
              break;
            case 7:
              this._zo(i, r);
              break;
            case 8:
              this.uzo(i, r);
              break;
            case 9:
              this.Ent(i, r);
              break;
            case 10:
              this.czo(i, r);
              break;
            case 11:
              this.mzo(i, r);
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
            a.Entity.GetComponent(161).CharacterMovement.SetMovementMode(
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
  static rzo(a, r) {
    const i = r.Entity.GetComponent(3);
    let l = i.ActorLocation;
    let e = i.ActorForward;
    switch (a.LocationType) {
      case 0:
        break;
      case 1:
        r.SkillComponent.SkillTarget &&
          (([l, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            r.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner,
          )),
          (l = r.SkillComponent.GetTargetTransform().GetLocation()));
        break;
      case 2:
        var t =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
            29,
          ).GetCurrentTarget();
        t &&
          ([l, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            t.Entity.GetComponent(1).Owner,
          ));
        break;
      case 3:
        [l, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
          Global_1.Global.BaseCharacter,
        );
        break;
      case 4:
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r.Entity.GetComponent(0).GetSummonerId(),
        )?.Entity?.GetComponent(1);
        [l, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(t.Owner);
        break;
      case 5:
        [l, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4)
            .CameraActor,
        );
        break;
      case 6:
        t = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
          r.Entity.Id,
          a.BlackboardKey,
        );
        l = WorldGlobal_1.WorldGlobal.ToUeVector(t);
        break;
      case 7:
        (t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          r.Entity.Id,
          a.BlackboardKey,
        )),
          (t = EntitySystem_1.EntitySystem.Get(t));
        t?.Valid &&
          ([l, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            t.GetComponent(152).Owner,
          ));
    }
    switch (a.LocationForwardType) {
      case 0:
        break;
      case 1:
        e = i.Actor.GetActorForwardVector();
        break;
      case 2:
        (e = i.ActorLocation.op_Subtraction(l)).Set(e.X, e.Y, 0);
        break;
      case 3:
        (e = l.op_Subtraction(
          Global_1.Global.CharacterCameraManager.GetCameraLocation(),
        )).Set(e.X, e.Y, 0);
    }
    let o;
    const s = Vector_1.Vector.Create(l);
    var c = new UE.Transform(e.Rotation(), l, Vector_1.Vector.OneVector);
    if (((l = c.TransformPositionNoScale(a.LocationOffset)), a.Restrict)) {
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
      var c = l.op_Subtraction(e).Size2D();
      c > a.RestrictDistance &&
        ((c = a.RestrictDistance / c),
        MathUtils_1.MathUtils.LerpVector(e, l, c, l));
    }
    let n = Vector_1.Vector.Create(l);
    if (!s.Equals(n) && a.BestSpot) {
      switch (a.Strategy) {
        case 0:
          var _ = (0, SkillBehaviorMisc_1.forwardTrace)(i, s, n, a.DebugTrace);
          if (!_) return;
          n = _[1];
          break;
        case 1: {
          let e = !1;
          const k = Vector_1.Vector.Create();
          const v = Vector_1.Vector.Create();
          n.Subtraction(s, k);
          for (const h of SkillBehaviorMisc_1.angles) {
            k.RotateAngleAxis(h, Vector_1.Vector.UpVectorProxy, v),
              s.Addition(v, n);
            const b = (0, SkillBehaviorMisc_1.forwardTrace)(
              i,
              s,
              n,
              a.DebugTrace,
            );
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
      c = (0, SkillBehaviorMisc_1.downTrace)(i, n, a.DebugTrace);
      n = c[0]
        ? c[1]
        : (0, SkillBehaviorMisc_1.getValidLocation)(
            i,
            s,
            n,
            Vector_1.Vector.Create(),
            a.DebugTrace,
          );
    }
    if (
      ((l = n.ToUeVector()),
      a.Navigation > 0 &&
        !UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          l,
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
          l,
          c,
          a.Navigation,
        )
      )
        return;
      l = (0, puerts_1.$unref)(c);
    }
    CombatDebugController_1.CombatDebugController.CombatDebug(
      "Skill",
      r.Entity,
      "SkillBehaviorAction.SetLocation",
      ["位置", l],
    ),
      i.SetActorLocation(l, SkillBehaviorMisc_1.CONTEXT + ".Final", !1);
  }
  static bd(e, a) {
    let r = void 0;
    let i = void 0;
    switch (e.RotationType) {
      case 0:
        i = a.SkillComponent.SkillTarget;
        break;
      case 1:
        i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var l = a.Entity.GetComponent(0);
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          l.GetSummonerId(),
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
    let t;
    const o = a.Entity.GetComponent(3);
    let s = void 0;
    ((s = r
      ? (((t = r.op_Subtraction(o.ActorLocation)).Z = 0), t.Rotation())
      : o.ActorRotation).Yaw += e.DirectionOffset),
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        a.Entity,
        "SkillBehaviorAction.SetRotation",
        ["朝向", s],
      ),
      o.SetActorRotation(s, "SkillBehaviorAction.SetDirection");
  }
  static nzo(a, r) {
    const i = r.Entity.GetComponent(19);
    for (let e = 0; e < a.Cues.Num(); e++) {
      const l = a.Cues.Get(e);
      var t = GameplayCueById_1.configGameplayCueById.GetConfig(l.CueId);
      var t = i.CreateGameplayCue(t, { Sync: !0 });
      l.Stop &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(r.Skill).push({
          Entity: r.Entity,
          ActionType: a.ActionType,
          GameplayCue: t,
        });
    }
  }
  static szo(a, r) {
    for (let e = 0; e < a.Bullets.Num(); e++) {
      var i;
      const l = a.Bullets.Get(e);
      for (let e = 0; e < l.bulletCount; e++) {
        let e = -1;
        r.Skill.MontageContextId
          ? (i = r.Entity.GetComponent(3).Actor) instanceof
              TsBaseCharacter_1.default &&
            (e = BulletUtil_1.BulletUtil.CreateBulletFromAN(
              i,
              l.bulletRowName,
              r.Entity.GetComponent(3).ActorTransform,
              r.Skill.SkillId.toString(),
              !1,
              void 0,
            ))
          : (e = BulletController_1.BulletController.CreateBulletCustomTarget(
              r.Entity,
              l.bulletRowName,
              r.Entity.GetComponent(3).ActorTransform,
              { SkillId: r.Skill.SkillId },
              r.Skill.CombatMessageId,
            ).Id),
          l.BlackboardKey &&
            BlackboardController_1.BlackboardController.SetIntValueByEntity(
              r.Entity.Id,
              l.BlackboardKey,
              e,
            );
      }
    }
  }
  static azo(e, a) {
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
  static hzo(e, a) {
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
  static lzo(e, a) {
    a.Entity.GetComponent(161).CharacterMovement.SetMovementMode(
      e.BeginMovementMode,
    ),
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
        Entity: a.Entity,
        ActionType: e.ActionType,
        MovementMode: e.EndMovementMode,
      });
  }
  static _zo(e, a) {
    const r = a.Entity.GetComponent(3).Actor.CapsuleComponent;
    e.CollisionRestore &&
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
        Entity: a.Entity,
        ActionType: e.ActionType,
        CollisionChannel: e.CollisionChannel,
        CollisionResponse: r.GetCollisionResponseToChannel(e.CollisionChannel),
      }),
      r.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
  }
  static uzo(e, a) {
    let r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      a.Entity,
      Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
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
  static Ent(e, a) {
    let r = void 0;
    switch (e.BuffTarget) {
      case 0:
        r = a.Entity.GetComponent(157);
        break;
      case 1:
        r = a.SkillComponent.SkillTarget?.Entity?.GetComponent(157);
    }
    let i, l;
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
            ? ((l = a.Entity.GetComponent(157)),
              r.AddBuffFromAnimNotify(e.BuffId, l, i))
            : r.AddBuff(e.BuffId, i))
        : r.RemoveBuff(e.BuffId, -1, "从技能行为移除Buff"));
  }
  static czo(e, a) {
    a = EntitySystem_1.EntitySystem.GetComponent(a.Entity.Id, 185);
    a?.Valid &&
      e.Tag.TagName !== "None" &&
      (e.Add ? a.AddTag(e.Tag.TagId) : a.RemoveTag(e.Tag.TagId));
  }
  static mzo(e, a) {
    a = EntitySystem_1.EntitySystem.GetComponent(a.Entity.Id, 18);
    a?.Valid && a.TryExitWeakTime();
  }
}
exports.SkillBehaviorAction = SkillBehaviorAction;
// # sourceMappingURL=SkillBehaviorAction.js.map
