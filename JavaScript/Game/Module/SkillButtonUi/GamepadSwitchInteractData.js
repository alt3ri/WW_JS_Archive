"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadSwitchInteractData = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class GamepadSwitchInteractData {
  constructor() {
    (this.IsSwitchInteractOpen = !1),
      (this.State = 0),
      (this.Uah = new Set()),
      (this.SwitchTime = 0),
      (this.xah = void 0),
      (this.Pah = !1),
      (this.wah = () => {
        this.Owt(2), (this.xah = void 0);
      });
  }
  Init() {
    this.SwitchTime =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "SwitchInteractTime",
      ) ?? 500;
  }
  SetInteractExist(t, e) {
    t ? this.Uah.add(e) : this.Uah.delete(e), this.Bah(0 < this.Uah.size);
  }
  RefreshSwitchInteractOpen(t = !1) {
    var e =
      ModelManager_1.ModelManager.MenuModel.GetGamepadOperationPreferences();
    e !== this.IsSwitchInteractOpen &&
      ((this.IsSwitchInteractOpen = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "[SwitchInteract]是否开启交互切换探索", [
          "",
          e,
        ]),
      t ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiSwitchInteractOpenChanged,
          e,
        ),
      this.Bah(0 < this.Uah.size),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
  InputInteractButton(t) {
    t
      ? this.IsSwitchInteractOpen &&
        Info_1.Info.IsInGamepad() &&
        2 === this.State &&
        ((this.Pah = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[SwitchInteract]按下交互，同时触发按下探索工具",
          ),
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(
          InputMappingsDefine_1.actionMappings.幻象1,
          !0,
        ))
      : this.Pah &&
        ((this.Pah = !1),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[SwitchInteract]抬起交互，同时触发抬起探索工具",
          ),
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(
          InputMappingsDefine_1.actionMappings.幻象1,
          !1,
        ));
  }
  Bah(t) {
    if (this.IsSwitchInteractOpen)
      if (t)
        switch (this.State) {
          case 0:
            break;
          case 1:
          case 2:
            this.bah(), this.Owt(0);
        }
      else
        0 === this.State &&
          (this.Owt(1),
          this.bah(),
          (this.xah = TimerSystem_1.TimerSystem.Delay(
            this.wah,
            this.SwitchTime,
          )));
    else this.Owt(0);
  }
  Owt(t) {
    this.State !== t &&
      ((this.State = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "[SwitchInteract]切换状态", ["", t]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged,
      ));
  }
  bah() {
    this.xah && (this.xah.Remove(), (this.xah = void 0));
  }
}
exports.GamepadSwitchInteractData = GamepadSwitchInteractData;
//# sourceMappingURL=GamepadSwitchInteractData.js.map
