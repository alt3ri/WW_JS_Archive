"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaActivitySubView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityCircleButtonItem_1 = require("../UniversalComponents/Functional/ActivityCircleButtonItem"),
  ActivityQuestTipsItem_1 = require("../UniversalComponents/Functional/ActivityQuestTipsItem"),
  CiacconaActivityInfoPanel_1 = require("./CiacconaActivityInfoPanel");
class CiacconaActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.D3c = void 0),
      (this.B3c = void 0),
      (this.k3c = void 0),
      (this.O3c = void 0),
      (this.bM1 = void 0),
      (this.q3c = () => new CiacconaEndingIcon()),
      (this.G3c = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingView();
      }),
      (this.F3c = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenRewardViewByActivityId(
          this.ActivityBaseData.Id,
        );
      }),
      (this.RM1 = () => {
        var i =
          ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(
            this.ActivityBaseData.Id,
          );
        0 < i.RecommendQuestId &&
          UiManager_1.UiManager.OpenView("QuestView", i.RecommendQuestId);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.D3c = new CiacconaActivityInfoPanel_1.CiacconaActivityInfoPanel(
      this.ActivityBaseData,
    )),
      (this.k3c = new ActivityCircleButtonItem_1.ActivityCircleButtonItem()),
      (this.O3c = new ActivityCircleButtonItem_1.ActivityCircleButtonItem()),
      (this.bM1 = new ActivityQuestTipsItem_1.ActivityQuestTipsItem());
    var i = [];
    i.push(this.D3c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
      i.push(this.k3c.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())),
      i.push(this.O3c.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())),
      i.push(this.bM1.CreateThenShowByActorAsync(this.GetItem(11).GetOwner())),
      await Promise.all(i),
      this.k3c.SetOnClick(this.G3c),
      this.O3c.SetOnClick(this.F3c),
      (this.B3c = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.q3c,
      )),
      this.bM1.SetRewardButtonFunction(this.RM1);
  }
  OnStart() {
    this.bl();
  }
  OnBeforeDestroy() {
    this.k3c?.UnBindRedDot(), this.O3c?.UnBindRedDot();
  }
  OnRefreshView() {
    this.bl();
  }
  bl() {
    this.D3c.SetTitle(this.ActivityBaseData.GetTitle());
    var i = this.ActivityBaseData.LocalConfig,
      i =
        (this.D3c.SetSubTitle(
          !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
          i?.DescTheme ?? "",
        ),
        this.D3c.SetDesc(
          !StringUtils_1.StringUtils.IsEmpty(i?.Desc),
          i?.Desc ?? "",
        ),
        this.D3c.SetReward(!0, this.ActivityBaseData.GetPreviewReward()),
        this.sSt(),
        ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(
          this.ActivityBaseData.Id,
        )),
      t =
        (this.D3c.RefreshFunctionArea(),
        ModelManager_1.ModelManager.CiacconaGalModel.GetAllEndingDataList()),
      [t, e] =
        (this.B3c.RefreshByData(t),
        this.GetItem(7).SetUIActive(i.State3Unlock),
        ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress()),
      [s, r] =
        ((this.GetSprite(6).fillAmount = t / e),
        this.GetText(5).SetText(t + "/" + e),
        this.GetItem(8).SetUIActive(i.State2Unlock && i.IsInRewardTime),
        this.bM1.SetContentByTextId(i.RecommendQuestTipsTextId),
        this.bM1.SetUiActive(
          0 < i.RecommendQuestId &&
            !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(
              i.RecommendQuestId,
            ),
        ),
        ModelManager_1.ModelManager.CiacconaGalModel.GetEndingProgress());
    this.k3c.SetSubText(s + "/" + r),
      this.k3c.SetUiActive(i.State3Unlock),
      this.k3c.SetRedDotVisible(
        ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward(),
      ),
      this.O3c.SetSubText(t + "/" + e),
      this.O3c.SetUiActive(i.IsInRewardTime && i.State2Unlock),
      this.O3c.SetRedDotVisible(
        ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward(),
      );
  }
  sSt() {
    var [, i] = this.GetTimeVisibleAndRemainTime();
    this.D3c?.SetTimer(!1, i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (0 !== i.length) return this.D3c?.GetGuideUiItemAndUiItemForShowEx(i);
  }
}
exports.CiacconaActivitySubView = CiacconaActivitySubView;
class CiacconaEndingIcon extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(i, t, e) {
    let s = "SP_PlotReasoningLock";
    i.IsFinished &&
      (s =
        1 === i.Type
          ? "SP_PlotReasoningFinishMain"
          : "SP_PlotReasoningFinishBranch");
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(i, this.GetSprite(0), !1);
  }
}
//# sourceMappingURL=CiacconaActivitySubView.js.map
