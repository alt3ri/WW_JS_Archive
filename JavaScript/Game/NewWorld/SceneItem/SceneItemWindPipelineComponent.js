"use strict";
var SceneItemWindPipelineComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, s) {
      var n,
        r = arguments.length,
        o =
          r < 3
            ? t
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(e, t, i, s);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (n = e[h]) &&
            (o = (r < 3 ? n(o) : 3 < r ? n(t, i, o) : n(t, i)) || o);
      return 3 < r && o && Object.defineProperty(t, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemWindPipelineComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectParameterNiagara_1 = require("../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData"),
  GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BASE_DIAMETER = 2e3;
let SceneItemWindPipelineComponent =
  (SceneItemWindPipelineComponent_1 = class SceneItemWindPipelineComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.SplineData = void 0),
        (this.Zsh = void 0),
        (this.eah = void 0),
        (this.zie = void 0),
        (this.Ygl = []),
        (this.iah = []),
        (this.zgl = []),
        (this.rah = void 0),
        (this.oah = void 0),
        (this.Jgl = void 0),
        (this.TDe = void 0),
        (this.Zgl = 0),
        (this.e0l = 0),
        (this.Etn = (e) => {
          e &&
            ((ModelManager_1.ModelManager.GameSplineModel.CurWindPipelineResistance =
              this.SplineData.Resistance),
            (ModelManager_1.ModelManager.GameSplineModel.CurWindPipelineSpeedLimit =
              this.SplineData.SpeedLimit));
        }),
        (this.sah = () => {
          var e = this.Ygl[this.Zgl],
            t = this.t0l(this.Zgl)
              ? this.SplineData.TailCircleEffect
              : this.SplineData.MiddleCircleEffect;
          StringUtils_1.StringUtils.IsEmpty(t) ||
            ((e = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              e.ToUeTransform(),
              t,
              "[WindPipeline] GenerateEffectsAlongSpline",
            )),
            this.iah.push(e)),
            this.Zgl++,
            this.Zgl >= this.Ygl.length &&
              TimerSystem_1.TimerSystem.Remove(this.oah);
        }),
        (this.i0l = (e, t) => {
          t &&
            (-3775711 === e
              ? StringUtils_1.StringUtils.IsEmpty(
                  this.SplineData?.MiddleCircleOverlyingEffect,
                ) ||
                ((this.e0l = 0),
                (this.Jgl = TimerSystem_1.TimerSystem.Forever(this.r0l, 100)))
              : (void 0 !== this.Jgl &&
                  (TimerSystem_1.TimerSystem.Remove(this.Jgl),
                  (this.Jgl = void 0)),
                this.zgl.forEach((e) => {
                  EffectSystem_1.EffectSystem.StopEffectById(
                    e,
                    "[WindPipeline] OnEnd",
                    !1,
                  );
                }),
                (this.zgl.length = 0)));
        }),
        (this.r0l = () => {
          var e = this.Ygl[this.e0l],
            e = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              e.ToUeTransform(),
              this.SplineData?.MiddleCircleOverlyingEffect,
              "[WindPipeline] GenerateEffectsAlongSpline",
            );
          this.zgl.push(e),
            this.e0l++,
            this.e0l >= this.Ygl.length &&
              TimerSystem_1.TimerSystem.Remove(this.Jgl);
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemWindPipelineComponent_1)[0];
      return (this.Lo = e), !0;
    }
    OnStart() {
      this.Hte = this.Entity.GetComponent(200);
      var e = this.Hte.CreatureData.GetPbEntityInitData();
      return void 0 === e
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              31,
              "[SceneItemWindPipelineComponent]找不到entityData",
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ),
          !1)
        : void 0 ===
              (e = (0, IComponent_1.getComponent)(
                e.ComponentsData,
                "SplineComponent",
              )) || e.Option.Type !== IComponent_1.ESplineType.AirPassage
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "[SceneItemWindPipelineComponent]获取不到正确的Spline数据",
                ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ),
            !1)
          : ((this.SplineData = e.Option),
            (this.Zsh = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
              GlobalData_1.GlobalData.World,
              UE.KuroActorSubsystem.StaticClass(),
            )),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.i0l,
            ),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
              this.Etn,
            ),
            !0);
    }
    OnActivate() {
      this.aah(), this.hah(), this.lah();
    }
    OnEnd() {
      return this.cTa(), this.ko1(), !0;
    }
    OnDisable(e) {
      this.cTa(), this.ko1();
    }
    cTa() {
      this.iah.forEach((e) => {
        EffectSystem_1.EffectSystem.StopEffectById(
          e,
          "[WindPipeline] OnEnd",
          !0,
        );
      }),
        void (this.iah.length = 0) !== this.rah &&
          (EffectSystem_1.EffectSystem.StopEffectById(
            this.rah,
            "[WindPipeline] OnEnd",
            !0,
          ),
          (this.rah = void 0)),
        void 0 !== this.oah && TimerSystem_1.TimerSystem.Remove(this.oah),
        void 0 !== this.Jgl &&
          (TimerSystem_1.TimerSystem.Remove(this.Jgl), (this.Jgl = void 0)),
        this.zgl.forEach((e) => {
          EffectSystem_1.EffectSystem.StopEffectById(
            e,
            "[WindPipeline] OnEnd",
            !1,
          );
        }),
        (this.zgl.length = 0);
    }
    ko1() {
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.i0l,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.i0l,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Etn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.Etn,
          );
    }
    aah() {
      var e;
      this.Hte &&
        this.SplineData &&
        ((e =
          GameSplineUtils_1.GameSplineUtils.GenerateGuideEffectWithSplineData(
            this.Hte.ActorTransform,
            this.SplineData.Points,
            this.SplineData.MiddleLineEffect,
          )),
        (this.zie = e?.SplineComp),
        (this.rah = e?.EffectHandle),
        ((e =
          new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat =
          []),
        e.UserParameterFloat.push([
          FNameUtil_1.FNameUtil.GetDynamicFName("BeamWidth"),
          4 * this.SplineData.MiddleCircleRadius,
        ]),
        this.rah) &&
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.rah, e);
    }
    hah() {
      if (this.Hte && this.SplineData && this.zie && this.SplineData) {
        var e = this.zie.GetSplineLength(),
          t = Math.ceil(e / this.SplineData?.MiddleCircleSpace),
          i = (2 * this.SplineData.MiddleCircleRadius) / BASE_DIAMETER;
        for (let e = 0; e < t; e++) {
          var s = this.zie.D_GetLocationAtDistanceAlongSpline(
              e * this.SplineData?.MiddleCircleSpace,
              1,
            ),
            n = this.zie
              .D_GetTangentAtDistanceAlongSpline(
                e * this.SplineData?.MiddleCircleSpace,
                1,
              )
              .Rotation();
          this.Ygl.push(
            Transform_1.Transform.Create(
              Rotator_1.Rotator.Create(n.Pitch, n.Yaw, n.Roll).Quaternion(),
              Vector_1.Vector.Create(s.X, s.Y, s.Z),
              Vector_1.Vector.Create(i, i, i),
            ),
          );
        }
        var r = this.zie.D_GetLocationAtDistanceAlongSpline(e, 1),
          e = this.zie.D_GetTangentAtDistanceAlongSpline(e, 1).Rotation();
        this.Ygl.push(
          Transform_1.Transform.Create(
            Rotator_1.Rotator.Create(e.Pitch, e.Yaw, e.Roll).Quaternion(),
            Vector_1.Vector.Create(r.X, r.Y, r.Z),
            Vector_1.Vector.Create(i, i, i),
          ),
        ),
          (this.Zgl = 0),
          (this.oah = TimerSystem_1.TimerSystem.Forever(this.sah, 100));
      }
    }
    lah() {
      var e,
        t = this.Lo?.ActorRef;
      void 0 !== t &&
        ((e = t.PathName.split(".")[1] + "." + t.PathName.split(".")[2]),
        (this.eah = this.Zsh.GetActor(
          FNameUtil_1.FNameUtil.GetDynamicFName(e),
        )),
        void 0 === this.eah
          ? (void 0 === this.TDe &&
              (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
                this.lah();
              }, 500)),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "[SceneItemWindPipelineComponent] CylinderTriggerActor不存在",
                ["ActorPath", t],
              ))
          : void 0 !== this.TDe &&
            (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)));
    }
    t0l(e) {
      return 0 === e || e === this.Ygl.length - 1;
    }
  });
(SceneItemWindPipelineComponent = SceneItemWindPipelineComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(257)],
    SceneItemWindPipelineComponent,
  )),
  (exports.SceneItemWindPipelineComponent = SceneItemWindPipelineComponent);
//# sourceMappingURL=SceneItemWindPipelineComponent.js.map
