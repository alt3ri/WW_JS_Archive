"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySolarSpeedSubView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySolarSpeedSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.k6_ = void 0),
      (this.q6_ = void 0),
      (this.pz_ = void 0),
      (this.vz_ = void 0),
      (this.yz_ = void 0),
      (this.kZs = () => {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleConfirmClickInActivitySubView();
      }),
      (this.A3_ = () => {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleOnClickRewardInActivitySubView();
      }),
      (this.O6_ = () => {
        void 0 !== this.k6_ && this.GetItem(5)?.SetUIActive(this.k6_()),
          void 0 !== this.pz_ &&
            LguiUtil_1.LguiUtil.TrySetLocalTextNew(
              this.GetText(7),
              this.vz_,
              this.pz_(),
              this.yz_,
            );
      }),
      (this.G6_ = () => {
        void 0 !== this.q6_ && this.ANe?.SetFunctionRedDotVisible(this.q6_());
      }),
      (this.juc = (i) => {
        i === ModelManager_1.ModelManager.SolarSpeedModel.CurrentActivityId &&
          void 0 !== this.q6_ &&
          this.ANe?.SetFunctionRedDotVisible(this.q6_());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[4, this.A3_]]);
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      s =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig,
      t =
        ModelManager_1.ModelManager.SolarSpeedModel.BuildActivitySubViewData(),
      i =
        (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
        this.LNe.SetSubTitleVisible(
          !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
        ),
        i?.DescTheme && this.LNe.SetSubTitleByTextId(i.DescTheme),
        this.FNe(),
        this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),
        i?.Desc && this.DNe.SetContentByTextId(i.Desc),
        this.ActivityBaseData.GetPreviewReward()),
      i =
        (this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
        this.UNe.RefreshItemLayout(i),
        this.UNe.SetTitleByTextId(t.RewardTextId),
        this.ActivityBaseData.IsUnLock());
    this.ANe.SetPanelConditionVisible(!i),
      this.ANe.FunctionButton.SetActive(i),
      i
        ? (this.ANe.FunctionButton.SetFunction(this.kZs),
          this.ANe.FunctionButton.SetLocalTextNew(t.ButtonTextId))
        : this.ANe.SetPerformanceConditionLock(
            this.ActivityBaseData.ConditionGroupId,
            this.ActivityBaseData.Id,
          ),
      this.GetItem(6)?.SetUIActive(i),
      (this.pz_ = t.RewardProgressCurrentGetter),
      (this.vz_ = t.RewardProgressTextId),
      (this.yz_ = t.RewardProgressTotal),
      i &&
        ((i = void 0 === this.pz_ ? "0" : this.pz_()),
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(
          this.GetText(7),
          t.RewardProgressTextId,
          i,
          t.RewardProgressTotal,
        )),
      (this.k6_ = t.RewardRedDotStateGetter),
      void 0 !== this.k6_ && this.GetItem(5)?.SetUIActive(this.k6_()),
      (this.q6_ = t.ConfirmRedDotStateGetter),
      void 0 !== this.q6_ && this.ANe?.SetFunctionRedDotVisible(this.q6_());
  }
  OnBeforeShow() {
    super.OnBeforeShow();
  }
  OnAfterHide() {
    super.OnAfterHide();
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SolarSpeedSubViewOnRefreshView,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SolarSpeedRewarded,
      this.O6_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChallengeInstanceRedDot,
        this.G6_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.juc,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SolarSpeedRewarded,
      this.O6_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChallengeInstanceRedDot,
        this.G6_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.juc,
      );
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
}
exports.ActivitySolarSpeedSubView = ActivitySolarSpeedSubView;
//# sourceMappingURL=ActivitySolarSpeedSubView.js.map
