"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionInteractPlayerDiractionOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbInteractPlayerDiractionToLeisure_1 = require("./FbInteractPlayerDiractionToLeisure"),
  FbInteractPlayerDiractionToNpc_1 = require("./FbInteractPlayerDiractionToNpc");
class UnionInteractPlayerDiractionOptionHelper {
  static GetUnionInteractPlayerDiractionOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionInteractPlayerDiractionOption
        .InteractPlayerDiractionToLeisure:
        return new fb_component_1.InteractPlayerDiractionToLeisure();
      case fb_component_1.UnionInteractPlayerDiractionOption
        .InteractPlayerDiractionToNpc:
        return new fb_component_1.InteractPlayerDiractionToNpc();
      default:
        return;
    }
  }
  static ReadUnionInteractPlayerDiractionOption(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionInteractPlayerDiractionOption
          .InteractPlayerDiractionToLeisure:
          return FbInteractPlayerDiractionToLeisure_1.FbInteractPlayerDiractionToLeisure.Create(
            t,
          );
        case fb_component_1.UnionInteractPlayerDiractionOption
          .InteractPlayerDiractionToNpc:
          return FbInteractPlayerDiractionToNpc_1.FbInteractPlayerDiractionToNpc.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionInteractPlayerDiractionOptionHelper =
  UnionInteractPlayerDiractionOptionHelper;
//# sourceMappingURL=UnionInteractPlayerDiractionOptionHelper.js.map
