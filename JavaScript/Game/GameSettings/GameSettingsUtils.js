"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsUtils = void 0);
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  MenuTool_1 = require("../Module/Menu/MenuTool"),
  RoleGaitStatic_1 = require("../NewWorld/Character/Role/Component/Define/RoleGaitStatic"),
  PerfSightController_1 = require("../PerfSight/PerfSightController"),
  RenderConfig_1 = require("../Render/Config/RenderConfig"),
  RenderDataManager_1 = require("../Render/Data/RenderDataManager"),
  GameSettingsDefine_1 = require("./GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("./GameSettingsManager");
class GameSettingsUtils {
  static ApplyVolume(e, a) {
    return (
      UE.AkGameplayStatics.SetRTPCValue(
        void 0,
        e,
        0,
        void 0,
        FNameUtil_1.FNameUtil.GetDynamicFName(a),
      ),
      !0
    );
  }
  static ApplyImageQuality(e) {
    var a, t, r, i, n, l;
    return !(
      3 < e ||
      e < 0 ||
      ((e = e),
      !(a =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceReaderFeatureData(
          e,
        ))) ||
      !this.PreApplyImageQuality(e) ||
      ((t = Info_1.Info.IsPcOrGamepadPlatform()),
      (r =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice()),
      (i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFsrDevice()),
      (n =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()),
      (n =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(
          n,
        )),
      (l =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameIndexByList(
          a.FPS,
        )),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(11, l),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(
        54,
        a.ShadowQuality,
      ),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(55, a.FxQuality),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(56, a.ImageDetail),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(
        57,
        a.AntiAliasing,
      ),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(58, a.AO),
      this.ApplySceneLightQuality(e),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(63, a.VolumeFog),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(64, a.VolumeLight),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(65, a.MotionBlur),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(
        67,
        a.ScreenPercentage,
      ),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(132, a.Bloom),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(6, n),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(79, a.NpcDensity),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(87, i ? 1 : 0),
      t &&
        (GameSettingsManager_1.GameSettingsManager.SetApplySave(66, a.VSync),
        GameSettingsManager_1.GameSettingsManager.SetApplySave(81, r ? 1 : 0),
        GameSettingsManager_1.GameSettingsManager.SetApplySave(83, r ? 1 : 0),
        this.ApplyNvidiaSuperSamplingFrameGenerate(),
        GameSettingsManager_1.GameSettingsManager.SetApplySave(84, r ? 1 : 0),
        GameSettingsManager_1.GameSettingsManager.SetApplySave(85, r ? 1 : 0)),
      0)
    );
  }
  static PreApplyImageQuality(e) {
    if (
      0 <
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
        "r.Kuro.Movie.EnableCGMovieRendering",
      )
    )
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 12, "当前在movie 渲染模式下不应用配置"),
        !1
      );
    PerfSightController_1.PerfSightController.IsEnable &&
      (UE.PerfSightHelper.PostEvent(800, e.toString()),
      UE.PerfSightHelper.PostEvent(
        814,
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetD3D12Type().toString(),
      ),
      UE.PerfSightHelper.PostEvent(
        815,
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CPUFrequency.toString(),
      ),
      UE.PerfSightHelper.PostEvent(
        816,
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CPUCoresIncludingHyperthreads.toString(),
      ));
    var a,
      t,
      r = UE.GameUserSettings.GetGameUserSettings();
    return r
      ? ((a = Info_1.Info.IsPcOrGamepadPlatform()),
        (t = Info_1.Info.IsMobilePlatform()),
        a
          ? (r.SetGameQualitySettingLevel(e),
            GameSettingsManager_1.GameSettingsManager.Get(66)?.Apply(),
            r.ApplySettings(!0))
          : t && r.SetMobileGameQualitySettingLevel(e),
        !0)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameSettings", 65, "GetGameUserSettings失败", [
            "qualityLevel",
            e,
          ]),
        !1);
  }
  static ApplyShadowQuality(e) {
    return (
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "sg.ShadowQuality " + e,
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(808, e.toString()),
      !0
    );
  }
  static ApplyDisplayMode(e) {
    var a = [1, 2],
      e = a[MathUtils_1.MathUtils.Clamp(e, 0, a.length - 1)],
      a = UE.GameUserSettings.GetGameUserSettings();
    return a.SetFullscreenMode(e), a.ApplySettings(!0), !0;
  }
  static ApplyResolution(a) {
    var a =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
          a,
        ),
      e = UE.GameUserSettings.GetGameUserSettings();
    if (
      (e.SetScreenResolution(a),
      e.ApplySettings(!0),
      PerfSightController_1.PerfSightController.IsEnable)
    ) {
      let e = 1;
      4e3 < a.X ? (e = 4) : 3e3 < a.X ? (e = 3) : 2e3 < a.X && (e = 2),
        UE.PerfSightHelper.PostEvent(803, e.toString());
    }
    return !0;
  }
  static ApplyBrightness(e) {
    let a = 2.2;
    return (
      e < 0 && (a = MathUtils_1.MathUtils.Lerp(1.5, 2.2, e + 1)),
      0 < e && (a = MathUtils_1.MathUtils.Lerp(2.2, 3.5, e)),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.TonemapperGamma " + a,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.LUT.Regenerate 1",
      ),
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(),
        RenderConfig_1.RenderConfig.UIShowBrightness,
        a,
      ),
      !0
    );
  }
  static ApplyHighestFps(e) {
    var a =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(e);
    return (
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.ApplyFrameRate(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "GameSettings",
          8,
          "[FPSDebug]ApplyHighestFps",
          ["value", e],
          ["FPS", a],
        ),
      !0
    );
  }
  static ApplyNiagaraQuality(e) {
    var a,
      t = UE.GameUserSettings.GetGameUserSettings();
    return (
      Info_1.Info.IsPcPlatform()
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "fx.Niagara.QualityLevel " + (0 < e ? 2 : 1),
          )
        : ((a =
            3 ===
              GameSettingsDeviceRender_1.GameSettingsDeviceRender
                .GameQualitySettingLevel &&
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice()),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.DisableDistortion " + (0 !== e && a ? 0 : 1),
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "fx.Niagara.QualityLevel " + (0 < e ? 1 : 0),
          )),
      t.ApplySettings(!0),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(807, e.toString()),
      !0
    );
  }
  static ApplyImageDetail(e) {
    var a;
    return (
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(805, e.toString()),
      Info_1.Info.IsPcOrGamepadPlatform()
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.ToonOutlineDrawDistancePc " + (1 < e ? 4e3 : 2e3),
          ),
          e <= 0
            ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Streaming.ForceKuroRuntimeLODBias 1",
              )
            : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Streaming.ForceKuroRuntimeLODBias 0",
              ))
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.ToonOutlineDrawDistanceMobile 500",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "foliage.DensityType " + e,
          ),
          (a =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBetter()),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.SceneObjMobileSSR " + (1 < e && a ? 1 : 0),
          ),
          (a =
            3 ===
              GameSettingsDeviceRender_1.GameSettingsDeviceRender
                .GameQualitySettingLevel && a),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.TreeRimLight " + (a ? 1 : 0),
          ),
          Info_1.Info.IsMobilePlatform() &&
            (e < 1
              ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Streaming.ForceKuroRuntimeLODBias 1",
                )
              : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Streaming.ForceKuroRuntimeLODBias 0",
                )),
          Info_1.Info.IsPs5Platform() &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.Streaming.ForceKuroRuntimeLODBias 0",
            )),
      !0
    );
  }
  static ApplyAntiAliasing(e) {
    return (
      Info_1.Info.IsPcOrGamepadPlatform(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.DefaultFeature.AntiAliasing " + (0 === e ? 0 : 2),
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(802, e.toString()),
      !0
    );
  }
  static ApplySceneAo(e) {
    var a;
    return (
      Info_1.Info.IsPcOrGamepadPlatform()
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.AmbientOcclusionLevels " + -e,
          ),
          RenderDataManager_1.RenderDataManager.Get().SetGrassAo(e),
          PerfSightController_1.PerfSightController.IsEnable &&
            UE.PerfSightHelper.PostEvent(810, e.toString()))
        : ((a =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBetter()),
          (a =
            0 < GameSettingsManager_1.GameSettingsManager.GetCurrentValue(10) &&
            a
              ? e
              : 0),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.SSAO " + a,
          ),
          UE.KismetMaterialLibrary.SetScalarParameterValue(
            GlobalData_1.GlobalData.World,
            RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(),
            new UE.FName("EnableMobileScreenAO"),
            a,
          ),
          RenderDataManager_1.RenderDataManager.Get().SetGrassAo(a),
          PerfSightController_1.PerfSightController.IsEnable &&
            UE.PerfSightHelper.PostEvent(810, a.toString())),
      !0
    );
  }
  static ApplyNpcDensity(e) {
    let a = e;
    return (
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsLowMemoryDevice() &&
        a > GameSettingsDefine_1.NPC_DENSITY_THRESHOLD &&
        (a = GameSettingsDefine_1.NPC_DENSITY_THRESHOLD),
      ControllerHolder_1.ControllerHolder.CreatureController.RefreshDensityLevel(
        e,
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(806, a.toString()),
      !0
    );
  }
  static ApplyNvidiaSuperSamplingEnable(e) {
    var a;
    return (
      !Info_1.Info.IsPs5Platform() &&
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlessPluginLoaded() &&
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() &&
        (1 === e
          ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.NGX.DLSS.Enable 1",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAASamples 8",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAAFilterSize 1",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.SecondaryUpscale 0",
            ),
            this.ApplyNvidiaSuperSamplingFrameGenerate(),
            (a = GameSettingsManager_1.GameSettingsManager.Get(85)) &&
              this.ApplyNvidiaReflex(a.GetCurrentValue()))
          : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.NGX.DLSS.Enable 0",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAASamples 4",
            ),
            UE.StreamlineLibraryDLSSG.SetDLSSGMode(0),
            UE.StreamlineLibraryReflex.SetReflexMode(0)),
        (a = GameSettingsManager_1.GameSettingsManager.Get(66)) &&
          this.ApplyPcVsync(a.GetCurrentValue()),
        1 ===
          GameSettingsDeviceRender_1.GameSettingsDeviceRender
            .InCacheSceneColorMode &&
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.CacheSceneColor.Start",
          ),
        PerfSightController_1.PerfSightController.IsEnable) &&
        UE.PerfSightHelper.PostEvent(804, e.toString()),
      !0)
    );
  }
  static ApplyNvidiaSuperSamplingFrameGenerate() {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() &&
        UE.StreamlineLibraryDLSSG.SetDLSSGMode(0),
      !0)
    );
  }
  static ApplyPcVsync(e) {
    var a = UE.GameUserSettings.GetGameUserSettings();
    return a.SetVSyncEnabled(1 === e), a.ApplySettings(!0), !0;
  }
  static ApplyNvidiaSuperSamplingMode(e) {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() &&
        UE.DLSSLibrary.GetDLSSMode() !== e &&
        (UE.DLSSLibrary.SetDLSSMode(e),
        PerfSightController_1.PerfSightController.IsEnable) &&
        UE.PerfSightHelper.PostEvent(812, e.toString()),
      !0)
    );
  }
  static ApplyNvidiaSuperSamplingSharpness(e) {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() &&
        UE.DLSSLibrary.SetDLSSSharpness(e),
      !0)
    );
  }
  static ApplyNvidiaReflex(e) {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() &&
        UE.StreamlineLibraryReflex.SetReflexMode(e),
      !0)
    );
  }
  static ApplyFsrEnable(e) {
    return (
      !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice() &&
      (Info_1.Info.IsPcOrGamepadPlatform()
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.NGX.DLSS.Enable 0",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.TemporalAASamples 4",
          ),
          1 === e
            ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FidelityFX.FSR.PrimaryUpscale 1",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.ScreenPercentage 77",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.MipMapLODBias -0.3765",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAACurrentFrameWeight 0.09",
              ))
            : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FidelityFX.FSR.PrimaryUpscale 0",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.ScreenPercentage 100",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.MipMapLODBias 0.0",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAACurrentFrameWeight 0.25",
              )))
        : 1 === e
          ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.PrimaryUpscale 1",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.ClampTolerant 0",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.SharpenLimitDepth 10",
            ))
          : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.PrimaryUpscale 0",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.ClampTolerant 2",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.SharpenLimitDepth -1",
            )),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(813, e.toString()),
      !0)
    );
  }
  static ApplyXessEnable(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 41, "ApplyXessEnable", ["XessEnable", e]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.XeSS.Enabled " + e,
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(804, e.toString()),
      !0
    );
  }
  static ApplyXessQuality(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 41, "ApplyXessQuality", ["XessQuality", e]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.XeSS.Enabled " + e,
      ),
      !0
    );
  }
  static ApplyMetalFxEnable(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 41, "ApplyMetalFxEnable", ["MetalFxEnable", e]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.MetalFxUpscale " + e,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.TemporalAA.SharpenLimitDepth " + (1 === e ? 20 : -1),
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(818, e.toString()),
      !0
    );
  }
  static ApplyBloomEnable(e) {
    return (
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.KuroBloomEnable " + e,
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(811, e.toString()),
      !0
    );
  }
  static ApplyIrxEnable(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 41, "ApplyIrxEnable", ["IrxEnable", e]),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetIsUILimitFrameMode() ||
        (1 === e
          ? GameSettingsDeviceRender_1.GameSettingsDeviceRender.TurnOnIRX()
          : GameSettingsDeviceRender_1.GameSettingsDeviceRender.TurnOffIRX()),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(804, e.toString()),
      !0
    );
  }
  static ApplySceneLightQuality(e) {
    var a;
    return (
      !!Info_1.Info.IsMobilePlatform() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice()
        ? ((a = [1, 2, 3, 4]),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.GlobalLightQuality " + a[e],
          ))
        : ((a = [1, 2, 3, 3]),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.GlobalLightQuality " + a[e],
          )),
      !0)
    );
  }
  static ApplyVolumeFog(e) {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsEnableVolumeFog() &&
      (UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.volumetricfog " + e,
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(809, e.toString()),
      !0)
    );
  }
  static ApplyVolumeLight(e) {
    var a;
    return (
      Info_1.Info.IsPcOrGamepadPlatform() &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.lightShaftQuality " + e,
        ),
      Info_1.Info.IsMobilePlatform() &&
        ((a =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice()),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MobileLightShaft " + (a ? e : 0),
        )),
      !0
    );
  }
  static ApplyMotionBlur(e) {
    return (
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.MotionBlur.Amount " +
          e *
            (ModelManager_1.ModelManager?.CameraModel?.MotionBlurModifier ??
              0.2),
      ),
      !0
    );
  }
  static ApplyMobileResolution(e) {
    if (!Info_1.Info.IsMobilePlatform()) return !1;
    2 === Info_1.Info.PlatformType &&
      (0 === e
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.TemporalAA.SharpenLimitDepth 50",
          )
        : UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.TemporalAA.SharpenLimitDepth -1",
          ),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBetter() &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.TemporalAA.Sharpness 0.5",
        ),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBad()) &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.TemporalAA.Sharpness 0.1",
      ),
      1 ===
        GameSettingsDeviceRender_1.GameSettingsDeviceRender
          .InCacheSceneColorMode &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.CacheSceneColor.Start",
        );
    let a =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMobileResolutionByIndex(
        e,
      );
    var t = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
        "r.MobileContentScaleFactor",
      ),
      r = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
        "r.SecondaryScreenPercentage.GameViewport",
      );
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 17, "分辨率参数获取", [
          "r.MobileContentScaleFactor",
          t,
        ]),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()
        .Y < 750 &&
        r < 70 &&
        (a = Math.min(1.5 * a, 100)),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(803, e.toString()),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.ScreenPercentage " + a,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 17, "分辨率参数设置", [
          "r.ScreenPercentage",
          a,
        ]),
      !0
    );
  }
  static ApplySuperResolution(e) {
    return !1;
  }
  static ApplyHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBaseYawSensitivity(e);
  }
  static ApplyVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBasePitchSensitivity(e);
  }
  static ApplyAimHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingYawSensitivity(e);
  }
  static ApplyAimVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingPitchSensitivity(e);
  }
  static ApplyCameraShakeStrength(e) {
    let a = 0;
    switch (e) {
      case 0:
        a = ModelManager_1.ModelManager.MenuModel.LowShake;
        break;
      case 1:
        a = ModelManager_1.ModelManager.MenuModel.MiddleShake;
        break;
      case 2:
        a = ModelManager_1.ModelManager.MenuModel.HighShake;
    }
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(a);
  }
  static ApplyTextLanguage(e) {
    var a,
      e = MenuTool_1.MenuTool.GetLanguageCodeById(e);
    return (
      !!e &&
      ((a = LanguageSystem_1.LanguageSystem.PackageLanguage),
      (LanguageSystem_1.LanguageSystem.PackageLanguage = e),
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
        16,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TextLanguageChange,
        a,
        e,
      ),
      !0)
    );
  }
  static ApplyLanguageAudio(e) {
    e = MenuTool_1.MenuTool.GetAudioCodeById(e);
    return (
      !!e &&
      (LanguageSystem_1.LanguageSystem.SetPackageAudio(
        e,
        GlobalData_1.GlobalData.World,
      ),
      !0)
    );
  }
  static ApplyMobileHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBaseYawSensitivity(e);
  }
  static ApplyMobileVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraBasePitchSensitivity(e);
  }
  static ApplyMobileAimHorizontalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingYawSensitivity(e);
  }
  static ApplyMobileAimVerticalViewSensitivity(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingPitchSensitivity(e);
  }
  static ApplyMobileCameraShakeStrength(e) {
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(e);
  }
  static ApplyCommonSpringArmLength(e) {
    ModelManager_1.ModelManager.CameraModel.CameraSettingNormalAdditionArmLength =
      e;
  }
  static ApplyFightSpringArmLength(e) {
    ModelManager_1.ModelManager.CameraModel.CameraSettingFightAdditionArmLength =
      e;
  }
  static ApplyResetFocusEnable(e) {
    ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus = 1 === e;
  }
  static ApplyIsSidestepCameraEnable(e) {
    ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera = 1 === e;
  }
  static ApplyIsSoftLockCameraEnable(e) {
    ModelManager_1.ModelManager.CameraModel.SetSettingSoftLockState(1 === e);
  }
  static ApplyJoystickShakeStrength(e) {
    var a = GameSettingsManager_1.GameSettingsManager.Get(105);
    return !!a && (this.VGa(a.GetCurrentValue(), e), !0);
  }
  static ApplyJoystickShakeType(e) {
    var a = GameSettingsManager_1.GameSettingsManager.Get(104);
    return !!a && (this.VGa(e, a.GetCurrentValue()), !0);
  }
  static VGa(e, a) {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(e, a);
  }
  static ApplyWalkOrRunRate(e) {
    RoleGaitStatic_1.RoleGaitStatic.SetWalkOrRunRateForRocker(e);
  }
  static ApplyJoystickMode(e) {
    ModelManager_1.ModelManager.BattleUiModel.SetIsDynamicJoystick(1 === e);
  }
  static ApplyAutoSwitchSkillButtonMode(e) {
    ModelManager_1.ModelManager.BattleUiModel.SetIsAutoSwitchSkillButtonMode(
      0 === e,
    );
  }
  static ApplyAimAssistEnable(e) {
    ModelManager_1.ModelManager.CameraModel?.SetAimAssistEnable(1 === e);
  }
  static ApplyKeyboardLockEnemyMode(e) {
    ControllerHolder_1.ControllerHolder.FormationDataController.SetKeyboardLockEnemyMode(
      e,
    );
  }
  static ApplyHorizontalViewRevert(e) {
    var a =
      ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(
        0,
      );
    a && this.Zia(1 === e, a);
  }
  static ApplyVerticalViewRevert(e) {
    var a =
      ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(
        1,
      );
    a && this.Zia(1 === e, a);
  }
  static Zia(a, e) {
    for (const g of e) {
      var t = g.AxisName,
        t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
      if (t) {
        var r = new Map(),
          i = g.RevertInfo,
          n = t.GetInputAxisKeyMap();
        if (n) {
          for (var [l, o] of i) {
            var s = n.get(l);
            if (s) {
              let e = 0;
              s = s.Scale;
              0 === o && (e = a ? (0 < s ? -s : s) : 0 < s ? s : -s),
                1 === o && (e = a ? (0 < s ? s : -s) : 0 < s ? -s : s),
                r.set(l, e);
            }
          }
          if (r.size <= 0) return;
          t.SetKeys(r);
        }
      }
    }
  }
  static ApplyGamepadLockEnemyMode(e) {
    ControllerHolder_1.ControllerHolder.FormationDataController.SetGamepadLockEnemyMode(
      e,
    );
  }
  static ApplyEnemyHitDisplayMode(e) {
    ModelManager_1.ModelManager.BulletModel.OpenHitMaterial = 1 === e;
  }
  static ApplyPushEnableState(e) {
    0 === e
      ? ControllerHolder_1.ControllerHolder.KuroPushController.TurnOffPush()
      : ControllerHolder_1.ControllerHolder.KuroPushController.TurnOnPush();
  }
  static ApplyAutoAdjustImageQuality(e) {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.SetIsAutoAdjustImageQuality(
      1 === e,
    );
  }
}
exports.GameSettingsUtils = GameSettingsUtils;
//# sourceMappingURL=GameSettingsUtils.js.map
