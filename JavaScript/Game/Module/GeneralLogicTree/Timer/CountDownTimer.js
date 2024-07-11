"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountDownTimer = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase"),
  GENERAL_TIP_ID = 19,
  ONE_HUNDRED = 100;
class CountDownTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(e, t, i) {
    super(e, t, !0, i),
      (this.MYt = -0),
      (this.EYt = -0),
      (this.SYt = -0),
      (this.yYt = !1),
      (this.IYt = 0),
      (this.OnTick = (e) => {
        var t = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
          i = t - this.IYt;
        (this.IYt = t),
          ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop ||
            ((this.SYt += i * Time_1.Time.TimeDilation),
            (t = this.GetRemainTime()) < 0 ? this.TYt() : this.LYt(t));
      }),
      (this.DYt = (e, t, i, r) => {
        if (e && e === this.TreeId && this.InnerTimerType === t) {
          var o = 1e3 * r;
          switch (i) {
            case Protocol_1.Aki.Protocol.ZNs.Proto_Add:
              this.MYt += o;
              break;
            case Protocol_1.Aki.Protocol.ZNs.Proto_Sub:
              this.MYt -= o;
              break;
            case Protocol_1.Aki.Protocol.ZNs.Proto_Set:
              this.MYt = TimeUtil_1.TimeUtil.GetServerTimeStamp() + o;
          }
          this.LYt(this.GetRemainTime());
        }
      }),
      (this.MYt = 0);
  }
  Destroy() {
    this.EndShowTimer(), super.Destroy();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
      this.DYt,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
        this.DYt,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
      this.DYt,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
        this.DYt,
      );
  }
  TYt() {
    this.yYt ||
      ((this.yYt = !0),
      this.EndShowTimer(),
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestTimerEnd(
        this.TreeId,
        this.TimerType,
      ));
  }
  StartShowTimer(e) {
    e &&
      ((this.MYt = e),
      (this.EYt = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (this.SYt = 0),
      (this.IYt = this.EYt),
      ModelManager_1.ModelManager.GeneralLogicTreeModel.SetTimerUiOwnerId(
        this.TreeId,
      ),
      this.RYt(this.GetRemainTime()),
      this.OnAddEvents());
  }
  RYt(e) {
    var t =
        ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
          GENERAL_TIP_ID,
        ),
      i = [],
      r = Math.floor(
        (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
      ),
      o = Math.floor(e % TimeUtil_1.TimeUtil.Minute),
      n = Math.floor((e - Math.floor(e)) * ONE_HUNDRED),
      r =
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
      this.LYt(e);
  }
  EndShowTimer() {
    this.OnRemoveEvents(), this.LYt(void 0, this.GetRemainTime() <= 0);
  }
  GetRemainTime() {
    var e = (this.MYt - (this.EYt + this.SYt)) / 1e3;
    return Math.max(e, 0);
  }
  LYt(e, t) {
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
//# sourceMappingURL=CountDownTimer.js.map
