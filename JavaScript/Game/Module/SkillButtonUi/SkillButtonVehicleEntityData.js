"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonVehicleEntityData = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  SkillButtonData_1 = require("./SkillButtonData"),
  SkillButtonMapping_1 = require("./SkillButtonMapping");
class SkillButtonVehicleEntityData {
  constructor() {
    (this.EntityHandle = void 0),
      (this.TagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.PbDataId = 0),
      (this.SkillButtonConfigList = void 0),
      (this.SkillButtonDataMap = new Map()),
      (this.EnableTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableSkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.CustomHandleSkillButtonMapping =
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
        for (const o of this.tyo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonCdRefresh,
            o.GetButtonType(),
          );
        this.tyo.clear(),
          this.oyo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonDataRefresh,
              this.ryo,
            ),
            (this.oyo = !1));
      }),
      (this.uyo = (t, i) => {
        t = this.GetSkillButtonDataByEnableTag(t);
        if (t)
          for (const e of t) {
            let t = !1;
            var s = e.IsEnable();
            (s && i) ||
              ((t = i
                ? (e.SetEnable(!0, 1), !0)
                : (e.RefreshIsEnable(), e.IsEnable() !== s)) &&
                (this.$So.add(e), this.VXe()));
          }
      }),
      (this.Sri = (t, i) => {
        t = this.GetSkillButtonDataByDisableTag(t);
        if (t)
          for (const e of t) {
            let t = !1;
            var s = e.IsEnable();
            s === i &&
              (t = i
                ? (e.SetEnable(!1, 4), !0)
                : (e.RefreshIsEnable(), e.IsEnable() !== s)) &&
              (this.$So.add(e), this.VXe());
          }
      }),
      (this.cyo = (i, s) => {
        var t = this.GetSkillButtonDataByDisableSkillIdTag(i);
        if (t)
          for (const o of t) {
            let t = !1;
            var e,
              h = o.IsEnable();
            h === s &&
              (s
                ? (e = o.GetSkillId()) &&
                  o.GetDisableSkillIdTagIds().get(i)?.has(e) &&
                  (o.SetEnable(!1, 5), (t = !0))
                : (o.RefreshIsEnable(), (t = o.IsEnable() !== h)),
              t) &&
              (this.$So.add(o), this.VXe());
          }
      }),
      (this.myo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIdTag(t);
        if (s)
          for (const o of s) {
            var e = o.GetSkillId(),
              h =
                (i ? o.RefreshSkillIdByTag(t) : o.RefreshSkillId(),
                o.GetSkillId());
            e !== h &&
              (o.RefreshSkillTexturePath(),
              o.RefreshIsEnable(),
              this.JSo.add(o),
              this.VXe());
          }
      }),
      (this.dyo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIconTag(t);
        if (s)
          for (const o of s) {
            var e = o.GetSkillTexturePath(),
              h =
                (i
                  ? o.RefreshSkillTexturePathBySkillIconTag(t)
                  : o.RefreshSkillTexturePath(),
                o.GetSkillTexturePath());
            e !== h && (this.zSo.add(o), this.VXe());
          }
      }),
      (this.Cyo = (t, i) => {
        t = this.GetSkillButtonDataByDynamicEffectTag(t);
        if (t)
          for (const s of t)
            s.RefreshDynamicEffect(), this.ZSo.add(s), this.VXe();
      }),
      (this.Wpl = (t, i) => {
        var s,
          i = this.CustomHandleSkillButtonMapping?.Get(i);
        if (i)
          for (const e of i)
            e.CustomHandle &&
              (e.CustomHandle.RefreshByTagChanged(),
              e.CustomHandle.SkillCdModifyMark && (this.tyo.add(e), this.VXe()),
              e.CustomHandle.EnableModifyMark &&
                ((s = e.IsEnable()), e.RefreshIsEnable(), s !== e.IsEnable()) &&
                (this.$So.add(e), this.VXe()),
              e.CustomHandle.ClearModifyMark());
      });
  }
  Init(t) {
    var t = (this.EntityHandle = t).Entity,
      i = t.GetComponent(0);
    (this.PbDataId = i.GetPbDataId()),
      (this.TagComponent = t.GetComponent(203)),
      (this.SkillComponent = t.GetComponent(39));
    i =
      ConfigManager_1.ConfigManager.SkillButtonConfig.GetAllSkillVehicleButtonConfig(
        this.PbDataId,
      );
    if ((this.SkillButtonConfigList = i))
      for (const h of i) {
        var s = h.ButtonType,
          e = new SkillButtonData_1.SkillButtonData();
        this.SkillButtonDataMap.set(s, e),
          e.Refresh(this.EntityHandle, h, 2),
          this.EnableTagSkillButtonMapping.Add(e.GetEnableTagIds(), e),
          this.DisableTagSkillButtonMapping.Add(e.GetDisableTagIds(), e),
          this.DisableSkillIdTagSkillButtonMapping.Add(
            e.GetDisableSkillIdTagIds().keys(),
            e,
          ),
          this.DynamicEffectTagSkillButtonMapping.Add(
            e.DynamicEffectTagIdMap.keys(),
            e,
          ),
          this.SkillIconTagSkillButtonMapping.Add(e.SkillIconTagIds, e);
        for (const o of e.SkillIdTagMap.keys())
          this.SkillIdTagSkillButtonMapping.AddSingle(o, e);
      }
    if ((this.yyo(), this.SkillButtonDataMap)) {
      this.VXe();
      for (const n of this.SkillButtonDataMap.values()) this.JSo.add(n);
    }
  }
  yyo() {
    for (const i of this.SkillButtonDataMap.values())
      if (i.GetEntityHandle()) {
        for (const s of i.GetEnableTagIds()) this.Tyo(s, this.uyo);
        for (const e of i.GetDisableTagIds()) this.Tyo(e, this.Sri);
        for (const h of i.GetDisableSkillIdTagIds().keys())
          this.Tyo(h, this.cyo);
        for (const o of i.SkillIdTagMap.keys()) this.Tyo(o, this.myo);
        for (const n of i.SkillIconTagIds) this.Tyo(n, this.dyo);
        for (const r of i.DynamicEffectTagIdMap.keys()) this.Tyo(r, this.Cyo);
        var t = i.CustomHandle?.TagIds;
        if (t) for (const a of t) this.Qpl(a, this.Wpl);
      }
  }
  Tyo(t, i) {
    let s = void 0;
    (s =
      "string" == typeof t
        ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)
        : t) &&
      (t = this.TagComponent.ListenForTagAddOrRemove(s, i)) &&
      this.XSo.add(t);
  }
  Qpl(t, i) {
    t &&
      (t = this.TagComponent.ListenForTagAnyCountChanged(t, i)) &&
      this.XSo.add(t);
  }
  Clear() {
    if (this.EntityHandle?.Valid) {
      this.OXe();
      for (const t of this.XSo) t?.EndTask();
      this.XSo.clear();
    }
    for (const i of this.SkillButtonDataMap.values()) i.Reset();
    (this.SkillButtonDataMap = void 0),
      (this.DisableTagSkillButtonMapping = void 0),
      (this.DisableSkillIdTagSkillButtonMapping = void 0),
      (this.DynamicEffectTagSkillButtonMapping = void 0),
      (this.SkillIconTagSkillButtonMapping = void 0),
      (this.SkillIdTagSkillButtonMapping = void 0);
    for (const s of this.XSo) s?.EndTask();
    (this.XSo = void 0),
      (this.CustomHandleSkillButtonMapping = void 0),
      (this.EntityHandle = void 0),
      (this.PbDataId = 0),
      (this.TagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.SkillButtonConfigList = void 0);
  }
  VXe() {
    this.wXe ||
      (this.wXe = TimerSystem_1.TimerSystem.Next(
        this.GXe,
        SkillButtonVehicleEntityData.jXe,
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
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values())
      i.GetSkillId() === t &&
        (i.RefreshIsEnable(), this.tyo.add(i), this.VXe());
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.GetSkillId()),
      t.RefreshSkillId(),
      t.RefreshSkillTexturePath(),
      t.RefreshIsEnable(),
      i !== t.GetSkillId()) &&
      (this.JSo.add(t), this.VXe());
  }
  RefreshEnableByInputEvent(t, i) {
    for (const e of this.SkillButtonDataMap.values()) {
      var s;
      e.GetActionType() === t &&
        ((s = e.IsEnable()), e.RefreshIsEnable(), s !== e.IsEnable()) &&
        (this.$So.add(e), this.VXe());
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const e of this.SkillButtonDataMap.values()) {
      var s;
      e.GetActionType() === t &&
        ((s = e.IsVisible()),
        i ? e.RefreshIsVisible() : e.SetInvisible(),
        s !== e.IsVisible()) &&
        (this.YSo.add(e), this.VXe());
    }
  }
  RefreshEnableByButtonType(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.IsEnable()), t.RefreshIsEnable(), i !== t.IsEnable()) &&
      (this.$So.add(t), this.VXe());
  }
  RefreshVisibleByButtonType(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.IsVisible()), t.RefreshIsVisible(), i !== t.IsVisible()) &&
      (this.YSo.add(t), this.VXe());
  }
  GetSkillButtonDataByButton(t) {
    return this.SkillButtonDataMap.get(t);
  }
  GetBehaviorButtonDataByButton(t) {}
  GetSkillButtonDataBySkillId(t) {
    for (const i of this.SkillButtonDataMap.values())
      if (i.GetSkillId() === t) return i;
  }
  GetSkillButtonDataByEnableTag(t) {
    return this.EnableTagSkillButtonMapping.Get(t);
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
(exports.SkillButtonVehicleEntityData = SkillButtonVehicleEntityData).jXe =
  Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonVehicleEntityData.js.map
