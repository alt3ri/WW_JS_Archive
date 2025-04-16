"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonFollowerEntityData = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  SkillButtonData_1 = require("./SkillButtonData"),
  SkillButtonMapping_1 = require("./SkillButtonMapping");
class SkillButtonFollowerEntityData {
  constructor() {
    (this.IsEnable = !1),
      (this.EntityHandle = void 0),
      (this.PbDataId = 0),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.SkillButtonConfigList = void 0),
      (this.SkillButtonDataMap = new Map()),
      (this.AttributeIdSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.AttributeIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableSkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.CustomHandleSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.NotOccupyTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DynamicEffectTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIconTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.XSo = new Set()),
      (this.GYe = new Map()),
      (this.wXe = void 0),
      (this.$So = new Set()),
      (this.YSo = new Set()),
      (this.JSo = new Set()),
      (this.zSo = new Set()),
      (this.ZSo = new Set()),
      (this.tyo = new Set()),
      (this.pdt = new Set()),
      (this.oyo = !1),
      (this.ryo = 4),
      (this.GXe = () => {
        this.wXe = void 0;
        for (const t of this.$So)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
            t.GetButtonType(),
            -1,
          );
        this.$So.clear();
        for (const i of this.YSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
            i.GetButtonType(),
          );
        this.YSo.clear();
        for (const s of this.JSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
            s.GetButtonType(),
          );
        this.JSo.clear();
        for (const h of this.zSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
            h.GetButtonType(),
          );
        this.zSo.clear();
        for (const e of this.ZSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
            e.GetButtonType(),
          );
        this.ZSo.clear();
        for (const o of this.tyo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonCdRefresh,
            o.GetButtonType(),
          );
        this.tyo.clear();
        for (const n of this.pdt)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
            n.GetButtonType(),
          );
        this.pdt.clear(),
          this.oyo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonDataRefresh,
              this.ryo,
            ),
            (this.oyo = !1));
      }),
      (this.hyo = (t, i) => {
        t = this.AttributeIdTagSkillButtonMapping.Get(t);
        if (t)
          for (const n of t) {
            var s = n.AttributeId,
              h = n.MaxAttributeId,
              e = (n.RefreshAttributeId(), n.AttributeId),
              o = n.MaxAttributeId;
            (s === e && h === o) ||
              (n.RefreshFrameSpriteColor(),
              this.AttributeIdSkillButtonMapping.RemoveSingle(s, n),
              this.AttributeIdSkillButtonMapping.RemoveSingle(h, n),
              0 < e &&
                (this.AttributeIdSkillButtonMapping.AddSingle(e, n),
                this.AttributeIdSkillButtonMapping.AddSingle(o, n),
                this.GYe.has(e) || this.lyo(e, this._yo),
                this.GYe.has(o) || this.lyo(o, this._yo)),
              (s = n.IsEnable()),
              n.RefreshIsEnable(),
              this.pdt.add(n),
              s !== n.IsEnable() && this.$So.add(n),
              this.VXe());
          }
      }),
      (this.Sri = (t, i) => {
        t = this.GetSkillButtonDataByDisableTag(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.IsEnable();
            s === i &&
              ((t = i
                ? (h.SetEnable(!1, 4), !0)
                : (h.RefreshIsEnable(), h.IsEnable() !== s)),
              this.IsEnable && t) &&
              (this.$So.add(h), this.VXe());
          }
      }),
      (this.cyo = (i, s) => {
        var t = this.GetSkillButtonDataByDisableSkillIdTag(i);
        if (t)
          for (const o of t) {
            let t = !1;
            var h,
              e = o.IsEnable();
            e === s &&
              (s
                ? (h = o.GetSkillId()) &&
                  o.GetDisableSkillIdTagIds().get(i)?.has(h) &&
                  (o.SetEnable(!1, 5), (t = !0))
                : (o.RefreshIsEnable(), (t = o.IsEnable() !== e)),
              this.IsEnable && t) &&
              (this.$So.add(o), this.VXe());
          }
      }),
      (this.qY_ = (t, i) => {
        t = this.NotOccupyTagSkillButtonMapping.Get(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.IsOccupy();
            s === i &&
              (t = i
                ? (h.SetNotOccupy(), !0)
                : (h.RefreshIsOccupy(), h.IsOccupy() !== s)) &&
              (this.JSo.add(h), this.VXe());
          }
      }),
      (this.myo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIdTag(t);
        if (s)
          for (const o of s) {
            var h = o.GetSkillId(),
              e =
                (i ? o.RefreshSkillIdByTag(t) : o.RefreshSkillId(),
                o.GetSkillId());
            h !== e &&
              (o.RefreshSkillTexturePath(),
              o.RefreshIsEnable(),
              this.IsEnable) &&
              (this.JSo.add(o), this.VXe());
          }
      }),
      (this.dyo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIconTag(t);
        if (s)
          for (const e of s) {
            var h = e.GetSkillTexturePath();
            i
              ? e.RefreshSkillTexturePathBySkillIconTag(t)
              : e.RefreshSkillTexturePath(),
              this.IsEnable &&
                h !== e.GetSkillTexturePath() &&
                (this.zSo.add(e), this.VXe());
          }
      }),
      (this.Cyo = (t, i) => {
        t = this.GetSkillButtonDataByDynamicEffectTag(t);
        if (t)
          for (const s of t)
            s.RefreshDynamicEffect(),
              this.IsEnable && (this.ZSo.add(s), this.VXe());
      }),
      (this.Wpl = (t, i) => {
        var s,
          i = this.CustomHandleSkillButtonMapping?.Get(i);
        if (i)
          for (const h of i)
            h.CustomHandle &&
              (h.CustomHandle.RefreshByTagChanged(),
              h.CustomHandle.SkillCdModifyMark && (this.tyo.add(h), this.VXe()),
              h.CustomHandle.EnableModifyMark &&
                ((s = h.IsEnable()), h.RefreshIsEnable(), s !== h.IsEnable()) &&
                (this.$So.add(h), this.VXe()),
              h.CustomHandle.ClearModifyMark());
      }),
      (this._yo = (t, i, s) => {
        this.RefreshSkillButtonEnableByAttributeId(t);
        t = this.GetSkillButtonDataByAttributeId(t);
        if (t) {
          for (const h of t) this.pdt.add(h);
          this.VXe();
        }
      });
  }
  Init(t, i) {
    (t = (this.EntityHandle = t).Entity),
      (this.IsEnable = i),
      (i = t.GetComponent(0)),
      (this.PbDataId = i.GetPbDataId()),
      (this.AttributeComponent = t.GetComponent(171)),
      (this.GameplayTagComponent = t.GetComponent(203)),
      (this.SkillComponent = t.GetComponent(39)),
      (i = ConfigManager_1.ConfigManager.SkillButtonConfig);
    (this.SkillButtonConfigList = i.GetAllSkillFollowerButtonConfig(
      this.PbDataId,
    )),
      this.vyo(),
      this.c$e(),
      this.IsEnable && this.RefreshAllSkillButton();
  }
  SetEnable(t) {
    (this.IsEnable = t), this.RefreshAllSkillButton();
  }
  RefreshAllSkillButton() {
    if (this.SkillButtonDataMap) {
      this.VXe();
      for (const t of this.SkillButtonDataMap.values()) this.JSo.add(t);
    }
  }
  Clear() {
    this.Eyo();
    for (const t of this.SkillButtonDataMap.values()) t.Reset();
    (this.SkillButtonDataMap = void 0),
      (this.AttributeIdSkillButtonMapping = void 0),
      (this.AttributeIdTagSkillButtonMapping = void 0),
      (this.DisableTagSkillButtonMapping = void 0),
      (this.DisableSkillIdTagSkillButtonMapping = void 0),
      (this.NotOccupyTagSkillButtonMapping = void 0),
      (this.DynamicEffectTagSkillButtonMapping = void 0),
      (this.SkillIconTagSkillButtonMapping = void 0),
      (this.SkillIdTagSkillButtonMapping = void 0);
    for (const i of this.XSo) i?.EndTask();
    (this.XSo = void 0),
      (this.GYe = void 0),
      (this.CustomHandleSkillButtonMapping = void 0),
      (this.EntityHandle = void 0),
      (this.PbDataId = 0),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.SkillButtonConfigList = void 0);
  }
  vyo() {
    if (!(this.PbDataId <= 0)) {
      var t = this.SkillButtonConfigList;
      if (t)
        for (const h of t) {
          var i = h.ButtonType,
            s = new SkillButtonData_1.SkillButtonData();
          this.SkillButtonDataMap.set(i, s), this.Syo(s, h);
        }
    }
  }
  Syo(t, i) {
    t.Refresh(this.EntityHandle, i, 1),
      this.AttributeIdSkillButtonMapping.AddSingle(t.AttributeId, t),
      this.AttributeIdSkillButtonMapping.AddSingle(t.MaxAttributeId, t);
    for (const s of t.AttributeIdTagMap.keys())
      this.AttributeIdTagSkillButtonMapping.AddSingle(s, t);
    this.DisableTagSkillButtonMapping.Add(t.GetDisableTagIds(), t),
      this.DisableSkillIdTagSkillButtonMapping.Add(
        t.GetDisableSkillIdTagIds().keys(),
        t,
      ),
      this.NotOccupyTagSkillButtonMapping.Add(t.GetNotOccupyTagIds(), t),
      this.DynamicEffectTagSkillButtonMapping.Add(
        t.DynamicEffectTagIdMap.keys(),
        t,
      ),
      this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
    for (const h of t.SkillIdTagMap.keys())
      this.SkillIdTagSkillButtonMapping.AddSingle(h, t);
    t.CustomHandle &&
      0 < t.CustomHandle.TagIds.length &&
      this.CustomHandleSkillButtonMapping.Add(t.CustomHandle.TagIds, t);
  }
  c$e() {
    this.yyo(), this.Iyo();
  }
  yyo() {
    if (!(this.PbDataId <= 0))
      for (const i of this.SkillButtonDataMap.values())
        if (i.GetEntityHandle()) {
          for (const s of i.AttributeIdTagMap.keys()) this.Tyo(s, this.hyo);
          for (const h of i.GetDisableTagIds()) this.Tyo(h, this.Sri);
          for (const e of i.GetDisableSkillIdTagIds().keys())
            this.Tyo(e, this.cyo);
          for (const o of i.GetNotOccupyTagIds()) this.Tyo(o, this.qY_);
          for (const n of i.SkillIdTagMap.keys()) this.Tyo(n, this.myo);
          for (const r of i.SkillIconTagIds) this.Tyo(r, this.dyo);
          for (const a of i.DynamicEffectTagIdMap.keys()) this.Tyo(a, this.Cyo);
          var t = i.CustomHandle?.TagIds;
          if (t) for (const f of t) this.Qpl(f, this.Wpl);
        }
  }
  Iyo() {
    for (const s of this.SkillButtonDataMap.values()) {
      var t, i;
      s.GetEntityHandle() &&
        ((t = s.AttributeId),
        (i = s.MaxAttributeId),
        !t ||
          t <= 0 ||
          !i ||
          i <= 0 ||
          (this.lyo(t, this._yo), this.lyo(i, this._yo)));
    }
  }
  Tyo(t, i) {
    let s = void 0;
    (s =
      "string" == typeof t
        ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)
        : t) &&
      (t = this.GameplayTagComponent.ListenForTagAddOrRemove(s, i)) &&
      this.XSo.add(t);
  }
  Qpl(t, i) {
    t &&
      (t = this.GameplayTagComponent.ListenForTagAnyCountChanged(t, i)) &&
      this.XSo.add(t);
  }
  lyo(t, i) {
    this.AttributeComponent.AddListener(t, i, "SkillButtonUiController"),
      this.GYe.set(t, i);
  }
  VXe() {
    this.wXe ||
      (this.wXe = TimerSystem_1.TimerSystem.Next(
        this.GXe,
        SkillButtonFollowerEntityData.jXe,
      ));
  }
  OXe() {
    this.wXe ||
      (TimerSystem_1.TimerSystem.Has(this.wXe) &&
        TimerSystem_1.TimerSystem.Remove(this.wXe),
      (this.wXe = void 0),
      this.$So.clear(),
      this.YSo.clear(),
      this.JSo.clear(),
      this.zSo.clear(),
      this.ZSo.clear(),
      this.tyo.clear(),
      this.pdt.clear());
  }
  RefreshSkillButtonData(t) {
    this.oyo
      ? t < this.ryo && (this.ryo = t)
      : ((this.oyo = !0), (this.ryo = t), this.VXe());
  }
  RefreshSkillButtonEnableByAttributeId(t) {
    t = this.GetSkillButtonDataByAttributeId(t);
    if (t)
      for (const h of t) {
        var i = h.IsEnable(),
          s = (h.RefreshIsEnable(), h.IsEnable());
        i !== s && (this.$So.add(h), this.VXe());
      }
  }
  RefreshEnableByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      h.GetActionType() === t &&
        ((s = h.IsEnable()),
        h.RefreshIsEnable(),
        this.IsEnable && s !== h.IsEnable()) &&
        (this.$So.add(h), this.VXe());
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      h.GetActionType() === t &&
        ((s = h.IsVisible()),
        i ? h.RefreshIsVisible() : h.SetInvisible(),
        this.IsEnable && s !== h.IsVisible()) &&
        (this.YSo.add(h), this.VXe());
    }
  }
  RefreshEnableByButtonType(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.IsEnable()), t.RefreshIsEnable(), this.IsEnable) &&
      i !== t.IsEnable() &&
      (this.$So.add(t), this.VXe());
  }
  RefreshVisibleByButtonType(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.IsVisible()), t.RefreshIsVisible(), this.IsEnable) &&
      i !== t.IsVisible() &&
      (this.YSo.add(t), this.VXe());
  }
  RefreshSkillTexturePath(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.GetSkillTexturePath()),
      t.RefreshSkillTexturePath(),
      this.IsEnable) &&
      i !== t.GetSkillTexturePath() &&
      (this.zSo.add(t), this.VXe());
  }
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values())
      i.GetSkillId() === t &&
        (i.RefreshIsEnable(), this.IsEnable) &&
        i.IsOccupy() &&
        (this.tyo.add(i), this.VXe());
  }
  Eyo() {
    this.EntityHandle?.Valid && (this.OXe(), this.Lyo(), this.Dyo());
  }
  Lyo() {
    for (const t of this.XSo) t?.EndTask();
    this.XSo.clear();
  }
  Dyo() {
    for (var [t, i] of this.GYe) this.AttributeComponent.RemoveListener(t, i);
  }
  GetSkillButtonDataByButton(t) {
    return this.SkillButtonDataMap.get(t);
  }
  GetBehaviorButtonDataByButton(t) {}
  GetSkillButtonDataBySkillId(t) {
    for (const i of this.SkillButtonDataMap.values())
      if (i.GetSkillId() === t) return i;
  }
  GetSkillButtonDataByAttributeId(t) {
    return this.AttributeIdSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDisableTag(t) {
    return this.DisableTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDisableSkillIdTag(t) {
    return this.DisableSkillIdTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataBySkillIdTag(t) {
    return this.SkillIdTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataBySkillIconTag(t) {
    return this.SkillIconTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByDynamicEffectTag(t) {
    return this.DynamicEffectTagSkillButtonMapping.Get(t);
  }
}
(exports.SkillButtonFollowerEntityData = SkillButtonFollowerEntityData).jXe =
  Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonFollowerEntityData.js.map
