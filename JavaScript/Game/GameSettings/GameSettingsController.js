"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsController = void 0);
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GameSettingsDefine_1 = require("./GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender"),
  GameSettingsDeviceRenderDefine_1 = require("./GameSettingsDeviceRenderDefine"),
  GameSettingsLevelRender_1 = require("./GameSettingsLevelRender"),
  GameSettingsManager_1 = require("./GameSettingsManager"),
  GameSettingsUtils_1 = require("./GameSettingsUtils");
class GameSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 40, "GameSettingsController-OnInit"),
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
        this.XGa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerMainTypeChange,
        this.Etl,
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
        this.XGa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerMainTypeChange,
        this.Etl,
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
}
(exports.GameSettingsController = GameSettingsController),
  ((_a = GameSettingsController).IRe = void 0),
  (GameSettingsController.IsGameSettingsAppliedOnOpenLoading = !1),
  (GameSettingsController.hMe = () => {
    var e;
    _a.IsGameSettingsAppliedOnOpenLoading
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 64, "游戏设置已经初始化应用过")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 40, "初始化-应用设置参数1111"),
        Info_1.Info.IsPcPlatform() &&
          ((e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceType),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 40, "重新设置PC性能分级", [
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
                "sg.TextureQuality 2",
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
                  "sg.TextureQuality 2",
                ),
                Info_1.Info.IsMacPlatform()
                  ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "sg.EffectsQuality 1",
                    )
                  : UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
                  Info_1.Info.IsMacPlatform()
                    ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                        GlobalData_1.GlobalData.World,
                        "sg.EffectsQuality 1",
                      )
                    : UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
                : (14 !== e && 51 !== e) ||
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
                  Info_1.Info.IsMacPlatform()
                    ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                        GlobalData_1.GlobalData.World,
                        "sg.EffectsQuality 1",
                      )
                    : UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
        Info_1.Info.IsPs5Platform() &&
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
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
          )),
        GameSettingsManager_1.GameSettingsManager.HandleInitDataOnOpenLoading(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading,
        ),
        Info_1.Info.IsPlayInEditor &&
          UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings(
            "/Script/KuroEditorUtility.KuroEditorUtilitySetting",
            "TopSpeedForLoading",
          ) &&
          ((e =
            "wp.Runtime.OverrideMultipleRuntimeGridNames Grid_Near&Grid_Middle&Grid_Middle_Far&Grid_Far&Grid_SuperFar&Grid_SSuperFar&Grid_HLOD_Small&Grid_HLOD_Middle&Grid_HLOD&Grid_HLOD_Volume_Small&Grid_HLOD_Volume_Middle&Grid_HLOD_Volume&Grid_Water&Grid_Impostor&Grid_ISM_Near&Grid_ISM_Middle&Grid_ISM_Far&Grid_ISM_SuperFar&Grid_Foliage_Near&Grid_Foliage_Grass&Grid_Foliage_Middle&Grid_Foliage_Far&Grid_ReverseFar&Grid_SSuperFarReverse&Grid_EnclosedSpaceNear&Grid_EnclosedSpaceMiddle&Grid_EnclosedSpaceFar&Grid_EnclosedSpaceSuperFar&Grid_EnclosedSpaceSSuperFar"),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "wp.Runtime.OverrideMultipleRuntimeGridNames Grid_Near&Grid_Middle&Grid_Middle_Far&Grid_Far&Grid_SuperFar&Grid_SSuperFar&Grid_HLOD_Small&Grid_HLOD_Middle&Grid_HLOD&Grid_HLOD_Volume_Small&Grid_HLOD_Volume_Middle&Grid_HLOD_Volume&Grid_Water&Grid_Impostor&Grid_ISM_Near&Grid_ISM_Middle&Grid_ISM_Far&Grid_ISM_SuperFar&Grid_Foliage_Near&Grid_Foliage_Grass&Grid_Foliage_Middle&Grid_Foliage_Far&Grid_ReverseFar&Grid_SSuperFarReverse&Grid_EnclosedSpaceNear&Grid_EnclosedSpaceMiddle&Grid_EnclosedSpaceFar&Grid_EnclosedSpaceSuperFar&Grid_EnclosedSpaceSSuperFar",
          ),
          (e =
            "wp.Runtime.OverrideMultipleRuntimeGridLoadingRangeValues 50&80&180&100&450&1800&150&200&300&150&200&300&480&250&50&80&100&150&40&80&100&100&300&1800&50&80&100&450&600"),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            e,
          ),
          (e = "r.Kuro.SkeletalMesh.LODDistanceScale 1.0"),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            e,
          ),
          (e = "r.Kuro.Foliage.GrassCullDistanceMax 3000"),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            e,
          ),
          (e = "r.Kuro.MaterialDesktopQualityShoulderRender 0"),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            e,
          ),
          (e = "r.Kuro.GlobalPointCloudStreamEnabled 0"),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            e,
          ),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("World", 41, "Editor: TopSpeedMode is on."),
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelAllPerformanceLimit(),
        (_a.IsGameSettingsAppliedOnOpenLoading = !0));
  }),
  (GameSettingsController._Me = () => {
    ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 59, "进入大世界-调整渲染参数"),
        Info_1.Info.IsPcOrGamepadPlatform() ||
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.EnableKuroSpotlightsShadow 0",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.FogVisibilityCulling.Enable 1",
          )),
        UE.LandscapeProxy.SetKuroLandscapeFOVFactor(-1),
        UE.StreamableRenderAsset.SetKuroStreamingLevelState(0),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Shadow.CacheWholeSceneShadows 1",
        ),
        _a.xHe())
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Render", 59, "进入副本-调整渲染参数"),
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
        UE.StreamableRenderAsset.SetKuroStreamingLevelState(1),
        _a.xHe(),
        _a.kot()),
      GameSettingsManager_1.GameSettingsManager.ReApply(
        GameSettingsDefine_1.EFunction.SCENEAO,
        3,
      );
  }),
  (GameSettingsController.uMe = () => {
    ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 59, "退出副本-调整渲染参数"),
      GameSettingsLevelRender_1.GameSettingsLevelRender.Get().RevertLevelRenderSetting(),
      UE.LandscapeProxy.SetKuroLandscapeFOVFactor(-1),
      UE.StreamableRenderAsset.SetKuroStreamingLevelState(0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.CacheWholeSceneShadows 1",
      ),
      _a.xHe());
  }),
  (GameSettingsController.XGa = () => {
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
  }),
  (GameSettingsController.Etl = (e, a) => {
    (2 !== e && 2 !== a) ||
      GameSettingsUtils_1.GameSettingsUtils.RefreshViewRevertState(a);
  }),
  (GameSettingsController.OnGameUserSettingsUINeedsUpdate = () => {
    TimerSystem_1.TimerSystem.Next(_a.OnUEGameUserSettingsUpdate);
  }),
  (GameSettingsController.OnUEGameUserSettingsUpdate = () => {
    var e,
      a,
      t = UE.GameUserSettings.GetGameUserSettings(),
      i = 2 === t.GetFullscreenMode() ? 1 : 0,
      r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
        GameSettingsDefine_1.EFunction.DISPLAYMODE,
      ),
      l =
        (r !== i &&
          GameSettingsManager_1.GameSettingsManager.HandleValueChange(
            GameSettingsDefine_1.EFunction.DISPLAYMODE,
            i,
            0,
          ),
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.RESOLUTION,
        )),
      _ =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionIndexByList(
          t.GetScreenResolution(),
        );
    l !== _ &&
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(
        GameSettingsDefine_1.EFunction.RESOLUTION,
        _,
        0,
      ),
      Macro_1.NOT_SHIPPING_ENVIRONMENT &&
        void 0 !== l &&
        void 0 !== r &&
        ((e = ["全屏", "窗口全屏", "窗口"]),
        (a =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
            l,
          )),
        r !== i || l !== _) &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "GameSettings",
          69,
          "窗口模式和分辨率更新",
          ["窗口模式(实际)", e[t.GetFullscreenMode()]],
          ["(转换后)", e[1 + i]],
          ["(显示)", e[r + 1]],
          ["分辨率索引(实际)", _],
          ["(显示)", l],
          ["实际分辨率", t?.GetScreenResolution().ToString()],
          ["显示分辨率", a.ToString()],
        );
  });
//# sourceMappingURL=GameSettingsController.js.map
