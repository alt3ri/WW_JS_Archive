"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PcAndGamepadKeySettingPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  Platform_1 = require("../../../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  InputSettingsController_1 = require("../../../InputSettings/InputSettingsController"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController"),
  RouletteController_1 = require("../../Roulette/RouletteController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  KeySettingPanel_1 = require("./KeySettingPanel"),
  KeySettingRowData_1 = require("./KeySettingRowData"),
  PsGamepadItem_1 = require("./PsGamepadItem"),
  XboxGamepadItem_1 = require("./XboxGamepadItem"),
  GAMEPAD_CONFIRM_AND_CANCEL_KEYSETTING_ID = 100;
class PcAndGamepadKeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.axi = void 0),
      (this.hxi = void 0),
      (this.lxi = []),
      (this.bAn = []),
      (this.Lkn = new Map()),
      (this.oxi = 0),
      (this.cxi = void 0),
      (this.mxi = void 0),
      (this.dxi = void 0),
      (this.Cxi = new Map()),
      (this.gxi = 0),
      (this.fxi = []),
      (this.pxi = void 0),
      (this.vxi = void 0),
      (this.GamepadItem = void 0),
      (this.Mxi = void 0),
      (this.m2n = void 0),
      (this.Exi = () => {
        let t = this.oxi;
        (t = 1 === this.gxi ? this.Sxi(2) : this.Sxi(1)), this.Refresh(t);
      }),
      (this.yxi = () => {
        let t = this.oxi;
        (t = 1 === this.gxi ? this.Sxi(2) : this.Sxi(1)), this.Refresh(t);
      }),
      (this.Ixi = () => {
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(179);
        t.FunctionMap.set(2, () => {
          InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey(),
            InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(),
            this.Refresh(this.oxi);
        }),
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
      }),
      (this.Txi = (t, i, e) => {
        this.axi?.SelectKeySettingRow(e);
        var e = t.OpenViewType;
        if (0 !== e) {
          switch (e) {
            case 1:
              RouletteController_1.RouletteController.OpenAssemblyView(1);
              break;
            case 2:
              MenuController_1.MenuController.OpenChangeLockView();
          }
          this.Lxi();
        } else
          t.IsLock
            ? (GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                "KeyLock",
              ),
              this.Lxi())
            : ((this.cxi = t),
              (this.mxi = i),
              2 === t.BothActionName.length
                ? ((e = {
                    InputControllerType: this.oxi,
                    KeySettingRowData: t,
                    OnConfirmCallback: this.Dxi,
                  }),
                  UiManager_1.UiManager.OpenView("ChangeActionTipsView", e),
                  this.Lxi())
                : this.Rxi());
      }),
      (this.Uxi = (t) => {
        1 !== this.oxi && (this.Mxi = t) && (t = t.GetDisplayKeyName(this.oxi))
          ? this.GamepadItem?.SetKeysEnable(t)
          : this.GamepadItem?.SetAllKeyDisable();
      }),
      (this.Axi = (t) => {
        (1 !== this.oxi && this.Mxi && this.Mxi.ConfigId !== t?.ConfigId) ||
          this.GamepadItem?.SetAllKeyDisable();
      }),
      (this.Pxi = (t, i, e) => {
        this.hxi?.SelectKeySettingRow(e);
        var e = t.OpenViewType;
        if (0 !== e) {
          switch (e) {
            case 1:
              RouletteController_1.RouletteController.OpenAssemblyView(1);
              break;
            case 2:
              MenuController_1.MenuController.OpenChangeLockView();
          }
          this.Lxi();
        } else
          t.IsLock
            ? (GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                "KeyLock",
              ),
              this.Lxi())
            : ((this.cxi = t),
              (this.mxi = i),
              2 === t.BothActionName.length
                ? ((e = {
                    InputControllerType: this.oxi,
                    KeySettingRowData: t,
                    OnConfirmCallback: this.Dxi,
                  }),
                  UiManager_1.UiManager.OpenView("ChangeActionTipsView", e),
                  this.Lxi())
                : this.Rxi());
      }),
      (this.Dxi = (t) => {
        this.cxi &&
          t &&
          (this.cxi.ChangeBothAction(this.oxi),
          this.mxi?.Refresh(this.cxi, this.oxi),
          InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(),
          InputSettings_1.InputSettings.SaveKeyMappings()),
          this.Lxi();
      }),
      (this.rAt = (i, e) => {
        if (
          !UiManager_1.UiManager.IsViewOpen("RepeatKeyTipsView") &&
          ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput
        ) {
          var e = e.KeyName.toString(),
            s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
              InputMappingsDefine_1.actionMappings.放弃改键,
            );
          if (s && s.HasKey(e)) this.Lxi();
          else if (this.cxi)
            if (this.cxi.IsLock)
              GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                "KeyLock",
              ),
                this.Lxi();
            else if (i) this.xxi(e);
            else {
              if (1 < this.fxi.length) {
                if (!this.cxi.CanCombination)
                  return (
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Test",
                        8,
                        "[KeySetting]改键失败，原因：该输入在配置上不允许修改成组合键",
                        ["ActionOrAxisName", this.cxi.GetActionOrAxisName()],
                      ),
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wxi()
                  );
                if (!this.cxi.IsAllowCombinationKey(this.fxi[0], this.fxi[1]))
                  return (
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Test",
                        8,
                        "[KeySetting]改键失败，原因：尝试修改为组合输入，但不在允许设置的组合按键范围配置里内",
                        ["ActionOrAxisName", this.cxi.GetActionOrAxisName()],
                        ["MainKey", this.fxi[0]],
                        ["SecondKey", this.fxi[1]],
                      ),
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wxi()
                  );
              } else {
                if (!this.cxi.IsAllowKey(this.fxi[0]))
                  return (
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Test",
                        8,
                        "[KeySetting]改键失败，原因：不在允许设置的组合按键范围配置里内",
                        ["ActionOrAxisName", this.cxi.GetActionOrAxisName()],
                        ["this.EditKeyNameList[0]", this.fxi[0]],
                      ),
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wxi()
                  );
                if (
                  !MenuController_1.MenuController.IsInputControllerTypeIncludeKey(
                    this.oxi,
                    this.fxi[0],
                  )
                )
                  return (
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wxi()
                  );
              }
              let t = this.bAn;
              (InputSettings_1.InputSettings.IsKeyboardKey(e) ||
                InputSettings_1.InputSettings.IsMouseButton(e)) &&
                (t = this.lxi);
              const h = this.Bxi(t, this.fxi, this.cxi);
              if (h && h.IsCheckSameKey) {
                const o = [this.fxi[0]];
                (s = this.fxi[1]),
                  (i =
                    (s && o.push(s),
                    {
                      InputControllerType: this.oxi,
                      CurrentKeySettingRowData: this.cxi,
                      RepeatKeySettingRowData: h,
                      OnCloseCallback: (t) => {
                        var i, e, s, r, n;
                        t
                          ? (this.Lxi(),
                            (t = this.cxi.GetCurrentKeyName(this.oxi)),
                            h.IsActionOrAxis ||
                            this.cxi.IsActionOrAxis ||
                            h.GetActionOrAxisName() !==
                              this.cxi.GetActionOrAxisName() ||
                            h.IsCombination(this.oxi) ||
                            this.cxi.IsCombination(this.oxi)
                              ? (h.SetKey(t, this.oxi),
                                this.cxi.SetKey(o, this.oxi))
                              : ((i = this.cxi.GetAxisKeyScaleMap()),
                                (n = o[0]),
                                (e = t[0]),
                                (s = i.get(n)),
                                (r = i.get(e)) && i.set(n, r),
                                s && i.set(e, s),
                                this.cxi.SetAxisBindingKeys(i)),
                            (n = this.bxi())?.RefreshRow(this.cxi),
                            n?.RefreshRow(h),
                            this.Dkn(this.cxi, o),
                            this.Dkn(h, t),
                            InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(),
                            InputSettings_1.InputSettings.SaveKeyMappings())
                          : this.qxi(!0);
                      },
                    }));
                this.qxi(!1),
                  void UiManager_1.UiManager.OpenView("RepeatKeyTipsView", i);
              } else
                0 < this.fxi.length &&
                  (this.cxi.SetKey(this.fxi, this.oxi),
                  this.mxi?.Refresh(this.cxi, this.oxi),
                  this.Dkn(this.cxi, this.fxi),
                  InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(),
                  InputSettings_1.InputSettings.SaveKeyMappings(),
                  this.Lxi());
            }
          else this.Lxi();
        }
      }),
      (this.DXa = () => {
        1 === this.gxi &&
          (this.GetItem(7)?.bIsUIActive && this.Lxi(), this.Refresh(1));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.Exi],
        [1, this.yxi],
        [9, this.Ixi],
        [14, this.Ixi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.axi = new KeySettingPanel_1.KeySettingPanel()),
      this.axi.BindOnWaitInput(this.Txi),
      this.axi.BindOnHover(this.Uxi),
      this.axi.BindOnUnHover(this.Axi);
    var t = this.axi.CreateByActorAsync(this.GetItem(6).GetOwner()),
      i =
        ((this.hxi = new KeySettingPanel_1.KeySettingPanel()),
        this.hxi.BindOnWaitInput(this.Pxi),
        this.hxi.BindOnHover(this.Uxi),
        this.hxi.BindOnUnHover(this.Axi),
        this.hxi.CreateByActorAsync(this.GetItem(5).GetOwner())),
      e =
        ((this.pxi = new XboxGamepadItem_1.XboxGamepadItem()),
        this.pxi.CreateByResourceIdAsync(
          "UiItem_HandleSetXBox",
          this.GetItem(10),
        )),
      s =
        ((this.vxi = new PsGamepadItem_1.PsGamepadItem()),
        this.vxi.CreateByResourceIdAsync(
          "UiItem_HandleSetPs",
          this.GetItem(10),
        ));
    (this.m2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7))),
      await Promise.all([t, i, e, s]);
  }
  OnStart() {
    var t = ConfigManager_1.ConfigManager.MenuBaseConfig.GetAllKeyTypeConfig();
    t &&
      (this.Lkn.clear(),
      this.Gxi(),
      this.Nxi(t),
      this.Oxi(t),
      this.DOa(),
      this.Fxi(),
      this.Ore());
  }
  OnBeforeDestroy() {
    this.kre(),
      this.Vxi(),
      this.m2n?.Clear(),
      (this.m2n = void 0),
      (this.axi = void 0),
      (this.hxi = void 0),
      (this.cxi = void 0),
      (this.mxi = void 0),
      (this.pxi = void 0),
      (this.vxi = void 0),
      (this.GamepadItem = void 0),
      (this.Mxi = void 0);
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnInputAnyKey,
      this.rAt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnDeviceLangChange,
        this.DXa,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnInputAnyKey,
      this.rAt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnDeviceLangChange,
        this.DXa,
      );
  }
  Akn(t, i) {
    var e = [];
    let s = t.ConnectedKeySettingId;
    for (; 0 !== s; ) {
      var r = this.Ukn(s);
      if (!r) return e;
      r.SetKey(i, this.oxi), e.push(r), (s = r.ConnectedKeySettingId);
    }
    return e;
  }
  Dkn(t, i) {
    var t = this.Akn(t, i),
      e = this.bxi();
    for (const s of t) e?.RefreshRow(s);
  }
  Gxi() {
    this.Cxi.set(1, { DeviceType: 1, NameTextId: "Text_KeyBoard_Text" }),
      this.Cxi.set(2, { DeviceType: 2, NameTextId: "Text_Handle_Text" });
  }
  Nxi(t) {
    this.lxi.length = 0;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const n of t) {
      var e = n.TypeId,
        s = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 1) ?? [],
        e = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 0) ?? [],
        s = s.concat(e);
      if (!(s.length <= 0)) {
        e = new KeySettingRowData_1.KeySettingRowData();
        e.InitializeKeyType(n), this.lxi.push(e), s.sort((t, i) => t.Id - i.Id);
        for (const h of s) {
          var r = new KeySettingRowData_1.KeySettingRowData();
          r.InitializeKeySetting(h), this.lxi.push(r), this.Lkn.set(h.Id, r);
        }
      }
    }
  }
  Oxi(t) {
    this.bAn.length = 0;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const n of t) {
      var e = n.TypeId,
        s = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 2) ?? [],
        e = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 0) ?? [],
        s = s.concat(e);
      if (!(s.length <= 0)) {
        var r,
          e = new KeySettingRowData_1.KeySettingRowData();
        e.InitializeKeyType(n), this.bAn.push(e), s.sort((t, i) => t.Id - i.Id);
        for (const h of s)
          (Platform_1.Platform.IsPs5Platform() &&
            h.Id === GAMEPAD_CONFIRM_AND_CANCEL_KEYSETTING_ID) ||
            ((r =
              new KeySettingRowData_1.KeySettingRowData()).InitializeKeySetting(
              h,
            ),
            this.bAn.push(r),
            this.Lkn.set(h.Id, r));
      }
    }
  }
  DOa() {
    var t = Platform_1.Platform.IsPs5Platform(),
      i = Info_1.Info.IsMobilePlatform() && Info_1.Info.IsInGamepad();
    this.GetButton(0)?.RootUIComp.SetUIActive(!t && !i),
      this.GetButton(1)?.RootUIComp.SetUIActive(!t && !i),
      this.GetButton(9)?.RootUIComp.SetUIActive(!t),
      this.GetItem(13)?.SetUIActive(t),
      this.GetItem(12)?.SetUIActive(!t);
  }
  Refresh(t) {
    this.oxi = t;
    var i = this.Hxi(t);
    this.jxi(i), this.Wxi(t), this.Kxi(t);
  }
  jxi(t) {
    this.gxi = t;
    var t = this.Cxi.get(t);
    t &&
      ((t = t.NameTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t),
      1 === this.gxi
        ? (this.GetButton(0)?.SetSelfInteractive(!1),
          this.GetButton(1)?.SetSelfInteractive(!0))
        : (this.GetButton(0)?.SetSelfInteractive(!0),
          this.GetButton(1)?.SetSelfInteractive(!1)));
  }
  Wxi(t) {
    switch (t) {
      case 1:
        this.axi?.Refresh(this.lxi, t),
          this.axi?.SetActive(!0),
          this.hxi?.SetActive(!1),
          this.GetItem(4)?.SetUIActive(!0),
          this.GetItem(3)?.SetUIActive(!1);
        break;
      case 2:
        this.hxi?.Refresh(this.bAn, t),
          this.hxi?.SetActive(!0),
          this.axi?.SetActive(!1),
          this.GetItem(4)?.SetUIActive(!1),
          this.GetItem(3)?.SetUIActive(!0);
    }
  }
  Kxi(t) {
    (2 === t
      ? Info_1.Info.IsPsGamepad()
        ? ((this.GamepadItem = this.vxi), this.vxi?.SetActive(!0), this.pxi)
        : ((this.GamepadItem = this.pxi), this.pxi?.SetActive(!0), this.vxi)
      : ((this.GamepadItem = void 0), this.vxi?.SetActive(!1), this.pxi)
    )?.SetActive(!1);
  }
  Hxi(t) {
    switch (t) {
      case 1:
        return 1;
      case 2:
        return 2;
    }
    return 0;
  }
  Sxi(t) {
    return 1 === t ? 1 : 2;
  }
  Bxi(t, i, e) {
    if (!(i.length <= 0))
      for (const s of t) if (s !== e && s.HasKey(i, this.oxi)) return s;
  }
  Rxi() {
    this.axi?.StopScroll(),
      this.hxi?.StopScroll(),
      (this.dxi = TimerSystem_1.TimerSystem.Next(() => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Test", 8, "[KeySetting]当等待键盘输入改键时"),
          this.GamepadItem?.SetAllKeyDisable(),
          (this.Mxi = void 0),
          this.Vxi(),
          this.qxi(!0),
          this.Fxi("EditKey_Text");
      }));
  }
  Lxi() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Test", 8, "[KeySetting]当输入改键结束时"),
      this.qxi(!1),
      this.Vxi(),
      this.Fxi(),
      this.bxi()?.SelectKeySettingRow(void 0),
      UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", !1);
  }
  xxi(t) {
    this.fxi.push(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[KeySetting]记录要设置的按键", [
          "EditKeyNameList",
          this.fxi,
        ]);
  }
  qxi(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Test", 8, "[KeySetting]设置是否允许输入", ["isWait", t]),
      this.wxi(),
      (ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput = t),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", t);
  }
  wxi() {
    this.fxi.length = 0;
  }
  Vxi() {
    this.dxi &&
      TimerSystem_1.TimerSystem.Has(this.dxi) &&
      (TimerSystem_1.TimerSystem.Remove(this.dxi), (this.dxi = void 0));
  }
  Fxi(t) {
    StringUtils_1.StringUtils.IsEmpty(t)
      ? (this.GetItem(7)?.SetUIActive(!1),
        this.GetItem(11)?.SetUIActive(!0),
        this.m2n.StopCurrentSequence())
      : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t),
        this.GetItem(7)?.SetUIActive(!0),
        this.GetItem(11)?.SetUIActive(!1),
        this.m2n.PlayLevelSequenceByName("Start"));
  }
  Ukn(t) {
    return this.Lkn.get(t);
  }
  bxi() {
    switch (this.oxi) {
      case 1:
        return this.axi;
      case 2:
        return this.hxi;
    }
  }
  GetGuideItemByKeySettingId(t, i) {
    var e = this.bxi(),
      t = this.Ukn(t);
    if (e && t) return e.GetRowByData(t, i)?.GetRootItem();
  }
}
exports.PcAndGamepadKeySettingPanel = PcAndGamepadKeySettingPanel;
//# sourceMappingURL=PcAndGamepadKeySettingPanel.js.map
