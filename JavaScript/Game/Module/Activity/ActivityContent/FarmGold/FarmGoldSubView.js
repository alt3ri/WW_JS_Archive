"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldSubView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class FarmGoldSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.jwl = void 0),
      (this.Q6a = void 0),
      (this.lRo = () => {
        this.R2e();
      }),
      (this.R2e = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          this.jwl.GetRewardPopUpViewData(),
          (e, i) => {
            UiManager_1.UiManager.GetViewByName(
              "CommonActivityView",
            )?.AddChildViewById(i);
          },
        );
      }),
      (this.DFe = (e) => {
        var i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        0 < i
          ? UiManager_1.UiManager.OpenView("QuestView", i)
          : ((i = {
              MarkId:
                ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldMarkByActivityId(
                  this.ActivityBaseData.Id,
                ).MarkId,
              MarkType: 0,
              OpenFogId: 0,
            }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, i));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.lRo]]);
  }
  async OnBeforeStartAsync() {
    (this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
      this.Q6a.SetData(this.ActivityBaseData),
      this.Q6a.SetClickFunc(this.DFe),
      this.Q6a.SetRewardButtonFunction(this.R2e),
      await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.jwl = this.ActivityBaseData;
  }
  OnBeforeShow() {
    0 < this.ActivityBaseData.GetUnFinishPreGuideQuestId()
      ? this.Q6a.SetBtnText("FarmGoldEnterText")
      : this.Q6a.SetBtnText("PrefabTextItem_2701983798_Text"),
      this.Zl_(),
      RedDotController_1.RedDotController.BindRedDot(
        "FarmGoldReward",
        this.GetItem(2),
        void 0,
        this.ActivityBaseData?.Id,
      );
  }
  OnRefreshView() {
    this.BNe();
  }
  BNe() {
    var e = this.jwl.EntranceRedDot(),
      i = this.jwl.GetPreGuideQuestFinishState();
    this.Q6a.SetFunctionRedDotVisible(i && e);
  }
  OnBeforeHide() {
    this.Zl_();
  }
  Zl_() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "FarmGoldReward",
      this.GetItem(2),
    );
  }
}
exports.FarmGoldSubView = FarmGoldSubView;
//# sourceMappingURL=FarmGoldSubView.js.map
