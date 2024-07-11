"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkillHandle = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  useNextSkillTagId = 718290459,
  morphTagId = -2100129479;
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
              : this.Azo()));
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
    (e = this.Izo.IsMultiSkill(e.SkillInfo)),
      e && (h = this.Izo.GetNextMultiSkillId(t)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "使用幻象技能", ["skillId", h]),
      (t = this.cBe.BeginSkill(h, {
        Target: i,
        SocketName: s,
        Context: "VisionSkillHandle.BeginSkill",
      }));
    return t
      ? (e &&
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
      : (this.Azo(), !1);
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
  Azo() {
    PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Ezo.Entity, !1);
    var t = this.Ezo?.Entity?.CheckGetComponent(185);
    t && t.RemoveTag(morphTagId),
      this.cBe.CurrentSkill?.Active &&
        this.cBe.EndSkill(
          this.cBe.CurrentSkill.SkillId,
          "VisionSkillHandle.HandleSkillFail",
        );
  }
}
exports.VisionSkillHandle = VisionSkillHandle;
//# sourceMappingURL=VisionSkillHandle.js.map
