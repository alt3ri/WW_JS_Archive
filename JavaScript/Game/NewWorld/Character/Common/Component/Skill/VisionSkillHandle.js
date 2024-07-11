"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkillHandle = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  useNextSkillTagId = 718290459;
class VisionSkillHandle {
  constructor() {
    (this.Mzo = void 0),
      (this.cBe = void 0),
      (this.Szo = void 0),
      (this.Ezo = void 0),
      (this.yzo = void 0),
      (this.Izo = void 0),
      (this.Tzo = 0),
      (this.Lzo = !1),
      (this.Dzo = !1),
      (this.Rzo = !1),
      (this.JBn = !0),
      (this.Uzo = (t, i) => {
        var s, e;
        !(
          t === InputEnums_1.EInputAction.幻象2 ||
          (t === InputEnums_1.EInputAction.攻击 && this.JBn)
        ) ||
          this.Tzo <= 0 ||
          ((t = this.Izo.GetMultiSkillInfo(this.Tzo)?.NextSkillId) &&
            ((s = this.cBe.GetSkill(t)), this.Izo.CanStartMultiSkill(s)) &&
            (e = this.Ezo)?.Valid &&
            this.Lzo &&
            (this.Szo || (this.Szo = this.yzo.Entity.CheckGetComponent(17)),
            this.Szo.SendGameplayEventToActor(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                useNextSkillTagId,
              ),
            ),
            (e = e.Entity.CheckGetComponent(33)),
            this.cBe.BeginSkill(t, {
              Target: e.SkillTarget?.Entity,
              SocketName: e.SkillTargetSocket,
              Context: "VisionSkillHandle.OnCharInputPress",
            })
              ? this.Izo.StartMultiSkill(s, !0) && (this.Tzo = t)
              : CombatDebugController_1.CombatDebugController.CombatInfo(
                  "Skill",
                  this.Ezo?.Entity,
                  "角色幻象变身中使用下一段技能失败",
                  ["技能Id", s?.SkillId],
                  ["技能名", s?.SkillName],
                )));
      });
  }
  Init(t, i) {
    (this.Ezo = t),
      this.yzo !== i &&
        ((this.yzo = i),
        (this.cBe = this.yzo.Entity.CheckGetComponent(33)),
        (this.Szo = void 0)),
      (this.Mzo =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData()),
      this.Mzo.MultiSkillMap.has(this.yzo.Id) ||
        ((this.Izo = this.Mzo.InitMultiSkill(this.yzo.Id)),
        this.Izo.Init(this.Ezo.Id, this.yzo.Id)),
      (this.Dzo = !1),
      (this.Rzo = !1),
      (this.JBn = !0);
  }
  Clear() {
    return (
      this.Mzo &&
        this.yzo &&
        (this.Mzo.RemoveMultiSkill(this.yzo.Id), this.Izo?.ClearAllSkill()),
      this.Ezo?.Valid &&
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Ezo.Entity,
          EventDefine_1.EEventName.CharInputPress,
          this.Uzo,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Ezo.Entity,
            EventDefine_1.EEventName.CharInputPress,
            this.Uzo,
          ),
        (this.Ezo = void 0)),
      (this.yzo = void 0),
      (this.cBe = void 0),
      (this.Szo = void 0),
      (this.Mzo = void 0),
      (this.Izo = void 0),
      !(this.Tzo = 0)
    );
  }
  BeginSkill(t, i, s = "") {
    var e = this.cBe.GetSkill(t);
    let h = t;
    var n = this.Izo.IsMultiSkill(e.SkillInfo),
      t =
        (n && (h = this.Izo.GetNextMultiSkillId(t)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "使用幻象技能", ["skillId", h]),
        this.cBe.BeginSkill(h, {
          Target: i,
          SocketName: s,
          Context: "VisionSkillHandle.BeginSkill",
        }));
    return t
      ? (n &&
          (EventSystem_1.EventSystem.HasWithTarget(
            this.Ezo.Entity,
            EventDefine_1.EEventName.CharInputPress,
            this.Uzo,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              this.Ezo.Entity,
              EventDefine_1.EEventName.CharInputPress,
              this.Uzo,
            ),
          (i = this.cBe.GetSkill(h)),
          this.Izo.StartMultiSkill(i)) &&
          (this.Tzo = h),
        (this.Lzo = !0))
      : (CombatDebugController_1.CombatDebugController.CombatInfo(
          "Skill",
          this.Ezo?.Entity,
          "角色开始幻象变身技能失败",
          ["技能Id", e?.SkillId],
          ["技能名", e?.SkillName],
        ),
        !1);
  }
  OnMorphEnd(t) {
    this.Dzo || this.Pzo(), (this.Lzo = !1);
  }
  StopAllSkills() {
    this.cBe.StopAllSkills("VisionSkillHandle.StopAllSkills"), this.Pzo();
  }
  OnGoDown() {
    this.Rzo || this.Pzo();
  }
  ExitMultiSkillState() {
    this.Pzo();
  }
  SetKeepMultiSkillState(t, i) {
    (this.Dzo = t), (this.Rzo = i);
  }
  SetEnableAttackInputAction(t) {
    this.JBn = t;
  }
  CanSummonerStartNextMultiSkill() {
    var t;
    return !(
      this.Tzo <= 0 ||
      this.Lzo ||
      !(t = this.Izo.GetMultiSkillInfo(this.Tzo))?.NextSkillId ||
      ((t = this.cBe.GetSkill(t.NextSkillId)), !this.Izo.CanStartMultiSkill(t))
    );
  }
  IsSummonerInMultiSkill() {
    return !(
      this.Tzo <= 0 || !this.Izo.GetMultiSkillInfo(this.Tzo)?.NextSkillId
    );
  }
  Pzo() {
    0 !== this.Tzo && (this.Izo.ResetMultiSkills(this.Tzo, !0), (this.Tzo = 0)),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Ezo.Entity,
        EventDefine_1.EEventName.CharInputPress,
        this.Uzo,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Ezo.Entity,
          EventDefine_1.EEventName.CharInputPress,
          this.Uzo,
        );
  }
}
exports.VisionSkillHandle = VisionSkillHandle;
//# sourceMappingURL=VisionSkillHandle.js.map
