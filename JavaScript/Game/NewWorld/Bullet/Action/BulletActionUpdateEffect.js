"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionUpdateEffect = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
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
                l.GetTransform(),
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
      u,
      s = this.BulletInfo.ActorComponent;
    s &&
      (this.BulletInfo.BulletDataMain.Render.HandOverParentEffect
        ? BulletStaticFunction_1.BulletStaticFunction.HandOverEffectsAfterInitTransform(
            this.BulletInfo,
          )
        : (u = (i = this.BulletInfo.EffectInfo).EffectData).EffectBullet
            .length <= 0 ||
          ((t = BulletPool_1.BulletPool.CreateRotator()),
          this.BulletInfo.IsCollisionRelativeRotationModify
            ? MathUtils_1.MathUtils.ComposeRotator(
                BulletConstant_1.BulletConstant.RotateToRight,
                this.BulletInfo.BulletDataMain.Base.Rotator,
                t,
              )
            : t.FromUeRotator(BulletConstant_1.BulletConstant.RotateToRight),
          (e = new UE.Transform(
            UE.KismetMathLibrary.TransformRotation(
              s.ActorTransform,
              t.ToUeRotator(),
            ),
            s.ActorLocation,
            s.ActorScale,
          )),
          BulletPool_1.BulletPool.RecycleRotator(t),
          (i.Effect =
            BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
              s.Owner,
              u.EffectBullet,
              e,
              this.BulletInfo,
              "[BulletActionUpdateEffect.SpawnBulletEffectOnBegin]",
            )),
          EffectSystem_1.EffectSystem.IsValid(i.Effect) &&
            (t = EffectSystem_1.EffectSystem.GetEffectActor(i.Effect)) &&
            (t.K2_AttachToActor(
              s.Owner,
              FNameUtil_1.FNameUtil.NONE,
              1,
              1,
              1,
              !0,
            ),
            u.EffectBulletParams.has(3) &&
              ((e = u.EffectBulletParams.get(3).split(",")),
              (i = Number(e[1])),
              (s = Number(e[2])),
              (e = Number(e[0])),
              (l = BulletPool_1.BulletPool.CreateRotator()).Set(i, s, e),
              t.K2_SetActorRelativeRotation(l.ToUeRotator(), !1, void 0, !0),
              BulletPool_1.BulletPool.RecycleRotator(l)),
            u.EffectBulletParams.has(2) &&
              ((i = u.EffectBulletParams.get(2).split(",")),
              (s = Number(i[0])),
              (e = Number(i[1])),
              (l = Number(i[2])),
              (i = BulletPool_1.BulletPool.CreateVector()).Set(s, e, l),
              t.K2_SetActorRelativeLocation(i.ToUeVector(), !1, void 0, !0),
              BulletPool_1.BulletPool.RecycleVector(i)),
            u.EffectBulletParams.has(4)) &&
            ((s = u.EffectBulletParams.get(4).split(",")),
            (e = Number(s[1])),
            (l = Number(s[0])),
            (i = Number(s[2])),
            (u = BulletPool_1.BulletPool.CreateVector()).Set(e, l, i),
            t.SetActorScale3D(u.ToUeVector()),
            BulletPool_1.BulletPool.RecycleVector(u))));
  }
  OnTick(t) {
    var e, l;
    this.BulletInfo.NeedDestroy ||
      ((e = this.BulletInfo.EffectInfo),
      ((l = BulletPool_1.BulletPool.CreateVector()).X = 1),
      (l.Y = this.BulletInfo.RayInfo.Length * e.EffectOriginSize),
      (l.Z = 1),
      EffectSystem_1.EffectSystem.GetEffectActor(e.Effect)?.SetActorScale3D(
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
          )?.K2_SetActorLocation(
            this.BulletInfo.RayInfo.EndPoint.ToUeVector(),
            !1,
            void 0,
            !0,
          ),
          EffectSystem_1.EffectSystem.GetEffectActor(e.EffectBlock))
        : (EffectSystem_1.EffectSystem.GetEffectActor(
            e.EffectExtremity,
          )?.K2_SetActorLocation(
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
