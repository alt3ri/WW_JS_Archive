"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuNoticeFunction = exports.MenuFunction = void 0);
const UE = require("ue");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const GlobalData_1 = require("../../GlobalData");
const KuroPushController_1 = require("../../KuroPushSdk/KuroPushController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const MenuController_1 = require("./MenuController");
const MenuDefine_1 = require("./MenuDefine");
const MenuTool_1 = require("./MenuTool");
const FUNCTIONID_2_VOUMETAG = new Map([
  [1, new UE.FName("Master_Audio_Bus_Volume")],
  [2, new UE.FName("Vocal_Audio_Bus_Volume")],
  [3, new UE.FName("Music_Audio_Bus_Volume")],
  [4, new UE.FName("SFX_Audio_Bus_Volume")],
  [69, new UE.FName("AMB_Audio_Bus_Volume")],
  [70, new UE.FName("UI_Audio_Bus_Volume")],
]);
class MenuFunction {
  static SetImageQuality(e) {
    let n;
    const t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    let a = MenuController_1.MenuController.GetTargetMenuData(e);
    a
      ? ((n = MenuController_1.MenuController.GetTargetConfig(e)),
        (a = a.MenuDataOptionsValueList[n]),
        (n = t.GetQualityInfoByType(a)),
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetImageQuality"),
        t.ApplyQualityInfoToCurrentQualityInfo(n),
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
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    var e = n.GetFrameByList(e);
    t.SetFrameRate(e),
      t.ApplyFrameRate(),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetHighFps"),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetShadowQuality(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetShadowQuality(e),
      t.ApplyShadowQuality(),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetShadowQuality"),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetNiagaraQuality(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetNiagaraQuality(e),
      t.ApplyNiagaraQuality(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetImageDetail(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetImageDetail(e),
      t.ApplyImageDetail(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetAntiAliasing(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetAntiAliasing(e),
      t.ApplyAntiAliasing(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetSceneAo(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetSceneAo(e), t.ApplySceneAo(), n.SaveCurrentQualityInfoToQualityData();
  }
  static SetVolumeFog(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetVolumeFog(e),
      t.ApplyVolumeFog(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetVolumeLight(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetVolumeLight(e),
      t.ApplyVolumeLight(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMotionBlur(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMotionBlur(e),
      t.ApplyMotionBlur(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetPcVsync(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetPcVsync(e), t.ApplyPcVsync(), n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMobileResolution(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMobileResolution(e),
      t.ApplyMobileResolution(),
      n.SaveCurrentQualityInfoToQualityData(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
  }
  static SetSuperResolution(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetSuperResolution(e),
      t.ApplySuperResolution(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetTextLanguage(e) {
    let n;
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    var e = MenuTool_1.MenuTool.GetLanguageCodeById(e);
    e &&
      ((n = LanguageSystem_1.LanguageSystem.PackageLanguage),
      (LanguageSystem_1.LanguageSystem.PackageLanguage = e),
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
        16,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TextLanguageChange,
        n,
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
  static SetDisplayMode(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    var e = n.GetFullScreenModeByList(e);
    t.SetPcFullScreenMode(e),
      t.ApplyFullscreenMode(),
      e === 2 &&
        (MenuController_1.MenuController.ApplyTargetConfig(6, 2),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChangeConfigValue,
          MenuDefine_1.EImageConfig.RESOLUTION,
          2,
        )),
      n.SaveCurrentQualityInfoToQualityData(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDisplayMode);
  }
  static SetResolution(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    var e = n.GetResolutionByList(e);
    t.SetResolution(e),
      t.ApplyScreenResolution(),
      n.SaveCurrentQualityInfoToQualityData(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
  }
  static SetBrightness(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetBrightness(e),
      t.ApplyBrightness(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetNpcDensity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetNpcDensity(e),
      t.ApplyNpcDensity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetNvidiaSuperSamplingEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetNvidiaSuperSamplingEnable(e),
      t.ApplyNvidiaSuperSamplingEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetNvidiaSuperSamplingFrameGenerate(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetNvidiaSuperSamplingFrameGenerate(e),
      t.ApplyNvidiaSuperSamplingFrameGenerate(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetNvidiaSuperSamplingMode(e) {
    let n;
    const t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    let a = MenuController_1.MenuController.GetTargetMenuData(e);
    a
      ? ((n = MenuController_1.MenuController.GetTargetConfig(e)),
        (a = a.MenuDataOptionsValueList[n]),
        t.GetCurrentQualityInfo().SetNvidiaSuperSamplingMode(a),
        t.SaveCurrentQualityInfoToQualityData())
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
  static SetNvidiaSuperSamplingSharpness(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetNvidiaSuperSamplingSharpness(e),
      t.ApplyNvidiaSuperSamplingSharpness(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetNvidiaReflex(e) {
    let n;
    const t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    let a = MenuController_1.MenuController.GetTargetMenuData(e);
    a
      ? ((n = MenuController_1.MenuController.GetTargetConfig(e)),
        (a = a.MenuDataOptionsValueList[n]),
        (n = t.GetCurrentQualityInfo()).SetNvidiaReflex(a),
        n.ApplyNvidiaReflex(),
        t.SaveCurrentQualityInfoToQualityData())
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Menu",
          8,
          "[SetNvidiaReflex]对应硬件可能不支持或不属于当前平台",
          ["functionId", e],
        );
  }
  static SetFsrEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetFsrEnable(e),
      t.ApplyFsrEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetXessEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetXessEnable(e),
      t.ApplyXessEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetXessQuality(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetXessQuality(e),
      t.ApplyXessQuality(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMetalFxEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMetalFxEnable(e),
      t.ApplyMetalFxEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetIrxEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetIrxEnable(e),
      t.ApplyIrxEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetBloomEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetBloomEnable(e),
      t.ApplyBloomEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetAudioVolume(e) {
    const n = MenuController_1.MenuController.GetTargetConfig(e);
    UE.AkGameplayStatics.SetRTPCValue(
      void 0,
      n,
      0,
      void 0,
      FUNCTIONID_2_VOUMETAG.get(e),
    );
  }
  static SetHorizontalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetHorizontalViewSensitivity(e),
      t.ApplyHorizontalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetVerticalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetVerticalViewSensitivity(e),
      t.ApplyVerticalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetAimHorizontalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetAimHorizontalViewSensitivity(e),
      t.ApplyAimHorizontalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetAimVerticalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetAimVerticalViewSensitivity(e),
      t.ApplyAimVerticalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetCameraShakeStrength(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetCameraShakeStrength(e),
      t.ApplyCameraShakeStrength(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMobileHorizontalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMobileHorizontalViewSensitivity(e),
      t.ApplyMobileHorizontalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMobileVerticalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMobileVerticalViewSensitivity(e),
      t.ApplyMobileVerticalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMobileAimHorizontalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMobileAimHorizontalViewSensitivity(e),
      t.ApplyMobileAimHorizontalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMobileAimVerticalViewSensitivity(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMobileAimVerticalViewSensitivity(e),
      t.ApplyMobileAimVerticalViewSensitivity(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetMobileCameraShakeStrength(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetMobileCameraShakeStrength(e),
      t.ApplyMobileCameraShakeStrength(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetCommonSpringArmLength(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetCommonSpringArmLength(e),
      t.ApplyCommonSprintArmLength(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetFightSpringArmLength(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetFightSpringArmLength(e),
      t.ApplyFightSpringArmLength(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetResetFocusEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetResetFocusEnable(e),
      t.ApplyResetFocusEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetIsSidestepCameraEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetIsSidestepCameraEnable(e),
      t.ApplyIsSidestepCameraEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetIsSoftLockCameraEnable(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetIsSoftLockCameraEnable(e),
      t.ApplyIsSoftLockCameraEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetJoystickShakeStrength(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetJoystickShakeStrength(e),
      t.ApplyJoystickShake(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetJoystickShakeType(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetJoystickShakeType(e),
      t.ApplyJoystickShake(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetWalkOrRunRate(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const t = n.GetCurrentQualityInfo();
    t.SetWalkOrRunRate(e),
      t.ApplyWalkOrRunRate(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetJoystickMode(e) {
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    const t = n.GetCurrentQualityInfo();
    t.SetJoystickMode(e),
      t.ApplyJoystickMode(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetSkillButtonMode(e) {
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    const t = n.GetCurrentQualityInfo();
    t.SetAutoSwitchSkillButtonMode(e),
      t.ApplyAutoSwitchSkillButtonMode(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetPushEnableState(e) {
    MenuController_1.MenuController.GetTargetConfig(e) === 0
      ? KuroPushController_1.KuroPushController.TurnOffPush()
      : KuroPushController_1.KuroPushController.TurnOnPush();
  }
  static SetAimAssistEnable(e) {
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    const t = n.GetCurrentQualityInfo();
    t.SetAimAssistEnable(e),
      t.ApplyAimAssistEnable(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetHorizontalViewRevert(e) {
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    const t = n.GetCurrentQualityInfo();
    t.SetHorizontalViewRevert(e),
      t.ApplyHorizontalViewRevert(),
      n.SaveCurrentQualityInfoToQualityData();
  }
  static SetVerticalViewRevert(e) {
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    const t = n.GetCurrentQualityInfo();
    t.SetVerticalViewRevert(e),
      t.ApplyVerticalViewRevert(),
      n.SaveCurrentQualityInfoToQualityData();
  }
}
exports.MenuFunction = MenuFunction;
class MenuNoticeFunction {
  static ImageQuality(e) {
    const n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    var t = MenuController_1.MenuController.GetTargetMenuData(e);
    var e = MenuController_1.MenuController.GetTargetConfig(e);
    var t = t.MenuDataOptionsValueList[e];
    const a = n.GetQualityInfoByType(t);
    for (const l in MenuDefine_1.EImageConfig) {
      const i = Number(l);
      if (!isNaN(i))
        switch (i) {
          case MenuDefine_1.EImageConfig.HIGHESTFPS:
            var r = n.GetFrameIndexByList(a.GetFrameRate());
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
              a.ShadowQuality,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.SHADOWQUALITY,
                a.ShadowQuality,
              );
            break;
          case MenuDefine_1.EImageConfig.NIAGARAQUALITY:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NIAGARAQUALITY,
              a.NiagaraQuality,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NIAGARAQUALITY,
                a.NiagaraQuality,
              );
            break;
          case MenuDefine_1.EImageConfig.IMAGEDETAIL:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.IMAGEDETAIL,
              a.ImageDetail,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.IMAGEDETAIL,
                a.ImageDetail,
              );
            break;
          case MenuDefine_1.EImageConfig.ANTIALISING:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.ANTIALISING,
              a.AntiAliasing,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.ANTIALISING,
                a.AntiAliasing,
              );
            break;
          case MenuDefine_1.EImageConfig.SCENEAO:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.SCENEAO,
              a.SceneAo,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.SCENEAO,
                a.SceneAo,
              );
            break;
          case MenuDefine_1.EImageConfig.VOLUMEFOG:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.VOLUMEFOG,
              a.VolumeFog,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.VOLUMEFOG,
                a.VolumeFog,
              );
            break;
          case MenuDefine_1.EImageConfig.VOLUMELIGHT:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.VOLUMELIGHT,
              a.VolumeLight,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.VOLUMELIGHT,
                a.VolumeLight,
              );
            break;
          case MenuDefine_1.EImageConfig.MOTIONBLUR:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.MOTIONBLUR,
              a.MotionBlur,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.MOTIONBLUR,
                a.MotionBlur,
              );
            break;
          case MenuDefine_1.EImageConfig.PCVSYNC:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.PCVSYNC,
              a.PcVsync,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.PCVSYNC,
                a.PcVsync,
              );
            break;
          case MenuDefine_1.EImageConfig.MOBILERESOLUTION:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.MOBILERESOLUTION,
              a.MobileResolution,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.MOBILERESOLUTION,
                a.MobileResolution,
              );
            break;
          case MenuDefine_1.EImageConfig.SUPERRESOLUTION:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.SUPERRESOLUTION,
              a.SuperResolution,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.SUPERRESOLUTION,
                a.SuperResolution,
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
              a.NvidiaSuperSamplingEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSS,
                a.NvidiaSuperSamplingEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSSFG:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSSFG,
              a.NvidiaSuperSamplingFrameGenerate,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSSFG,
                a.NvidiaSuperSamplingFrameGenerate,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSSMODE:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSSMODE,
              a.NvidiaSuperSamplingMode,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSSMODE,
                a.NvidiaSuperSamplingMode,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS,
              a.NvidiaSuperSamplingSharpness,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS,
                a.NvidiaSuperSamplingSharpness,
              );
            break;
          case MenuDefine_1.EImageConfig.NVIDIAREFLEX:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.NVIDIAREFLEX,
              a.NvidiaReflex,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.NVIDIAREFLEX,
                a.NvidiaReflex,
              );
            break;
          case MenuDefine_1.EImageConfig.FSR:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.FSR,
              a.FsrEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.FSR,
                a.FsrEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.XESS:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.XESS,
              a.XessEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.XESS,
                a.XessEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.XESS_QUALITY:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.XESS_QUALITY,
              a.XessQuality,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.XESS_QUALITY,
                a.XessQuality,
              );
            break;
          case MenuDefine_1.EImageConfig.METALFX:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.METALFX,
              a.MetalFxEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.METALFX,
                a.MetalFxEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.IRX:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.IRX,
              a.IrxEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.IRX,
                a.IrxEnable,
              );
            break;
          case MenuDefine_1.EImageConfig.BLOOM:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeConfigValue,
              MenuDefine_1.EImageConfig.BLOOM,
              a.BloomEnable,
            ),
              MenuController_1.MenuController.ApplyTargetConfig(
                MenuDefine_1.EImageConfig.BLOOM,
                a.BloomEnable,
              );
        }
    }
    MenuController_1.MenuController.SaveLocalConfig();
  }
}
exports.MenuNoticeFunction = MenuNoticeFunction;
// # sourceMappingURL=MenuFunction.js.map
