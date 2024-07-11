"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatContentBase = void 0);
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatContentBase extends UiPanelBase_1.UiPanelBase {
  constructor(e, s, t, a) {
    super(),
      (this.ChatContentData = t),
      (this.aSt = a),
      this.CreateThenShowByResourceIdAsync(e, s, !0).then(
        () => {
          this.aSt && this.aSt(this);
        },
        () => {},
      );
  }
}
exports.ChatContentBase = ChatContentBase;
//# sourceMappingURL=ChatContentBase.js.map
