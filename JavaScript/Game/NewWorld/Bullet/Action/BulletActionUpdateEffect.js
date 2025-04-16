"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionUpdateEffect = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  CharacterUtils_1 = require("../../Character/CharacterUtils"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateEffect extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var t = this.BulletInfo.EffectInfo,
      e = this.BulletInfo.BulletDataMain,
      l =
        ((t.EffectData = e.Render),
        (t.IsFinishAuto = t.EffectData.EffectStopInsteadDestroy),
        t.EffectData.SpecialEffect);
    (t.DisablePostProcess =
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        this.BulletInfo.AttackerHandle,
      )),
      this.VVo(),
      4 === e.Base.Shape
        ? ((e = t.EffectData.EffectBulletParams.get(1)),
          (e = Number(e)),
          (t.EffectOriginSize = 1 / (isNaN(e) ? 1 : e)),
          (e = l.get(1)) &&
            0 < e.length &&
            ((t.EffectExtremity =
              BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
                this.BulletInfo.Actor,
                e,
                this.BulletInfo.ActorComponent.ActorTransform,
                this.BulletInfo,
                "[BulletActionUpdateEffect.OnExecute] 1",
              )),
            EffectSystem_1.EffectSystem.SetEffectHidden(t.EffectExtremity, !0)),
          (e = l.get(2)) &&
            0 < e.length &&
            ((l = this.BulletInfo.Actor),
            (t.EffectBlock =
              BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
                l,
                e,
                l.D_GetTransform(),
                this.BulletInfo,
                "[BulletActionUpdateEffect.OnExecute] 2",
              )),
            EffectSystem_1.EffectSystem.SetEffectHidden(t.EffectBlock, !0)))
        : (this.IsFinish = !0);
  }
  VVo() {
    var t,
      e,
      l,
      i,
      s,
      u = this.BulletInfo.ActorComponent;
    u &&
      (this.BulletInfo.BulletDataMain.Render.HandOverParentEffect
        ? BulletStaticFunction_1.BulletStaticFunction.HandOverEffectsAfterInitTransform(
            this.BulletInfo,
          )
        : (i = (l = this.BulletInfo.EffectInfo).EffectData).EffectBullet
            .length <= 0 ||
          ((t = BulletPool_1.BulletPool.CreateRotator()),
          this.BulletInfo.IsCollisionRelativeRotationModify
            ? MathUtils_1.MathUtils.ComposeRotator(
                BulletConstant_1.BulletConstant.RotateToRight,
                this.BulletInfo.BulletDataMain.Base.Rotator,
                t,
              )
            : t.FromUeRotator(BulletConstant_1.BulletConstant.RotateToRight),
          (s = new UE.TransformDouble(
            UE.KismetMathLibrary.D_TransformRotation(
              u.ActorTransform,
              t.ToUeRotator(),
            ),
            u.ActorLocation,
            u.ActorScale,
          )),
          BulletPool_1.BulletPool.RecycleRotator(t),
          (l.Effect =
            BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
              u.Owner,
              i.EffectBullet,
              s,
              this.BulletInfo,
              "[BulletActionUpdateEffect.SpawnBulletEffectOnBegin]",
            )),
          EffectSystem_1.EffectSystem.IsValid(l.Effect) &&
            ((t =
              this.BulletInfo.BulletDataMain.Render.EffectBulletParams.get(
                5,
              )) &&
              ((s =
                BulletStaticFunction_1.BulletStaticFunction.GetNiagaraQualityLevel(
                  Number(t),
                )),
              EffectSystem_1.EffectSystem.SetEffectQualityLevel(l.Effect, s)),
            (t = EffectSystem_1.EffectSystem.GetEffectActor(l.Effect))) &&
            (t.K2_AttachToActor(
              u.Owner,
              FNameUtil_1.FNameUtil.NONE,
              1,
              1,
              1,
              !0,
            ),
            i.EffectBulletParams.has(3) &&
              ((s = i.EffectBulletParams.get(3).split(",")),
              (l = Number(s[1])),
              (u = Number(s[2])),
              (s = Number(s[0])),
              (e = BulletPool_1.BulletPool.CreateRotator()).Set(l, u, s),
              t.K2_SetActorRelativeRotation(e.ToUeRotator(), !1, void 0, !0),
              BulletPool_1.BulletPool.RecycleRotator(e)),
            i.EffectBulletParams.has(2) &&
              ((l = i.EffectBulletParams.get(2).split(",")),
              (u = Number(l[0])),
              (s = Number(l[1])),
              (e = Number(l[2])),
              (l = BulletPool_1.BulletPool.CreateVector()).Set(u, s, e),
              t.D_K2_SetActorRelativeLocation(l.ToUeVector(), !1, void 0, !0),
              BulletPool_1.BulletPool.RecycleVector(l)),
            (u = BulletPool_1.BulletPool.CreateVector(!0)),
            i.EffectBulletParams.has(4) &&
              ((s = i.EffectBulletParams.get(4).split(",")),
              (e = Number(s[1])),
              (l = Number(s[0])),
              (i = Number(s[2])),
              u.Set(e, l, i)),
            (s = this.BulletInfo.AdditionInfo)?.Valid &&
              !s.SizeScale.IsZero() &&
              (u.IsZero()
                ? u.FromUeVector(s.SizeScale)
                : u.MultiplyEqual(s.SizeScale)),
            u.IsZero() || t.D_SetActorScale3D(u.ToUeVector()),
            BulletPool_1.BulletPool.RecycleVector(u))));
  }
  OnTick(t) {
    var e, l;
    this.BulletInfo.NeedDestroy ||
      ((e = this.BulletInfo.EffectInfo),
      ((l = BulletPool_1.BulletPool.CreateVector()).X = 1),
      (l.Y = this.BulletInfo.RayInfo.Length * e.EffectOriginSize),
      (l.Z = 1),
      EffectSystem_1.EffectSystem.GetEffectActor(e.Effect)?.D_SetActorScale3D(
        l.ToUeVector(),
      ),
      BulletPool_1.BulletPool.RecycleVector(l),
      EffectSystem_1.EffectSystem.SetEffectHidden(
        e.EffectExtremity,
        this.BulletInfo.RayInfo.IsBlock,
      ),
      EffectSystem_1.EffectSystem.SetEffectHidden(
        e.EffectBlock,
        !this.BulletInfo.RayInfo.IsBlock,
      ),
      (this.BulletInfo.RayInfo.IsBlock
        ? (EffectSystem_1.EffectSystem.GetEffectActor(
            e.EffectBlock,
          )?.D_K2_SetActorLocation(
            this.BulletInfo.RayInfo.EndPoint.ToUeVector(),
            !1,
            void 0,
            !0,
          ),
          EffectSystem_1.EffectSystem.GetEffectActor(e.EffectBlock))
        : (EffectSystem_1.EffectSystem.GetEffectActor(
            e.EffectExtremity,
          )?.D_K2_SetActorLocation(
            this.BulletInfo.RayInfo.EndPoint.ToUeVector(),
            !1,
            void 0,
            !0,
          ),
          EffectSystem_1.EffectSystem.GetEffectActor(e.EffectExtremity))
      )?.K2_SetActorRotation(this.BulletInfo.ActorComponent.ActorRotation, !1));
  }
}
exports.BulletActionUpdateEffect = BulletActionUpdateEffect;
//# sourceMappingURL=BulletActionUpdateEffect.js.map
