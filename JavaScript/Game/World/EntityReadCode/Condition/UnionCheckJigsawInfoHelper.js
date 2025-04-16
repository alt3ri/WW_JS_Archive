"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCheckJigsawInfoHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCheckJigsawItemMove_1 = require("./FbCheckJigsawItemMove"),
  FbCheckJigsawItemPlaceIndex_1 = require("./FbCheckJigsawItemPlaceIndex");
class UnionCheckJigsawInfoHelper {
  static GetUnionCheckJigsawInfoObject(e) {
    switch (e) {
      case fb_condition_1.UnionCheckJigsawInfo.CheckJigsawItemMove:
        return new fb_condition_1.CheckJigsawItemMove();
      case fb_condition_1.UnionCheckJigsawInfo.CheckJigsawItemPlaceIndex:
        return new fb_condition_1.CheckJigsawItemPlaceIndex();
      default:
        return;
    }
  }
  static ReadUnionCheckJigsawInfo(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_condition_1.UnionCheckJigsawInfo.CheckJigsawItemMove:
          return FbCheckJigsawItemMove_1.FbCheckJigsawItemMove.Create(i);
        case fb_condition_1.UnionCheckJigsawInfo.CheckJigsawItemPlaceIndex:
          return FbCheckJigsawItemPlaceIndex_1.FbCheckJigsawItemPlaceIndex.Create(
            i,
          );
        default:
          return;
      }
  }
}
exports.UnionCheckJigsawInfoHelper = UnionCheckJigsawInfoHelper;
//# sourceMappingURL=UnionCheckJigsawInfoHelper.js.map
