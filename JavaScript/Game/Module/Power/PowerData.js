"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OverPowerData = exports.PowerData = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  PowerController_1 = require("./PowerController"),
  TRYREQUESTGAP = 1;
class PowerData {
  constructor() {
    (this.ItemId = 0),
      (this.CurrentPower = 0),
      (this.FinishUpdateTime = 0),
      (this.NeedUpdateFlag = !1),
      (this.CurrentRecoverMode = 0),
      (this.NextRecoverTime = 0),
      (this.ResetTime = 0),
      (this.CurrentRequestNewPowerTime = 0),
      (this.LastTickCountDown = -1);
  }
  Phrase(e, t, r) {
    (this.ItemId = e), this.Moo(t);
    (e = r), (t = (this.GetPowerLimit() - t) * this.GetPowerIncreaseTimeSpan());
    (this.FinishUpdateTime = e + t),
      (this.NextRecoverTime = r + this.GetPowerIncreaseTimeSpan());
  }
  CheckPowerUpdate() {
    this.NeedUpdateFlag &&
      this.GetIfCanRequestNewPower() &&
      this.OnCheckPowerUpdate();
  }
  GetIfCanRequestNewPower() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return (
      0 < this.NextRecoverTime &&
      e >= this.NextRecoverTime &&
      ControllerHolder_1.ControllerHolder.PowerController.GetIfCanRequestNewPower() &&
      e - this.CurrentRequestNewPowerTime > TRYREQUESTGAP
    );
  }
  RequestNewPowerDataAndCacheRequestTime() {
    PowerController_1.PowerController.SendUpdatePowerRequest([this.ItemId]),
      (this.CurrentRequestNewPowerTime = TimeUtil_1.TimeUtil.GetServerTime());
  }
  OnCheckPowerUpdate() {
    this.RequestNewPowerDataAndCacheRequestTime();
  }
  GetPowerRecoveryMode() {
    return this.NeedUpdateFlag ? 0 : 2;
  }
  Moo(e) {
    (this.CurrentPower = e),
      this.CheckPowerIfMax()
        ? (this.NeedUpdateFlag = !1)
        : (this.NeedUpdateFlag = !0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPowerChanged),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPowerChangedWithId,
        this.ItemId,
      );
  }
  GetCurrentPower() {
    return this.CurrentPower;
  }
  CheckPowerIfMax() {
    return this.CurrentPower >= this.GetPowerLimit();
  }
  GetResetTime() {
    return this.ResetTime;
  }
  GetNeedUpdateFlag() {
    return this.NeedUpdateFlag;
  }
  GetPowerCurrencyShowTextId() {
    return "Text_ItemShow_Text";
  }
  IfNeedShowMax() {
    return !1;
  }
  GetPowerLimit() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit();
  }
  GetPowerIncreaseTimeSpan() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan();
  }
  GetNextTimerRecoverText() {
    var e = this.NextRecoverTime - TimeUtil_1.TimeUtil.GetServerTime(),
      t = (e = e < 0 ? 0 : e) / TimeUtil_1.TimeUtil.Minute,
      e = e % TimeUtil_1.TimeUtil.Minute,
      t = Math.trunc(t),
      e = Math.trunc(e);
    return t.toString().padStart(2, "0") + ":" + e.toString().padStart(2, "0");
  }
  GetFullRecoverText() {
    var e = this.FinishUpdateTime - TimeUtil_1.TimeUtil.GetServerTime(),
      t = (e = e < 0 ? 0 : e) / TimeUtil_1.TimeUtil.Hour,
      r = (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
      e = e % TimeUtil_1.TimeUtil.Minute,
      t = Math.trunc(t),
      r = Math.trunc(r),
      e = Math.trunc(e);
    return (
      `${t.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}:` +
      e.toString().padStart(2, "0")
    );
  }
}
class OverPowerData extends (exports.PowerData = PowerData) {
  GetIfCanRequestNewPower() {
    var e = TimeUtil_1.TimeUtil.GetServerTime(),
      t = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        ItemDefines_1.EItemId.Power,
      );
    return (
      0 < this.NextRecoverTime &&
      e >= this.NextRecoverTime &&
      ControllerHolder_1.ControllerHolder.PowerController.GetIfCanRequestNewPower() &&
      e - this.CurrentRequestNewPowerTime > TRYREQUESTGAP &&
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10066) &&
      t.CheckPowerIfMax()
    );
  }
  GetPowerRecoveryMode() {
    return this.CheckPowerIfMax()
      ? 2
      : ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
            ItemDefines_1.EItemId.Power,
          ).CheckPowerIfMax()
        ? 0
        : 1;
  }
  GetPowerCurrencyShowTextId() {
    return "PowerNumTips";
  }
  GetPowerLimit() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetOverPowerLimit();
  }
  GetPowerIncreaseTimeSpan() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetOverPowerRecoverTimeSpan();
  }
  IfNeedShowMax() {
    return !0;
  }
}
exports.OverPowerData = OverPowerData;
//# sourceMappingURL=PowerData.js.map
