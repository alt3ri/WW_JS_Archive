"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySpring25SubView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller");
class ActivitySpring25SubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.kZs = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleConfirmClickInActivitySubView();
      }),
      (this.gkl = () => {
        var i =
          ModelManager_1.ModelManager.Spring25Model.BuildActivitySubViewData();
        this.GetText(5)?.SetText(i.Current),
          LguiUtil_1.LguiUtil.TrySetLocalTextNew(
            this.GetText(6),
            i.TotalTextId,
            i.TotalTextArg,
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
      [6, UE.UIText],
      [7, UE.UITexture],
      [8, UE.UITexture],
    ];
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
      t = ModelManager_1.ModelManager.Spring25Model.BuildActivitySubViewData(),
      i =
        (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
        this.LNe.SetSubTitleVisible(
          !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
        ),
        i?.DescTheme && this.LNe.SetSubTitleByTextId(i.DescTheme),
        this.FNe(),
        this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),
        i?.Desc && this.DNe.SetContentByTextId(i.Desc),
        this.ActivityBaseData.GetPreviewReward());
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i),
      this.UNe.SetTitleByTextId(t.RewardTextId),
      this.ANe.FunctionButton.SetFunction(this.kZs),
      this.ANe.FunctionButton.SetLocalTextNew(t.ButtonTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.ProgressTextId),
      this.GetText(5)?.SetText(t.Current),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(
        this.GetText(6),
        t.TotalTextId,
        t.TotalTextArg,
      ),
      this.GetTexture(8)?.SetUIActive(t.IsMale),
      this.GetTexture(7)?.SetUIActive(!t.IsMale);
  }
  OnBeforeShow() {
    super.OnBeforeShow(), this.ANe.FunctionButton.BindRedDot("Spring25Enter");
  }
  OnAfterHide() {
    super.OnAfterHide(), this.ANe.FunctionButton.UnBindGivenUid(0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.Spring25InviteDone,
      this.gkl,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.Spring25InviteDone,
      this.gkl,
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
exports.ActivitySpring25SubView = ActivitySpring25SubView;
//# sourceMappingURL=ActivitySpring25SubView.js.map
