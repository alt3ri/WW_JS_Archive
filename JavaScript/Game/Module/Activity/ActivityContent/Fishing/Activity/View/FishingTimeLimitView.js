"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTimeLimitView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  TabViewComponent_1 = require("../../../../../Common/TabComponent/TabViewComponent"),
  ActivityFishingController_1 = require("../ActivityFishingController"),
  FishingRewardMainTabItem_1 = require("./Components/FishingRewardMainTabItem");
class FishingTimeLimitView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.TabItemList = []),
      (this.TabViewComponent = void 0),
      (this.ActivityDataBase = void 0),
      (this.yvt = []),
      (this.Ntl = !0),
      (this.Ftl = ""),
      (this.Cua = 0),
      (this.jFi = () => {
        var i = this.ActivityDataBase.GetTimeLimitRewardRedDotState(),
          e = this.ActivityDataBase.GetLimitTimeShopRedDotState();
        this.TabItemList[0].SetRedDotVisible(i),
          this.TabItemList[1].SetRedDotVisible(e);
      }),
      (this.pqe = (i) => {
        i !== this.Cua && this.Cx_(this.Cua, !1, !0), (this.Cua = i);
        var e = this.yvt[i];
        this.P6e(e, i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var i;
    (this.ActivityDataBase =
      ActivityFishingController_1.ActivityFishingController.GetCurrentActivityData()),
      this.ActivityDataBase &&
        ((i = []).push(this.zDn()),
        i.push(this.qvt()),
        i.push(
          ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopInfo(
            !0,
          ),
        ),
        this.Gvt(),
        this.gx_(),
        await Promise.all(i));
  }
  async zDn() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(0),
    )),
      await this.CaptionItem.SetCurrencyItemList([
        this.ActivityDataBase.MilestoneRewardItemId,
      ]),
      this.CaptionItem.SetCloseCallBack(() => {
        this.CloseMe();
      });
  }
  async qvt() {
    var i = new FishingRewardMainTabItem_1.FishingRewardMainTabItem(),
      e =
        (this.TabItemList.push(i),
        (i.TabIndex = 0),
        i.SetSelectedCallBack(this.pqe),
        new FishingRewardMainTabItem_1.FishingRewardMainTabItem());
    this.TabItemList.push(e),
      (e.TabIndex = 1),
      e.SetSelectedCallBack(this.pqe),
      await Promise.all([
        i.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
        e.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      ]),
      this.jFi();
  }
  Gvt() {
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
      this.GetItem(1),
    );
  }
  OnStart() {
    (this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "ActivityRemainingTime",
    )),
      this.u3e();
  }
  OnBeforeShow() {
    this.jFi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh,
      this.jFi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
        this.jFi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingTimeLimitShopRefresh,
        this.jFi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh,
      this.jFi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
        this.jFi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingTimeLimitShopRefresh,
        this.jFi,
      );
  }
  gx_() {
    (this.yvt = this.ActivityDataBase.GetRewardTabList()), this.Cx_(0, !0, !0);
  }
  Cx_(i, e, t) {
    this.TabItemList[i].SetToggleState(e ? 1 : 0, t);
  }
  P6e(i, e) {
    var t = i.ChildViewName,
      t =
        (this.TabViewComponent.ToggleCallBack(
          i,
          t,
          this.TabItemList[e],
          this.ActivityDataBase,
        ),
        i.Icon),
      e = (t && this.CaptionItem.SetTitleIcon(t), i.TabName);
    e && this.CaptionItem.SetTitleByTextIdAndArgNew(e);
  }
  OnTick(i) {
    this.Ntl && this.u3e();
  }
  u3e() {
    var i = this.ActivityDataBase.GetLimitTimeEndTime();
    i - TimeUtil_1.TimeUtil.GetServerTime() < 0
      ? ((this.Ntl = !1),
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView())
      : ((i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
          i,
          this.Ftl,
        )),
        this.GetText(4).SetText(i));
  }
}
exports.FishingTimeLimitView = FishingTimeLimitView;
//# sourceMappingURL=FishingTimeLimitView.js.map
