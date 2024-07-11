"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionDestroyBullet = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BulletController_1 = require("../BulletController");
const BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil");
const BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletUtil_1 = require("../BulletUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionDestroyBullet extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    const t = this.ActionInfo;
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
      t.DestroyReason === 1 && this.x4o(),
      this.BulletInfo.AttackerHandle?.Valid &&
        this.BulletInfo.AttackerActorComp?.Actor &&
        (this.B4o(), this.b4o()),
      this.G4o(),
      this.N4o(),
      this.BulletInfo.NeedNotifyChildrenWhenDestroy &&
        this.BulletInfo.ChildEntityIds)
    )
      for (const e of this.BulletInfo.ChildEntityIds)
        BulletController_1.BulletController.DestroyBullet(e, !1, 1);
    for (const l of this.BulletInfo.CollisionInfo.LastArrayHitActorData)
      l.IsValidHit &&
        BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(
          this.BulletInfo,
          l,
        );
  }
  x4o() {
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
  b4o() {
    let t, e;
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
  N4o() {
    const t = this.BulletInfo.BulletDataMain;
    this.BulletInfo.SummonServerEntityId === 0 ||
      t.Summon.EntityId <= 0 ||
      !t.Summon.DestroyEntityOnBulletEnd ||
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(
        this.BulletInfo.BulletInitParams.SkillId,
        this.BulletInfo.SummonAttackerId,
        this.BulletInfo.SummonServerEntityId,
      );
  }
  B4o() {
    const e = this.BulletInfo.ChildInfo;
    const l = this.BulletInfo.BulletDataMain.Children;
    const i = l.length;
    for (let t = 0; t < i; ++t) {
      var o;
      const s = l[t];
      ((s.Condition === 4 && this.BulletInfo.IsTimeNotEnough) ||
        (s.Condition === 3 && e.IsNumberNotEnough) ||
        (s.Condition === 0 && e.IsActiveSummonChildBullet)) &&
        ((o = Number(s.RowName)),
        isNaN(o) ||
          !o ||
          s.Num < 1 ||
          ((o = BulletController_1.BulletController.CreateBulletCustomTarget(
            this.BulletInfo.AttackerActorComp.Actor,
            s.RowName.toString(),
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
  G4o() {
    this.BulletInfo.IsDestroyByCharSkillEnd &&
      BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
        this.BulletInfo,
        1,
        "[BulletActionDestroyBullet.BulletEffectOnDestroy] 1",
      ),
      this.BulletInfo.IsTimeNotEnough &&
        BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
          this.BulletInfo,
          0,
          "[BulletActionDestroyBullet.BulletEffectOnDestroy] 2",
        ),
      this.BulletInfo.ActionLogicComponent.ActionDestroy(),
      BulletStaticFunction_1.BulletStaticFunction.DestroyEffect(
        this.BulletInfo.EffectInfo,
      );
  }
}
((exports.BulletActionDestroyBullet = BulletActionDestroyBullet).w4o = void 0),
  (BulletActionDestroyBullet.q4o = void 0),
  (BulletActionDestroyBullet.k4o = void 0),
  (BulletActionDestroyBullet.F4o = void 0),
  (BulletActionDestroyBullet.O4o = void 0);
// # sourceMappingURL=BulletActionDestroyBullet.js.map
