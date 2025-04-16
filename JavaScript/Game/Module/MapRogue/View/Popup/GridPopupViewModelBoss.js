"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridPopupViewModelBoss = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  GridPopupViewModelBase_1 = require("./GridPopupViewModelBase");
class GridPopupViewModelBoss extends GridPopupViewModelBase_1.GridPopupViewModelBase {
  constructor() {
    super(...arguments),
      (this.RecommendTip = void 0),
      (this.Button = void 0),
      (this.EventCost = void 0),
      (this.HasBtnDetail = !0);
  }
  async Init() {
    (this.RecommendTip = await this.View.InitRecommendTip()),
      (this.Button = await this.View.InitComponentButton()),
      (this.EventCost = await this.View.InitEventCost());
  }
  GetSubTxtInfo() {
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "RogueRes_Block_Level",
    );
    return StringUtils_1.StringUtils.Format(i, this.GridData.Lv.toString());
  }
  RefreshTop() {
    this.EventCost.Refresh(this.GridData);
  }
  RefreshFunctional() {
    this.RecommendTip.SetTextChangeColor(
      this.GameInfo.TeamLv < this.GridData.Lv,
    ),
      this.RecommendTip.SetDescriptionByTextId(
        "RogueRes_Block_Recommend_Level",
        this.GridData.Lv.toString(),
      );
    var i = this.EventAvailable();
    this.Button.SetUiActive(i),
      i &&
        (this.Button.SetButtonTextByTextId("RogueRes_Block_Move"),
        this.Button.SetButtonFunction(this.MoveButtonFunction));
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (0 !== i.length)
      return "EventCost" === i[0]
        ? this.EventCost?.GetGuideUiItemAndUiItemForShowEx(i)
        : "Goto" === i[0] && (i = this.Button?.GetRootItem())
          ? [i, i]
          : void 0;
  }
}
exports.GridPopupViewModelBoss = GridPopupViewModelBoss;
//# sourceMappingURL=GridPopupViewModelBoss.js.map
