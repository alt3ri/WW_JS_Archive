"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsController = void 0);
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  MenuTool_1 = require("../Module/Menu/MenuTool"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender"),
  GameSettingsDeviceRenderDefine_1 = require("./GameSettingsDeviceRenderDefine"),
  GameSettingsLevelRender_1 = require("./GameSettingsLevelRender"),
  GameSettingsManager_1 = require("./GameSettingsManager"),
  GameSettingsUtils_1 = require("./GameSettingsUtils");
class GameSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 41, "GameSettingsController-OnInit"),
      this.Ore(),
      !0
    );
  }
  static OnClear() {
    return this.kre(), !0;
  }
  static Ore() {
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSubLevelAdded,
        this.J2a,
      );
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnStartLoadingState,
      this.hMe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this._Me,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSubLevelAdded,
        this.J2a,
      );
  }
  static kot() {
    this.IRe = TimerSystem_1.TimerSystem.Delay(
      this.q7e,
      GameSettingsDeviceRenderDefine_1.WHOLE_SHADOW_CACHE_DELAY_TIME,
    );
  }
  static xHe() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Has(this.IRe) &&
        TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0));
  }
  static fGa() {
    if (
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HasLocalGameSettings,
        !1,
      )
    ) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "GameSettings",
          8,
          "本地有游戏设置保存，还原本地游戏设置",
        );
      var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(10);
      if (!GameSettingsUtils_1.GameSettingsUtils.PreApplyImageQuality(a))
        return;
      for (const e of GameSettingsManager_1.GameSettingsManager.GetGameSettingsHandleMap().values())
        e.Load() &&
          (e.IsSkipInitializeApply
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameSettings",
                8,
                "初始化应用游戏设置 - 跳过此设置应用",
                ["GameSettingId", e.GetGameSettingId()],
              )
            : (11 === e.GetGameSettingId() &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "GameSettings",
                  8,
                  "[FPSDebug]InitializeApply",
                  ["CurrentFpsIndex", e.GetCurrentValue()],
                  ["EditFpsIndex", e.GetEditorValue()],
                ),
              e.InitializeApply()));
    } else {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameSettings", 8, "首次启动游戏，应用默认游戏设置"),
        (this.NJa = LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualitySetting,
        )),
        void 0 !== this.NJa && this.NJa.KeyQualityLevel <= 3)
      ) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameSettings",
            64,
            "[设置系统]->存在老数据，进行兼容设置",
          ),
          GameSettingsManager_1.GameSettingsManager.SetApplySave(
            10,
            this.NJa.KeyQualityLevel,
          );
        var a = LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
          ),
          t = LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey
              .MobileCameraShakeStrength,
          );
        let e = void 0;
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.RepairEnemyHitDisplayMode,
          !1,
        ) ||
          (LocalStorage_1.LocalStorage.SetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey
              .RepairEnemyHitDisplayMode,
            !0,
          ),
          (e = 1)),
          (this.FJa = new Map([
            [68, this.NJa.KeySuperResolution],
            [5, this.NJa.KeyPcWindowMode],
            [7, this.NJa.KeyBrightness],
            [87, this.NJa.KeyFsrEnable],
            [125, this.NJa.KeyXessEnable],
            [126, this.NJa.KeyXessQuality],
            [127, this.NJa.KeyMetalFxEnable],
            [89, this.NJa.HorizontalViewSensitivity],
            [90, this.NJa.VerticalViewSensitivity],
            [91, this.NJa.AimHorizontalViewSensitivity],
            [92, this.NJa.AimVerticalViewSensitivity],
            [93, a],
            [94, this.NJa.MobileHorizontalViewSensitivity],
            [95, this.NJa.MobileVerticalViewSensitivity],
            [96, this.NJa.MobileAimHorizontalViewSensitivity],
            [97, this.NJa.MobileAimVerticalViewSensitivity],
            [98, t],
            [99, this.NJa.CommonSpringArmLength],
            [100, this.NJa.FightSpringArmLength],
            [101, this.NJa.IsResetFocusEnable],
            [102, this.NJa.IsSidestepCameraEnable],
            [103, this.NJa.IsSoftLockCameraEnable],
            [104, this.NJa.JoystickShakeStrength],
            [105, this.NJa.JoystickShakeType],
            [108, this.NJa.JoystickMode],
            [109, this.NJa.IsAutoSwitchSkillButtonMode],
            [122, this.NJa.AimAssistEnable],
            [130, this.NJa.HorizontalViewRevert],
            [131, this.NJa.VerticalViewRevert],
            [106, this.NJa.WalkOrRunRate],
            [135, e],
          ]));
      }
      this.vGa(),
        this.MGa(),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(129, 1),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(134, 1);
    }
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.HasLocalGameSettings,
      !0,
    );
  }
  static vGa() {
    var e,
      a,
      t,
      i,
      n,
      s,
      r,
      o,
      l,
      g,
      _,
      S,
      m,
      G,
      h,
      D,
      c,
      v,
      E,
      u,
      d,
      M,
      L,
      b =
        this.NJa?.KeyQualityLevel ??
        GameSettingsDeviceRender_1.GameSettingsDeviceRender
          .GameQualitySettingLevel,
      f =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceReaderFeatureData(
          b,
        );
    f &&
      GameSettingsUtils_1.GameSettingsUtils.PreApplyImageQuality(b) &&
      ((G =
        !(e = Info_1.Info.IsPcOrGamepadPlatform()) ||
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice()
          ? 0
          : 1),
      (a =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()),
      (a =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(
          a,
        )),
      (t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice()
        ? 1
        : 0),
      (i =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameIndexByList(
          f.FPS,
        )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "GameSettings",
          8,
          "[FPSDebug]InitializeApplyImageQuality",
          ["fpsIndex", i],
          ["FPS", f.FPS],
        ),
      (n = this.NJa?.KeyNewShadowQuality ?? f.ShadowQuality),
      (s = this.NJa?.KeyNiagaraQuality ?? f.FxQuality),
      (r = this.NJa?.KeyImageDetail ?? f.ImageDetail),
      (o = this.NJa?.KeyAntiAliasing ?? f.AntiAliasing),
      (l = this.NJa?.KeySceneAo ?? f.AO),
      (g = this.NJa?.KeyVolumeFog ?? f.VolumeFog),
      (_ = this.NJa?.KeyVolumeLight ?? f.VolumeLight),
      (S = this.NJa?.KeyMotionBlur ?? f.MotionBlur),
      (m = this.NJa?.KeyPcVsync ?? f.VSync),
      (G = this.NJa?.KeyFsrEnable ?? G),
      (h = this.NJa?.KeyXessEnable ?? 1),
      (D = this.NJa?.KeyXessQuality ?? 2),
      (c = this.NJa?.KeyMetalFxEnable ?? 1),
      (v = this.NJa?.KeyIrxEnable ?? 1),
      (E = this.NJa?.KeyMobileResolution ?? f.ScreenPercentage),
      (u = this.NJa?.KeyBloomEnable ?? f.Bloom),
      (f = this.NJa?.KeyNpcDensity ?? f.NpcDensity),
      (d = this.NJa?.KeyNvidiaSuperSamplingMode ?? 1),
      (M = this.NJa?.KeyNvidiaSuperSamplingSharpness ?? 0),
      (L = this.NJa?.KeyNvidiaReflex ?? 1),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(11, i),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(54, n),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(55, s),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(56, r),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(57, o),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(58, l),
      GameSettingsUtils_1.GameSettingsUtils.ApplySceneLightQuality(b),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(63, g),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(64, _),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(65, S),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(87, G),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(125, h),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(126, D),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(127, c),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(128, v),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(67, E),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(132, u),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(79, f),
      GameSettingsManager_1.GameSettingsManager.InitSetApplySave(6, a),
      e &&
        (GameSettingsManager_1.GameSettingsManager.InitSetApplySave(66, m),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(81, t),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(81, 1),
        GameSettingsUtils_1.GameSettingsUtils.ApplyNvidiaSuperSamplingFrameGenerate(),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(83, d),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(84, M),
        GameSettingsManager_1.GameSettingsManager.InitSetApplySave(85, L)),
      GameSettingsManager_1.GameSettingsManager.InitSetSave(10, b));
  }
  static MGa() {
    var e = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig();
    if (e)
      for (const t of e)
        if (MenuTool_1.MenuTool.CheckPlatform(t.Platform)) {
          let e = 0;
          switch (t.SetType) {
            case 1:
              e = t.SliderDefault;
              break;
            case 2:
            case 4:
              e = t.OptionsDefault;
              break;
            default:
              e = 0;
          }
          var a = t.FunctionId;
          void 0 !== this.FJa && (e = this.FJa.get(a) ?? e),
            GameSettingsManager_1.GameSettingsManager.InitSetApplySave(a, e);
        }
  }
}
(exports.GameSettingsController = GameSettingsController),
  ((_a = GameSettingsController).IRe = void 0),
  (GameSettingsController.NJa = void 0),
  (GameSettingsController.FJa = void 0),
  (GameSettingsController.hMe = () => {
    var e;
    GameSettingsManager_1.GameSettingsManager.IsGameSettingsAppliedOnOpenLoading
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 8, "游戏设置已经初始化应用过")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 41, "初始化-应用设置参数1111"),
        Info_1.Info.IsPcPlatform() &&
          ((e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 41, "重新设置PC性能分级", [
              "deviceType",
              e,
            ]),
          11 === e
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
            : 12 === e
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
              : 13 === e
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
                : 14 === e &&
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
        _a.fGa(),
        GameSettingsManager_1.GameSettingsManager.ConvertLocalMenuData(),
        GameSettingsManager_1.GameSettingsManager.ConvertViewSensitivity(),
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelAllPerformanceLimit(),
        (GameSettingsManager_1.GameSettingsManager.IsGameSettingsAppliedOnOpenLoading =
          !0));
  }),
  (GameSettingsController._Me = () => {
    ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 60, "进入大世界-调整渲染参数"),
        Info_1.Info.IsPcOrGamepadPlatform() ||
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.EnableKuroSpotlightsShadow 0",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.FogVisibilityCulling.Enable 1",
          )),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Shadow.CacheWholeSceneShadows 1",
        ),
        _a.xHe())
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 60, "进入副本-调整渲染参数"),
        Info_1.Info.IsPcOrGamepadPlatform() ||
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.EnableKuroSpotlightsShadow 1",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.FogVisibilityCulling.Enable 0",
          )),
        GameSettingsLevelRender_1.GameSettingsLevelRender.Get().SetLevelRenderSettings(),
        UE.LandscapeProxy.SetKuroLandscapeFOVFactor(0),
        _a.xHe(),
        _a.kot());
    var e = GameSettingsManager_1.GameSettingsManager.Get(58);
    e && e.Apply();
  }),
  (GameSettingsController.uMe = () => {
    ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 60, "退出副本-调整渲染参数"),
      GameSettingsLevelRender_1.GameSettingsLevelRender.Get().RevertLevelRenderSetting(),
      UE.LandscapeProxy.SetKuroLandscapeFOVFactor(-1),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.CacheWholeSceneShadows 1",
      ),
      _a.xHe());
  }),
  (GameSettingsController.J2a = () => {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.CacheWholeSceneShadows 0",
    ),
      _a.xHe(),
      _a.kot();
  }),
  (GameSettingsController.q7e = () => {
    (_a.IRe = void 0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.CacheWholeSceneShadows 1",
      );
  });
//# sourceMappingURL=GameSettingsController.js.map
