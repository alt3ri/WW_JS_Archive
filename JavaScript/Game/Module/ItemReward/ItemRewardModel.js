"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemRewardModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  RewardData_1 = require("./RewardData/RewardData");
class ItemRewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.q0i = void 0), (this.CurrentReasonId = void 0);
  }
  OnClear() {
    return (this.q0i = void 0), !(this.CurrentReasonId = void 0);
  }
  RefreshRewardData(e, t) {
    e = { Type: 0, ViewName: e };
    return (
      this.q0i || this.NewRewardData(),
      this.q0i.SetRewardInfo(e),
      this.q0i.SetItemList(t),
      this.q0i
    );
  }
  RefreshExploreLevelRewardData(e, t, i, s) {
    e = { Type: 0, ViewName: e, CurrentExploreLevel: t, TargetExploreLevel: i };
    return (
      this.q0i || this.NewRewardData(),
      this.q0i.SetRewardInfo(e),
      this.q0i.SetItemList(s),
      this.q0i
    );
  }
  RefreshCommonRewardDataFromConfig(e, t, i, s) {
    e =
      ConfigManager_1.ConfigManager.ItemRewardConfig.GetCommonRewardViewDisplayConfig(
        e,
      );
    if (e)
      return (
        (t = {
          Type: 1,
          ViewName: t,
          AudioId: e.AudioId,
          Title: e.Title,
          ContinueText: e.ContinueText,
          IsItemVisible: e.IsItemVisible,
          OnCloseCallback: s,
        }),
        this.q0i || this.NewRewardData(),
        this.q0i.SetRewardInfo(t),
        this.q0i.SetItemList(i),
        this.q0i
      );
  }
  RefreshCompositeRewardDataFromConfig(e, t = !0, i, s) {
    e =
      ConfigManager_1.ConfigManager.ItemRewardConfig.GetCompositeRewardViewDisplayConfig(
        e,
      );
    if (e)
      return (
        (t = {
          Type: 2,
          ViewName: "CompositeRewardView",
          AudioId: e.AudioId,
          IsSuccess: t,
          Title: e.Title,
          ContinueText: e.ContinueText,
          TitleIconPath: e.TitleIconPath,
          IsProgressVisible: e.IsProgressVisible,
          ProgressBarTitle: e.ProgressBarTitle,
          ProgressBarAnimationTime: e.ProgressBarAnimationTime,
          IsItemVisible: e.IsItemVisible,
        }),
        this.q0i || this.NewRewardData(),
        this.q0i.SetRewardInfo(t),
        this.q0i.SetItemList(i),
        s && this.q0i.SetProgressQueue(s),
        this.q0i
      );
  }
  RefreshExploreRewardDataFromConfig(
    e,
    t = !0,
    i,
    s,
    r,
    a,
    o,
    n,
    h,
    l,
    d,
    m,
    u,
  ) {
    e =
      ConfigManager_1.ConfigManager.ItemRewardConfig.GetExploreRewardDisplayConfig(
        e,
      );
    if (e)
      return (
        (t = {
          Type: 3,
          ViewName: "ExploreRewardView",
          AudioId: e.AudioId,
          IsSuccess: t,
          Title: e.Title,
          TitleHexColor: e.TitleHexColor,
          TitleIconPath: e.TitleIconPath,
          TitleIconHexColor: e.TitleIconHexColor,
          IsRecordVisible: e.IsRecordVisible,
          IsItemVisible: e.IsItemVisible,
          IsExploreProgressVisible: e.IsExploreProgressVisible,
          ExploreBarTipsTextId: e.ExploreBarTipsTextId,
          IsDescription: e.IsDescription,
          Description: e.Description,
          OnCloseCallback: h,
          Tip: l,
          IsShowOnlineChallengePlayer: d,
        }),
        this.q0i || this.NewRewardData(),
        this.q0i.SetRewardInfo(t),
        this.q0i.SetItemList(i),
        s && this.q0i.SetExploreRecordInfo(s),
        r && this.q0i.SetExploreBarDataList(r),
        a && this.q0i.SetButtonInfoList(a),
        o && this.q0i.SetTargetReached(o),
        n && this.q0i.SetStateToggle(n),
        m && this.q0i.SetExploreFriendDataList(m),
        u && this.q0i.SetScoreReached(u),
        this.q0i
      );
  }
  SetItemList(e) {
    this.q0i || this.NewRewardData(),
      !e ||
        e.length < 1 ||
        (this.q0i.SetItemList(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshRewardViewItemList,
          e,
        ));
  }
  AddItemList(e) {
    this.q0i || this.NewRewardData(),
      !e ||
        e.length < 1 ||
        (this.q0i.AddItemList(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshRewardViewItemList,
          e,
        ));
  }
  SetProgressQueue(e) {
    this.q0i || this.NewRewardData(),
      this.q0i.SetProgressQueue(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshRewardProgressBar,
      );
  }
  SetExploreBarDataList(e) {
    this.q0i || this.NewRewardData(), this.q0i.SetExploreBarDataList(e);
  }
  SetExploreRecordInfo(e) {
    this.q0i || this.NewRewardData(), this.q0i.SetExploreRecordInfo(e);
  }
  SetExploreFriendDataList(e) {
    this.q0i || this.NewRewardData(), this.q0i.SetExploreFriendDataList(e);
  }
  SetButtonList(e) {
    this.q0i || this.NewRewardData(),
      !e ||
        e.length < 1 ||
        (this.q0i.SetButtonInfoList(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshRewardButton,
        ));
  }
  NewRewardData() {
    var e;
    return this.q0i || ((e = new RewardData_1.RewardData()), (this.q0i = e));
  }
  ClearCurrentRewardData() {
    this.q0i = void 0;
  }
  GetCurrentRewardData() {
    return this.q0i;
  }
}
exports.ItemRewardModel = ItemRewardModel;
//# sourceMappingURL=ItemRewardModel.js.map
