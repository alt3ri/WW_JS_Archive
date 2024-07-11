"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompositeRewardView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemRewardController_1 = require("../ItemRewardController"),
  RewardItemList_1 = require("./RewardItemList"),
  RewardProgressBar_1 = require("./RewardProgressBar");
class CompositeRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.$Tt = void 0),
      (this.sOe = void 0),
      (this.H0i = void 0),
      (this.dSt = () => {
        UiManager_1.UiManager.CloseView("CompositeRewardView");
      }),
      (this.BYt = (e) => {
        this.bYt() && this.qYt();
      }),
      (this.j0i = () => {
        this.W0i() && this.K0i();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.dSt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.BYt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRewardProgressBar,
        this.j0i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.BYt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRewardProgressBar,
        this.j0i,
      );
  }
  async OnBeforeStartAsync() {
    this.sOe = new RewardItemList_1.RewardItemList();
    var e = this.GetItem(5);
    await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e),
      (this.H0i = new RewardProgressBar_1.RewardProgressBar(
        this.GetItem(6).GetOwner(),
      ));
  }
  OnStart() {
    (this.$Tt = this.OpenParam),
      this.GYt() && this.mGe(),
      this.Q0i() && this.X0i(),
      this.NYt() && this.OYt(),
      this.bYt() && this.qYt(),
      this.W0i() && this.K0i();
    var e = this.$Tt.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(e);
  }
  OnAfterShow() {
    this.$Tt.GetRewardInfo().IsSuccess
      ? this.UiViewSequence.PlaySequence("Success", !0)
      : this.UiViewSequence.PlaySequence("Fail", !0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
  }
  OnBeforeDestroy() {
    (this.H0i = void 0),
      (this.$Tt = void 0),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  OnTick(e) {
    this.H0i.Tick(e);
  }
  GYt() {
    var e = this.$Tt.GetRewardInfo().Title,
      e = !StringUtils_1.StringUtils.IsEmpty(e);
    return this.GetItem(4).SetUIActive(e), e;
  }
  mGe() {
    var e,
      t = this.$Tt.GetRewardInfo().Title;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetText(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  Q0i() {
    var e = this.$Tt.GetRewardInfo().TitleIconPath,
      e = !StringUtils_1.StringUtils.IsEmpty(e),
      t = this.GetTexture(2),
      i = this.GetTexture(3);
    return t.SetUIActive(e), i.SetUIActive(e), e;
  }
  X0i() {
    var e = this.$Tt.GetRewardInfo().TitleIconPath;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      const t = this.GetTexture(2);
      t.SetUIActive(!1),
        this.SetTextureByPath(e, t, void 0, () => {
          t.SetUIActive(!0);
        });
    }
  }
  NYt() {
    var e = this.$Tt.GetRewardInfo().ContinueText,
      e = !StringUtils_1.StringUtils.IsEmpty(e);
    return this.GetItem(7).SetUIActive(e), e;
  }
  OYt() {
    var e,
      t = this.$Tt.GetRewardInfo().ContinueText;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetText(7)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
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
  W0i() {
    var e = this.$Tt.GetRewardInfo(),
      t = this.$Tt.GetExtendRewardInfo(),
      e = e.IsProgressVisible,
      t = t.ProgressQueue,
      e = e && void 0 !== t && 0 < t?.length;
    return this.H0i.SetActive(e), e;
  }
  K0i() {
    var e = this.$Tt.GetRewardInfo(),
      t = this.$Tt.GetExtendRewardInfo().ProgressQueue;
    t &&
      0 !== t.length &&
      this.H0i.Refresh(e.ProgressBarTitle, t, e.ProgressBarAnimationTime);
  }
}
exports.CompositeRewardView = CompositeRewardView;
//# sourceMappingURL=CompositeRewardView.js.map
