"use strict";
let ESkillAction;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let o;
    const l = arguments.length;
    let r =
      l < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, i, s);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (o = t[a]) && (r = (l < 3 ? o(r) : l > 3 ? o(e, i, r) : o(e, i)) || r);
    return l > 3 && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPassiveSkillComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const PassiveSkillById_1 = require("../../../../../../Core/Define/ConfigQuery/PassiveSkillById");
const Entity_1 = require("../../../../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const BulletController_1 = require("../../../../Bullet/BulletController");
!(function (t) {
  (t[(t.AddBullet = 1)] = "AddBullet"),
    (t[(t.RemoveBullet = 2)] = "RemoveBullet"),
    (t[(t.AddBuff = 3)] = "AddBuff"),
    (t[(t.RemoveBuff = 4)] = "RemoveBuff"),
    (t[(t.StartSkill = 5)] = "StartSkill");
})((ESkillAction = ESkillAction || {}));
let CharacterPassiveSkillComponent = class CharacterPassiveSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ikr = void 0),
      (this.okr = void 0),
      (this.rkr = void 0),
      (this.nkr = new Map()),
      (this.LockMap = new Set());
  }
  OnInit() {
    return (
      (this.ikr = this.Entity.CheckGetComponent(25)),
      (this.okr = this.Entity.CheckGetComponent(157)),
      (this.rkr = this.Entity.GetComponent(186)),
      !0
    );
  }
  OnStart() {
    return !0;
  }
  OnActivate() {
    const t = this.Entity.GetComponent(0).ComponentDataMap.get("vps")?.vps?.IMs;
    if (t)
      for (const e of t)
        this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(e.vkn), {
          CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(e.r4n.s4n),
        });
    return !0;
  }
  OnClear() {
    for (const t of this.nkr.keys()) this.ForgetPassiveSkill(t);
    return !0;
  }
  OnTick(t) {
    this.LockMap.clear();
  }
  GetAllPassiveSkills() {
    return [...this.nkr.values()];
  }
  HasSkill(t) {
    return this.nkr.has(t);
  }
  LearnPassiveSkill(o, t = void 0) {
    if (this.HasSkill(o)) return !1;
    const l = PassiveSkillById_1.configPassiveSkillById.GetConfig(o);
    if (!l)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "被动技能配置不存在",
            ["owner", this.Entity.Id],
            ["skillId", o],
          ),
        !1
      );
    if (!l.TriggerType)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "被动技能配置错误，缺少触发类型",
            ["owner", this.Entity.Id],
            ["skillId", o],
          ),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Battle",
        20,
        "角色添加被动技能",
        ["owner", this.Entity.Id],
        ["skillId", o],
      );
    const e = this.ikr.AddTrigger(
      {
        Type: l.TriggerType,
        Preset: l.TriggerPreset,
        Params: l.TriggerParams,
        Formula: l.TriggerFormula,
      },
      (t, e) => {
        let i = this.Entity;
        const s = l.InstigatorType;
        (i = s ? t?.[s] ?? e?.[s] : i) && i instanceof Entity_1.Entity
          ? this.ExecuteAction(o, i)
          : CombatDebugController_1.CombatDebugController.CombatError(
              "PassiveSkill",
              this.Entity,
              "被动技能目标非法",
              ["targetKey", s],
              ["skillId", o],
            );
      },
    );
    return (
      l.IsDefaultActivated && this.ikr.SetTriggerActive(e, !0),
      this.nkr.set(o, {
        SkillId: o,
        TriggerHandle: e,
        Actions: this.ParseActions(l),
        TargetKey: l.InstigatorType,
        CombatMessageId: t?.CombatMessageId,
      }),
      this.rkr?.InitPassiveSkill(l),
      this.OnPassiveSkillAdded(o, t),
      !0
    );
  }
  ForgetPassiveSkill(t, e = !1) {
    const i = this.nkr.get(t);
    void 0 !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          20,
          "角色失去被动技能",
          ["owner", this.Entity.Id],
          ["skillId", t],
        ),
      this.ikr.RemoveTrigger(i.TriggerHandle),
      this.nkr.delete(t),
      this.OnPassiveSkillRemoved(t, e));
  }
  SetPassiveSkillActive(t, e) {
    t = this.nkr.get(t);
    void 0 !== t &&
      t.TriggerHandle &&
      t.TriggerHandle > 0 &&
      this.ikr.SetTriggerActive(t.TriggerHandle, e);
  }
  ParseActions(t) {
    const e = [];
    const i = this.ParseAction(t.SkillAction, t.SkillActionParams);
    void 0 !== i && e.push(i);
    for (const o of t.SubSkillAction) {
      var s = PassiveSkillById_1.configPassiveSkillById.GetConfig(o);
      var s = this.ParseAction(s.SkillAction, s.SkillActionParams);
      void 0 !== s && e.push(s);
    }
    return e;
  }
  ParseAction(t, e) {
    const i = ESkillAction[t];
    if (void 0 !== i)
      switch (i) {
        case ESkillAction.AddBullet:
          return { Action: i, BulletRowNames: e.map((t) => t.trim()) };
        case ESkillAction.RemoveBullet:
          return {
            Action: i,
            BulletRowNames: e[0].split("#").map((t) => t.trim()),
            SummonChild: e[1]?.trim() === "1",
          };
        case ESkillAction.AddBuff:
          return { Action: i, BuffId: e.map((t) => BigInt(t)) };
        case ESkillAction.RemoveBuff: {
          const s = {
            Action: i,
            BuffId: new Array(e.length),
            StackCount: new Array(e.length),
          };
          return (
            e.forEach((t, e) => {
              var [t, i] = t.split("#");
              (s.BuffId[e] = BigInt(t)), (s.StackCount[e] = Number(i ?? -1));
            }),
            s
          );
        }
        case ESkillAction.StartSkill:
          return { Action: i, SkillId: Number(e[0]) };
        default:
      }
  }
  ExecuteAction(t, e) {
    if (this.okr.HasBuffAuthority() && !this.rkr?.IsPassiveSkillInCd(t))
      if (this.LockMap.has(t))
        CombatDebugController_1.CombatDebugController.CombatError(
          "PassiveSkill",
          this.Entity,
          "被动技能在同一次调用栈中重复触发，需要检查技能配置",
          ["skillId", t],
          [
            "desc",
            PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.SkillDesc ??
              "",
          ],
          ["current executing skill ids", [...this.LockMap]],
        );
      else {
        const i = this.nkr.get(t);
        if (void 0 !== i) {
          this.rkr?.StartPassiveCd(t), this.LockMap.add(t);
          for (const d of i.Actions)
            switch (d.Action) {
              case ESkillAction.AddBullet:
                var s = e?.GetComponent(1)?.ActorTransform;
                if (s)
                  for (const k of d.BulletRowNames)
                    BulletController_1.BulletController.CreateBulletCustomTarget(
                      this.Entity,
                      k,
                      s,
                      {},
                      i.CombatMessageId,
                    );
                else
                  CombatDebugController_1.CombatDebugController.CombatError(
                    "PassiveSkill",
                    this.Entity,
                    "被动技能目标没有ActorTransform",
                    ["skillId", t],
                    ["targetEntity", e?.Id],
                  );
                break;
              case ESkillAction.RemoveBullet:
                var o =
                  ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(
                    this.Entity.Id,
                  );
                if (void 0 !== o) {
                  const l = new Array();
                  const r = d.SummonChild;
                  for (const f of o) {
                    const a = f.GetBulletInfo();
                    d.BulletRowNames.includes(a.BulletRowName) &&
                      l.push(a.BulletEntityId);
                  }
                  for (const C of l)
                    BulletController_1.BulletController.DestroyBullet(C, r, 3);
                }
                break;
              case ESkillAction.AddBuff:
                var n = e.GetComponent(157);
                var c = `被动技能${t}添加`;
                for (const S of d.BuffId)
                  n.AddBuff(S, {
                    InstigatorId: this.okr.CreatureDataId,
                    PreMessageId: i.CombatMessageId,
                    Reason: c,
                  });
                break;
              case ESkillAction.RemoveBuff:
                var h = e.GetComponent(157);
                var u = `被动技能${t}移除`;
                for (let t = 0; t < d.BuffId.length; t++) {
                  const v = d.StackCount[t] ?? -1;
                  h.RemoveBuff(d.BuffId[t], v, u);
                }
                break;
              case ESkillAction.StartSkill:
                o = e.CheckGetComponent(33);
                o &&
                  o.BeginSkill(d.SkillId, {
                    ContextId: i.CombatMessageId,
                    Context: "PassiveSkillComponent.ExecuteAction",
                  });
            }
          this.LockMap.delete(t);
        }
      }
  }
  OnPassiveSkillAdded(t, e = void 0) {
    e &&
      e.NeedBroadcast &&
      ((e = e.Buff?.MessageId),
      (e =
        SkillMessageController_1.SkillMessageController.PassiveSkillAddRequest(
          this.Entity,
          t,
          e,
        )),
      (this.nkr.get(t).CombatMessageId = e));
  }
  OnPassiveSkillRemoved(t, e) {
    e &&
      SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(
        this.Entity,
        t,
      );
  }
  static PassiveSkillAddNotify(t, e) {
    const i = t?.GetComponent(23);
    for (const s of e.IMs)
      i?.LearnPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(s.vkn), {
        CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(s.r4n.s4n),
      });
  }
  static PassiveSkillRemoveNotify(t, e) {
    const i = t?.GetComponent(23);
    for (const s of e.OIs)
      i?.ForgetPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(s));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("F2n", !1)],
  CharacterPassiveSkillComponent,
  "PassiveSkillAddNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("V2n", !1)],
    CharacterPassiveSkillComponent,
    "PassiveSkillRemoveNotify",
    null,
  ),
  (CharacterPassiveSkillComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(23)],
    CharacterPassiveSkillComponent,
  )),
  (exports.CharacterPassiveSkillComponent = CharacterPassiveSkillComponent);
// # sourceMappingURL=CharacterPassiveSkillComponent.js.map
