"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleFloatTipsView = void 0);
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TIMER_INTERVAL = 100;
const COUNTDOWN_TEXT_KEY = "BattleTipCountdown";
class BattleFloatTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.edt = void 0),
      (this.tdt = 0),
      (this.j3 = void 0),
      (this.OnTimerUpdate = () => {
        let e;
        !this.edt || this.edt.EndTime <= Time_1.Time.WorldTimeSeconds
          ? this.idt()
          : this.edt.Type === 1 &&
            (e = Math.max(
              Math.ceil(
                this.edt.CountdownEndTime - Time_1.Time.WorldTimeSeconds,
              ),
              0,
            )) !== this.tdt &&
            ((this.tdt = e),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(1),
              COUNTDOWN_TEXT_KEY,
              this.tdt,
            ));
      }),
      (this.odt = () => {
        const e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData;
        (this.edt = e.CurTip), this.rdt();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    void 0 === this.j3 &&
      (this.j3 = TimerSystem_1.TimerSystem.Forever(
        this.OnTimerUpdate,
        TIMER_INTERVAL,
      ));
    const e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData;
    let t = e.CurTip;
    (t = e.CheckIsExpired(t) ? e.GetNextFloatTip() : t) &&
      ((this.edt = t), this.rdt());
  }
  OnBeforeDestroy() {
    void 0 !== this.j3 &&
      (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiFloatTipUpdate,
      this.odt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiFloatTipUpdate,
      this.odt,
    );
  }
  idt() {
    const e =
      ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.GetNextFloatTip();
    e ? ((this.edt = e), this.rdt()) : this.CloseMe();
  }
  rdt() {
    switch (this.edt.Type) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), this.edt.TextKey),
          this.GetText(1).SetText(""),
          this.GetItem(2).SetUIActive(!1);
        break;
      case 1:
        (this.tdt = Math.max(
          Math.ceil(this.edt.CountdownEndTime - Time_1.Time.WorldTimeSeconds),
          0,
        )),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), this.edt.TextKey),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(1),
            COUNTDOWN_TEXT_KEY,
            this.tdt,
          ),
          this.GetItem(2).SetUIActive(!0);
    }
  }
}
exports.BattleFloatTipsView = BattleFloatTipsView;
// # sourceMappingURL=BattleFloatTipsView.js.map
