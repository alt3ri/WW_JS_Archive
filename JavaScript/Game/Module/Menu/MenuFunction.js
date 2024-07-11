"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuNoticeFunction = exports.MenuFunction = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  GlobalData_1 = require("../../GlobalData"),
  KuroPushController_1 = require("../../KuroPushSdk/KuroPushController"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  MenuController_1 = require("./MenuController"),
  MenuDefine_1 = require("./MenuDefine"),
  MenuTool_1 = require("./MenuTool"),
  FUNCTIONID_2_VOUMETAG = new Map([
    [1, new UE.FName("Master_Audio_Bus_Volume")],
    [2, new UE.FName("Vocal_Audio_Bus_Volume")],
    [3, new UE.FName("Music_Audio_Bus_Volume")],
    [4, new UE.FName("SFX_Audio_Bus_Volume")],
    [69, new UE.FName("AMB_Audio_Bus_Volume")],
    [70, new UE.FName("UI_Audio_Bus_Volume")],
  ]);
class MenuFunction {
  static SetImageQuality(e) {
    var t,
      a = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      n = MenuController_1.MenuController.GetTargetMenuData(e);
    n
      ? ((t = MenuController_1.MenuController.GetTargetConfig(e)),
        (n = n.MenuDataOptionsValueList[t]),
        (t = a.GetQualityInfoByType(n)),
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetImageQuality"),
        a.ApplyQualityInfoToCurrentQualityInfo(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetImageQuality,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Menu",
          8,
          "[SetImageQuality]对应硬件可能不支持或不属于当前平台",
          ["functionId", e],
        );
  }
  static SetHighFps(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      a = t.GetCurrentQualityInfo(),
      t = t.GetFrameByList(e);
    a.SetFrameRate(t),
      a.ApplyFrameRate(),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetHighFps"),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate);
  }
  static SetShadowQuality(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetShadowQuality(t),
      a.ApplyShadowQuality(),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetShadowQuality"),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality);
  }
  static SetNiagaraQuality(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetNiagaraQuality(t),
      a.ApplyNiagaraQuality(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality);
  }
  static SetImageDetail(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetImageDetail(t),
      a.ApplyImageDetail(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail);
  }
  static SetAntiAliasing(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetAntiAliasing(t),
      a.ApplyAntiAliasing(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing);
  }
  static SetSceneAo(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetSceneAo(t),
      a.ApplySceneAo(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo);
  }
  static SetVolumeFog(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetVolumeFog(t),
      a.ApplyVolumeFog(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog);
  }
  static SetVolumeLight(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetVolumeLight(t),
      a.ApplyVolumeLight(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight);
  }
  static SetMotionBlur(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMotionBlur(t),
      a.ApplyMotionBlur(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur);
  }
  static SetPcVsync(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetPcVsync(t),
      a.ApplyPcVsync(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync);
  }
  static SetMobileResolution(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMobileResolution(t),
      a.ApplyMobileResolution(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
  }
  static SetSuperResolution(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetSuperResolution(t),
      a.ApplySuperResolution(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution);
  }
  static SetTextLanguage(e) {
    var t,
      e = MenuController_1.MenuController.GetTargetConfig(e),
      e = MenuTool_1.MenuTool.GetLanguageCodeById(e);
    e &&
      ((t = LanguageSystem_1.LanguageSystem.PackageLanguage),
      (LanguageSystem_1.LanguageSystem.PackageLanguage = e),
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
        16,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TextLanguageChange,
        t,
        e,
      ));
  }
  static SetLanguageAudio(e) {
    (e = MenuController_1.MenuController.GetTargetConfig(e)),
      (e = MenuTool_1.MenuTool.GetAudioCodeById(e));
    e &&
      LanguageSystem_1.LanguageSystem.SetPackageAudio(
        e,
        GlobalData_1.GlobalData.World,
      );
  }
  static SetDisplayMode(e, t) {
    var a = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      n = a.GetCurrentQualityInfo(),
      a = a.GetFullScreenModeByList(t);
    n.SetPcFullScreenMode(a),
      n.ApplyFullscreenMode(),
      n.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDisplayMode);
  }
  static SetResolution(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      a = t.GetCurrentQualityInfo(),
      t = t.GetResolutionByList(e);
    a.SetResolution(t),
      a.ApplyScreenResolution(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionWidth,
      ),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionHeight,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
  }
  static SetBrightness(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetBrightness(t),
      a.ApplyBrightness(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness);
  }
  static SetNpcDensity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetNpcDensity(t),
      a.ApplyNpcDensity(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity);
  }
  static SetNvidiaSuperSamplingEnable(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetNvidiaSuperSamplingEnable(t),
      a.ApplyNvidiaSuperSamplingEnable(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
      );
  }
  static SetNvidiaSuperSamplingFrameGenerate(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetNvidiaSuperSamplingFrameGenerate(t),
      a.ApplyNvidiaSuperSamplingFrameGenerate(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingFrameGenerate,
      );
  }
  static SetNvidiaSuperSamplingMode(e) {
    var t,
      a = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      n = MenuController_1.MenuController.GetTargetMenuData(e);
    n
      ? ((t = MenuController_1.MenuController.GetTargetConfig(e)),
        (n = n.MenuDataOptionsValueList[t]),
        (t = a.GetCurrentQualityInfo()).SetNvidiaSuperSamplingMode(n),
        t.SaveByKey(
          LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Menu",
          8,
          "[SetNvidiaSuperSamplingMode]对应硬件可能不支持或不属于当前平台",
          ["functionId", e],
        );
  }
  static ApplyNvidiaSuperSamplingMode() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
      .GetCurrentQualityInfo()
      .ApplyNvidiaSuperSamplingMode();
  }
  static SetNvidiaSuperSamplingSharpness(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetNvidiaSuperSamplingSharpness(t),
      a.ApplyNvidiaSuperSamplingSharpness(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingSharpness,
      );
  }
  static SetNvidiaReflex(e) {
    var t,
      a = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      n = MenuController_1.MenuController.GetTargetMenuData(e);
    n
      ? ((t = MenuController_1.MenuController.GetTargetConfig(e)),
        (n = n.MenuDataOptionsValueList[t]),
        (t = a.GetCurrentQualityInfo()).SetNvidiaReflex(n),
        t.ApplyNvidiaReflex(),
        t.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Menu",
          8,
          "[SetNvidiaReflex]对应硬件可能不支持或不属于当前平台",
          ["functionId", e],
        );
  }
  static SetFsrEnable(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetFsrEnable(t),
      a.ApplyFsrEnable(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable);
  }
  static SetXessEnable(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      t = t.GetCurrentQualityInfo();
    t.SetXessEnable(e),
      t.ApplyXessEnable(),
      t.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable);
  }
  static SetXessQuality(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      t = t.GetCurrentQualityInfo();
    t.SetXessQuality(e),
      t.ApplyXessQuality(),
      t.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality);
  }
  static SetMetalFxEnable(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      t = t.GetCurrentQualityInfo();
    t.SetMetalFxEnable(e),
      t.ApplyMetalFxEnable(),
      t.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable);
  }
  static SetIrxEnable(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      t = t.GetCurrentQualityInfo();
    t.SetIrxEnable(e),
      t.ApplyIrxEnable(),
      t.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable);
  }
  static SetBloomEnable(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      t = t.GetCurrentQualityInfo();
    t.SetBloomEnable(e),
      t.ApplyBloomEnable(),
      t.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable);
  }
  static SetAudioVolume(e) {
    var t = MenuController_1.MenuController.GetTargetConfig(e);
    UE.AkGameplayStatics.SetRTPCValue(
      void 0,
      t,
      0,
      void 0,
      FUNCTIONID_2_VOUMETAG.get(e),
    );
  }
  static SetHorizontalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetHorizontalViewSensitivity(t),
      a.ApplyHorizontalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
      );
  }
  static SetVerticalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetVerticalViewSensitivity(t),
      a.ApplyVerticalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
      );
  }
  static SetAimHorizontalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetAimHorizontalViewSensitivity(t),
      a.ApplyAimHorizontalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .AimHorizontalViewSensitivity,
      );
  }
  static SetAimVerticalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetAimVerticalViewSensitivity(t),
      a.ApplyAimVerticalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
      );
  }
  static SetCameraShakeStrength(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetCameraShakeStrength(t),
      a.ApplyCameraShakeStrength(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
      );
  }
  static SetMobileHorizontalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMobileHorizontalViewSensitivity(t),
      a.ApplyMobileHorizontalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileHorizontalViewSensitivity,
      );
  }
  static SetMobileVerticalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMobileVerticalViewSensitivity(t),
      a.ApplyMobileVerticalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileVerticalViewSensitivity,
      );
  }
  static SetMobileAimHorizontalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMobileAimHorizontalViewSensitivity(t),
      a.ApplyMobileAimHorizontalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimHorizontalViewSensitivity,
      );
  }
  static SetMobileAimVerticalViewSensitivity(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMobileAimVerticalViewSensitivity(t),
      a.ApplyMobileAimVerticalViewSensitivity(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimVerticalViewSensitivity,
      );
  }
  static SetMobileCameraShakeStrength(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetMobileCameraShakeStrength(t),
      a.ApplyMobileCameraShakeStrength(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
      );
  }
  static SetCommonSpringArmLength(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetCommonSpringArmLength(t),
      a.ApplyCommonSprintArmLength(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
      );
  }
  static SetFightSpringArmLength(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetFightSpringArmLength(t),
      a.ApplyFightSpringArmLength(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
      );
  }
  static SetResetFocusEnable(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetResetFocusEnable(t),
      a.ApplyResetFocusEnable(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
      );
  }
  static SetIsSidestepCameraEnable(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetIsSidestepCameraEnable(t),
      a.ApplyIsSidestepCameraEnable(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
      );
  }
  static SetIsSoftLockCameraEnable(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetIsSoftLockCameraEnable(t),
      a.ApplyIsSoftLockCameraEnable(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
      );
  }
  static SetJoystickShakeStrength(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetJoystickShakeStrength(t),
      a.ApplyJoystickShake(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
      );
  }
  static SetJoystickShakeType(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetJoystickShakeType(t),
      a.ApplyJoystickShake(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
      );
  }
  static SetWalkOrRunRate(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetWalkOrRunRate(t),
      a.ApplyWalkOrRunRate(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate);
  }
  static SetJoystickMode(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetJoystickMode(t),
      a.ApplyJoystickMode(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode);
  }
  static SetSkillButtonMode(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetAutoSwitchSkillButtonMode(t),
      a.ApplyAutoSwitchSkillButtonMode(),
      a.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
      );
  }
  static SetPushEnableState(e) {
    0 === MenuController_1.MenuController.GetTargetConfig(e)
      ? KuroPushController_1.KuroPushController.TurnOffPush()
      : KuroPushController_1.KuroPushController.TurnOnPush();
  }
  static SetAimAssistEnable(e, t) {
    var a =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    a.SetAimAssistEnable(t),
      a.ApplyAimAssistEnable(),
      a.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable);
  }
  static SetKeyboardLockEnemyMode(e) {
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    t.SetKeyboardLockEnemyMode(e),
      t.ApplyKeyboardLockEnemyMode(),
      t.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
      );
  }
  static SetHorizontalViewRevert(e) {
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    t.SetHorizontalViewRevert(e),
      t.ApplyHorizontalViewRevert(),
      t.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
      );
  }
  static SetVerticalViewRevert(e) {
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    t.SetVerticalViewRevert(e),
      t.ApplyVerticalViewRevert(),
      t.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
      );
  }
  static SetSkillLockEnemyMode(e) {
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    t.SetSkillLockEnemyMode(e),
      t.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
      );
  }
  static SetGamepadLockEnemyMode(e) {
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    t.SetGamepadLockEnemyMode(e),
      t.ApplyGamepadLockEnemyMode(),
      t.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
      );
  }
  static SetEnemyHitDisplayMode(e) {
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    t.SetEnemyHitDisplayMode(e),
      t.ApplyEnemyHitDisplayMode(),
      t.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
      );
  }
  static SetPlayStationOnlyMode(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PlayStationOnly,
      e,
    );
  }
}
exports.MenuFunction = MenuFunction;
class MenuNoticeFunction {
  static ImageQuality(e) {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      a = MenuController_1.MenuController.GetTargetMenuData(e),
      e = MenuController_1.MenuController.GetTargetConfig(e),
      a = a.MenuDataOptionsValueList[e],
      n = t.GetQualityInfoByType(a);
    for (const o in MenuDefine_1.EImageConfig) {
      var i = Number(o);
      if (!isNaN(i))
        switch (i) {
          case MenuDefine_1.EImageConfig.HIGHESTFPS:
            var r = t.GetFrameIndexByList(n.GetFrameRate());
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.HIGHESTFPS,
              r,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.HIGHESTFPS,
                r,
              );
            break;
          case MenuDefine_1.EImageConfig.SHADOWQUALITY:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.SHADOWQUALITY,
              n.ShadowQuality,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.SHADOWQUALITY,
                n.ShadowQuality,
              );
            break;
          case MenuDefine_1.EImageConfig.NIAGARAQUALITY:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NIAGARAQUALITY,
              n.NiagaraQuality,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NIAGARAQUALITY,
                n.NiagaraQuality,
              );
            break;
          case MenuDefine_1.EImageConfig.IMAGEDETAIL:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.IMAGEDETAIL,
              n.ImageDetail,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.IMAGEDETAIL,
                n.ImageDetail,
              );
            break;
          case MenuDefine_1.EImageConfig.ANTIALISING:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.ANTIALISING,
              n.AntiAliasing,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.ANTIALISING,
                n.AntiAliasing,
              );
            break;
          case MenuDefine_1.EImageConfig.SCENEAO:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.SCENEAO,
              n.SceneAo,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.SCENEAO,
                n.SceneAo,
              );
            break;
          case MenuDefine_1.EImageConfig.VOLUMEFOG:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.VOLUMEFOG,
              n.VolumeFog,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.VOLUMEFOG,
                n.VolumeFog,
              );
            break;
          case MenuDefine_1.EImageConfig.VOLUMELIGHT:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.VOLUMELIGHT,
              n.VolumeLight,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.VOLUMELIGHT,
                n.VolumeLight,
              );
            break;
          case MenuDefine_1.EImageConfig.MOTIONBLUR:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.MOTIONBLUR,
              n.MotionBlur,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.MOTIONBLUR,
                n.MotionBlur,
              );
            break;
          case MenuDefine_1.EImageConfig.PCVSYNC:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.PCVSYNC,
              n.PcVsync,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.PCVSYNC,
                n.PcVsync,
              );
            break;
          case MenuDefine_1.EImageConfig.MOBILERESOLUTION:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.MOBILERESOLUTION,
              n.MobileResolution,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.MOBILERESOLUTION,
                n.MobileResolution,
              );
            break;
          case MenuDefine_1.EImageConfig.SUPERRESOLUTION:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.SUPERRESOLUTION,
              n.SuperResolution,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.SUPERRESOLUTION,
                n.SuperResolution,
              );
            break;
          case MenuDefine_1.EImageConfig.RESOLUTION:
            r = MenuController_1.MenuController.GetTargetConfig(
              MenuDefine_1.EImageConfig.RESOLUTION,
            );
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.RESOLUTION,
              r,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.RESOLUTION,
                r,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSS:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSS,
              n.NvidiaSuperSamplingEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSS,
                n.NvidiaSuperSamplingEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSSFG:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSSFG,
              n.NvidiaSuperSamplingFrameGenerate,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSSFG,
                n.NvidiaSuperSamplingFrameGenerate,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSSMODE:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSSMODE,
              n.NvidiaSuperSamplingMode,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSSMODE,
                n.NvidiaSuperSamplingMode,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS,
              n.NvidiaSuperSamplingSharpness,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS,
                n.NvidiaSuperSamplingSharpness,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIAREFLEX:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIAREFLEX,
              n.NvidiaReflex,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIAREFLEX,
                n.NvidiaReflex,
              );
            break;
          case MenuDefine_1.EImageConfig.FSR:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.FSR,
              n.FsrEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.FSR,
                n.FsrEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.XESS:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.XESS,
              n.XessEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.XESS,
                n.XessEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.XESS_QUALITY:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.XESS_QUALITY,
              n.XessQuality,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.XESS_QUALITY,
                n.XessQuality,
              );
            break;
          case MenuDefine_1.EImageConfig.METALFX:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.METALFX,
              n.MetalFxEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.METALFX,
                n.MetalFxEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.IRX:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.IRX,
              n.IrxEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.IRX,
                n.IrxEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.BLOOM:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.BLOOM,
              n.BloomEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.BLOOM,
                n.BloomEnable,
              );
        }
    }
  }
}
exports.MenuNoticeFunction = MenuNoticeFunction;
//# sourceMappingURL=MenuFunction.js.map
