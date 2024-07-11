"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRoleGive = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  RoleDescribeComponent_1 = require("../../../Gacha/GachaMainView/RoleDescribeComponent"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRoleGiveController_1 = require("./ActivityRoleGiveController");
class ActivitySubViewRoleGive extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.ANe = void 0),
      (this.DIa = void 0),
      (this.U2i = void 0),
      (this.Pe = void 0),
      (this.DFe = () => {
        var i, t;
        this.Pe?.RedPointShowState
          ? ((i = this.Pe?.GetExtraConfig()),
            (t =
              ModelManager_1.ModelManager.MoonChasingModel?.GetPopularityValue()),
            !i ||
              !t ||
              t < i.PopularityNeed ||
              ActivityRoleGiveController_1.ActivityRoleGiveController.TrackMoonActivityRewardRequest())
          : ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(
              Protocol_1.Aki.Protocol.oks.Proto_TrackMoonActivity,
            ).forEach((i) => {
              var t;
              0 === i.ActivityFlowState &&
                (i.GetPreGuideQuestFinishState()
                  ? ((t = {
                      MarkId:
                        ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(
                          this.ActivityBaseData.Id,
                        ).FocusMarkId,
                      MarkType: 6,
                    }),
                    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
                      2,
                      !1,
                      t,
                    ))
                  : UiManager_1.UiManager.OpenView(
                      "QuestView",
                      i.GetUnFinishPreGuideQuestId(),
                    ));
            });
      }),
      (this.aFo = () => {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [
          this.Pe.GetExtraConfig().RoleTrialId,
        ]);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [3, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[3, this.aFo]]);
  }
  OnSetData() {
    this.Pe = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(1)),
      i =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(4)),
      i =
        ((this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
        await this.ANe.CreateThenShowByActorAsync(i.GetOwner()),
        (this.DIa = new RoleDescribeComponent_1.RoleDescribeComponent()),
        this.GetItem(2)),
      i =
        (await this.DIa.CreateThenShowByActorAsync(i.GetOwner()),
        (this.U2i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
        this.GetItem(5));
    await this.U2i.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i,
      t,
      e = this.Pe.LocalConfig,
      r = this.Pe.GetExtraConfig();
    e &&
      r &&
      ((t = e.DescTheme),
      (i = !StringUtils_1.StringUtils.IsEmpty(t)),
      this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(t),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      (i = e.Desc),
      this.DNe.SetContentByTextId(i),
      this.ANe.FunctionButton?.BindCallback(this.DFe),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      )),
      this.ANe.FunctionButton.SetText(t),
      (e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
        r.RoleTrialId,
      )),
      this.DIa?.Update(e.ParentId),
      this.U2i?.RefreshByConfigId(e.ParentId),
      this.OnRefreshView());
  }
  OnTimer(i) {
    this.OnRefreshView();
  }
  OnRefreshView() {
    this.RefreshCondition(), this.FNe(), this.BNe(), this.Nqe();
  }
  Nqe() {
    var t = this.Pe.GetExtraConfig();
    if (t) {
      let i =
        ModelManager_1.ModelManager.MoonChasingModel?.GetPopularityValue();
      (i = i || 0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(6),
          "Moonfiesta_PopularityProgress",
          i,
          t.PopularityNeed,
        ),
        this.GetSprite(7)?.SetFillAmount(i / t.PopularityNeed);
    }
  }
  FNe() {
    var [, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextByText(i);
  }
  RefreshCondition() {
    var i = this.Pe.GetExtraConfig();
    i &&
      (this.ActivityBaseData.IsUnLock()
        ? (this.Pe?.IsGetReward
            ? (this.ANe.FunctionButton?.SetUiActive(!1),
              this.ANe.SetActivatePanelConditionVisible(!0))
            : (this.ANe.FunctionButton?.SetUiActive(!0),
              this.ANe.SetActivatePanelConditionVisible(!1)),
          this.ANe.SetPanelConditionVisible(!1),
          !this.Pe?.IsGetReward &&
          ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue() >=
            i.PopularityNeed
            ? this.ANe.FunctionButton?.SetText(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "CollectActivity_state_CanRecive",
                ),
              )
            : this.ANe.FunctionButton?.SetText(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "CollectActivity_Button_ahead",
                ),
              ))
        : (this.ANe.FunctionButton?.SetUiActive(!1),
          (i = this.GetCurrentLockConditionText()),
          this.ANe.SetLockTextByTextId(i),
          this.ANe.SetPanelConditionVisible(!0)));
  }
  BNe() {
    this.ANe?.SetFunctionRedDotVisible(this.Pe.RedPointShowState);
  }
}
exports.ActivitySubViewRoleGive = ActivitySubViewRoleGive;
//# sourceMappingURL=ActivitySubViewRoleGive.js.map
