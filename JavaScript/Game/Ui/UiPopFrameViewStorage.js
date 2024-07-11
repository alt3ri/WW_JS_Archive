"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPopFrameViewStorage = void 0);
class UiPopFrameViewStorage {
  static RegisterUiBehaviourPop(e, o) {
    UiPopFrameViewStorage.igr.set(e, o);
  }
  static GetUiBehaviourPopInfo(e) {
    return UiPopFrameViewStorage.igr.get(e);
  }
}
(exports.UiPopFrameViewStorage = UiPopFrameViewStorage).igr = new Map();
//# sourceMappingURL=UiPopFrameViewStorage.js.map
