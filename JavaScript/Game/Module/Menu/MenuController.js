"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PreloadConfigStatementPart4_1 = require("../../Preload/PreloadConfigStatementPart4"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  AdviceController_1 = require("../Advice/AdviceController"),
  CommonInputViewController_1 = require("../Common/InputView/Controller/CommonInputViewController"),
  ConfirmBoxController_1 = require("../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  CHECK_MENUDATA_SAVE_INTERVAL = 6e4;
class MenuController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      MenuController.MFe(),
      MenuController.StartCheckEditedMenuDataSave(),
      MenuController.FWa(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Menu", 8, "设置系统Controller初始化"),
      !0
    );
  }
  static OnClear() {
    return MenuController.StopCheckEditedMenueDataSave(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ControllerConnectChange,
      MenuController.l7a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGameplaySettingsSet,
        MenuController.zGa,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ControllerConnectChange,
      MenuController.l7a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGameplaySettingsSet,
        MenuController.zGa,
      );
  }
  static FWa() {
    var e, t;
    Platform_1.Platform.IsMobilePlatform() &&
      ((t = ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached()),
      (e = GameSettingsManager_1.GameSettingsManager.Get(137))?.Set(t ? 1 : 0),
      e?.Apply(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MobileInputSwitch",
          11,
          "初始化手柄连接状态",
          ["isGamepadAttach", t],
          ["gameSettingHandle", void 0 !== e],
          ["MobileGamepadMode", e?.GetCurrentValue()],
        ),
      (t =
        ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceInputController()),
      Info_1.Info.SwitchInputControllerType(t, "InitGamepadConnect"));
  }
  static a7a() {
    var e, t, r;
    Platform_1.Platform.IsMobilePlatform() &&
      ((e = ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached()),
      (r =
        (t =
          GameSettingsManager_1.GameSettingsManager.Get(
            137,
          ))?.GetCurrentValue() ?? 0),
      t?.Set(e ? 1 : 0),
      t?.Apply(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MobileInputSwitch",
          11,
          "刷新手柄连接状态",
          ["isGamepadAttach", e],
          ["gameSettingHandle", void 0 !== t],
          ["MobileGamepadMode", t?.GetCurrentValue()],
        ),
      e ||
        1 !== r ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MobileInputSwitch",
            11,
            "手柄重置回触屏模式,手柄断联",
          ),
        MobileSwitchInputController_1.MobileSwitchInputController.SwitchToTouchByDisconnectGamepad()));
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
  static GetTargetConfig(e) {
    return this.CheckIfServerConfig(e)
      ? this.GetServerConfigValue(e)
      : (ModelManager_1.ModelManager.MenuModel.GetGameSettingsHandleEditValue(
          e,
        ) ?? 0);
  }
  static GetServerConfigValue(e) {
    switch (e) {
      case 59:
        return ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()
          ? 0
          : 1;
      case 136:
        return ModelManager_1.ModelManager.KuroSdkModel.PlayStationPlayOnlyState
          ? 1
          : 0;
    }
    return 0;
  }
  static CheckIfServerConfig(e) {
    switch (e) {
      case 59:
      case 136:
        return !0;
    }
    return !1;
  }
  static zxi() {
    var e = this.GetTargetConfig(6);
    return GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
      e,
    ).ToString();
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
      (e.i_enemy_id = this.GetTargetConfig(133)),
      LogReportController_1.LogReportController.LogReport(e);
  }
  static DoSetServerConfigFunction(e) {
    switch (e) {
      case 59:
        var t = !ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting();
        AdviceController_1.AdviceController.RequestSetAdviceShowState(t);
        break;
      case 136:
        t =
          !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.PlayOnly();
        ControllerHolder_1.ControllerHolder.KuroSdkController.RequestChangeServerPlayStationPlayOnlyState(
          t,
        );
    }
  }
  static NoticeChange(e) {}
  static BeforeViewClose() {
    GameSettingsManager_1.GameSettingsManager.Apply(83);
  }
  static MFe() {
    this.OpenViewFuncMap.set("LogUploadView", this.ewi),
      this.OpenViewFuncMap.set("CdKeyInputView", this.twi),
      this.OpenViewFuncMap.set("MobileSwitchInputView", this.h7a);
  }
  static IsInputControllerTypeIncludeKey(e, t) {
    switch (e) {
      case 1:
        return (
          InputSettings_1.InputSettings.IsKeyboardKey(t) ||
          InputSettings_1.InputSettings.IsMouseButton(t)
        );
      case 2:
        return InputSettings_1.InputSettings.IsGamepadKey(t);
      default:
        return !1;
    }
  }
  static StartCheckEditedMenuDataSave() {
    ModelManager_1.ModelManager.MenuModel.CheckEditedMenuDataSaveTimerId =
      TimerSystem_1.TimerSystem.Forever(() => {
        ModelManager_1.ModelManager.MenuModel.IsEdited &&
          GameSettingsManager_1.GameSettingsManager.SaveAll();
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
      t,
      r,
      n = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.锁定目标,
      );
    n &&
      ((t = []),
      n.GetPcKeyNameList((e = [])),
      n.GetGamepadKeyNameList(t),
      (n = e[0]),
      (e = t[0]),
      (n = {
        RowSpriteResourceId: "SP_SwitchType1",
        DescriptionA: "LockEnemyModeText_1",
        DescriptionParametersA: [
          `<texture=${(t = InputSettings_1.InputSettings.GetKeyIconPath(n))}/>`,
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
      (r = {
        RowSpriteResourceId: "SP_SwitchType1",
        DescriptionA: "LockEnemyModeText_1",
        DescriptionParametersA: [
          `<texture=${(e = InputSettings_1.InputSettings.GetKeyIconPath(e))}/>`,
        ],
        DescriptionB: "LockEnemyModeText_3",
        DescriptionParametersB: [`<texture=${e}/>`],
      }),
      (e = {
        RowSpriteResourceId: "SP_SwitchType2",
        DescriptionA: "LockEnemyModeText_2",
        DescriptionParametersA: [`<texture=${e}/>`],
        DescriptionB: "LockEnemyModeText_6",
      }),
      (n = {
        GroupName: "LockEnemyModeType_1",
        DefaultKeyModeRowIndex:
          GameSettingsManager_1.GameSettingsManager.GetCurrentValue(129),
        ChangeKeyModeRowList: [n, t],
      }),
      (t = {
        GroupName: "LockEnemyModeType_2",
        DefaultKeyModeRowIndex:
          GameSettingsManager_1.GameSettingsManager.GetCurrentValue(134),
        ChangeKeyModeRowList: [r, e],
      }),
      (r = {
        TitleName: "LockEnemyModeTitle",
        DefaultGroupIndex:
          2 ===
          ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType
            ? 1
            : 0,
        ChangeKeyModeGroupList: [n, t],
        OnConfirmCallback: this.ita,
      }),
      UiManager_1.UiManager.OpenView("ChangeModeTipsView", r));
  }
  static Set(e, t) {
    if (!e.CheckPlatform()) return !1;
    if (!e.CheckDeviceHardware()) return !1;
    if (e.CheckIosReviewShield()) return !1;
    let r = t;
    switch (e.SetType) {
      case 1:
        r = MathUtils_1.MathUtils.Clamp(r, e.SliderRange[0], e.SliderRange[1]);
        break;
      case 2:
        r = e.OptionsValueList.includes(t) ? t : e.OptionsDefault;
    }
    var n = GameSettingsManager_1.GameSettingsManager.Get(e.FunctionId);
    return !!n && (n.Set(r), this.RMa(e, r), !0);
  }
  static Apply(e) {
    var t;
    return (
      !!e.CheckPlatform() &&
      !(
        !e.CheckDeviceHardware() ||
        e.CheckIosReviewShield() ||
        !(t = GameSettingsManager_1.GameSettingsManager.Get(e.FunctionId)) ||
        (t.Apply(), this.KGa(e), 0)
      )
    );
  }
  static Save(e) {
    var t;
    return (
      !!e.CheckPlatform() &&
      !(
        !e.CheckDeviceHardware() ||
        e.CheckIosReviewShield() ||
        !(t = GameSettingsManager_1.GameSettingsManager.Get(e.FunctionId)) ||
        (t.Save(), this.$Ga(e), 0)
      )
    );
  }
  static KGa(e) {
    var t = GameSettingsManager_1.GameSettingsManager.Get(e.FunctionId);
    if (t) {
      t = t.GetCurrentValue();
      if (e.CanAffectedFunction(t)) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Menu",
            8,
            "[ApplyAffectedMenuData]应用此选项时，应用其他设置项",
            ["functionId", e.FunctionId],
            ["value", t],
            ["affectedFunction", e.AffectedFunction],
          );
        var r = ModelManager_1.ModelManager.MenuModel;
        for (const o of e.AffectedFunction.keys()) {
          var n = r.GetMenuDataByFunctionId(o);
          if (n) for (const i of n) this.Apply(i);
        }
      }
    }
  }
  static $Ga(e) {
    var t = GameSettingsManager_1.GameSettingsManager.Get(e.FunctionId);
    if (t) {
      t = t.GetCurrentValue();
      if (e.CanAffectedFunction(t)) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Menu",
            8,
            "[SaveAffectedMenuData]保存此选项时，保存其他设置项",
            ["functionId", e.FunctionId],
            ["value", t],
            ["affectedFunction", e.AffectedFunction],
          );
        var r = ModelManager_1.ModelManager.MenuModel;
        for (const o of e.AffectedFunction.keys()) {
          var n = r.GetMenuDataByFunctionId(o);
          if (n) for (const i of n) this.Save(i);
        }
      }
    }
  }
  static WGa(e, t) {
    if (this.CanAffectedFunction(e, t)) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Menu",
          8,
          "[SetAffectedMenuData]设置此选项时，影响其他设置项",
          ["functionId", e.FunctionId],
          ["value", t],
          ["affectedFunction", e.AffectedFunction],
        );
      var r,
        n,
        o = ModelManager_1.ModelManager.MenuModel;
      for ([r, n] of e.AffectedFunction) {
        var i = o.GetMenuDataByFunctionId(r);
        if (i) {
          for (const a of i) this.Set(a, n);
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ChangeConfigValue,
            r,
            n,
          );
        }
      }
    }
  }
  static QGa(e, t) {
    if (this.HasDisableFunction(e)) {
      var r = !this.IsAffectedDisable(e, t),
        n =
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Menu",
              8,
              "[RefreshAffectedMenuDataEnable]设置此选项时，禁用其他设置项",
              ["functionId", e.FunctionId],
              ["value", t],
              ["disableFunction", e.DisableFunction],
            ),
          ModelManager_1.ModelManager.MenuModel);
      for (const i of e.DisableFunction) {
        var o = n.GetMenuDataByFunctionId(i);
        if (o) {
          for (const a of o) a.SetEnable(r);
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnMenuDataEnableChanged,
            i,
            r,
          );
        }
      }
    }
  }
  static RMa(e, t) {
    e = e.ValueTipsMap.get(t);
    void 0 !== e &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        e,
      );
  }
  static CanAffectedFunction(e, t) {
    return e.CanAffectedFunction(t);
  }
  static IsAffectedDisable(e, t) {
    return e.DisableValueSet.has(t);
  }
  static HasDisableFunction(e) {
    return 0 < e.DisableFunction.length;
  }
  static SetApplySave(e, t) {
    return !(
      !this.Set(e, t) ||
      (e.OnSet(t), !this.Apply(e)) ||
      (e.OnApply(), !this.Save(e)) ||
      (e.OnSave(), 0)
    );
  }
  static OpenImageOverloadConfirmBox() {
    1 === GameSettingsManager_1.GameSettingsManager.GetCurrentValue(145)
      ? this.pja()
      : this.vja();
  }
  static vja() {
    let t = !1;
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(221);
    (e.HasToggle = !0),
      (e.ToggleText =
        PreloadConfigStatementPart4_1.configMultiTextLang.GetLocalTextNew(
          "MenuConfig_145_Set_Tips",
        )),
      (e.IsEscViewTriggerCallBack = !1),
      e.SetToggleFunction((e) => {
        t = e;
      }),
      e.FunctionMap.set(2, () => {
        t
          ? GameSettingsManager_1.GameSettingsManager.SetApplySave(145, 1)
          : GameSettingsManager_1.GameSettingsManager.SetApplySave(145, 0);
      }),
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static pja() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(215);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
}
(exports.MenuController = MenuController),
  ((_a = MenuController).l7a = (e, t, r) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "MobileInputSwitch",
        11,
        "刷新手柄连接状态",
        ["bIsConnected", e],
        ["platformUserId", t],
        ["controllerId", r],
      ),
      MenuController.a7a();
  }),
  (MenuController.zGa = (e, t, r) => {
    e = ModelManager_1.ModelManager.MenuModel?.GetMenuDataByFunctionId(e);
    if (e && !r) for (const n of e) _a.WGa(n, t), _a.QGa(n, t);
  }),
  (MenuController.OpenViewFuncMap = new Map()),
  (MenuController.ewi = () => {
    UiManager_1.UiManager.OpenView("LogUploadView", 2);
  }),
  (MenuController.twi = () => {
    CommonInputViewController_1.CommonInputViewController.OpenCdKeyInputView();
  }),
  (MenuController.h7a = () => {
    MobileSwitchInputController_1.MobileSwitchInputController.SwitchToGamepadByMenuSetting();
  }),
  (MenuController.ita = (e) => {
    for (var [t, r] of e)
      0 === t
        ? GameSettingsManager_1.GameSettingsManager.SetApplySave(129, r)
        : 1 === t &&
          GameSettingsManager_1.GameSettingsManager.SetApplySave(134, r);
  });
//# sourceMappingURL=MenuController.js.map
