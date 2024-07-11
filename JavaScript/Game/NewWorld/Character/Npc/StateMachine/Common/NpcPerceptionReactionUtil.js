"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerceptionReactionUtil = void 0);
const Time_1 = require("../../../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../../Global");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const BUBBLE_RANDOM_MAX = 100;
const TURN_SPEED = 2e4;
const BUBBLE_TIME = 3;
class NpcPerceptionReactionUtil {
  static TurnToPlayer(e) {
    const t = e.GetComponent(2);
    var r = t.ActorLocationProxy;
    var i =
      Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    const o = Vector_1.Vector.Create();
    var i =
      (i.Subtraction(r, o),
      (o.Z = 0),
      o.Normalize(),
      Rotator_1.Rotator.Create());
    var r = (o.ToOrientationRotator(i), e.GetComponent(36));
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
        e.TalkItems.length !== 0 &&
        ((r = e.TalkItems[0]),
        StringUtils_1.StringUtils.IsEmpty(r.TidTalk) ||
          ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TidTalk)),
          r.WaitTime && r.WaitTime > 0
            ? t.SetDialogueText(e, r.WaitTime)
            : t.SetDialogueText(e, BUBBLE_TIME))));
  }
}
exports.NpcPerceptionReactionUtil = NpcPerceptionReactionUtil;
// # sourceMappingURL=NpcPerceptionReactionUtil.js.map
