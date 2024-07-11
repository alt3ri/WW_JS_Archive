"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const CommonRewardPopup_1 = require("../../Common/CommonRewardPopup");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const DailyActivityController_1 = require("../DailyActivityController");
const DailyActivityDefine_1 = require("../DailyActivityDefine");
const DailyActivityTaskItem_1 = require("../DailyActivityTask/DailyActivityTaskItem");
const DailyActivityRewardPanel_1 = require("./DailyActivityRewardPanel");
class DailyActivityView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.vkt = void 0),
      (this.bOt = void 0),
      (this.Mkt = void 0),
      (this.Skt = void 0),
      (this.Ekt = void 0),
      (this.$Ve = void 0),
      (this.ykt = 0),
      (this.Ikt = () => {
        const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(122);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        );
      }),
      (this.Tkt = () => {
        this.Skt.SetActive(!1), this.Lkt(), this.Dkt(), this.Mkt.Init();
      }),
      (this.Rkt = () => {
        this.Lkt();
      }),
      (this.Ukt = (e) => {
        this.Akt();
      }),
      (this.VOe = () => {
        return new DailyActivityTaskItem_1.DailyActivityTaskItem();
      }),
      (this.Pkt = () => {
        const e = ModelManager_1.ModelManager.DailyActivityModel.RewardData;
        this.Skt.Refresh(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await DailyActivityController_1.DailyActivityController.RequestDailyActivityData();
  }
  OnStart() {
    (this.Mkt = new DailyActivityRewardPanel_1.DailyActivityRewardPanel(
      this.GetItem(4),
    )),
      (this.vkt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.VOe,
      )),
      (this.$Ve = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.Skt = new CommonRewardPopup_1.CommonRewardPopup(this.RootItem));
  }
  OnBeforeDestroy() {
    this.Mkt.Destroy(),
      (this.Mkt = void 0),
      this.$Ve?.Clear(),
      (this.$Ve = void 0),
      this.Skt && (this.Skt = void 0),
      (this.bOt = []);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DailyActivityRefresh,
      this.Tkt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DailyActivityTaskUpdate,
        this.Rkt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshActivityRewardPopUp,
        this.Pkt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DailyActivityValueChange,
        this.Ukt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DailyUpdateNotify,
        this.Ikt,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DailyActivityRefresh,
      this.Tkt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DailyActivityTaskUpdate,
        this.Rkt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshActivityRewardPopUp,
        this.Pkt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DailyActivityValueChange,
        this.Ukt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DailyUpdateNotify,
        this.Ikt,
      );
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.AdventureHelpBtn,
      DailyActivityDefine_1.DAILY_ACTIVITY_HELP,
    ),
      this.xkt(),
      this.Lkt(),
      this.wkt(!0),
      this.$Ve?.PlayLevelSequenceByName("Start");
  }
  OnBeforeHide() {
    this.Skt.SetActive(!1);
  }
  OnTickUiTabViewBase(e) {
    this.Mkt.OnTickRefresh(e), this.wkt();
  }
  wkt(e = !1) {
    let i;
    let t;
    let n = ModelManager_1.ModelManager.DailyActivityModel.DayEndTime;
    n === 0 && this.Ekt !== ""
      ? (this.Ekt = "")
      : ((i = TimeUtil_1.TimeUtil.GetServerTime()),
        (i =
          (n = Math.max(n - i, TimeUtil_1.TimeUtil.TimeDeviation)) >=
          CommonDefine_1.SECOND_PER_HOUR
            ? 2
            : 1),
        (t = n >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0),
        (n = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(
          n,
          i,
          t,
        ).CountDownText),
        (this.Ekt === n && !e) ||
          ((this.Ekt = n),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DailyActivityCountDownUpdate,
            n,
          )));
  }
  Lkt() {
    (this.bOt =
      ModelManager_1.ModelManager.DailyActivityModel.DailyActivityTaskList),
      this.vkt.RefreshByData(this.bOt);
  }
  xkt() {
    this.GetText(3).SetText("0"),
      (this.ykt = ModelManager_1.ModelManager.DailyActivityModel.ActivityValue),
      this.GetText(2).SetText(this.ykt.toString()),
      this.Mkt.Init();
  }
  Dkt() {
    const e = ModelManager_1.ModelManager.DailyActivityModel.ActivityValue;
    return (
      this.GetText(2).SetText(e.toString()),
      e > this.ykt &&
        (this.UiViewSequence.HasSequenceNameInPlaying("Refresh")
          ? this.UiViewSequence.ReplaySequence("Refresh")
          : this.UiViewSequence.PlaySequence("Refresh")),
      (this.ykt = e)
    );
  }
  Akt() {
    const e = this.Dkt();
    this.Mkt.RefreshProgressBarDynamic(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length >= 2) {
      const i = String(e[0]);
      const t = Number(e[1]);
      if (i === "Task") {
        var n = this.vkt.GetGridByDisplayIndex(t);
        if (n) return [n, n];
      } else if (i === "Gift") {
        n = this.Mkt.GetRewardItemByIndex(t);
        if (n) return [n, n];
      }
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.DailyActivityView = DailyActivityView;
// # sourceMappingURL=DailyActivityView.js.map
