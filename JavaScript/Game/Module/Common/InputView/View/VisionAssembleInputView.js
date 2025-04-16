"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionAssembleInputView = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine"),
  CommonInputViewBase_1 = require("./CommonInputViewBase");
class VisionAssembleInputView extends CommonInputViewBase_1.CommonInputViewBase {
  OnAddEventListener() {
    super.OnAddEventListener();
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
  }
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_VISION_NAME_LENGTH;
  }
  InitExtraParam() {
    this.Hqe();
  }
  RefreshDuplicateName(e) {
    this.Hqe();
  }
  IsAllowMultiLine() {
    return !1;
  }
  Hqe() {
    var e = this.InputText.Text !== this.InputData.InputText,
      i =
        StringUtils_1.StringUtils.GetStringRealCount(this.InputText.Text) >
        this.GetMaxLimit();
    this.ConfirmButton.SetSelfInteractive(e && !i);
  }
}
exports.VisionAssembleInputView = VisionAssembleInputView;
//# sourceMappingURL=VisionAssembleInputView.js.map
