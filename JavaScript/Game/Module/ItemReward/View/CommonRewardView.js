"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonRewardView = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemRewardController_1 = require("../ItemRewardController");
const RewardItemList_1 = require("./RewardItemList");
class CommonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jIt = void 0),
      (this.sOe = void 0),
      (this.Vgi = (e) => {
        const t = e.GetRewardInfo();
        t.Type === 1 &&
          t.ViewName === "CommonRewardView" &&
          (this.UiViewSequence?.PlaySequencePurely("Start01", !0),
          (this.jIt = e),
          this.b$t()) &&
          this.q$t();
      }),
      (this.iSt = () => {
        UiManager_1.UiManager.CloseView("CommonRewardView");
      }),
      (this.B$t = (e) => {
        this.b$t() && this.q$t();
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
      (this.BtnBindInfo = [[0, this.iSt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.B$t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeChildView,
        this.iSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRewardView,
        this.Vgi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.B$t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeChildView,
        this.iSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRewardView,
        this.Vgi,
      );
  }
  async OnBeforeStartAsync() {
    const e = this.GetItem(3);
    (this.sOe = new RewardItemList_1.RewardItemList()),
      await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e);
  }
  OnStart() {
    var e = this.OpenParam;
    var e = (this.bl(e), e.GetRewardInfo().AudioId);
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
    const e = this.jIt.GetRewardInfo().OnCloseCallback;
    e && e(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCloseRewardView,
      ),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  bl(e) {
    (this.jIt = e),
      this.G$t() && this.mGe(),
      this.N$t() && this.O$t(),
      this.b$t() && this.q$t();
  }
  G$t() {
    var e = this.jIt.GetRewardInfo().Title;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    return this.GetItem(2).SetUIActive(e), e;
  }
  mGe() {
    let e;
    const t = this.jIt.GetRewardInfo().Title;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetText(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  N$t() {
    var e = this.jIt.GetRewardInfo().ContinueText;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    return this.GetItem(4).SetUIActive(e), e;
  }
  O$t() {
    let e;
    const t = this.jIt.GetRewardInfo().ContinueText;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetText(4)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  b$t() {
    var e = this.jIt.GetRewardInfo().IsItemVisible;
    const t = this.jIt.GetItemList();
    var e = e && void 0 !== t && t?.length > 0;
    return this.sOe.GetActive() !== e && this.sOe.SetActive(e), e;
  }
  q$t() {
    this.sOe.Refresh(this.jIt.GetItemList());
  }
}
exports.CommonRewardView = CommonRewardView;
// # sourceMappingURL=CommonRewardView.js.map
