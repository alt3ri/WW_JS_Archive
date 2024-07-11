"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleFloatTipsView = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  TIMER_INTERVAL = 100,
  COUNTDOWN_TEXT_KEY = "BattleTipCountdown";
class BattleFloatTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cCt = void 0),
      (this.mCt = 0),
      (this.j3 = void 0),
      (this.OnTimerUpdate = () => {
        var e;
        !this.cCt || this.cCt.EndTime <= Time_1.Time.WorldTimeSeconds
          ? this.dCt()
          : 1 === this.cCt.Type &&
            (e = Math.max(
              Math.ceil(
                this.cCt.CountdownEndTime - Time_1.Time.WorldTimeSeconds,
              ),
              0,
            )) !== this.mCt &&
            ((this.mCt = e),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(1),
              COUNTDOWN_TEXT_KEY,
              this.mCt,
            ));
      }),
      (this.CCt = () => {
        var e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData;
        (this.cCt = e.CurTip), this.gCt();
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
    var e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData;
    let t = e.CurTip;
    (t = e.CheckIsExpired(t) ? e.GetNextFloatTip() : t) &&
      ((this.cCt = t), this.gCt());
  }
  OnBeforeDestroy() {
    void 0 !== this.j3 &&
      (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiFloatTipUpdate,
      this.CCt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiFloatTipUpdate,
      this.CCt,
    );
  }
  dCt() {
    var e =
      ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.GetNextFloatTip();
    e ? ((this.cCt = e), this.gCt()) : this.CloseMe();
  }
  gCt() {
    switch (this.cCt.Type) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), this.cCt.TextKey),
          this.GetText(1).SetText(""),
          this.GetItem(2).SetUIActive(!1);
        break;
      case 1:
        (this.mCt = Math.max(
          Math.ceil(this.cCt.CountdownEndTime - Time_1.Time.WorldTimeSeconds),
          0,
        )),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), this.cCt.TextKey),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(1),
            COUNTDOWN_TEXT_KEY,
            this.mCt,
          ),
          this.GetItem(2).SetUIActive(!0);
    }
  }
}
exports.BattleFloatTipsView = BattleFloatTipsView;
//# sourceMappingURL=BattleFloatTipsView.js.map
