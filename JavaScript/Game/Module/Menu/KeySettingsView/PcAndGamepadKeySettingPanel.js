"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PcAndGamepadKeySettingPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
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
  XboxGamepadItem_1 = require("./XboxGamepadItem");
class PcAndGamepadKeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.aPi = void 0),
      (this.hPi = void 0),
      (this.lPi = []),
      (this.gRn = []),
      (this.zGn = new Map()),
      (this.oPi = 0),
      (this.cPi = void 0),
      (this.mPi = void 0),
      (this.dPi = void 0),
      (this.CPi = new Map()),
      (this.gPi = 0),
      (this.fPi = []),
      (this.pPi = void 0),
      (this.vPi = void 0),
      (this.GamepadItem = void 0),
      (this.MPi = void 0),
      (this.Zbn = void 0),
      (this.SPi = () => {
        let t = this.oPi;
        (t = 1 === this.gPi ? this.EPi(2) : this.EPi(1)), this.Refresh(t);
      }),
      (this.yPi = () => {
        let t = this.oPi;
        (t = 1 === this.gPi ? this.EPi(2) : this.EPi(1)), this.Refresh(t);
      }),
      (this.IPi = () => {
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(179);
        t.FunctionMap.set(2, () => {
          InputSettingsManager_1.InputSettingsManager.ClearAllKeys(),
            InputSettingsManager_1.InputSettingsManager.RefreshAllActionKeys(
              !0,
            ),
            InputSettingsManager_1.InputSettingsManager.RefreshAllAxisKeys(!0),
            InputSettingsManager_1.InputSettingsManager.RefreshCombinationActionKeys(
              !0,
            ),
            InputSettings_1.InputSettings.SaveKeyMappings(),
            this.Refresh(this.oPi);
        }),
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
      }),
      (this.TPi = (t, i, e) => {
        this.aPi?.SelectKeySettingRow(e);
        var e = t.OpenViewType;
        0 !== e
          ? (1 === e &&
              RouletteController_1.RouletteController.OpenAssemblyView(1),
            this.LPi())
          : t.IsLock
            ? (GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                "KeyLock",
              ),
              this.LPi())
            : ((this.cPi = t),
              (this.mPi = i),
              2 === t.BothActionName.length
                ? ((e = {
                    InputControllerType: this.oPi,
                    KeySettingRowData: t,
                    OnConfirmCallback: this.DPi,
                  }),
                  UiManager_1.UiManager.OpenView("ChangeActionTipsView", e),
                  this.LPi())
                : this.RPi());
      }),
      (this.UPi = (t) => {
        1 !== this.oPi && (this.MPi = t) && (t = t.GetDisplayKeyName(this.oPi))
          ? this.GamepadItem?.SetKeysEnable(t)
          : this.GamepadItem?.SetAllKeyDisable();
      }),
      (this.APi = (t) => {
        (1 !== this.oPi && this.MPi && this.MPi.ConfigId !== t?.ConfigId) ||
          this.GamepadItem?.SetAllKeyDisable();
      }),
      (this.PPi = (t, i, e) => {
        this.hPi?.SelectKeySettingRow(e);
        var e = t.OpenViewType;
        0 !== e
          ? (1 === e &&
              RouletteController_1.RouletteController.OpenAssemblyView(1),
            this.LPi())
          : t.IsLock
            ? (GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                "KeyLock",
              ),
              this.LPi())
            : ((this.cPi = t),
              (this.mPi = i),
              2 === t.BothActionName.length
                ? ((e = {
                    InputControllerType: this.oPi,
                    KeySettingRowData: t,
                    OnConfirmCallback: this.DPi,
                  }),
                  UiManager_1.UiManager.OpenView("ChangeActionTipsView", e),
                  this.LPi())
                : this.RPi());
      }),
      (this.DPi = (t) => {
        this.cPi &&
          t &&
          (this.cPi.ChangeBothAction(this.oPi),
          this.mPi?.Refresh(this.cPi, this.oPi)),
          this.LPi();
      }),
      (this.eUt = (i, e) => {
        if (
          !UiManager_1.UiManager.IsViewOpen("RepeatKeyTipsView") &&
          ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput
        ) {
          var e = e.KeyName.toString(),
            s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
              InputMappingsDefine_1.actionMappings.放弃改键,
            );
          if (s && s.HasKey(e)) this.LPi();
          else if (this.cPi)
            if (this.cPi.IsLock)
              GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                "KeyLock",
              ),
                this.LPi();
            else if (i) this.xPi(e);
            else {
              if (1 < this.fPi.length) {
                if (!this.cPi.CanCombination)
                  return (
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Test",
                        8,
                        "[KeySetting]改键失败，原因：该输入在配置上不允许修改成组合键",
                        ["ActionOrAxisName", this.cPi.GetActionOrAxisName()],
                      ),
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wPi()
                  );
                if (!this.cPi.IsAllowCombinationKey(this.fPi[0], this.fPi[1]))
                  return (
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Test",
                        8,
                        "[KeySetting]改键失败，原因：尝试修改为组合输入，但不在允许设置的组合按键范围配置里内",
                        ["ActionOrAxisName", this.cPi.GetActionOrAxisName()],
                        ["MainKey", this.fPi[0]],
                        ["SecondKey", this.fPi[1]],
                      ),
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wPi()
                  );
              } else {
                if (!this.cPi.IsAllowKey(this.fPi[0]))
                  return (
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Test",
                        8,
                        "[KeySetting]改键失败，原因：不在允许设置的组合按键范围配置里内",
                        ["ActionOrAxisName", this.cPi.GetActionOrAxisName()],
                        ["this.EditKeyNameList[0]", this.fPi[0]],
                      ),
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wPi()
                  );
                if (
                  !MenuController_1.MenuController.IsInputControllerTypeIncludeKey(
                    this.oPi,
                    this.fPi[0],
                  )
                )
                  return (
                    GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                      "ErrorKey",
                    ),
                    void this.wPi()
                  );
              }
              let t = this.gRn;
              (InputSettings_1.InputSettings.IsKeyboardKey(e) ||
                InputSettings_1.InputSettings.IsMouseButton(e)) &&
                (t = this.lPi);
              const n = this.BPi(t, this.fPi, this.cPi);
              if (n && n.IsCheckSameKey) {
                const o = [this.fPi[0]];
                (s = this.fPi[1]),
                  (i =
                    (s && o.push(s),
                    {
                      InputControllerType: this.oPi,
                      CurrentKeySettingRowData: this.cPi,
                      RepeatKeySettingRowData: n,
                      OnCloseCallback: (t) => {
                        var i, e, s, r, h;
                        t
                          ? (this.LPi(),
                            (t = this.cPi.GetCurrentKeyName(this.oPi)),
                            n.IsActionOrAxis ||
                            this.cPi.IsActionOrAxis ||
                            n.GetActionOrAxisName() !==
                              this.cPi.GetActionOrAxisName() ||
                            n.IsCombination(this.oPi) ||
                            this.cPi.IsCombination(this.oPi)
                              ? (n.SetKey(t, this.oPi),
                                this.cPi.SetKey(o, this.oPi))
                              : ((i = this.cPi.GetAxisKeyScaleMap()),
                                (h = o[0]),
                                (e = t[0]),
                                (s = i.get(h)),
                                (r = i.get(e)) && i.set(h, r),
                                s && i.set(e, s),
                                this.cPi.SetAxisBindingKeys(i)),
                            (h = this.bPi())?.RefreshRow(this.cPi),
                            h?.RefreshRow(n),
                            this.ZGn(this.cPi, o),
                            this.ZGn(n, t),
                            InputSettings_1.InputSettings.SaveKeyMappings())
                          : this.qPi(!0);
                      },
                    }));
                this.qPi(!1),
                  void UiManager_1.UiManager.OpenView("RepeatKeyTipsView", i);
              } else
                0 < this.fPi.length &&
                  (this.cPi.SetKey(this.fPi, this.oPi),
                  this.mPi?.Refresh(this.cPi, this.oPi),
                  this.ZGn(this.cPi, this.fPi),
                  InputSettings_1.InputSettings.SaveKeyMappings(),
                  this.LPi());
            }
          else this.LPi();
        }
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
    ]),
      (this.BtnBindInfo = [
        [0, this.SPi],
        [1, this.yPi],
        [9, this.IPi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.aPi = new KeySettingPanel_1.KeySettingPanel()),
      this.aPi.BindOnWaitInput(this.TPi),
      this.aPi.BindOnHover(this.UPi),
      this.aPi.BindOnUnHover(this.APi);
    var t = this.aPi.CreateByActorAsync(this.GetItem(6).GetOwner()),
      i =
        ((this.hPi = new KeySettingPanel_1.KeySettingPanel()),
        this.hPi.BindOnWaitInput(this.PPi),
        this.hPi.BindOnHover(this.UPi),
        this.hPi.BindOnUnHover(this.APi),
        this.hPi.CreateByActorAsync(this.GetItem(5).GetOwner())),
      e =
        ((this.pPi = new XboxGamepadItem_1.XboxGamepadItem()),
        this.pPi.CreateByResourceIdAsync(
          "UiItem_HandleSetXBox",
          this.GetItem(10),
        )),
      s =
        ((this.vPi = new PsGamepadItem_1.PsGamepadItem()),
        this.vPi.CreateByResourceIdAsync(
          "UiItem_HandleSetPs",
          this.GetItem(10),
        ));
    (this.Zbn = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7))),
      await Promise.all([t, i, e, s]);
  }
  OnStart() {
    var t = ConfigManager_1.ConfigManager.MenuBaseConfig.GetAllKeyTypeConfig();
    t &&
      (this.zGn.clear(),
      this.GPi(),
      this.NPi(t),
      this.OPi(t),
      this.FPi(),
      this.Ore());
  }
  OnBeforeDestroy() {
    this.kre(),
      this.VPi(),
      this.Zbn?.Clear(),
      (this.Zbn = void 0),
      (this.aPi = void 0),
      (this.hPi = void 0),
      (this.cPi = void 0),
      (this.mPi = void 0),
      (this.pPi = void 0),
      (this.vPi = void 0),
      (this.GamepadItem = void 0),
      (this.MPi = void 0);
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnInputAnyKey,
      this.eUt,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnInputAnyKey,
      this.eUt,
    );
  }
  eOn(t, i) {
    var e = [];
    let s = t.ConnectedKeySettingId;
    for (; 0 !== s; ) {
      var r = this.tOn(s);
      if (!r) return e;
      r.SetKey(i, this.oPi), e.push(r), (s = r.ConnectedKeySettingId);
    }
    return e;
  }
  ZGn(t, i) {
    var t = this.eOn(t, i),
      e = this.bPi();
    for (const s of t) e?.RefreshRow(s);
  }
  GPi() {
    this.CPi.set(1, { DeviceType: 1, NameTextId: "Text_KeyBoard_Text" }),
      this.CPi.set(2, { DeviceType: 2, NameTextId: "Text_Handle_Text" });
  }
  NPi(t) {
    this.lPi.length = 0;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const h of t) {
      var e = h.TypeId,
        s = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 1) ?? [],
        e = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 0) ?? [],
        s = s.concat(e);
      if (!(s.length <= 0)) {
        e = new KeySettingRowData_1.KeySettingRowData();
        e.InitializeKeyType(h), this.lPi.push(e), s.sort((t, i) => t.Id - i.Id);
        for (const n of s) {
          var r = new KeySettingRowData_1.KeySettingRowData();
          r.InitializeKeySetting(n), this.lPi.push(r), this.zGn.set(n.Id, r);
        }
      }
    }
  }
  OPi(t) {
    this.gRn.length = 0;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const h of t) {
      var e = h.TypeId,
        s = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 2) ?? [],
        e = i.GetKeySettingConfigListByTypeIdAndInputControllerType(e, 0) ?? [],
        s = s.concat(e);
      if (!(s.length <= 0)) {
        e = new KeySettingRowData_1.KeySettingRowData();
        e.InitializeKeyType(h), this.gRn.push(e), s.sort((t, i) => t.Id - i.Id);
        for (const n of s) {
          var r = new KeySettingRowData_1.KeySettingRowData();
          r.InitializeKeySetting(n), this.gRn.push(r), this.zGn.set(n.Id, r);
        }
      }
    }
  }
  Refresh(t) {
    this.oPi = t;
    var i = this.HPi(t);
    this.jPi(i), this.WPi(t), this.KPi(t);
  }
  jPi(t) {
    this.gPi = t;
    var t = this.CPi.get(t);
    t &&
      ((t = t.NameTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t),
      1 === this.gPi
        ? (this.GetButton(0)?.SetSelfInteractive(!1),
          this.GetButton(1)?.SetSelfInteractive(!0))
        : (this.GetButton(0)?.SetSelfInteractive(!0),
          this.GetButton(1)?.SetSelfInteractive(!1)));
  }
  WPi(t) {
    switch (t) {
      case 1:
        this.aPi?.Refresh(this.lPi, t),
          this.aPi?.SetActive(!0),
          this.hPi?.SetActive(!1),
          this.GetItem(4)?.SetUIActive(!0),
          this.GetItem(3)?.SetUIActive(!1);
        break;
      case 2:
        this.hPi?.Refresh(this.gRn, t),
          this.hPi?.SetActive(!0),
          this.aPi?.SetActive(!1),
          this.GetItem(4)?.SetUIActive(!1),
          this.GetItem(3)?.SetUIActive(!0);
    }
  }
  KPi(t) {
    (2 === t
      ? 7 === ModelManager_1.ModelManager.PlatformModel.PlatformType
        ? ((this.GamepadItem = this.vPi), this.vPi?.SetActive(!0), this.pPi)
        : ((this.GamepadItem = this.pPi), this.pPi?.SetActive(!0), this.vPi)
      : ((this.GamepadItem = void 0), this.vPi?.SetActive(!1), this.pPi)
    )?.SetActive(!1);
  }
  HPi(t) {
    switch (t) {
      case 1:
        return 1;
      case 2:
        return 2;
    }
    return 0;
  }
  EPi(t) {
    return 1 === t ? 1 : 2;
  }
  BPi(t, i, e) {
    if (!(i.length <= 0))
      for (const s of t) if (s !== e && s.HasKey(i, this.oPi)) return s;
  }
  RPi() {
    this.aPi?.StopScroll(),
      this.hPi?.StopScroll(),
      (this.dPi = TimerSystem_1.TimerSystem.Next(() => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Test", 8, "[KeySetting]当等待键盘输入改键时"),
          this.GamepadItem?.SetAllKeyDisable(),
          (this.MPi = void 0),
          this.VPi(),
          this.qPi(!0),
          this.FPi("EditKey_Text");
      }));
  }
  LPi() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Test", 8, "[KeySetting]当输入改键结束时"),
      this.qPi(!1),
      this.VPi(),
      this.FPi(),
      this.bPi()?.SelectKeySettingRow(void 0),
      UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", !1);
  }
  xPi(t) {
    this.fPi.push(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[KeySetting]记录要设置的按键", [
          "EditKeyNameList",
          this.fPi,
        ]);
  }
  qPi(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Test", 8, "[KeySetting]设置是否允许输入", ["isWait", t]),
      this.wPi(),
      (ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput = t),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", t);
  }
  wPi() {
    this.fPi.length = 0;
  }
  VPi() {
    this.dPi &&
      TimerSystem_1.TimerSystem.Has(this.dPi) &&
      (TimerSystem_1.TimerSystem.Remove(this.dPi), (this.dPi = void 0));
  }
  FPi(t) {
    StringUtils_1.StringUtils.IsEmpty(t)
      ? (this.GetItem(7)?.SetUIActive(!1),
        this.GetItem(11)?.SetUIActive(!0),
        this.Zbn.StopCurrentSequence())
      : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t),
        this.GetItem(7)?.SetUIActive(!0),
        this.GetItem(11)?.SetUIActive(!1),
        this.Zbn.PlayLevelSequenceByName("Start"));
  }
  tOn(t) {
    return this.zGn.get(t);
  }
  bPi() {
    switch (this.oPi) {
      case 1:
        return this.aPi;
      case 2:
        return this.hPi;
    }
  }
}
exports.PcAndGamepadKeySettingPanel = PcAndGamepadKeySettingPanel;
//# sourceMappingURL=PcAndGamepadKeySettingPanel.js.map
