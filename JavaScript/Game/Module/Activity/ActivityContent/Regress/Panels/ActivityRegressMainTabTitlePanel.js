"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressMainTabTitlePanel = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRegressMainTabTitlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OnBackBtnCallBack = void 0),
      (this.B6e = () => {
        this.OnBackBtnCallBack?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.B6e]]);
  }
  UpdateIcon(i) {
    StringUtils_1.StringUtils.IsEmpty(i) ||
      this.SetSpriteByPath(i, this.GetSprite(0), !1);
  }
  UpdateTitle(i) {
    var e = this.GetText(1);
    i
      ? (e.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextId, ...i.Args))
      : e.SetUIActive(!1);
  }
}
exports.ActivityRegressMainTabTitlePanel = ActivityRegressMainTabTitlePanel;
//# sourceMappingURL=ActivityRegressMainTabTitlePanel.js.map
