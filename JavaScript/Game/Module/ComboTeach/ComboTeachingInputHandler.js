"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComboTeachingInputHandler = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../Input/InputEnums"),
  InputFilter_1 = require("../../Input/InputFilter");
class ComboTeachingInputHandler {
  constructor() {
    this.InputFilter = void 0;
  }
  GetPriority() {
    return 1;
  }
  GetInputFilter() {
    return (
      this.InputFilter ||
        (this.InputFilter = new InputFilter_1.InputFilter(
          [
            InputEnums_1.EInputAction.攻击,
            InputEnums_1.EInputAction.大招,
            InputEnums_1.EInputAction.跳跃,
            InputEnums_1.EInputAction.闪避,
            InputEnums_1.EInputAction.技能1,
            InputEnums_1.EInputAction.瞄准,
          ],
          void 0,
          void 0,
          void 0,
        )),
      this.InputFilter
    );
  }
  HandlePressEvent(e, n) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ComboTeachingPress,
      e,
      n,
    );
  }
  HandleReleaseEvent(e, n) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ComboTeachingRelease,
      e,
      n,
    );
  }
  HandleHoldEvent(e, n) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ComboTeachingHold,
      e,
      n,
    );
  }
  HandleInputAxis(e, n) {}
  ClearInputAxis(e) {}
  PreProcessInput(e, n) {}
  PostProcessInput(e, n) {}
}
exports.ComboTeachingInputHandler = ComboTeachingInputHandler;
//# sourceMappingURL=ComboTeachingInputHandler.js.map
