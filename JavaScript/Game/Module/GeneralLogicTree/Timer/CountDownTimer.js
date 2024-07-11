"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountDownTimer = void 0);
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../GeneralLogicTreeController");
const LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GENERAL_TIP_ID = 19;
const ONE_HUNDRED = 100;
class CountDownTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(e, t, i) {
    super(e, t, !0, i),
      (this.M$t = -0),
      (this.S$t = -0),
      (this.E$t = -0),
      (this.y$t = !1),
      (this.I$t = 0),
      (this.OnTick = (e) => {
        let t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        const i = t - this.I$t;
        (this.I$t = t),
          ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop ||
            ((this.E$t += i * Time_1.Time.TimeDilation),
            (t = this.GetRemainTime()) < 0 ? this.T$t() : this.L$t(t));
      }),
      (this.D$t = (e, t, i, r) => {
        if (e && e === this.TreeId && this.InnerTimerType === t) {
          const o = 1e3 * r;
          switch (i) {
            case Protocol_1.Aki.Protocol.uqs.Proto_Add:
              this.M$t += o;
              break;
            case Protocol_1.Aki.Protocol.uqs.Proto_Sub:
              this.M$t -= o;
              break;
            case Protocol_1.Aki.Protocol.uqs.Proto_Set:
              this.M$t = TimeUtil_1.TimeUtil.GetServerTimeStamp() + o;
          }
          this.L$t(this.GetRemainTime());
        }
      }),
      (this.M$t = 0);
  }
  Destroy() {
    this.EndShowTimer(), super.Destroy();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
      this.D$t,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
        this.D$t,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
      this.D$t,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
        this.D$t,
      );
  }
  T$t() {
    this.y$t ||
      ((this.y$t = !0),
      this.EndShowTimer(),
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestTimerEnd(
        this.TreeId,
        this.TimerType,
      ));
  }
  StartShowTimer(e) {
    e &&
      ((this.M$t = e),
      (this.S$t = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (this.E$t = 0),
      (this.I$t = this.S$t),
      ModelManager_1.ModelManager.GeneralLogicTreeModel.SetTimerUiOwnerId(
        this.TreeId,
      ),
      this.R$t(this.GetRemainTime()),
      this.OnAddEvents());
  }
  R$t(e) {
    const t =
      ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
        GENERAL_TIP_ID,
      );
    const i = [];
    var r = Math.floor(
      (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
    );
    const o = Math.floor(e % TimeUtil_1.TimeUtil.Minute);
    const n = Math.floor((e - Math.floor(e)) * ONE_HUNDRED);
    var r =
      (i.push((r < 10 ? "0" : "") + r),
      i.push((o < 10 ? "0" : "") + o),
      i.push((n < 10 ? "0" : "") + n),
      UiManager_1.UiManager.GetViewByName("CountDownFloatTips"));
    (r &&
      !ModelManager_1.ModelManager.GeneralLogicTreeModel
        .CountDownViewClosing) ||
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        t.TypeId,
        void 0,
        void 0,
        void 0,
        i,
        GENERAL_TIP_ID,
      ),
      this.L$t(e);
  }
  EndShowTimer() {
    this.OnRemoveEvents(), this.L$t(void 0, this.GetRemainTime() <= 0);
  }
  GetRemainTime() {
    const e = (this.M$t - (this.S$t + this.E$t)) / 1e3;
    return Math.max(e, 0);
  }
  L$t(e, t) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.IsTimerUiOwner(
      this.TreeId,
    ) &&
      UiManager_1.UiManager.GetViewByName("CountDownFloatTips") &&
      (e
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGamePlayCdChanged,
            e,
          )
        : ((ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
            !0),
          UiManager_1.UiManager.CloseView("CountDownFloatTips", (e) => {
            e &&
              (ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
                !1);
          })));
  }
}
exports.CountDownTimer = CountDownTimer;
// # sourceMappingURL=CountDownTimer.js.map
