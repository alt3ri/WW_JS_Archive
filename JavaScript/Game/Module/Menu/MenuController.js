"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  AdviceController_1 = require("../Advice/AdviceController"),
  CommonInputViewController_1 = require("../Common/InputView/Controller/CommonInputViewController"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  MenuDefine_1 = require("./MenuDefine"),
  MenuFunction_1 = require("./MenuFunction"),
  CHECK_MENUDATA_SAVE_INTERVAL = 6e4;
class MenuController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      MenuController.MFe(),
      MenuController.RefreshCurrentSetting(),
      MenuController.AutoDoConfigFunction(),
      MenuController.StartCheckEditedMenuDataSave(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Menu", 8, "设置系统Controller初始化"),
      !0
    );
  }
  static OnClear() {
    return (
      MenuController.StopCheckEditedMenueDataSave(),
      MenuController.SaveLocalConfig(),
      !0
    );
  }
  static RefreshCurrentSetting() {
    MenuController.Jxi();
  }
  static Jxi() {
    var e = ModelManager_1.ModelManager.MenuModel;
    if (e) {
      var n = UE.GameUserSettings.GetGameUserSettings().GetFullscreenMode(),
        t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
        a = t.GetCurrentQualityInfo();
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Menu", 8, "刷新当前全屏模式", ["fullscreenMode", n]),
        0 <= UE.KismetSystemLibrary.GetCommandLine().search("-windowed"))
      )
        (t = t.GetResolutionByList(MenuDefine_1.WINDOWS_RESOLUTION_INDEX)),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Menu",
              8,
              "刷新当前全屏模式-使用-windowed参数启动，将全屏模式设为窗口，并且设置分辨率",
              ["fullscreenMode", n],
              ["resolution", t],
            ),
          a.SetResolution(t),
          a.SetPcFullScreenMode(2),
          e.SetTargetConfig(5, 1),
          e.SetTargetConfig(6, MenuDefine_1.WINDOWS_RESOLUTION_INDEX);
      else
        switch (n) {
          case 0:
          case 1:
            a.SetPcFullScreenMode(0), e.SetTargetConfig(5, 0);
            break;
          case 2:
            a.SetPcFullScreenMode(2), e.SetTargetConfig(5, 1);
        }
    }
  }
  static RebuildConfigData() {
    ModelManager_1.ModelManager.MenuModel.CreateConfigByLocalConfig();
  }
  static GetMainTypeList() {
    return ModelManager_1.ModelManager.MenuModel.GetMainTypeList();
  }
  static GetTargetMainInfo(e) {
    return ModelManager_1.ModelManager.MenuModel.GetTargetMainInfo(e);
  }
  static GetTargetBaseConfigData(e) {
    return ModelManager_1.ModelManager.MenuModel.GetTargetConfigData(e);
  }
  static SetTargetConfig(e, n) {
    ModelManager_1.ModelManager.MenuModel.SetTargetConfig(e, n);
  }
  static ApplyTargetConfig(e, n) {
    MenuController.CheckIfServerConfig(e)
      ? MenuController.DoSetServerConfigFunction(e)
      : (e = this.GetTargetMenuData(e)) &&
        (this.nfa(e, n) &&
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "SettingSystem1",
          ),
        this.sfa(e, n));
  }
  static nfa(e, n) {
    var t = this.afa(e, n),
      a = this.hfa(e, n);
    return this.lfa(e, n), t || a;
  }
  static sfa(e, n) {
    e = e.ValueTipsMap.get(n);
    void 0 !== e &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        e,
      );
  }
  static GetTargetConfig(e) {
    return this.CheckIfServerConfig(e)
      ? this.GetServerConfigValue(e)
      : this.CheckIfGameQualityConfig(e)
        ? this.Ykn(e)
        : ModelManager_1.ModelManager.MenuModel.GetTargetConfig(e) ?? 0;
  }
  static Ykn(e) {
    e = ModelManager_1.ModelManager.MenuModel.FunctionIdToGameQualityKey(e);
    return void 0 !== e
      ? GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
          .GetCurrentQualityInfo()
          .GetDataByStorageKey(e) ?? 0
      : 0;
  }
  static SetRestartMap(e, n) {
    ModelManager_1.ModelManager.MenuModel.SetRestartMap(e, n);
  }
  static CheckRestartValueChange(e, n) {
    return ModelManager_1.ModelManager.MenuModel.CheckRestartValueChange(e, n);
  }
  static CheckRestartMap() {
    return ModelManager_1.ModelManager.MenuModel.CheckRestartMap();
  }
  static SaveLocalConfig() {
    ModelManager_1.ModelManager.MenuModel.SaveLocalConfig();
  }
  static ClearRestartMap() {
    ModelManager_1.ModelManager.MenuModel.ClearRestartMap();
  }
  static GetTargetMenuData(e) {
    return ModelManager_1.ModelManager.MenuModel.GetTargetMenuData(e);
  }
  static GetServerConfigValue(e) {
    return 59 !== e ||
      ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()
      ? 0
      : 1;
  }
  static CheckIfServerConfig(e) {
    return 59 === e;
  }
  static CheckIfGameQualityConfig(e) {
    return ModelManager_1.ModelManager.MenuModel.IsGameQualityTarget(e);
  }
  static zxi() {
    var e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
      n = this.GetTargetConfig(6);
    return e.GetResolutionByList(n).ToString();
  }
  static ReportSettingMenuLogEvent() {
    var e = new LogReportDefine_1.SettingMenuLogEvent();
    (e.i_image_quality = this.GetTargetConfig(10)),
      (e.i_display_mode = this.GetTargetConfig(5)),
      (e.s_resolution = this.zxi()),
      (e.i_brightness = this.GetTargetConfig(7)),
      (e.i_highest_fps = this.GetTargetConfig(11)),
      (e.i_shadow_quality = this.GetTargetConfig(54)),
      (e.i_niagara_quality = this.GetTargetConfig(55)),
      (e.i_fsr = this.GetTargetConfig(87)),
      (e.i_image_detail = this.GetTargetConfig(56)),
      (e.i_scene_ao = this.GetTargetConfig(58)),
      (e.i_volume_Fog = this.GetTargetConfig(63)),
      (e.i_volume_light = this.GetTargetConfig(64)),
      (e.i_motion_blur = this.GetTargetConfig(65)),
      (e.i_anti_aliasing = this.GetTargetConfig(57)),
      (e.i_pcv_sync = this.GetTargetConfig(66)),
      (e.i_horizontal_view_sensitivity = this.GetTargetConfig(89)),
      (e.i_vertical_view_sensitivity = this.GetTargetConfig(90)),
      (e.i_aim_horizontal_view_sensitivity = this.GetTargetConfig(91)),
      (e.i_aim_vertical_view_sensitivity = this.GetTargetConfig(92)),
      (e.f_camera_shake_strength = this.GetTargetConfig(93)),
      (e.i_common_spring_arm_length = this.GetTargetConfig(99)),
      (e.i_fight_spring_arm_length = this.GetTargetConfig(100)),
      (e.i_reset_focus_enable = this.GetTargetConfig(101)),
      (e.i_side_step_camera_enable = this.GetTargetConfig(102)),
      (e.i_soft_lock_camera_enable = this.GetTargetConfig(103)),
      (e.i_joystick_shake_strength = this.GetTargetConfig(104)),
      (e.i_joystick_shake_type = this.GetTargetConfig(105)),
      (e.f_walk_or_run_rate = this.GetTargetConfig(106)),
      (e.i_advice_setting = this.GetTargetConfig(59)),
      LogReportController_1.LogReportController.LogReport(e);
  }
  static DoSetServerConfigFunction(e) {
    59 === e &&
      ((e = !ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()),
      AdviceController_1.AdviceController.RequestSetAdviceShowState(e));
  }
  static DoConfigFunction(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 69:
      case 70:
        MenuFunction_1.MenuFunction.SetAudioVolume(e);
        break;
      case 10:
        MenuFunction_1.MenuFunction.SetImageQuality(e);
        break;
      case 11:
        MenuFunction_1.MenuFunction.SetHighFps(e);
        break;
      case 54:
        MenuFunction_1.MenuFunction.SetShadowQuality(e, n);
        break;
      case 55:
        MenuFunction_1.MenuFunction.SetNiagaraQuality(e, n);
        break;
      case 56:
        MenuFunction_1.MenuFunction.SetImageDetail(e, n);
        break;
      case 57:
        MenuFunction_1.MenuFunction.SetAntiAliasing(e, n);
        break;
      case 58:
        MenuFunction_1.MenuFunction.SetSceneAo(e, n);
        break;
      case 63:
        MenuFunction_1.MenuFunction.SetVolumeFog(e, n);
        break;
      case 64:
        MenuFunction_1.MenuFunction.SetVolumeLight(e, n);
        break;
      case 65:
        MenuFunction_1.MenuFunction.SetMotionBlur(e, n);
        break;
      case 66:
        MenuFunction_1.MenuFunction.SetPcVsync(e, n);
        break;
      case 67:
        MenuFunction_1.MenuFunction.SetMobileResolution(e, n);
        break;
      case 68:
        MenuFunction_1.MenuFunction.SetSuperResolution(e, n);
        break;
      case 51:
        MenuFunction_1.MenuFunction.SetTextLanguage(e);
        break;
      case 52:
        MenuFunction_1.MenuFunction.SetLanguageAudio(e);
        break;
      case 5:
        MenuFunction_1.MenuFunction.SetDisplayMode(e, n);
        break;
      case 7:
        MenuFunction_1.MenuFunction.SetBrightness(e, n);
        break;
      case 6:
        MenuFunction_1.MenuFunction.SetResolution(e);
        break;
      case 79:
        MenuFunction_1.MenuFunction.SetNpcDensity(e, n);
        break;
      case 81:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingEnable(e, n);
        break;
      case 82:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingFrameGenerate(e, n);
        break;
      case 83:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingMode(e);
        break;
      case 84:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingSharpness(e, n);
        break;
      case 85:
        MenuFunction_1.MenuFunction.SetNvidiaReflex(e);
        break;
      case 87:
        MenuFunction_1.MenuFunction.SetFsrEnable(e, n);
        break;
      case 125:
        MenuFunction_1.MenuFunction.SetXessEnable(e);
        break;
      case 126:
        MenuFunction_1.MenuFunction.SetXessQuality(e);
        break;
      case 127:
        MenuFunction_1.MenuFunction.SetMetalFxEnable(e);
        break;
      case 128:
        MenuFunction_1.MenuFunction.SetIrxEnable(e);
        break;
      case 132:
        MenuFunction_1.MenuFunction.SetBloomEnable(e);
        break;
      case 89:
        MenuFunction_1.MenuFunction.SetHorizontalViewSensitivity(e, n);
        break;
      case 90:
        MenuFunction_1.MenuFunction.SetVerticalViewSensitivity(e, n);
        break;
      case 91:
        MenuFunction_1.MenuFunction.SetAimHorizontalViewSensitivity(e, n);
        break;
      case 92:
        MenuFunction_1.MenuFunction.SetAimVerticalViewSensitivity(e, n);
        break;
      case 93:
        MenuFunction_1.MenuFunction.SetCameraShakeStrength(e, n);
        break;
      case 94:
        MenuFunction_1.MenuFunction.SetMobileHorizontalViewSensitivity(e, n);
        break;
      case 95:
        MenuFunction_1.MenuFunction.SetMobileVerticalViewSensitivity(e, n);
        break;
      case 96:
        MenuFunction_1.MenuFunction.SetMobileAimHorizontalViewSensitivity(e, n);
        break;
      case 97:
        MenuFunction_1.MenuFunction.SetMobileAimVerticalViewSensitivity(e, n);
        break;
      case 98:
        MenuFunction_1.MenuFunction.SetMobileCameraShakeStrength(e, n);
        break;
      case 99:
        MenuFunction_1.MenuFunction.SetCommonSpringArmLength(e, n);
        break;
      case 100:
        MenuFunction_1.MenuFunction.SetFightSpringArmLength(e, n);
        break;
      case 101:
        MenuFunction_1.MenuFunction.SetResetFocusEnable(e, n);
        break;
      case 102:
        MenuFunction_1.MenuFunction.SetIsSidestepCameraEnable(e, n);
        break;
      case 103:
        MenuFunction_1.MenuFunction.SetIsSoftLockCameraEnable(e, n);
        break;
      case 104:
        MenuFunction_1.MenuFunction.SetJoystickShakeStrength(e, n);
        break;
      case 105:
        MenuFunction_1.MenuFunction.SetJoystickShakeType(e, n);
        break;
      case 106:
        MenuFunction_1.MenuFunction.SetWalkOrRunRate(e, n);
        break;
      case 108:
        MenuFunction_1.MenuFunction.SetJoystickMode(e, n);
        break;
      case 109:
        MenuFunction_1.MenuFunction.SetSkillButtonMode(e, n);
        break;
      case 121:
        MenuFunction_1.MenuFunction.SetPushEnableState(e);
        break;
      case 122:
        MenuFunction_1.MenuFunction.SetAimAssistEnable(e, n);
        break;
      case 129:
        MenuFunction_1.MenuFunction.SetKeyboardLockEnemyMode(n);
        break;
      case 130:
        MenuFunction_1.MenuFunction.SetHorizontalViewRevert(n);
        break;
      case 131:
        MenuFunction_1.MenuFunction.SetVerticalViewRevert(n);
        break;
      case 133:
        MenuFunction_1.MenuFunction.SetSkillLockEnemyMode(n);
        break;
      case 134:
        MenuFunction_1.MenuFunction.SetGamepadLockEnemyMode(n);
        break;
      case 135:
        MenuFunction_1.MenuFunction.SetEnemyHitDisplayMode(n);
        break;
      case 136:
        MenuFunction_1.MenuFunction.SetPlayStationOnlyMode(n);
    }
  }
  static AutoDoConfigFunction() {
    var e = ModelManager_1.ModelManager.MenuModel.GetMenuDataKeys();
    if (e)
      for (const n of e)
        switch (n) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 69:
          case 70:
            MenuFunction_1.MenuFunction.SetAudioVolume(n);
        }
  }
  static NoticeChange(e) {
    switch (
      (10 === e && MenuFunction_1.MenuNoticeFunction.ImageQuality(e), e)
    ) {
      case MenuDefine_1.EImageConfig.IMAGEQUALITY:
      case MenuDefine_1.EImageConfig.HIGHESTFPS:
      case MenuDefine_1.EImageConfig.SHADOWQUALITY:
      case MenuDefine_1.EImageConfig.NIAGARAQUALITY:
      case MenuDefine_1.EImageConfig.IMAGEDETAIL:
      case MenuDefine_1.EImageConfig.ANTIALISING:
      case MenuDefine_1.EImageConfig.SCENEAO:
      case MenuDefine_1.EImageConfig.VOLUMEFOG:
      case MenuDefine_1.EImageConfig.VOLUMELIGHT:
      case MenuDefine_1.EImageConfig.MOTIONBLUR:
      case MenuDefine_1.EImageConfig.PCVSYNC:
      case MenuDefine_1.EImageConfig.MOBILERESOLUTION:
      case MenuDefine_1.EImageConfig.SUPERRESOLUTION:
      case MenuDefine_1.EImageConfig.RESOLUTION:
      case MenuDefine_1.EImageConfig.DISPLAYMODE:
      case MenuDefine_1.EImageConfig.NPCDENSITY:
      case MenuDefine_1.EImageConfig.NVIDIADLSS:
      case MenuDefine_1.EImageConfig.NVIDIADLSSFG:
      case MenuDefine_1.EImageConfig.NVIDIADLSSMODE:
      case MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS:
      case MenuDefine_1.EImageConfig.NVIDIAREFLEX:
      case MenuDefine_1.EImageConfig.FSR:
      case MenuDefine_1.EImageConfig.XESS:
      case MenuDefine_1.EImageConfig.XESS_QUALITY:
      case MenuDefine_1.EImageConfig.METALFX:
      case MenuDefine_1.EImageConfig.IRX:
      case MenuDefine_1.EImageConfig.BLOOM:
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ConfigLoadChange,
          e,
        );
    }
  }
  static hfa(e, n) {
    if (!e) return !1;
    if (!e.CanAffectedFunction(n)) return !1;
    let t = !1;
    var a = e.AffectedFunction;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Menu",
        8,
        "[ApplyAffectedFunction]设置此选项时，影响其他设置项",
        ["functionId", e.MenuDataFunctionId],
        ["value", n],
        ["affectedFunction", a],
      );
    for (const [r, n] of a) {
      var i = this.GetTargetMenuData(r);
      i &&
        (this.nfa(i, n) && (t = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChangeConfigValue,
          r,
          n,
        ));
    }
    return t;
  }
  static afa(e, n) {
    e = e.MenuDataFunctionId;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "[ApplyCommonFunction]设置选项",
          ["functionId", e],
          ["value", n],
        ),
      MenuController.CheckIfGameQualityConfig(e)
        ? (MenuController.DoConfigFunction(e, n),
          !(
            !MenuDefine_1.needRestart.includes(e) ||
            !MenuController.CheckRestartValueChange(e, n)
          ))
        : MenuDefine_1.needRestart.includes(e)
          ? !!MenuController.CheckRestartValueChange(e, n) &&
            (MenuController.SetRestartMap(e, n),
            MenuController.SetTargetConfig(e, n),
            !0)
          : (MenuController.SetTargetConfig(e, n),
            MenuController.DoConfigFunction(e, n),
            !1)
    );
  }
  static lfa(e, n) {
    if (e && e.HasDisableFunction()) {
      var t = !e.IsAffectedDisable(n),
        a = e.DisableFunction;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "[ApplyDisableFunction]设置此选项时，禁用其他设置项",
          ["functionId", e.MenuDataFunctionId],
          ["value", n],
          ["disableFunction", a],
        );
      for (const r of a) {
        var i = this.GetTargetMenuData(r);
        i &&
          ((i.IsEnable = t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnMenuDataEnableChanged,
            r,
            t,
          ));
      }
    }
  }
  static GetTargetConfigOptionString(e) {
    var n = this.GetTargetConfig(e),
      e = this.GetTargetMenuData(e);
    if (e)
      return (
        (e = e.MenuDataOptionsNameList[n]),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)
      );
  }
  static BeforeViewClose() {
    MenuFunction_1.MenuFunction.ApplyNvidiaSuperSamplingMode();
  }
  static GetResolutionList(e) {
    var n = MenuController.Zxi(e),
      t =
        GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionList(),
      a = [];
    for (let e = 0; e < t.length; ++e) {
      var i = t[e],
        i = i.X + "*" + i.Y;
      n.includes(i) && a.push(e);
    }
    return a;
  }
  static Zxi(e) {
    var n = [];
    for (const a of e) {
      var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a);
      n.push(t);
    }
    return n;
  }
  static MFe() {
    this.OpenViewFuncMap.set("LogUploadView", this.ewi),
      this.OpenViewFuncMap.set("CdKeyInputView", this.twi);
  }
  static IsInputControllerTypeIncludeKey(e, n) {
    switch (e) {
      case 1:
        return (
          InputSettings_1.InputSettings.IsKeyboardKey(n) ||
          InputSettings_1.InputSettings.IsMouseButton(n)
        );
      case 2:
        return InputSettings_1.InputSettings.IsGamepadKey(n);
      default:
        return !1;
    }
  }
  static StartCheckEditedMenuDataSave() {
    ModelManager_1.ModelManager.MenuModel.CheckEditedMenuDataSaveTimerId =
      TimerSystem_1.TimerSystem.Forever(() => {
        ModelManager_1.ModelManager.MenuModel.IsEdited &&
          MenuController.SaveLocalConfig();
      }, CHECK_MENUDATA_SAVE_INTERVAL);
  }
  static StopCheckEditedMenueDataSave() {
    var e =
      ModelManager_1.ModelManager.MenuModel.CheckEditedMenuDataSaveTimerId;
    void 0 !== e &&
      (TimerSystem_1.TimerSystem.Remove(e),
      (ModelManager_1.ModelManager.MenuModel.CheckEditedMenuDataSaveTimerId =
        void 0));
  }
  static OpenChangeLockView() {
    var e,
      n,
      t,
      a,
      i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.锁定目标,
      );
    i &&
      ((t = []),
      i.GetPcKeyNameList((n = [])),
      i.GetGamepadKeyNameList(t),
      (i = n[0]),
      (n = t[0]),
      (i = {
        RowSpriteResourceId: "SP_SwitchType1",
        DescriptionA: "LockEnemyModeText_1",
        DescriptionParametersA: [
          `<texture=${(t = InputSettings_1.InputSettings.GetKeyIconPath(i))}/>`,
        ],
        DescriptionB: "LockEnemyModeText_3",
        DescriptionParametersB: [`<texture=${t}/>`],
      }),
      (t = {
        RowSpriteResourceId: "SP_SwitchType2",
        DescriptionA: "LockEnemyModeText_2",
        DescriptionParametersA: [`<texture=${t}/>`],
        DescriptionB: "LockEnemyModeText_4",
      }),
      (e = {
        RowSpriteResourceId: "SP_SwitchType1",
        DescriptionA: "LockEnemyModeText_1",
        DescriptionParametersA: [
          `<texture=${(n = InputSettings_1.InputSettings.GetKeyIconPath(n))}/>`,
        ],
        DescriptionB: "LockEnemyModeText_3",
        DescriptionParametersB: [`<texture=${n}/>`],
      }),
      (n = {
        RowSpriteResourceId: "SP_SwitchType2",
        DescriptionA: "LockEnemyModeText_2",
        DescriptionParametersA: [`<texture=${n}/>`],
        DescriptionB: "LockEnemyModeText_6",
      }),
      (i = {
        GroupName: "LockEnemyModeType_1",
        DefaultKeyModeRowIndex: (a =
          GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo())
          .KeyboardLockEnemyMode,
        ChangeKeyModeRowList: [i, t],
      }),
      (t = {
        GroupName: "LockEnemyModeType_2",
        DefaultKeyModeRowIndex: a.GamepadLockEnemyMode,
        ChangeKeyModeRowList: [e, n],
      }),
      (a = {
        TitleName: "LockEnemyModeTitle",
        DefaultGroupIndex:
          2 ===
          ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType
            ? 1
            : 0,
        ChangeKeyModeGroupList: [i, t],
        OnConfirmCallback: this.Zzs,
      }),
      UiManager_1.UiManager.OpenView("ChangeModeTipsView", a));
  }
}
((exports.MenuController = MenuController).OpenViewFuncMap = new Map()),
  (MenuController.ewi = () => {
    UiManager_1.UiManager.OpenView("LogUploadView", 2);
  }),
  (MenuController.twi = () => {
    CommonInputViewController_1.CommonInputViewController.OpenCdKeyInputView();
  }),
  (MenuController.Zzs = (e) => {
    for (var [n, t] of e)
      0 === n
        ? MenuFunction_1.MenuFunction.SetKeyboardLockEnemyMode(t)
        : 1 === n && MenuFunction_1.MenuFunction.SetGamepadLockEnemyMode(t);
  });
//# sourceMappingURL=MenuController.js.map
