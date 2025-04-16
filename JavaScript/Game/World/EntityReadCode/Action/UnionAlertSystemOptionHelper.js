"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAlertSystemOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbEnableAlertArea_1 = require("./FbEnableAlertArea"),
  FbEnableAlertUi_1 = require("./FbEnableAlertUi"),
  FbModifyAlertValue_1 = require("./FbModifyAlertValue"),
  FbSetAlertUiVisible_1 = require("./FbSetAlertUiVisible");
class UnionAlertSystemOptionHelper {
  static GetUnionAlertSystemOptionObject(e) {
    switch (e) {
      case fb_action_1.UnionAlertSystemOption.EnableAlertArea:
        return new fb_action_1.EnableAlertArea();
      case fb_action_1.UnionAlertSystemOption.EnableAlertUi:
        return new fb_action_1.EnableAlertUi();
      case fb_action_1.UnionAlertSystemOption.ModifyAlertValue:
        return new fb_action_1.ModifyAlertValue();
      case fb_action_1.UnionAlertSystemOption.SetAlertUiVisible:
        return new fb_action_1.SetAlertUiVisible();
      default:
        return;
    }
  }
  static ReadUnionAlertSystemOption(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionAlertSystemOption.EnableAlertArea:
          return FbEnableAlertArea_1.FbEnableAlertArea.Create(t);
        case fb_action_1.UnionAlertSystemOption.EnableAlertUi:
          return FbEnableAlertUi_1.FbEnableAlertUi.Create(t);
        case fb_action_1.UnionAlertSystemOption.ModifyAlertValue:
          return FbModifyAlertValue_1.FbModifyAlertValue.Create(t);
        case fb_action_1.UnionAlertSystemOption.SetAlertUiVisible:
          return FbSetAlertUiVisible_1.FbSetAlertUiVisible.Create(t);
        default:
          return;
      }
  }
}
exports.UnionAlertSystemOptionHelper = UnionAlertSystemOptionHelper;
//# sourceMappingURL=UnionAlertSystemOptionHelper.js.map
