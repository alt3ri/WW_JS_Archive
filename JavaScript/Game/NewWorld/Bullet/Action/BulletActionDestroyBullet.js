"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionDestroyBullet = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletController_1 = require("../BulletController"),
  BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
  BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
  BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionDestroyBullet extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var t = this.ActionInfo;
    if (
      (t.SummonChild &&
        (this.BulletInfo.ChildInfo
          ? this.BulletInfo.ChildInfo.SetIsActiveSummonChildBullet(!0)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "销毁时生成子子弹，但是缺少子子弹的配置",
              ["BulletId", this.BulletInfo.BulletRowName],
              ["EntityId", this.BulletInfo.BulletEntityId],
            )),
      1 === t.DestroyReason && this.U5o(),
      this.BulletInfo.AttackerHandle?.Valid &&
        this.BulletInfo.AttackerActorComp?.Actor &&
        (BulletActionDestroyBullet.A5o.Start(),
        this.P5o(),
        BulletActionDestroyBullet.A5o.Stop(),
        this.x5o()),
      BulletActionDestroyBullet.w5o.Start(),
      this.B5o(),
      BulletActionDestroyBullet.w5o.Stop(),
      this.b5o(),
      this.BulletInfo.NeedNotifyChildrenWhenDestroy &&
        this.BulletInfo.ChildEntityIds)
    )
      for (const o of this.BulletInfo.ChildEntityIds)
        BulletController_1.BulletController.DestroyBullet(o, !1, 1);
    var e,
      l,
      t = this.BulletInfo.CollisionInfo;
    for ([e, l] of t.HitTimeScaleEntityMap.entries()) {
      var i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
      i?.Valid && i.Entity.GetComponent(110)?.RemoveTimeScale(l);
    }
    t.HitTimeScaleEntityMap.clear();
    for (const r of t.LastArrayHitActorData)
      r.IsValidHit &&
        BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(
          this.BulletInfo,
          r,
        );
  }
  U5o() {
    BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(
      this.BulletInfo,
    ) &&
      (BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
        this.BulletInfo,
        8,
        "[BulletActionDestroyBullet.OnParentDestroy]",
      ),
      this.BulletInfo.ChildInfo?.SetIsNumberNotEnough(!0));
  }
  x5o() {
    var t, e;
    this.BulletInfo.AttackerActorComp?.Actor?.IsValid() &&
      ((t =
        this.BulletInfo.BulletDataMain.Execution
          .SendGameplayEventTagToAttackerOnEnd),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.BulletInfo.Attacker,
        EventDefine_1.EEventName.BulletDestroy,
        this.BulletInfo,
      ),
      t) &&
      t.TagName !== StringUtils_1.NONE_STRING &&
      (((e = new UE.GameplayEventData()).OptionalObject =
        this.BulletInfo.Actor),
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
        this.BulletInfo.AttackerActorComp.Actor,
        t,
        e,
      ));
  }
  b5o() {
    var t = this.BulletInfo.BulletDataMain;
    0 === this.BulletInfo.SummonServerEntityId ||
      t.Summon.EntityId <= 0 ||
      !t.Summon.DestroyEntityOnBulletEnd ||
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(
        this.BulletInfo.BulletInitParams.SkillId,
        this.BulletInfo.SummonAttackerId,
        this.BulletInfo.SummonServerEntityId,
      );
  }
  P5o() {
    var e = this.BulletInfo.ChildInfo,
      l = this.BulletInfo.BulletDataMain.Children,
      i = l.length;
    for (let t = 0; t < i; ++t) {
      var o,
        r = l[t];
      ((4 === r.Condition && this.BulletInfo.IsTimeNotEnough) ||
        (3 === r.Condition && e.IsNumberNotEnough) ||
        (0 === r.Condition && e.IsActiveSummonChildBullet)) &&
        ((o = Number(r.RowName)),
        isNaN(o) ||
          !o ||
          r.Num < 1 ||
          ((o = BulletController_1.BulletController.CreateBulletCustomTarget(
            this.BulletInfo.AttackerActorComp.Actor,
            r.RowName.toString(),
            this.BulletInfo.ActorComponent.ActorTransform,
            {
              SkillId: this.BulletInfo.BulletInitParams.SkillId,
              ParentTargetId: this.BulletInfo.Target?.Id,
              ParentId: this.BulletInfo.Entity.Id,
              DtType: this.BulletInfo.BulletInitParams.DtType,
            },
            this.BulletInfo.ContextId,
          )) &&
            BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
              this.BulletInfo,
              o,
            )));
    }
  }
  B5o() {
    this.BulletInfo.IsDestroyByCharSkillEnd &&
      (BulletActionDestroyBullet.q5o.Start(),
      BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
        this.BulletInfo,
        1,
        "[BulletActionDestroyBullet.BulletEffectOnDestroy] 1",
      ),
      BulletActionDestroyBullet.q5o.Stop()),
      this.BulletInfo.IsTimeNotEnough &&
        (BulletActionDestroyBullet.G5o.Start(),
        BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
          this.BulletInfo,
          0,
          "[BulletActionDestroyBullet.BulletEffectOnDestroy] 2",
        ),
        BulletActionDestroyBullet.G5o.Stop()),
      BulletActionDestroyBullet.N5o.Start(),
      this.BulletInfo.ActionLogicComponent.ActionDestroy(),
      BulletActionDestroyBullet.N5o.Stop(),
      BulletStaticFunction_1.BulletStaticFunction.DestroyEffect(
        this.BulletInfo.EffectInfo,
      );
  }
}
((exports.BulletActionDestroyBullet = BulletActionDestroyBullet).A5o =
  Stats_1.Stat.Create("BulletDataComp.ChildOnDestroy")),
  (BulletActionDestroyBullet.w5o = Stats_1.Stat.Create(
    "BulletDataComp.EffectOnDestroy",
  )),
  (BulletActionDestroyBullet.G5o = Stats_1.Stat.Create("SpawnHitEffect")),
  (BulletActionDestroyBullet.N5o = Stats_1.Stat.Create("ActionDestroy")),
  (BulletActionDestroyBullet.q5o = Stats_1.Stat.Create("ActionBreakEffect"));
//# sourceMappingURL=BulletActionDestroyBullet.js.map
