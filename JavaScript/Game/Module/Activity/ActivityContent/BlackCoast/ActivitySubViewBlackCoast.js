"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewBlackCoast = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewBlackCoast extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.Gke = () => {
        UiManager_1.UiManager.OpenView(
          "BlackCoastActivityMainView",
          this.ActivityBaseData,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [],
      t = this.GetItem(0),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        i.push(this.LNe.CreateThenShowByActorAsync(t.GetOwner())),
        this.GetItem(1)),
      t =
        ((this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        i.push(this.DNe.CreateThenShowByActorAsync(t.GetOwner())),
        this.GetItem(2)),
      t =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        i.push(this.UNe.CreateThenShowByActorAsync(t.GetOwner())),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      i.push(this.ANe.CreateThenShowByActorAsync(t.GetOwner())),
      await Promise.all(i);
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig;
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.LNe.SetSubTitleVisible(
        !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
      ),
      i?.DescTheme && this.LNe.SetSubTitleByTextId(i.DescTheme),
      this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),
      i?.Desc && this.DNe.SetContentByTextId(i.Desc);
    const t = this.GetTexture(6);
    t.SetUIActive(!1),
      this.SetItemIcon(
        t,
        this.ActivityBaseData.GetProgressItemId,
        void 0,
        () => {
          t.SetUIActive(!0);
        },
      );
    i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i),
      this.ANe.FunctionButton.SetFunction(this.Gke),
      this.OnRefreshView();
  }
  OnRefreshView() {
    this.d7s(), this._Oe(), this.BNe();
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
  d7s() {
    this.GetText(4).SetText(
      this.ActivityBaseData.GetProgressItemCount().toString() + "/",
    ),
      this.GetText(5).SetText(
        this.ActivityBaseData.GetProgressItemTotal().toString(),
      );
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      i ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ),
      this.ANe.FunctionButton.SetActive(i);
  }
  BNe() {
    var i = this.ActivityBaseData.RewardRedDotState();
    this.ANe.SetFunctionRedDotVisible(i);
  }
}
exports.ActivitySubViewBlackCoast = ActivitySubViewBlackCoast;
//# sourceMappingURL=ActivitySubViewBlackCoast.js.map
