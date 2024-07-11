"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let r;
    const a = arguments.length;
    let o =
      a < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, i, e, s);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (r = t[h]) && (o = (a < 3 ? r(o) : a > 3 ? r(i, e, o) : r(i, e)) || o);
    return a > 3 && o && Object.defineProperty(i, e, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPartComponent = exports.CharacterPart = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const GlobalData_1 = require("../../../../GlobalData");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
class CharacterPart {
  constructor(t, i, e) {
    (this.BaseEntity = void 0),
      (this.ActorComp = void 0),
      (this.TagComponent = void 0),
      (this.AttributeComp = void 0),
      (this.Index = 0),
      (this.PartTag = void 0),
      (this.ActiveTag = void 0),
      (this.BoneName = void 0),
      (this.SeparateDamage = !1),
      (this.IsWeakness = !1),
      (this.WeaknessTypeSet = void 0),
      (this.WeaknessAngle = 0),
      (this.InheritLife = !1),
      (this.LifeMax = 0),
      (this.Life = 0),
      (this.Active = !1),
      (this.PartSocketName = void 0),
      (this.IsPartStateVisible = !1),
      (this.IsShield = !1),
      (this.IsTransferDamage = !1),
      (this.BlockAngle = 0),
      (this.AttributeBuffList = void 0),
      (this.ScanEffect = ""),
      (this.ScanEffectSocketName = void 0),
      (this.ScanMaterialEffect = void 0),
      (this.IsWeaknessHit = !1),
      (this.HitBoneName = ""),
      (this.BaseEntity = t),
      (this.ActorComp = t.GetComponent(3)),
      (this.TagComponent = t.GetComponent(185)),
      (this.AttributeComp = t.GetComponent(156)),
      (this.Index = i),
      (this.PartTag = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
        e.部位标签.TagName,
      )),
      (this.ActiveTag =
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
          e.部位激活标签.TagName,
        )),
      (this.IsWeakness = e.是否弱点),
      (this.WeaknessAngle = e.弱点受击角度),
      (this.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(e.部位名)),
      (this.SeparateDamage = e.是否独立承伤),
      (this.InheritLife = e.继承生命值比例 > 0),
      (this.WeaknessTypeSet = new Set()),
      (this.PartSocketName = e.部位状态条骨骼插槽),
      (this.IsPartStateVisible = e.是否在目标创建时显示部位状态条),
      (this.IsShield = e.是否盾牌),
      (this.IsTransferDamage = e.是否传递伤害),
      (this.BlockAngle = e.格挡判定角度),
      (this.AttributeBuffList = []),
      (this.ScanEffect = e.被扫描播放特效.AssetPathName?.toString()),
      (this.ScanEffectSocketName = FNameUtil_1.FNameUtil.GetDynamicFName(
        e.扫描特效绑定骨骼名,
      )),
      (this.ScanMaterialEffect = e.扫描材质特效);
    for (let t = 0; t < e.弱点攻击类型.Num(); t++)
      this.WeaknessTypeSet.add(e.弱点攻击类型.Get(t));
    for (let t = 0; t < e.属性快照Buff列表.Num(); t++)
      this.AttributeBuffList.push(e.属性快照Buff列表.Get(t));
    this.InheritLife
      ? (this.LifeMax =
          this.AttributeComp.GetCurrentValue(EAttributeId.Tkn) *
          e.继承生命值比例)
      : (this.LifeMax = -1),
      (this.Life = this.LifeMax);
  }
  SetActive(t) {
    this.Active = t;
  }
  N$o(t) {
    this.Active !== t &&
      ((this.Active = t),
      this.Active
        ? this.TagComponent.AddTag(this.ActiveTag?.TagId ?? 0)
        : this.TagComponent.RemoveTag(this.ActiveTag?.TagId));
  }
  UpdatePartInfo(t, i = !0) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Part",
      this.BaseEntity,
      "UpdatePartInfo",
      ["TagName", this.PartTag.TagName],
      ["Activated", t.Lkn],
      ["LifeValue", t.d9n],
    ),
      this.N$o(t.Lkn),
      (this.LifeMax = t.Tkn),
      this.HandleChangeLife(t.d9n, i);
  }
  OnDamage(t, i, e, s = !0) {
    let r = !1;
    const a = this.ActorComp.Actor;
    const o = this.RemainedLifeRate();
    return (
      s &&
        ((this.Life -= t),
        (s = this.RemainedLifeRate()),
        GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(
          a,
          this.PartTag,
          o,
          s,
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.BaseEntity,
          EventDefine_1.EEventName.CharPartDamage,
          t,
          this,
        ),
        o > 0) &&
        s <= 0 &&
        (r = !0),
      i &&
        ((t = e.GetComponent(3).Actor),
        GlobalData_1.GlobalData.BpEventManager.角色部位弱点打击时.Broadcast(
          a,
          this.PartTag,
          t,
        )),
      r
    );
  }
  HandleChangeLife(t, i = !0) {
    let e;
    const s = this.Life - t;
    s != 0 &&
      ((e = this.RemainedLifeRate()), (this.Life = t), i) &&
      (e !== (t = this.RemainedLifeRate()) &&
        ((i = this.ActorComp.Actor),
        GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(
          i,
          this.PartTag,
          e,
          t,
        )),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.BaseEntity,
        EventDefine_1.EEventName.CharPartDamage,
        s,
        this,
      ));
  }
  RemainedLife() {
    return this.InheritLife ? (this.Life >= 0 ? this.Life : 0) : -1;
  }
  RemainedLifeRate() {
    return this.InheritLife ? this.RemainedLife() / this.LifeMax : -1;
  }
  ResetLife() {}
}
exports.CharacterPart = CharacterPart;
let CharacterPartComponent = class CharacterPartComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.BaseChar = void 0),
      (this.ActorComp = void 0),
      (this.TagComponent = void 0),
      (this.DtCharacterPart = void 0),
      (this.Parts = void 0),
      (this.PartMapByBone = void 0),
      (this.PartMapByTag = void 0),
      (this.WeaknessByBone = void 0),
      (this.GroupMapByBone = void 0),
      (this.Tjr = void 0),
      (this.Ljr = void 0),
      (this.Djr = !1);
  }
  get IsMultiPart() {
    return this.Djr;
  }
  OnInitData() {
    const t = this.Entity.GetComponent(0);
    return (
      (this.Ljr = t.ComponentDataMap.get("Nvs")?.Nvs),
      (this.Parts = []),
      (this.PartMapByBone = new Map()),
      (this.PartMapByTag = new Map()),
      (this.GroupMapByBone = new Map()),
      (this.WeaknessByBone = new Map()),
      (this.Tjr = []),
      !0
    );
  }
  OnInit() {
    return (
      (this.TagComponent = this.Entity.GetComponent(185)),
      this.Entity.GetComponent(3).Actor?.DtCharacterPart && (this.Djr = !0),
      !0
    );
  }
  OnActivate() {
    if (this.Djr) {
      (this.ActorComp = this.Entity.GetComponent(3)),
        (this.BaseChar = this.ActorComp.Actor),
        (this.DtCharacterPart = this.BaseChar.DtCharacterPart);
      const i = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(
        this.DtCharacterPart,
      );
      const e = this.Ljr;
      for (let t = 0; t < i.length; t++) {
        var s;
        const r = i[t];
        const a = new CharacterPart(this.Entity, t, r);
        const o =
          (this.Parts.push(a),
          this.PartMapByBone.set(r.部位名, a),
          r.骨骼名.Num());
        const h = a.IsWeakness;
        for (let t = 0; t < o; t++) {
          const n = r.骨骼名.Get(t);
          this.GroupMapByBone.set(n, r.部位名),
            h && this.WeaknessByBone.set(n, a);
        }
        this.TagComponent.RemoveTag(r.部位标签?.TagId),
          this.PartMapByTag.has(r.部位标签.TagName) &&
            CombatDebugController_1.CombatDebugController.CombatError(
              "Part",
              this.Entity,
              "部位标签重复注册",
              ["v", r.部位标签.TagName],
            ),
          this.PartMapByTag.set(r.部位标签.TagName, a),
          this.Tjr.push(this.Rjr(a, r.部位激活标签)),
          e
            ? (s = e.oSs[t]) && a.UpdatePartInfo(s)
            : (r.是否出生激活 &&
                (this.TagComponent.HasTag(r.部位激活标签.TagId) &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Character",
                    21,
                    "部位勾选了[是否出生激活]，但是在蓝图中提前加了标签，会导致标签添加时无法触发从无到有事件，引起功能失效",
                    ["角色", this.BaseChar.GetName()],
                    ["部位", r.部位名],
                  ),
                this.TagComponent.AddTag(r.部位激活标签?.TagId)),
              ((s = Protocol_1.Aki.Protocol.dGs.create()).d9n = a.Life),
              (s.Tkn = a.LifeMax),
              (s.o9n = a.Index),
              (s.Lkn = r.是否出生激活),
              (s.n7n = a.PartTag.TagId));
      }
    }
    return !0;
  }
  OnEnd() {
    if (this.Djr) for (const t of this.Tjr) t.EndTask();
    return !0;
  }
  IsWeakness(t) {
    t = this.WeaknessByBone.get(t);
    return !!t && t.Active;
  }
  GetPart(t) {
    t = this.GroupMapByBone.get(t);
    return this.PartMapByBone.get(t);
  }
  GetPartByTag(t) {
    const i = this.PartMapByTag.get(t.TagName);
    return (
      i ||
        CombatDebugController_1.CombatDebugController.CombatError(
          "Part",
          this.Entity,
          "获取部位失败",
          ["TagName", t.TagName],
        ),
      i
    );
  }
  GetPartByIndex(t) {
    if (!(t < 0 || t >= this.Parts.length)) return this.Parts[t];
    CombatDebugController_1.CombatDebugController.CombatError(
      "Part",
      this.Entity,
      "获取部位失败",
      ["index", t],
    );
  }
  Rjr(e, t) {
    return this.TagComponent.ListenForTagAddOrRemove(t?.TagId, (t, i) => {
      e.SetActive(i);
    });
  }
  static PartUpdateNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToNumber(i.rkn);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e) {
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Part",
        t,
        "PartUpdateNotify",
        ["data", JSON.stringify(i)],
      );
      const s = e.Entity.GetComponent(58);
      for (const r of i.aSs) s.GetPartByIndex(r.o9n)?.UpdatePartInfo(r);
    }
  }
  static PartComponentInitNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToNumber(i.rkn);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e) {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Part",
        t,
        "PartComponentInitNotify",
      );
      const s = e.Entity.GetComponent(58);
      for (const r of i.Nvs.oSs) s.GetPartByIndex(r.o9n)?.UpdatePartInfo(r);
    }
  }
  GetDebugText() {
    let t = "";
    for (const i of this.Parts)
      t +=
        "\n\t\t" +
        i.Index +
        " " +
        i.PartTag?.TagName +
        " : " +
        i.Life +
        ", " +
        i.Active;
    return t;
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("KOn", !1)],
  CharacterPartComponent,
  "PartUpdateNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("QOn")],
    CharacterPartComponent,
    "PartComponentInitNotify",
    null,
  ),
  (CharacterPartComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(58)],
    CharacterPartComponent,
  )),
  (exports.CharacterPartComponent = CharacterPartComponent);
// # sourceMappingURL=CharacterPartComponent.js.map
