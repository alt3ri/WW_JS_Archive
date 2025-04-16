"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var a,
      h = arguments.length,
      r =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, e, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (a = t[o]) && (r = (h < 3 ? a(r) : 3 < h ? a(i, e, r) : a(i, e)) || r);
    return 3 < h && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPartComponent = exports.CharacterPart = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  GlobalData_1 = require("../../../../GlobalData"),
  CombatLog_1 = require("../../../../Utils/CombatLog");
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
      (this.CombinePartSocketName = void 0),
      (this.IsWeaknessHit = !1),
      (this.HitBoneName = ""),
      (this.BaseEntity = t),
      (this.ActorComp = t.GetComponent(3)),
      (this.TagComponent = t.GetComponent(203)),
      (this.AttributeComp = t.GetComponent(171)),
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
      (this.InheritLife = 0 < e.继承生命值比例),
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
      (this.ScanMaterialEffect = e.扫描材质特效),
      (this.CombinePartSocketName = e.合体骨骼名);
    for (let t = 0; t < e.弱点攻击类型.Num(); t++)
      this.WeaknessTypeSet.add(e.弱点攻击类型.Get(t));
    for (let t = 0; t < e.属性快照Buff列表.Num(); t++)
      this.AttributeBuffList.push(e.属性快照Buff列表.Get(t));
    this.InheritLife
      ? (this.LifeMax =
          this.AttributeComp.GetCurrentValue(EAttributeId.l5n) *
          e.继承生命值比例)
      : (this.LifeMax = -1),
      (this.Life = this.LifeMax);
  }
  SetActive(t) {
    this.Active = t;
  }
  bYo(t) {
    this.Active !== t &&
      ((this.Active = t),
      this.Active
        ? this.TagComponent.AddTag(this.ActiveTag?.TagId ?? 0)
        : this.TagComponent.RemoveTag(this.ActiveTag?.TagId));
  }
  UpdatePartInfo(t, i = !0) {
    CombatLog_1.CombatLog.Info(
      "Part",
      this.BaseEntity,
      "UpdatePartInfo",
      ["TagName", this.PartTag.TagName],
      ["Activated", t._5n],
      ["LifeValue", t.eWn],
    ),
      this.bYo(t._5n),
      (this.LifeMax = t.l5n),
      this.HandleChangeLife(t.eWn, i);
  }
  OnDamage(t, i, e, s = !0) {
    let a = !1;
    var h = this.ActorComp.Actor,
      r = this.RemainedLifeRate();
    return (
      s &&
        ((this.Life -= t),
        (s = this.RemainedLifeRate()),
        GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(
          h,
          this.PartTag,
          r,
          s,
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.BaseEntity,
          EventDefine_1.EEventName.CharPartDamage,
          t,
          this,
        ),
        0 < r) &&
        s <= 0 &&
        (a = !0),
      i &&
        ((t = e.GetComponent(3).Actor),
        GlobalData_1.GlobalData.BpEventManager.角色部位弱点打击时.Broadcast(
          h,
          this.PartTag,
          t,
        )),
      a
    );
  }
  HandleChangeLife(t, i = !0) {
    var e,
      s = this.Life - t;
    0 != s &&
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
    return this.InheritLife ? (0 <= this.Life ? this.Life : 0) : -1;
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
      (this.PartMapByCombineBone = void 0),
      (this.njr = void 0),
      (this.sjr = void 0),
      (this.ajr = !1);
  }
  get IsMultiPart() {
    return this.ajr;
  }
  OnInitData() {
    var t = this.Entity.GetComponent(0);
    return (
      (this.sjr = t.ComponentDataMap.get("_ys")?._ys),
      (this.Parts = []),
      (this.PartMapByBone = new Map()),
      (this.PartMapByTag = new Map()),
      (this.GroupMapByBone = new Map()),
      (this.WeaknessByBone = new Map()),
      (this.njr = []),
      !0
    );
  }
  OnInit() {
    return (
      (this.TagComponent = this.Entity.GetComponent(203)),
      this.Entity.GetComponent(3).Actor?.DtCharacterPart && (this.ajr = !0),
      !0
    );
  }
  OnActivate() {
    if (this.ajr) {
      (this.ActorComp = this.Entity.GetComponent(3)),
        (this.BaseChar = this.ActorComp.Actor),
        (this.DtCharacterPart = this.BaseChar.DtCharacterPart);
      var i = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(
          this.DtCharacterPart,
        ),
        e = this.sjr;
      for (let t = 0; t < i.length; t++) {
        var s,
          a = i[t],
          h = new CharacterPart(this.Entity, t, a),
          r =
            (this.Parts.push(h),
            this.PartMapByBone.set(a.部位名, h),
            a.骨骼名.Num()),
          o = h.IsWeakness;
        for (let t = 0; t < r; t++) {
          var n = a.骨骼名.Get(t);
          this.GroupMapByBone.set(n, a.部位名),
            o && this.WeaknessByBone.set(n, h);
        }
        this.TagComponent.RemoveTag(a.部位标签?.TagId),
          this.PartMapByTag.has(a.部位标签.TagName) &&
            CombatLog_1.CombatLog.Error(
              "Part",
              this.Entity,
              "部位标签重复注册",
              ["v", a.部位标签.TagName],
            ),
          this.PartMapByTag.set(a.部位标签.TagName, h),
          this.njr.push(this.hjr(h, a.部位激活标签)),
          FNameUtil_1.FNameUtil.IsNothing(a.合体骨骼名) ||
            (this.PartMapByCombineBone ||
              (this.PartMapByCombineBone = new Map()),
            this.PartMapByCombineBone.set(a.合体骨骼名.toString(), h)),
          e
            ? (s = e.PTs[t]) && h.UpdatePartInfo(s)
            : (a.是否出生激活 &&
                (this.TagComponent.HasTag(a.部位激活标签.TagId) &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Character",
                    20,
                    "部位勾选了[是否出生激活]，但是在蓝图中提前加了标签，会导致标签添加时无法触发从无到有事件，引起功能失效",
                    ["角色", this.BaseChar.GetName()],
                    ["部位", a.部位名],
                  ),
                this.TagComponent.AddTag(a.部位激活标签?.TagId)),
              ((s = Protocol_1.Aki.Protocol.lFs.create()).eWn = h.Life),
              (s.l5n = h.LifeMax),
              (s.jjn = h.Index),
              (s._5n = a.是否出生激活),
              (s.WWn = h.PartTag.TagId));
      }
    }
    return !0;
  }
  OnEnd() {
    if (this.ajr) for (const t of this.njr) t.EndTask();
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
    var i = this.PartMapByTag.get(t.TagName);
    return (
      i ||
        CombatLog_1.CombatLog.Error("Part", this.Entity, "获取部位失败", [
          "TagName",
          t.TagName,
        ]),
      i
    );
  }
  GetPartByIndex(t) {
    if (!(t < 0 || t >= this.Parts.length)) return this.Parts[t];
    CombatLog_1.CombatLog.Error("Part", this.Entity, "获取部位失败", [
      "index",
      t,
    ]);
  }
  GetPartByCombineBoneName(t) {
    if (this.PartMapByCombineBone) return this.PartMapByCombineBone.get(t);
  }
  hjr(e, t) {
    return this.TagComponent.ListenForTagAddOrRemove(t?.TagId, (t, i) => {
      e.SetActive(i);
    });
  }
  static PartUpdateNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToNumber(i.F4n),
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e) {
      var s = e.Entity.GetComponent(68);
      for (const a of i.xTs) s.GetPartByIndex(a.jjn)?.UpdatePartInfo(a);
    }
  }
  static PartComponentInitNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToNumber(i.F4n),
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e) {
      CombatLog_1.CombatLog.Info("Part", t, "PartComponentInitNotify");
      var s = e.Entity.GetComponent(68);
      for (const a of i._ys.PTs) s.GetPartByIndex(a.jjn)?.UpdatePartInfo(a);
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
  [CombatMessage_1.CombatNet.Listen("RFn", !1)],
  CharacterPartComponent,
  "PartUpdateNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("xFn", !1)],
    CharacterPartComponent,
    "PartComponentInitNotify",
    null,
  ),
  (CharacterPartComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(68)],
    CharacterPartComponent,
  )),
  (exports.CharacterPartComponent = CharacterPartComponent);
//# sourceMappingURL=CharacterPartComponent.js.map
