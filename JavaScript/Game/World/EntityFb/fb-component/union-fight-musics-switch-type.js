"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionFightMusicsSwitchType =
    exports.unionToUnionFightMusicsSwitchType =
    exports.UnionFightMusicsSwitchType =
      void 0);
const fight_musics_switch_by_tag_list_js_1 = require("../fb-component/fight-musics-switch-by-tag-list.js");
var UnionFightMusicsSwitchType;
function unionToUnionFightMusicsSwitchType(i, t) {
  switch (UnionFightMusicsSwitchType[i]) {
    case "NONE":
      return;
    case "FightMusicsSwitchByTagList":
      return t(
        new fight_musics_switch_by_tag_list_js_1.FightMusicsSwitchByTagList(),
      );
    default:
      return;
  }
}
function unionListToUnionFightMusicsSwitchType(i, t, s) {
  switch (UnionFightMusicsSwitchType[i]) {
    case "NONE":
      return;
    case "FightMusicsSwitchByTagList":
      return t(
        s,
        new fight_musics_switch_by_tag_list_js_1.FightMusicsSwitchByTagList(),
      );
    default:
      return;
  }
}
!(function (i) {
  (i[(i.NONE = 0)] = "NONE"),
    (i[(i.FightMusicsSwitchByTagList = 1)] = "FightMusicsSwitchByTagList");
})(
  (UnionFightMusicsSwitchType =
    exports.UnionFightMusicsSwitchType ||
    (exports.UnionFightMusicsSwitchType = {})),
),
  (exports.unionToUnionFightMusicsSwitchType =
    unionToUnionFightMusicsSwitchType),
  (exports.unionListToUnionFightMusicsSwitchType =
    unionListToUnionFightMusicsSwitchType);
//# sourceMappingURL=union-fight-musics-switch-type.js.map
