"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCharacterLookAtDataHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCharacterLookAtEmptyData_1 = require("./FbCharacterLookAtEmptyData"),
  FbCharacterLookAtEntityData_1 = require("./FbCharacterLookAtEntityData"),
  FbCharacterLookAtPlayerData_1 = require("./FbCharacterLookAtPlayerData"),
  FbCharacterLookAtPositionData_1 = require("./FbCharacterLookAtPositionData"),
  FbCharacterLookAtUnlockData_1 = require("./FbCharacterLookAtUnlockData");
class UnionCharacterLookAtDataHelper {
  static GetUnionCharacterLookAtDataObject(t) {
    switch (t) {
      case fb_action_1.UnionCharacterLookAtData.CharacterLookAtEmptyData:
        return new fb_action_1.CharacterLookAtEmptyData();
      case fb_action_1.UnionCharacterLookAtData.CharacterLookAtEntityData:
        return new fb_action_1.CharacterLookAtEntityData();
      case fb_action_1.UnionCharacterLookAtData.CharacterLookAtPlayerData:
        return new fb_action_1.CharacterLookAtPlayerData();
      case fb_action_1.UnionCharacterLookAtData.CharacterLookAtPositionData:
        return new fb_action_1.CharacterLookAtPositionData();
      case fb_action_1.UnionCharacterLookAtData.CharacterLookAtUnlockData:
        return new fb_action_1.CharacterLookAtUnlockData();
      default:
        return;
    }
  }
  static ReadUnionCharacterLookAtData(t, a) {
    if (void 0 !== a)
      switch (t) {
        case fb_action_1.UnionCharacterLookAtData.CharacterLookAtEmptyData:
          return FbCharacterLookAtEmptyData_1.FbCharacterLookAtEmptyData.Create(
            a,
          );
        case fb_action_1.UnionCharacterLookAtData.CharacterLookAtEntityData:
          return FbCharacterLookAtEntityData_1.FbCharacterLookAtEntityData.Create(
            a,
          );
        case fb_action_1.UnionCharacterLookAtData.CharacterLookAtPlayerData:
          return FbCharacterLookAtPlayerData_1.FbCharacterLookAtPlayerData.Create(
            a,
          );
        case fb_action_1.UnionCharacterLookAtData.CharacterLookAtPositionData:
          return FbCharacterLookAtPositionData_1.FbCharacterLookAtPositionData.Create(
            a,
          );
        case fb_action_1.UnionCharacterLookAtData.CharacterLookAtUnlockData:
          return FbCharacterLookAtUnlockData_1.FbCharacterLookAtUnlockData.Create(
            a,
          );
        default:
          return;
      }
  }
}
exports.UnionCharacterLookAtDataHelper = UnionCharacterLookAtDataHelper;
//# sourceMappingURL=UnionCharacterLookAtDataHelper.js.map
