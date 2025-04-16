"use strict";
var SceneItemRotatorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var s,
        n = arguments.length,
        h =
          n < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, o);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (h = (n < 3 ? s(h) : 3 < n ? s(e, i, h) : s(e, i)) || h);
      return 3 < n && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemRotatorComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
let SceneItemRotatorComponent =
  (SceneItemRotatorComponent_1 = class SceneItemRotatorComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.mBe = void 0),
        (this.Lie = void 0),
        (this.wMn = void 0),
        (this.BMn = void 0),
        (this.bMn = void 0),
        (this.qMn = void 0),
        (this.GMn = void 0),
        (this.NMn = !1),
        (this.OMn = !1),
        (this.kMn = !1),
        (this.W1n = 0),
        (this.FMn = void 0),
        (this.EQl = 0),
        (this.VMn = (t, e) => {
          if ((this.GMn.delete(e), t)) {
            if ((this.bMn.set(e, t), !(0 < this.GMn.size))) {
              for (var [, i] of this.bMn) if (!i) return;
              (this.NMn = !0), this.OMn && this.HMn();
            }
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                "[SceneItemRotatorComponent] 曲线加载失败，请检查实体配置",
                ["CurvePath", e],
                ["PbDataId", this.EIe?.GetPbDataId()],
              );
        }),
        (this.jMn = () => {
          var t = this.Hte.GetInteractionMainActor();
          if (t) {
            for (var [e] of this.qMn ?? []) {
              var i = this.Hte?.GetActorInSceneInteraction(e);
              if (!i)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    39,
                    "[SceneItemRotatorComponent] 找不到对应的旋转Actor，请检查实体配置和预制体",
                    ["ActorKey", e],
                    ["PbDataId", this.EIe?.GetPbDataId()],
                  )
                );
              this.qMn.set(e, i);
            }
            this.FMn || (this.FMn = new Map()),
              this.FMn.set(
                t,
                Rotator_1.Rotator.Create(
                  t.RootComponent.D_GetRelativeTransform().Rotator(),
                ),
              );
            for (var [, o] of this.qMn ?? [])
              this.FMn.set(
                o,
                Rotator_1.Rotator.Create(
                  o.RootComponent.D_GetRelativeTransform().Rotator(),
                ),
              );
            (this.OMn = !0), this.NMn && this.HMn();
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                "[SceneItemRotatorComponent] 找不到对应的场景交互物MainActor，请检查实体配置和预制体",
                ["PbDataId", this.EIe?.GetPbDataId()],
              );
        }),
        (this.g_n = (t, e) => {
          this.kMn && this.WMn(t);
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemRotatorComponent_1)[0];
      (this.EIe = this.Entity.GetComponent(0)), (this.BMn = new Map());
      for (const s of t.Config) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.State);
        if (!e)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                `[SceneItemRotatorComponent] 配置出错，找不到${s.State}对应的状态Id`,
                ["PbDataId", this.EIe?.GetPbDataId()],
              ),
            !1
          );
        var i =
            s.RotationConfig && 0 < s.RotationConfig.length
              ? s.RotationConfig
              : void 0,
          o =
            s.KeyRotatorConfig && 0 < s.KeyRotatorConfig.length
              ? s.KeyRotatorConfig
              : void 0;
        i && o
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              39,
              "[SceneItemRotatorComponent] 该状态同时存在两种旋转配置列表，配置有误，跳过该状态的配置",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["State", s.State],
            )
          : i || o
            ? this.BMn.set(e, s)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                39,
                "[SceneItemRotatorComponent] 该状态的旋转配置列表为空，跳过该状态的配置",
                ["PbDataId", this.EIe?.GetPbDataId()],
                ["State", s.State],
              );
      }
      return !0;
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(200)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[SceneItemRotatorComponent] 实体缺少SceneItemActorComponent",
              ["PbDataId", this.EIe?.GetPbDataId()],
            ),
          !1
        );
      if (!this.Hte.Owner)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[SceneItemRotatorComponent] 实体的SceneItemActorComponent.Owner不可用",
              ["PbDataId", this.EIe?.GetPbDataId()],
            ),
          !1
        );
      if (
        ((this.wMn = this.Hte.Owner.GetComponentByClass(
          UE.KuroSceneItemMoveComponent.StaticClass(),
        )),
        !this.wMn?.IsValid())
      ) {
        if (
          ((this.wMn = this.Hte.Owner.AddComponentByClass(
            UE.KuroSceneItemMoveComponent.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )),
          !this.wMn?.IsValid())
        )
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                "[SceneItemRotatorComponent] 实体Actor缺少KuroSceneItemMoveComponent，且动态创建失败",
                ["PbDataId", this.EIe?.GetPbDataId()],
              ),
            !1
          );
        this.wMn.Kuro_SetGravityDirect(
          this.Hte.ActorGravityDirectProxy.ToUeVectorOld(),
        );
      }
      return (
        (this.mBe = this.Entity.GetComponent(131)),
        this.mBe
          ? ((this.Lie = this.Entity.GetComponent(194)),
            !!this.Lie ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "[SceneItemRotatorComponent] 实体缺少LevelTagComponent",
                  ["PbDataId", this.EIe?.GetPbDataId()],
                ),
              !1))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                "[SceneItemRotatorComponent] 实体缺少SceneItemStateComponent",
                ["PbDataId", this.EIe?.GetPbDataId()],
              ),
            !1)
      );
    }
    OnActivate() {
      return (
        (this.NMn = !1),
        (this.OMn = !1),
        this.KMn(),
        this.QMn(),
        !this.kMn && this.NMn && this.OMn && this.HMn(),
        !0
      );
    }
    KMn() {
      this.NMn = !0;
      for (var [, t] of this.BMn) {
        var e,
          i =
            t.RotationConfig && 0 < t.RotationConfig.length
              ? t.RotationConfig
              : void 0,
          t =
            t.KeyRotatorConfig && 0 < t.KeyRotatorConfig.length
              ? t.KeyRotatorConfig
              : void 0,
          i = i ?? t;
        if (i)
          for (const n of i)
            n.Curve &&
              "" !== n.Curve &&
              (this.bMn || (this.bMn = new Map()),
              this.bMn.has(n.Curve) ||
                ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  n.Curve,
                  UE.CurveFloat,
                ))
                  ? this.bMn.set(n.Curve, e)
                  : (this.bMn.set(n.Curve, void 0), (this.NMn = !1))));
      }
      if (!this.NMn) {
        this.GMn || (this.GMn = new Map());
        for (var [o, s] of this.bMn)
          s ||
            ((s = ResourceSystem_1.ResourceSystem.LoadAsync(
              o,
              UE.CurveFloat,
              this.VMn,
            )),
            this.GMn.set(o, s));
      }
    }
    QMn() {
      this.OMn = !1;
      for (var [, t] of this.BMn)
        t.RotatePoint &&
          (this.qMn || (this.qMn = new Map()),
          this.qMn.has(t.RotatePoint) || this.qMn.set(t.RotatePoint, void 0));
      this.Hte.GetIsSceneInteractionLoadCompleted()
        ? this.jMn()
        : EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.jMn,
          ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.jMn,
          );
    }
    OnEnd() {
      if (
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.jMn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.jMn,
          ),
        this.GMn)
      )
        for (var [, t] of this.GMn)
          t && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
      return !0;
    }
    HMn() {
      if (!this.kMn && this.NMn && this.OMn) {
        let t = 0;
        for (var [e] of this.BMn)
          if (this.Lie.HasTag(e)) {
            t = e;
            break;
          }
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
          (this.kMn = !0),
          this.WMn(t);
      }
    }
    WMn(n) {
      if (this.kMn && this.W1n !== n) {
        var t = this.BMn.get(this.W1n),
          e = this.BMn.get(n);
        if (t?.KeepLastRotation && !e && this.wMn.IsRotating())
          (this.EQl = this.W1n),
            (this.W1n = n),
            this.wMn.SetTickingRotateEnable(!1);
        else if (
          !e?.KeepLastRotation ||
          n !== this.EQl ||
          t ||
          this.wMn.IsRotating()
        ) {
          if (
            (this.wMn.IsRotating() && this.wMn.StopRotate(0),
            (this.W1n = n) && this.BMn.has(n) && !this.wMn.IsRotating())
          ) {
            (e = this.BMn.get(n)),
              (t = e.RotatePoint
                ? this.qMn.get(e.RotatePoint)
                : this.Hte.GetInteractionMainActor());
            if (this.wMn.InitRotationData(t, e.IsLoop)) {
              var h = this.FMn.get(t);
              let s = Rotator_1.Rotator.Create(
                t.RootComponent.D_GetRelativeTransform().Rotator(),
              );
              var r =
                  e.RotationConfig && 0 < e.RotationConfig.length
                    ? e.RotationConfig
                    : void 0,
                a =
                  e.KeyRotatorConfig && 0 < e.KeyRotatorConfig.length
                    ? e.KeyRotatorConfig
                    : void 0,
                m = r ?? a;
              if (m) {
                for (let o = 0; o < m.length; o++) {
                  let t = m[o];
                  var _,
                    v = Rotator_1.Rotator.Create(),
                    c =
                      (r
                        ? ((t = r[o]),
                          (c = Vector_1.Vector.Create(
                            t.Axis.X,
                            t.Axis.Y,
                            t.Axis.Z,
                          )),
                          v.FromUeRotator(
                            UE.KismetMathLibrary.D_RotatorFromAxisAndAngle(
                              c.ToUeVector(),
                              t.Angle,
                            ),
                          ))
                        : a &&
                          ((t = a[o]),
                          v.Set(
                            t.KeyRotator.Y ?? 0,
                            t.KeyRotator.Z ?? 0,
                            t.KeyRotator.X ?? 0,
                          )),
                      t.Curve ? this.bMn.get(t.Curve) : void 0);
                  let e = void 0,
                    i = void 0;
                  "Relative" === t.Type
                    ? ((e = Rotator_1.Rotator.Create(s)),
                      (_ = v),
                      (i = Rotator_1.Rotator.Create(e).AdditionEqual(_)),
                      (s = i))
                    : "Absolute" === t.Type &&
                      ((e = Rotator_1.Rotator.Create(s)),
                      (i = Rotator_1.Rotator.Create(v).AdditionEqual(h)),
                      (s = i)),
                    (e &&
                      i &&
                      this.wMn.AddRotationStep(
                        e.ToUeRotator(),
                        i.ToUeRotator(),
                        t.Time,
                        t.Cd ?? 0,
                        c,
                      )) ||
                      (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "SceneItem",
                          39,
                          "[SceneItemRotatorComponent] 添加旋转步骤失败",
                          ["StateId", n],
                          ["StepIndex", o],
                          ["PbDataId", this.EIe?.GetPbDataId()],
                        ));
                }
                this.wMn.StartRotate();
              }
            } else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "[SceneItemRotatorComponent] 初始化旋转数据失败",
                  ["StateId", n],
                  ["PbDataId", this.EIe?.GetPbDataId()],
                );
          }
        } else
          (this.EQl = 0), (this.W1n = n), this.wMn.SetTickingRotateEnable(!0);
      }
    }
  });
(SceneItemRotatorComponent = SceneItemRotatorComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(165)],
    SceneItemRotatorComponent,
  )),
  (exports.SceneItemRotatorComponent = SceneItemRotatorComponent);
//# sourceMappingURL=SceneItemRotatorComponent.js.map
