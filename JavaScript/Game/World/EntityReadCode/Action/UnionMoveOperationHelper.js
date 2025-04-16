"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMoveOperationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableMoveOperation_1 = require("./FbDisableMoveOperation"),
  FbEnableMoveOperation_1 = require("./FbEnableMoveOperation");
class UnionMoveOperationHelper {
  static GetUnionMoveOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionMoveOperation.DisableMoveOperation:
        return new fb_action_1.DisableMoveOperation();
      case fb_action_1.UnionMoveOperation.EnableMoveOperation:
        return new fb_action_1.EnableMoveOperation();
      default:
        return;
    }
  }
  static ReadUnionMoveOperation(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionMoveOperation.DisableMoveOperation:
          return FbDisableMoveOperation_1.FbDisableMoveOperation.Create(t);
        case fb_action_1.UnionMoveOperation.EnableMoveOperation:
          return FbEnableMoveOperation_1.FbEnableMoveOperation.Create(t);
        default:
          return;
      }
  }
}
exports.UnionMoveOperationHelper = UnionMoveOperationHelper;
//# sourceMappingURL=UnionMoveOperationHelper.js.map
