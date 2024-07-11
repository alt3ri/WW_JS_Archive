"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    let f;
    const n = arguments.length;
    let s =
      n < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, o, i);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (f = t[r]) && (s = (n < 3 ? f(s) : n > 3 ? f(e, o, s) : f(e, o)) || s);
    return n > 3 && s && Object.defineProperty(e, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelEffectComponent = void 0);
const UE = require("ue");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelEffectComponent = class UiModelEffectComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Clo = new Array()),
      (this.MBr = new Map()),
      (this.SBr = void 0),
      (this.$wr = (t) => {
        t || this.DestroyAllEffect();
      }),
      (this.OnAnsBegin = (t) => {
        this.PlayEffectByAnsContext(t);
      }),
      (this.OnAnsEnd = (t) => {
        this.StopEffectByAnsContext(t);
      });
  }
  OnInit() {
    this.SBr = this.Owner.CheckGetComponent(6);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.$wr,
    ),
      this.SBr?.RegisterAnsTrigger(
        "UiEffectAnsContext",
        this.OnAnsBegin,
        this.OnAnsEnd,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.$wr,
    ),
      this.DestroyAllEffect();
  }
  PlayEffectOnRoot(t, e, o) {
    this.PlayEffectByPath(
      t,
      e,
      o,
      !0,
      !1,
      Vector_1.Vector.ZeroVector,
      Rotator_1.Rotator.ZeroRotator,
      Vector_1.Vector.OneVector,
    );
  }
  PlayEffectByPath(t, o, i, f, n, s, r, c, e) {
    t = EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      MathUtils_1.MathUtils.DefaultTransform,
      t,
      "[RoleAnimStateEffectManager.PlayEffect]",
      new EffectContext_1.EffectContext(void 0, o),
      1,
      (t) => {
        let e;
        var t = EffectSystem_1.EffectSystem.GetEffectActor(t);
        t &&
          t.IsValid() &&
          (f && !n
            ? (t.K2_AttachToComponent(o, i, 0, 0, 0, !1),
              (e = new UE.Transform(r, s, c)),
              t.K2_SetActorRelativeTransform(e, !1, void 0, !0))
            : ((e = o.GetSocketTransform(i, 0)),
              t.K2_SetActorLocationAndRotation(
                e.TransformPosition(s),
                e.TransformRotation(r.Quaternion()).Rotator(),
                !1,
                void 0,
                !0,
              ),
              t.SetActorScale3D(c)));
      },
      e,
    );
    return EffectSystem_1.EffectSystem.IsValid(t) && this.Clo.push(t), t;
  }
  PlayEffectByAnsContext(t) {
    let e;
    this.MBr.has(t) ||
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
      this.MBr.set(t, e));
  }
  StopEffectByAnsContext(t) {
    let e;
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
      : (e = this.MBr.get(t)) && (this.StopEffect(e), this.MBr.delete(t));
  }
  AttachEffect(t) {
    this.Clo.push(t);
  }
  DestroyAllEffect() {
    this.Clo &&
      this.Clo.length !== 0 &&
      (this.Clo.forEach((t) => {
        EffectSystem_1.EffectSystem.IsValid(t) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            t,
            "[RoleAnimStateEffectManager.RecycleEffect]",
            !0,
          );
      }),
      (this.Clo.length = 0),
      this.MBr.clear());
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
// # sourceMappingURL=UiModelEffectComponent.js.map
