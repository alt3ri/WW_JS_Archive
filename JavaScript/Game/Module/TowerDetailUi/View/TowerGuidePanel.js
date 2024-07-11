"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerGuidePanel = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TowerBuffShowItem_1 = require("./TowerBuffShowItem");
class TowerGuidePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.xLo = void 0),
      (this.bLo = () => {
        return new TowerBuffShowItem_1.TowerBuffShowItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  OnStart() {
    this.xLo = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(4),
      this.bLo,
    );
    const e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "T_ImgHelp_DailyTower_001_UI",
    );
    this.SetTextureByPath(e, this.GetTexture(3)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TowerGuideDes");
  }
  OnBeforeShow() {
    let e = ModelManager_1.ModelManager.TowerModel.CurrentTowerId;
    e &&
      (e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)) &&
      this.xLo.RefreshByData(e.ShowBuffs);
  }
}
exports.TowerGuidePanel = TowerGuidePanel;
// # sourceMappingURL=TowerGuidePanel.js.map
