"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  CommonInputViewController_1 = require("../Common/InputView/Controller/CommonInputViewController"),
  ConfirmBoxController_1 = require("../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  MenuDefine_1 = require("./MenuDefine");
class MenuController extends UiControllerBase_1.UiControllerBase {
  static get ukc() {
    return Info_1.Info.IsMacPlatform()
      ? MenuDefine_1.makeImageQualityCustomSetForMac
      : MenuDefine_1.makeImageQualityCustomSet;
  }
  static OnInit() {
    return (
      MenuController.MFe(),
      MenuController.cXa(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Menu", 64, "设置系统Controller初始化"),
      !0
    );
  }
  static OnClear() {
    return !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ControllerConnectChange,
      MenuController.lWa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        MenuController.jLc,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ControllerConnectChange,
      MenuController.lWa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        MenuController.jLc,
      );
  }
  static HandleFireSaveMenuChange(e, t) {
    var n = e.FunctionId;
    n === GameSettingsDefine_1.EFunction.IMAGEQUALITY
      ? (ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom = !1)
      : this.ukc.has(n) &&
        (ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom = !0),
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(n, t, 1),
      this.a0c(e),
      this.KNa(e),
      this.pMa(e, t),
      MenuDefine_1.noticeConfigSet.has(n) &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ConfigLoadChange,
          n,
        ),
      (ModelManager_1.ModelManager.MenuModel.IsEdited = !0);
  }
  static a0c(e) {
    const t = e.FunctionId;
    if (t === GameSettingsDefine_1.EFunction.IMAGEQUALITY) {
      var n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
      if (void 0 === n) return;
      n =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(
          n,
        );
      if (void 0 !== n)
        for (const [
          t,
          i,
        ] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(
          n,
        ))
          (t === GameSettingsDefine_1.EFunction.MOBILERESOLUTION &&
            !Info_1.Info.IsMobilePlatform()) ||
            (t === GameSettingsDefine_1.EFunction.PCVSYNC &&
              !Info_1.Info.IsPcOrGamepadPlatform()) ||
            GameSettingsManager_1.GameSettingsManager.HandleValueChange(
              t,
              i,
              1,
            );
    }
    this.ukc.has(t) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMenuSetting,
        GameSettingsDefine_1.EFunction.IMAGEQUALITY,
      ),
      t === GameSettingsDefine_1.EFunction.RayTracing &&
        ModelManager_1.ModelManager.MenuModel.NeedRayTracingSubChange &&
        void 0 !==
          (n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t)) &&
        (GameSettingsManager_1.GameSettingsManager.IsValid(
          GameSettingsDefine_1.EFunction.RayTracedGI,
        )
          ? GameSettingsManager_1.GameSettingsManager.HandleValueChange(
              GameSettingsDefine_1.EFunction.RayTracedGI,
              0 < n ? 1 : 0,
              1,
            )
          : GameSettingsManager_1.GameSettingsManager.ForceSaveValue(
              GameSettingsDefine_1.EFunction.RayTracedGI,
              0 < n ? 1 : 0,
            ),
        GameSettingsManager_1.GameSettingsManager.IsValid(
          GameSettingsDefine_1.EFunction.RayTracedReflection,
        )
          ? GameSettingsManager_1.GameSettingsManager.HandleValueChange(
              GameSettingsDefine_1.EFunction.RayTracedReflection,
              0 < n ? 1 : 0,
              1,
            )
          : GameSettingsManager_1.GameSettingsManager.ForceSaveValue(
              GameSettingsDefine_1.EFunction.RayTracedReflection,
              0 < n ? 1 : 0,
            ),
        GameSettingsManager_1.GameSettingsManager.IsValid(
          GameSettingsDefine_1.EFunction.RayTracedGI,
        )
          ? GameSettingsManager_1.GameSettingsManager.HandleValueChange(
              GameSettingsDefine_1.EFunction.RayTracedShadow,
              0 < n ? 1 : 0,
              1,
            )
          : GameSettingsManager_1.GameSettingsManager.ForceSaveValue(
              GameSettingsDefine_1.EFunction.RayTracedShadow,
              0 < n ? 1 : 0,
            ));
    const i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
    if (void 0 !== i && e.CanAffectedFunction(i))
      for (var [a, r] of e.AffectedFunction)
        GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.has(a) &&
          GameSettingsManager_1.GameSettingsManager.HandleValueChange(a, r, 1);
  }
  static KNa(e) {
    var t = e.FunctionId;
    if (e.HasDisableFunction) {
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
      if (void 0 !== t)
        for (const n of e.DisableFunction)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshMenuSetting,
            n,
          );
    }
  }
  static pMa(e, t) {
    var n,
      i,
      a,
      r = e.FunctionId;
    if (
      r === GameSettingsDefine_1.EFunction.NVIDIADLSSFG ||
      r === GameSettingsDefine_1.EFunction.RESOLUTION ||
      r === GameSettingsDefine_1.EFunction.DISPLAYMODE
    )
      return (
        (a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.DISPLAYMODE,
        )),
        (i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.RESOLUTION,
        )),
        (n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.NVIDIADLSSFG,
        )),
        void 0 === a || void 0 === i || void 0 === n
          ? void 0
          : ((a = 0 === a ? 0 : i),
            (i =
              GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
                a,
              )),
            void (
              0 < n &&
              GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidia4060() &&
              3840 <= i.X &&
              2160 <= i.Y &&
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "Change4KWarning_Text",
              )
            ))
      );
    r === GameSettingsDefine_1.EFunction.RayTracing
      ? 0 < t &&
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDriverNeedUpdateForRayTracing() &&
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "UpdateGraphicsCardDriver_Text",
        )
      : void 0 !== (a = e.ValueTipsMap.get(t)) &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          a,
        );
  }
  static cXa() {
    var e, t;
    Info_1.Info.IsMobileInputModel() &&
      ((e = ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached()),
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(
        GameSettingsDefine_1.EFunction.MobileGamepadMode,
        e ? 1 : 0,
        1,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MobileInputSwitch",
          10,
          "初始化手柄连接状态",
          ["isGamepadAttach", e],
          [
            "MobileGamepadMode",
            GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
              GameSettingsDefine_1.EFunction.MobileGamepadMode,
            ),
          ],
        ),
      e &&
        ((t =
          ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceInputController()),
        Info_1.Info.SwitchInputControllerType(t, "InitGamepadConnect")),
      (ModelManager_1.ModelManager.PlatformModel.LastGamepadAttachedState = e));
  }
  static RefreshGamepadConnect() {
    var e, t;
    Info_1.Info.IsMobileInputModel() &&
      ((e = ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached()),
      (t = ModelManager_1.ModelManager.PlatformModel.LastGamepadAttachedState),
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(
        GameSettingsDefine_1.EFunction.MobileGamepadMode,
        e ? 1 : 0,
        1,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MobileInputSwitch",
          10,
          "刷新手柄连接状态",
          ["isGamepadAttach", e],
          [
            "MobileGamepadMode",
            GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
              GameSettingsDefine_1.EFunction.MobileGamepadMode,
            ),
          ],
        ),
      !e &&
        t &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MobileInputSwitch",
            10,
            "手柄重置回触屏模式,手柄断联",
          ),
        MobileSwitchInputController_1.MobileSwitchInputController.SwitchToTouchByDisconnectGamepad()),
      (ModelManager_1.ModelManager.PlatformModel.LastGamepadAttachedState = e));
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
    var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
    return void 0 === t
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Menu", 64, "Menu中获取选项值失败，返回缺省值0", [
            "functionId",
            e,
          ]),
        0)
      : t;
  }
  static zxi() {
    var e = this.GetTargetConfig(GameSettingsDefine_1.EFunction.RESOLUTION);
    return GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
      e,
    ).ToString();
  }
  static ReportSettingMenuLogEvent() {
    var e = new LogReportDefine_1.SettingMenuLogEvent();
    (e.i_image_quality = this.GetTargetConfig(
      GameSettingsDefine_1.EFunction.IMAGEQUALITY,
    )),
      (e.i_display_mode = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.DISPLAYMODE,
      )),
      (e.s_resolution = this.zxi()),
      (e.i_brightness = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.BRIGHTNESS,
      )),
      (e.i_highest_fps = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.HIGHESTFPS,
      )),
      (e.i_shadow_quality = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.SHADOWQUALITY,
      )),
      (e.i_niagara_quality = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
      )),
      (e.i_fsr = this.GetTargetConfig(GameSettingsDefine_1.EFunction.FSR)),
      (e.i_image_detail = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.IMAGEDETAIL,
      )),
      (e.i_scene_ao = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.SCENEAO,
      )),
      (e.i_volume_Fog = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.VOLUMEFOG,
      )),
      (e.i_volume_light = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.VOLUMELIGHT,
      )),
      (e.i_motion_blur = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.MOTIONBLUR,
      )),
      (e.i_anti_aliasing = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.ANTIALISING,
      )),
      (e.i_pcv_sync = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.PCVSYNC,
      )),
      (e.i_horizontal_view_sensitivity = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.HorizontalViewSensitivity,
      )),
      (e.i_vertical_view_sensitivity = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.VerticalViewSensitivity,
      )),
      (e.i_aim_horizontal_view_sensitivity = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity,
      )),
      (e.i_aim_vertical_view_sensitivity = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity,
      )),
      (e.f_camera_shake_strength = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.CameraShakeStrength,
      )),
      (e.i_common_spring_arm_length = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.CommonSpringArmLength,
      )),
      (e.i_fight_spring_arm_length = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.FightSpringArmLength,
      )),
      (e.i_reset_focus_enable = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.ResetFocusEnable,
      )),
      (e.i_side_step_camera_enable = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.IsSidestepCameraEnable,
      )),
      (e.i_soft_lock_camera_enable = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.IsSoftLockCameraEnable,
      )),
      (e.i_joystick_shake_strength = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.JoystickShakeStrength,
      )),
      (e.i_joystick_shake_type = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.JoystickShakeType,
      )),
      (e.f_walk_or_run_rate = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.WalkOrRunRate,
      )),
      (e.i_advice_setting = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.ADVICESETTING,
      )),
      (e.i_enemy_id = this.GetTargetConfig(
        GameSettingsDefine_1.EFunction.SkillLockEnemyMode,
      )),
      LogReportController_1.LogReportController.LogReport(e);
  }
  static BeforeViewClose() {
    GameSettingsManager_1.GameSettingsManager.ReApply(
      GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY,
      1,
    );
  }
  static MFe() {
    this.OpenViewFuncMap.set("LogUploadView", this.ewi),
      this.OpenViewFuncMap.set("CdKeyInputView", this.twi),
      this.OpenViewFuncMap.set("MobileSwitchInputView", this._Wa),
      this.OpenViewFuncMap.set("ResDownLoadView", this.rb1);
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
  static OpenChangeLockView() {
    var e,
      t,
      n,
      i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.锁定目标,
      );
    i &&
      ((t = []),
      i.GetPcKeyNameList((e = [])),
      i.GetGamepadKeyNameList(t),
      (i = e[0]),
      (e = t[0]),
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
      (n = {
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
      (i = {
        GroupName: "LockEnemyModeType_1",
        DefaultKeyModeRowIndex:
          GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
            GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode,
          ) ?? 0,
        ChangeKeyModeRowList: [i, t],
      }),
      (t = {
        GroupName: "LockEnemyModeType_2",
        DefaultKeyModeRowIndex:
          GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
            GameSettingsDefine_1.EFunction.GamepadLockEnemyMode,
          ) ?? 0,
        ChangeKeyModeRowList: [n, e],
      }),
      (n = {
        TitleName: "LockEnemyModeTitle",
        DefaultGroupIndex:
          2 ===
          ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType
            ? 1
            : 0,
        ChangeKeyModeGroupList: [i, t],
        OnConfirmCallback: this.ita,
      }),
      UiManager_1.UiManager.OpenView("ChangeModeTipsView", n));
  }
  static OpenImageOverloadConfirmBox() {
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
      GameSettingsDefine_1.EFunction.AutoAdjustImageQuality,
    );
    void 0 !== e &&
      (1 === e ? this.OpenImageQualityOverloadConfirmBox() : this.wKa());
  }
  static wKa() {
    let t = !1;
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(221);
    (e.HasToggle = !0),
      (e.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "MenuConfig_145_Set_Tips",
      )),
      (e.IsEscViewTriggerCallBack = !1),
      e.SetToggleFunction((e) => {
        t = e;
      }),
      e.FunctionMap.set(2, () => {
        t
          ? GameSettingsManager_1.GameSettingsManager.HandleValueChange(
              GameSettingsDefine_1.EFunction.AutoAdjustImageQuality,
              1,
              1,
            )
          : GameSettingsManager_1.GameSettingsManager.HandleValueChange(
              GameSettingsDefine_1.EFunction.AutoAdjustImageQuality,
              0,
              1,
            );
      }),
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static OpenImageQualityOverloadConfirmBox() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(215);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
}
((exports.MenuController = MenuController).lWa = (e, t, n) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info(
      "MobileInputSwitch",
      10,
      "刷新手柄连接状态",
      ["bIsConnected", e],
      ["platformUserId", t],
      ["controllerId", n],
    ),
    MenuController.RefreshGamepadConnect();
}),
  (MenuController.jLc = () => {
    Info_1.Info.IsInGamepad() &&
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.LastGamepadEnum,
        Info_1.Info.InputControllerType,
      );
  }),
  (MenuController.OpenViewFuncMap = new Map()),
  (MenuController.ewi = () => {
    UiManager_1.UiManager.OpenView("LogUploadView", 2);
  }),
  (MenuController.twi = () => {
    CommonInputViewController_1.CommonInputViewController.OpenCdKeyInputView();
  }),
  (MenuController._Wa = () => {
    MobileSwitchInputController_1.MobileSwitchInputController.SwitchToGamepadByMenuSetting();
  }),
  (MenuController.rb1 = () => {
    UiManager_1.UiManager.OpenView("ResDownLoadView", 2);
  }),
  (MenuController.ita = (e) => {
    for (var [t, n] of e)
      0 === t
        ? GameSettingsManager_1.GameSettingsManager.HandleValueChange(
            GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode,
            n,
            1,
          )
        : 1 === t &&
          GameSettingsManager_1.GameSettingsManager.HandleValueChange(
            GameSettingsDefine_1.EFunction.GamepadLockEnemyMode,
            n,
            1,
          );
  });
//# sourceMappingURL=MenuController.js.map
