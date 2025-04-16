"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerCountDownView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class ShipTowerCountDownView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.t9_ = void 0),
      (this.aq_ = (e, t) => {
        var i = Math.floor(
            (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
          ),
          s = Math.floor(e % TimeUtil_1.TimeUtil.Minute),
          e = Math.floor(100 * (e - Math.floor(e))),
          i = this.hq_(i),
          s = this.hq_(s),
          e = this.hq_(e);
        this.GetText(0)?.SetText(i + `:${s}:` + e);
      }),
      (this.lq_ = (e) => {
        this.GetItem(1)?.SetUIActive(!0);
        this.GetText(2)?.ShowTextNew(e), this.i9_();
        (this.t9_ = TimerSystem_1.TimerSystem.Delay(this.r9_, 3e3)),
          this.PlaySequence("WaveIn");
      }),
      (this._q_ = () => {
        this.GetItem(1)?.SetUIActive(!1);
      }),
      (this.r9_ = () => {
        this.o9_();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync();
  }
  OnStart() {
    this._q_();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGamePlayCdChanged,
      this.aq_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerBattleTip,
        this.lq_,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGamePlayCdChanged,
      this.aq_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerBattleTip,
        this.lq_,
      );
  }
  OnBeforeShow() {}
  OnBeforeDestroy() {
    this.i9_();
  }
  hq_(e) {
    return (e < 10 ? "0" : "") + e;
  }
  async o9_() {
    await this.PlaySequenceAsync("WaveOut"), this._q_();
  }
  i9_() {
    void 0 !== this.t9_ &&
      (TimerSystem_1.TimerSystem.Remove(this.t9_), (this.t9_ = void 0));
  }
}
exports.ShipTowerCountDownView = ShipTowerCountDownView;
//# sourceMappingURL=ShipTowerCountDownView.js.map
