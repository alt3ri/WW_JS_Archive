"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, o, e, i) {
    let r;
    const s = arguments.length;
    let l =
      s < 3 ? o : i === null ? (i = Object.getOwnPropertyDescriptor(o, e)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      l = Reflect.decorate(t, o, e, i);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (r = t[n]) && (l = (s < 3 ? r(l) : s > 3 ? r(o, e, l) : r(o, e)) || l);
    return s > 3 && l && Object.defineProperty(o, e, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActorComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const BaseActorComponent_1 = require("../../Common/Component/BaseActorComponent");
const BulletActorPool_1 = require("../BulletActorPool");
let BulletActorComponent = class BulletActorComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments),
      (this.NHo = void 0),
      (this.NeedDetach = !1),
      (this.ChildrenAttached = []),
      (this.cbr = !1);
  }
  OnStart() {
    const t = this.Entity.GetBulletInfo();
    var o = t.BulletDataMain;
    var o =
      ((this.NHo = o.Base.Shape),
      (this.cbr = o.Move.IsLockScale),
      BulletActorPool_1.BulletActorPool.Get(this.NHo));
    return (
      GlobalData_1.GlobalData.IsPlayInEditor &&
        (o.ActorLabel = `BulletActor_${this.NHo}_` + t.BulletRowName),
      (o.EntityId = this.Entity.Id),
      (t.Actor = o),
      (this.ActorInternal = t.Actor),
      (t.ActorComponent = this),
      super.OnStart()
    );
  }
  OnClear() {
    if (this.ActorInternal) {
      if (
        (this.cbr && this.ActorInternal.RootComponent.SetAbsolute(!1, !1, !1),
        this.ChildrenAttached.length > 0)
      )
        for (const e of this.ChildrenAttached)
          e?.IsValid() &&
            e.GetParentActor() === this.ActorInternal &&
            e.K2_DetachFromActor(1, 1, 1);
      const t = this.Entity?.GetBulletInfo();
      const o = t?.CollisionInfo?.CollisionComponent;
      o &&
        (t.IsCollisionRelativeLocationZero ||
          o.K2_SetRelativeLocation(Vector_1.Vector.ZeroVector, !1, void 0, !0),
        t.IsCollisionRelativeRotationModify &&
          o.K2_SetRelativeRotation(
            Rotator_1.Rotator.ZeroRotator,
            !1,
            void 0,
            !0,
          ),
        o.bHiddenInGame ||
          (o.SetHiddenInGame(!0),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 21, "子弹碰撞盒显隐被修改", [
              "Bullet",
              t.BulletRowName,
            ]))),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          (this.NeedDetach ||
            Vector_1.Vector.OneVector.Equals(
              this.ActorInternal.GetActorScale3D(),
              MathCommon_1.MathCommon.KindaSmallNumber,
            ) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                18,
                "子弹回收时发现子弹缩放值异常",
                ["EntityId", this.Entity?.Id],
                ["BulletRowName", t?.BulletRowName],
              )),
          !this.NeedDetach) &&
          this.ActorInternal.GetAttachParentActor() &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "子弹回收时发现子弹仍Attach在别的实体上",
            ["EntityId", this.Entity?.Id],
            ["BulletRowName", t?.BulletRowName],
          ),
        BulletActorPool_1.BulletActorPool.Recycle(
          this.ActorInternal,
          this.NHo,
          this.NeedDetach,
        );
    }
    return (
      (this.NHo = void 0),
      (this.ChildrenAttached.length = 0),
      (this.NeedDetach = !1),
      super.OnClear()
    );
  }
  SetAttachToComponent(t, o, e, i, r, s) {
    this.ActorInternal.K2_AttachToComponent(t, o, e, i, r, s),
      this.ResetAllCachedTime();
  }
  AddBulletLocalRotator(t) {
    this.ActorInternal.K2_AddActorLocalRotation(t, !0, void 0, !1),
      this.ResetAllCachedTime();
  }
  SetBulletCustomTimeDilation(t) {
    this.ActorInternal.CustomTimeDilation = t;
  }
};
(BulletActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(152)],
  BulletActorComponent,
)),
  (exports.BulletActorComponent = BulletActorComponent);
// # sourceMappingURL=BulletActorComponent.js.map
