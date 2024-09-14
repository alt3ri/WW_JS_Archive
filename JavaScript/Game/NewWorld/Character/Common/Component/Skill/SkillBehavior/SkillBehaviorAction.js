"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorAction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
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
  SceneItemReferenceComponent_1 = require("../../../../../SceneItem/SceneItemReferenceComponent"),
  SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
class SkillBehaviorAction {
  static BeginGroup(r, a) {
    if (a.Entity.GetComponent(3).IsAutonomousProxy)
      for (let e = 0; e < r.Num(); e++) this.Begin(r.Get(e), a);
  }
  static Begin(e, r) {
    CombatDebugController_1.CombatDebugController.CombatDebug(
      "Skill",
      r.Entity,
      "SkillBehaviorAction.Begin",
      ["技能Id", r.Skill.SkillId],
      ["技能名", r.Skill.SkillName],
      ["技能行为", e.ActionType],
    );
    try {
      switch (e.ActionType) {
        case 0:
          this.tZo(e, r);
          break;
        case 1:
          this.bd(e, r);
          break;
        case 2:
          this.iZo(e, r);
          break;
        case 3:
          this.oZo(e, r);
          break;
        case 4:
          this.rZo(e, r);
          break;
        case 5:
          this.nZo(e, r);
          break;
        case 6:
          this.sZo(e, r);
          break;
        case 7:
          this.aZo(e, r);
          break;
        case 8:
          this.hZo(e, r);
          break;
        case 9:
          this.bst(e, r);
          break;
        case 10:
          this.lZo(e, r);
          break;
        case 11:
          this._Zo(e, r);
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
  static End(a) {
    SkillBehaviorMisc_1.paramMap.get(a)?.forEach((r) => {
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        r.Entity,
        "SkillBehaviorAction.End",
        ["技能Id", a.SkillId],
        ["技能名", a.SkillName],
        ["技能行为", r.ActionType],
      );
      try {
        switch (r.ActionType) {
          case 2:
            r.Entity.GetComponent(19).DestroyGameplayCueByHandle(r.GameplayCue);
            break;
          case 6:
            r.Entity.GetComponent(164).CharacterMovement.SetMovementMode(
              r.MovementMode,
            );
            break;
          case 7:
            r.Entity.GetComponent(
              3,
            ).Actor.CapsuleComponent.SetCollisionResponseToChannel(
              r.CollisionChannel,
              r.CollisionResponse,
            );
            break;
          case 8:
            r.SummonSkillComponent.EndSkill(
              r.SummonSkillId,
              "SkillBehaviorAction.End",
            );
        }
      } catch (e) {
        e instanceof Error
          ? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Skill",
              r.Entity,
              "SkillBehaviorAction.End异常",
              e,
              ["技能Id", a.SkillId],
              ["技能名", a.SkillName],
              ["技能行为", r.ActionType],
            )
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              r.Entity,
              "SkillBehaviorAction.End异常",
              ["技能Id", a.SkillId],
              ["技能名", a.SkillName],
              ["技能行为", r.ActionType],
            );
      }
    }),
      SkillBehaviorMisc_1.paramMap.delete(a);
  }
  static tZo(r, a) {
    var i = a.Entity.GetComponent(3);
    let t = i.ActorLocation,
      e = i.ActorForward;
    switch (r.LocationType) {
      case 0:
        break;
      case 1:
        a.SkillComponent.SkillTarget &&
          (([t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            a.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner,
          )),
          (t = a.SkillComponent.GetTargetTransform().GetLocation()));
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
          a.Entity.GetComponent(0).GetSummonerId(),
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
          a.Entity.Id,
          r.BlackboardKey,
        );
        t = WorldGlobal_1.WorldGlobal.ToUeVector(l);
        break;
      case 7:
        (l = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          a.Entity.Id,
          r.BlackboardKey,
        )),
          (l = EntitySystem_1.EntitySystem.Get(l));
        l?.Valid &&
          ([t, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
            l.GetComponent(155).Owner,
          ));
    }
    switch (r.LocationForwardType) {
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
      c = Vector_1.Vector.Create(t),
      s = new UE.Transform(e.Rotation(), t, Vector_1.Vector.OneVector);
    if (((t = s.TransformPositionNoScale(r.LocationOffset)), r.Restrict)) {
      let e = i.ActorLocation;
      switch (r.RestrictType) {
        case 0:
          e = Global_1.Global.BaseCharacter.K2_GetActorLocation();
          break;
        case 1:
          break;
        case 2:
          a.Entity.GetComponent(0).IsMonster() &&
            ((o = i.GetInitLocation()), e.Set(o.X, o.Y, o.Z));
      }
      var s = t.op_Subtraction(e).Size2D();
      s > r.RestrictDistance &&
        ((s = r.RestrictDistance / s),
        MathUtils_1.MathUtils.LerpVector(e, t, s, t));
    }
    let n = Vector_1.Vector.Create(t);
    if (!c.Equals(n) && r.BestSpot) {
      switch (r.Strategy) {
        case 0:
          var _ = (0, SkillBehaviorMisc_1.traceWall)(i, c, n, r.DebugTrace);
          if (!_) return;
          n = _[1];
          break;
        case 1: {
          let e = !1;
          var k = Vector_1.Vector.Create(),
            v = Vector_1.Vector.Create();
          n.Subtraction(c, k);
          for (const C of SkillBehaviorMisc_1.angles) {
            k.RotateAngleAxis(C, Vector_1.Vector.UpVectorProxy, v),
              c.Addition(v, n);
            var b = (0, SkillBehaviorMisc_1.traceWall)(i, c, n, r.DebugTrace);
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
      if (0 !== r.LocationType) {
        var s = Vector_1.Vector.Create(i.ActorLocation),
          h = Vector_1.Vector.Create(n),
          s = (0, SkillBehaviorMisc_1.traceWall)(i, s, h, r.DebugTrace);
        if (!s) return;
        var S = s[0];
        if (S) {
          var u = S.GetHitCount();
          for (let e = 0; e < u; e++)
            if (
              -1 !==
              S.Actors.Get(e).Tags.FindIndex(
                SceneItemReferenceComponent_1.AIR_WALL,
              )
            )
              return;
        }
      }
      if (r.OnGround) {
        h = (0, SkillBehaviorMisc_1.traceGround)(i, n, r.DebugTrace);
        if (!h[0]) return;
        n = h[1];
      }
    }
    if (
      ((t = n.ToUeVector()),
      0 < r.Navigation &&
        !UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          t,
          void 0,
          void 0,
          void 0,
          SkillBehaviorMisc_1.queryExtent,
        ))
    ) {
      s = (0, puerts_1.$ref)(void 0);
      if (
        !UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
          GlobalData_1.GlobalData.World,
          t,
          s,
          r.Navigation,
        )
      )
        return;
      t = (0, puerts_1.$unref)(s);
    }
    CombatDebugController_1.CombatDebugController.CombatDebug(
      "Skill",
      a.Entity,
      "SkillBehaviorAction.SetLocation",
      ["位置", t],
    ),
      i.SetActorLocation(t, SkillBehaviorMisc_1.CONTEXT + ".Final", !1);
  }
  static bd(e, r) {
    let a = void 0,
      i = void 0;
    switch (e.RotationType) {
      case 0:
        i = r.SkillComponent.SkillTarget;
        break;
      case 1:
        i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var t = r.Entity.GetComponent(0);
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t.GetSummonerId(),
        );
        break;
      case 3:
        a =
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
            4,
          ).CameraActor.K2_GetActorLocation();
        break;
      case 4:
        r.SkillComponent.SkillTarget ===
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
          ? (a =
              ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
                4,
              ).CameraActor.K2_GetActorLocation())
          : (i = r.SkillComponent.SkillTarget);
        break;
      default:
        i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
          r.Entity,
        );
    }
    i && i.Entity !== r.Entity && (a = i.Entity.GetComponent(1).ActorLocation);
    var l,
      o = r.Entity.GetComponent(3);
    let c = void 0;
    ((c = a
      ? (((l = a.op_Subtraction(o.ActorLocation)).Z = 0), l.Rotation())
      : o.ActorRotation).Yaw += e.DirectionOffset),
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        r.Entity,
        "SkillBehaviorAction.SetRotation",
        ["朝向", c],
      ),
      o.SetActorRotation(c, "SkillBehaviorAction.SetDirection");
  }
  static iZo(r, a) {
    var i = a.Entity.GetComponent(19);
    for (let e = 0; e < r.Cues.Num(); e++) {
      var t = r.Cues.Get(e),
        l = i.CreateGameplayCue(t.CueId, { Sync: !0 });
      t.Stop &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
          Entity: a.Entity,
          ActionType: r.ActionType,
          GameplayCue: l,
        });
    }
  }
  static oZo(r, a) {
    for (let e = 0; e < r.Bullets.Num(); e++) {
      var i,
        t = r.Bullets.Get(e);
      for (let e = 0; e < t.bulletCount; e++) {
        let e = -1;
        a.Skill.MontageContextId
          ? (i = a.Entity.GetComponent(3).Actor) instanceof
              TsBaseCharacter_1.default &&
            (e = BulletUtil_1.BulletUtil.CreateBulletFromAN(
              i,
              t.bulletRowName,
              a.Entity.GetComponent(3).ActorTransform,
              a.Skill.SkillId.toString(),
              !0,
              void 0,
            ))
          : (e = BulletController_1.BulletController.CreateBulletCustomTarget(
              a.Entity,
              t.bulletRowName,
              a.Entity.GetComponent(3).ActorTransform,
              { SkillId: a.Skill.SkillId, SyncType: 1 },
              a.Skill.CombatMessageId,
            ).Id),
          t.BlackboardKey &&
            BlackboardController_1.BlackboardController.SetIntValueByEntity(
              a.Entity.Id,
              t.BlackboardKey,
              e,
            );
      }
    }
  }
  static rZo(e, r) {
    r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.Entity.Id);
    CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
      r,
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
  static nZo(e, r) {
    CameraController_1.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
      e.CameraSequenceSettings,
      e.ResetLockOnCamera,
      e.AdditiveRotation,
      r.Entity.GetComponent(3).Actor,
      e.CameraAttachSocket,
      e.CameraDetectSocket,
      e.ExtraSphereLocation,
      e.ExtraDetectSphereRadius,
      e.IsShowExtraSphere,
    );
  }
  static sZo(e, r) {
    r.Entity.GetComponent(164).CharacterMovement.SetMovementMode(
      e.BeginMovementMode,
    ),
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(r.Skill).push({
        Entity: r.Entity,
        ActionType: e.ActionType,
        MovementMode: e.EndMovementMode,
      });
  }
  static aZo(e, r) {
    var a = r.Entity.GetComponent(3).Actor.CapsuleComponent;
    e.CollisionRestore &&
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(r.Skill).push({
        Entity: r.Entity,
        ActionType: e.ActionType,
        CollisionChannel: e.CollisionChannel,
        CollisionResponse: a.GetCollisionResponseToChannel(e.CollisionChannel),
      }),
      a.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
  }
  static hZo(e, r) {
    var a = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      r.Entity,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
      e.FollowIndex,
    );
    a &&
      ((a = a.Entity.GetComponent(34)),
      e.StopSummonSkill &&
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(r.Skill).push({
          Entity: r.Entity,
          ActionType: e.ActionType,
          SummonSkillComponent: a,
          SummonSkillId: e.SummonSkillId,
        }),
      a.BeginSkill(e.SummonSkillId, {
        Target: r.SkillComponent.SkillTarget?.Entity,
        Context: "SkillBehaviorAction.UseSummonSkill",
      }));
  }
  static bst(e, r) {
    let a = void 0;
    switch (e.BuffTarget) {
      case 0:
        a = r.Entity.GetComponent(160);
        break;
      case 1:
        a = r.SkillComponent.SkillTarget?.Entity?.GetComponent(160);
    }
    var i, t;
    a &&
      (e.Add
        ? ((i = {
            InstigatorId:
              ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
                r.Entity.Id,
              ),
            Reason: "从技能行为添加Buff",
            PreMessageId: r.Skill.CombatMessageId,
          }),
          r.Skill.MontageContextId
            ? ((t = r.Entity.GetComponent(160)),
              a.AddBuffFromAnimNotify(e.BuffId, t, i))
            : a.AddBuff(e.BuffId, i))
        : a.RemoveBuff(e.BuffId, -1, "从技能行为移除Buff"));
  }
  static lZo(e, r) {
    r = EntitySystem_1.EntitySystem.GetComponent(r.Entity.Id, 190);
    r?.Valid &&
      "None" !== e.Tag.TagName &&
      (e.Add ? r.AddTag(e.Tag.TagId) : r.RemoveTag(e.Tag.TagId));
  }
  static _Zo(e, r) {
    r = EntitySystem_1.EntitySystem.GetComponent(r.Entity.Id, 18);
    r?.Valid && r.TryExitWeakTime();
  }
}
exports.SkillBehaviorAction = SkillBehaviorAction;
//# sourceMappingURL=SkillBehaviorAction.js.map
