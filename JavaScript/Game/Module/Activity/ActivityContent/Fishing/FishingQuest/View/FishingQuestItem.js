"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQuestItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../../FishingDefine"),
  FishingQuestItemChildItem_1 = require("./FishingQuestItemChildItem");
class FishingQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickTaskCallBack = void 0),
      (this.qoh = void 0),
      (this.Hc_ = -1),
      (this.P2i = []),
      (this.sGe = () => {
        var e = new FishingQuestItemChildItem_1.FishingQuestItemChildItem();
        return (e.OnClickTaskCallBack = this.OnClickTaskCallBack), e;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  OnStart() {
    this.qoh = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.sGe,
    );
  }
  Refresh(e, i, t) {
    var r =
      ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrustPoolById(e);
    this.SetSpriteByPath(r.TitleSprite, this.GetSprite(3), !1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r.TitleName),
      (this.P2i =
        ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsByPoolType(e)),
      this.P2i.sort((e, i) => {
        e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
        return (
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i)
            .Star - e.Star
        );
      }),
      e === FishingDefine_1.FISHING_NORMAL_ENTRUST_POOL &&
        ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(
          ModelManager_1.ModelManager.FishingModel.FishingSlotCountTech,
        ) <
          ModelManager_1.ModelManager.FishingModel.GetTechNodeMaxLevel(
            ModelManager_1.ModelManager.FishingModel.FishingSlotCountTech,
          ) &&
        this.P2i.push(-1),
      this.qoh.RefreshByData(this.P2i, () => {
        this.Hc_ < 0 ||
          (this.qoh.GetLayoutItemByIndex(this.Hc_)?.SelectToggle(),
          (this.Hc_ = -1));
      }),
      this.GetItem(6).SetColor(
        UE.Color.FromHex(FishingDefine_1.fishingQuestPoolColorText[e]),
      );
  }
  SelectFirstItem(e = 0) {
    var i = this.qoh.GetLayoutItemByIndex(e);
    i ? i.SelectToggle() : (this.Hc_ = e);
  }
  HaveTargetTask(e) {
    return this.P2i.indexOf(e);
  }
  RefreshChildItemStateAbout() {
    var e = this.qoh?.GetLayoutItemList();
    if (e) for (const i of e) i.RefreshItem();
  }
}
exports.FishingQuestItem = FishingQuestItem;
//# sourceMappingURL=FishingQuestItem.js.map
