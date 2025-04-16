"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyRoundShowView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyRoundShowView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.et1 = () => {
        this.IsDestroyOrDestroying || this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.GetText(0).SetText(this.OpenParam?.TipsText ?? ""),
      TimerSystem_1.TimerSystem.Delay(this.et1, this.OpenParam.ShowTime);
  }
  OnAfterPlayStartSequence() {
    this.YI1();
  }
  async YI1() {
    await this.OpenPromise?.Promise,
      await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME),
      this.CloseMe();
  }
  OnBeforeDestroy() {
    var e = this.OpenParam?.BoardId ?? 0,
      o = this.OpenParam?.Promise;
    UiManager_1.UiManager.OpenView("DangoMonopolyRoundBuffShowView", {
      BoardId: e,
      Promise: o,
    });
  }
}
exports.DangoMonopolyRoundShowView = DangoMonopolyRoundShowView;
//# sourceMappingURL=DangoMonopolyRoundShowView.js.map
