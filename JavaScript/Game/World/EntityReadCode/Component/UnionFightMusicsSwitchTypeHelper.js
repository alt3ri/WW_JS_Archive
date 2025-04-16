"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionFightMusicsSwitchTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFightMusicsSwitchByTagList_1 = require("./FbFightMusicsSwitchByTagList");
class UnionFightMusicsSwitchTypeHelper {
  static GetUnionFightMusicsSwitchTypeObject(t) {
    if (
      t === fb_component_1.UnionFightMusicsSwitchType.FightMusicsSwitchByTagList
    )
      return new fb_component_1.FightMusicsSwitchByTagList();
  }
  static ReadUnionFightMusicsSwitchType(t, i) {
    return void 0 !== i &&
      t === fb_component_1.UnionFightMusicsSwitchType.FightMusicsSwitchByTagList
      ? FbFightMusicsSwitchByTagList_1.FbFightMusicsSwitchByTagList.Create(i)
      : void 0;
  }
}
exports.UnionFightMusicsSwitchTypeHelper = UnionFightMusicsSwitchTypeHelper;
//# sourceMappingURL=UnionFightMusicsSwitchTypeHelper.js.map
