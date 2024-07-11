"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonMultiInputView = void 0);
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine"),
  CommonInputViewBase_1 = require("./CommonInputViewBase");
class CommonMultiInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_MULTI_LENGTH;
  }
  IsAllowMultiLine() {
    return !0;
  }
}
exports.CommonMultiInputView = CommonMultiInputView;
//# sourceMappingURL=CommonMultiInputView.js.map
