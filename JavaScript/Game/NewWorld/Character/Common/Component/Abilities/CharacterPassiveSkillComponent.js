"use strict";
var ESkillAction,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        l = arguments.length,
        r =
          l < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (r = (l < 3 ? o(r) : 3 < l ? o(e, i, r) : o(e, i)) || r);
      return 3 < l && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPassiveSkillComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  PassiveSkillById_1 = require("../../../../../../Core/Define/ConfigQuery/PassiveSkillById"),
  Entity_1 = require("../../../../../../Core/Entity/Entity"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  BulletController_1 = require("../../../../Bullet/BulletController"),
  TriggerType_1 = require("./Trigger/TriggerType"),
  GlobalTriggerWhitelist =
    (!(function (t) {
      (t[(t.AddBullet = 1)] = "AddBullet"),
        (t[(t.RemoveBullet = 2)] = "RemoveBullet"),
        (t[(t.AddBuff = 3)] = "AddBuff"),
        (t[(t.RemoveBuff = 4)] = "RemoveBuff"),
        (t[(t.StartSkill = 5)] = "StartSkill");
    })((ESkillAction = ESkillAction || {})),
    [1302101064n]);
let CharacterPassiveSkillComponent = class CharacterPassiveSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.xOr = void 0),
      (this.wOr = void 0),
      (this.BOr = void 0),
      (this.bOr = new Map()),
      (this.LockMap = new Set());
  }
  OnInit() {
    return (
      (this.xOr = this.Entity.CheckGetComponent(25)),
      (this.wOr = this.Entity.CheckGetComponent(159)),
      (this.BOr = this.Entity.GetComponent(190)),
      !0
    );
  }
  OnStart() {
    return !0;
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("bys")?.bys?.NIs;
    if (t)
      for (const e of t)
        this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(e.X4n), {
          CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(e.G8n.k8n),
        });
    return !0;
  }
  OnClear() {
    for (const t of this.bOr.keys()) this.ForgetPassiveSkill(t);
    return !0;
  }
  OnTick(t) {
    this.LockMap.clear();
  }
  GetAllPassiveSkills() {
    return [...this.bOr.values()];
  }
  HasSkill(t) {
    return this.bOr.has(t);
  }
  LearnPassiveSkill(o, t = void 0) {
    if (this.HasSkill(o)) return !1;
    const l = PassiveSkillById_1.configPassiveSkillById.GetConfig(o);
    if (!l)
      return (
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.Entity,
          "被动技能配置不存在",
          ["skillId", o],
        ),
        !1
      );
    var e = TriggerType_1.ETriggerEvent[l.TriggerType];
    if (!l.TriggerType || void 0 === e)
      return (
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.Entity,
          "被动技能配置错误，缺少触发类型",
          ["skillId", o],
        ),
        !1
      );
    if (
      e === TriggerType_1.ETriggerEvent.GlobalDamageTrigger &&
      !GlobalTriggerWhitelist.includes(o)
    )
      return (
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.Entity,
          "禁止白名单之外的被动使用全局伤害监听",
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
    e = this.xOr.AddTrigger(
      {
        Type: l.TriggerType,
        Preset: l.TriggerPreset,
        Params: l.TriggerParams,
        Formula: l.TriggerFormula,
      },
      (t, e) => {
        let i = this.Entity;
        var s = l.InstigatorType;
        (i = s ? t?.[s] ?? e?.[s] : i) && i instanceof Entity_1.Entity
          ? this.ExecuteAction(o, i)
          : CombatLog_1.CombatLog.Error(
              "PassiveSkill",
              this.Entity,
              "被动技能目标非法",
              ["targetKey", s],
              ["skillId", o],
            );
      },
    );
    return (
      l.IsDefaultActivated && this.xOr.SetTriggerActive(e, !0),
      this.bOr.set(o, {
        SkillId: o,
        TriggerHandle: e,
        Actions: this.ParseActions(l),
        TargetKey: l.InstigatorType,
        CombatMessageId: t?.CombatMessageId,
      }),
      this.BOr?.InitPassiveSkill(l),
      this.OnPassiveSkillAdded(o, t),
      !0
    );
  }
  ForgetPassiveSkill(t, e = !1) {
    var i = this.bOr.get(t);
    void 0 !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          20,
          "角色失去被动技能",
          ["owner", this.Entity.Id],
          ["skillId", t],
        ),
      this.xOr.RemoveTrigger(i.TriggerHandle),
      this.bOr.delete(t),
      this.OnPassiveSkillRemoved(t, e));
  }
  SetPassiveSkillActive(t, e) {
    t = this.bOr.get(t);
    void 0 !== t &&
      t.TriggerHandle &&
      0 < t.TriggerHandle &&
      this.xOr.SetTriggerActive(t.TriggerHandle, e);
  }
  ParseActions(t) {
    var e = [],
      i = this.ParseAction(t.SkillAction, t.SkillActionParams);
    void 0 !== i && e.push(i);
    for (const o of t.SubSkillAction) {
      var s = PassiveSkillById_1.configPassiveSkillById.GetConfig(o),
        s = this.ParseAction(s.SkillAction, s.SkillActionParams);
      void 0 !== s && e.push(s);
    }
    return e;
  }
  ParseAction(t, e) {
    var i = ESkillAction[t];
    if (void 0 !== i)
      switch (i) {
        case ESkillAction.AddBullet:
          return { Action: i, BulletRowNames: e.map((t) => t.trim()) };
        case ESkillAction.RemoveBullet:
          return {
            Action: i,
            BulletRowNames: e[0].split("#").map((t) => t.trim()),
            SummonChild: "1" === e[1]?.trim(),
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
          return;
      }
  }
  ExecuteAction(t, e) {
    if (this.wOr.HasBuffAuthority() && !this.BOr?.IsPassiveSkillInCd(t))
      if (this.LockMap.has(t))
        CombatLog_1.CombatLog.Error(
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
        var i = this.bOr.get(t);
        if (void 0 !== i) {
          this.BOr?.StartPassiveCd(t), this.LockMap.add(t);
          for (const u of i.Actions)
            switch (u.Action) {
              case ESkillAction.AddBullet:
                var s = e?.GetComponent(1)?.ActorTransform;
                if (s)
                  for (const d of u.BulletRowNames)
                    BulletController_1.BulletController.CreateBulletCustomTarget(
                      this.Entity,
                      d,
                      s,
                      {},
                      i.CombatMessageId,
                    );
                else
                  CombatLog_1.CombatLog.Error(
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
                  var l = new Array(),
                    r = u.SummonChild;
                  for (const f of o) {
                    var a = f.GetBulletInfo();
                    u.BulletRowNames.includes(a.BulletRowName) &&
                      l.push(a.BulletEntityId);
                  }
                  for (const g of l)
                    BulletController_1.BulletController.DestroyBullet(g, r, 3);
                }
                break;
              case ESkillAction.AddBuff:
                var n = e.GetComponent(159),
                  c = `被动技能${t}添加`;
                for (const S of u.BuffId)
                  n.AddBuff(S, {
                    InstigatorId: this.wOr.CreatureDataId,
                    PreMessageId: i.CombatMessageId,
                    Reason: c,
                  });
                break;
              case ESkillAction.RemoveBuff:
                var h = e.GetComponent(159),
                  v = `被动技能${t}移除`;
                for (let t = 0; t < u.BuffId.length; t++) {
                  var k = u.StackCount[t] ?? -1;
                  h.RemoveBuff(u.BuffId[t], k, v);
                }
                break;
              case ESkillAction.StartSkill:
                o = e.CheckGetComponent(33);
                o &&
                  o.BeginSkill(u.SkillId, {
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
      (this.bOr.get(t).CombatMessageId = e));
  }
  OnPassiveSkillRemoved(t, e) {
    e &&
      SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(
        this.Entity,
        t,
      );
  }
  static PassiveSkillAddNotify(t, e) {
    var i = t?.GetComponent(23);
    for (const s of e.NIs)
      i?.LearnPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(s.X4n), {
        CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(s.G8n.k8n),
      });
  }
  static PassiveSkillRemoveNotify(t, e) {
    var i = t?.GetComponent(23);
    for (const s of e.rAs)
      i?.ForgetPassiveSkill(MathUtils_1.MathUtils.LongToBigInt(s));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("g3n", !1)],
  CharacterPassiveSkillComponent,
  "PassiveSkillAddNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("f3n", !1)],
    CharacterPassiveSkillComponent,
    "PassiveSkillRemoveNotify",
    null,
  ),
  (CharacterPassiveSkillComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(23)],
    CharacterPassiveSkillComponent,
  )),
  (exports.CharacterPassiveSkillComponent = CharacterPassiveSkillComponent);
//# sourceMappingURL=CharacterPassiveSkillComponent.js.map
