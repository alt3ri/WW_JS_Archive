"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitCollision = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionInitCollision extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.CollisionInfo = void 0);
  }
  Clear() {
    super.Clear(), (this.CollisionInfo = void 0);
  }
  OnExecute() {
    this.CollisionInfo = this.BulletInfo.CollisionInfo;
    var t = this.BulletInfo.BulletDataMain,
      i =
        ((this.CollisionInfo.StageInterval = 1),
        (this.CollisionInfo.AllowedEnergy = !0),
        t.Base.CollisionActiveDelay * TimeUtil_1.TimeUtil.InverseMillisecond);
    (this.CollisionInfo.ActiveDelayMs = 0 < i ? i : 0),
      (this.CollisionInfo.IsPassDelay = this.CollisionInfo.ActiveDelayMs <= 0),
      (this.CollisionInfo.IntervalMs =
        t.Base.Interval * TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.CollisionInfo.IsProcessOpen = this.CollisionInfo.IsPassDelay),
      this.CollisionInfo.FinalScale.FromUeVector(t.Scale.SizeScale),
      (this.CollisionInfo.NeedHitObstacles =
        t.Logic.DestroyOnHitObstacle ||
        this.BulletInfo.ChildInfo?.HaveSpecialChildrenBullet ||
        t.Render.EffectOnHit.has(2) ||
        this.BulletInfo.ActionLogicComponent.ObstaclesDetect),
      this.CollisionInfo.NeedHitObstacles &&
        t.Base.IsOversizeForTrace &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 18, "子弹尺寸过大，不会开启射线检测", [
          "BulletRowName",
          this.BulletInfo.BulletRowName,
        ]),
      this.H4o(t.Base.Shape),
      this.BulletInfo.CloseCollision || 4 === t.Base.Shape
        ? (this.BulletInfo.IsCollisionRelativeLocationZero = !0)
        : (this.j4o(),
          this.BulletInfo.IsCollisionRelativeRotationModify &&
            this.CollisionInfo.CollisionComponent.K2_SetRelativeRotation(
              t.Base.Rotator.ToUeRotator(),
              !1,
              void 0,
              !0,
            ),
          (this.CollisionInfo.HasObstaclesCollision = 0 < t.Obstacle.Radius),
          this.W4o()),
      this.CollisionInfo.LastFramePosition.FromUeVector(
        this.BulletInfo.CollisionLocation,
      ),
      this.CollisionInfo.ActiveDelayMs <= 0 &&
        (this.CollisionInfo.IsStartup = !0);
  }
  H4o(t) {
    switch (t) {
      case 0:
        this.K4o();
        break;
      case 1:
        this.Q4o();
        break;
      case 2:
        this.X4o();
        break;
      case 3:
        this.$4o();
        break;
      case 4:
        this.Y4o();
        break;
      case 6:
        this.J4o(UE.KuroRegionBoxComponent.StaticClass());
        break;
      case 7:
        this.z4o();
        break;
      case 8:
        this.J4o(UE.KuroRegionSectorComponent.StaticClass());
        break;
      case 9:
        this.J4o(UE.KuroRegionCylinderComponent.StaticClass());
    }
  }
  K4o() {
    var t = this.BulletInfo.BulletDataMain,
      i = this.BulletInfo.Actor,
      s = i.GetComponentByClass(UE.BoxComponent.StaticClass()),
      l =
        s ??
        i.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !0,
        );
    this.BulletInfo.CloseCollision =
      t.Base.Size.X <= 0 || t.Base.Size.Y <= 0 || t.Base.Size.Z <= 0;
    (this.CollisionInfo.CollisionComponent = l),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        this.BulletInfo.Attacker.Id,
      ) &&
        ((l.LineThickness = 5),
        (l.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow)),
      l.SetCollisionProfileName(t.Logic.ProfileName),
      this.SetCollisionIgnoreChannels(l),
      s ||
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
          (this.CollisionInfo.CollisionComponent.CreationMethod = 3),
        i.FinishAddComponent(l, !1, MathUtils_1.MathUtils.DefaultTransform));
  }
  Q4o() {
    var t = this.BulletInfo.BulletDataMain,
      i = this.BulletInfo.Actor,
      s = i.GetComponentByClass(UE.SphereComponent.StaticClass()),
      l =
        s ??
        i.AddComponentByClass(
          UE.SphereComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !0,
        );
    this.BulletInfo.CloseCollision = t.Base.Size.X <= 0;
    (this.CollisionInfo.CollisionComponent = l).SetCollisionProfileName(
      t.Logic.ProfileName,
    ),
      this.SetCollisionIgnoreChannels(l),
      s ||
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
          (this.CollisionInfo.CollisionComponent.CreationMethod = 3),
        i.FinishAddComponent(l, !1, MathUtils_1.MathUtils.DefaultTransform));
  }
  X4o() {
    var t = this.BulletInfo.BulletDataMain,
      i = this.BulletInfo.Actor,
      s =
        ((this.BulletInfo.CloseCollision =
          t.Base.Size.X <= 0 || t.Base.Size.Z <= 0),
        i.GetComponentByClass(UE.BoxComponent.StaticClass())),
      l =
        s ??
        i.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !0,
        );
    (this.CollisionInfo.CollisionComponent = l),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        this.BulletInfo.Attacker.Id,
      ) &&
        ((l.LineThickness = 2),
        (l.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow)),
      l.SetCollisionProfileName(t.Logic.ProfileName),
      this.SetCollisionIgnoreChannels(l),
      s ||
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
          (this.CollisionInfo.CollisionComponent.CreationMethod = 3),
        i.FinishAddComponent(l, !1, MathUtils_1.MathUtils.DefaultTransform));
  }
  $4o() {
    var t = this.BulletInfo.BulletDataMain,
      i = this.BulletInfo.Actor,
      s =
        ((this.BulletInfo.CloseCollision =
          t.Base.Size.X <= 0 || t.Base.Size.Z <= 0),
        i.GetComponentByClass(UE.BoxComponent.StaticClass())),
      l =
        s ??
        i.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !0,
        );
    (this.CollisionInfo.CollisionComponent = l),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        this.BulletInfo.Attacker.Id,
      ) &&
        ((l.LineThickness = 2),
        (l.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow)),
      l.SetCollisionProfileName(t.Logic.ProfileName),
      this.SetCollisionIgnoreChannels(l),
      s ||
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
          (this.CollisionInfo.CollisionComponent.CreationMethod = 3),
        i.FinishAddComponent(l, !1, MathUtils_1.MathUtils.DefaultTransform));
  }
  Y4o() {
    var t = this.BulletInfo.BulletDataMain,
      i = this.BulletInfo.RayInfo;
    (i.Speed = this.BulletInfo.Size.X / TimeUtil_1.TimeUtil.InverseMillisecond),
      (i.BlockByCharacter = "f" !== t.Base.SpecialParams.get(1));
  }
  z4o() {
    this.BulletInfo.CloseCollision = !1;
  }
  J4o(t) {
    var i = this.BulletInfo.Actor,
      s =
        GlobalData_1.GlobalData.IsPlayInEditor &&
        BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor,
      l = i.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()),
      e =
        l ??
        i.AddComponentByClass(
          UE.KuroRegionDetectComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          s,
        ),
      h =
        ((this.CollisionInfo.RegionDetectComponent = e),
        i.GetComponentByClass(t)),
      t =
        h ??
        i.AddComponentByClass(t, !1, MathUtils_1.MathUtils.DefaultTransform, s);
    (this.CollisionInfo.RegionComponent = t),
      e.RegionMap.Set(BulletConstant_1.BulletConstant.RegionKey, t),
      (this.BulletInfo.CloseCollision = !1),
      s &&
        (l ||
          ((e.CreationMethod = 3),
          i.FinishAddComponent(e, !1, MathUtils_1.MathUtils.DefaultTransform)),
        h ||
          ((t.CreationMethod = 3),
          i.FinishAddComponent(t, !1, MathUtils_1.MathUtils.DefaultTransform)));
  }
  j4o() {
    var t = this.BulletInfo.BulletDataMain,
      i = this.CollisionInfo.CollisionComponent,
      s = this.CollisionInfo.RegionComponent,
      l = this.CollisionInfo.CenterLocalLocation,
      e = (l.FromUeVector(t.Base.CenterOffset), t.Base.Shape);
    7 === e
      ? (l.IsZero() ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Bullet",
              18,
              "出于性能考虑，大球体的中心位置偏移不会生效",
            ),
          l.Reset()),
        (this.BulletInfo.IsCollisionRelativeLocationZero = !0))
      : ((e = this.BulletInfo.Size),
        2 !== t.Base.Shape
          ? l.IsZero()
            ? (this.BulletInfo.IsCollisionRelativeLocationZero = !0)
            : i
              ? i.K2_SetRelativeLocation(l.ToUeVector(), !1, void 0, !0)
              : s && s.K2_SetRelativeLocation(l.ToUeVector(), !1, void 0, !0)
          : 360 <= e.Y
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Bullet",
                  18,
                  "扇形子弹的角度超过360！请使用柱形",
                  ["ID", this.BulletInfo.BulletRowName],
                ),
              (e.Y = 360))
            : e.Y <= 0 &&
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Bullet", 18, "扇形子弹的角度小于0！请检查", [
                  "ID",
                  this.BulletInfo.BulletRowName,
                ]),
              (e.Y = 90)),
        i
          ? BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(
              t.Base.Shape,
              i,
              e,
              l,
              t.Base.Rotator,
            )
          : s &&
            BulletCollisionUtil_1.BulletCollisionUtil.UpdateRegionExtend(
              t.Base.Shape,
              s,
              e,
            ));
  }
  W4o() {
    this.BulletInfo.Actor.SetActorHiddenInGame(!1);
    var i = this.CollisionInfo?.CollisionComponent;
    if (i) {
      var s = this.CollisionInfo.NeedHitObstacles,
        l = this.BulletInfo.BulletDataMain.Base.IsOversizeForTrace;
      let t = !1;
      (t =
        !this.CollisionInfo.HasObstaclesCollision && s
          ? !l
          : this.BulletInfo.ActorComponent.NeedDetach) &&
        i.SetCollisionProfileName(
          BulletConstant_1.BulletConstant.ProfileNameOnlyBullet,
        ),
        this.BulletInfo.Actor.SetActorEnableCollision(!0);
    }
  }
  SetCollisionIgnoreChannels(t) {
    for (const i of this.CollisionInfo.IgnoreChannels)
      t.SetCollisionResponseToChannel(i, 0);
  }
}
exports.BulletActionInitCollision = BulletActionInitCollision;
//# sourceMappingURL=BulletActionInitCollision.js.map
