"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInstanceEntranceMonsterTipsItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityInstanceEntranceMonsterTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.Gli = () => {
        var e = this.$8i
            .GetActivityEntranceSelectItemData()
            .GetCurrentSelectData()
            .GetSelectDataIndex(),
          s = this.$8i
            .GetActivityEntranceMonsterPreviewData()
            .GetPreviewCallBack();
        s && s(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.Gli]]);
  }
  RefreshView(e) {
    this.$8i = e;
    var e = this.$8i
        .GetActivityEntranceSelectItemData()
        .GetCurrentSelectData()
        .GetSelectDataIndex(),
      s = this.$8i.GetActivityEntranceMonsterPreviewData(),
      t = s.GetMonsterTips(e),
      s = s.GetMonsterPreviewState(e);
    this.GetText(0)?.SetText(t), this.GetButton(1)?.RootUIComp.SetUIActive(s);
  }
}
exports.ActivityInstanceEntranceMonsterTipsItem =
  ActivityInstanceEntranceMonsterTipsItem;
//# sourceMappingURL=ActivityInstanceEntranceMonsterTipsItem.js.map
