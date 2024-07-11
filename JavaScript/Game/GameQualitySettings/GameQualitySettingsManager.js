"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameQualitySettingsManager = exports.LevelRenderSettingsManager =
    void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  DeviceRenderFeatureByDeviceId_1 = require("../../Core/Define/ConfigQuery/DeviceRenderFeatureByDeviceId"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PerfSightController_1 = require("../PerfSight/PerfSightController"),
  GameQualityInfo_1 = require("./GameQualityInfo"),
  GameQualityRenderParameters_1 = require("./GameQualityRenderParameters"),
  HD_SCREEN_WIDTH = 2e3,
  HD_SCREEN_HEIGHT = 1100,
  SEETING_LOAD_FLUID = "Text_SettingLoadFluid_text",
  SEETING_LOAD_LAGGY = "Text_SettingLoadLaggy_text",
  SEETING_LOAD_OVER = "Text_SettingLoadOver_text",
  SEETING_LOAD_FLUID_COLOR =
    "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarGreen.SP_BarGreen",
  SEETING_LOAD_LAGGY_COLOR =
    "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarOrange.SP_BarOrange",
  SEETING_LOAD_OVER_COLOR =
    "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarRed.SP_BarRed";
class LevelRenderSettingsManager {
  static Get() {
    return (
      void 0 === this.Me &&
        ((this.Me = new LevelRenderSettingsManager()),
        (this.SetLevelRenderSettingsStat = void 0),
        (this.RevertLevelRenderSettingsStat = void 0)),
      this.Me
    );
  }
  SetLevelRenderSettings() {
    if (
      void 0 !==
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings
    )
      for (const a of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        var t =
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.get(
              a,
            ),
          e = LevelRenderSettingsManager.Ove.get(a);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          e + " " + t,
        ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Render",
              60,
              "进入特殊副本-调整渲染参数",
              ["设置", e],
              ["为", t],
            );
      }
  }
  RevertLevelRenderSetting() {
    if (
      void 0 !==
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings
    )
      for (const a of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        var t = LevelRenderSettingsManager.kve.get(a),
          e = LevelRenderSettingsManager.Ove.get(a);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          e + " " + t,
        ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Render",
              60,
              "退出特殊副本-调整渲染参数",
              ["设置", e],
              ["为", t],
            );
      }
  }
}
((exports.LevelRenderSettingsManager = LevelRenderSettingsManager).Me = void 0),
  (LevelRenderSettingsManager.Ove = new Map([[1, "r.Shadow.EnableCSMStable"]])),
  (LevelRenderSettingsManager.kve = new Map([[1, 1]]));
