"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewGeneralInfo = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ActivityDescriptionTypeA_1 = require("../../ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("./ActivitySubViewBase");
class ActivitySubViewGeneralInfo extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.k5e = void 0),
      (this.DFe = () => {
        this.k5e?.(this.ActivityBaseData);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      s =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    var t,
      i,
      e = this.ActivityBaseData.LocalConfig;
    e &&
      ((i = e.DescTheme),
      (t = !StringUtils_1.StringUtils.IsEmpty(i)),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.LNe.SetSubTitleVisible(t),
      t && this.LNe.SetSubTitleByTextId(i),
      (t = e.Desc),
      this.DNe.SetContentByTextId(t),
      (i = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i),
      this.ANe.FunctionButton.BindCallback(this.DFe),
      this.ANe.FunctionButton.RefreshTextNew("CollectActivity_reward"),
      this.OnRefreshView());
  }
  OnRefreshView() {
    this.RefreshFunction(), this.FNe();
  }
  OnTimer(t) {
    this.FNe();
  }
  RefreshFunction() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe?.FunctionButton?.SetUiActive(t),
      this.ANe?.SetPanelConditionVisible(!t),
      t ||
        ((t = this.GetCurrentLockConditionText()),
        this.ANe?.SetLockTextByTextId(t));
  }
  FNe() {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(i);
  }
  SetBtnText(t, ...i) {
    this.ANe?.FunctionButton?.RefreshTextNew(t, i);
  }
  SetClickFunc(t) {
    this.k5e = t;
  }
  SetFunctionRedDotVisible(t) {
    this.ANe?.SetFunctionRedDotVisible(t);
  }
}
exports.ActivitySubViewGeneralInfo = ActivitySubViewGeneralInfo;
//# sourceMappingURL=ActivitySubViewGeneralInfo.js.map
