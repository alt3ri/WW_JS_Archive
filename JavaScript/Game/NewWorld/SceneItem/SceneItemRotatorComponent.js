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
        (this.SIe = void 0),
        (this.Hte = void 0),
        (this.mBe = void 0),
        (this.Lie = void 0),
        (this.tSn = void 0),
        (this.iSn = void 0),
        (this.oSn = void 0),
        (this.rSn = void 0),
        (this.nSn = void 0),
        (this.sSn = !1),
        (this.aSn = !1),
        (this.hSn = !1),
        (this.c_n = 0),
        (this.lSn = void 0),
        (this._Sn = (t, e) => {
          if ((this.nSn.delete(e), t)) {
            if ((this.oSn.set(e, t), !(0 < this.nSn.size))) {
              for (var [, o] of this.oSn) if (!o) return;
              (this.sSn = !0), this.aSn && this.uSn();
            }
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[SceneItemRotatorComponent] 曲线加载失败，请检查实体配置",
                ["CurvePath", e],
                ["PbDataId", this.SIe?.GetPbDataId()],
              );
        }),
        (this.cSn = () => {
          var t = this.Hte.GetInteractionMainActor();
          if (t) {
            for (var [e] of this.rSn ?? []) {
              var o = this.Hte?.GetActorInSceneInteraction(e);
              if (!o)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    40,
                    "[SceneItemRotatorComponent] 找不到对应的旋转Actor，请检查实体配置和预制体",
                    ["ActorKey", e],
                    ["PbDataId", this.SIe?.GetPbDataId()],
                  )
                );
              this.rSn.set(e, o);
            }
            this.lSn || (this.lSn = new Map()),
              this.lSn.set(
                t,
                Rotator_1.Rotator.Create(
                  t.RootComponent.GetRelativeTransform().Rotator(),
                ),
              );
            for (var [, i] of this.rSn ?? [])
              this.lSn.set(
                i,
                Rotator_1.Rotator.Create(
                  i.RootComponent.GetRelativeTransform().Rotator(),
                ),
              );
            (this.aSn = !0), this.sSn && this.uSn();
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[SceneItemRotatorComponent] 找不到对应的场景交互物MainActor，请检查实体配置和预制体",
                ["PbDataId", this.SIe?.GetPbDataId()],
              );
        }),
        (this.G_n = (t, e) => {
          this.hSn && this.mSn(t);
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemRotatorComponent_1)[0];
      (this.SIe = this.Entity.GetComponent(0)), (this.iSn = new Map());
      for (const o of t.Config) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o.State);
        if (!e)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                `[SceneItemRotatorComponent] 配置出错，找不到${o.State}对应的状态Id`,
                ["PbDataId", this.SIe?.GetPbDataId()],
              ),
            !1
          );
        o.RotationConfig.length <= 0
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              40,
              "[SceneItemRotatorComponent] 该状态的旋转配置列表为空，跳过该状态的配置",
              ["PbDataId", this.SIe?.GetPbDataId()],
              ["State", o.State],
            )
          : this.iSn.set(e, o);
      }
      return !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        this.Hte
          ? this.Hte.Owner
            ? ((this.tSn = this.Hte.Owner.GetComponentByClass(
                UE.KuroSceneItemMoveComponent.StaticClass(),
              )),
              this.tSn?.IsValid() ||
              ((this.tSn = this.Hte.Owner.AddComponentByClass(
                UE.KuroSceneItemMoveComponent.StaticClass(),
                !1,
                new UE.Transform(),
                !1,
              )),
              this.tSn?.IsValid())
                ? ((this.mBe = this.Entity.GetComponent(117)),
                  this.mBe
                    ? ((this.Lie = this.Entity.GetComponent(177)),
                      !!this.Lie ||
                        (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "SceneItem",
                            40,
                            "[SceneItemRotatorComponent] 实体缺少LevelTagComponent",
                            ["PbDataId", this.SIe?.GetPbDataId()],
                          ),
                        !1))
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "SceneItem",
                          40,
                          "[SceneItemRotatorComponent] 实体缺少SceneItemStateComponent",
                          ["PbDataId", this.SIe?.GetPbDataId()],
                        ),
                      !1))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "SceneItem",
                      40,
                      "[SceneItemRotatorComponent] 实体Actor缺少KuroSceneItemMoveComponent，且动态创建失败",
                      ["PbDataId", this.SIe?.GetPbDataId()],
                    ),
                  !1))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  40,
                  "[SceneItemRotatorComponent] 实体的SceneItemActorComponent.Owner不可用",
                  ["PbDataId", this.SIe?.GetPbDataId()],
                ),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[SceneItemRotatorComponent] 实体缺少SceneItemActorComponent",
                ["PbDataId", this.SIe?.GetPbDataId()],
              ),
            !1)
      );
    }
    OnActivate() {
      return (
        (this.sSn = !1),
        (this.aSn = !1),
        this.dSn(),
        this.CSn(),
        !this.hSn && this.sSn && this.aSn && this.uSn(),
        !0
      );
    }
    dSn() {
      this.sSn = !0;
      for (var [, t] of this.iSn)
        for (const s of t.RotationConfig) {
          var e;
          s.Curve &&
            "" !== s.Curve &&
            (this.oSn || (this.oSn = new Map()),
            this.oSn.has(s.Curve) ||
              ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                s.Curve,
                UE.CurveFloat,
              ))
                ? this.oSn.set(s.Curve, e)
                : (this.oSn.set(s.Curve, void 0), (this.sSn = !1))));
        }
      if (!this.sSn) {
        this.nSn || (this.nSn = new Map());
        for (var [o, i] of this.oSn)
          i ||
            ((i = ResourceSystem_1.ResourceSystem.LoadAsync(
              o,
              UE.CurveFloat,
              this._Sn,
            )),
            this.nSn.set(o, i));
      }
    }
    CSn() {
      this.aSn = !1;
      for (var [, t] of this.iSn)
        t.RotatePoint &&
          (this.rSn || (this.rSn = new Map()),
          this.rSn.has(t.RotatePoint) || this.rSn.set(t.RotatePoint, void 0));
      this.Hte.GetIsSceneInteractionLoadCompleted()
        ? this.cSn()
        : EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.cSn,
          ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.cSn,
          );
    }
    OnEnd() {
      if (
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.G_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.G_n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.cSn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.cSn,
          ),
        this.nSn)
      )
        for (var [, t] of this.nSn)
          t && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
      return !0;
    }
    uSn() {
      if (!this.hSn && this.sSn && this.aSn) {
        let t = 0;
        for (var [e] of this.iSn)
          if (this.Lie.HasTag(e)) {
            t = e;
            break;
          }
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.G_n,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.G_n,
          ),
          (this.hSn = !0),
          this.mSn(t);
      }
    }
    mSn(s) {
      if (
        this.hSn &&
        this.c_n !== s &&
        (this.tSn.IsRotating() && this.tSn.StopRotate(0), (this.c_n = s)) &&
        this.iSn.has(s) &&
        !this.tSn.IsRotating()
      ) {
        var n = this.iSn.get(s),
          t = n.RotatePoint
            ? this.rSn.get(n.RotatePoint)
            : this.Hte.GetInteractionMainActor();
        if (this.tSn.InitRotationData(t, n.IsLoop)) {
          var h = this.lSn.get(t);
          let i = Rotator_1.Rotator.Create(
            t.RootComponent.GetRelativeTransform().Rotator(),
          );
          for (let o = 0; o < n.RotationConfig.length; o++) {
            var r,
              a = n.RotationConfig[o],
              m = Vector_1.Vector.Create(a.Axis.X, a.Axis.Y, a.Axis.Z),
              _ = a.Curve ? this.oSn.get(a.Curve) : void 0;
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
                this.tSn.AddRotationStep(
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
                    ["PbDataId", this.SIe?.GetPbDataId()],
                  ));
          }
          this.tSn.StartRotate();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[SceneItemRotatorComponent] 初始化旋转数据失败",
              ["StateId", s],
              ["PbDataId", this.SIe?.GetPbDataId()],
            );
      }
    }
  });
(SceneItemRotatorComponent = SceneItemRotatorComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(150)],
    SceneItemRotatorComponent,
  )),
  (exports.SceneItemRotatorComponent = SceneItemRotatorComponent);
//# sourceMappingURL=SceneItemRotatorComponent.js.map
