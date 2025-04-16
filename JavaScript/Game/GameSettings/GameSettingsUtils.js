"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsUtils = void 0);
const UE = require("ue"),
  AudioDefine_1 = require("../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  Info_1 = require("../../Core/Common/Info"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  DamageUiManager_1 = require("../Module/DamageUi/DamageUiManager"),
  CharacterSkinDamageComponent_1 = require("../NewWorld/Character/Common/Component/CharacterSkinDamageComponent"),
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
  static ApplyImageQualityOnly(e) {
    if (
      0 <
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
        "r.Kuro.Movie.EnableCGMovieRendering",
      )
    )
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 11, "当前在movie 渲染模式下不应用配置"),
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
      r,
      i = UE.GameUserSettings.GetGameUserSettings();
    return i
      ? ((a = Info_1.Info.IsPcOrGamepadPlatform()),
        (t = Info_1.Info.IsMobilePlatform()),
        (r = Info_1.Info.IsPs5Platform()),
        a
          ? (r
              ? (3 === e
                  ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.KuroRenderQuality 1",
                    )
                  : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.KuroRenderQuality 0",
                    ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "GameSettings",
                    59,
                    "优先应用的画质等级[done]@[PS5]",
                    ["ps5 quality level", e],
                  ))
              : (i.SetGameQualitySettingLevel(e),
                Info_1.Info.IsMacPlatform() &&
                  (2 < e
                    ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                        GlobalData_1.GlobalData.World,
                        "r.ScreenPercentage 70",
                      )
                    : 2 === e
                      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                          GlobalData_1.GlobalData.World,
                          "r.ScreenPercentage 65",
                        )
                      : 1 === e
                        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                            GlobalData_1.GlobalData.World,
                            "r.ScreenPercentage 60",
                          )
                        : 0 === e &&
                          UE.KismetSystemLibrary.ExecuteConsoleCommand(
                            GlobalData_1.GlobalData.World,
                            "r.ScreenPercentage 55",
                          )),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "GameSettings",
                    64,
                    "优先应用的画质等级[done]@[Pc或手柄平台]",
                    ["quality level", e],
                  )),
            i.ApplySettings(!0))
          : t &&
            (i.SetMobileGameQualitySettingLevel(e), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "GameSettings",
              64,
              "优先应用的画质等级[done]@[移动端平台]",
              ["quality level", e],
            ),
        !0)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameSettings", 64, "GetGameUserSettings失败", [
            "qualityLevel",
            e,
          ]),
        !1);
  }
  static SetIsCustomImageQuality(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsCustomImageQuality,
      e,
    );
  }
  static ApplyShadowQuality(e) {
    return (
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "sg.ShadowQuality " + e,
      ),
      GameSettingsManager_1.GameSettingsManager.ReApply(
        GameSettingsDefine_1.EFunction.SCENEAO,
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
    return (
      a.SetFullscreenMode(e),
      a.ApplySettings(!0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDisplayMode),
      !0
    );
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
    return (
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution), !0
    );
  }
  static ApplyBrightness(e) {
    let a = 2.2;
    return (
      (a =
        e < 0
          ? MathUtils_1.MathUtils.Lerp(1.5, 2.2, e + 1)
          : MathUtils_1.MathUtils.Lerp(2.2, 3.5, e)),
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
          64,
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
      Info_1.Info.IsPcOrGamepadPlatform()
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "fx.Niagara.QualityLevel " + (0 < e ? 2 : 1),
          )
        : ((a =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice()),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.DisableDistortion " + (0 < e && a ? 0 : 1),
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
    var a, t;
    return (
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(805, e.toString()),
      Info_1.Info.IsPcOrGamepadPlatform()
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "GameSettings",
              64,
              "ApplyImageDetail[pc和主机]",
              ["传入value", e],
              ["pcToonOutlineDrawDistanceFar", 4e3],
              ["pcToonOutlineDrawDistanceNear", 2e3],
            ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "GameSettings",
              64,
              "ApplyImageDetail[移动端]",
              ["传入value", e],
              ["mobileToonOutlineDrawDistanceFar", 500],
              ["mobileToonOutlineDrawDistanceNear", 500],
            ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
          (t =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformNotLow()),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.TreeRimLight " + (1 < e && t ? 1 : 0),
          ),
          GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
            ?.bEnableWorldPartition &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameSettings", 59, "UpdateFoliageDataLayer", [
                "value",
                e + 1,
              ]),
            UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateFoliageDataLayer(
              GlobalData_1.GlobalData.World,
              e + 1,
            )),
          (t =
            a &&
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidAdreno()),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.AutoExposure " + (1 < e && t ? 1 : 0),
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
                ))),
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
    if (Info_1.Info.IsPcOrGamepadPlatform())
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.AmbientOcclusionLevels " + -e,
      ),
        RenderDataManager_1.RenderDataManager.Get().SetGrassAo(e),
        PerfSightController_1.PerfSightController.IsEnable &&
          UE.PerfSightHelper.PostEvent(810, e.toString());
    else {
      var a =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBetter(),
        t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.SHADOWQUALITY,
        );
      if (void 0 === t)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GameSettings",
              64,
              "【移动端】设定场景AO时，不能获得阴影质量保存值",
            ),
          !1
        );
      t = 0 < t && a ? e : 0;
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Mobile.SSAO " + t,
      ),
        UE.KismetMaterialLibrary.SetScalarParameterValue(
          GlobalData_1.GlobalData.World,
          RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(),
          new UE.FName("EnableMobileScreenAO"),
          t,
        ),
        RenderDataManager_1.RenderDataManager.Get().SetGrassAo(t),
        PerfSightController_1.PerfSightController.IsEnable &&
          UE.PerfSightHelper.PostEvent(810, t.toString());
    }
    return !0;
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
            GameSettingsManager_1.GameSettingsManager.ReApply(
              GameSettingsDefine_1.EFunction.NVIDIADLSSFG,
            ),
            GameSettingsManager_1.GameSettingsManager.ReApply(
              GameSettingsDefine_1.EFunction.NVIDIAREFLEX,
            ))
          : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.NGX.DLSS.Enable 0",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAASamples 4",
            ),
            this.ApplyNvidiaSuperSamplingFrameGenerate(0)),
        GameSettingsManager_1.GameSettingsManager.ReApply(
          GameSettingsDefine_1.EFunction.PCVSYNC,
        ),
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
  static ApplyNvidiaSuperSamplingFrameGenerate(e) {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3GpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaStreamlinePluginLoaded() &&
        (GameSettingsDeviceRender_1.GameSettingsDeviceRender.EnableDLSSG(e),
        PerfSightController_1.PerfSightController.IsEnable) &&
        UE.PerfSightHelper.PostEvent(820, e.toString()),
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
  static ApplyNvidiaSuperSamplingQuality(e) {
    return (
      !!GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidiaDlssPluginLoaded() &&
        (99 === e
          ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.NGX.DLSS.Quality.Auto 1",
            )
          : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.NGX.DLSS.Quality.Auto 0",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.NGX.DLSS.Quality " + e,
            )),
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
    return !0;
  }
  static ApplyFsrEnable(e) {
    return (
      !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice() &&
      !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice() &&
      (Info_1.Info.IsGamepadPlatform()
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.TemporalAASamples 4",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
        : (Info_1.Info.IsPcPlatform()
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
            UE.PerfSightHelper.PostEvent(813, e.toString())),
      !0)
    );
  }
  static ApplyXessEnable(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 40, "ApplyXessEnable", ["XessEnable", e]),
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
        Log_1.Log.Debug("Game", 40, "ApplyXessQuality", ["XessQuality", e]),
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
        Log_1.Log.Debug("Game", 40, "ApplyMetalFxEnable", ["MetalFxEnable", e]),
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
        Log_1.Log.Debug("Game", 40, "ApplyIrxEnable", ["IrxEnable", e]),
      1 === e
        ? GameSettingsDeviceRender_1.GameSettingsDeviceRender.TurnOnIRX()
        : GameSettingsDeviceRender_1.GameSettingsDeviceRender.TurnOffIRX(),
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
      (Info_1.Info.IsPcOrGamepadPlatform() &&
        (UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.volumetricfog " + e,
        ),
        PerfSightController_1.PerfSightController.IsEnable) &&
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 16, "分辨率参数获取", [
        "r.MobileContentScaleFactor",
        t,
      ]);
    let i = 1;
    var l,
      n =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()
          .Y;
    return (
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighResolutionDevice() &&
      0 < n
        ? ((l =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()
              .X) < n && n < 1280 * t
            ? (i = (1280 * t) / n)
            : n < l && n < 720 * t && (i = (720 * t) / n),
          (l = Math.min(r * i, 100)),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.SecondaryScreenPercentage.GameViewport " + l,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Game",
              40,
              "分辨率校正",
              ["deviceScaleCorrect", i],
              ["secondaryScreenPercentage", r],
              ["newSecondaryScreenPercentage", l],
            ))
        : GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()
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
        Log_1.Log.Debug("Game", 16, "分辨率参数设置", [
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
    if (Info_1.Info.IsMobilePlatform()) a = e;
    else
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "GameSettings",
        64,
        "相机抖动强度真实值",
        ["setting value", e],
        ["strength", a],
      ),
      ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(a);
  }
  static ApplyTextLanguage(e) {
    var a,
      e = GameSettingsManager_1.GameSettingsManager.GetLanguageCodeById(e);
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
  static ApplyTextLanguageOnGameStart(e) {
    e = GameSettingsManager_1.GameSettingsManager.GetLanguageCodeById(e);
    return (
      void 0 !== e &&
      ((LanguageSystem_1.LanguageSystem.PackageLanguage = e), !0)
    );
  }
  static ApplyLanguageAudio(e) {
    e = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(e);
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
    var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(
      GameSettingsDefine_1.EFunction.JoystickShakeType,
    );
    return this.WNa(a, e), !0;
  }
  static ApplyJoystickShakeType(e) {
    var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(
      GameSettingsDefine_1.EFunction.JoystickShakeStrength,
    );
    return this.WNa(e, a), !0;
  }
  static WNa(e, a) {
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
  static RefreshViewRevertState(e) {
    let a = 0,
      t = 0;
    2 === e &&
      ((a =
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.HorizontalViewRevert,
        ) ?? 0),
      (t =
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.VerticalViewRevert,
        ) ?? 0)),
      this.ApplyHorizontalViewRevert(a),
      this.ApplyVerticalViewRevert(t);
  }
  static Zia(a, e) {
    for (const g of e) {
      var t = g.AxisName,
        t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
      if (t) {
        var r = new Map(),
          i = g.RevertInfo,
          l = t.GetInputAxisKeyMap();
        if (l) {
          for (var [n, o] of i) {
            var _ = l.get(n);
            if (_) {
              let e = 0;
              _ = _.Scale;
              0 === o && (e = a ? (0 < _ ? -_ : _) : 0 < _ ? _ : -_),
                1 === o && (e = a ? (0 < _ ? _ : -_) : 0 < _ ? -_ : _),
                r.set(n, e);
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
  static ApplyPushEnableState(e, a) {
    0 === e
      ? ControllerHolder_1.ControllerHolder.KuroPushController.TurnOffPush()
      : ControllerHolder_1.ControllerHolder.KuroPushController.TurnOnPush(
          1 === a,
        );
  }
  static ApplyAutoAdjustImageQuality(e) {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.SetIsAutoAdjustImageQuality(
      1 === e,
    ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(824, e.toString());
  }
  static ApplyShowDamage(e) {
    DamageUiManager_1.DamageUiManager.SetDamageViewVisible(1 === e);
  }
  static ApplyDynamicBones(e) {
    ControllerHolder_1.ControllerHolder.CreatureController.SetKawaiiEnable(e);
  }
  static ApplyDolbyAtmos(e) {
    AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPC_DOLBY_ATMOS, e);
  }
  static ApplyUiPureMode(e) {
    return 1 === e
      ? (ControllerHolder_1.ControllerHolder.BattleUiControl.TryOpenPureMode(),
        !1)
      : ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode();
  }
  static ApplyRayTracing(e) {
    0 < e &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "sg.RayTracingQuality " + e,
      );
    var a = UE.BlueprintPathsLibrary.ProjectSavedDir() + "SaveGames/RTX.json";
    return (
      UE.KuroStaticLibrary.FileExists(a) && UE.KuroStaticLibrary.DeleteFile(a),
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetRayTracingEnable(0 < e),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(821, e.toString()),
      !0
    );
  }
  static ApplyRayTracedReflection(e) {
    return (
      0 < e
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Lumen.Reflections.Allow 1",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 73, "光追反射开启"))
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Lumen.Reflections.Allow 0",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 73, "光追反射关闭")),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(822, e.toString()),
      !0
    );
  }
  static ApplyRayTracedGI(e) {
    return (
      0 < e
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Lumen.DiffuseIndirect.Allow 1",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 73, "光追全局光照开启"))
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Lumen.DiffuseIndirect.Allow 0",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 73, "光追全局光照关闭")),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(823, e.toString()),
      !0
    );
  }
  static ApplyRayTracedShadow(e) {
    return (
      0 < e
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.RayTracing.Shadows 1",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 73, "光追阴影开启"))
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.RayTracing.Shadows 0",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 73, "光追阴影关闭")),
      !0
    );
  }
  static ApplySaturationClient(e) {
    let a = 1;
    return (
      e <= 50 && (a = MathUtils_1.MathUtils.Lerp(0, 1, (2 * e) / 100)),
      50 < e && (a = MathUtils_1.MathUtils.Lerp(1, 2, (2 * (e - 50)) / 100)),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Client.Saturation " + a,
      ),
      !0
    );
  }
  static ApplyContrastClient(e) {
    let a = 1;
    return (
      e <= 50 && (a = MathUtils_1.MathUtils.Lerp(0.5, 1, (2 * e) / 100)),
      50 < e && (a = MathUtils_1.MathUtils.Lerp(1, 2, (2 * (e - 50)) / 100)),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Client.Contrast " + a,
      ),
      !0
    );
  }
  static ApplySkinDamageMode(e) {
    (CharacterSkinDamageComponent_1.CharacterSkinDamageComponent.EnableSkinDamage =
      1 === e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnResetSkinDamageMode,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnResetSkinDamageMode,
      );
  }
  static ApplyAFMEOption(e) {
    e = 1 === e ? 0 : 1;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.FEstimation.Option " + e,
    );
  }
  static ApplyAutoRun(e) {
    return (
      void 0 !== ModelManager_1.ModelManager.BattleUiModel &&
      void 0 !== ModelManager_1.ModelManager.BattleUiModel.FormationData &&
      ((ModelManager_1.ModelManager.BattleUiModel.FormationData.AutoMovingSettingEnable =
        0 < e),
      !0)
    );
  }
  static ApplyAutoSprint(e) {
    return (
      void 0 !== ModelManager_1.ModelManager.BattleUiModel &&
      void 0 !== ModelManager_1.ModelManager.BattleUiModel.FormationData &&
      ((ModelManager_1.ModelManager.BattleUiModel.FormationData.AutoSprintSettingEnable =
        0 < e),
      !0)
    );
  }
  static ApplyVulkan(e) {
    return (
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetVulkanPromotion(0 < e), !0
    );
  }
}
exports.GameSettingsUtils = GameSettingsUtils;
//# sourceMappingURL=GameSettingsUtils.js.map
