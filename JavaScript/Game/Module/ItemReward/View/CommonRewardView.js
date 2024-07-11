"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonRewardView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemRewardController_1 = require("../ItemRewardController"),
  RewardItemList_1 = require("./RewardItemList");
class CommonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Tt = void 0),
      (this.sOe = void 0),
      (this.V0i = (e) => {
        var t = e.GetRewardInfo();
        1 === t.Type &&
          "CommonRewardView" === t.ViewName &&
          (this.UiViewSequence?.PlaySequencePurely("Start01", !0),
          (this.$Tt = e),
          this.bYt()) &&
          this.qYt();
      }),
      (this.dSt = () => {
        UiManager_1.UiManager.CloseView("CommonRewardView");
      }),
      (this.BYt = (e) => {
        this.bYt() && this.qYt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.dSt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.BYt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeChildView,
        this.dSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRewardView,
        this.V0i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.BYt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeChildView,
        this.dSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRewardView,
        this.V0i,
      );
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(3);
    (this.sOe = new RewardItemList_1.RewardItemList()),
      await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e);
  }
  OnStart() {
    var e = this.OpenParam,
      e = (this.bl(e), e.GetRewardInfo().AudioId);
    ItemRewardController_1.ItemRewardController.PlayAudio(e);
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequence("Switch");
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
  }
  OnBeforePlayCloseSequence() {
    this.UiViewSequence.StopSequenceByKey("Switch");
  }
  OnBeforeDestroy() {
    var e = this.$Tt.GetRewardInfo().OnCloseCallback;
    e && e(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCloseRewardView,
      ),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  bl(e) {
    (this.$Tt = e),
      this.GYt() && this.mGe(),
      this.NYt() && this.OYt(),
      this.bYt() && this.qYt();
  }
  GYt() {
    var e = this.$Tt.GetRewardInfo().Title,
      e = !StringUtils_1.StringUtils.IsEmpty(e);
    return this.GetItem(2).SetUIActive(e), e;
  }
  mGe() {
    var e,
      t = this.$Tt.GetRewardInfo().Title;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetText(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  NYt() {
    var e = this.$Tt.GetRewardInfo().ContinueText,
      e = !StringUtils_1.StringUtils.IsEmpty(e);
    return this.GetItem(4).SetUIActive(e), e;
  }
  OYt() {
    var e,
      t = this.$Tt.GetRewardInfo().ContinueText;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetText(4)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  bYt() {
    var e = this.$Tt.GetRewardInfo().IsItemVisible,
      t = this.$Tt.GetItemList(),
      e = e && void 0 !== t && 0 < t?.length;
    return this.sOe.GetActive() !== e && this.sOe.SetActive(e), e;
  }
  qYt() {
    this.sOe.Refresh(this.$Tt.GetItemList());
  }
}
exports.CommonRewardView = CommonRewardView;
//# sourceMappingURL=CommonRewardView.js.map
