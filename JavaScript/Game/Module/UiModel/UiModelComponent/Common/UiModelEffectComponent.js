"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      f =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      f = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (f = (h < 3 ? o(f) : 3 < h ? o(e, i, f) : o(e, i)) || f);
    return 3 < h && f && Object.defineProperty(e, i, f), f;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelEffectComponent = exports.UiModelEffectPlayContext = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
class UiModelEffectPlayContext {
  constructor() {
    (this.EffectPath = void 0),
      (this.Transform = MathUtils_1.MathUtils.DefaultTransformDouble),
      (this.AttachTargetComponent = void 0),
      (this.Attached = !0),
      (this.AttachLocationOnly = !1),
      (this.SocketName = FNameUtil_1.FNameUtil.EMPTY),
      (this.IsForceShow = !0),
      (this.Location = Vector_1.Vector.ZeroVectorDouble),
      (this.Rotator = Rotator_1.Rotator.ZeroRotator),
      (this.Scale = Vector_1.Vector.OneVectorDouble),
      (this.LocationRule = 0),
      (this.RotationRule = 0),
      (this.ScaleRule = 0),
      (this.EffectType = 1),
      (this.Callback = void 0);
  }
  Reset() {
    (this.EffectPath = void 0),
      (this.Transform = MathUtils_1.MathUtils.DefaultTransformDouble),
      (this.AttachTargetComponent = void 0),
      (this.Attached = !0),
      (this.AttachLocationOnly = !1),
      (this.SocketName = FNameUtil_1.FNameUtil.EMPTY),
      (this.IsForceShow = !0),
      (this.Location = Vector_1.Vector.ZeroVectorDouble),
      (this.Rotator = Rotator_1.Rotator.ZeroRotator),
      (this.Scale = Vector_1.Vector.OneVectorDouble),
      (this.LocationRule = 0),
      (this.RotationRule = 0),
      (this.ScaleRule = 0),
      (this.EffectType = 1),
      (this.Callback = void 0);
  }
}
exports.UiModelEffectPlayContext = UiModelEffectPlayContext;
let UiModelEffectComponent = class UiModelEffectComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.u1o = new Array()),
      (this.Ywr = new Map()),
      (this.Jwr = void 0),
      (this.uy1 = void 0),
      (this.Zla = !0),
      (this.e1a = 0.5),
      (this.t1a = 0.5),
      (this.Twr = (t) => {
        t &&
          !this.Zla &&
          ((this.Zla = !0), this.SetAllEffectShowState(this.Zla)),
          !t &&
            this.Zla &&
            ((this.Zla = !1), this.SetAllEffectShowState(this.Zla));
      }),
      (this.i1a = (t) => {
        var e = this.uy1.GetVisible();
        t > this.e1a &&
          !this.Zla &&
          e &&
          ((this.Zla = !0), this.SetAllEffectShowState(this.Zla)),
          t < this.t1a &&
            this.Zla &&
            ((this.Zla = !1), this.SetAllEffectShowState(this.Zla));
      }),
      (this.OnAnsBegin = (t) => {
        this.PlayEffectByAnsContext(t);
      }),
      (this.OnAnsEnd = (t) => {
        this.StopEffectByAnsContext(t);
      });
  }
  OnInit() {
    (this.Jwr = this.Owner.CheckGetComponent(6)),
      (this.uy1 = this.Owner.CheckGetComponent(0));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.Twr,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.i1a,
      ),
      this.Jwr?.RegisterAnsTrigger(
        "UiEffectAnsContext",
        this.OnAnsBegin,
        this.OnAnsEnd,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.Twr,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.i1a,
      ),
      this.DestroyAllEffect();
  }
  PlayEffectOnRoot(t, e, i, s) {
    this.PlayEffectByPath(
      t,
      e,
      i,
      !0,
      !1,
      Vector_1.Vector.ZeroVectorDouble,
      Rotator_1.Rotator.ZeroRotator,
      Vector_1.Vector.OneVectorDouble,
      s,
    );
  }
  PlayEffectByPath(t, i, s, o, h, f, n, r, c, e) {
    t = EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      MathUtils_1.MathUtils.DefaultTransformDouble,
      t,
      "[RoleAnimStateEffectManager.PlayEffect]",
      new EffectContext_1.EffectContext(void 0, i),
      1,
      (t) => {
        var e,
          t = EffectSystem_1.EffectSystem.GetEffectActor(t);
        t &&
          t.IsValid() &&
          (o && !h
            ? (t.K2_AttachToComponent(i, s, 0, 0, 0, !1),
              (e = new UE.TransformDouble(n, f, r)),
              t.D_K2_SetActorRelativeTransform(e, !1, void 0, !0))
            : ((e = i.D_GetSocketTransform(s, 0)),
              t.D_K2_SetActorLocationAndRotation(
                e.TransformPosition(f),
                e.TransformRotation(n.Quaternion()).Rotator(),
                !1,
                void 0,
                !0,
              ),
              t.D_SetActorScale3D(r)),
          t.SetActorHiddenInGame(!this.Zla && !c));
      },
      e,
    );
    return EffectSystem_1.EffectSystem.IsValid(t) && this.u1o.push(t), t;
  }
  PlayEffectByContext(i) {
    var t = EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      i.Transform,
      i.EffectPath,
      "[RoleAnimStateEffectManager.PlayEffect]",
      new EffectContext_1.EffectContext(void 0, i.AttachTargetComponent),
      i.EffectType,
      (t) => {
        var e,
          t = EffectSystem_1.EffectSystem.GetEffectActor(t);
        t &&
          t.IsValid() &&
          (i.Attached && !i.AttachLocationOnly
            ? (t.K2_AttachToComponent(
                i.AttachTargetComponent,
                i.SocketName,
                i.LocationRule,
                i.RotationRule,
                i.ScaleRule,
                !1,
              ),
              (e = new UE.TransformDouble(i.Rotator, i.Location, i.Scale)),
              t.D_K2_SetActorRelativeTransform(e, !1, void 0, !0))
            : ((e = i.AttachTargetComponent.D_GetSocketTransform(
                i.SocketName,
                0,
              )),
              t.D_K2_SetActorLocationAndRotation(
                e.TransformPosition(i.Location),
                e.TransformRotation(i.Rotator.Quaternion()).Rotator(),
                !1,
                void 0,
                !0,
              ),
              t.D_SetActorScale3D(i.Scale)),
          t.SetActorHiddenInGame(!this.Zla && !i.IsForceShow));
      },
      i.Callback,
    );
    return EffectSystem_1.EffectSystem.IsValid(t) && this.u1o.push(t), t;
  }
  PlayEffectByAnsContext(t) {
    var e;
    this.Ywr.has(t) ||
      t.PlayOnEnd ||
      ((e = this.PlayEffectByPath(
        t.EffectPath,
        t.MeshComponent,
        t.Socket,
        t.Attached,
        t.AttachLocationOnly,
        t.Location,
        t.Rotation,
        t.Scale,
        !1,
      )),
      t.OnEffectSpawn && t.OnEffectSpawn(t.MeshComponent, e),
      this.Ywr.set(t, e),
      (t.Handle = e));
  }
  StopEffectByAnsContext(t) {
    var e;
    t.PlayOnEnd
      ? this.PlayEffectByPath(
          t.EffectPath,
          t.MeshComponent,
          t.Socket,
          t.Attached,
          t.AttachLocationOnly,
          t.Location,
          t.Rotation,
          t.Scale,
          !1,
        )
      : (e = this.Ywr.get(t)) && (this.StopEffect(e), this.Ywr.delete(t));
  }
  AttachEffect(t) {
    this.u1o.push(t);
  }
  DestroyAllEffect() {
    this.u1o &&
      0 !== this.u1o.length &&
      (this.u1o.forEach((t) => {
        EffectSystem_1.EffectSystem.IsValid(t) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            t,
            "[RoleAnimStateEffectManager.RecycleEffect]",
            !0,
          );
      }),
      (this.u1o.length = 0),
      this.Ywr.clear());
  }
  SetAllEffectShowState(e) {
    this.u1o.forEach((t) => {
      EffectSystem_1.EffectSystem.SetEffectHidden(t, !e);
    });
  }
  StopEffect(t) {
    EffectSystem_1.EffectSystem.IsValid(t) &&
      EffectSystem_1.EffectSystem.StopEffectById(
        t,
        "[RoleAnimStateEffectManager.StopEffect]",
        !0,
      );
  }
};
(UiModelEffectComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(4)],
  UiModelEffectComponent,
)),
  (exports.UiModelEffectComponent = UiModelEffectComponent);
//# sourceMappingURL=UiModelEffectComponent.js.map
