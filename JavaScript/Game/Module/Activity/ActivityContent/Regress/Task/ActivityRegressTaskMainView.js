"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTaskMainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  CommonTabComponentData_1 = require("../../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../../Common/TabComponent/CommonTabTitleData"),
  CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  ActivityRegressDefine_1 = require("../ActivityRegressDefine"),
  ActivityRegressMainCaptionListPanel_1 = require("../Panels/ActivityRegressMainCaptionListPanel"),
  ActivityRegressTabItemPanel_1 = require("../Panels/ActivityRegressTabItemPanel"),
  ActivityRegressTaskDefine_1 = require("./ActivityRegressTaskDefine"),
  ActivityRegressTaskSubView_1 = require("./ConstantTask/ActivityRegressTaskSubView"),
  ActivityRegressCultivateTaskSubView_1 = require("./Cultivate/ActivityRegressCultivateTaskSubView"),
  ActivityRegressDoubleDropSubView_1 = require("./DoubleDrop/ActivityRegressDoubleDropSubView");
class ActivityRegressTaskMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cda = void 0),
      (this.Agc = void 0),
      (this.Ml1 = new Map()),
      (this.sma = void 0),
      (this.TDa = (e) => {
        var i = this.Ml1.get(this.Agc);
        i &&
          0 === this.Agc &&
          e === ActivityRegressDefine_1.RECALL_SCORE_ITEM_ID &&
          i.Update();
      }),
      (this.TTi = () => {
        this.Ml1.get(this.Agc)?.Update();
      }),
      (this.yqe = (e) => {
        (e = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.get(e)),
          (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            e.IconName,
          ));
        return new CommonTabData_1.CommonTabData(e, void 0);
      }),
      (this.jdi = (e, i) => {
        return new ActivityRegressTabItemPanel_1.ActivityRegressTabItemPanel();
      }),
      (this.zno = (e) => {
        var i = new UiAsyncTask_1.UiAsyncTask(
          "ActivityRegressTaskSubViewBase.OnTabSelected",
          async () => {
            await this.mda(e);
          },
        );
        this.RunAsyncTask(i);
      }),
      (this.kOe = (e) => {
        this.mGe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    await this.sso(),
      this.cda.SelectToggleByIndex(e, !0),
      this.cda.SetPnlListUiActive(!0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      this.TDa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
        this.TTi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      this.TDa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
        this.TTi,
      );
  }
  OnBeforeShow() {
    this.mGe(),
      this.TTi(),
      (this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(
        this.kOe,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.Cda();
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.jdi,
      this.zno,
      this.yqe,
    );
    this.cda =
      new ActivityRegressMainCaptionListPanel_1.ActivityRegressMainCaptionListPanel();
    var i = this.GetItem(0).GetOwner();
    this.cda.Init(e),
      await this.cda.CreateThenShowByActorAsync(i),
      await this.Tfa(),
      this.cda.BindTabTitleCallBack(() => {
        UiManager_1.UiManager.CloseView("ActivityRegressTaskMainView");
      });
  }
  async Tfa() {
    var i = new Array(),
      t = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.size;
    for (let e = 0; e < t; ++e) {
      var s = new CommonTabItemBase_1.CommonTabItemData(),
        a =
          ((s.Index = e),
          (s.Data = this.cda.GetTabComponentData(e)),
          i.push(s),
          ActivityRegressTaskDefine_1.taskSubViewTabDataMap.get(e));
      s.RedDotName = a.RedDotName;
    }
    await this.cda.RefreshTabItemByDataAsync(i);
  }
  async mda(e) {
    e !== this.Agc &&
      (void 0 !== this.Agc && (await this.pda(this.Agc)),
      await this.gda(e),
      (this.Agc = e),
      this.qEi());
  }
  qEi() {
    var e = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.get(this.Agc),
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        e.IconName,
      );
    this.cda.UpdateTitle(
      i,
      new CommonTabTitleData_1.CommonTabTitleData(e.TitleKey),
    );
  }
  async vda(e) {
    let i = void 0;
    var t = this.GetItem(2);
    switch (e) {
      case 0:
        await (i =
          new ActivityRegressTaskSubView_1.ActivityRegressTaskSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceMission",
          t,
        );
        break;
      case 1:
        await (i =
          new ActivityRegressCultivateTaskSubView_1.ActivityRegressRoleCultivateSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_RoleDevelop",
          t,
        );
        break;
      case 2:
        await (i =
          new ActivityRegressDoubleDropSubView_1.ActivityRegressDoubleDropSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceChallenge",
          t,
        );
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "回流活动->未定义的子任务界面类型!",
            ["viewType", e],
          );
    }
    return i;
  }
  async gda(e) {
    var i;
    this.Ml1.has(e) || ((i = await this.vda(e)) && this.Ml1.set(e, i)),
      await this.Ml1.get(e).ShowAsync();
  }
  async pda(e) {
    await this.Ml1.get(e)?.HideAsync();
  }
  Cda() {
    for (var [, e] of this.Ml1) e.CloseMeAsync();
    this.Ml1.clear();
  }
  mGe() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData,
      [e, i] =
        ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
          e,
        );
    this.GetText(4).SetUIActive(e), e && this.GetText(4).SetText(i);
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.sma) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.sma), (this.sma = void 0));
  }
}
exports.ActivityRegressTaskMainView = ActivityRegressTaskMainView;
//# sourceMappingURL=ActivityRegressTaskMainView.js.map
