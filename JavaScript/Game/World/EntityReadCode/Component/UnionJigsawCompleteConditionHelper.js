"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionJigsawCompleteConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActivateAllCorrectPiece_1 = require("./FbActivateAllCorrectPiece"),
  FbActivateSpecifiedPiece_1 = require("./FbActivateSpecifiedPiece"),
  FbActiveRenjuPiece_1 = require("./FbActiveRenjuPiece"),
  FbPutInTheSpecifiedPiece_1 = require("./FbPutInTheSpecifiedPiece");
class UnionJigsawCompleteConditionHelper {
  static GetUnionJigsawCompleteConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionJigsawCompleteCondition.ActivateAllCorrectPiece:
        return new fb_component_1.ActivateAllCorrectPiece();
      case fb_component_1.UnionJigsawCompleteCondition.ActivateSpecifiedPiece:
        return new fb_component_1.ActivateSpecifiedPiece();
      case fb_component_1.UnionJigsawCompleteCondition.ActiveRenjuPiece:
        return new fb_component_1.ActiveRenjuPiece();
      case fb_component_1.UnionJigsawCompleteCondition.PutInTheSpecifiedPiece:
        return new fb_component_1.PutInTheSpecifiedPiece();
      default:
        return;
    }
  }
  static ReadUnionJigsawCompleteCondition(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionJigsawCompleteCondition
          .ActivateAllCorrectPiece:
          return FbActivateAllCorrectPiece_1.FbActivateAllCorrectPiece.Create(
            t,
          );
        case fb_component_1.UnionJigsawCompleteCondition.ActivateSpecifiedPiece:
          return FbActivateSpecifiedPiece_1.FbActivateSpecifiedPiece.Create(t);
        case fb_component_1.UnionJigsawCompleteCondition.ActiveRenjuPiece:
          return FbActiveRenjuPiece_1.FbActiveRenjuPiece.Create(t);
        case fb_component_1.UnionJigsawCompleteCondition.PutInTheSpecifiedPiece:
          return FbPutInTheSpecifiedPiece_1.FbPutInTheSpecifiedPiece.Create(t);
        default:
          return;
      }
  }
}
exports.UnionJigsawCompleteConditionHelper = UnionJigsawCompleteConditionHelper;
//# sourceMappingURL=UnionJigsawCompleteConditionHelper.js.map
