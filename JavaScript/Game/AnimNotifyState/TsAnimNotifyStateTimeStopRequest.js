"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const TimeUtil_1 = require("../Common/TimeUtil");
const ModelManager_1 = require("../Manager/ModelManager");
const FormationAttributeController_1 = require("../Module/Abilities/FormationAttributeController");
const SkillCdController_1 = require("../Module/Battle/SkillCdController");
const CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
class TsAnimNotifyStateTimeStopRequest extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(e, t, o) {
    e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop = !0;
    for (const n of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ??
      [])
      n.IsInit &&
        n.Entity?.GetComponent(157)?.AddPauseLock("ANS AbsoluteTimeStop");
    FormationAttributeController_1.FormationAttributeController.AddPauseLock(
      "ANS AbsoluteTimeStop",
    ),
      SkillCdController_1.SkillCdController.Pause(0, !0);
    let r;
    var e = e.CharacterActorComponent?.Entity;
    return (
      e &&
        (((r = Protocol_1.Aki.Protocol.VNn.create()).Mkn = !0),
        (r.Skn = o * TimeUtil_1.TimeUtil.InverseMillisecond),
        CombatMessage_1.CombatNet.Call(4085, e, r)),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAbsoluteTimeStop,
          !0,
        ),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    let o;
    var e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop = !1;
    for (const r of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ??
      [])
      r.Entity?.GetComponent(157)?.RemovePauseLock("ANS AbsoluteTimeStop");
    return (
      FormationAttributeController_1.FormationAttributeController.RemovePauseLock(
        "ANS AbsoluteTimeStop",
      ),
      SkillCdController_1.SkillCdController.Pause(0, !1),
      e.CharacterActorComponent?.Entity &&
        (((o = Protocol_1.Aki.Protocol.VNn.create()).Mkn = !1),
        (o.Skn = 0),
        CombatMessage_1.CombatNet.Call(
          4085,
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
// # sourceMappingURL=TsAnimNotifyStateTimeStopRequest.js.map
