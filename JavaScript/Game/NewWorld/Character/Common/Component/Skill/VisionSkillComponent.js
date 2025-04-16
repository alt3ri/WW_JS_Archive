"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, s, e) {
    var h,
      n = arguments.length,
      r =
        n < 3
          ? i
          : null === e
            ? (e = Object.getOwnPropertyDescriptor(i, s))
            : e;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, s, e);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (h = t[l]) && (r = (n < 3 ? h(r) : 3 < n ? h(i, s, r) : h(i, s)) || r);
    return 3 < n && r && Object.defineProperty(i, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkillComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  CharacterSkillComponent_1 = require("./CharacterSkillComponent"),
  useNextSkillTagId = 718290459;
let VisionSkillComponent = class VisionSkillComponent extends CharacterSkillComponent_1.CharacterSkillComponent {
  constructor() {
    super(...arguments),
      (this.fZo = void 0),
      (this.vZo = void 0),
      (this.EZo = void 0),
      (this.SZo = 0),
      (this.GJa = 0),
      (this.Ujs = !1),
      (this.yZo = !1),
      (this.IZo = !1),
      (this.TZo = !1),
      (this.UGn = !0),
      (this.Ghh = !1),
      (this.xjs = () => {
        this.TZo || this.RZo();
      });
  }
  InitVisionSkill(t, i = !1) {
    this.vZo !== t &&
      (this.Pjs(!0, !0),
      (this.vZo = t),
      (this.fZo =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData()),
      (t = this.Entity.Id),
      this.EZo ||
        ((this.EZo = this.fZo.InitMultiSkill(t)),
        this.EZo.Init(this.vZo.Id, t),
        this.EZo.InitMultiSkillInfo(this.LoadedSkills))),
      (this.Ujs = i),
      (this.IZo = !1),
      (this.TZo = !1),
      (this.UGn = !0);
  }
  BeginSkill(t, i = {}) {
    if (!this.Ujs) return super.BeginSkill(t, i);
    let s = t;
    i.CheckMultiSkill &&
      0 !== this.SZo &&
      (t = this.EZo.GetMultiSkillInfo(this.SZo)).NextSkillId &&
      t.NextSkillId !== t.FirstSkillId &&
      (s = t.NextSkillId);
    var e,
      t = this.GetSkill(s);
    return t
      ? ((e = this.EZo.IsMultiSkill(t.SkillInfo)) && (this.GJa = s),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 17, "使用幻象技能", ["skillId", s]),
        super.BeginSkill(s, i)
          ? (e &&
              this.GJa === s &&
              (this.Bjs(!0, !0), this.EZo.StartMultiSkill(t, !1)) &&
              (this.SZo = s),
            (this.yZo = !0))
          : (CombatLog_1.CombatLog.Warn(
              "Skill",
              this.vZo?.Entity,
              "角色开始幻象变身技能失败",
              ["技能Id", t?.SkillId],
              ["技能名", t?.SkillName],
            ),
            !1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 17, "幻象缺少技能", ["skillId", s]),
        !1);
  }
  OnMorphEnd() {
    this.IZo || this.RZo(), (this.yZo = !1);
  }
  ExitMultiSkillState() {
    this.RZo();
  }
  SetKeepMultiSkillState(t, i) {
    (this.IZo = t), (this.TZo = i);
  }
  SetEnableAttackInputAction(t) {
    this.UGn = t;
  }
  CanSummonerStartNextMultiSkill() {
    var t, i;
    return !(
      this.SZo <= 0 ||
      this.yZo ||
      !(t = this.EZo.GetMultiSkillInfo(this.SZo))?.NextSkillId ||
      ((t = t.NextSkillId),
      (i = this.GetSkill(t))
        ? !this.EZo.CanStartMultiSkill(i)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 17, "幻象缺少技能", ["skillId", t]),
          1))
    );
  }
  IsInMultiSkill() {
    return !(
      this.SZo <= 0 || !this.EZo.GetMultiSkillInfo(this.SZo)?.NextSkillId
    );
  }
  OnVisionAbilityDestroy() {
    this.fZo &&
      (this.fZo.RemoveMultiSkill(this.Entity.Id), this.EZo?.ClearAllSkill()),
      this.vZo && (this.Pjs(!0, !0), (this.vZo = void 0)),
      (this.fZo = void 0),
      (this.EZo = void 0),
      (this.SZo = 0);
  }
  OnEnd() {
    return this.OnVisionAbilityDestroy(), super.OnEnd();
  }
  RZo() {
    0 !== this.SZo && (this.EZo.ResetMultiSkills(this.SZo, !0), (this.SZo = 0)),
      (this.GJa = 0),
      this.Pjs(!0, !1);
  }
  Bjs(t, i) {
    var s;
    this.vZo?.Valid &&
      ((this.Ghh = !0), (s = this.vZo.Entity), i) &&
      !EventSystem_1.EventSystem.HasWithTarget(
        s,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        s,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      );
  }
  Pjs(t, i) {
    var s;
    this.vZo?.Valid &&
      ((this.Ghh = !1), (s = this.vZo.Entity), i) &&
      EventSystem_1.EventSystem.HasWithTarget(
        s,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        s,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      );
  }
  LZo(t, i) {
    if (
      (t === InputEnums_1.EInputAction.幻象2 ||
        (t === InputEnums_1.EInputAction.攻击 && this.UGn)) &&
      !(this.SZo <= 0)
    ) {
      t = this.EZo.GetMultiSkillInfo(this.SZo);
      if (t?.NextSkillId) {
        var s = t.NextSkillId,
          e = this.GetSkill(s);
        if (e) {
          if (this.EZo.CanStartMultiSkill(e)) {
            var h = this.vZo;
            if (h?.Valid && this.yZo) {
              CombatLog_1.CombatLog.Info(
                "Skill",
                this.Entity,
                "使用幻象技能（输入触发下一段）",
                ["skillId", t.NextSkillId],
              ),
                this.AbilityComp.SendGameplayEventToActor(
                  GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                    useNextSkillTagId,
                  ),
                );
              h = h.Entity.CheckGetComponent(39);
              if (
                !super.BeginSkill(s, {
                  Target: h.SkillTarget?.Entity,
                  SocketName: h.SkillTargetSocket,
                  Reason: "VisionSkill.OnCharInputPress",
                })
              )
                return (
                  CombatLog_1.CombatLog.Warn(
                    "Skill",
                    this.Entity,
                    "角色幻象变身中使用下一段技能失败",
                    ["技能Id", e?.SkillId],
                    ["技能名", e?.SkillName],
                  ),
                  !1
                );
              if (
                (CombatLog_1.CombatLog.Info(
                  "Skill",
                  this.Entity,
                  "角色幻象变身中使用下一段技能成功",
                  ["skillId", t.NextSkillId],
                ),
                this.EZo.StartMultiSkill(e, !0))
              )
                return (this.SZo = s), !0;
            }
          }
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 17, "幻象缺少技能", ["skillId", s]);
      }
    }
    return !1;
  }
  HandlePress(t, i) {
    return !!this.Ghh && this.LZo(t, i);
  }
};
(VisionSkillComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(41)],
  VisionSkillComponent,
)),
  (exports.VisionSkillComponent = VisionSkillComponent);
//# sourceMappingURL=VisionSkillComponent.js.map
