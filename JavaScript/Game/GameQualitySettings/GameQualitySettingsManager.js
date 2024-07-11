"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameQualitySettingsManager = exports.LevelRenderSettingsManager =
    void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const DeviceRenderFeatureByDeviceId_1 = require("../../Core/Define/ConfigQuery/DeviceRenderFeatureByDeviceId");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const GameQualityData_1 = require("./GameQualityData");
const GameQualityInfo_1 = require("./GameQualityInfo");
const GameQualityRenderParameters_1 = require("./GameQualityRenderParameters");
const HD_SCREEN_WIDTH = 2e3;
const HD_SCREEN_HEIGHT = 1100;
const SEETING_LOAD_FLUID = "Text_SettingLoadFluid_text";
const SEETING_LOAD_LAGGY = "Text_SettingLoadLaggy_text";
const SEETING_LOAD_OVER = "Text_SettingLoadOver_text";
const SEETING_LOAD_FLUID_COLOR =
  "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarGreen.SP_BarGreen";
const SEETING_LOAD_LAGGY_COLOR =
  "/Game/Aki/UI/UIResources/UiSet/Atlas/SP_BarOrange.SP_BarOrange";
const SEETING_LOAD_OVER_COLOR =
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
      for (const e of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        const t =
          ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.get(
            e,
          );
        const i = LevelRenderSettingsManager.Ove.get(e);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          i + " " + t,
        ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Render",
              60,
              "进入特殊副本-调整渲染参数",
              ["设置", i],
              ["为", t],
            );
      }
  }
  RevertLevelRenderSetting() {
    if (
      void 0 !==
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings
    )
      for (const e of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        const t = LevelRenderSettingsManager.kve.get(e);
        const i = LevelRenderSettingsManager.Ove.get(e);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          i + " " + t,
        ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Render",
              60,
              "退出特殊副本-调整渲染参数",
              ["设置", i],
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
      (this.Xve = void 0),
      (this.$ve = !1),
      (this.Yve = !1),
      (this.Jve = void 0),
      (this.zve = [30, 45, 60, 120]),
      (this.Zve = [30, 60]),
      (this.eMe = [24, 30, 45, 60]),
      (this.tMe = [0, 0, 5, 10]),
      (this.iMe = [0, 0, 3, 6]),
      (this.oMe = [0, 0, 2500, 5e3]),
      (this.rMe = [0, 0, 1500, 3e3]),
      (this.nMe = [2e3, 2e3, 4e3, 6e3]),
      (this.sMe = [1500, 1500, 2500, 3500]),
      (this.aMe = [0, 1, 1, 1]),
      (this.hMe = () => {
        let t;
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
            t === 11
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
              : t === 12
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
                : t === 13
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
                  : t === 14 &&
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
            LevelRenderSettingsManager.Get().SetLevelRenderSettings()),
          this.Qve.ApplySceneAo();
      }),
      (this.uMe = () => {
        ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 60, "退出副本-调整渲染参数"),
          LevelRenderSettingsManager.Get().RevertLevelRenderSetting());
      }),
      (this.cMe = () => {
        GameQualitySettingsManager.IsFoldingScreen() &&
          GameQualitySettingsManager.IsAndroidPlatform() &&
          (GameQualitySettingsManager.mMe == 22 &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.MobileContentScaleFactor 2",
            ),
          GameQualitySettingsManager.mMe == 23 &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.MobileContentScaleFactor 2.5",
            ),
          GameQualitySettingsManager.mMe == 24) &&
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
    const i = UE.GameplayStatics.GetPlatformName();
    return (
      i === "IOS" ? this.Zve : i === "Android" ? this.eMe : this.zve
    ).indexOf(t);
  }
  GetFrameByList(t) {
    const i = UE.GameplayStatics.GetPlatformName();
    if (i === "IOS") {
      const e = MathUtils_1.MathUtils.Clamp(t, 0, this.Zve.length - 1);
      return this.Zve[e];
    }
    if (i === "Android") {
      const e = MathUtils_1.MathUtils.Clamp(t, 0, this.eMe.length - 1);
      return this.eMe[e];
    }
    const e = MathUtils_1.MathUtils.Clamp(t, 0, this.zve.length - 1);
    return this.zve[e];
  }
  GetMaxRoleShadowNum() {
    const t = this.Qve.GetGameQualitySettingLevel();
    return (GameQualitySettingsManager.IsPcPlatform() ? this.tMe : this.iMe)[t];
  }
  GetMaxRoleShadowDistance() {
    const t = this.Qve.GetGameQualitySettingLevel();
    return (GameQualitySettingsManager.IsPcPlatform() ? this.oMe : this.rMe)[t];
  }
  GetMaxDecalShadowDistance() {
    const t = this.Qve.GetGameQualitySettingLevel();
    return (GameQualitySettingsManager.IsPcPlatform() ? this.nMe : this.sMe)[t];
  }
  IsMainPlayerUseRealRoleShadow() {
    const t = this.Qve.GetGameQualitySettingLevel();
    return this.aMe[t];
  }
  GetDefaultScreenResolution() {
    if (!this.jve) {
      const i = this.GetResolutionList();
      if (i.length) {
        let t = i[0];
        if (
          !GameQualitySettingsManager.IsUltraGpuDevice() &&
          (t.X > HD_SCREEN_WIDTH || t.Y > HD_SCREEN_HEIGHT)
        )
          for (const e of i)
            if (e.X < HD_SCREEN_WIDTH && e.Y < HD_SCREEN_HEIGHT) {
              t = e;
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
    const i = this.GetResolutionList();
    return i[MathUtils_1.MathUtils.Clamp(t, 0, i.length - 1)];
  }
  GetResolutionList() {
    if (!this.Hve.length) {
      if (
        ((this.Vve = (0, puerts_1.$ref)(UE.NewArray(UE.IntPoint))),
        UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(this.Vve))
      ) {
        const i = (0, puerts_1.$unref)(this.Vve);
        for (let t = i.Num() - 1; t >= 0; --t) {
          const e = i.Get(t);
          e && this.Hve.push(e);
        }
      }
      this.Hve.length
        ? this.Hve.sort((t, i) => (t.X === i.X ? i.Y - t.Y : i.X - t.X))
        : (this.Hve.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Menu", 41, "获取分辨率列表失败"));
    }
    return this.Hve;
  }
  GetResolutionIndexByList(t) {
    let i = 0;
    for (const e of this.GetResolutionList()) {
      if (e.op_Equality(t)) return i;
      ++i;
    }
    return -1;
  }
  static IsPcPlatform() {
    return (
      this.mMe === 11 || this.mMe === 12 || this.mMe === 13 || this.mMe === 14
    );
  }
  static IsIosPlatform() {
    return (
      this.mMe === 31 || this.mMe === 32 || this.mMe === 33 || this.mMe === 34
    );
  }
  static IsIosAndAndroidHighDevice() {
    return (
      this.mMe === 23 || this.mMe === 24 || this.mMe === 33 || this.mMe === 34
    );
  }
  static IsAndroidPlatform() {
    return (
      this.mMe === 21 || this.mMe === 22 || this.mMe === 23 || this.mMe === 24
    );
  }
  static IsAndroidPlatformNotLow() {
    return this.mMe === 22 || this.mMe === 23 || this.mMe === 24;
  }
  static IsAndroidPlatformScreenBetter() {
    return this.mMe === 23 || this.mMe === 24;
  }
  static IsAndroidPlatformScreenBad() {
    return this.mMe === 21 || this.mMe === 22;
  }
  static IsAndroidPlatformLow() {
    return this.mMe === 21;
  }
  static IsXBoxPlatform() {
    return this.mMe === 35;
  }
  static IsPSPlatform() {
    return this.mMe === 36;
  }
  static IsUltraGpuDevice() {
    return this.VendorName
      ? !(
          GameQualitySettingsManager.VendorName !== "NVIDIA" ||
          !GameQualitySettingsManager.DeviceName.includes("RTX")
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsDlssGpuDevice() {
    return this.VendorName
      ? !(
          GameQualitySettingsManager.VendorName !== "NVIDIA" ||
          !GameQualitySettingsManager.DeviceName.includes("RTX")
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsMetalFxDevice() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsSupportsMetalFx();
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
    const t =
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().X /
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().Y;
    return (
      (t < 1.8 || t > 2.6) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 60, "折叠屏适配", ["ScreenRatio", t]),
      !0)
    );
  }
  static Get() {
    return this.Me;
  }
  static Initialize() {
    let t;
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
      t === "IOS"
        ? ((this.mMe = 32),
          this.DeviceScore < 150
            ? (this.mMe = 31)
            : this.DeviceScore > 250 && this.DeviceScore < 360
              ? (this.mMe = 33)
              : this.DeviceScore >= 360 && (this.mMe = 34),
          this.DevicePhysicalGbRam < 4 && (this.mMe = 31))
        : t === "Android" ||
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
              GlobalData_1.GlobalData.World,
            ) === 0
          ? (this.BaseProfileName === "Android_Low"
              ? (this.mMe = 21)
              : this.BaseProfileName !== "Android_Mid" &&
                  this.BaseProfileName === "Android_High"
                ? (this.mMe = 23)
                : (this.mMe = 22),
            GameQualitySettingsManager.IsHuaweiNewPhone() ||
            GameQualitySettingsManager.IsMaliNewSocOrXclipse()
              ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Mobile.UseClusteredDeferredShading -1",
                )
              : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.HZBOcclusion 2",
                ))
          : t === "XboxOne"
            ? (this.mMe = 35)
            : t === "PS4"
              ? (this.mMe = 36)
              : t === "Mac"
                ? this.BaseProfileName === "Mac_Low"
                  ? (this.mMe = 11)
                  : this.BaseProfileName === "Mac_Mid"
                    ? (this.mMe = 12)
                    : this.BaseProfileName !== "Mac_High" &&
                        this.BaseProfileName === "Mac_VeryHigh"
                      ? (this.mMe = 14)
                      : (this.mMe = 13)
                : this.BaseProfileName === "Windows_Low"
                  ? (this.mMe = 11)
                  : this.BaseProfileName === "Windows_Mid"
                    ? (this.mMe = 12)
                    : this.BaseProfileName !== "Windows_High" &&
                        this.BaseProfileName === "Windows_VeryHigh"
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
      this.Me.AU());
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
    const i = GameQualitySettingsManager.IsPcPlatform();
    const e = new GameQualityInfo_1.GameQualityInfo();
    e.Initialize(
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
      !i || GameQualitySettingsManager.IsDlssGpuDevice() ? 0 : 1,
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
      1,
      50,
      0,
      0.3,
      0,
      0,
      1,
      0,
      0,
    ),
      this.Wve.set(t.QualityType, e),
      t.DefaultQuality === 1 && (this.Kve = t.QualityType);
  }
  InitQualityInfoBySavedQualityData() {
    var t = this.jve;
    const i = t.X;
    var t = t.Y;
    (this.Qve = new GameQualityInfo_1.GameQualityInfo()),
      this.Qve.Initialize(
        this.Xve.KeyQualityLevel,
        this.Xve.KeyCustomFrameRate ?? 30,
        this.Xve.KeyNewShadowQuality ?? 2,
        this.Xve.KeyNiagaraQuality ?? 1,
        this.Xve.KeyImageDetail ?? 2,
        this.Xve.KeyAntiAliasing ?? 1,
        this.Xve.KeySceneAo ?? 1,
        this.Xve.KeyVolumeFog ?? 1,
        this.Xve.KeyVolumeLight ?? 1,
        this.Xve.KeyMotionBlur ?? 1,
        this.Xve.KeyStreamLevel ?? 1,
        this.Xve.KeyPcVsync ?? 0,
        this.Xve.KeyMobileResolution ?? 0.85,
        this.Xve.KeySuperResolution ?? 2,
        new UE.IntPoint(
          this.Xve.KeyPcResolutionWidth ?? i,
          this.Xve.KeyPcResolutionHeight ?? t,
        ),
        this.Xve.KeyPcWindowMode ?? 1,
        this.Xve.KeyBrightness ?? 0,
        this.Xve.KeyNvidiaSuperSamplingEnable ??
          (GameQualitySettingsManager.IsDlssGpuDevice() ? 1 : 0),
        this.Xve.KeyNvidiaSuperSamplingFrameGenerate ?? 1,
        this.Xve.KeyNvidiaSuperSamplingMode ?? 1,
        this.Xve.KeyNvidiaSuperSamplingSharpness ?? 0,
        this.Xve.KeyNvidiaReflex ?? 1,
        this.Xve.KeyFsrEnable ??
          (GameQualitySettingsManager.IsDlssGpuDevice() ? 0 : 1),
        this.Xve.KeyXessEnable ?? 1,
        this.Xve.KeyXessQuality ?? 2,
        this.Xve.KeyMetalFxEnable ?? 1,
        this.Xve.KeyIrxEnable ?? 1,
        this.Xve.KeyBloomEnable ?? 1,
        this.Xve.KeyNpcDensity ?? 1,
        this.Xve.HorizontalViewSensitivity ?? 1,
        this.Xve.VerticalViewSensitivity ?? 1,
        this.Xve.AimHorizontalViewSensitivity ?? 1,
        this.Xve.AimVerticalViewSensitivity ?? 1,
        this.Xve.CameraShakeStrength ?? 1,
        this.Xve.MobileHorizontalViewSensitivity ?? 1,
        this.Xve.MobileVerticalViewSensitivity ?? 1,
        this.Xve.MobileAimHorizontalViewSensitivity ?? 1,
        this.Xve.MobileAimVerticalViewSensitivity ?? 1,
        this.Xve.MobileCameraShakeStrength ?? 1,
        this.Xve.CommonSpringArmLength ?? 0,
        this.Xve.FightSpringArmLength ?? 0,
        this.Xve.IsResetFocusEnable ?? 1,
        this.Xve.IsSidestepCameraEnable ?? 1,
        this.Xve.IsSoftLockCameraEnable ?? 1,
        this.Xve.JoystickShakeStrength ?? 50,
        this.Xve.JoystickShakeType ?? 0,
        this.Xve.WalkOrRunRate ?? 50,
        this.Xve.JoystickMode ?? 0,
        this.Xve.IsAutoSwitchSkillButtonMode ?? 0,
        this.Xve.AimAssistEnable ?? 0,
        this.Xve.HorizontalViewRevert ?? 0,
        this.Xve.VerticalViewRevert ?? 0,
      );
  }
  SaveCurrentQualityInfoToQualityData() {
    (this.Xve.KeyQualityLevel = this.Qve.GetGameQualitySettingLevel()),
      (this.Xve.KeyCustomFrameRate = this.Qve.GetFrameRate()),
      (this.Xve.KeyNewShadowQuality = this.Qve.ShadowQuality),
      (this.Xve.KeyNiagaraQuality = this.Qve.NiagaraQuality),
      (this.Xve.KeyImageDetail = this.Qve.ImageDetail),
      (this.Xve.KeyBrightness = this.Qve.Brightness),
      (this.Xve.KeyAntiAliasing = this.Qve.AntiAliasing),
      (this.Xve.KeySceneAo = this.Qve.SceneAo),
      (this.Xve.KeyVolumeFog = this.Qve.VolumeFog),
      (this.Xve.KeyVolumeLight = this.Qve.VolumeLight),
      (this.Xve.KeyMotionBlur = this.Qve.MotionBlur),
      (this.Xve.KeyStreamLevel = this.Qve.StreamLevel),
      (this.Xve.KeyPcVsync = this.Qve.PcVsync),
      (this.Xve.KeyMobileResolution = this.Qve.MobileResolution),
      (this.Xve.KeySuperResolution = this.Qve.SuperResolution),
      (this.Xve.KeyPcResolutionWidth = this.Qve.PcScreenResolution.X),
      (this.Xve.KeyPcResolutionHeight = this.Qve.PcScreenResolution.Y),
      (this.Xve.KeyPcWindowMode = this.Qve.PcFullScreenMode),
      (this.Xve.KeyNvidiaSuperSamplingEnable =
        this.Qve.NvidiaSuperSamplingEnable),
      (this.Xve.KeyNvidiaSuperSamplingFrameGenerate =
        this.Qve.NvidiaSuperSamplingFrameGenerate),
      (this.Xve.KeyNvidiaSuperSamplingMode = this.Qve.NvidiaSuperSamplingMode),
      (this.Xve.KeyNvidiaSuperSamplingSharpness =
        this.Qve.NvidiaSuperSamplingSharpness),
      (this.Xve.KeyNvidiaReflex = this.Qve.NvidiaReflex),
      (this.Xve.KeyFsrEnable = this.Qve.FsrEnable),
      (this.Xve.KeyXessEnable = this.Qve.XessEnable),
      (this.Xve.KeyXessQuality = this.Qve.XessQuality),
      (this.Xve.KeyMetalFxEnable = this.Qve.MetalFxEnable),
      (this.Xve.KeyIrxEnable = this.Qve.IrxEnable),
      (this.Xve.KeyBloomEnable = this.Qve.BloomEnable),
      (this.Xve.KeyNpcDensity = this.Qve.NpcDensity),
      (this.Xve.HorizontalViewSensitivity = this.Qve.HorizontalViewSensitivity),
      (this.Xve.VerticalViewSensitivity = this.Qve.VerticalViewSensitivity),
      (this.Xve.AimHorizontalViewSensitivity =
        this.Qve.AimHorizontalViewSensitivity),
      (this.Xve.AimVerticalViewSensitivity =
        this.Qve.AimVerticalViewSensitivity),
      (this.Xve.CameraShakeStrength = this.Qve.CameraShakeStrength),
      (this.Xve.MobileHorizontalViewSensitivity =
        this.Qve.MobileHorizontalViewSensitivity),
      (this.Xve.MobileVerticalViewSensitivity =
        this.Qve.MobileVerticalViewSensitivity),
      (this.Xve.MobileAimHorizontalViewSensitivity =
        this.Qve.MobileAimHorizontalViewSensitivity),
      (this.Xve.MobileAimVerticalViewSensitivity =
        this.Qve.MobileAimVerticalViewSensitivity),
      (this.Xve.MobileCameraShakeStrength = this.Qve.MobileCameraShakeStrength),
      (this.Xve.CommonSpringArmLength = this.Qve.CommonSpringArmLength),
      (this.Xve.FightSpringArmLength = this.Qve.FightSpringArmLength),
      (this.Xve.IsResetFocusEnable = this.Qve.IsResetFocusEnable),
      (this.Xve.IsSidestepCameraEnable = this.Qve.IsSidestepCameraEnable),
      (this.Xve.IsSoftLockCameraEnable = this.Qve.IsSoftLockCameraEnable),
      (this.Xve.JoystickShakeStrength = this.Qve.JoystickShakeStrength),
      (this.Xve.JoystickShakeType = this.Qve.JoystickShakeType),
      (this.Xve.WalkOrRunRate = this.Qve.WalkOrRunRate),
      (this.Xve.JoystickMode = this.Qve.JoystickMode),
      (this.Xve.IsAutoSwitchSkillButtonMode =
        this.Qve.IsAutoSwitchSkillButtonMode),
      (this.Xve.AimAssistEnable = this.Qve.AimAssistEnable),
      (this.Xve.HorizontalViewRevert = this.Qve.HorizontalViewRevert),
      (this.Xve.VerticalViewRevert = this.Qve.VerticalViewRevert),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualitySetting,
        this.Xve,
      );
  }
  ApplyQualityInfoToCurrentQualityInfo(t) {
    t && ((this.Qve = t), this.SaveCurrentQualityInfoToQualityData()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 8, "开始设置图像配置到引擎"),
      this.lMe();
  }
  GetGameQualityLoadInfo() {
    const t = this.Qve.GetQualitySettingScore();
    let i = (100 * t) / GameQualitySettingsManager.DeviceScore;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          41,
          "图像配置负载信息",
          ["SettingScore", t],
          ["DeviceScore", GameQualitySettingsManager.DeviceScore],
          ["LoadPercentage", i],
        ),
      (i = MathUtils_1.MathUtils.Clamp(i, 0, 100)) > 80
        ? {
            Desc: SEETING_LOAD_OVER,
            Percentage: i,
            BarColor: SEETING_LOAD_OVER_COLOR,
          }
        : i > 60
          ? {
              Desc: SEETING_LOAD_LAGGY,
              Percentage: i,
              BarColor: SEETING_LOAD_LAGGY_COLOR,
            }
          : {
              Desc: SEETING_LOAD_FLUID,
              Percentage: i,
              BarColor: SEETING_LOAD_FLUID_COLOR,
            }
    );
  }
  lMe(t) {
    let i, e, a;
    UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
      "r.Kuro.Movie.EnableCGMovieRendering",
    ) > 0
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 12, "当前在movie 渲染模式下不应用配置")
      : ((i = GameQualitySettingsManager.IsPcPlatform())
          ? ((a = UE.GameUserSettings.GetGameUserSettings()),
            (e = this.Qve.GetGameQualitySettingLevel()),
            a &&
              (a.SetGameQualitySettingLevel(e),
              this.Qve.ApplyPcVsync(),
              a.ApplySettings(!0)))
          : ((e = UE.GameUserSettings.GetGameUserSettings()),
            (a = this.Qve.GetGameQualitySettingLevel()),
            e && e.SetMobileGameQualitySettingLevel(a)),
        this.Qve.ApplyFrameRate(),
        this.Qve.ApplyShadowQuality(),
        this.Qve.ApplyNiagaraQuality(),
        this.Qve.ApplyImageDetail(),
        this.Qve.ApplyAntiAliasing(),
        this.Qve.ApplySceneAo(),
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
        this.Qve.ApplyFsrEnable(),
        this.Qve.ApplyXessEnable(),
        this.Qve.ApplyXessQuality(),
        this.Qve.ApplyMetalFxEnable(),
        this.Qve.ApplyIrxEnable(),
        this.Qve.ApplyBloomEnable(),
        this.Qve.ApplyScreenResolution(),
        this.Qve.ApplyNpcDensity(),
        this.Yve || (this.Qve.ApplyBrightness(), (this.Yve = !0)),
        i &&
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
    this.GetDefaultScreenResolution(),
      (this.Xve = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualitySetting,
      )),
      (this.Wve = new Map());
    const t = GameQualitySettingsManager.mMe;
    for (const i of DeviceRenderFeatureByDeviceId_1.configDeviceRenderFeatureByDeviceId.GetConfigList(
      t,
    ))
      this.CMe(i);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Render", 12, "", ["初始化画质配置: ", t.toString()]),
      void 0 === this.Xve || this.Xve.KeyQualityLevel > 3
        ? ((this.Xve = new GameQualityData_1.GameQualityData()),
          (this.Qve = this.GetQualityInfoByType(this.Kve)),
          this.SaveCurrentQualityInfoToQualityData())
        : this.InitQualityInfoBySavedQualityData(),
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
    const t = UE.GameUserSettings.GetGameUserSettings();
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
// # sourceMappingURL=GameQualitySettingsManager.js.map
