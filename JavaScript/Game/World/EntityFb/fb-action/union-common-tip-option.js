"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCommonTipOption =
    exports.unionToUnionCommonTipOption =
    exports.UnionCommonTipOption =
      void 0);
const bad_bu_king_challenge_tip_js_1 = require("../fb-action/bad-bu-king-challenge-tip.js"),
  black_cat_warning_js_1 = require("../fb-action/black-cat-warning.js"),
  common_tip_challenge_condition_js_1 = require("../fb-action/common-tip-challenge-condition.js"),
  common_tip_challenge_fail_js_1 = require("../fb-action/common-tip-challenge-fail.js"),
  common_tip_challenge_success_js_1 = require("../fb-action/common-tip-challenge-success.js"),
  common_tip_enter_in_range_js_1 = require("../fb-action/common-tip-enter-in-range.js"),
  common_tip_first_complete_js_1 = require("../fb-action/common-tip-first-complete.js"),
  common_tip_general_floating_tip_js_1 = require("../fb-action/common-tip-general-floating-tip.js"),
  common_tip_id_js_1 = require("../fb-action/common-tip-id.js"),
  common_tip_mission_complete_js_1 = require("../fb-action/common-tip-mission-complete.js"),
  common_tip_prepare_countdown_js_1 = require("../fb-action/common-tip-prepare-countdown.js"),
  common_tip_reach_challenge_js_1 = require("../fb-action/common-tip-reach-challenge.js"),
  common_tip_trigger_delegation_js_1 = require("../fb-action/common-tip-trigger-delegation.js"),
  dreamless_warning_js_1 = require("../fb-action/dreamless-warning.js"),
  punish_report_js_1 = require("../fb-action/punish-report.js"),
  remain_star_warning_js_1 = require("../fb-action/remain-star-warning.js"),
  slash_and_tower_tip_js_1 = require("../fb-action/slash-and-tower-tip.js"),
  white_cat_warning_js_1 = require("../fb-action/white-cat-warning.js");
