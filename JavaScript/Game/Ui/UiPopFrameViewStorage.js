"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPopFrameViewStorage = void 0);
class UiPopFrameViewStorage {
  static RegisterUiBehaviourPop(e, o) {
    UiPopFrameViewStorage.nCr.set(e, o);
  }
  static GetUiBehaviourPopInfo(e) {
    return UiPopFrameViewStorage.nCr.get(e);
  }
}
(exports.UiPopFrameViewStorage = UiPopFrameViewStorage).nCr = new Map();
//# sourceMappingURL=UiPopFrameViewStorage.js.map
