"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTalkOptionParam =
    exports.unionToUnionTalkOptionParam =
    exports.UnionTalkOptionParam =
      void 0);
const talk_option_qte_failed_js_1 = require("../fb-action/talk-option-qte-failed.js"),
  talk_option_qte_failed_delay_exec_js_1 = require("../fb-action/talk-option-qte-failed-delay-exec.js"),
  talk_option_qte_succeed_js_1 = require("../fb-action/talk-option-qte-succeed.js"),
  talk_option_qte_succeed_delay_exec_js_1 = require("../fb-action/talk-option-qte-succeed-delay-exec.js"),
  talk_option_rogue_random_event_js_1 = require("../fb-action/talk-option-rogue-random-event.js");
var UnionTalkOptionParam;
function unionToUnionTalkOptionParam(e, t) {
  switch (UnionTalkOptionParam[e]) {
    case "NONE":
      return;
    case "TalkOptionQteFailed":
      return t(new talk_option_qte_failed_js_1.TalkOptionQteFailed());
    case "TalkOptionQteFailedDelayExec":
      return t(
        new talk_option_qte_failed_delay_exec_js_1.TalkOptionQteFailedDelayExec(),
      );
    case "TalkOptionQteSucceed":
      return t(new talk_option_qte_succeed_js_1.TalkOptionQteSucceed());
    case "TalkOptionQteSucceedDelayExec":
      return t(
        new talk_option_qte_succeed_delay_exec_js_1.TalkOptionQteSucceedDelayExec(),
      );
    case "TalkOptionRogueRandomEvent":
      return t(
        new talk_option_rogue_random_event_js_1.TalkOptionRogueRandomEvent(),
      );
    default:
      return;
  }
}
function unionListToUnionTalkOptionParam(e, t, n) {
  switch (UnionTalkOptionParam[e]) {
    case "NONE":
      return;
    case "TalkOptionQteFailed":
      return t(n, new talk_option_qte_failed_js_1.TalkOptionQteFailed());
    case "TalkOptionQteFailedDelayExec":
      return t(
        n,
        new talk_option_qte_failed_delay_exec_js_1.TalkOptionQteFailedDelayExec(),
      );
    case "TalkOptionQteSucceed":
      return t(n, new talk_option_qte_succeed_js_1.TalkOptionQteSucceed());
    case "TalkOptionQteSucceedDelayExec":
      return t(
        n,
        new talk_option_qte_succeed_delay_exec_js_1.TalkOptionQteSucceedDelayExec(),
      );
    case "TalkOptionRogueRandomEvent":
      return t(
        n,
        new talk_option_rogue_random_event_js_1.TalkOptionRogueRandomEvent(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.TalkOptionQteFailed = 1)] = "TalkOptionQteFailed"),
    (e[(e.TalkOptionQteFailedDelayExec = 2)] = "TalkOptionQteFailedDelayExec"),
    (e[(e.TalkOptionQteSucceed = 3)] = "TalkOptionQteSucceed"),
    (e[(e.TalkOptionQteSucceedDelayExec = 4)] =
      "TalkOptionQteSucceedDelayExec"),
    (e[(e.TalkOptionRogueRandomEvent = 5)] = "TalkOptionRogueRandomEvent");
})(
  (UnionTalkOptionParam =
    exports.UnionTalkOptionParam || (exports.UnionTalkOptionParam = {})),
),
  (exports.unionToUnionTalkOptionParam = unionToUnionTalkOptionParam),
  (exports.unionListToUnionTalkOptionParam = unionListToUnionTalkOptionParam);
//# sourceMappingURL=union-talk-option-param.js.map
