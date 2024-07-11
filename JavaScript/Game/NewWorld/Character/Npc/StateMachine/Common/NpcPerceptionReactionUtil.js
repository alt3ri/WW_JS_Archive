"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerceptionReactionUtil = void 0);
const Time_1 = require("../../../../../../Core/Common/Time"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  Global_1 = require("../../../../../Global"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  BUBBLE_RANDOM_MAX = 100,
  TURN_SPEED = 2e4,
  BUBBLE_TIME = 3;
class NpcPerceptionReactionUtil {
  static TurnToPlayer(e) {
    var t = e.GetComponent(2),
      r = t.ActorLocationProxy,
      i =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy,
      o = Vector_1.Vector.Create(),
      i =
        (i.Subtraction(r, o),
        (o.Z = 0),
        o.Normalize(),
        Rotator_1.Rotator.Create()),
      r = (o.ToOrientationRotator(i), e.GetComponent(36));
    r
      ? r.SmoothCharacterRotation(i, TURN_SPEED, Time_1.Time.DeltaTimeSeconds)
      : t.SetActorRotation(
          i.ToUeRotator(),
          "NpcPerformUnderAttackState.TurnToPlayer",
        );
  }
  static ShowHeadDialog(e, t, r) {
    t < MathUtils_1.MathUtils.GetRandomFloatNumber(0, BUBBLE_RANDOM_MAX) ||
      ((t = e.GetComponent(70)) &&
        (e = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
          r.FlowListName,
          r.FlowId,
          e.GetComponent(2).Actor.ActorLabel,
          r.StateId,
        )) &&
        0 !== e.TalkItems.length &&
        ((r = e.TalkItems[0]),
        StringUtils_1.StringUtils.IsEmpty(r.TidTalk) ||
          ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TidTalk)),
          r.WaitTime && 0 < r.WaitTime
            ? t.SetDialogueText(e, r.WaitTime)
            : t.SetDialogueText(e, BUBBLE_TIME))));
  }
}
exports.NpcPerceptionReactionUtil = NpcPerceptionReactionUtil;
//# sourceMappingURL=NpcPerceptionReactionUtil.js.map
