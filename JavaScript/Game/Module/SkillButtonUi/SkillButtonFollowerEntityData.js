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
      (this.GameplayTagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.SkillButtonConfigList = void 0),
      (this.SkillButtonDataMap = new Map()),
      (this.DisableTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableSkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DynamicEffectTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIconTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.XSo = new Set()),
      (this.wXe = void 0),
      (this.$So = new Set()),
      (this.YSo = new Set()),
      (this.JSo = new Set()),
      (this.zSo = new Set()),
      (this.ZSo = new Set()),
      (this.tyo = new Set()),
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
        for (const e of this.zSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
            e.GetButtonType(),
          );
        this.zSo.clear();
        for (const h of this.ZSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
            h.GetButtonType(),
          );
        this.ZSo.clear();
        for (const n of this.tyo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonCdRefresh,
            n.GetButtonType(),
          );
        this.tyo.clear(),
          this.oyo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonDataRefresh,
              this.ryo,
            ),
            (this.oyo = !1));
      }),
      (this.Sri = (t, i) => {
        t = this.GetSkillButtonDataByDisableTag(t);
        if (t)
          for (const e of t) {
            let t = !1;
            var s = e.IsEnable();
            s === i &&
              ((t = i
                ? (e.SetEnable(!1, 4), !0)
                : (e.RefreshIsEnable(), e.IsEnable() !== s)),
              this.IsEnable && t) &&
              (this.$So.add(e), this.VXe());
          }
      }),
      (this.cyo = (i, s) => {
        var t = this.GetSkillButtonDataByDisableSkillIdTag(i);
        if (t)
          for (const n of t) {
            let t = !1;
            var e,
              h = n.IsEnable();
            h === s &&
              (s
                ? (e = n.GetSkillId()) &&
                  n.GetDisableSkillIdTagIds().get(i)?.has(e) &&
                  (n.SetEnable(!1, 5), (t = !0))
                : (n.RefreshIsEnable(), (t = n.IsEnable() !== h)),
              this.IsEnable && t) &&
              (this.$So.add(n), this.VXe());
          }
      }),
      (this.myo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIdTag(t);
        if (s)
          for (const n of s) {
            var e = n.GetSkillId(),
              h =
                (i ? n.RefreshSkillIdByTag(t) : n.RefreshSkillId(),
                n.GetSkillId());
            e !== h &&
              (n.RefreshSkillTexturePath(),
              n.RefreshIsEnable(),
              this.IsEnable) &&
              (this.JSo.add(n), this.VXe());
          }
      }),
      (this.dyo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIconTag(t);
        if (s)
          for (const n of s) {
            var e,
              h = n.GetSkillTexturePath();
            i
              ? ((e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
                n.RefreshSkillTexturePathBySkillIconTag(e))
              : n.RefreshSkillTexturePath(),
              this.IsEnable &&
                h !== n.GetSkillTexturePath() &&
                (this.zSo.add(n), this.VXe());
          }
      }),
      (this.Cyo = (t, i) => {
        t = this.GetSkillButtonDataByDynamicEffectTag(t);
        if (t)
          for (const s of t)
            s.RefreshDynamicEffect(),
              this.IsEnable && (this.ZSo.add(s), this.VXe());
      });
  }
  Init(t, i) {
    (t = (this.EntityHandle = t).Entity),
      (this.IsEnable = i),
      (i = t.GetComponent(0)),
      (this.PbDataId = i.GetPbDataId()),
      (this.GameplayTagComponent = t.GetComponent(190)),
      (this.SkillComponent = t.GetComponent(34)),
      (i = ConfigManager_1.ConfigManager.SkillButtonConfig);
    (this.SkillButtonConfigList = i.GetAllSkillFollowerButtonConfig(
      this.PbDataId,
    )),
      this.vyo(),
      this.c$e(),
      this.IsEnable && this.RefreshAllSkillButton();
  }
  SetEnable(t) {
    (this.IsEnable = t), this.OXe(), this.RefreshAllSkillButton();
  }
  RefreshAllSkillButton() {
    if (this.SkillButtonDataMap)
      for (const t of this.SkillButtonDataMap.values())
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
          t.GetButtonType(),
        );
  }
  Clear() {
    this.Eyo();
    for (const t of this.SkillButtonDataMap.values()) t.Reset();
    (this.SkillButtonDataMap = void 0),
      (this.DisableTagSkillButtonMapping = void 0),
      (this.DisableSkillIdTagSkillButtonMapping = void 0),
      (this.DynamicEffectTagSkillButtonMapping = void 0),
      (this.SkillIconTagSkillButtonMapping = void 0),
      (this.SkillIdTagSkillButtonMapping = void 0);
    for (const i of this.XSo) i?.EndTask();
    (this.XSo = void 0),
      (this.EntityHandle = void 0),
      (this.PbDataId = 0),
      (this.GameplayTagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.SkillButtonConfigList = void 0);
  }
  vyo() {
    if (!(this.PbDataId <= 0)) {
      var t = this.SkillButtonConfigList;
      if (t)
        for (const e of t) {
          var i = e.ButtonType,
            s = new SkillButtonData_1.SkillButtonData();
          this.SkillButtonDataMap.set(i, s), this.Syo(s, e);
        }
    }
  }
  Syo(t, i) {
    t.Refresh(this.EntityHandle, i, 1),
      this.DisableTagSkillButtonMapping.Add(t.GetDisableTagIds(), t),
      this.DisableSkillIdTagSkillButtonMapping.Add(
        t.GetDisableSkillIdTagIds().keys(),
        t,
      ),
      this.DynamicEffectTagSkillButtonMapping.Add(
        t.DynamicEffectTagIdMap.keys(),
        t,
      ),
      this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
    for (const s of t.SkillIdTagMap.keys())
      this.SkillIdTagSkillButtonMapping.AddSingle(s, t);
  }
  c$e() {
    this.yyo();
  }
  yyo() {
    if (!(this.PbDataId <= 0))
      for (const t of this.SkillButtonDataMap.values())
        if (t.GetEntityHandle()) {
          for (const i of t.GetDisableTagIds()) this.Tyo(i, this.Sri);
          for (const s of t.GetDisableSkillIdTagIds().keys())
            this.Tyo(s, this.cyo);
          for (const e of t.SkillIdTagMap.keys()) this.Tyo(e, this.myo);
          for (const h of t.SkillIconTagIds) this.Tyo(h, this.dyo);
          for (const n of t.DynamicEffectTagIdMap.keys()) this.Tyo(n, this.Cyo);
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
      this.tyo.clear());
  }
  RefreshSkillButtonData(t) {
    this.oyo
      ? t < this.ryo && (this.ryo = t)
      : ((this.oyo = !0), (this.ryo = t), this.VXe());
  }
  RefreshEnableByInputEvent(t, i) {
    for (const e of this.SkillButtonDataMap.values()) {
      var s;
      e.GetActionType() === t &&
        ((s = e.IsEnable()),
        e.RefreshIsEnable(),
        this.IsEnable && s !== e.IsEnable()) &&
        (this.$So.add(e), this.VXe());
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const e of this.SkillButtonDataMap.values()) {
      var s;
      e.GetActionType() === t &&
        ((s = e.IsVisible()),
        i ? e.RefreshIsVisible() : e.SetInvisible(),
        this.IsEnable && s !== e.IsVisible()) &&
        (this.YSo.add(e), this.VXe());
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
  Eyo() {
    this.EntityHandle?.Valid && (this.OXe(), this.Lyo());
  }
  Lyo() {
    for (const t of this.XSo) t?.EndTask();
    this.XSo.clear();
  }
  GetSkillButtonDataByButton(t) {
    return this.SkillButtonDataMap.get(t);
  }
  GetBehaviorButtonDataByButton(t) {}
  GetSkillButtonDataBySkillId(t) {
    for (const i of this.SkillButtonDataMap.values())
      if (i.GetSkillId() === t) return i;
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
