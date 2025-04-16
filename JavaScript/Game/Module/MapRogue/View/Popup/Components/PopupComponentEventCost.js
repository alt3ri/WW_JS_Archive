"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentEventCost = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopupComponentEventCost extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.InfoItem = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.InfoItem = new InfoItem()),
      await this.InfoItem.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      );
  }
  Refresh(e) {
    var t = e.IsExplore,
      i = e.EventCost;
    t || 0 === i
      ? this.SetActive(!1)
      : ((t = ModelManager_1.ModelManager.MapRogueModel.GameInfo.MoodItemId),
        (i = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "RogueResEventMoodCost_2",
          ),
          e.EventCost.toString(),
        )),
        this.InfoItem.Refresh("RogueResEventMoodCost_1", t, i),
        this.SetActive(!0));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.InfoItem?.GetRootItem())
      ? [e, e]
      : void 0;
  }
}
exports.PopupComponentEventCost = PopupComponentEventCost;
class InfoItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
    ];
  }
  Refresh(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e),
      this.SetItemIcon(this.GetTexture(1), t),
      this.GetText(2).SetText(i);
  }
}
//# sourceMappingURL=PopupComponentEventCost.js.map
