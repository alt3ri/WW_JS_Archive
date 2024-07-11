"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuController = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const AdviceController_1 = require("../Advice/AdviceController");
const CommonInputViewController_1 = require("../Common/InputView/Controller/CommonInputViewController");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const MenuDefine_1 = require("./MenuDefine");
const MenuFunction_1 = require("./MenuFunction");
class MenuController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      MenuController.r2e(),
      MenuController.RefreshCurrentSetting(),
      MenuController.AutoDoConfigFunction(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Menu", 8, "设置系统Controller初始化"),
      !0
    );
  }
  static RefreshCurrentSetting() {
    MenuController.JPi();
  }
  static JPi() {
    const e = ModelManager_1.ModelManager.MenuModel;
    if (e) {
      const n = UE.GameUserSettings.GetGameUserSettings().GetFullscreenMode();
      let t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
      const a = t.GetCurrentQualityInfo();
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Menu", 8, "刷新当前全屏模式", ["fullscreenMode", n]),
        UE.KismetSystemLibrary.GetCommandLine().search("-windowed") >= 0)
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
        (this.yOn(e, n) &&
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "SettingSystem1",
          ),
        this.IOn(e, n));
  }
  static yOn(e, n) {
    const t = this.TOn(e, n);
    const a = this.LOn(e, n);
    return this.DOn(e, n), t || a;
  }
  static IOn(e, n) {
    e = e.ValueTipsMap.get(n);
    void 0 !== e &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        e,
      );
  }
  static GetTargetConfig(e) {
    return this.CheckIfServerConfig(e)
      ? this.GetServerConfigValue(e)
      : ModelManager_1.ModelManager.MenuModel.GetTargetConfig(e) ?? 0;
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
    return e !== 59 ||
      ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()
      ? 0
      : 1;
  }
  static CheckIfServerConfig(e) {
    return e === 59;
  }
  static zPi() {
    const e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    const n = this.GetTargetConfig(6);
    return e.GetResolutionByList(n).ToString();
  }
  static ReportSettingMenuLogEvent() {
    const e = new LogReportDefine_1.SettingMenuLogEvent();
    (e.i_image_quality = this.GetTargetConfig(10)),
      (e.i_display_mode = this.GetTargetConfig(5)),
      (e.s_resolution = this.zPi()),
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
    e === 59 &&
      ((e = !ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()),
      AdviceController_1.AdviceController.RequestSetAdviceShowState(e));
  }
  static DoConfigFunction(e) {
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
        MenuFunction_1.MenuFunction.SetShadowQuality(e);
        break;
      case 55:
        MenuFunction_1.MenuFunction.SetNiagaraQuality(e);
        break;
      case 56:
        MenuFunction_1.MenuFunction.SetImageDetail(e);
        break;
      case 57:
        MenuFunction_1.MenuFunction.SetAntiAliasing(e);
        break;
      case 58:
        MenuFunction_1.MenuFunction.SetSceneAo(e);
        break;
      case 63:
        MenuFunction_1.MenuFunction.SetVolumeFog(e);
        break;
      case 64:
        MenuFunction_1.MenuFunction.SetVolumeLight(e);
        break;
      case 65:
        MenuFunction_1.MenuFunction.SetMotionBlur(e);
        break;
      case 66:
        MenuFunction_1.MenuFunction.SetPcVsync(e);
        break;
      case 67:
        MenuFunction_1.MenuFunction.SetMobileResolution(e);
        break;
      case 68:
        MenuFunction_1.MenuFunction.SetSuperResolution(e);
        break;
      case 51:
        MenuFunction_1.MenuFunction.SetTextLanguage(e);
        break;
      case 52:
        MenuFunction_1.MenuFunction.SetLanguageAudio(e);
        break;
      case 5:
        MenuFunction_1.MenuFunction.SetDisplayMode(e);
        break;
      case 7:
        MenuFunction_1.MenuFunction.SetBrightness(e);
        break;
      case 6:
        MenuFunction_1.MenuFunction.SetResolution(e);
        break;
      case 79:
        MenuFunction_1.MenuFunction.SetNpcDensity(e);
        break;
      case 81:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingEnable(e);
        break;
      case 82:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingFrameGenerate(e);
        break;
      case 83:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingMode(e);
        break;
      case 84:
        MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingSharpness(e);
        break;
      case 85:
        MenuFunction_1.MenuFunction.SetNvidiaReflex(e);
        break;
      case 87:
        MenuFunction_1.MenuFunction.SetFsrEnable(e);
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
        MenuFunction_1.MenuFunction.SetHorizontalViewSensitivity(e);
        break;
      case 90:
        MenuFunction_1.MenuFunction.SetVerticalViewSensitivity(e);
        break;
      case 91:
        MenuFunction_1.MenuFunction.SetAimHorizontalViewSensitivity(e);
        break;
      case 92:
        MenuFunction_1.MenuFunction.SetAimVerticalViewSensitivity(e);
        break;
      case 93:
        MenuFunction_1.MenuFunction.SetCameraShakeStrength(e);
        break;
      case 94:
        MenuFunction_1.MenuFunction.SetMobileHorizontalViewSensitivity(e);
        break;
      case 95:
        MenuFunction_1.MenuFunction.SetMobileVerticalViewSensitivity(e);
        break;
      case 96:
        MenuFunction_1.MenuFunction.SetMobileAimHorizontalViewSensitivity(e);
        break;
      case 97:
        MenuFunction_1.MenuFunction.SetMobileAimVerticalViewSensitivity(e);
        break;
      case 98:
        MenuFunction_1.MenuFunction.SetMobileCameraShakeStrength(e);
        break;
      case 99:
        MenuFunction_1.MenuFunction.SetCommonSpringArmLength(e);
        break;
      case 100:
        MenuFunction_1.MenuFunction.SetFightSpringArmLength(e);
        break;
      case 101:
        MenuFunction_1.MenuFunction.SetResetFocusEnable(e);
        break;
      case 102:
        MenuFunction_1.MenuFunction.SetIsSidestepCameraEnable(e);
        break;
      case 103:
        MenuFunction_1.MenuFunction.SetIsSoftLockCameraEnable(e);
        break;
      case 104:
        MenuFunction_1.MenuFunction.SetJoystickShakeStrength(e);
        break;
      case 105:
        MenuFunction_1.MenuFunction.SetJoystickShakeType(e);
        break;
      case 106:
        MenuFunction_1.MenuFunction.SetWalkOrRunRate(e);
        break;
      case 108:
        MenuFunction_1.MenuFunction.SetJoystickMode(e);
        break;
      case 109:
        MenuFunction_1.MenuFunction.SetSkillButtonMode(e);
        break;
      case 121:
        MenuFunction_1.MenuFunction.SetPushEnableState(e);
        break;
      case 122:
        MenuFunction_1.MenuFunction.SetAimAssistEnable(e);
        break;
      case 130:
        MenuFunction_1.MenuFunction.SetHorizontalViewRevert(e);
        break;
      case 131:
        MenuFunction_1.MenuFunction.SetVerticalViewRevert(e);
    }
  }
  static AutoDoConfigFunction() {
    const e = ModelManager_1.ModelManager.MenuModel.GetMenuDataKeys();
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
      (e === 10 && MenuFunction_1.MenuNoticeFunction.ImageQuality(e), e)
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
  static LOn(e, n) {
    if (!e) return !1;
    if (!e.CanAffectedFunction(n)) return !1;
    let t = !1;
    const a = e.AffectedFunction;
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
      const i = this.GetTargetMenuData(r);
      i &&
        (this.yOn(i, n) && (t = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChangeConfigValue,
          r,
          n,
        ));
    }
    return t;
  }
  static TOn(e, n) {
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
      MenuDefine_1.needRestart.includes(e)
        ? !!MenuController.CheckRestartValueChange(e, n) &&
          (MenuController.SetRestartMap(e, n),
          MenuController.SetTargetConfig(e, n),
          !0)
        : (MenuController.SetTargetConfig(e, n),
          MenuController.DoConfigFunction(e),
          !1)
    );
  }
  static DOn(e, n) {
    if (e && e.HasDisableFunction()) {
      const t = !e.IsAffectedDisable(n);
      const a = e.DisableFunction;
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
        const i = this.GetTargetMenuData(r);
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
    const n = this.GetTargetConfig(e);
    var e = this.GetTargetMenuData(e);
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
    const n = MenuController.ZPi(e);
    const t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionList();
    const a = [];
    for (let e = 0; e < t.length; ++e) {
      var i = t[e];
      var i = i.X + "*" + i.Y;
      n.includes(i) && a.push(e);
    }
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "获得当前设置面板分辨率列表",
          ["optionsNameList", e],
          ["resultOptionsNameList", n],
          ["resolutionList", t],
          ["data", a],
        ),
      a
    );
  }
  static ZPi(e) {
    const n = [];
    for (const a of e) {
      const t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a);
      n.push(t);
    }
    return n;
  }
  static r2e() {
    this.OpenViewFuncMap.set("LogUploadView", this.exi),
      this.OpenViewFuncMap.set("CdKeyInputView", this.txi);
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
}
((exports.MenuController = MenuController).OpenViewFuncMap = new Map()),
  (MenuController.exi = () => {
    UiManager_1.UiManager.OpenView("LogUploadView", 2);
  }),
  (MenuController.txi = () => {
    CommonInputViewController_1.CommonInputViewController.OpenCdKeyInputView();
  });
// # sourceMappingURL=MenuController.js.map
