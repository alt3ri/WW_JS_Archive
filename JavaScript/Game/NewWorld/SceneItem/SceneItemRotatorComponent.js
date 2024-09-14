"use strict";
var SceneItemRotatorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, i) {
      var s,
        n = arguments.length,
        h =
          n < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, o))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, o, i);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (h = (n < 3 ? s(h) : 3 < n ? s(e, o, h) : s(e, o)) || h);
      return 3 < n && h && Object.defineProperty(e, o, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemRotatorComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
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
        (this.VMn = (t, e) => {
          if ((this.GMn.delete(e), t)) {
            if ((this.bMn.set(e, t), !(0 < this.GMn.size))) {
              for (var [, o] of this.bMn) if (!o) return;
              (this.NMn = !0), this.OMn && this.HMn();
            }
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[SceneItemRotatorComponent] 曲线加载失败，请检查实体配置",
                ["CurvePath", e],
                ["PbDataId", this.EIe?.GetPbDataId()],
              );
        }),
        (this.jMn = () => {
          var t = this.Hte.GetInteractionMainActor();
          if (t) {
            for (var [e] of this.qMn ?? []) {
              var o = this.Hte?.GetActorInSceneInteraction(e);
              if (!o)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    40,
                    "[SceneItemRotatorComponent] 找不到对应的旋转Actor，请检查实体配置和预制体",
                    ["ActorKey", e],
                    ["PbDataId", this.EIe?.GetPbDataId()],
                  )
                );
              this.qMn.set(e, o);
            }
            this.FMn || (this.FMn = new Map()),
              this.FMn.set(
                t,
                Rotator_1.Rotator.Create(
                  t.RootComponent.GetRelativeTransform().Rotator(),
                ),
              );
            for (var [, i] of this.qMn ?? [])
              this.FMn.set(
                i,
                Rotator_1.Rotator.Create(
                  i.RootComponent.GetRelativeTransform().Rotator(),
                ),
              );
            (this.OMn = !0), this.NMn && this.HMn();
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
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
      for (const o of t.Config) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o.State);
        if (!e)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                `[SceneItemRotatorComponent] 配置出错，找不到${o.State}对应的状态Id`,
                ["PbDataId", this.EIe?.GetPbDataId()],
              ),
            !1
          );
        o.RotationConfig.length <= 0
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              40,
              "[SceneItemRotatorComponent] 该状态的旋转配置列表为空，跳过该状态的配置",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["State", o.State],
            )
          : this.BMn.set(e, o);
      }
      return !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(187)),
        this.Hte
          ? this.Hte.Owner
            ? ((this.wMn = this.Hte.Owner.GetComponentByClass(
                UE.KuroSceneItemMoveComponent.StaticClass(),
              )),
              this.wMn?.IsValid() ||
              ((this.wMn = this.Hte.Owner.AddComponentByClass(
                UE.KuroSceneItemMoveComponent.StaticClass(),
                !1,
                new UE.Transform(),
                !1,
              )),
              this.wMn?.IsValid())
                ? ((this.mBe = this.Entity.GetComponent(120)),
                  this.mBe
                    ? ((this.Lie = this.Entity.GetComponent(181)),
                      !!this.Lie ||
                        (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "SceneItem",
                            40,
                            "[SceneItemRotatorComponent] 实体缺少LevelTagComponent",
                            ["PbDataId", this.EIe?.GetPbDataId()],
                          ),
                        !1))
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "SceneItem",
                          40,
                          "[SceneItemRotatorComponent] 实体缺少SceneItemStateComponent",
                          ["PbDataId", this.EIe?.GetPbDataId()],
                        ),
                      !1))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "SceneItem",
                      40,
                      "[SceneItemRotatorComponent] 实体Actor缺少KuroSceneItemMoveComponent，且动态创建失败",
                      ["PbDataId", this.EIe?.GetPbDataId()],
                    ),
                  !1))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  40,
                  "[SceneItemRotatorComponent] 实体的SceneItemActorComponent.Owner不可用",
                  ["PbDataId", this.EIe?.GetPbDataId()],
                ),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[SceneItemRotatorComponent] 实体缺少SceneItemActorComponent",
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
      for (var [, t] of this.BMn)
        for (const s of t.RotationConfig) {
          var e;
          s.Curve &&
            "" !== s.Curve &&
            (this.bMn || (this.bMn = new Map()),
            this.bMn.has(s.Curve) ||
              ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                s.Curve,
                UE.CurveFloat,
              ))
                ? this.bMn.set(s.Curve, e)
                : (this.bMn.set(s.Curve, void 0), (this.NMn = !1))));
        }
      if (!this.NMn) {
        this.GMn || (this.GMn = new Map());
        for (var [o, i] of this.bMn)
          i ||
            ((i = ResourceSystem_1.ResourceSystem.LoadAsync(
              o,
              UE.CurveFloat,
              this.VMn,
            )),
            this.GMn.set(o, i));
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
    WMn(s) {
      if (
        this.kMn &&
        this.W1n !== s &&
        (this.wMn.IsRotating() && this.wMn.StopRotate(0), (this.W1n = s)) &&
        this.BMn.has(s) &&
        !this.wMn.IsRotating()
      ) {
        var n = this.BMn.get(s),
          t = n.RotatePoint
            ? this.qMn.get(n.RotatePoint)
            : this.Hte.GetInteractionMainActor();
        if (this.wMn.InitRotationData(t, n.IsLoop)) {
          var h = this.FMn.get(t);
          let i = Rotator_1.Rotator.Create(
            t.RootComponent.GetRelativeTransform().Rotator(),
          );
          for (let o = 0; o < n.RotationConfig.length; o++) {
            var r,
              a = n.RotationConfig[o],
              m = Vector_1.Vector.Create(a.Axis.X, a.Axis.Y, a.Axis.Z),
              _ = a.Curve ? this.bMn.get(a.Curve) : void 0;
            let t = void 0,
              e = void 0;
            "Relative" === a.Type
              ? ((t = Rotator_1.Rotator.Create(i)),
                (r = Rotator_1.Rotator.Create(
                  UE.KismetMathLibrary.RotatorFromAxisAndAngle(
                    m.ToUeVector(),
                    a.Angle,
                  ),
                )),
                (e = Rotator_1.Rotator.Create(t).AdditionEqual(r)),
                (i = e))
              : "Absolute" === a.Type &&
                ((t = Rotator_1.Rotator.Create(i)),
                (e = Rotator_1.Rotator.Create(
                  UE.KismetMathLibrary.RotatorFromAxisAndAngle(
                    m.ToUeVector(),
                    a.Angle,
                  ),
                ).AdditionEqual(h)),
                (i = e)),
              (t &&
                e &&
                this.wMn.AddRotationStep(
                  t.ToUeRotator(),
                  e.ToUeRotator(),
                  a.Time,
                  a.Cd ?? 0,
                  _,
                )) ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    40,
                    "[SceneItemRotatorComponent] 添加旋转步骤失败",
                    ["StateId", s],
                    ["StepIndex", o],
                    ["PbDataId", this.EIe?.GetPbDataId()],
                  ));
          }
          this.wMn.StartRotate();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[SceneItemRotatorComponent] 初始化旋转数据失败",
              ["StateId", s],
              ["PbDataId", this.EIe?.GetPbDataId()],
            );
      }
    }
  });
(SceneItemRotatorComponent = SceneItemRotatorComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(153)],
    SceneItemRotatorComponent,
  )),
  (exports.SceneItemRotatorComponent = SceneItemRotatorComponent);
//# sourceMappingURL=SceneItemRotatorComponent.js.map
