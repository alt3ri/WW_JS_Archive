"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkActivitySubView = void 0);
const UE = require("ue"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../Activity/View/SubView/ActivitySubViewGeneralInfo"),
  DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem"),
  DreamLinkLimitTimeRewardItem_1 = require("./SubView/DreamLinkLimitTimeRewardItem");
class DreamLinkActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.GeneralActivityInfo = void 0),
      (this.Atl = void 0),
      (this.qsi = void 0),
      (this.eje = () => {
        var i;
        this.ActivityBaseData.IsDreamLinkFunctionUnlock(0)
          ? this.ActivityBaseData.GetActivityConfig() &&
            UiManager_1.UiManager.OpenView("DreamLinkMainView", 1)
          : ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            this.ActivityBaseData.SaveQuestRedDotState(),
            UiManager_1.UiManager.OpenView("QuestView", i));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [];
    (this.GeneralActivityInfo =
      new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
      this.GeneralActivityInfo.SetData(this.ActivityBaseData),
      this.GeneralActivityInfo.SetClickFunc(this.eje),
      i.push(
        this.GeneralActivityInfo.CreateThenShowByActorAsync(
          this.GetItem(0).GetOwner(),
        ),
      ),
      (this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(
        this.ActivityBaseData,
      )),
      i.push(this.qsi.CreateByActorAsync(this.GetItem(2).GetOwner())),
      (this.Atl =
        new DreamLinkLimitTimeRewardItem_1.DreamLinkLimitTimeRewardItem(
          this.ActivityBaseData,
        )),
      i.push(this.Atl.CreateByActorAsync(this.GetItem(1).GetOwner())),
      await Promise.all(i);
  }
  async OnBeforeHideSelfAsync() {
    this.qsi.SetActive(!1), this.Atl.SetActive(!1);
  }
  OnRefreshView() {
    this.Rtl(),
      this.ZGe(),
      this.Atl.RefreshActive(),
      this.qsi.SetActive(this.ActivityBaseData.IsUnLock()),
      this.ActivityBaseData.IsUnLock() && this.qsi.RefreshPerformance();
  }
  Rtl() {
    var i = 0 === this.ActivityBaseData.GetInstStage();
    this.GetItem(3).SetUIActive(i), this.GetItem(4).SetUIActive(!i);
  }
  ZGe() {
    this.ActivityBaseData.IsDreamLinkFunctionUnlock(0)
      ? (this.GeneralActivityInfo.SetFunctionRedDotVisible(
          this.ActivityBaseData.RedPointShowState,
        ),
        this.GeneralActivityInfo?.SetBtnText("FragmentMemoryEnterText"))
      : (this.GeneralActivityInfo.SetFunctionRedDotVisible(
          this.ActivityBaseData.GetQuestRedDotState(),
        ),
        this.GeneralActivityInfo?.SetBtnText("PrefabTextItem_2152138235_Text"));
  }
}
exports.DreamLinkActivitySubView = DreamLinkActivitySubView;
//# sourceMappingURL=DreamLinkActivitySubView.js.map
