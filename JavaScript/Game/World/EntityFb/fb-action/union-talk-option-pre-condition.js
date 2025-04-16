"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTalkOptionPreCondition =
    exports.unionToUnionTalkOptionPreCondition =
    exports.UnionTalkOptionPreCondition =
      void 0);
const talk_option_condition_js_1 = require("../fb-action/talk-option-condition.js"),
  talk_option_pre_option_js_1 = require("../fb-action/talk-option-pre-option.js");
var UnionTalkOptionPreCondition;
function unionToUnionTalkOptionPreCondition(n, o) {
  switch (UnionTalkOptionPreCondition[n]) {
    case "NONE":
      return;
    case "TalkOptionCondition":
      return o(new talk_option_condition_js_1.TalkOptionCondition());
    case "TalkOptionPreOption":
      return o(new talk_option_pre_option_js_1.TalkOptionPreOption());
    default:
      return;
  }
}
function unionListToUnionTalkOptionPreCondition(n, o, i) {
  switch (UnionTalkOptionPreCondition[n]) {
    case "NONE":
      return;
    case "TalkOptionCondition":
      return o(i, new talk_option_condition_js_1.TalkOptionCondition());
    case "TalkOptionPreOption":
      return o(i, new talk_option_pre_option_js_1.TalkOptionPreOption());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.TalkOptionCondition = 1)] = "TalkOptionCondition"),
    (n[(n.TalkOptionPreOption = 2)] = "TalkOptionPreOption");
})(
  (UnionTalkOptionPreCondition =
    exports.UnionTalkOptionPreCondition ||
    (exports.UnionTalkOptionPreCondition = {})),
),
  (exports.unionToUnionTalkOptionPreCondition =
    unionToUnionTalkOptionPreCondition),
  (exports.unionListToUnionTalkOptionPreCondition =
    unionListToUnionTalkOptionPreCondition);
//# sourceMappingURL=union-talk-option-pre-condition.js.map
