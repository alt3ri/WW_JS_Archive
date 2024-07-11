"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var f,
      o = arguments.length,
      n =
        o < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (f = t[h]) && (n = (o < 3 ? f(n) : 3 < o ? f(e, i, n) : f(e, i)) || n);
    return 3 < o && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelEffectComponent = void 0);
const UE = require("ue"),
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
let UiModelEffectComponent = class UiModelEffectComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.u1o = new Array()),
      (this.Ywr = new Map()),
      (this.Jwr = void 0),
      (this.zsa = !0),
      (this.Zsa = 0.5),
      (this.eaa = 0.5),
      (this.Twr = (t) => {
        t || this.DestroyAllEffect();
      }),
      (this.taa = (t) => {
        t > this.Zsa &&
          !this.zsa &&
          ((this.zsa = !0), this.SetAllEffectShowState(this.zsa)),
          t < this.eaa &&
            this.zsa &&
            ((this.zsa = !1), this.SetAllEffectShowState(this.zsa));
      }),
      (this.OnAnsBegin = (t) => {
        this.PlayEffectByAnsContext(t);
      }),
      (this.OnAnsEnd = (t) => {
        this.StopEffectByAnsContext(t);
      });
  }
  OnInit() {
    this.Jwr = this.Owner.CheckGetComponent(6);
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
        this.taa,
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
        this.taa,
      ),
      this.DestroyAllEffect();
  }
  PlayEffectOnRoot(t, e, i) {
    this.PlayEffectByPath(
      t,
      e,
      i,
      !0,
      !1,
      Vector_1.Vector.ZeroVector,
      Rotator_1.Rotator.ZeroRotator,
      Vector_1.Vector.OneVector,
    );
  }
  PlayEffectByPath(t, i, s, f, o, n, h, r, e) {
    t = EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      MathUtils_1.MathUtils.DefaultTransform,
      t,
      "[RoleAnimStateEffectManager.PlayEffect]",
      new EffectContext_1.EffectContext(void 0, i),
      1,
      (t) => {
        var e,
          t = EffectSystem_1.EffectSystem.GetEffectActor(t);
        t &&
          t.IsValid() &&
          (f && !o
            ? (t.K2_AttachToComponent(i, s, 0, 0, 0, !1),
              (e = new UE.Transform(h, n, r)),
              t.K2_SetActorRelativeTransform(e, !1, void 0, !0))
            : ((e = i.GetSocketTransform(s, 0)),
              t.K2_SetActorLocationAndRotation(
                e.TransformPosition(n),
                e.TransformRotation(h.Quaternion()).Rotator(),
                !1,
                void 0,
                !0,
              ),
              t.SetActorScale3D(r)),
          t.SetActorHiddenInGame(!this.zsa));
      },
      e,
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
      t = EffectSystem_1.EffectSystem.GetEffectActor(t);
      t && t.SetActorHiddenInGame(!e);
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
