"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCalabashAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiCalabashAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
  constructor(s, t) {
    super(), (this.Socket = s), (this.IsRotate = t);
  }
  IsEqual(s) {
    return (
      s instanceof UiCalabashAnsContext && this.Socket.op_Equality(s.Socket)
    );
  }
}
exports.UiCalabashAnsContext = UiCalabashAnsContext;
// # sourceMappingURL=UiCalabashAnsContext.js.map
