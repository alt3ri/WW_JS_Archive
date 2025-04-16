"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCheckPlayerCanJoinActivityHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCheckPlayerCanJoinRogue_1 = require("./FbCheckPlayerCanJoinRogue");
class UnionCheckPlayerCanJoinActivityHelper {
  static GetUnionCheckPlayerCanJoinActivityObject(e) {
    if (
      e ===
      fb_condition_1.UnionCheckPlayerCanJoinActivity.CheckPlayerCanJoinRogue
    )
      return new fb_condition_1.CheckPlayerCanJoinRogue();
  }
  static ReadUnionCheckPlayerCanJoinActivity(e, i) {
    return void 0 !== i &&
      e ===
        fb_condition_1.UnionCheckPlayerCanJoinActivity.CheckPlayerCanJoinRogue
      ? FbCheckPlayerCanJoinRogue_1.FbCheckPlayerCanJoinRogue.Create(i)
      : void 0;
  }
}
exports.UnionCheckPlayerCanJoinActivityHelper =
  UnionCheckPlayerCanJoinActivityHelper;
//# sourceMappingURL=UnionCheckPlayerCanJoinActivityHelper.js.map
