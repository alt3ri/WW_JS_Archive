"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestRewardView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestRewardItemList_1 = require("./QuestRewardItemList"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
class QuestRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Tt = void 0),
      (this.sOe = void 0),
      (this.dSt = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
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
      [4, UE.UIText],
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
      );
  }
  OnStart() {
    var e = this.OpenParam;
    e &&
      ((this.$Tt = e),
      (this.sOe = new QuestRewardItemList_1.QuestRewardItemList(
        this.GetItem(3).GetOwner(),
      )),
      this.GYt() && this.mGe(),
      this.NYt() && this.OYt(),
      this.bYt() && this.qYt(),
      (e = e.GetRewardInfo().AudioId),
      ItemRewardController_1.ItemRewardController.PlayAudio(e));
  }
  OnAfterDestroy() {
    this.$Tt = void 0;
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
  }
  OnBeforeDestroyImplement() {
    this.$Tt.GetRewardInfo().OnCloseCallback?.(),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
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
    return this.GetText(4).SetUIActive(e), e;
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
exports.QuestRewardView = QuestRewardView;
//# sourceMappingURL=QuestRewardView.js.map
