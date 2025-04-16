"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsManager = void 0);
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  CommonDefine_1 = require("../../Core/Define/CommonDefine"),
  CloudGameManagerLauncher_1 = require("../../Launcher/Platform/CloudGameManagerLauncher"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  LauncherGameSettingLib_1 = require("../../Launcher/Util/LauncherGameSettingLib"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  CloudGameManager_1 = require("../Manager/CloudGameManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GameSettingsDefine_1 = require("./GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender"),
  GameSettingsInitValueSource_1 = require("./Misc/GameSettingsInitValueSource");
class GameSettingsManager {
  static get ValidApplyConfigMap() {
    if (void 0 === this.Jlc) {
      this.Jlc = new Map();
      for (const i of ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig()) {
        var [e, t] = this.CheckConfigValidByCheckList(i);
        e
          ? this.e_c(i) || i.FunctionId in GameSettingsDefine_1.EFunction
            ? this.Jlc.has(i.FunctionId)
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "GameSettings",
                  64,
                  "可应用的选项出现冲突，请认真检查配置【CheckList】",
                  ["出现冲突的functionId", i.FunctionId],
                  ["已保存的设置id", this.Jlc.get(i.FunctionId)?.Id],
                  ["发生冲突的设置id", i.Id],
                )
              : this.Jlc.set(i.FunctionId, i)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GameSettings",
                64,
                "存在未注册在EFunction中的功能（非按键），视作该功能不存在",
                ["cfg id", i.Id],
                ["cfg FunctionId", i.FunctionId],
              )
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "GameSettings",
              64,
              "非法设置项",
              ["cfg id", i.Id],
              ["cfg FunctionId", i.FunctionId],
              ["reason", t],
            );
      }
    }
    return this.Jlc;
  }
  static CheckConfigValidByCheckList(e) {
    var t,
      [i, n] = this.t_c(e);
    return i
      ? (([i, t] = this.i_c(e.FunctionId)),
        i
          ? (([i, e] = this.r_c(e)),
            i ? [!0, "NONE"] : [!1, "CheckDeviceExtra:" + e])
          : [!1, "CheckDeviceVendor:" + t])
      : [!1, "CheckPlatform:" + n];
  }
  static r_c(e) {
    e = e.Device;
    return "isNotVeryHigh" === e
      ? [
          15 !== GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType,
          "isNotVeryHigh",
        ]
      : "isVeryHigh" === e
        ? [
            15 ===
              GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType,
            "isVeryHigh",
          ]
        : "isNotAndroidVeryHigh" === e
          ? [
              !(
                Info_1.Info.IsAndroidPlatform() &&
                GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighestResolutionDevice()
              ),
              "isNotAndroidVeryHigh",
            ]
          : "isAndroidVeryHigh" === e
            ? [
                Info_1.Info.IsAndroidPlatform() &&
                  GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidHighestResolutionDevice(),
                "isAndroidVeryHigh",
              ]
            : "isLowMemory" === e
              ? [
                  GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsLowMemoryDevice(),
                  "isLowMemory",
                ]
              : "isNotLowMemory" === e
                ? [
                    !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsLowMemoryDevice(),
                    "isNotLowMemory",
                  ]
                : "isNot120Frame" === e
                  ? [
                      !(
                        (Info_1.Info.IsPcOrGamepadPlatform() &&
                          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120Device()) ||
                        (Info_1.Info.IsIosPlatform() &&
                          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120IOSDevice()) ||
                        (Info_1.Info.IsMacPlatform() &&
                          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120MacDevice())
                      ),
                      "isNot120Frame",
                    ]
                  : "is120Frame" === e
                    ? [
                        (Info_1.Info.IsPcOrGamepadPlatform() &&
                          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120Device()) ||
                          (Info_1.Info.IsIosPlatform() &&
                            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120IOSDevice()) ||
                          (Info_1.Info.IsMacPlatform() &&
                            GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120MacDevice()),
                        "is120Frame",
                      ]
                    : "isCloudGame" === e
                      ? [Platform_1.Platform.IsCloudGame(), "isCloudGame"]
                      : "isMac" === e
                        ? [Info_1.Info.IsMacPlatform(), "isMac"]
                        : "isNotMac" === e
                          ? [!Info_1.Info.IsMacPlatform(), "isNotMac"]
                          : "isMetalSupport" === e
                            ? [
                                GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice(),
                                "isMetalSupport",
                              ]
                            : "isRedMagic" === e
                              ? [
                                  GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic(),
                                  "isRedMagic",
                                ]
                              : "isNotRedMagic" === e
                                ? [
                                    !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic(),
                                    "isNotRedMagic",
                                  ]
                                : [!0, "DEFAULT"];
  }
  static i_c(e) {
    var t =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice(),
      i = UE.XeSSBlueprintLibrary.IsXeSSSupported(),
      n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFsrDevice(),
      a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsPWSDKDevice(),
      s =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3GpuDevice(),
      r = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsVulkanDevice(),
      o =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsShowRayTracingSetting(),
      g = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLumenGISupported() && o,
      _ =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLumenReflectionsSupported() &&
        o,
      m =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingShadowsSupported(),
      S = UE.KismetRenderingLibrary.IsSupportedAFME();
    switch (e) {
      case GameSettingsDefine_1.EFunction.NVIDIADLSS:
        return [t, "EFunction.NVIDIADLSS"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSFG:
        return [s, "EFunction.NVIDIADLSSFG"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY:
        return [t, "EFunction.NVIDIADLSSQUALITY"];
      case GameSettingsDefine_1.EFunction.NVIDIADLSSSHARPNESS:
        return [t, "EFunction.NVIDIADLSSFG"];
      case GameSettingsDefine_1.EFunction.NVIDIAREFLEX:
        return [t, "EFunction.NVIDIAREFLEX"];
      case GameSettingsDefine_1.EFunction.FSR:
        return [n, "EFunction.FSR"];
      case GameSettingsDefine_1.EFunction.IRX:
        return [a, "EFunction.IRX"];
      case GameSettingsDefine_1.EFunction.METALFX:
        return [
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice(),
          "EFunction.METALFX",
        ];
      case GameSettingsDefine_1.EFunction.XESS:
        return [i, "EFunction.XESS"];
      case GameSettingsDefine_1.EFunction.XESS_QUALITY:
        return [i, "EFunction.XESS_QUALITY"];
      case GameSettingsDefine_1.EFunction.SCENEAO:
        return [
          !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBad() &&
            1 !== Info_1.Info.PlatformType,
          "EFunction.SCENEAO",
        ];
      case GameSettingsDefine_1.EFunction.VOLUMEFOG:
        return [!Info_1.Info.IsMacPlatform(), "EFunction.VOLUMEFOG"];
      case GameSettingsDefine_1.EFunction.DOLBYATOMS:
        return [
          UE.KuroAudioStatics.IsDolbyAtmosGameSupported(),
          "EFunction.DOLBYATOMS",
        ];
      case GameSettingsDefine_1.EFunction.RayTracing:
        return [o, "EFunction.RayTracing"];
      case GameSettingsDefine_1.EFunction.RayTracedGI:
        return [g, "EFunction.RayTracedGI"];
      case GameSettingsDefine_1.EFunction.RayTracedReflection:
        return [_, "EFunction.RayTracedReflection"];
      case GameSettingsDefine_1.EFunction.RayTracedShadow:
        return [m, "EFunction.RayTracedShadow"];
      case GameSettingsDefine_1.EFunction.AdrenoFME:
        return [S, "EFunction.AdrenoFME"];
      case GameSettingsDefine_1.EFunction.Vulkan:
        return [r, "EFunction.Vulkan"];
      default:
        return [!0, "DEFAULT"];
    }
  }
  static t_c(e) {
    switch (e.Platform) {
      case 1:
        return [
          Info_1.Info.IsPcOrGamepadPlatform() &&
            !Platform_1.Platform.IsCloudGame(),
          "EMenuConfigPlatform.PC_OR_PS",
        ];
      case 2:
        return [
          Info_1.Info.IsMobilePlatform() || Platform_1.Platform.IsCloudGame(),
          "EMenuConfigPlatform.MOBILE",
        ];
      case 3:
        return [Info_1.Info.IsAndroidPlatform(), "EMenuConfigPlatform.ANDROID"];
      case 4:
        return [Info_1.Info.IsIosPlatform(), "EMenuConfigPlatform.IOS"];
      case 5:
        return [Info_1.Info.IsPs5Platform(), "EMenuConfigPlatform.PlayStation"];
      case 6:
        return [Info_1.Info.IsPcPlatform(), "EMenuConfigPlatform.PC_ONLY"];
      case 0:
        return [!0, "EMenuConfigPlatform.NORMAL"];
      default:
        return [!1, "DEFAULT"];
    }
  }
  static e_c(e) {
    return (
      e.MainType === GameSettingsDefine_1.MAIN_TYPE_OF_KEY_SETTING &&
      e.FunctionId !== GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode &&
      e.FunctionId !== GameSettingsDefine_1.EFunction.GamepadLockEnemyMode
    );
  }
  static o_c(e, t) {
    this.n_c
      .get(GameSettingsDefine_1.EFunction.IMAGEQUALITY)
      ?.CacheValue(e.QualityType, t);
    for (var [
      i,
      n,
    ] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(
      e,
    ))
      this.n_c.get(i)?.CacheValue(n, t);
  }
  static s_c(e) {
    var t,
      i = GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey,
      i = LocalStorage_1.LocalStorage.GetGlobal(i);
    void 0 !== i &&
      i < 50 &&
      ((t = Math.floor(22.22 + 0.555 * i)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          64,
          "[ViewSensitivity]转化视角灵敏度",
          ["functionId", e],
          ["value", i],
          ["newValue", t],
        ),
      this.n_c.get(e)?.CacheValue(t, 0));
  }
  static a_c(e, t, i) {
    e = e.get(t);
    void 0 !== e && this.n_c.get(t)?.CacheValue(e, i);
  }
  static h_c() {
    this.l_c(), this.__c(), this.c_c(), this.u_c(), this.LGc(), this.Zi1();
  }
  static l_c() {
    LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity,
      !1,
    ) ||
      (Info_1.Info.IsPcPlatform() &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Menu", 64, " [ViewSensitivity]转化Pc视角灵敏度"),
        this.s_c(GameSettingsDefine_1.EFunction.HorizontalViewSensitivity),
        this.s_c(GameSettingsDefine_1.EFunction.VerticalViewSensitivity),
        this.s_c(GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity),
        this.s_c(GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity)),
      Info_1.Info.IsMobilePlatform() &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Menu", 64, "[ViewSensitivity]转化Mobile视角灵敏度"),
        this.s_c(
          GameSettingsDefine_1.EFunction.MobileHorizontalViewSensitivity,
        ),
        this.s_c(GameSettingsDefine_1.EFunction.MobileVerticalViewSensitivity),
        this.s_c(
          GameSettingsDefine_1.EFunction.MobileAimHorizontalViewSensitivity,
        ),
        this.s_c(
          GameSettingsDefine_1.EFunction.MobileAimVerticalViewSensitivity,
        )),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity,
        !0,
      ));
  }
  static __c() {
    var e = UE.KismetSystemLibrary.GetCommandLine();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Menu", 64, "根据命令行判断是否为全屏模式", [
        "commandLine",
        e,
      ]),
      e.includes("-windowed") &&
        this.n_c
          .get(GameSettingsDefine_1.EFunction.DISPLAYMODE)
          ?.CacheValue(1, 0);
  }
  static c_c() {
    var e;
    Platform_1.Platform.IsCloudGame() &&
      (void 0 ===
      (e =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature())
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameSettings",
            64,
            "云游戏时不能获得渲染Feature预设值",
          )
        : this.o_c(e, 0),
      this.n_c.get(GameSettingsDefine_1.EFunction.NVIDIADLSS)?.CacheValue(1, 0),
      this.n_c
        .get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY)
        ?.CacheValue(0, 0),
      CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) &&
      (0 !== CloudGameManager_1.CloudGameManager.ScreenWidth &&
        ((e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(
          new UE.IntPoint(
            CloudGameManager_1.CloudGameManager.ScreenWidth,
            CloudGameManager_1.CloudGameManager.ScreenHeight,
          ),
        ),
        e.ApplySettings(!0)),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "CloudGame",
        16,
        "初始化游戏设置 - 云游戏预启动分辨率设置",
        [
          "CloudGameManager.ScreenWidth",
          CloudGameManager_1.CloudGameManager.ScreenWidth,
        ],
        [
          "CloudGameManager.ScreenHeight",
          CloudGameManager_1.CloudGameManager.ScreenHeight,
        ],
      );
  }
  static ApplyCloudGameResolution() {
    var e;
    CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch &&
      (0 !== CloudGameManager_1.CloudGameManager.ScreenWidth &&
        ((e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(
          new UE.IntPoint(
            CloudGameManager_1.CloudGameManager.ScreenWidth,
            CloudGameManager_1.CloudGameManager.ScreenHeight,
          ),
        ),
        e.ApplySettings(!0)),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "CloudGame",
        16,
        "初始化游戏设置 - 云游戏预启动分辨率设置",
        [
          "CloudGameManager.ScreenWidth",
          CloudGameManager_1.CloudGameManager.ScreenWidth,
        ],
        [
          "CloudGameManager.ScreenHeight",
          CloudGameManager_1.CloudGameManager.ScreenHeight,
        ],
      );
  }
  static u_c() {
    var e = this.ValidApplyConfigMap.get(
        GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY,
      ),
      t = this.n_c.get(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY);
    void 0 === e ||
      void 0 === t ||
      ((e = e.OptionsDefault),
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HasRefreshNvidiaDlssQuality,
      )) ||
      (t.CacheValue(e, 0),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HasRefreshNvidiaDlssQuality,
        !0,
      ));
  }
  static LGc() {
    var e = this.ValidApplyConfigMap.get(
        GameSettingsDefine_1.EFunction.NVIDIADLSSFG,
      ),
      t = this.n_c.get(GameSettingsDefine_1.EFunction.NVIDIADLSSFG);
    void 0 !== e &&
      void 0 !== t &&
      ((e = e.OptionsDefault),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3HardwareSchedulingDisabled()) &&
      t.CacheValue(e, 0);
  }
  static d_c() {
    var e, t;
    ModelManager_1.ModelManager.RecommendQualityModel.IsNeedApply &&
      ((t = this.n_c.get(GameSettingsDefine_1.EFunction.IMAGEQUALITY)),
      (e = ModelManager_1.ModelManager.RecommendQualityModel.NeedApplyQuality),
      t?.CacheValue(e, 0),
      void 0 !==
        (t =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(
            e,
          )) && this.o_c(t, 0),
      (ModelManager_1.ModelManager.RecommendQualityModel.IsNeedApply = !1));
  }
  static Zi1() {
    var e = this.ValidApplyConfigMap.get(
        GameSettingsDefine_1.EFunction.BRIGHTNESS,
      ),
      t = this.n_c.get(GameSettingsDefine_1.EFunction.BRIGHTNESS);
    void 0 === e ||
      void 0 === t ||
      ((e = e.OptionsDefault),
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HasResetBrightness,
      )) ||
      (t.CacheValue(e, 0),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HasResetBrightness,
        !0,
      ));
  }
  static m_c() {
    for (var [t, i] of this.n_c) {
      var n =
        GameSettingsDefine_1.function2GameSettings[t].GetCallbackOrGlobalKey;
      if ("number" == typeof n) {
        (n = LocalStorage_1.LocalStorage.GetGlobal(n)),
          (t = this.ValidApplyConfigMap.get(t));
        if (void 0 !== n) {
          let e = !0;
          (e = 2 === t?.SetType ? t.OptionsValue.includes(n) : e) &&
            i.CacheValue(n, 1);
        }
      }
    }
  }
  static f_c() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.TextLanguage,
    );
    void 0 !== e &&
      this.n_c
        .get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)
        ?.CacheValue(e, 2),
      void 0 !==
        (e = LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.VoiceLanguage,
        )) &&
        this.n_c
          .get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)
          ?.CacheValue(e, 2);
  }
  static g_c() {
    var e = LauncherGameSettingLib_1.LauncherGameSettingLib.LoadPlayMenuInfo();
    void 0 !== e &&
      (this.a_c(e, GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, 3),
      this.a_c(e, GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, 3),
      this.a_c(e, GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, 3),
      this.a_c(e, GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, 3),
      this.a_c(e, GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, 3),
      this.a_c(e, GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, 3),
      void 0 !==
        (e = this.GetCurrentValue(
          GameSettingsDefine_1.EFunction.HIGHESTFPS,
        ))) &&
      10 < e &&
      this.n_c
        .get(GameSettingsDefine_1.EFunction.HIGHESTFPS)
        ?.CacheValue(
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameIndexByList(
            e,
          ),
          3,
        );
  }
  static C_c() {
    var e,
      t,
      i = new Map(),
      n = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualitySetting,
      ),
      n =
        (void 0 !== n &&
          (i.set(
            GameSettingsDefine_1.EFunction.IMAGEQUALITY,
            n.KeyQualityLevel,
          ),
          i.set(GameSettingsDefine_1.EFunction.DISPLAYMODE, n.KeyPcWindowMode),
          i.set(GameSettingsDefine_1.EFunction.BRIGHTNESS, n.KeyBrightness),
          i.set(GameSettingsDefine_1.EFunction.FSR, n.KeyFsrEnable),
          i.set(GameSettingsDefine_1.EFunction.XESS, n.KeyXessEnable ?? 1),
          i.set(
            GameSettingsDefine_1.EFunction.XESS_QUALITY,
            n.KeyXessQuality ?? 2,
          ),
          i.set(GameSettingsDefine_1.EFunction.METALFX, n.KeyMetalFxEnable),
          i.set(GameSettingsDefine_1.EFunction.IRX, n.KeyIrxEnable ?? 1),
          i.set(
            GameSettingsDefine_1.EFunction.HorizontalViewSensitivity,
            n.HorizontalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.VerticalViewSensitivity,
            n.VerticalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity,
            n.AimHorizontalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity,
            n.AimVerticalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.MobileHorizontalViewSensitivity,
            n.MobileHorizontalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.MobileVerticalViewSensitivity,
            n.MobileVerticalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.MobileAimHorizontalViewSensitivity,
            n.MobileAimHorizontalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.MobileAimVerticalViewSensitivity,
            n.MobileAimVerticalViewSensitivity,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.CommonSpringArmLength,
            n.CommonSpringArmLength,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.FightSpringArmLength,
            n.FightSpringArmLength,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.ResetFocusEnable,
            n.IsResetFocusEnable,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.IsSidestepCameraEnable,
            n.IsSidestepCameraEnable,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.IsSoftLockCameraEnable,
            n.IsSoftLockCameraEnable,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.JoystickShakeStrength,
            n.JoystickShakeStrength,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.JoystickShakeType,
            n.JoystickShakeType,
          ),
          i.set(GameSettingsDefine_1.EFunction.JoystickMode, n.JoystickMode),
          i.set(
            GameSettingsDefine_1.EFunction.SkillButtonMode,
            n.IsAutoSwitchSkillButtonMode,
          ),
          i.set(GameSettingsDefine_1.EFunction.AimAssist, n.AimAssistEnable),
          i.set(
            GameSettingsDefine_1.EFunction.HorizontalViewRevert,
            n.HorizontalViewRevert,
          ),
          i.set(
            GameSettingsDefine_1.EFunction.VerticalViewRevert,
            n.VerticalViewRevert,
          ),
          i.set(GameSettingsDefine_1.EFunction.WalkOrRunRate, n.WalkOrRunRate),
          i.set(
            GameSettingsDefine_1.EFunction.CameraShakeStrength,
            LocalStorage_1.LocalStorage.GetGlobal(
              LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
            ),
          )),
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData,
        ));
    void 0 !== n &&
      (i.set(
        GameSettingsDefine_1.EFunction.CameraShakeStrength,
        n.get(GameSettingsDefine_1.EFunction.CameraShakeStrength),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION,
        n.get(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION,
        n.get(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION,
        n.get(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION,
        n.get(GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION,
        n.get(GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION,
        n.get(GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.RESOLUTION,
        n.get(GameSettingsDefine_1.EFunction.RESOLUTION),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.TEXTLANGUAGE,
        n.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.VOICELANGUAGE,
        n.get(GameSettingsDefine_1.EFunction.VOICELANGUAGE),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.ADVICESETTING,
        n.get(GameSettingsDefine_1.EFunction.ADVICESETTING),
      ),
      i.set(
        GameSettingsDefine_1.EFunction.GENDERSETTING,
        n.get(GameSettingsDefine_1.EFunction.GENDERSETTING),
      ));
    for ([e, t] of i) void 0 !== t && this.n_c.get(e)?.CacheValue(t, 4);
  }
  static p_c() {
    var e = LauncherGameSettingLib_1.LauncherGameSettingLib.LoadPlayMenuInfo();
    void 0 !== e &&
      (this.a_c(e, GameSettingsDefine_1.EFunction.CameraShakeStrength, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.SFXVOLUMEFUNCTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.AMBVOLUMEFUNCTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.UIVOLUMEFUNCTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.RESOLUTION, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.TEXTLANGUAGE, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.VOICELANGUAGE, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.ADVICESETTING, 5),
      this.a_c(e, GameSettingsDefine_1.EFunction.GENDERSETTING, 5));
  }
  static v_c() {
    var e =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultDeviceRenderFeature();
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("GameSettings", 64, "当前机型没有设置默认画质", [
          "当前机型",
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType,
        ])
      : this.o_c(e, 6);
  }
  static y_c() {
    this.n_c
      .get(GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode)
      ?.CacheValue(1, 7),
      this.n_c
        .get(GameSettingsDefine_1.EFunction.GamepadLockEnemyMode)
        ?.CacheValue(1, 7);
  }
  static S_c() {
    var e = UE.GameUserSettings.GetGameUserSettings(),
      t =
        void 0 === e
          ? GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX
          : GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(
              e.GetScreenResolution(),
            ),
      t =
        (this.n_c
          .get(GameSettingsDefine_1.EFunction.RESOLUTION)
          ?.CacheValue(t, 9),
        e?.GetFullscreenMode());
    if (void 0 !== t)
      switch (t) {
        case 0:
        case 1:
          this.n_c
            .get(GameSettingsDefine_1.EFunction.DISPLAYMODE)
            ?.CacheValue(0, 9);
          break;
        case 2:
          this.n_c
            .get(GameSettingsDefine_1.EFunction.DISPLAYMODE)
            ?.CacheValue(1, 9);
      }
    LanguageSystem_1.LanguageSystem.FirstTimeSetLanguage(
      GlobalData_1.GlobalData.World,
    );
    (e = this.M_c(LanguageSystem_1.LanguageSystem.PackageLanguage)),
      (t = this.E_c(e));
    this.n_c.get(GameSettingsDefine_1.EFunction.TEXTLANGUAGE)?.CacheValue(e, 9),
      this.n_c
        .get(GameSettingsDefine_1.EFunction.VOICELANGUAGE)
        ?.CacheValue(t, 9),
      this.n_c
        .get(GameSettingsDefine_1.EFunction.Vulkan)
        ?.CacheValue(
          0 <
            UE.KismetSystemLibrary.GetConsoleVariableIntValue(
              "r.Android.DisableVulkanSupport",
            )
            ? 0
            : 1,
          9,
        );
  }
  static I_c() {
    for (var [t, i] of this.ValidApplyConfigMap) {
      let e = void 0;
      switch (i.SetType) {
        case 1:
          e = i.SliderDefault;
          break;
        case 2:
        case 4:
        case 5:
          e = i.OptionsDefault;
      }
      void 0 !== e && this.n_c.get(t)?.CacheValue(e, 8);
    }
  }
  static M_c(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(e);
    return t
      ? t.LanguageType
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Menu", 10, "LanguageSystem 未定义此语种", [
            "非法值",
            e,
          ]),
        this.M_c(CommonDefine_1.ENGLISH_ISO639_1));
  }
  static E_c(e) {
    return LanguageSystem_1.LanguageSystem.GetSpeechTypeByLanguageType(e);
  }
  static IsValid(e) {
    return this.ValidApplyConfigMap.has(e);
  }
  static Initialize() {
    this.n_c.clear();
    for (var [e, t] of this.ValidApplyConfigMap)
      this.e_c(t) ||
        this.n_c.set(
          e,
          new GameSettingsInitValueSource_1.GameSettingsInitValueSource(e),
        );
    this.h_c(),
      this.m_c(),
      this.f_c(),
      this.g_c(),
      this.C_c(),
      this.p_c(),
      this.v_c(),
      this.y_c(),
      this.S_c(),
      this.I_c(),
      this.IsValid(GameSettingsDefine_1.EFunction.DISPLAYMODE) &&
        this.IsValid(GameSettingsDefine_1.EFunction.RESOLUTION) &&
        (void 0 !==
          (i = this.GetInitValue(GameSettingsDefine_1.EFunction.DISPLAYMODE)) &&
          this.T_c(GameSettingsDefine_1.EFunction.DISPLAYMODE, i, 2),
        void 0 !==
          (n = this.GetInitValue(GameSettingsDefine_1.EFunction.RESOLUTION))) &&
        1 === i &&
        this.T_c(GameSettingsDefine_1.EFunction.RESOLUTION, n, 2);
    var i = this.GetInitValue(GameSettingsDefine_1.EFunction.TEXTLANGUAGE),
      n =
        (this.IsValid(GameSettingsDefine_1.EFunction.TEXTLANGUAGE) &&
          void 0 !== i &&
          this.T_c(GameSettingsDefine_1.EFunction.TEXTLANGUAGE, i, 2),
        this.GetInitValue(GameSettingsDefine_1.EFunction.VOICELANGUAGE));
    this.IsValid(GameSettingsDefine_1.EFunction.VOICELANGUAGE) &&
      void 0 !== n &&
      this.T_c(GameSettingsDefine_1.EFunction.VOICELANGUAGE, n, 2);
  }
  static HandleInitDataOnOpenLoading() {
    this.d_c();
    for (var [e] of this.n_c) {
      var t = this.GetInitValue(e);
      void 0 !== t && this.b_c(e, t);
    }
    for (var [i] of this.n_c) {
      var n = this.GetInitValue(i);
      void 0 !== n && this.HandleValueChange(i, n, 3);
    }
  }
  static Clear() {}
  static GetCurrentValue(e, t = !0) {
    if (this.IsValid(e)) {
      var i = GameSettingsDefine_1.function2GameSettings[e];
      if (void 0 !== i)
        return "function" == typeof (i = i.GetCallbackOrGlobalKey)
          ? i()
          : void 0 !== (i = LocalStorage_1.LocalStorage.GetGlobal(i))
            ? i
            : void (
                t &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "GameSettings",
                  64,
                  "【GetCurrent】当前选项未被保存在LocalStorage中",
                  ["functionId", e],
                )
              );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameSettings",
          64,
          "【GetCurrent】当前选项未能获取IGameSettings句柄",
          ["functionId", e],
        );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "GameSettings",
          64,
          "在【GetCurrent】一个不符合条件的值",
          ["functionId", e],
        );
  }
  static GetCurrentValueSafely(e, t = 0) {
    var i = this.GetCurrentValue(e, !1);
    return void 0 !== i
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameSettings",
            64,
            "【GetCurrentValueSafely】使用【Current】",
            ["functionId", e],
            ["value", i],
          ),
        i)
      : void 0 !== (i = this.GetInitValue(e, !1))
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameSettings",
              64,
              "【GetCurrentValueSafely】使用【Init】",
              ["functionId", e],
              ["value", i],
            ),
          i)
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "GameSettings",
              64,
              "【GetCurrentValueSafely】当前选项不能正确获取数据来源, 使用【缺省值】",
              ["functionId", e],
              ["defaultValue", t],
            ),
          t);
  }
  static GetInitValue(e, t = !0) {
    var i = this.n_c.get(e);
    if (void 0 !== i) return i.ValidInitValue;
    t &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "GameSettings",
        64,
        "【GetInitValue】当前选项不能正确获取数据来源",
        ["functionId", e],
      );
  }
  static T_c(e, t, i) {
    var n;
    return this.IsValid(e)
      ? void 0 ===
        (n = GameSettingsDefine_1.function2GameSettings[e].ApplyCallback)
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameSettings", 64, "该设置项不必应用", [
              "functionId",
              e,
            ]),
          !0)
        : n(t, i)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("GameSettings", 64, "在【应用】一个不符合条件的值", [
            "functionId",
            e,
          ]),
        !1);
  }
  static b_c(e, t) {
    var i;
    return this.IsValid(e)
      ? "function" ==
        typeof (i =
          GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey)
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "GameSettings",
              64,
              "getter不必【Save】LocalStorage",
              ["functionId", e],
            ),
          !1)
        : (LocalStorage_1.LocalStorage.SetGlobal(i, t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameSettings",
              64,
              "设置项【Save】成功",
              ["functionId", e],
              ["value", t],
            ),
          !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("GameSettings", 64, "在【Save】一个不符合条件的值", [
            "functionId",
            e,
          ]),
        !1);
  }
  static ForceSaveValue(e, t) {
    var i =
      GameSettingsDefine_1.function2GameSettings[e].GetCallbackOrGlobalKey;
    return "function" == typeof i
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "GameSettings",
            64,
            "getter不必【Force Save】LocalStorage",
            ["functionId", e],
          ),
        !1)
      : (LocalStorage_1.LocalStorage.SetGlobal(i, t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameSettings",
            64,
            "设置项【Force Save】成功",
            ["functionId", e],
            ["value", t],
          ),
        !0);
  }
  static HandleValueChange(e, t, i) {
    this.T_c(e, t, i)
      ? (this.b_c(e, t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshMenuSetting,
          e,
        ),
        GameSettingsDefine_1.function2GameSettings[e].HandleDoneCallback?.(
          t,
          i,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameSettings",
            64,
            "设置项【Handle】成功",
            ["functionId", e],
            ["value", t],
            ["reason", i],
          ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "GameSettings",
          64,
          "【HandleValueChange】设置项应用失败",
          ["functionId", e],
        );
  }
  static ReApply(e, t = 0) {
    var i = this.GetCurrentValue(e);
    return void 0 === i
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "GameSettings",
            64,
            "不能获取用于ReApply的设置项值，放弃ReApply",
            ["functionId", e],
          ),
        !1)
      : this.T_c(e, i, t);
  }
  static DumpValue(e) {
    return GameSettingsDefine_1.function2GameSettings[e].DumpCallback();
  }
  static GetAudioCodeById(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    return t
      ? t.AudioCode
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Menu", 30, "LanguageSystem 未定义此语种", [
            "非法值",
            e,
          ]),
        CommonDefine_1.ENGLISH_ISO639_1);
  }
  static GetLanguageCodeById(e) {
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    return t
      ? t.LanguageCode
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Menu", 10, "LanguageSystem 未定义此语种", [
            "非法值",
            e,
          ]),
        CommonDefine_1.ENGLISH_ISO639_1);
  }
}
((exports.GameSettingsManager = GameSettingsManager).n_c = new Map()),
  (GameSettingsManager.Jlc = void 0);
//# sourceMappingURL=GameSettingsManager.js.map
