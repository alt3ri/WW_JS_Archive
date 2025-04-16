"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHandBookRewardItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  FishingController_1 = require("../FishingController"),
  TAKEN_ALPHA = 0.6;
class FishingHandBookRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Jkt = 0),
      (this.bOe = void 0),
      (this.YVe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.YDo = () => {
        FishingController_1.FishingController.RequestFishingIllustratedReward(
          this.Jkt,
        );
      }),
      (this.Ykt = () => {
        var e =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingIllustratedRewardById(
            this.Jkt,
          );
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.AccessPath);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.YDo],
        [1, this.Ykt],
      ]);
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1),
      (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(6),
        this.YVe,
      ));
  }
  Refresh(e, i, r) {
    this.Jkt = e;
    var e =
        ModelManager_1.ModelManager.FishingModel.FishingItemHandBookRewardMap.get(
          this.Jkt,
        ),
      e =
        (this.GetItem(3)?.SetUIActive(!1),
        this.GetButton(0)?.RootUIComp.SetUIActive(!1),
        this.GetButton(1)?.RootUIComp.SetUIActive(!1),
        e?.IsTaken
          ? (this.GetItem(3)?.SetUIActive(!0),
            this.GetItem(7).SetAlpha(TAKEN_ALPHA))
          : ((e?.IsFinished
              ? this.GetButton(0)
              : this.GetButton(1)
            )?.RootUIComp.SetUIActive(!0),
            this.GetItem(7).SetAlpha(1)),
        this.GetText(5).SetText(e?.Current + "/" + e?.Target),
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingIllustratedRewardById(
          this.Jkt,
        )),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Desc),
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
          e.DropId,
        )),
      s = new Array();
    for (const a of t.keys()) {
      var n = [{ IncId: 0, ItemId: a }, t.get(a)];
      s.push(n);
    }
    this.bOe?.RefreshByData(s);
  }
}
exports.FishingHandBookRewardItem = FishingHandBookRewardItem;
//# sourceMappingURL=FishingHandBookRewardItem.js.map
