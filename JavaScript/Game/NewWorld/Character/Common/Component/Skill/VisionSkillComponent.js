"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var n,
      h = arguments.length,
      o =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, i, e, s);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (n = t[l]) && (o = (h < 3 ? n(o) : 3 < h ? n(i, e, o) : n(i, e)) || o);
    return 3 < h && o && Object.defineProperty(i, e, o), o;
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
      (this.kXa = 0),
      (this.Ujs = !1),
      (this.yZo = !1),
      (this.IZo = !1),
      (this.TZo = !1),
      (this.UGn = !0),
      (this.LZo = (t, i) => {
        var e, s, n;
        !(
          t === InputEnums_1.EInputAction.幻象2 ||
          (t === InputEnums_1.EInputAction.攻击 && this.UGn)
        ) ||
          this.SZo <= 0 ||
          ((t = this.EZo.GetMultiSkillInfo(this.SZo))?.NextSkillId &&
            ((e = t.NextSkillId),
            (s = this.GetSkill(e))
              ? this.EZo.CanStartMultiSkill(s) &&
                (n = this.vZo)?.Valid &&
                this.yZo &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    18,
                    "使用幻象技能（输入触发下一段）",
                    ["skillId", t.NextSkillId],
                  ),
                this.AbilityComp.SendGameplayEventToActor(
                  GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                    useNextSkillTagId,
                  ),
                ),
                (t = n.Entity.CheckGetComponent(34)),
                super.BeginSkill(e, {
                  Target: t.SkillTarget?.Entity,
                  SocketName: t.SkillTargetSocket,
                  Context: "VisionSkill.OnCharInputPress",
                })
                  ? this.EZo.StartMultiSkill(s, !0) && (this.SZo = e)
                  : CombatLog_1.CombatLog.Warn(
                      "Skill",
                      this.vZo?.Entity,
                      "角色幻象变身中使用下一段技能失败",
                      ["技能Id", s?.SkillId],
                      ["技能名", s?.SkillName],
                    ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Battle", 18, "幻象缺少技能", ["skillId", e])));
      }),
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
    let e = t;
    i.CheckMultiSkill &&
      0 !== this.SZo &&
      (t = this.EZo.GetMultiSkillInfo(this.SZo)).NextSkillId &&
      t.NextSkillId !== t.FirstSkillId &&
      (e = t.NextSkillId);
    var s,
      t = this.GetSkill(e);
    return t
      ? ((s = this.EZo.IsMultiSkill(t.SkillInfo)) && (this.kXa = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "使用幻象技能", ["skillId", e]),
        super.BeginSkill(e, i)
          ? (s &&
              this.kXa === e &&
              (this.Bjs(!0, !0), this.EZo.StartMultiSkill(t, !1)) &&
              (this.SZo = e),
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
          Log_1.Log.Error("Battle", 18, "幻象缺少技能", ["skillId", e]),
        !1);
  }
  OnMorphEnd(t) {
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
            Log_1.Log.Error("Battle", 18, "幻象缺少技能", ["skillId", t]),
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
      (this.kXa = 0),
      this.Pjs(!0, !1);
  }
  Bjs(t, i) {
    var e;
    this.vZo?.Valid &&
      ((e = this.vZo.Entity),
      t &&
        !EventSystem_1.EventSystem.HasWithTarget(
          e,
          EventDefine_1.EEventName.CharInputPress,
          this.LZo,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharInputPress,
          this.LZo,
        ),
      i) &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      );
  }
  Pjs(t, i) {
    var e;
    this.vZo?.Valid &&
      ((e = this.vZo.Entity),
      t &&
        EventSystem_1.EventSystem.HasWithTarget(
          e,
          EventDefine_1.EEventName.CharInputPress,
          this.LZo,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e,
          EventDefine_1.EEventName.CharInputPress,
          this.LZo,
        ),
      i) &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.xjs,
      );
  }
};
(VisionSkillComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(35)],
  VisionSkillComponent,
)),
  (exports.VisionSkillComponent = VisionSkillComponent);
//# sourceMappingURL=VisionSkillComponent.js.map
