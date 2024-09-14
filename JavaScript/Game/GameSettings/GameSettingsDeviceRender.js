"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsDeviceRender = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  KuroAutoCoolController_1 = require("../Module/KuroAutoCool/KuroAutoCoolController"),
  PerfSightController_1 = require("../PerfSight/PerfSightController"),
  DeviceRenderFeatureData_1 = require("./DeviceRenderFeatureData"),
  GameSettingsDeviceRenderDefine_1 = require("./GameSettingsDeviceRenderDefine"),
  GameSettingsManager_1 = require("./GameSettingsManager");
class GameSettingsDeviceRender {
  static Initialize() {
    this.SGa(),
      this.EGa(),
      this.yGa(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize,
      );
  }
  static Clear() {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
      this.GameQualitySettingLevel,
    ),
      this.CancelAllPerformanceLimit();
  }
  static IsDriverNeedUpdate() {
    var e = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(this.DriverDate);
    return 4 === e?.length && Number(e[3]) < 2023;
  }
  static SGa() {
    (this.IGa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetPhysicalGBRam()),
      (this.TGa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIVendorName()),
      (this.LGa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName()),
      (this.AGa =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileBaseProfileName()),
      (this.DeviceScore =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileDeviceScore()),
      (this.DGa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName()),
      (this.RGa =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceHardwareLevel()),
      (this.DriverDate =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverDate()),
      (this.CPUFrequency =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUFrequency()),
      (this.CPUCores = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUCores()),
      (this.CPUCoresIncludingHyperthreads =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUCoresIncludingHyperthreads()),
      (this.CPUBrand = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCPUBrand()),
      Platform_1.Platform.IsIOSPlatform()
        ? ((this.DeviceType = 32),
          this.DeviceScore < 150
            ? (this.DeviceType = 31)
            : 250 < this.DeviceScore && this.DeviceScore < 360
              ? (this.DeviceType = 33)
              : 360 <= this.DeviceScore && (this.DeviceType = 34),
          this.IGa < 4 && (this.DeviceType = 31))
        : Platform_1.Platform.IsAndroidPlatform() ||
            0 ===
              UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
                GlobalData_1.GlobalData.World,
              )
          ? ("Android_Low" === this.AGa
              ? (this.DeviceType = 21)
              : "Android_Mid" !== this.AGa && "Android_High" === this.AGa
                ? (this.DeviceType = 23)
                : (this.DeviceType = 22),
            this.IsHuaweiNewPhone() ||
              this.IsMaliNewSocOrXclipse() ||
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.HZBOcclusion 2",
              ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.Mobile.UseClusteredDeferredShading -1",
            ))
          : Platform_1.Platform.IsPs5Platform()
            ? (this.DeviceType = 36)
            : Platform_1.Platform.IsMacPlatform()
              ? "Mac_Low" === this.AGa
                ? (this.DeviceType = 11)
                : "Mac_Mid" === this.AGa
                  ? (this.DeviceType = 12)
                  : "Mac_High" !== this.AGa && "Mac_VeryHigh" === this.AGa
                    ? (this.DeviceType = 14)
                    : (this.DeviceType = 13)
              : "Windows_Low" === this.AGa
                ? (this.DeviceType = 11)
                : "Windows_Mid" === this.AGa
                  ? (this.DeviceType = 12)
                  : "Windows_High" !== this.AGa &&
                      ("Windows_VeryHigh" === this.AGa ||
                        "Windows" === this.AGa)
                    ? (this.DeviceType = 14)
                    : (this.DeviceType = 13),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          8,
          "初始化当前设备基本信息",
          ["VendorName", this.TGa],
          ["DeviceName", this.LGa],
          ["BaseProfileName", this.AGa],
          ["PhysicalGBRam", this.IGa],
          ["DeviceScore", this.DeviceScore],
          ["RHIName", this.DGa],
          ["HardwareLevel", this.RGa],
          ["DeviceType", this.DeviceType],
          ["platform", Platform_1.Platform.Type],
        );
  }
  static EGa() {
    var t =
      ConfigManager_1.ConfigManager.GameSettingsConfig.GetDeviceRenderFeatureConfigListByDeviceId(
        this.DeviceType,
      );
    if (t) {
      let e = 3;
      for (const s of t) {
        var i = new DeviceRenderFeatureData_1.DeviceRenderFeatureData(s);
        this.UGa.set(s.QualityType, i), i.IsDefault() && (e = i.QualityType);
      }
      t = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
        e,
      );
      this.GameQualitySettingLevel = t;
    }
  }
  static yGa() {
    this.IsFoldingScreen() &&
      2 === Info_1.Info.PlatformType &&
      (22 === this.DeviceType &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MobileContentScaleFactor 2",
        ),
      23 === this.DeviceType &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MobileContentScaleFactor 2.5",
        ),
      24 === this.DeviceType) &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.MobileContentScaleFactor 3",
      );
  }
  static GetDeviceReaderFeatureData(e) {
    return this.UGa.get(e);
  }
  static GetCurrentDeviceReaderFeatureData() {
    return this.UGa.get(this.GameQualitySettingLevel);
  }
  static IsIosAndAndroidHighDevice() {
    return (
      23 === this.DeviceType ||
      24 === this.DeviceType ||
      33 === this.DeviceType ||
      34 === this.DeviceType
    );
  }
  static IsAndroidPlatformNotLow() {
    return (
      22 === this.DeviceType || 23 === this.DeviceType || 24 === this.DeviceType
    );
  }
  static IsAndroidPlatformScreenBetter() {
    return 23 === this.DeviceType || 24 === this.DeviceType;
  }
  static IsAndroidPlatformScreenBad() {
    return 21 === this.DeviceType || 22 === this.DeviceType;
  }
  static IsAndroidPlatformLow() {
    return 21 === this.DeviceType;
  }
  static IsLowMemoryDevice() {
    return (
      (1 === Info_1.Info.PlatformType && this.IGa < 4) ||
      (2 === Info_1.Info.PlatformType && this.IGa <= 4)
    );
  }
  static GetD3D12Type() {
    return this.DGa.includes("D3D12") ? 1 : 0;
  }
  static IsFoldingScreen() {
    var e =
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().X /
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetAndroidRawResolution().Y;
    return (
      (e < 1.8 || 2.6 < e) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 60, "折叠屏适配", ["ScreenRatio", e]),
      !0)
    );
  }
  static IsMaliNewSocOrXclipse() {
    return !!(
      this.LGa.includes("G710") ||
      this.LGa.includes("G715") ||
      this.LGa.includes("G720") ||
      this.LGa.includes("G610") ||
      this.LGa.includes("G615") ||
      this.LGa.includes("G620") ||
      this.LGa.includes("Xclipse")
    );
  }
  static IsHuaweiNewPhone() {
    return this.TGa
      ? !!this.LGa.includes("Maleoon")
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameSettingsManager尚未初始化"),
        !1);
  }
  static IsUltraGpuDevice() {
    return this.TGa
      ? !("NVIDIA" !== this.TGa || !this.LGa.includes("RTX"))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameSettingsManager尚未初始化"),
        !1);
  }
  static Is120FrameGPU() {
    return this.TGa
      ? ("AMD" === this.TGa || "NVIDIA" === this.TGa) && 1500 < this.DeviceScore
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameQualitySettingsManager尚未初始化"),
        !1);
  }
  static IsLaptopCPU() {
    return !!(
      this.CPUBrand.includes("14900") ||
      this.CPUBrand.includes("14790") ||
      this.CPUBrand.includes("14700") ||
      this.CPUBrand.includes("14650") ||
      this.CPUBrand.includes("14600") ||
      this.CPUBrand.includes("14500") ||
      this.CPUBrand.includes("14490") ||
      this.CPUBrand.includes("14450") ||
      this.CPUBrand.includes("14400") ||
      this.CPUBrand.includes("13980") ||
      this.CPUBrand.includes("13950") ||
      this.CPUBrand.includes("13905") ||
      this.CPUBrand.includes("13900") ||
      this.CPUBrand.includes("13800") ||
      this.CPUBrand.includes("13790") ||
      this.CPUBrand.includes("13705") ||
      this.CPUBrand.includes("13700") ||
      this.CPUBrand.includes("13650") ||
      this.CPUBrand.includes("13620") ||
      this.CPUBrand.includes("13600") ||
      this.CPUBrand.includes("13500") ||
      this.CPUBrand.includes("13490") ||
      this.CPUBrand.includes("13450") ||
      this.CPUBrand.includes("13400") ||
      this.CPUBrand.includes("12950") ||
      this.CPUBrand.includes("12900") ||
      this.CPUBrand.includes("12850") ||
      this.CPUBrand.includes("12800") ||
      this.CPUBrand.includes("12700") ||
      this.CPUBrand.includes("12650") ||
      this.CPUBrand.includes("12600") ||
      this.CPUBrand.includes("12500") ||
      this.CPUBrand.includes("11980") ||
      this.CPUBrand.includes("11950") ||
      this.CPUBrand.includes("11900") ||
      this.CPUBrand.includes("11850") ||
      this.CPUBrand.includes("11800") ||
      this.CPUBrand.includes("11700") ||
      this.CPUBrand.includes("10980") ||
      this.CPUBrand.includes("10940") ||
      this.CPUBrand.includes("10920") ||
      this.CPUBrand.includes("10900") ||
      this.CPUBrand.includes("10885") ||
      this.CPUBrand.includes("10875") ||
      this.CPUBrand.includes("10870") ||
      this.CPUBrand.includes("10850") ||
      this.CPUBrand.includes("10700") ||
      this.CPUBrand.includes("9980") ||
      this.CPUBrand.includes("9940") ||
      this.CPUBrand.includes("9920") ||
      this.CPUBrand.includes("9900") ||
      this.CPUBrand.includes("9880") ||
      this.CPUBrand.includes("9820") ||
      this.CPUBrand.includes("9800") ||
      this.CPUBrand.includes("9-7900") ||
      this.CPUBrand.includes("7-7820") ||
      this.CPUBrand.includes("7-6900") ||
      this.CPUBrand.includes("9-185") ||
      this.CPUBrand.includes("7-165") ||
      this.CPUBrand.includes("7-155") ||
      this.CPUBrand.includes("5-135") ||
      this.CPUBrand.includes("5-125") ||
      this.CPUBrand.includes("9-3495") ||
      this.CPUBrand.includes("9-3475") ||
      this.CPUBrand.includes("7-3465") ||
      this.CPUBrand.includes("7-3455") ||
      this.CPUBrand.includes("7-3445") ||
      this.CPUBrand.includes("5-3435") ||
      this.CPUBrand.includes("5-3425") ||
      this.CPUBrand.includes("7-1270") ||
      this.CPUBrand.includes("7-1260") ||
      this.CPUBrand.includes("5-1250") ||
      this.CPUBrand.includes("5-1240") ||
      this.CPUBrand.includes("9700") ||
      this.CPUBrand.includes("9600") ||
      this.CPUBrand.includes("8945") ||
      this.CPUBrand.includes("8845") ||
      this.CPUBrand.includes("8840") ||
      this.CPUBrand.includes("8700") ||
      this.CPUBrand.includes("7980") ||
      this.CPUBrand.includes("7970") ||
      this.CPUBrand.includes("7960") ||
      this.CPUBrand.includes("7950") ||
      this.CPUBrand.includes("7945") ||
      this.CPUBrand.includes("7940") ||
      this.CPUBrand.includes("7900") ||
      this.CPUBrand.includes("7845") ||
      this.CPUBrand.includes("7840") ||
      this.CPUBrand.includes("7800") ||
      this.CPUBrand.includes("7745") ||
      this.CPUBrand.includes("7735") ||
      this.CPUBrand.includes("7700") ||
      this.CPUBrand.includes("6980") ||
      this.CPUBrand.includes("6900") ||
      this.CPUBrand.includes("6800") ||
      this.CPUBrand.includes("5980") ||
      this.CPUBrand.includes("5975") ||
      this.CPUBrand.includes("5965") ||
      this.CPUBrand.includes("5955") ||
      this.CPUBrand.includes("5950") ||
      this.CPUBrand.includes("5945") ||
      this.CPUBrand.includes("5900") ||
      this.CPUBrand.includes("5800") ||
      this.CPUBrand.includes("5700") ||
      this.CPUBrand.includes("4900") ||
      this.CPUBrand.includes("4800") ||
      this.CPUBrand.includes("4700") ||
      this.CPUBrand.includes("3975") ||
      this.CPUBrand.includes("3970") ||
      this.CPUBrand.includes("3960") ||
      this.CPUBrand.includes("3955") ||
      this.CPUBrand.includes("3950") ||
      this.CPUBrand.includes("3945") ||
      this.CPUBrand.includes("3900") ||
      this.CPUBrand.includes("3800") ||
      this.CPUBrand.includes("3700") ||
      this.CPUBrand.includes("2950") ||
      this.CPUBrand.includes("2920") ||
      this.CPUBrand.includes("2700") ||
      this.CPUBrand.includes("1950") ||
      this.CPUBrand.includes("1920") ||
      this.CPUBrand.includes("1900") ||
      this.CPUBrand.includes("1800") ||
      this.CPUBrand.includes("1700")
    );
  }
  static IsFrameRate120Device() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          69,
          "判断IsFrameRate120Device",
          ["this.CPUFrequency", this.CPUFrequency],
          [
            "this.CPUCoresIncludingHyperthreads",
            this.CPUCoresIncludingHyperthreads,
          ],
          ["this.IsLaptopCPU", this.IsLaptopCPU()],
          ["this.Is120FrameGPU", this.Is120FrameGPU()],
        ),
      !(
        !(
          (3200 <= this.CPUFrequency &&
            16 <= this.CPUCoresIncludingHyperthreads) ||
          this.IsLaptopCPU()
        ) || !this.Is120FrameGPU()
      )
    );
  }
  static IsMetalFxDevice() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsSupportsMetalFx();
  }
  static IsPWSDKDevice() {
    return (
      2 === Info_1.Info.PlatformType &&
      0 !== UE.PWSDKInterfaceBP.GetDeviceIRXState()
    );
  }
  static IsIRXActive() {
    return (
      2 === Info_1.Info.PlatformType &&
      2 === UE.PWSDKInterfaceBP.GetDeviceIRXState()
    );
  }
  static SetUILimitFrameMode(e) {
    this.Mka = e;
  }
  static GetIsUILimitFrameMode() {
    return this.Mka;
  }
  static TurnOffIRX() {
    this.IsPWSDKDevice() && UE.PWSDKInterfaceBP.TurnOffSRAndFRC();
  }
  static TurnOnIRX() {
    this.IsPWSDKDevice() && UE.PWSDKInterfaceBP.TurnOnSRAndFRC();
  }
  static IsNvidiaDlessPluginLoaded() {
    return (
      1 === UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.Enable")
    );
  }
  static IsNvidiaStreamlinePluginLoaded() {
    return UE.KismetSystemLibrary.GetConsoleVariableBoolValue(
      "r.Streamline.UnregisterReflexPlugin",
    );
  }
  static IsNvidiaDlssPluginLoaded() {
    return (
      1 === UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.Enable")
    );
  }
  static IsDlssGpuDevice() {
    return this.TGa
      ? !("NVIDIA" !== this.TGa || !this.LGa.includes("RTX"))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 41, "GameSettingsManager尚未初始化"),
        !1);
  }
  static IsFsrDevice() {
    var e = GameSettingsDeviceRender.IsDlssGpuDevice(),
      t = UE.XeSSBlueprintLibrary.IsXeSSSupported();
    return !e && !t && !GameSettingsDeviceRender.IsMetalFxDevice();
  }
  static IsEnableVolumeFog() {
    return this.dMe;
  }
  static CloseVolumeFog() {
    (this.dMe = !1),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.volumetricfog 0",
      );
  }
  static GetResolutionByList(e) {
    var t = this.GetResolutionList();
    return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)];
  }
  static GetResolutionList() {
    var t = [];
    if (!t.length) {
      if (
        ((this.Vve = (0, puerts_1.$ref)(UE.NewArray(UE.IntPoint))),
        UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(this.Vve))
      ) {
        var i = (0, puerts_1.$unref)(this.Vve);
        for (let e = i.Num() - 1; 0 <= e; --e) {
          var s = i.Get(e);
          s && t.push(s),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Menu", 8, "", ["resolution", s]);
        }
      }
      t.length
        ? t.sort((e, t) => (e.X === t.X ? t.Y - e.Y : t.X - e.X))
        : (t.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Menu", 41, "获取分辨率列表失败"));
    }
    return t;
  }
  static GetResolutionIndexByList(e) {
    let t = 0;
    for (const i of this.GetResolutionList()) {
      if (i.op_Equality(e)) return t;
      ++t;
    }
    return -1;
  }
  static GetDefaultScreenResolution() {
    if (!this.jve) {
      var t = this.GetResolutionList();
      if (t.length) {
        let e = t[0];
        if (
          !this.IsUltraGpuDevice() &&
          (e.X > GameSettingsDeviceRenderDefine_1.HD_SCREEN_WIDTH ||
            e.Y > GameSettingsDeviceRenderDefine_1.HD_SCREEN_HEIGHT)
        )
          for (const i of t)
            if (
              i.X < GameSettingsDeviceRenderDefine_1.HD_SCREEN_WIDTH &&
              i.Y < GameSettingsDeviceRenderDefine_1.HD_SCREEN_HEIGHT
            ) {
              e = i;
              break;
            }
        this.jve = e;
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
  static GetMobileResolutionByIndex(e) {
    return (
      1 === Info_1.Info.PlatformType
        ? [70, 80, 85, 100]
        : this.IsAndroidPlatformLow()
          ? [60, 80, 85, 90]
          : [80, 90, 100, 100]
    )[e];
  }
  static GetFrameIndexByList(e) {
    var t;
    return 1 === Info_1.Info.PlatformType
      ? GameSettingsDeviceRenderDefine_1.frameRateListIos.indexOf(e)
      : 2 === Info_1.Info.PlatformType
        ? ((t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(128)),
          this.IsIRXActive() && 1 === t
            ? GameSettingsDeviceRenderDefine_1.frameRateListAndroid.indexOf(30)
            : GameSettingsDeviceRenderDefine_1.frameRateListAndroid.indexOf(e))
        : GameSettingsDeviceRenderDefine_1.frameRateListPc.indexOf(e);
  }
  static GetFrameByList(e) {
    if (1 === Info_1.Info.PlatformType) {
      const t = MathUtils_1.MathUtils.Clamp(
        e,
        0,
        GameSettingsDeviceRenderDefine_1.frameRateListIos.length - 1,
      );
      return GameSettingsDeviceRenderDefine_1.frameRateListIos[t];
    }
    if (2 === Info_1.Info.PlatformType) {
      const t = MathUtils_1.MathUtils.Clamp(
        e,
        0,
        GameSettingsDeviceRenderDefine_1.frameRateListAndroid.length - 1,
      );
      return GameSettingsDeviceRenderDefine_1.frameRateListAndroid[t];
    }
    const t = MathUtils_1.MathUtils.Clamp(
      e,
      0,
      GameSettingsDeviceRenderDefine_1.frameRateListPc.length - 1,
    );
    return GameSettingsDeviceRenderDefine_1.frameRateListPc[t];
  }
  static ApplyFrameRate(e) {
    this.xGa = MathUtils_1.MathUtils.Clamp(e, 24, 120);
    (e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(128)),
      this.IsIRXActive() && 1 === e && (this.xGa = 30),
      (this.PGa = 1 / this.xGa),
      (e = UE.GameUserSettings.GetGameUserSettings());
    let t = this.xGa;
    0 < this.yve && (t = this.yve),
      e.SetFrameRateLimit(t),
      e.ApplySettings(!0),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(801, t.toString()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SettingFrameRateChanged,
        t,
      );
  }
  static get FrameRate() {
    return this.xGa;
  }
  static get FrameSeconds() {
    return this.PGa;
  }
  static GetMaxRoleShadowNum() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return (
      Info_1.Info.IsPcOrGamepadPlatform()
        ? GameSettingsDeviceRenderDefine_1.maxRoleShadowNumWithGameGraphQualityPc
        : GameSettingsDeviceRenderDefine_1.maxRoleShadowNumWithGameGraphQualityMobile
    )[e];
  }
  static GetMaxRoleShadowDistance() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return (
      Info_1.Info.IsPcOrGamepadPlatform()
        ? GameSettingsDeviceRenderDefine_1.maxRoleShadowDistanceWithGameGraphQualityPc
        : GameSettingsDeviceRenderDefine_1.maxRoleShadowDistanceWithGameGraphQualityMobile
    )[e];
  }
  static GetMaxDecalShadowDistance() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return (
      Info_1.Info.IsPcOrGamepadPlatform()
        ? GameSettingsDeviceRenderDefine_1.maxDecalShadowDistanceWithGameGraphQualityPc
        : GameSettingsDeviceRenderDefine_1.maxDecalShadowDistanceWithGameGraphQualityMobile
    )[e];
  }
  static IsMainPlayerUseRealRoleShadow() {
    var e = GameSettingsDeviceRender.GameQualitySettingLevel;
    return GameSettingsDeviceRenderDefine_1.mainPlayerRealShadow[e];
  }
  static SetFrameRateTemploary(e) {
    (this.yve = MathUtils_1.MathUtils.Clamp(e, 24, 120)),
      (this.PGa = 1 / this.yve);
  }
  static SetSequenceFrameRateLimit() {
    1 === Info_1.Info.PlatformType
      ? 45 < this.xGa &&
        (this.SetFrameRateTemploary(30), this.ApplyFrameRate(this.xGa))
      : 2 === Info_1.Info.PlatformType &&
        40 < this.xGa &&
        (this.SetFrameRateTemploary(30), this.ApplyFrameRate(this.xGa)),
      Info_1.Info.IsMobilePlatform() &&
        this.TryReduceCsmUpdateFrequency("Plot");
  }
  static CancleSequenceFrameRateLimit() {
    this.CancelFrameRateTemploary(),
      this.ApplyFrameRate(this.xGa),
      (1 !== Info_1.Info.PlatformType && 2 !== Info_1.Info.PlatformType) ||
        this.TryRestoreCsmUpdateFrequency("Plot");
  }
  static CancelFrameRateTemploary() {
    (this.yve = 0), (this.PGa = 1 / this.xGa);
  }
  static TryReduceCsmUpdateFrequency(e) {
    var t = this.Tve.size;
    this.Tve.add(e), 0 === t && 1 === this.Tve.size && this.Gve();
  }
  static TryRestoreCsmUpdateFrequency(e) {
    this.Tve.delete(e) && 0 === this.Tve.size && this.Nve();
  }
  static Nve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.CSMMode3EnableUpdateIntervalOverride 0",
    ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.PSO.IOSCompilationTimeLimit 2.0",
      );
  }
  static Gve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.CSMMode3EnableUpdateIntervalOverride 1",
    ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        'r.Shadow.CacheMode3CacheUpdateIntervalsOverride "3000,3000,3000,3000,3000,3000"',
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.PSO.IOSCompilationTimeLimit 0.1",
      );
  }
  static RefreshPerformanceLimit(e) {
    let i = 0,
      s = 0;
    this.PerformanceLimitRunning.forEach((e, t) => {
      e.FrameLimit && i++, e.CacheWorldFrame && s++;
    }),
      Info_1.Info.IsPcOrGamepadPlatform() ||
        (0 < i
          ? (this.SetUILimitFrameMode(!0),
            this.SetFrameRateTemploary(30),
            this.TurnOffIRX())
          : (this.SetUILimitFrameMode(!1),
            this.CancelFrameRateTemploary(),
            1 ===
              GameSettingsManager_1.GameSettingsManager.GetCurrentValue(128) &&
              this.TurnOnIRX()),
        this.ApplyFrameRate(this.xGa)),
      1 === s
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.CacheSceneColor.Start",
          ),
          (this.InCacheSceneColorMode = 1))
        : 0 === s &&
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.CacheSceneColor.Stop",
          ),
          (this.InCacheSceneColorMode = 0)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:RefreshPerformanceLimit result",
          ["reason", e],
          ["frameLimit", i],
          ["cacheWorldFrame", s],
        );
  }
  static ApplyPerformanceLimit(e) {
    var t;
    GameSettingsDeviceRenderDefine_1.performanceLimitConfigs.has(e) &&
      (t = GameSettingsDeviceRenderDefine_1.performanceLimitConfigs.get(e)) &&
      (this.PerformanceLimitRunning.set(e, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:ApplyPerformanceLimit",
          ["source", e],
          ["frameLimit", t.FrameLimit],
          ["cacheWorldFrame", t.CacheWorldFrame],
        ),
      this.RefreshPerformanceLimit(e));
  }
  static CancelPerformanceLimit(e) {
    this.PerformanceLimitRunning.delete(e) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:CancelPerformanceLimit",
          ["source", e],
        ),
      this.RefreshPerformanceLimit(e));
  }
  static ApplyPerformanceSeqLimit(e) {
    this.ApplyPerformanceLimit(
      e + GameSettingsDeviceRenderDefine_1.PERFORMENCELIMIT_SEQ_TAIL,
    );
  }
  static CancelPerformanceSeqLimit(e) {
    this.CancelPerformanceLimit(
      e + GameSettingsDeviceRenderDefine_1.PERFORMENCELIMIT_SEQ_TAIL,
    );
  }
  static CancelAllPerformanceLimit() {
    this.PerformanceLimitRunning.clear(),
      this.CancelFrameRateTemploary(),
      this.ApplyFrameRate(this.xGa),
      this.RefreshPerformanceLimit("[CancelAll]");
  }
  static SetIsAutoAdjustImageQuality(e) {
    e
      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Kuro.AutoCoolUIEnable 1",
        )
      : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Kuro.AutoCoolUIEnable 0",
        ),
        KuroAutoCoolController_1.KuroAutoCoolController.RestoreLastConfig());
  }
}
((exports.GameSettingsDeviceRender = GameSettingsDeviceRender).UGa = new Map()),
  (GameSettingsDeviceRender.GameQualitySettingLevel = 3),
  (GameSettingsDeviceRender.IGa = 0),
  (GameSettingsDeviceRender.CPUFrequency = 0),
  (GameSettingsDeviceRender.CPUCores = 0),
  (GameSettingsDeviceRender.CPUCoresIncludingHyperthreads = 0),
  (GameSettingsDeviceRender.CPUBrand = ""),
  (GameSettingsDeviceRender.DriverDate = "Unknown"),
  (GameSettingsDeviceRender.TGa = ""),
  (GameSettingsDeviceRender.LGa = ""),
  (GameSettingsDeviceRender.AGa = ""),
  (GameSettingsDeviceRender.DeviceScore = 0),
  (GameSettingsDeviceRender.DGa = ""),
  (GameSettingsDeviceRender.RGa = 0),
  (GameSettingsDeviceRender.DeviceType = 14),
  (GameSettingsDeviceRender.dMe = !0),
  (GameSettingsDeviceRender.jve = void 0),
  (GameSettingsDeviceRender.Vve = void 0),
  (GameSettingsDeviceRender.yve = 0),
  (GameSettingsDeviceRender.xGa = 0),
  (GameSettingsDeviceRender.PGa = -0),
  (GameSettingsDeviceRender.Tve = new Set()),
  (GameSettingsDeviceRender.PerformanceLimitRunning = new Map()),
  (GameSettingsDeviceRender.InCacheSceneColorMode = 0),
  (GameSettingsDeviceRender.Mka = !1);
//# sourceMappingURL=GameSettingsDeviceRender.js.map
