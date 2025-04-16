"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAudioControlTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbGramophoneAudioControl_1 = require("./FbGramophoneAudioControl");
class UnionAudioControlTypeHelper {
  static GetUnionAudioControlTypeObject(o) {
    if (o === fb_component_1.UnionAudioControlType.GramophoneAudioControl)
      return new fb_component_1.GramophoneAudioControl();
  }
  static ReadUnionAudioControlType(o, e) {
    return void 0 !== e &&
      o === fb_component_1.UnionAudioControlType.GramophoneAudioControl
      ? FbGramophoneAudioControl_1.FbGramophoneAudioControl.Create(e)
      : void 0;
  }
}
exports.UnionAudioControlTypeHelper = UnionAudioControlTypeHelper;
//# sourceMappingURL=UnionAudioControlTypeHelper.js.map
