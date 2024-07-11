"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiMergeHeadStateData =
    exports.MergeHeadStateMonsterInfo =
    exports.MergeHeadStateInfo =
      void 0);
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const EMPTY_STR = "";
class MergeHeadStateInfo {
  constructor() {
    (this.Id = 0),
      (this.TreeId = void 0),
      (this.NodeId = 0),
      (this.MonsterGroupName = void 0),
      (this.IsVisible = !1),
      (this.TotalHp = 0),
      (this.TotalHpMax = 0),
      (this.MonsterInfos = new Map());
  }
}
exports.MergeHeadStateInfo = MergeHeadStateInfo;
class MergeHeadStateMonsterInfo {
  constructor() {
    (this.Id = 0),
      (this.PbDataId = 0),
      (this.EntityHandle = void 0),
      (this.IsDead = !1),
      (this.BaseLife = 0),
      (this.AttributeComponent = void 0),
      (this.FightTagListenTask = void 0),
      (this.HasFightTag = !1),
      (this.Hp = 0),
      (this.HpMax = 0),
      (this.$Ke = (t, e) => {
        this.HasFightTag !== e &&
          ((this.HasFightTag = e),
          ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterFightTagChange(
            this.Id,
            e,
          ));
      }),
      (this.YKe = (t, e, i) => {
        const s = this.Hp;
        (this.Hp = e),
          this.HpMax <= 0 ||
            ((e = ((this.Hp - s) / this.HpMax) * this.BaseLife),
            ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(
              this.Id,
              e,
            ));
      }),
      (this.JKe = (t, e, i) => {
        const s = this.HpMax;
        this.HpMax = e;
        let r = 0;
        let h = (s > 0 && (r = this.Hp / s), 0);
        e =
          ((h = this.HpMax > 0 ? this.Hp / this.HpMax : h) - r) * this.BaseLife;
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(
          this.Id,
          e,
        );
      });
  }
  AddListener() {
    (this.FightTagListenTask || this.AttributeComponent) &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "[合并怪物血条]重复添加进战监听", [
          "entityId",
          this.EntityHandle.Id,
        ]),
      this.RemoveListener());
    let t = this.EntityHandle.Entity.GetComponent(185);
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "[合并怪物血条]监听的实体不存在tagComponent",
            ["entityId", this.EntityHandle.Id],
          ),
        !1
      );
    if (
      ((this.AttributeComponent = this.EntityHandle.Entity.GetComponent(156)),
      !this.AttributeComponent)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "[合并怪物血条]监听的实体不存在AttributeComponent",
            ["entityId", this.EntityHandle.Id],
          ),
        !1
      );
    (this.FightTagListenTask = t.ListenForTagAddOrRemove(1996802261, this.$Ke)),
      (this.HasFightTag = t.HasTag(1996802261));
    t = this.AttributeComponent;
    return (
      t.AddListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.YKe,
      ),
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.JKe),
      !0
    );
  }
  RemoveListener() {
    let t;
    this.FightTagListenTask &&
      (this.FightTagListenTask.EndTask(), (this.FightTagListenTask = void 0)),
      this.AttributeComponent &&
        ((t = this.AttributeComponent).RemoveListener(
          CharacterAttributeTypes_1.EAttributeId.Proto_Life,
          this.YKe,
        ),
        t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.JKe),
        (this.AttributeComponent = void 0));
  }
}
exports.MergeHeadStateMonsterInfo = MergeHeadStateMonsterInfo;
class BattleUiMergeHeadStateData {
  constructor() {
    (this.zKe = 0),
      (this.InfoMap = new Map()),
      (this.ListenMonsterAddMap = new Map()),
      (this.ListenMonsterRemoveMap = new Map());
  }
  Init() {}
  OnLeaveLevel() {
    if (!(this.ListenMonsterRemoveMap.size <= 0)) {
      for (const e of this.ListenMonsterRemoveMap.values()) {
        (e.EntityHandle = void 0), this.ZKe(e);
        const t = this.InfoMap.get(e.Id);
        if (!t)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "[合并怪物血条]移除实体时InfoId错误",
              ["id", e.Id],
            )
          );
        e.HasFightTag && ((e.HasFightTag = !1), (t.IsVisible = !1));
      }
      this.ListenMonsterRemoveMap.clear();
    }
  }
  Clear() {
    for (const t of this.InfoMap.values()) this.eQe(t);
    this.InfoMap.clear(),
      this.ListenMonsterAddMap.clear(),
      this.ListenMonsterRemoveMap.clear();
  }
  UpdateProgress(t, e, i, s) {
    if (i) {
      for (const r of this.InfoMap.values())
        if (r.TreeId === t && r.NodeId === e) return void this.tQe(r, i);
      this.iQe(t, e, i, s);
    }
  }
  RemoveTree(t) {
    for (const e of this.InfoMap.values()) e.TreeId === t && this.eQe(e);
  }
  RemoveNode(t, e) {
    for (const i of this.InfoMap.values())
      if (i.TreeId === t && i.NodeId === e) return void this.eQe(i);
  }
  OnAddEntity(s) {
    if (!(this.ListenMonsterAddMap.size <= 0)) {
      let r = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(s);
      const h = this.ListenMonsterAddMap.get(r);
      if (h) {
        this.ListenMonsterAddMap.delete(r), (h.EntityHandle = s), this.oQe(h);
        r = this.InfoMap.get(h.Id);
        if (r) {
          let i = !1;
          if (h.AttributeComponent) {
            var s = h.AttributeComponent.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_Life,
            );
            const o = h.AttributeComponent.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Tkn,
            );
            if (s !== h.Hp || o !== h.HpMax) {
              let t = 0;
              let e = (h.HpMax > 0 && (t = h.Hp / h.HpMax), 0);
              o > 0 && (e = s / o),
                (r.TotalHp += (e - t) * h.BaseLife),
                (h.Hp = s),
                (h.HpMax = o),
                (i = !0);
            }
          }
          r.IsVisible
            ? i && this.rQe(r)
            : h.HasFightTag && ((r.IsVisible = !0), this.nQe(r));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "[合并怪物血条]添加实体时InfoId错误",
              ["id", h.Id],
            );
      }
    }
  }
  OnRemoveEntity(t) {
    let e;
    this.ListenMonsterRemoveMap.size <= 0 ||
      ((e = this.ListenMonsterRemoveMap.get(t.Id)) &&
        (this.ListenMonsterRemoveMap.delete(t.Id),
        (e.EntityHandle = void 0),
        this.ZKe(e),
        (t = this.InfoMap.get(e.Id))
          ? e.HasFightTag && ((e.HasFightTag = !1), this.UpdateVisible(t, !0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "[合并怪物血条]移除实体时InfoId错误",
              ["id", e.Id],
            )));
  }
  iQe(t, e, i, s) {
    const r = new MergeHeadStateInfo();
    this.zKe++,
      (r.Id = this.zKe),
      (r.TreeId = t),
      (r.NodeId = e),
      (r.MonsterGroupName = s ?? EMPTY_STR);
    for (const o of i.ovs)
      for (const a of o._vs) {
        const h = new MergeHeadStateMonsterInfo();
        (h.Id = r.Id),
          (h.PbDataId = a.jkn),
          (h.IsDead = a.ckn === 2),
          (h.BaseLife = MathUtils_1.MathUtils.LongToNumber(a.rvs)),
          (h.EntityHandle =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
              h.PbDataId,
            )),
          h.EntityHandle?.Valid
            ? (this.oQe(h),
              h.AttributeComponent &&
                ((h.Hp = h.AttributeComponent.GetCurrentValue(
                  CharacterAttributeTypes_1.EAttributeId.Proto_Life,
                )),
                (h.HpMax = h.AttributeComponent.GetCurrentValue(
                  CharacterAttributeTypes_1.EAttributeId.Tkn,
                ))))
            : (h.IsDead
                ? (h.Hp = 0)
                : (this.ListenMonsterAddMap.set(h.PbDataId, h),
                  (h.Hp = h.BaseLife)),
              (h.HpMax = h.BaseLife)),
          r.MonsterInfos.set(h.PbDataId, h);
      }
    for (const n of r.MonsterInfos.values())
      n.HpMax > 0 && (r.TotalHp += (n.Hp / n.HpMax) * n.BaseLife),
        (r.TotalHpMax += n.BaseLife);
    this.UpdateVisible(r, !1),
      this.InfoMap.set(r.Id, r),
      r.IsVisible && this.nQe(r);
  }
  tQe(t, e) {
    for (const s of e.ovs)
      for (const r of s._vs) {
        const i = t.MonsterInfos.get(r.jkn);
        i
          ? i.IsDead ||
            ((i.IsDead = r.ckn === 2),
            i.IsDead &&
              (this.ZKe(i),
              (i.Hp === 0 && i.HpMax === i.BaseLife) ||
                (i.HpMax > 0 && (t.TotalHp -= (i.Hp / i.HpMax) * i.BaseLife),
                (i.Hp = 0),
                (i.HpMax = i.BaseLife),
                this.rQe(t))))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "[合并怪物血条]更新怪物数据时与缓存对不上",
            );
      }
  }
  eQe(t) {
    for (const e of t.MonsterInfos.values())
      e.RemoveListener(),
        e.EntityHandle
          ? this.ListenMonsterRemoveMap.delete(e.EntityHandle.Id)
          : this.ListenMonsterAddMap.delete(e.PbDataId);
    t.IsVisible && ((t.IsVisible = !1), this.nQe(t)), this.InfoMap.delete(t.Id);
  }
  oQe(t) {
    t.AddListener() && this.ListenMonsterRemoveMap.set(t.EntityHandle.Id, t);
  }
  ZKe(t) {
    t.RemoveListener(), t.IsDead || this.ListenMonsterAddMap.set(t.PbDataId, t);
  }
  OnMonsterFightTagChange(t, e) {
    const i = this.InfoMap.get(t);
    i
      ? i.IsVisible !== e &&
        (e ? ((i.IsVisible = !0), this.nQe(i)) : this.UpdateVisible(i, !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "[合并怪物血条]更新进战时InfoId错误", [
          "id",
          t,
        ]);
  }
  UpdateVisible(t, e) {
    let i = !1;
    for (const s of t.MonsterInfos.values())
      if (s.HasFightTag) {
        i = !0;
        break;
      }
    t.IsVisible !== i && ((t.IsVisible = i), e) && this.nQe(t);
  }
  nQe(t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged,
      t,
    );
  }
  OnMonsterHealthChange(t, e) {
    const i = this.InfoMap.get(t);
    i
      ? ((i.TotalHp += e), this.rQe(i))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "[合并怪物血条]更新血量时InfoId错误", [
          "id",
          t,
        ]);
  }
  rQe(t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged,
      t,
    );
  }
}
exports.BattleUiMergeHeadStateData = BattleUiMergeHeadStateData;
// # sourceMappingURL=BattleUiMergeHeadStateData.js.map
