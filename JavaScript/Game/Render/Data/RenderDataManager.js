"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderDataManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  AudioDefine_1 = require("../../../Core/Audio/AudioDefine"),
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
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RenderConfig_1 = require("../Config/RenderConfig"),
  RenderModuleConfig_1 = require("../Manager/RenderModuleConfig");
class RenderDataManager {
  constructor() {
    (this.Valid = !1),
      (this.GlobalShaderParameters = void 0),
      (this.SceneInteractionMaterialParameterCollection = void 0),
      (this.UiShowBrightnessMaterialParameterCollection = void 0),
      (this.EyesParameterMaterialParameterCollection = void 0),
      (this.GlobalLensFlareConfig = void 0),
      (this.GlobalDecalShadowConfig = void 0),
      (this.PreviousCharacterPosition = void 0),
      (this.CurrentCharacterPosition = void 0),
      (this.CurrentCharacterForward = void 0),
      (this.CurrentCameraPosition = void 0),
      (this.CurrentCameraForward = void 0),
      (this.CurrentPlayerMoveState = void 0),
      (this.SceneTime = -0),
      (this.TempColor = void 0),
      (this.WriteTimeToCollection = !1),
      (this.IsInUiScene = !1),
      (this.GlobalFootstepMaterial = void 0),
      (this.PlayerInGrass = !1),
      (this.PlayerInCave = !1),
      (this.PlayerVoxelStateDirty = !0),
      (this.DDa = (e) => {
        (this.GlobalFootstepMaterial = e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGlobalFootstepMaterialChange,
            e,
          );
      }),
      (this.Xlr = 60),
      (this.$lr = 1),
      (this.Ylr = 0);
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
      (this.CurrentCharacterForward = Vector_1.Vector.Create()),
      (this.CurrentCameraPosition = Vector_1.Vector.Create()),
      (this.CurrentCameraForward = Vector_1.Vector.Create()),
      (this.TempColor = new UE.LinearColor()),
      (this.WriteTimeToCollection = !0),
      UE.KuroGlobalGI.BindEventGlobalFootstepMaterialUpdate(
        (0, puerts_1.toManualReleaseDelegate)(this.DDa),
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
  SetGrassAo(e) {
    GlobalData_1.GlobalData.World &&
      this.GlobalShaderParameters &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        this.GlobalShaderParameters,
        RenderConfig_1.RenderConfig.GlobalGrassAO,
        e,
      );
  }
  GetMainLightVector(e = void 0) {
    var e = e || GlobalData_1.GlobalData.World;
    if (e && this.GlobalShaderParameters)
      return (
        (e = UE.KismetMaterialLibrary.GetVectorParameterValue(
          e,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalMainLightVector,
        )),
        Vector_1.Vector.Create(e.R, e.G, e.B)
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
  GetCurrentCharacterForward() {
    return this.CurrentCharacterForward;
  }
  GetCurrentCameraPosition() {
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
  GetEyesParameterMaterialParameterCollection() {
    return this.EyesParameterMaterialParameterCollection;
  }
  GetPlayerInGrass() {
    return this.Fza(), this.PlayerInGrass;
  }
  GetPlayerInCave() {
    return this.Fza(), this.PlayerInCave;
  }
  Fza() {
    var e;
    this.PlayerVoxelStateDirty &&
      ((e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGlobalGIActor(
        GlobalData_1.GlobalData.World,
      )),
      (this.PlayerInGrass = e?.bPlayerInGrass),
      (this.PlayerInCave = e?.bPlayerInCave),
      (this.PlayerVoxelStateDirty = !1));
  }
  GetSceneTime() {
    return this.SceneTime;
  }
  GetGlobalFootstepMaterial() {
    return this.GlobalFootstepMaterial;
  }
  SetWriteTime(e) {
    this.WriteTimeToCollection = e;
  }
  TickForce(e) {
    var t, i, r;
    this.Valid &&
      (RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Start(),
      (this.PlayerVoxelStateDirty = !0),
      (t = GlobalData_1.GlobalData.World),
      (r = Global_1.Global.CharacterCameraManager) &&
        r.IsValid() &&
        ((i = r.K2_GetActorLocation()),
        (r = r.GetActorForwardVector()),
        this.CurrentCameraPosition.FromUeVector(i),
        this.CurrentCameraForward.FromUeVector(r),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          t,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCameraPosAndRadius,
          new UE.LinearColor(i.X, i.Y, i.Z, 0),
        ),
        (r =
          Info_1.Info.IsGameRunning() &&
          (GlobalData_1.GlobalData.IsUiSceneOpen ||
            GlobalData_1.GlobalData.IsUiSceneLoading)) !== this.IsInUiScene) &&
        ((this.IsInUiScene = r), this.MPn()),
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Stop());
  }
  Tick(e) {
    var t, i, r;
    this.Valid &&
      (RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Start(),
      (e = e * TimeUtil_1.TimeUtil.Millisecond),
      (t = GlobalData_1.GlobalData.World),
      (i = Global_1.Global.PawnOrSpectator) &&
        i.IsValid() &&
        ((r = i.K2_GetActorLocation()),
        (i = i.GetActorForwardVector()),
        this.PreviousCharacterPosition.Set(
          this.CurrentCharacterPosition.X,
          this.CurrentCharacterPosition.Y,
          this.CurrentCharacterPosition.Z,
        ),
        this.CurrentCharacterPosition.FromUeVector(r),
        this.CurrentCharacterForward.FromUeVector(i),
        (r =
          Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
            161,
          )),
        (this.CurrentPlayerMoveState = r?.MoveState),
        (i =
          this.CurrentPlayerMoveState &&
          this.CurrentPlayerMoveState <
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb),
        UE.KismetMaterialLibrary.SetScalarParameterValue(
          t,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterOnGround,
          i ? 1 : 0,
        ),
        this.Jlr(this.PreviousCharacterPosition),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          t,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterPreviousWP,
          this.TempColor,
        ),
        this.Jlr(this.CurrentCharacterPosition),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          t,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterWorldPosition,
          this.TempColor,
        ),
        this.Jlr(this.CurrentCharacterForward),
        UE.KismetMaterialLibrary.SetVectorParameterValue(
          t,
          this.GlobalShaderParameters,
          RenderConfig_1.RenderConfig.GlobalCharacterWorldForwardDirection,
          this.TempColor,
        ),
        ModelManager_1.ModelManager.GameModeModel.InstanceType ===
          Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance &&
          (this.SceneTime =
            ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute),
        this.WriteTimeToCollection &&
          ((r = Math.floor(this.SceneTime / this.Xlr)),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            t,
            this.GlobalShaderParameters,
            RenderConfig_1.RenderConfig.GlobalTimeHour,
            r,
          ),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            t,
            this.GlobalShaderParameters,
            RenderConfig_1.RenderConfig.GlobalTimeMinutes,
            this.SceneTime - r * this.Xlr,
          )),
        this.SetAudioParameters(e)),
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Stop());
  }
  LoadAssets() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      "/Game/Aki/Render/Data/DA_GlobalRenderDataReference.DA_GlobalRenderDataReference",
      UE.PDA_GlobalRenderDataReference_C,
      (e) => {
        ObjectUtils_1.ObjectUtils.IsValid(e)
          ? ((this.Valid = !0),
            (this.GlobalShaderParameters = e.GlobalShaderParameters),
            ObjectUtils_1.ObjectUtils.IsValid(this.GlobalShaderParameters) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 33, "缺失全局材质参数文件")),
            (this.SceneInteractionMaterialParameterCollection =
              e.SceneInteractionShaderParameters),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.SceneInteractionMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 33, "缺失交互物着色器参数文件")),
            (this.GlobalLensFlareConfig = e.GlobalLensFlareConfig),
            ObjectUtils_1.ObjectUtils.IsValid(this.GlobalLensFlareConfig) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 33, "缺失LensFlare配置文件")),
            (this.UiShowBrightnessMaterialParameterCollection =
              e.MPC_ShowBrightness),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.UiShowBrightnessMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 33, "缺失UI_ShowBrightness配置文件")),
            (this.GlobalDecalShadowConfig = e.DefaultDecalShadow),
            ObjectUtils_1.ObjectUtils.IsValid(this.GlobalDecalShadowConfig) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 26, "缺失DecalShadow配置文件")),
            (this.EyesParameterMaterialParameterCollection = e.EyesParameters),
            ObjectUtils_1.ObjectUtils.IsValid(
              this.EyesParameterMaterialParameterCollection,
            ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Render", 26, "缺失EyesParameters配置文件")))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Render", 26, "RenderDataManager缺失全局配置文件");
      },
    );
  }
  Destroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.DDa);
  }
  SetAudioParameters(e) {
    var t;
    (this.Ylr -= e),
      0 < this.Ylr ||
        ((this.Ylr = this.$lr),
        (e = this.GetRainIntensity()),
        (t = this.GetSnowIntensity()),
        AudioController_1.AudioController.SetRTPCValue(
          e / 5,
          AudioDefine_1.RTPCRAININTENSITY,
        ),
        AudioController_1.AudioController.SetRTPCValue(
          t / 5,
          AudioDefine_1.RTPCSNOWINTENSITY,
        ),
        AudioController_1.AudioController.SetRTPCValue(
          Math.max(e, t) / 5,
          AudioDefine_1.RTPCGLOBALWET,
        ));
  }
  Jlr(e) {
    (this.TempColor.R = e.X),
      (this.TempColor.G = e.Y),
      (this.TempColor.B = e.Z);
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
