"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiTeam = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const AiScheduleGroup_1 = require("./AiScheduleGroup");
class AiTeam {
  constructor() {
    (this.TeamId = 0),
      (this.TeamMemberToGroup = new Map()),
      (this.AiTeamLevel = void 0),
      (this.AiTeamAreas = void 0),
      (this.AiTeamAttacks = void 0),
      (this.AreaCharTypeToPriority = new Array()),
      (this.xse = new Map()),
      (this.xie = (e, t) => {
        let i;
        t &&
          (i = this.xse.get(t)) &&
          (this.xse.delete(t), this.xse.set(e, i), (i.Target = e));
      });
  }
  Init(e) {
    ConfigManager_1.ConfigManager.AiConfig.LoadAiTeamConfigNew(this, e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      );
    for (const i of this.AiTeamAreas) {
      const t = new Map();
      this.AreaCharTypeToPriority.push(t);
      let e = 0;
      for (const r of i.CharTypes) t.set(r, ++e);
    }
  }
  Clear() {
    this.TeamMemberToGroup.clear(),
      this.xse.clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      );
  }
  AddMember(e) {
    this.TeamMemberToGroup.set(e, void 0);
  }
  RemoveMember(e) {
    if (this.TeamMemberToGroup.delete(e))
      for (const [, t] of this.xse) t.Remove(e);
  }
  Tick() {
    this.wse();
    for (const [, e] of this.xse) e.ScheduleGroup();
  }
  wse() {
    for (const [, e] of this.xse) e.CheckTargetAndRemove();
    for (const [t] of this.TeamMemberToGroup) {
      const i = t.AiHateList.GetCurrentTarget();
      if (i?.Valid) {
        const r = i?.Entity?.GetComponent(1);
        if (r)
          if (
            r.CreatureData.GetEntityType() !==
            Protocol_1.Aki.Protocol.HBs.Proto_Player
          )
            BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
              t.CharAiDesignComp.Entity.Id,
              "TeamAttacker",
              !0,
            ),
              this.TeamMemberToGroup.set(t, void 0);
          else {
            let e = this.xse.get(i);
            e ||
              ((e = new AiScheduleGroup_1.AiScheduleGroup(this, i)),
              this.xse.set(i, e)),
              e.TryAdd(t),
              this.TeamMemberToGroup.set(t, e);
          }
      } else this.TeamMemberToGroup.set(t, void 0);
    }
    for (const [o, s] of this.xse) s.IsEmpty() && this.xse.delete(o);
  }
  GetAiTeamAreaMemberData(e) {
    return this.TeamMemberToGroup.get(e)?.GetMemberData(e);
  }
}
exports.AiTeam = AiTeam;
// # sourceMappingURL=AiTeam.js.map
