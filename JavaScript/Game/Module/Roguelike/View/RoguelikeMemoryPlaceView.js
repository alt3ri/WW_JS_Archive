"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeMemoryPlaceView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeMemoryRewardItemData {
  constructor() {
    (this.SeasonReward = void 0), (this.Config = void 0);
  }
}
class RoguelikeMemoryRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.GridItem = void 0),
      (this.Data = void 0),
      (this.OnBtnRewardClick = () => {
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          RoguelikeDefine_1.COLLECT_SCORE_ID,
        ) >= this.Data.Config.Point &&
          RoguelikeController_1.RoguelikeController.RoguelikeSeasonRewardReceiveRequest(
            [this.Data?.Config?.Index ?? 0],
          ).then((e) => {});
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.OnBtnRewardClick]]);
  }
  OnStart() {
    void 0 === this.GridItem &&
      ((this.GridItem =
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.GridItem.Initialize(this.GetItem(0).GetOwner())),
      this.GridItem.SetActive(!1);
  }
  Refresh(e, i, t) {
    this.Data = e;
    const r =
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        RoguelikeDefine_1.COLLECT_SCORE_ID,
      ) >= e.Config.Point;
    var o =
      (r && !e.SeasonReward?.qms
        ? this.GetButton(4).SetActive(!0)
        : this.GetButton(4).SetActive(!1),
      this.GridItem.SetActive(!0),
      ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(
        e.Config.DropId,
      ));
    var o = Array.from(o);
    var o = [{ IncId: 0, ItemId: o[0][0] }, o[0][1]];
    this.GridItem.Refresh(o),
      this.GetText(1).SetText(e.Config.Index.toString()),
      (this.GetSprite(2).useChangeColor = r),
      (this.GetSprite(3).useChangeColor = r),
      this.GetSprite(3).SetUIActive(t !== 0);
  }
}
class RoguelikeMemoryPlaceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.LoopScrollView = void 0),
      (this.SeasonData = void 0),
      (this.CreateLoopScrollItem = () => new RoguelikeMemoryRewardItem()),
      (this.OnBtnTokenOverViewClick = () => {
        UiManager_1.UiManager.OpenView(
          "RoguelikeTokenOverView",
          this.SeasonData,
        );
      }),
      (this.OnBtnAchievementViewClick = () => {
        UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [6, UE.UIText],
      [5, UE.UIText],
      [7, UE.UILoopScrollViewComponent],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnBtnTokenOverViewClick],
        [2, this.OnBtnAchievementViewClick],
      ]);
  }
  OnStart() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(0),
    )),
      this.CaptionItem.SetCloseCallBack(() => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(7),
        this.GetItem(8).GetOwner(),
        this.CreateLoopScrollItem,
      )),
      this.GetLoopScrollViewComponent(7)
        .RootUIComp.GetParentAsUIItem()
        .SetUIActive(!1),
      this.CaptionItem.SetHelpBtnActive(!1),
      (this.SeasonData = this.OpenParam);
    const i =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonReward(
        this.SeasonData.F8n,
      );
    const t = [];
    for (let e = 0; e < i.length; e++) {
      const r = i[e];
      const o = new RoguelikeMemoryRewardItemData();
      (o.SeasonReward = this.SeasonData.Yws[e]), (o.Config = r), t.push(o);
    }
    this.LoopScrollView.ReloadData(t), this.UpdateView();
  }
  UpdateView() {
    var e = this.SeasonData.Yws.length;
    let i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      RoguelikeDefine_1.COLLECT_SCORE_ID,
    );
    let t =
      ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    var e =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "Roguelike_MemoryPlace_Level",
        e.toString(),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "Roguelike_MemoryPlace_Exp",
        i,
        t.PointItemMaxCount,
      ),
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
        this.SeasonData.F8n,
      ));
    let r = 0;
    let o = 0;
    for (const s of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
      e.Achievement,
    ))
      (o += s.GetMaxProgress()), (r += s.GetCurrentProgress());
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(5),
      "Rogue_MemoryPlace_Progress",
      r,
      o,
    );
    (i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTokenBySeasonId(
      this.SeasonData.F8n,
    ).length),
      (t = this.SeasonData.Xws.length);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(6),
      "Rogue_MemoryPlace_Progress",
      t,
      i,
    );
  }
}
exports.RoguelikeMemoryPlaceView = RoguelikeMemoryPlaceView;
// # sourceMappingURL=RoguelikeMemoryPlaceView.js.map
