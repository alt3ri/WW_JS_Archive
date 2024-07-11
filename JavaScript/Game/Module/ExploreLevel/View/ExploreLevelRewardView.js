"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelRewardView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const RewardItemList_1 = require("../../ItemReward/View/RewardItemList");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreLevelRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jIt = void 0),
      (this.sOe = void 0),
      (this.JSt = () => {
        UiManager_1.UiManager.CloseView("ExploreLevelRewardView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.JSt]]);
  }
  async OnBeforeStartAsync() {
    this.jIt = this.OpenParam;
    let e;
    let i;
    const t = this.jIt.GetItemList();
    let r =
      ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
    r &&
      ((e = (i = this.jIt.GetRewardInfo()).CurrentExploreLevel),
      (i = i.TargetExploreLevel),
      (r = r.GetExploreLevelRewardData(i))) &&
      ((r = r.GetScoreTexturePath()),
      this.SetTextureByPath(r, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "ExploreLevelRewardTitleText",
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "Text_PlayerLevelNum_Text",
        e,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        "Text_PlayerLevelNum_Text",
        i,
      ),
      (r = this.GetItem(2)),
      (this.sOe = new RewardItemList_1.RewardItemList()),
      await this.sOe.CreateThenShowByActorAsync(r.GetOwner(), r),
      this.sOe.Refresh(t));
  }
  OnBeforeDestroy() {
    this.sOe = void 0;
  }
}
exports.ExploreLevelRewardView = ExploreLevelRewardView;
// # sourceMappingURL=ExploreLevelRewardView.js.map
