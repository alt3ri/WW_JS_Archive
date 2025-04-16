"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionStateOption =
    exports.unionToUnionStateOption =
    exports.UnionStateOption =
      void 0);
const notify_monster_perception_js_1 = require("../fb-action/notify-monster-perception.js"),
  notify_monster_play_standby_tags_js_1 = require("../fb-action/notify-monster-play-standby-tags.js"),
  set_battle_tag_js_1 = require("../fb-action/set-battle-tag.js");
var UnionStateOption;
function unionToUnionStateOption(t, e) {
  switch (UnionStateOption[t]) {
    case "NONE":
      return;
    case "NotifyMonsterPerception":
      return e(new notify_monster_perception_js_1.NotifyMonsterPerception());
    case "NotifyMonsterPlayStandbyTags":
      return e(
        new notify_monster_play_standby_tags_js_1.NotifyMonsterPlayStandbyTags(),
      );
    case "SetBattleTag":
      return e(new set_battle_tag_js_1.SetBattleTag());
    default:
      return;
  }
}
function unionListToUnionStateOption(t, e, n) {
  switch (UnionStateOption[t]) {
    case "NONE":
      return;
    case "NotifyMonsterPerception":
      return e(n, new notify_monster_perception_js_1.NotifyMonsterPerception());
    case "NotifyMonsterPlayStandbyTags":
      return e(
        n,
        new notify_monster_play_standby_tags_js_1.NotifyMonsterPlayStandbyTags(),
      );
    case "SetBattleTag":
      return e(n, new set_battle_tag_js_1.SetBattleTag());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.NotifyMonsterPerception = 1)] = "NotifyMonsterPerception"),
    (t[(t.NotifyMonsterPlayStandbyTags = 2)] = "NotifyMonsterPlayStandbyTags"),
    (t[(t.SetBattleTag = 3)] = "SetBattleTag");
})(
  (UnionStateOption =
    exports.UnionStateOption || (exports.UnionStateOption = {})),
),
  (exports.unionToUnionStateOption = unionToUnionStateOption),
  (exports.unionListToUnionStateOption = unionListToUnionStateOption);
//# sourceMappingURL=union-state-option.js.map