var UnionCommonTipOption;
function unionToUnionCommonTipOption(n, e) {
  switch (UnionCommonTipOption[n]) {
    case "NONE":
      return;
    case "BadBuKingChallengeTip":
      return e(new bad_bu_king_challenge_tip_js_1.BadBuKingChallengeTip());
    case "BlackCatWarning":
      return e(new black_cat_warning_js_1.BlackCatWarning());
    case "CommonTipChallengeCondition":
      return e(
        new common_tip_challenge_condition_js_1.CommonTipChallengeCondition(),
      );
    case "CommonTipChallengeFail":
      return e(new common_tip_challenge_fail_js_1.CommonTipChallengeFail());
    case "CommonTipChallengeSuccess":
      return e(
        new common_tip_challenge_success_js_1.CommonTipChallengeSuccess(),
      );
    case "CommonTipEnterInRange":
      return e(new common_tip_enter_in_range_js_1.CommonTipEnterInRange());
    case "CommonTipFirstComplete":
      return e(new common_tip_first_complete_js_1.CommonTipFirstComplete());
    case "CommonTipGeneralFloatingTip":
      return e(
        new common_tip_general_floating_tip_js_1.CommonTipGeneralFloatingTip(),
      );
    case "CommonTipId":
      return e(new common_tip_id_js_1.CommonTipId());
    case "CommonTipMissionComplete":
      return e(new common_tip_mission_complete_js_1.CommonTipMissionComplete());
    case "CommonTipPrepareCountdown":
      return e(
        new common_tip_prepare_countdown_js_1.CommonTipPrepareCountdown(),
      );
    case "CommonTipReachChallenge":
      return e(new common_tip_reach_challenge_js_1.CommonTipReachChallenge());
    case "CommonTipTriggerDelegation":
      return e(
        new common_tip_trigger_delegation_js_1.CommonTipTriggerDelegation(),
      );
    case "DreamlessWarning":
      return e(new dreamless_warning_js_1.DreamlessWarning());
    case "PunishReport":
      return e(new punish_report_js_1.PunishReport());
    case "RemainStarWarning":
      return e(new remain_star_warning_js_1.RemainStarWarning());
    case "SlashAndTowerTip":
      return e(new slash_and_tower_tip_js_1.SlashAndTowerTip());
    case "WhiteCatWarning":
      return e(new white_cat_warning_js_1.WhiteCatWarning());
    default:
      return;
  }
}
function unionListToUnionCommonTipOption(n, e, o) {
  switch (UnionCommonTipOption[n]) {
    case "NONE":
      return;
    case "BadBuKingChallengeTip":
      return e(o, new bad_bu_king_challenge_tip_js_1.BadBuKingChallengeTip());
    case "BlackCatWarning":
      return e(o, new black_cat_warning_js_1.BlackCatWarning());
    case "CommonTipChallengeCondition":
      return e(
        o,
        new common_tip_challenge_condition_js_1.CommonTipChallengeCondition(),
      );
    case "CommonTipChallengeFail":
      return e(o, new common_tip_challenge_fail_js_1.CommonTipChallengeFail());
    case "CommonTipChallengeSuccess":
      return e(
        o,
        new common_tip_challenge_success_js_1.CommonTipChallengeSuccess(),
      );
    case "CommonTipEnterInRange":
      return e(o, new common_tip_enter_in_range_js_1.CommonTipEnterInRange());
    case "CommonTipFirstComplete":
      return e(o, new common_tip_first_complete_js_1.CommonTipFirstComplete());
    case "CommonTipGeneralFloatingTip":
      return e(
        o,
        new common_tip_general_floating_tip_js_1.CommonTipGeneralFloatingTip(),
      );
    case "CommonTipId":
      return e(o, new common_tip_id_js_1.CommonTipId());
    case "CommonTipMissionComplete":
      return e(
        o,
        new common_tip_mission_complete_js_1.CommonTipMissionComplete(),
      );
    case "CommonTipPrepareCountdown":
      return e(
        o,
        new common_tip_prepare_countdown_js_1.CommonTipPrepareCountdown(),
      );
    case "CommonTipReachChallenge":
      return e(
        o,
        new common_tip_reach_challenge_js_1.CommonTipReachChallenge(),
      );
    case "CommonTipTriggerDelegation":
      return e(
        o,
        new common_tip_trigger_delegation_js_1.CommonTipTriggerDelegation(),
      );
    case "DreamlessWarning":
      return e(o, new dreamless_warning_js_1.DreamlessWarning());
    case "PunishReport":
      return e(o, new punish_report_js_1.PunishReport());
    case "RemainStarWarning":
      return e(o, new remain_star_warning_js_1.RemainStarWarning());
    case "SlashAndTowerTip":
      return e(o, new slash_and_tower_tip_js_1.SlashAndTowerTip());
    case "WhiteCatWarning":
      return e(o, new white_cat_warning_js_1.WhiteCatWarning());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.BadBuKingChallengeTip = 1)] = "BadBuKingChallengeTip"),
    (n[(n.BlackCatWarning = 2)] = "BlackCatWarning"),
    (n[(n.CommonTipChallengeCondition = 3)] = "CommonTipChallengeCondition"),
    (n[(n.CommonTipChallengeFail = 4)] = "CommonTipChallengeFail"),
    (n[(n.CommonTipChallengeSuccess = 5)] = "CommonTipChallengeSuccess"),
    (n[(n.CommonTipEnterInRange = 6)] = "CommonTipEnterInRange"),
    (n[(n.CommonTipFirstComplete = 7)] = "CommonTipFirstComplete"),
    (n[(n.CommonTipGeneralFloatingTip = 8)] = "CommonTipGeneralFloatingTip"),
    (n[(n.CommonTipId = 9)] = "CommonTipId"),
    (n[(n.CommonTipMissionComplete = 10)] = "CommonTipMissionComplete"),
    (n[(n.CommonTipPrepareCountdown = 11)] = "CommonTipPrepareCountdown"),
    (n[(n.CommonTipReachChallenge = 12)] = "CommonTipReachChallenge"),
    (n[(n.CommonTipTriggerDelegation = 13)] = "CommonTipTriggerDelegation"),
    (n[(n.DreamlessWarning = 14)] = "DreamlessWarning"),
    (n[(n.PunishReport = 15)] = "PunishReport"),
    (n[(n.RemainStarWarning = 16)] = "RemainStarWarning"),
    (n[(n.SlashAndTowerTip = 17)] = "SlashAndTowerTip"),
    (n[(n.WhiteCatWarning = 18)] = "WhiteCatWarning");
})(
  (UnionCommonTipOption =
    exports.UnionCommonTipOption || (exports.UnionCommonTipOption = {})),
),
  (exports.unionToUnionCommonTipOption = unionToUnionCommonTipOption),
  (exports.unionListToUnionCommonTipOption = unionListToUnionCommonTipOption);
//# sourceMappingURL=union-common-tip-option.js.map
