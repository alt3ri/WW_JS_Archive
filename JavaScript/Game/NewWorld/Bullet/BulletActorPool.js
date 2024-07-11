"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActorPool = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../GlobalData"),
  BulletConstant_1 = require("./BulletConstant"),
  SIZE_POOL = 30,
  PRE_ADD_COUNT = 5;
class BulletActorPool {
  static Get(t) {
    let e = void 0;
    if (this.jVo.has(t))
      for (var o = this.jVo.get(t); !e && 0 < o.length; )
        (e = o.pop())?.IsValid() || (e = void 0);
    return (
      e ||
        ((e = ActorSystem_1.ActorSystem.Get(
          UE.KuroEntityActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0,
        )).GetComponentByClass(UE.SceneComponent.StaticClass()) ||
          e.AddComponentByClass(
            UE.SceneComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          ),
        (e.bAutoDestroyWhenFinished = !1),
        e.SetActorEnableCollision(!1)),
      e
    );
  }
  static Recycle(t, e, o = !1) {
    t.SetActorHiddenInGame(!0),
      t.SetActorEnableCollision(!1),
      o &&
        (t.K2_DetachFromActor(1, 1, 1),
        t.SetActorScale3D(Vector_1.Vector.OneVector)),
      BulletConstant_1.BulletConstant.OpenActorRecycleCheck &&
        (t.GetActorScale3D().op_Equality(Vector_1.Vector.OneVector) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 18, "bullet actor scale invalid")),
        (o = t.GetComponentByClass(UE.ShapeComponent.StaticClass()))) &&
        !o.RelativeScale3D.op_Equality(Vector_1.Vector.OneVector) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 18, "bullet collisionComp scale invalid");
    let l = this.jVo.get(e);
    l || ((l = []), this.jVo.set(e, l)),
      l.length > SIZE_POOL ? ActorSystem_1.ActorSystem.Put(t) : l.push(t);
  }
  static Preload() {
    this.WVo(0, UE.BoxComponent.StaticClass()),
      this.WVo(1, UE.SphereComponent.StaticClass()),
      this.WVo(3, UE.BoxComponent.StaticClass()),
      this.WVo(4, void 0);
  }
  static WVo(t, e) {
    let o = this.jVo.get(t);
    o || ((o = []), this.jVo.set(t, o));
    for (let t = o.length; t < PRE_ADD_COUNT; t++) {
      var l,
        s = ActorSystem_1.ActorSystem.Get(
          UE.KuroEntityActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0,
        );
      s.GetComponentByClass(UE.SceneComponent.StaticClass()) ||
        s.AddComponentByClass(
          UE.SceneComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ),
        (s.bAutoDestroyWhenFinished = !1),
        s.SetActorHiddenInGame(!0),
        s.SetActorEnableCollision(!1),
        e &&
          (GlobalData_1.GlobalData.IsPlayInEditor &&
          BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor
            ? (((l = s.AddComponentByClass(
                e,
                !1,
                MathUtils_1.MathUtils.DefaultTransform,
                !0,
              )).CreationMethod = 3),
              s.FinishAddComponent(
                l,
                !1,
                MathUtils_1.MathUtils.DefaultTransform,
              ))
            : s.AddComponentByClass(
                e,
                !1,
                MathUtils_1.MathUtils.DefaultTransform,
                !1,
              )),
        o.push(s);
    }
  }
  static Clear() {
    for (var [, t] of this.jVo)
      for (const e of t) ActorSystem_1.ActorSystem.Put(e);
    this.jVo.clear();
  }
}
(exports.BulletActorPool = BulletActorPool).jVo = new Map();
//# sourceMappingURL=BulletActorPool.js.map
