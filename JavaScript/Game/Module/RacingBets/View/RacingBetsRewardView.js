"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsRewardView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RacingBetsRewardItem_1 = require("./Item/RacingBetsRewardItem"),
  RacingBetsRewardTabItem_1 = require("./Item/RacingBetsRewardTabItem");
class RacingBetsRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Nvc = void 0),
      (this.Vvc = void 0),
      (this.B7t = void 0),
      (this.H3e = void 0),
      (this.Og = () => {
        if (this.Nvc) {
          for (const e of this.B7t.GetLayoutItemList()) e.RefreshItem();
          var i = this.Nvc.GetRewardDataList();
          this.H3e.RefreshByData(i);
        }
      }),
      (this.sSt = () => {
        var i,
          e = this.GetText(4);
        this.Nvc
          ? ((i =
              TimeUtil_1.TimeUtil.SetTimeSecond(
                TimeUtil_1.TimeUtil.GetNextDayTimeStamp(),
              ) - TimeUtil_1.TimeUtil.GetServerTime()),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              e,
              "Dango_DailyTask_Countdown",
              TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i)?.CountDownText ??
                "",
            ),
            e.SetUIActive(!0))
          : e.SetUIActive(!1);
      }),
      (this.jvc = () => new RacingBetsRewardItem_1.RacingBetsRewardItem()),
      (this.fqe = () => {
        var i = new RacingBetsRewardTabItem_1.RacingBetsRewardTabItem();
        return i.BindClickToggleCallBack(this.onl), i;
      }),
      (this.onl = (e) => {
        var i;
        this.Nvc !== e &&
          ((this.Nvc = e),
          (i = this.Vvc.findIndex((i) => i === e)),
          this.B7t.SelectGridProxy(i),
          (i = e.GetRewardDataList()),
          this.H3e.RefreshByData(i),
          this.sSt());
      }),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.Jvt],
        [5, this.Jvt],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
      this.Og,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
      this.Og,
    );
  }
  OnTick() {
    this.sSt();
  }
  async OnBeforeStartAsync() {
    var i;
    (this.Vvc = this.OpenParam),
      void 0 === this.Vvc || this.Vvc.length <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RacingBets",
            58,
            "RacingBetsRewardView invalid OpenParam",
          )
        : ((this.H3e = new GenericLayout_1.GenericLayout(
            this.GetVerticalLayout(2),
            this.jvc,
          )),
          (this.B7t = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(1),
            this.fqe,
          )),
          await this.B7t.RefreshByDataAsync(this.Vvc),
          this.B7t.SelectGridProxy(0),
          (this.Nvc = this.Vvc[0]),
          (i = this.Nvc.GetRewardDataList()),
          await this.H3e.RefreshByDataAsync(i));
  }
  OnStart() {
    var i =
      TimeUtil_1.TimeUtil.SetTimeSecond(
        TimeUtil_1.TimeUtil.GetNextDayTimeStamp(),
      ) - TimeUtil_1.TimeUtil.GetServerTime();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "Dango_DailyTask_Countdown",
      TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i)?.CountDownText ?? "",
    );
  }
}
exports.RacingBetsRewardView = RacingBetsRewardView;
//# sourceMappingURL=RacingBetsRewardView.js.map
