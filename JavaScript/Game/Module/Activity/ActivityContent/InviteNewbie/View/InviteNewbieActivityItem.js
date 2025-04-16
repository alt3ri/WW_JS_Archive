"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InviteNewbieActivityItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  InviteNewbieDefine_1 = require("../InviteNewbieDefine");
class InviteNewbieActivityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.gV_ = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.gV_ = this.OpenParam;
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
      this.gV_,
    )),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    var i = this.gV_.LocalConfig,
      i =
        (this.LNe.SetTitleByText(this.gV_.GetTitle()),
        this.LNe.SetSubTitleVisible(
          !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
        ),
        i?.DescTheme && this.LNe.SetSubTitleByTextId(i.DescTheme),
        this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),
        i?.Desc && this.DNe.SetContentByTextId(i.Desc),
        this.gV_.GetPreviewReward());
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i),
      this.UNe.SetTitleByTextId(
        InviteNewbieDefine_1.REWARD_TITLE_TEXT_ID_IN_SUBVIEW,
      ),
      this.ANe.FunctionButton.SetFunction(
        ActivityControllerHolder_1.ActivityControllerHolder
          .ActivityInviteNewbieController.HandleOnEnterClick,
      ),
      this.ANe.FunctionButton.SetLocalTextNew(
        InviteNewbieDefine_1.ENTER_BUTTON_TITLE_TEXT_ID_IN_SUBVIEW,
      );
  }
  OnBeforeShow() {
    super.OnBeforeShow(), this.ANe.FunctionButton.BindRedDot("InviteNewbie");
  }
  OnAfterHide() {
    super.OnAfterHide(), this.ANe.FunctionButton.UnBindGivenUid(0);
  }
  RefreshTimerTextByData(i, t) {
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
}
exports.InviteNewbieActivityItem = InviteNewbieActivityItem;
//# sourceMappingURL=InviteNewbieActivityItem.js.map
