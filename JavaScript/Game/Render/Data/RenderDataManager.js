"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderDataManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioDefine_1 = require("../../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WeatherModel_1 = require("../../Module/Weather/WeatherModel"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RenderConfig_1 = require("../Config/RenderConfig"),
  RenderModuleConfig_1 = require("../Manager/RenderModuleConfig");
class RenderDataManager {
  constructor() {
    (this.Valid = !1),
      (this.GlobalShaderParameters = void 0),
      (this.SceneInteractionMaterialParameterCollection = void 0),
      (this.UiShowBrightnessMaterialParameterCollection = void 0),
      (this.UiShowColorSettingMaterialParameterCollection = void 0),
      (this.EyesParameterMaterialParameterCollection = void 0),
      (this.GroundFogMaskMaterialParameterCollection = void 0),
      (this.GlobalLensFlareConfig = void 0),
      (this.GlobalDecalShadowConfig = void 0),
      (this.PreviousCharacterPosition = void 0),
      (this.CurrentCharacterPosition = void 0),
      (this.PreviousCharacterPositionWithOffset = void 0),
      (this.CurrentCharacterPositionWithOffset = void 0),
      (this.CurrentCharacterForward = void 0),
      (this.CurrentCameraPosition = void 0),
      (this.CurrentCameraPositionWithOffset = void 0),
      (this.CurrentCameraForward = void 0),
      (this.CurrentPlayerMoveState = void 0),
      (this.SceneTime = -0),
      (this.TempColor = void 0),
      (this.WriteTimeToCollection = !1),
      (this.IsInUiScene = !1),
      (this.GlobalFootstepMaterial = void 0),
      (this.PlayerInGrass = !1),
      (this.EmptyMaterial = void 0),
      (this.PlayerInCave = !1),
      (this.PlayerVoxelStateDirty = !0),
      (this.ForbidWeather = !1),
      (this.CachedGravityDirect = Vector_1.Vector.Create(0, 0, -1)),
      (this.xDa = (t) => {
        (this.GlobalFootstepMaterial = t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGlobalFootstepMaterialChange,
            t,
          );
      }),
      (this.H5l = (t) => {
        (this.ForbidWeather = t),
          WeatherModel_1.WeatherModel.GetWorldWeatherActor().SetWeatherForbidden(
            t,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnForbidWeatherStateChange,
            t,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 25, "随机天气状态变化", [
              "状态",
              t ? "禁用" : "启用",
            ]);
      }),
      (this.Xlr = 60),
      (this.$lr = 1),
      (this.Ylr = 0),
      (this.ySl = 0),
      (this.ESl = 0),
      (this.ISl = 0);
  }
  static Get() {
    return (
      this.Instance ||
        ((this.Instance = new RenderDataManager()), this.Instance.Init()),
      this.Instance
    );
  }
  Init() {
    (this.Valid = !1),
      this.LoadAssets(),
      (this.PreviousCharacterPosition = Vector_1.Vector.Create()),
      (this.CurrentCharacterPosition = Vector_1.Vector.Create()),
      (this.PreviousCharacterPositionWithOffset = Vector_1.Vector.Create()),
      (this.CurrentCharacterPositionWithOffset = Vector_1.Vector.Create()),
      (this.CurrentCharacterForward = Vector_1.Vector.Create()),
      (this.CurrentCameraPosition = Vector_1.Vector.Create()),
      (this.CurrentCameraPositionWithOffset = Vector_1.Vector.Create()),
      (this.CurrentCameraForward = Vector_1.Vector.Create()),
      (this.TempColor = new UE.LinearColor()),
      (this.WriteTimeToCollection = !0),
      UE.KuroGlobalGI.BindEventGlobalFootstepMaterialUpdate(
        (0, puerts_1.toManualReleaseDelegate)(this.xDa),
      ),
      UE.KuroGlobalGI.BindEventForbidWeatherStateChanged(
        (0, puerts_1.toManualReleaseDelegate)(this.H5l),
      );
  }
  GetRainIntensity() {
    return GlobalData_1.GlobalData.World && this.GlobalShaderParameters
      ? UE.KismetMaterialLibrary.GetScalarParameterValue(
          GlobalData_1.GlobalData.World,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalRainIntensity,
        )
      : 0;
  }
  GetSnowIntensity() {
    return GlobalData_1.GlobalData.World && this.GlobalShaderParameters
      ? UE.KismetMaterialLibrary.GetScalarParameterValue(
          GlobalData_1.GlobalData.World,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalSnowIntensity,
        )
      : 0;
  }
  GetWindIntensity() {
    return GlobalData_1.GlobalData.World && this.GlobalShaderParameters
      ? UE.KismetMaterialLibrary.GetScalarParameterValue(
          GlobalData_1.GlobalData.World,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalWindSpeed,
        )
      : 0;
  }
  SetGrassAo(t) {
    GlobalData_1.GlobalData.World &&
      this.GlobalShaderParameters &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        this.GlobalShaderParameters,
        RenderConfig_1.RenderConfig.GlobalGrassAO,
        t,
      );
  }
  GetMainLightVector(t = void 0) {
    var t = t || GlobalData_1.GlobalData.World;
    if (t && this.GlobalShaderParameters)
      return (
        (t = UE.KismetMaterialLibrary.GetVectorParameterValue(
          t,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalMainLightVector,
        )),
        Vector_1.Vector.Create(t.R, t.G, t.B)
      );
  }
  GetGlobalLensFlareConfig() {
    return this.Valid ? this.GlobalLensFlareConfig : void 0;
  }
  GetGlobalDecalShadowConfig() {
    return this.Valid ? this.GlobalDecalShadowConfig : void 0;
  }
  GetCurrentCharacterPosition() {
    return this.CurrentCharacterPosition;
  }
  GetPreviousCharacterPosition() {
    return this.PreviousCharacterPosition;
  }
  GetCurrentCharacterPositionWithOffset() {
    return this.CurrentCharacterPositionWithOffset;
  }
  GetPreviousCharacterPositionWithOffset() {
    return this.PreviousCharacterPositionWithOffset;
  }
  GetCurrentCharacterForward() {
    return this.CurrentCharacterForward;
  }
  GetCurrentCameraPosition() {
    return this.CurrentCameraPosition;
  }
  GetCurrentCameraPositionWithOffset() {
    return this.CurrentCameraPosition;
  }
  GetCurrentCameraForward() {
    return this.CurrentCameraForward;
  }
  GetGlobalShaderParameters() {
    return this.GlobalShaderParameters;
  }
  GetSceneInteractionMaterialParameterCollection() {
    return this.SceneInteractionMaterialParameterCollection;
  }
  GetUiShowBrightnessMaterialParameterCollection() {
    return this.UiShowBrightnessMaterialParameterCollection;
  }
  GetUiShowColorSettingMaterialParameterCollection() {
    return this.UiShowColorSettingMaterialParameterCollection;
  }
  GetEyesParameterMaterialParameterCollection() {
    return this.EyesParameterMaterialParameterCollection;
  }
  GetGroundFogMaskMaterialParameterCollection() {
    return this.GroundFogMaskMaterialParameterCollection;
  }
  GetPlayerInGrass() {
    return this.Brh(), this.PlayerInGrass;
  }
  GetPlayerInCave() {
    return this.Brh(), this.PlayerInCave;
  }
  Brh() {
    var t;
    this.PlayerVoxelStateDirty &&
      ((t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGlobalGIActor(
        GlobalData_1.GlobalData.World,
      )),
      (this.PlayerInGrass = t?.bPlayerInGrass),
      (this.PlayerInCave = t?.bPlayerInCave),
      (this.PlayerVoxelStateDirty = !1));
  }
  GetSceneTime() {
    return this.SceneTime;
  }
  GetGlobalFootstepMaterial() {
    return this.GlobalFootstepMaterial;
  }
  GetEmptyMaterial() {
    return this.EmptyMaterial;
  }
  SetWriteTime(t) {
    this.WriteTimeToCollection = t;
  }
  TickForce(t) {
    var e, i, r, s;
    this.Valid &&
      (RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Start(),
      (this.PlayerVoxelStateDirty = !0),
      (e = GlobalData_1.GlobalData.World),
      (r = Global_1.Global.CharacterCameraManager) &&
        r.IsValid() &&
        ((s = r.D_K2_GetActorLocation()),
        (i = r.K2_GetActorLocation()),
        (r = r.GetActorForwardVector()),
        this.CurrentCameraPosition.FromUeVector(s),
        this.CurrentCameraPositionWithOffset.FromUeVector(i),
        this.CurrentCameraForward.FromUeVector(r),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          e,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCameraPosAndRadius,
          new UE.LinearColor(i.X, i.Y, i.Z, 0),
        ),
        (s =
          Info_1.Info.IsGameRunning() &&
          (GlobalData_1.GlobalData.IsUiSceneOpen ||
            GlobalData_1.GlobalData.IsUiSceneLoading)) !== this.IsInUiScene) &&
        ((this.IsInUiScene = s), this.MPn()),
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Stop());
  }
  Tick(t) {
    var e, i, r, s;
    this.Valid &&
      (RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Start(),
      (t = t * TimeUtil_1.TimeUtil.Millisecond),
      (e = GlobalData_1.GlobalData.World),
      (i = Global_1.Global.PawnOrSpectator) &&
        i.IsValid() &&
        ((r = i.D_K2_GetActorLocation()),
        (s = i.K2_GetActorLocation()),
        (i = i.GetActorForwardVector()),
        this.PreviousCharacterPosition.Set(
          this.CurrentCharacterPosition.X,
          this.CurrentCharacterPosition.Y,
          this.CurrentCharacterPosition.Z,
        ),
        this.PreviousCharacterPositionWithOffset.Set(
          this.CurrentCharacterPositionWithOffset.X,
          this.CurrentCharacterPositionWithOffset.Y,
          this.CurrentCharacterPositionWithOffset.Z,
        ),
        this.CurrentCharacterPosition.FromUeVector(r),
        this.CurrentCharacterPositionWithOffset.FromUeVector(s),
        this.CurrentCharacterForward.FromUeVector(i),
        (r =
          Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
            173,
          )),
        (this.CurrentPlayerMoveState = r?.MoveState),
        (s =
          this.CurrentPlayerMoveState &&
          this.CurrentPlayerMoveState <
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb),
        UE.KismetMaterialLibrary.SetScalarParameterValue(
          e,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterOnGround,
          s ? 1 : 0,
        ),
        this.Jlr(this.PreviousCharacterPositionWithOffset),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          e,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterPreviousWP,
          this.TempColor,
        ),
        this.Jlr(this.CurrentCharacterPositionWithOffset),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          e,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterWorldPosition,
          this.TempColor,
        ),
        this.Jlr(this.CurrentCharacterForward),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          e,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterWorldForwardDirection,
          this.TempColor,
        ),
        ModelManager_1.ModelManager.GameModeModel.InstanceType ===
          Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance &&
          (this.SceneTime =
            ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute),
        this.WriteTimeToCollection &&
          ((i = Math.floor(this.SceneTime / this.Xlr)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            e,
            this.GlobalShaderParameters,
            RenderConfig_1.RenderConfig.GlobalTimeHour,
            i,
          ),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            e,
            this.GlobalShaderParameters,
            RenderConfig_1.RenderConfig.GlobalTimeMinutes,
            this.SceneTime - i * this.Xlr,
          )),
        (r =
          Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
            44,
          )) &&
          !(s = r.GravityDirect).Equals(this.CachedGravityDirect) &&
          (this.Jlr(s),
          UE.KismetMaterialLibrary.SetVectorParameterValue(
            e,
            this.GlobalShaderParameters,
            RenderConfig_1.RenderConfig.GravityDirection,
            this.TempColor,
          ),
          this.CachedGravityDirect.DeepCopy(s)),
        this.SetAudioParameters(t)),
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Stop());
  }
  LoadAssets() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      "/Game/Aki/Render/Data/DA_GlobalRenderDataReference.DA_GlobalRenderDataReference",
      UE.PDA_GlobalRenderDataReference_C,
      (t) => {
        ObjectUtils_1.ObjectUtils.IsValid(t)
          ? ((this.Valid = !0),
            (this.GlobalShaderParameters = t.GlobalShaderParameters),
            ObjectUtils_1.ObjectUtils.IsValid(this.GlobalShaderParameters) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 32, "缺失全局材质参数文件")),
            (this.SceneInteractionMaterialParameterCollection =
              t.SceneInteractionShaderParameters),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.SceneInteractionMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 32, "缺失交互物着色器参数文件")),
            (this.GlobalLensFlareConfig = t.GlobalLensFlareConfig),
            ObjectUtils_1.ObjectUtils.IsValid(this.GlobalLensFlareConfig) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 32, "缺失LensFlare配置文件")),
            (this.UiShowBrightnessMaterialParameterCollection =
              t.MPC_ShowBrightness),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.UiShowBrightnessMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 32, "缺失UI_ShowBrightness配置文件")),
            (this.UiShowColorSettingMaterialParameterCollection =
              t.MPC_ShowColorSetting),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.UiShowColorSettingMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Render",
                  74,
                  "缺失UI_ShowColorSetting配置文件",
                )),
            (this.GlobalDecalShadowConfig = t.DefaultDecalShadow),
            ObjectUtils_1.ObjectUtils.IsValid(this.GlobalDecalShadowConfig) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 25, "缺失DecalShadow配置文件")),
            (this.EyesParameterMaterialParameterCollection = t.EyesParameters),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.EyesParameterMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 25, "缺失EyesParameters配置文件")),
            (this.GroundFogMaskMaterialParameterCollection =
              t.MPC_GroundFogMask),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.GroundFogMaskMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 39, "缺失GroundFogMask配置文件")),
            (this.EmptyMaterial = t.EmptyMaterial),
            ObjectUtils_1.ObjectUtils.IsValid(this.EmptyMaterial) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 25, "缺失EmptyMaterial")))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Render", 25, "RenderDataManager缺失全局配置文件");
      },
    );
  }
  Destroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.xDa),
      (0, puerts_1.releaseManualReleaseDelegate)(this.H5l);
  }
  SetAudioParameters(t) {
    var e, i;
    (this.Ylr -= t),
      0 < this.Ylr ||
        ((this.Ylr = this.$lr),
        (t = this.GetRainIntensity()),
        (e = this.GetSnowIntensity()),
        (i = this.GetWindIntensity()),
        this.ySl !== t &&
          (AudioSystem_1.AudioSystem.SetRtpcValue(
            AudioDefine_1.RTPCRAININTENSITY,
            t / 5,
          ),
          (this.ySl = t)),
        this.ESl !== e &&
          (AudioSystem_1.AudioSystem.SetRtpcValue(
            AudioDefine_1.RTPCSNOWINTENSITY,
            e / 5,
          ),
          (this.ESl = e)),
        this.ISl !== i &&
          (AudioSystem_1.AudioSystem.SetRtpcValue(
            AudioDefine_1.RTPCWINDINTENSITY,
            i / 10,
          ),
          (this.ISl = i)));
  }
  Jlr(t) {
    (this.TempColor.R = t.X),
      (this.TempColor.G = t.Y),
      (this.TempColor.B = t.Z);
  }
  MPn() {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetClusteredStuffVisible(
      GlobalData_1.GlobalData.World,
      !this.IsInUiScene,
    );
  }
}
(exports.RenderDataManager = RenderDataManager).Instance = void 0;
//# sourceMappingURL=RenderDataManager.js.map
