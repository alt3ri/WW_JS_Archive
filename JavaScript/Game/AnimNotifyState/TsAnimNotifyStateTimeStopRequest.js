"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Time_1 = require("../../Core/Common/Time"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatMessage_1 = require("../Module/CombatMessage/CombatMessage"),
  CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils"),
  CombatLog_1 = require("../Utils/CombatLog");
class TsAnimNotifyStateTimeStopRequest extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, r, o) {
    e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    if (0 === Time_1.Time.FlowTimeDilation) {
      const t = e.CharacterActorComponent?.Entity;
      return (
        CombatLog_1.CombatLog.Error(
          "Animation",
          t,
          "重复进入副本时停，将不做处理",
          ["animation", r?.GetName()],
        ),
        !1
      );
    }
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId);
    if (
      r?.Valid &&
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        r,
      )
    )
      return !1;
    Time_1.Time.SetFlowTimeDilation(0);
    for (const n of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ??
      [])
      n.IsInit &&
        (n.Entity?.GetComponent(172)?.AddPauseLock("ANS AbsoluteTimeStop"),
        ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.add(
          n,
        ));
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddPauseLock(
      "ANS AbsoluteTimeStop",
    ),
      ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, !0);
    const t = e.CharacterActorComponent?.Entity;
    return (
      t &&
        (((r = Protocol_1.Aki.Protocol.Fe_.create()).o5n = !0),
        (r.n5n = o * TimeUtil_1.TimeUtil.InverseMillisecond),
        CombatMessage_1.CombatNet.Send(27107, t, r)),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAbsoluteTimeStop,
          !0,
        ),
      !0
    );
  }
  K2_NotifyEnd(e, r) {
    var o,
      e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    Time_1.Time.SetFlowTimeDilation(1);
    for (const t of ControllerHolder_1.ControllerHolder.TimeController
      .TimeStopBuffEntitySet)
      t.Entity?.GetComponent(172)?.RemovePauseLock("ANS AbsoluteTimeStop");
    return (
      ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.clear(),
      ControllerHolder_1.ControllerHolder.FormationAttributeController.RemovePauseLock(
        "ANS AbsoluteTimeStop",
      ),
      ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, !1),
      e.CharacterActorComponent?.Entity &&
        (((o = Protocol_1.Aki.Protocol.Fe_.create()).o5n = !1),
        (o.n5n = 0),
        CombatMessage_1.CombatNet.Send(
          27107,
          e.CharacterActorComponent.Entity,
          o,
        )),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAbsoluteTimeStop,
          !1,
        ),
      !0
    );
  }
  GetNotifyName() {
    return "副本计时和所有战斗单位buff、技能冷却冻结";
  }
}
exports.default = TsAnimNotifyStateTimeStopRequest;
//# sourceMappingURL=TsAnimNotifyStateTimeStopRequest.js.map
