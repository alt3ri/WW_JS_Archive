"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountDownTimer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase"),
  GENERAL_TIP_ID = 19,
  ONE_HUNDRED = 100;
class CountDownTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(e, t, i, r, n) {
    super(e, t, !0, n),
      (this.MYt = -0),
      (this.EYt = -0),
      (this.SYt = -0),
      (this.yYt = !1),
      (this.IYt = 0),
      (this.I$t = 0),
      (this.fqa = void 0),
      (this.DYt = (e, t, i, r) => {
        if (e && e === this.TreeId && this.InnerTimerType === t) {
          var n = 1e3 * r;
          switch (i) {
            case Protocol_1.Aki.Protocol.s3s.Proto_Add:
              this.MYt += n;
              break;
            case Protocol_1.Aki.Protocol.s3s.Proto_Sub:
              this.MYt -= n;
              break;
            case Protocol_1.Aki.Protocol.s3s.Proto_Set:
              this.MYt = TimeUtil_1.TimeUtil.GetServerStopTimeStamp() + n;
          }
          this.LYt(this.GetRemainTime());
        }
      }),
      (this.OnTick = (e) => {
        var t = TimeUtil_1.TimeUtil.GetServerStopTimeStamp(),
          i = t - this.IYt;
        (this.IYt = t),
          ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop ||
            ((this.SYt += i),
            (t = this.GetRemainTime()) < 0 ? this.TYt() : this.LYt(t));
      }),
      (this.Ija = () => {
        this.LYt(0);
      }),
      (this.Tja = () => {
        this.pqa();
      }),
      (this.I$t = i),
      (this.fqa = r),
      (this.MYt = 0);
  }
  Destroy() {
    this.EndShowTimer(), super.Destroy();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
      this.DYt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FailRangeTimerStartShow,
        this.Ija,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FailRangeTimerEndShow,
        this.Tja,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
      this.DYt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FailRangeTimerStartShow,
        this.Ija,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FailRangeTimerEndShow,
        this.Tja,
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
      (this.EYt = TimeUtil_1.TimeUtil.GetServerStopTimeStamp()),
      (this.SYt = 0),
      (this.IYt = this.EYt),
      ModelManager_1.ModelManager.GeneralLogicTreeModel.SetTimerUiOwnerId(
        this.TreeId,
      ),
      this.pqa(),
      this.OnAddEvents());
  }
  EndShowTimer() {
    this.OnRemoveEvents(), this.LYt(0);
  }
  pqa() {
    var e = this.GetRemainTime();
    if (e <= 0)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "GamePlayTimer",
          19,
          "倒计时剩余时间不足",
          ["开始时间", this.EYt],
          ["结束时间", this.MYt],
          ["treeIncId", this.TreeId],
        );
    else
      switch (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GamePlayTimer",
            19,
            "倒计时开始",
            ["开始时间", this.EYt],
            ["结束时间", this.MYt],
            ["treeIncId", this.TreeId],
          ),
        this.I$t)
      ) {
        case 0:
          this.vqa(e);
          break;
        case 1:
          this.Mqa(e);
      }
  }
  vqa(e) {
    var t =
        ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
          GENERAL_TIP_ID,
        ),
      i = [],
      r = Math.floor(
        (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
      ),
      n = Math.floor(e % TimeUtil_1.TimeUtil.Minute),
      s = Math.floor((e - Math.floor(e)) * ONE_HUNDRED),
      r =
        (i.push((r < 10 ? "0" : "") + r),
        i.push((n < 10 ? "0" : "") + n),
        i.push((s < 10 ? "0" : "") + s),
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
  Mqa(e) {
    var t;
    (UiManager_1.UiManager.GetViewByName("CountDownChallenge") &&
      !ModelManager_1.ModelManager.GeneralLogicTreeModel
        .CountDownViewClosing) ||
      ((t = new GeneralLogicTreeDefine_1.ChallengeCountDownViewParams(
        this.MYt,
        this.fqa,
      )),
      UiManager_1.UiManager.OpenView("CountDownChallenge", t)),
      this.LYt(e);
  }
  GetRemainTime() {
    var e = (this.MYt - (this.EYt + this.SYt)) / 1e3;
    return Math.max(e, 0);
  }
  LYt(t) {
    if (
      ModelManager_1.ModelManager.GeneralLogicTreeModel.IsTimerUiOwner(
        this.TreeId,
      )
    ) {
      let e = "CountDownFloatTips";
      switch (this.I$t) {
        case 0:
          e = "CountDownFloatTips";
          break;
        case 1:
          e = "CountDownChallenge";
      }
      UiManager_1.UiManager.GetViewByName(e) &&
        !ModelManager_1.ModelManager.GeneralLogicTreeModel
          .CountDownViewClosing &&
        (t
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnGamePlayCdChanged,
              t,
              this.MYt,
            )
          : ((ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
              !0),
            UiManager_1.UiManager.CloseView(e, (e) => {
              e &&
                (ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
                  !1);
            })));
    }
  }
}
exports.CountDownTimer = CountDownTimer;
//# sourceMappingURL=CountDownTimer.js.map
