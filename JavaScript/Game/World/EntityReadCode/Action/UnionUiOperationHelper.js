"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionUiOperationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableUiOperation_1 = require("./FbDisableUiOperation"),
  FbEnableSectionalUi_1 = require("./FbEnableSectionalUi"),
  FbEnableUiOperation_1 = require("./FbEnableUiOperation");
class UnionUiOperationHelper {
  static GetUnionUiOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionUiOperation.DisableUiOperation:
        return new fb_action_1.DisableUiOperation();
      case fb_action_1.UnionUiOperation.EnableSectionalUi:
        return new fb_action_1.EnableSectionalUi();
      case fb_action_1.UnionUiOperation.EnableUiOperation:
        return new fb_action_1.EnableUiOperation();
      default:
        return;
    }
  }
  static ReadUnionUiOperation(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_action_1.UnionUiOperation.DisableUiOperation:
          return FbDisableUiOperation_1.FbDisableUiOperation.Create(i);
        case fb_action_1.UnionUiOperation.EnableSectionalUi:
          return FbEnableSectionalUi_1.FbEnableSectionalUi.Create(i);
        case fb_action_1.UnionUiOperation.EnableUiOperation:
          return FbEnableUiOperation_1.FbEnableUiOperation.Create(i);
        default:
          return;
      }
  }
}
exports.UnionUiOperationHelper = UnionUiOperationHelper;
//# sourceMappingURL=UnionUiOperationHelper.js.map
