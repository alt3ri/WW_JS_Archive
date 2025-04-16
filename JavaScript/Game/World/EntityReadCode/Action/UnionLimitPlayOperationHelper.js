"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionLimitPlayOperationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbLimitPlayerAction_1 = require("./FbLimitPlayerAction"),
  FbLimitPlayerBlockAll_1 = require("./FbLimitPlayerBlockAll"),
  FbLimitPlayerCamera_1 = require("./FbLimitPlayerCamera"),
  FbLimitPlayerMouse_1 = require("./FbLimitPlayerMouse"),
  FbLimitPlayerMove_1 = require("./FbLimitPlayerMove"),
  FbLimitPlayerMoveNew_1 = require("./FbLimitPlayerMoveNew"),
  FbLimitPlayerUI_1 = require("./FbLimitPlayerUI");
class UnionLimitPlayOperationHelper {
  static GetUnionLimitPlayOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerAction:
        return new fb_action_1.LimitPlayerAction();
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerBlockAll:
        return new fb_action_1.LimitPlayerBlockAll();
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerCamera:
        return new fb_action_1.LimitPlayerCamera();
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerMouse:
        return new fb_action_1.LimitPlayerMouse();
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerMove:
        return new fb_action_1.LimitPlayerMove();
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerMoveNew:
        return new fb_action_1.LimitPlayerMoveNew();
      case fb_action_1.UnionLimitPlayOperation.LimitPlayerUI:
        return new fb_action_1.LimitPlayerUI();
      default:
        return;
    }
  }
  static ReadUnionLimitPlayOperation(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerAction:
          return FbLimitPlayerAction_1.FbLimitPlayerAction.Create(i);
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerBlockAll:
          return FbLimitPlayerBlockAll_1.FbLimitPlayerBlockAll.Create(i);
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerCamera:
          return FbLimitPlayerCamera_1.FbLimitPlayerCamera.Create(i);
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerMouse:
          return FbLimitPlayerMouse_1.FbLimitPlayerMouse.Create(i);
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerMove:
          return FbLimitPlayerMove_1.FbLimitPlayerMove.Create(i);
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerMoveNew:
          return FbLimitPlayerMoveNew_1.FbLimitPlayerMoveNew.Create(i);
        case fb_action_1.UnionLimitPlayOperation.LimitPlayerUI:
          return FbLimitPlayerUI_1.FbLimitPlayerUI.Create(i);
        default:
          return;
      }
  }
}
exports.UnionLimitPlayOperationHelper = UnionLimitPlayOperationHelper;
//# sourceMappingURL=UnionLimitPlayOperationHelper.js.map
