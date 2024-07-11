"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatTimeText = void 0);
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatTimeText extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    const i = this.GetText(0);
    var e = TimeUtil_1.TimeUtil.DateFormatString(e);
    i.SetText(e);
  }
}
exports.ChatTimeText = ChatTimeText;
// # sourceMappingURL=ChatTimeText.js.map