class GameQualitySettingsManager {
  constructor() {
    (this.Fve = [1, 2]),
      (this.Vve = void 0),
      (this.Hve = []),
      (this.jve = void 0),
      (this.Wve = void 0),
      (this.Kve = 2),
      (this.Qve = void 0),
      (this.$ve = !1),
      (this.Yve = !1),
      (this.Jve = void 0),
      (this.zve = [30, 45, 60, 120]),
      (this.Zve = [30, 60]),
      (this.eMe = [24, 30, 45, 60]),
      (this.tMe = [0, 5, 10, 15]),
      (this.iMe = [0, 0, 3, 6]),
      (this.oMe = [0, 0, 2500, 5e3]),
      (this.rMe = [0, 0, 1500, 3e3]),
      (this.nMe = [2e3, 2e3, 4e3, 6e3]),
      (this.sMe = [1500, 1500, 2500, 3500]),
      (this.aMe = [0, 1, 1, 1]),
      (this.hMe = () => {
        var t;
        this.$ve ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 41, "初始化-应用设置参数"),
          GameQualitySettingsManager.IsPcPlatform() &&
            ((t = GameQualitySettingsManager.mMe),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Render", 41, "重新设置PC性能分级", [
                "deviceType",
                t,
              ]),
            11 === t
              ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "sg.ViewDistanceQuality 0",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "sg.AntiAliasingQuality 1",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "sg.PostProcessQuality 0",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "sg.TextureQuality 1",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "sg.EffectsQuality 1",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "sg.FoliageQuality 0",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.LandscapeReverseLODScaleFactor 2",
                ))
              : 12 === t
                ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "sg.ViewDistanceQuality 1",
                  ),
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "sg.AntiAliasingQuality 2",
                  ),
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "sg.PostProcessQuality 1",
                  ),
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "sg.TextureQuality 1",
                  ),
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "sg.EffectsQuality 2",
                  ),
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "sg.FoliageQuality 1",
                  ),
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(
                    GlobalData_1.GlobalData.World,
                    "r.LandscapeReverseLODScaleFactor 1",
                  ))
                : 13 === t
                  ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.ViewDistanceQuality 2",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.AntiAliasingQuality 2",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.PostProcessQuality 2",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.TextureQuality 2",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.EffectsQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.FoliageQuality 2",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "r.CapsuleKuroAO 1",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "r.LandscapeReverseLODScaleFactor 0",
                    ))
                  : 14 === t &&
                    (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.ViewDistanceQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.AntiAliasingQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.PostProcessQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.TextureQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.EffectsQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.FoliageQuality 3",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "r.CapsuleKuroAO 1",
                    ),
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "r.LandscapeReverseLODScaleFactor 0",
                    ))),
          this.lMe(),
          (this.$ve = !0));
      }),
      (this._Me = () => {
        ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Render", 60, "进入大世界-调整渲染参数"),
            GameQualitySettingsManager.IsPcPlatform() ||
              (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Mobile.EnableKuroSpotlightsShadow 0",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FogVisibilityCulling.Enable 1",
              )))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Render", 60, "进入副本-调整渲染参数"),
            GameQualitySettingsManager.IsPcPlatform() ||
              (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Mobile.EnableKuroSpotlightsShadow 1",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FogVisibilityCulling.Enable 0",
              )),
            LevelRenderSettingsManager.Get().SetLevelRenderSettings(),
            UE.LandscapeProxy.SetKuroLandscapeFOVFactor(0)),
          this.Qve.ApplySceneAo();
      }),
      (this.uMe = () => {
        ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 60, "退出副本-调整渲染参数"),
          LevelRenderSettingsManager.Get().RevertLevelRenderSetting(),
          UE.LandscapeProxy.SetKuroLandscapeFOVFactor(-1));
      }),
      (this.cMe = () => {
        GameQualitySettingsManager.IsFoldingScreen() &&
          GameQualitySettingsManager.IsAndroidPlatform() &&
          (22 == GameQualitySettingsManager.mMe &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.MobileContentScaleFactor 2",
            ),
          23 == GameQualitySettingsManager.mMe &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.MobileContentScaleFactor 2.5",
            ),
          24 == GameQualitySettingsManager.mMe) &&
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.MobileContentScaleFactor 3",
          );
      });
  }
  get DefaultRenderParameters() {
    return this.Jve;
  }
  GetFullScreenModeIndexByList(t) {
    return this.Fve.indexOf(t);
  }
  GetFullScreenModeByList(t) {
    t = MathUtils_1.MathUtils.Clamp(t, 0, this.Fve.length - 1);
    return this.Fve[t];
  }
  IsEnableVolumeFog() {
    return GameQualitySettingsManager.dMe;
  }
  CloseVolumeFog() {
    (GameQualitySettingsManager.dMe = !1),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.volumetricfog 0",
      );
  }
  GetFrameIndexByList(t) {
    var e = UE.GameplayStatics.GetPlatformName();
    return (
      "IOS" === e ? this.Zve : "Android" === e ? this.eMe : this.zve
    ).indexOf(t);
  }
  GetFrameByList(t) {
    var e = UE.GameplayStatics.GetPlatformName();
    if ("IOS" === e) {
      const a = MathUtils_1.MathUtils.Clamp(t, 0, this.Zve.length - 1);
      return this.Zve[a];
    }
    if ("Android" === e) {
      const a = MathUtils_1.MathUtils.Clamp(t, 0, this.eMe.length - 1);
      return this.eMe[a];
    }
    const a = MathUtils_1.MathUtils.Clamp(t, 0, this.zve.length - 1);
    return this.zve[a];
  }
  GetMaxRoleShadowNum() {
    var t = this.Qve.GetGameQualitySettingLevel();
    return (GameQualitySettingsManager.IsPcPlatform() ? this.tMe : this.iMe)[t];
  }
  GetMaxRoleShadowDistance() {
    var t = this.Qve.GetGameQualitySettingLevel();
    return (GameQualitySettingsManager.IsPcPlatform() ? this.oMe : this.rMe)[t];
  }
  GetMaxDecalShadowDistance() {
    var t = this.Qve.GetGameQualitySettingLevel();
    return (GameQualitySettingsManager.IsPcPlatform() ? this.nMe : this.sMe)[t];
  }
  IsMainPlayerUseRealRoleShadow() {
    var t = this.Qve.GetGameQualitySettingLevel();
    return this.aMe[t];
  }
  GetDefaultScreenResolution() {
    if (!this.jve) {
      var e = this.GetResolutionList();
      if (e.length) {
        let t = e[0];
        if (
          !GameQualitySettingsManager.IsUltraGpuDevice() &&
          (t.X > HD_SCREEN_WIDTH || t.Y > HD_SCREEN_HEIGHT)
        )
          for (const a of e)
            if (a.X < HD_SCREEN_WIDTH && a.Y < HD_SCREEN_HEIGHT) {
              t = a;
              break;
            }
        this.jve = t;
      } else
        this.jve =
          UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution();
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Render",
          41,
          `默认分辨率：${this.jve.X}x` + this.jve.Y,
        );
    }
    return this.jve;
  }
  GetResolutionByList(t) {
    var e = this.GetResolutionList();
    return e[MathUtils_1.MathUtils.Clamp(t, 0, e.length - 1)];
  }
  GetResolutionList() {
    if (!this.Hve.length) {
      if (
        ((this.Vve = (0, puerts_1.$ref)(UE.NewArray(UE.IntPoint))),
        UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(this.Vve))
      ) {
        var e = (0, puerts_1.$unref)(this.Vve);
        for (let t = e.Num() - 1; 0 <= t; --t) {
          var a = e.Get(t);
          a && this.Hve.push(a),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Menu", 8, "", ["resolution", a]);
        }
      }
      this.Hve.length
        ? this.Hve.sort((t, e) => (t.X === e.X ? e.Y - t.Y : e.X - t.X))
        : (this.Hve.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Menu", 41, "获取分辨率列表失败"));
    }
    return this.Hve;
  }
  GetResolutionIndexByList(t) {
    let e = 0;
    for (const a of this.GetResolutionList()) {
      if (a.op_Equality(t)) return e;
      ++e;
    }
    return -1;
  }
  static IsPS5Platform() {
    return "PS5" === UE.GameplayStatics.GetPlatformName();
  }
  static IsPcPlatform() {
    return (
      11 === this.mMe || 12 === this.mMe || 13 === this.mMe || 14 === this.mMe
    );
  }
  static IsIosPlatform() {
    return (
      31 === this.mMe || 32 === this.mMe || 33 === this.mMe || 34 === this.mMe
    );
  }
  static IsAndroidPlatform() {
    return (
      21 === this.mMe || 22 === this.mMe || 23 === this.mMe || 24 === this.mMe
    );
  }
  static IsIosAndAndroidHighDevice() {
    return (
      23 === this.mMe || 24 === this.mMe || 33 === this.mMe || 34 === this.mMe
    );
  }
  static IsAndroidPlatformNotLow() {
    return 22 === this.mMe || 23 === this.mMe || 24 === this.mMe;
  }
  static IsAndroidPlatformScreenBetter() {
    return 23 === this.mMe || 24 === this.mMe;
  }
  static IsAndroidPlatformScreenBad() {
    return 21 === this.mMe || 22 === this.mMe;
  }
  static IsAndroidPlatformLow() {
    return 21 === this.mMe;
  }
  static IsXBoxPlatform() {
    return 35 === this.mMe;
  }
  static IsPSPlatform() {
    return 36 === this.mMe;
  }
  static IsUltraGpuDevice() {
    return this.VendorName
      ? !(
          "NVIDIA" !== GameQualitySettingsManager.VendorName ||
          !GameQualitySettingsManager.DeviceName.includes("RTX")
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsDlssGpuDevice() {
    return this.VendorName
      ? !(
          "NVIDIA" !== GameQualitySettingsManager.VendorName ||
          !GameQualitySettingsManager.DeviceName.includes("RTX")
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsAMDGoodDevice() {
    return this.VendorName
      ? "AMD" === GameQualitySettingsManager.VendorName &&
          1500 < GameQualitySettingsManager.DeviceScore
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsFrameRate120Device() {
    return !(!this.IsDlssGpuDevice() && !this.IsAMDGoodDevice());
  }
  static IsMetalFxDevice() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsSupportsMetalFx();
  }
  static IsPWSDKDevice() {
    return this.IsAndroidPlatform(), !1;
  }
  static IsMaliNewSocOrXclipse() {
    return !!(
      this.DeviceName.includes("G710") ||
      this.DeviceName.includes("G715") ||
      this.DeviceName.includes("G720") ||
      this.DeviceName.includes("G610") ||
      this.DeviceName.includes("G615") ||
      this.DeviceName.includes("G620") ||
      this.DeviceName.includes("Xclipse")
    );
  }
  static IsHuaweiNewPhone() {
    return this.VendorName
      ? !!GameQualitySettingsManager.DeviceName.includes("Maleoon")
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsFoldingScreen() {
    var t =
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().X /
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().Y;
    return (
      (t < 1.8 || 2.6 < t) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 60, "折叠屏适配", ["ScreenRatio", t]),
      !0)
    );
  }
  static IsLowMemoryDevice() {
    return this.DevicePhysicalGbRam <= 4;
  }
  static Get() {
    return this.Me;
  }
  static Initialize() {
    var t;
    this.Me ||
      ((t = UE.GameplayStatics.GetPlatformName()),
      (this.DevicePhysicalGbRam =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetPhysicalGBRam()),
      (this.VendorName =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIVendorName()),
      (this.DeviceName =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName()),
      (this.BaseProfileName =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileBaseProfileName()),
      (this.DeviceScore =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileDeviceScore()),
      (this.RHIName = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName()),
      (this.HardwareLevel =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceHardwareLevel()),
      "IOS" === t
        ? ((this.mMe = 32),
          this.DeviceScore < 150
            ? (this.mMe = 31)
            : 250 < this.DeviceScore && this.DeviceScore < 360
              ? (this.mMe = 33)
              : 360 <= this.DeviceScore && (this.mMe = 34),
          this.DevicePhysicalGbRam < 4 && (this.mMe = 31))
        : "Android" === t ||
            0 ===
              UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
                GlobalData_1.GlobalData.World,
              )
          ? ("Android_Low" === this.BaseProfileName
              ? (this.mMe = 21)
              : "Android_Mid" !== this.BaseProfileName &&
                  "Android_High" === this.BaseProfileName
                ? (this.mMe = 23)
                : (this.mMe = 22),
            GameQualitySettingsManager.IsHuaweiNewPhone() ||
              GameQualitySettingsManager.IsMaliNewSocOrXclipse() ||
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.HZBOcclusion 2",
              ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.Mobile.UseClusteredDeferredShading -1",
            ))
          : "XboxOne" === t
            ? (this.mMe = 35)
            : "PS4" === t
              ? (this.mMe = 36)
              : "Mac" === t
                ? "Mac_Low" === this.BaseProfileName
                  ? (this.mMe = 11)
                  : "Mac_Mid" === this.BaseProfileName
                    ? (this.mMe = 12)
                    : "Mac_High" !== this.BaseProfileName &&
                        "Mac_VeryHigh" === this.BaseProfileName
                      ? (this.mMe = 14)
                      : (this.mMe = 13)
                : "Windows_Low" === this.BaseProfileName
                  ? (this.mMe = 11)
                  : "Windows_Mid" === this.BaseProfileName
                    ? (this.mMe = 12)
                    : "Windows_High" !== this.BaseProfileName &&
                        "Windows_VeryHigh" === this.BaseProfileName
                      ? (this.mMe = 14)
                      : (this.mMe = 13),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          41,
          "",
          ["VendorName", this.VendorName],
          ["DeviceName", this.DeviceName],
          ["BaseProfileName", this.BaseProfileName],
          ["PhysicalGBRam", this.DevicePhysicalGbRam],
          ["DeviceScore", this.DeviceScore],
          ["RHIName", this.RHIName],
          ["HardwareLevel", this.HardwareLevel],
          ["DeviceType", this.mMe],
          ["platform", t],
        ),
      (this.Me = new GameQualitySettingsManager()),
      this.Me.AU()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize,
      );
  }
  GetCurrentQualityInfo() {
    return this.Qve;
  }
  GetQualityInfoByType(t) {
    t = this.Wve.get(t).Copy();
    return (
      void 0 !== this.Qve &&
        ((t.PcScreenResolution = this.Qve.PcScreenResolution),
        (t.PcFullScreenMode = this.Qve.PcFullScreenMode)),
      t
    );
  }
  CMe(t) {
    var e = GameQualitySettingsManager.IsPcPlatform(),
      a = new GameQualityInfo_1.GameQualityInfo();
    a.Initialize(
      t.QualityType,
      t.FPS,
      t.ShadowQuality,
      t.FxQuality,
      t.ImageDetail,
      t.AntiAliasing,
      t.AO,
      t.VolumeFog,
      t.VolumeLight,
      t.MotionBlur,
      t.StreamLevel,
      t.VSync,
      t.ScreenPercentage,
      t.SuperResolution,
      this.jve,
      1,
      0,
      GameQualitySettingsManager.IsDlssGpuDevice() ? 1 : 0,
      1,
      1,
      0,
      1,
      !e || GameQualitySettingsManager.IsDlssGpuDevice() ? 0 : 1,
      1,
      2,
      1,
      1,
      t.Bloom,
      t.NpcDensity,
      50,
      50,
      50,
      50,
      1,
      50,
      50,
      50,
      50,
      1,
      0,
      0,
      1,
      1,
      0,
      50,
      0,
      0.3,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
    ),
      this.Wve.set(t.QualityType, a),
      1 === t.DefaultQuality && (this.Kve = t.QualityType);
  }
  ApplyQualityInfoToCurrentQualityInfo(t) {
    t && ((this.Qve = t), this.Qve.Save()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 8, "开始设置图像配置到引擎"),
      this.lMe();
  }
  GetGameQualityLoadInfo() {
    var t = this.Qve.GetQualitySettingScore(),
      e = (100 * t) / GameQualitySettingsManager.DeviceScore;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          41,
          "图像配置负载信息",
          ["SettingScore", t],
          ["DeviceScore", GameQualitySettingsManager.DeviceScore],
          ["LoadPercentage", e],
        ),
      80 < (e = MathUtils_1.MathUtils.Clamp(e, 0, 100))
        ? {
            Desc: SEETING_LOAD_OVER,
            Percentage: e,
            BarColor: SEETING_LOAD_OVER_COLOR,
          }
        : 60 < e
          ? {
              Desc: SEETING_LOAD_LAGGY,
              Percentage: e,
              BarColor: SEETING_LOAD_LAGGY_COLOR,
            }
          : {
              Desc: SEETING_LOAD_FLUID,
              Percentage: e,
              BarColor: SEETING_LOAD_FLUID_COLOR,
            }
    );
  }
  lMe(t) {
    var e, a, i;
    0 <
    UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
      "r.Kuro.Movie.EnableCGMovieRendering",
    )
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 12, "当前在movie 渲染模式下不应用配置")
      : ((e = this.Qve.GetGameQualitySettingLevel()),
        PerfSightController_1.PerfSightController.IsEnable &&
          UE.PerfSightHelper.PostEvent(800, e.toString()),
        (a = GameQualitySettingsManager.IsPcPlatform())
          ? (i = UE.GameUserSettings.GetGameUserSettings()) &&
            (i.SetGameQualitySettingLevel(e),
            this.Qve.ApplyPcVsync(),
            i.ApplySettings(!0))
          : (i = UE.GameUserSettings.GetGameUserSettings()) &&
            i.SetMobileGameQualitySettingLevel(e),
        this.Qve.ApplyFrameRate(),
        this.Qve.ApplyShadowQuality(),
        this.Qve.ApplyNiagaraQuality(),
        this.Qve.ApplyImageDetail(),
        this.Qve.ApplyAntiAliasing(),
        this.Qve.ApplySceneAo(),
        this.Qve.ApplySceneLightQuality(),
        this.Qve.ApplyVolumeFog(),
        this.Qve.ApplyVolumeLight(),
        this.Qve.ApplyMotionBlur(),
        this.Qve.ApplyMobileResolution(),
        this.Qve.ApplyCommonSprintArmLength(),
        this.Qve.ApplyFightSpringArmLength(),
        this.Qve.ApplyResetFocusEnable(),
        this.Qve.ApplyIsSidestepCameraEnable(),
        this.Qve.ApplyIsSoftLockCameraEnable(),
        this.Qve.ApplyJoystickShake(),
        this.Qve.ApplyWalkOrRunRate(),
        this.Qve.ApplyJoystickMode(),
        this.Qve.ApplyAutoSwitchSkillButtonMode(),
        this.Qve.ApplyAimAssistEnable(),
        this.Qve.ApplyHorizontalViewRevert(),
        this.Qve.ApplyVerticalViewRevert(),
        this.Qve.ApplyKeyboardLockEnemyMode(),
        this.Qve.ApplyFsrEnable(),
        this.Qve.ApplyXessEnable(),
        this.Qve.ApplyXessQuality(),
        this.Qve.ApplyMetalFxEnable(),
        this.Qve.ApplyIrxEnable(),
        this.Qve.ApplyBloomEnable(),
        this.Qve.ApplyScreenResolution(),
        this.Qve.ApplyNpcDensity(),
        this.Qve.ApplyGamepadLockEnemyMode(),
        this.Qve.ApplyEnemyHitDisplayMode(),
        this.Yve || (this.Qve.ApplyBrightness(), (this.Yve = !0)),
        a &&
          (this.Qve.ApplyNvidiaSuperSamplingEnable(),
          this.Qve.ApplyNvidiaSuperSamplingFrameGenerate(),
          this.Qve.ApplyNvidiaSuperSamplingMode(),
          this.Qve.ApplyNvidiaSuperSamplingSharpness(),
          this.Qve.ApplyNvidiaReflex(),
          this.Qve.ApplyHorizontalViewSensitivity(),
          this.Qve.ApplyVerticalViewSensitivity(),
          this.Qve.ApplyAimHorizontalViewSensitivity(),
          this.Qve.ApplyAimVerticalViewSensitivity(),
          this.Qve.ApplyCameraShakeStrength()),
        (GameQualitySettingsManager.IsAndroidPlatform() ||
          GameQualitySettingsManager.IsIosPlatform()) &&
          (this.Qve.ApplyMobileHorizontalViewSensitivity(),
          this.Qve.ApplyMobileVerticalViewSensitivity(),
          this.Qve.ApplyMobileAimHorizontalViewSensitivity(),
          this.Qve.ApplyMobileAimVerticalViewSensitivity(),
          this.Qve.ApplyMobileCameraShakeStrength()),
        this.Qve.ApplyFrameTimeParams());
  }
  AU() {
    this.GetDefaultScreenResolution(), (this.Wve = new Map());
    var t = GameQualitySettingsManager.mMe;
    for (const e of DeviceRenderFeatureByDeviceId_1.configDeviceRenderFeatureByDeviceId.GetConfigList(
      t,
    ))
      this.CMe(e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Render", 12, "", ["初始化画质配置: ", t.toString()]);
    t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
    );
    void 0 === t || 3 < t
      ? ((this.Qve = this.GetQualityInfoByType(this.Kve)), this.Qve.Save())
      : (this.Qve = new GameQualityInfo_1.GameQualityInfo()),
      this.Qve.Load(this.jve),
      this.fMe(),
      this.cMe(),
      (this.$ve = !1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this._Me,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      );
  }
  fMe() {
    var t = UE.GameUserSettings.GetGameUserSettings();
    (this.Jve =
      new GameQualityRenderParameters_1.GameQualityRenderParameters()),
      (this.Jve.VelocityScreenSizeCull =
        UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "r.VelocityScreenSizeCull",
        ) ?? 0.01),
      GameQualitySettingsManager.IsPcPlatform() ||
        (t.SetFrameRateLimit(30),
        t.ApplySettings(!0),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.ScreenPercentage 80",
        )),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.KuroLocalRenderSettingIndex 0",
      );
  }
}
((exports.GameQualitySettingsManager = GameQualitySettingsManager).Me = void 0),
  (GameQualitySettingsManager.dMe = !0),
  (GameQualitySettingsManager.VendorName = ""),
  (GameQualitySettingsManager.DeviceName = ""),
  (GameQualitySettingsManager.BaseProfileName = ""),
  (GameQualitySettingsManager.DeviceScore = 0),
  (GameQualitySettingsManager.RHIName = ""),
  (GameQualitySettingsManager.HardwareLevel = 1),
  (GameQualitySettingsManager.DevicePhysicalGbRam = 0),
  (GameQualitySettingsManager.InCacheSceneColorMode = 0),
  (GameQualitySettingsManager.IsInDLSSSuperFrameRateMode = !1),
  (GameQualitySettingsManager.mMe = 14);
//# sourceMappingURL=GameQualitySettingsManager.js.map
