"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRecommendView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  TowerRecommendItem_1 = require("./TowerRecommendItem");
class TowerRecommendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.rRo = void 0),
      (this.sbi = () => {
        return new TowerRecommendItem_1.TowerRecommendItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    (this.rRo = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.sbi,
    )),
      this.Og();
  }
  OnBeforeDestroy() {
    this.rRo = void 0;
  }
  Og() {
    ModelManager_1.ModelManager.TowerModel.RecommendFormation &&
    0 < ModelManager_1.ModelManager.TowerModel.RecommendFormation?.length
      ? (this.rRo.SetActive(!0),
        this.rRo.RefreshByData(
          ModelManager_1.ModelManager.TowerModel.RecommendFormation,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          "Text_DataFromOther_Text",
        ))
      : (this.rRo.SetActive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          "Text_DataCollation_Text",
        ));
  }
}
exports.TowerRecommendView = TowerRecommendView;
//# sourceMappingURL=TowerRecommendView.js.map
