"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionHighlightExploreSkillIcon =
    exports.unionToUnionHighlightExploreSkillIcon =
    exports.UnionHighlightExploreSkillIcon =
      void 0);
const hide_highlight_explore_skill_icon_js_1 = require("../fb-action/hide-highlight-explore-skill-icon.js"),
  show_highlight_explore_skill_icon_js_1 = require("../fb-action/show-highlight-explore-skill-icon.js");
var UnionHighlightExploreSkillIcon;
function unionToUnionHighlightExploreSkillIcon(i, l) {
  switch (UnionHighlightExploreSkillIcon[i]) {
    case "NONE":
      return;
    case "HideHighlightExploreSkillIcon":
      return l(
        new hide_highlight_explore_skill_icon_js_1.HideHighlightExploreSkillIcon(),
      );
    case "ShowHighlightExploreSkillIcon":
      return l(
        new show_highlight_explore_skill_icon_js_1.ShowHighlightExploreSkillIcon(),
      );
    default:
      return;
  }
}
function unionListToUnionHighlightExploreSkillIcon(i, l, o) {
  switch (UnionHighlightExploreSkillIcon[i]) {
    case "NONE":
      return;
    case "HideHighlightExploreSkillIcon":
      return l(
        o,
        new hide_highlight_explore_skill_icon_js_1.HideHighlightExploreSkillIcon(),
      );
    case "ShowHighlightExploreSkillIcon":
      return l(
        o,
        new show_highlight_explore_skill_icon_js_1.ShowHighlightExploreSkillIcon(),
      );
    default:
      return;
  }
}
!(function (i) {
  (i[(i.NONE = 0)] = "NONE"),
    (i[(i.HideHighlightExploreSkillIcon = 1)] =
      "HideHighlightExploreSkillIcon"),
    (i[(i.ShowHighlightExploreSkillIcon = 2)] =
      "ShowHighlightExploreSkillIcon");
})(
  (UnionHighlightExploreSkillIcon =
    exports.UnionHighlightExploreSkillIcon ||
    (exports.UnionHighlightExploreSkillIcon = {})),
),
  (exports.unionToUnionHighlightExploreSkillIcon =
    unionToUnionHighlightExploreSkillIcon),
  (exports.unionListToUnionHighlightExploreSkillIcon =
    unionListToUnionHighlightExploreSkillIcon);
//# sourceMappingURL=union-highlight-explore-skill-icon.js.map
