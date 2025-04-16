"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCommonTipOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbBadBuKingChallengeTip_1 = require("./FbBadBuKingChallengeTip"),
  FbBlackCatWarning_1 = require("./FbBlackCatWarning"),
  FbCommonTipChallengeCondition_1 = require("./FbCommonTipChallengeCondition"),
  FbCommonTipChallengeFail_1 = require("./FbCommonTipChallengeFail"),
  FbCommonTipChallengeSuccess_1 = require("./FbCommonTipChallengeSuccess"),
  FbCommonTipEnterInRange_1 = require("./FbCommonTipEnterInRange"),
  FbCommonTipFirstComplete_1 = require("./FbCommonTipFirstComplete"),
  FbCommonTipGeneralFloatingTip_1 = require("./FbCommonTipGeneralFloatingTip"),
  FbCommonTipId_1 = require("./FbCommonTipId"),
  FbCommonTipMissionComplete_1 = require("./FbCommonTipMissionComplete"),
  FbCommonTipPrepareCountdown_1 = require("./FbCommonTipPrepareCountdown"),
  FbCommonTipReachChallenge_1 = require("./FbCommonTipReachChallenge"),
  FbCommonTipTriggerDelegation_1 = require("./FbCommonTipTriggerDelegation"),
  FbDreamlessWarning_1 = require("./FbDreamlessWarning"),
  FbPunishReport_1 = require("./FbPunishReport"),
  FbRemainStarWarning_1 = require("./FbRemainStarWarning"),
  FbSlashAndTowerTip_1 = require("./FbSlashAndTowerTip"),
  FbWhiteCatWarning_1 = require("./FbWhiteCatWarning");
class UnionCommonTipOptionHelper {
  static GetUnionCommonTipOptionObject(n) {
    switch (n) {
      case fb_action_1.UnionCommonTipOption.BadBuKingChallengeTip:
        return new fb_action_1.BadBuKingChallengeTip();
      case fb_action_1.UnionCommonTipOption.BlackCatWarning:
        return new fb_action_1.BlackCatWarning();
      case fb_action_1.UnionCommonTipOption.CommonTipChallengeCondition:
        return new fb_action_1.CommonTipChallengeCondition();
      case fb_action_1.UnionCommonTipOption.CommonTipChallengeFail:
        return new fb_action_1.CommonTipChallengeFail();
      case fb_action_1.UnionCommonTipOption.CommonTipChallengeSuccess:
        return new fb_action_1.CommonTipChallengeSuccess();
      case fb_action_1.UnionCommonTipOption.CommonTipEnterInRange:
        return new fb_action_1.CommonTipEnterInRange();
      case fb_action_1.UnionCommonTipOption.CommonTipFirstComplete:
        return new fb_action_1.CommonTipFirstComplete();
      case fb_action_1.UnionCommonTipOption.CommonTipGeneralFloatingTip:
        return new fb_action_1.CommonTipGeneralFloatingTip();
      case fb_action_1.UnionCommonTipOption.CommonTipId:
        return new fb_action_1.CommonTipId();
      case fb_action_1.UnionCommonTipOption.CommonTipMissionComplete:
        return new fb_action_1.CommonTipMissionComplete();
      case fb_action_1.UnionCommonTipOption.CommonTipPrepareCountdown:
        return new fb_action_1.CommonTipPrepareCountdown();
      case fb_action_1.UnionCommonTipOption.CommonTipReachChallenge:
        return new fb_action_1.CommonTipReachChallenge();
      case fb_action_1.UnionCommonTipOption.CommonTipTriggerDelegation:
        return new fb_action_1.CommonTipTriggerDelegation();
      case fb_action_1.UnionCommonTipOption.DreamlessWarning:
        return new fb_action_1.DreamlessWarning();
      case fb_action_1.UnionCommonTipOption.PunishReport:
        return new fb_action_1.PunishReport();
      case fb_action_1.UnionCommonTipOption.RemainStarWarning:
        return new fb_action_1.RemainStarWarning();
      case fb_action_1.UnionCommonTipOption.SlashAndTowerTip:
        return new fb_action_1.SlashAndTowerTip();
      case fb_action_1.UnionCommonTipOption.WhiteCatWarning:
        return new fb_action_1.WhiteCatWarning();
      default:
        return;
    }
  }
  static ReadUnionCommonTipOption(n, e) {
    if (void 0 !== e)
      switch (n) {
        case fb_action_1.UnionCommonTipOption.BadBuKingChallengeTip:
          return FbBadBuKingChallengeTip_1.FbBadBuKingChallengeTip.Create(e);
        case fb_action_1.UnionCommonTipOption.BlackCatWarning:
          return FbBlackCatWarning_1.FbBlackCatWarning.Create(e);
        case fb_action_1.UnionCommonTipOption.CommonTipChallengeCondition:
          return FbCommonTipChallengeCondition_1.FbCommonTipChallengeCondition.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.CommonTipChallengeFail:
          return FbCommonTipChallengeFail_1.FbCommonTipChallengeFail.Create(e);
        case fb_action_1.UnionCommonTipOption.CommonTipChallengeSuccess:
          return FbCommonTipChallengeSuccess_1.FbCommonTipChallengeSuccess.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.CommonTipEnterInRange:
          return FbCommonTipEnterInRange_1.FbCommonTipEnterInRange.Create(e);
        case fb_action_1.UnionCommonTipOption.CommonTipFirstComplete:
          return FbCommonTipFirstComplete_1.FbCommonTipFirstComplete.Create(e);
        case fb_action_1.UnionCommonTipOption.CommonTipGeneralFloatingTip:
          return FbCommonTipGeneralFloatingTip_1.FbCommonTipGeneralFloatingTip.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.CommonTipId:
          return FbCommonTipId_1.FbCommonTipId.Create(e);
        case fb_action_1.UnionCommonTipOption.CommonTipMissionComplete:
          return FbCommonTipMissionComplete_1.FbCommonTipMissionComplete.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.CommonTipPrepareCountdown:
          return FbCommonTipPrepareCountdown_1.FbCommonTipPrepareCountdown.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.CommonTipReachChallenge:
          return FbCommonTipReachChallenge_1.FbCommonTipReachChallenge.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.CommonTipTriggerDelegation:
          return FbCommonTipTriggerDelegation_1.FbCommonTipTriggerDelegation.Create(
            e,
          );
        case fb_action_1.UnionCommonTipOption.DreamlessWarning:
          return FbDreamlessWarning_1.FbDreamlessWarning.Create(e);
        case fb_action_1.UnionCommonTipOption.PunishReport:
          return FbPunishReport_1.FbPunishReport.Create(e);
        case fb_action_1.UnionCommonTipOption.RemainStarWarning:
          return FbRemainStarWarning_1.FbRemainStarWarning.Create(e);
        case fb_action_1.UnionCommonTipOption.SlashAndTowerTip:
          return FbSlashAndTowerTip_1.FbSlashAndTowerTip.Create(e);
        case fb_action_1.UnionCommonTipOption.WhiteCatWarning:
          return FbWhiteCatWarning_1.FbWhiteCatWarning.Create(e);
        default:
          return;
      }
  }
}
exports.UnionCommonTipOptionHelper = UnionCommonTipOptionHelper;
//# sourceMappingURL=UnionCommonTipOptionHelper.js.map
