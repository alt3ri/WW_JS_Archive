"use strict";
var RenderMaskComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        a = arguments.length,
        r =
          a < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (o = t[n]) &&
            (r = (a < 3 ? o(r) : 3 < a ? o(e, i, r) : o(e, i)) || r);
      return 3 < a && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderMaskComponent = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderDataManager_1 = require("../../../../Render/Data/RenderDataManager"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils"),
  MAX_SPEED = 600;
let RenderMaskComponent =
  (RenderMaskComponent_1 = class RenderMaskComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Jnl = !1),
        (this.Znl = 0),
        (this.bsr = void 0),
        (this.esl = !1),
        (this.tsl = void 0),
        (this.fll = 0),
        (this.vll = ""),
        (this.Hte = void 0),
        (this.DebugMode = !1),
        (this.FollowEntity = void 0),
        (this.Yrc = !1),
        (this.h_1 = void 0),
        (this.kRe = void 0),
        (this.l_1 = void 0),
        (this._un = void 0);
    }
    OnInitData(t) {
      t = t.GetParam(RenderMaskComponent_1)[0];
      if (((this.Lo = t), !this.Lo)) return !1;
      switch (this.Lo.RenderConfig.Type) {
        case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
          (this.Znl = this.Lo.RenderConfig.Radius),
            (this.tsl =
              FNameUtil_1.FNameUtil.GetDynamicFName("PCG_FlowerBridge")),
            (this.vll = (0, AudioSystem_1.parseAudioEventPath)(
              this.Lo.RenderConfig.AkEvent,
            )),
            (this.Yrc = !0);
          break;
        case IComponent_1.ERenderSpecifiedRangeType.BookPage:
          (this.Znl = this.Lo.RenderConfig.Radius),
            (this.vll = (0, AudioSystem_1.parseAudioEventPath)(
              this.Lo.RenderConfig.AkEvent,
            ));
          break;
        case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
          (this.h_1 = Vector_1.Vector.Create()),
            this.h_1.FromConfigVector(this.Lo.RenderConfig.Size),
            this.h_1.MultiplyEqual(2);
      }
      return !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(1)),
        this.Lo?.RenderConfig.Type ===
          IComponent_1.ERenderSpecifiedRangeType.FlowerBridge &&
          ((this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
          (this.bsr.bIsSingle = !1),
          (this.bsr.bTraceComplex = !1),
          (this.bsr.bIgnoreSelf = !0),
          this.bsr.AddObjectTypeQuery(
            QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
          ),
          (this.bsr.Radius = this.Znl),
          (this.bsr.WorldContextObject = GlobalData_1.GlobalData.World)),
        !0
      );
    }
    OnEnd() {
      return (
        this.isl(), this.bsr && (this.bsr.Dispose(), (this.bsr = void 0)), !0
      );
    }
    OnDisable(t) {
      this.isl();
    }
    OnEnable() {
      this.rsl();
    }
    OnTick(t) {
      var e = this.osl(),
        i = this.Jnl !== e;
      if (e)
        return (
          this.__1(),
          this.nsl()
            ? ((this.Jnl = e), this.rsl(), void this.Cl())
            : void this.isl()
        );
      i && ((this.Jnl = e), this.isl());
    }
    rsl() {
      if (!this.esl) {
        var t = this.c_1();
        if (t?.IsValid()) {
          switch (this.Lo?.RenderConfig.Type) {
            case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
            case IComponent_1.ERenderSpecifiedRangeType.BookPage:
              var e = UE.KismetMaterialLibrary.GetScalarParameterValue(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"),
              );
              UE.KuroMaterialParameterCollectionManager.SetScalarParameterValueTimeCurve(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"),
                this.Znl,
                e,
                0.4,
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                !1,
              );
              break;
            case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
              UE.KismetMaterialLibrary.SetVectorParameterValue(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("WidthHeight"),
                UE.KismetMathLibrary.Conv_VectorDoubleToLinearColor(
                  this.h_1.ToUeVector(),
                ),
              );
              break;
            default:
              return;
          }
          this.fll ||
            !this.Hte ||
            StringUtils_1.StringUtils.IsEmpty(this.vll) ||
            (this.fll = AudioSystem_1.AudioSystem.PostEvent(
              this.vll,
              this.Hte.Owner,
            )),
            (this.esl = !0);
        }
      }
    }
    isl() {
      if (this.esl) {
        var t = this.c_1();
        if (t?.IsValid()) {
          switch (this.Lo?.RenderConfig.Type) {
            case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
            case IComponent_1.ERenderSpecifiedRangeType.BookPage:
              var e = UE.KismetMaterialLibrary.GetScalarParameterValue(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"),
              );
              UE.KuroMaterialParameterCollectionManager.SetScalarParameterValueTimeCurve(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("FlowerBridge_Radius"),
                0,
                e,
                0.4,
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                !1,
              );
              break;
            case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
              UE.KismetMaterialLibrary.SetVectorParameterValue(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("WidthHeight"),
                UE.KismetMathLibrary.Conv_VectorToLinearColor(
                  Vector_1.Vector.ZeroVector,
                ),
              );
              break;
            default:
              return;
          }
          this.fll &&
            (AudioSystem_1.AudioSystem.ExecuteAction(this.fll, 0),
            (this.fll = 0)),
            (this.esl = !1);
        }
      }
    }
    Cl() {
      var t, e;
      this.c_1()?.IsValid() &&
        (t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity) &&
        ((t = t.Entity?.GetComponent(176)) &&
          this.Yrc &&
          ((e = MathUtils_1.MathUtils.RangeClamp(t.Speed, 0, MAX_SPEED, 0, 1)),
          this.DebugMode &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneGameplay",
              7,
              "RenderMaskComponent",
              ["CurSpeed", t.Speed],
              ["RtpcValue", e],
            ),
          AudioSystem_1.AudioSystem.SetRtpcValue(
            "interact_level_chun_huaqiao",
            e,
          )),
        this.__1());
    }
    nsl() {
      if (
        this.Lo?.RenderConfig.Type !==
        IComponent_1.ERenderSpecifiedRangeType.FlowerBridge
      )
        return !0;
      if (
        this.bsr?.IsValid() &&
        Global_1.Global.BaseCharacter?.IsValid() &&
        this.tsl
      ) {
        this.bsr.HitResult?.Clear(),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.bsr,
            Global_1.Global.BaseCharacter?.D_K2_GetActorLocation(),
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.bsr,
            Global_1.Global.BaseCharacter?.D_K2_GetActorLocation(),
          );
        var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.bsr,
          "RenderMaskComponent.RangeCheck",
        );
        if (!t) return t;
        var e = this.bsr.HitResult.GetHitCount() ?? 0;
        for (let t = 0; t < e; ++t) {
          var i = this.bsr.HitResult?.Actors?.Get(t)?.Tags.Contains(this.tsl);
          if (i) return i;
        }
      }
      return !1;
    }
    osl() {
      var t;
      return (
        !this._un?.IsLocked &&
        (!(t = this.Lo?.Condition) ||
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
            t,
            void 0,
            LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
          ))
      );
    }
    ToggleDebugMode(t) {
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((this.DebugMode = t), this.bsr) &&
        (TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.bsr,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.bsr,
          ColorUtils_1.ColorUtils.LinearRed,
        ),
        this.bsr.SetDrawDebugTrace(this.DebugMode ? 1 : 0));
    }
    __1() {
      var t = this.c_1();
      if (
        t?.IsValid() &&
        ((this.FollowEntity && this.FollowEntity.Valid) ||
          (this.aGl(), this.FollowEntity))
      ) {
        var e = this.FollowEntity.GetComponent(1);
        if (e)
          switch (this.Lo?.RenderConfig.Type) {
            case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
            case IComponent_1.ERenderSpecifiedRangeType.BookPage:
              UE.KismetMaterialLibrary.SetVectorParameterValue(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName(
                  "FlowerBridge_CenterPosition",
                ),
                UE.KismetMathLibrary.Conv_VectorDoubleToLinearColor(
                  e.ActorLocationProxy.ToUeVector(),
                ),
              );
              break;
            case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
              this.kRe || (this.kRe = Vector_1.Vector.Create()),
                this.l_1 || (this.l_1 = Quat_1.Quat.Create()),
                MathUtils_1.MathUtils.CommonTempRotator.Set(
                  this.Lo.RenderConfig.Rotator?.Y ?? 0,
                  this.Lo.RenderConfig.Rotator?.Z ?? 0,
                  this.Lo.RenderConfig.Rotator?.X ?? 0,
                ),
                e.ActorRotationProxy.Quaternion().Multiply(
                  MathUtils_1.MathUtils.CommonTempRotator.Quaternion(),
                  this.l_1,
                ),
                MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(
                  this.Lo.RenderConfig.Center,
                ),
                this.l_1.RotateVector(
                  MathUtils_1.MathUtils.CommonTempVector,
                  this.kRe,
                ),
                this.kRe.AdditionEqual(e.ActorLocationProxy);
              var i = this.kRe.ToUeVector(),
                s = this.l_1
                  .GetForwardVector(MathUtils_1.MathUtils.CommonTempVector)
                  .ToUeVectorOld();
              UE.KismetMaterialLibrary.SetVectorParameterValue(
                GlobalData_1.GlobalData.GameInstance.GetWorld(),
                t,
                FNameUtil_1.FNameUtil.GetDynamicFName("CenterPoint"),
                UE.KismetMathLibrary.Conv_VectorDoubleToLinearColor(i),
              ),
                UE.KismetMaterialLibrary.SetVectorParameterValue(
                  GlobalData_1.GlobalData.GameInstance.GetWorld(),
                  t,
                  FNameUtil_1.FNameUtil.GetDynamicFName("ForwardVector"),
                  UE.KismetMathLibrary.Conv_VectorToLinearColor(s),
                ),
                this.DebugMode &&
                  UE.KismetSystemLibrary.D_DrawDebugBox(
                    GlobalData_1.GlobalData.World,
                    this.kRe.ToUeVector(),
                    this.h_1
                      .Multiply(0.5, MathUtils_1.MathUtils.CommonTempVector)
                      .ToUeVector(),
                    ColorUtils_1.ColorUtils.LinearRed,
                    this.l_1.Rotator().ToUeRotator(),
                    1,
                    1,
                  );
          }
      }
    }
    aGl() {
      var t = this.Lo?.RenderConfig;
      switch (t.CenterTarget.Type) {
        case "Player":
          this.FollowEntity =
            ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
          break;
        case "Self":
          this.FollowEntity = this.Entity;
          break;
        case "Target":
          this.FollowEntity =
            ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
              t.CenterTarget.EntityId,
            )?.Entity;
      }
    }
    c_1() {
      let t = void 0;
      switch (this.Lo?.RenderConfig.Type) {
        case IComponent_1.ERenderSpecifiedRangeType.FlowerBridge:
        case IComponent_1.ERenderSpecifiedRangeType.BookPage:
          t =
            RenderDataManager_1.RenderDataManager.Get().GetSceneInteractionMaterialParameterCollection();
          break;
        case IComponent_1.ERenderSpecifiedRangeType.FogBarrier:
          t =
            RenderDataManager_1.RenderDataManager.Get().GetGroundFogMaskMaterialParameterCollection();
      }
      if (t?.IsValid()) return t;
    }
  });
(RenderMaskComponent = RenderMaskComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(248)],
    RenderMaskComponent,
  )),
  (exports.RenderMaskComponent = RenderMaskComponent);
//# sourceMappingURL=RenderMaskComponent.js.map
