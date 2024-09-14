"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonEntityData = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Stats_1 = require("../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BehaviorButtonData_1 = require("./BehaviorButtonData"),
  BehaviorButtonMapping_1 = require("./BehaviorButtonMapping"),
  SkillButtonData_1 = require("./SkillButtonData"),
  SkillButtonMapping_1 = require("./SkillButtonMapping"),
  SkillButtonUiController_1 = require("./SkillButtonUiController"),
  SkillButtonUiDefine_1 = require("./SkillButtonUiDefine"),
  buttonTypeToActionNameMap = new Map([
    [101, InputEnums_1.EInputAction.瞄准],
    [102, InputEnums_1.EInputAction.锁定目标],
  ]),
  commonRoleSkillButtonTypes = new Set([4, 6, 8, 11]);
class SkillButtonEntityData {
  constructor() {
    (this.IsCurEntity = !1),
      (this.EntityHandle = void 0),
      (this.RoleId = 0),
      (this.RoleConfig = void 0),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.CharacterSkillCdComponent = void 0),
      (this.SkillButtonConfigList = void 0),
      (this.SkillCommonButtonConfigList = void 0),
      (this.SkillButtonIndexConfig = void 0),
      (this.SkillButtonDataMap = new Map()),
      (this.BehaviorButtonDataMap = new Map()),
      (this.AttributeIdSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.AttributeIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.EnableTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DisableSkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.HiddenTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.DynamicEffectTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIconTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.KSo = new BehaviorButtonMapping_1.BehaviorButtonMapping()),
      (this.QSo = new BehaviorButtonMapping_1.BehaviorButtonMapping()),
      (this.XSo = new Set()),
      (this.GYe = new Map()),
      (this.wXe = void 0),
      (this.$So = new Set()),
      (this.YSo = new Set()),
      (this.JSo = new Set()),
      (this.zSo = new Set()),
      (this.ZSo = new Set()),
      (this.eyo = new Set()),
      (this.tyo = new Set()),
      (this.pdt = new Set()),
      (this.iyo = !1),
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
        this.pdt.clear();
        for (const r of this.eyo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
            r.ButtonType,
          );
        this.eyo.clear(),
          this.iyo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
            ),
            (this.iyo = !1)),
          this.oyo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonDataRefresh,
              this.ryo,
            ),
            (this.oyo = !1));
      }),
      (this.nyo = (t, i) => {
        var s,
          h = this.SkillButtonDataMap.get(7);
        h &&
          h.IsUseItem &&
          ((s = h.IsEnable()), h.RefreshIsEnable(), this.IsCurEntity) &&
          (s !== h.IsEnable() && this.$So.add(h), this.VXe());
      }),
      (this.syo = () => {
        var t,
          i,
          s,
          h,
          e = this.SkillButtonDataMap.get(9);
        e &&
          ((t = e.GetSkillId()),
          (i = e.GetSkillTexturePath()),
          e.RefreshSkillId(),
          e.RefreshSkillTexturePath(),
          (s = e.GetSkillId()),
          (h = e.GetSkillTexturePath()),
          t !== s &&
            (e.RefreshIsEnable(), this.IsCurEntity) &&
            (this.JSo.add(e), this.VXe()),
          i !== h) &&
          this.IsCurEntity &&
          (this.zSo.add(e), this.VXe());
      }),
      (this.ayo = (t, i) => {
        var s,
          h = this.SkillButtonDataMap.get(9);
        h &&
          !h.GetIsVisionEnableInAir() &&
          ((s = h.IsEnable()),
          h.RefreshIsEnable(),
          this.IsCurEntity && h.IsEnable() !== s) &&
          (this.$So.add(h), this.VXe());
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
              this.IsCurEntity &&
                (this.pdt.add(n),
                s !== n.IsEnable() && this.$So.add(n),
                this.VXe()));
          }
      }),
      (this.uyo = (t, i) => {
        t = this.GetSkillButtonDataByEnableTag(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.IsEnable();
            (s && i) ||
              ((t = i
                ? (h.SetEnable(!0, 1), !0)
                : (h.RefreshIsEnable(), h.IsEnable() !== s)),
              this.IsCurEntity && t && (this.$So.add(h), this.VXe()));
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
              this.IsCurEntity && t) &&
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
              this.IsCurEntity && t) &&
              (this.$So.add(o), this.VXe());
          }
      }),
      (this.Jrt = (t, i) => {
        t = this.GetSkillButtonDataByHiddenTag(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.IsVisible();
            s === i &&
              ((t =
                i && !h.FormationData?.IgnoreHiddenTag
                  ? (h.SetInvisible(), !0)
                  : (h.RefreshIsVisible(), h.IsVisible() !== s)),
              this.IsCurEntity && t) &&
              (this.YSo.add(h), this.VXe());
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
              this.IsCurEntity) &&
              (this.JSo.add(o), this.VXe());
          }
      }),
      (this.dyo = (t, i) => {
        var s = this.GetSkillButtonDataBySkillIconTag(t);
        if (s)
          for (const o of s) {
            var h,
              e = o.GetSkillTexturePath();
            i
              ? ((h = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
                o.RefreshSkillTexturePathBySkillIconTag(h))
              : o.RefreshSkillTexturePath(),
              this.IsCurEntity &&
                e !== o.GetSkillTexturePath() &&
                (this.zSo.add(o), this.VXe());
          }
      }),
      (this.Cyo = (t, i) => {
        t = this.GetSkillButtonDataByDynamicEffectTag(t);
        if (t)
          for (const s of t)
            s.RefreshDynamicEffect(),
              this.IsCurEntity && (this.ZSo.add(s), this.VXe());
      }),
      (this.gyo = (t, i) => {
        var s, h;
        this.IsCurEntity &&
          ((h = Info_1.Info.OperationType),
          (s = ModelManager_1.ModelManager.SkillButtonUiModel),
          (h = 2 === h),
          i
            ? ((i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
              s.RefreshSkillButtonIndexByTag(this.SkillButtonIndexConfig, i, h))
            : s.RefreshSkillButtonIndex(
                this.SkillButtonIndexConfig,
                this.EntityHandle,
                h,
              ),
          (this.iyo = !0),
          this.VXe());
      }),
      (this.fyo = (t, i) => {
        t = this.QSo.Get(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.IsVisible;
            s === i &&
              ((t = i
                ? !(h.IsVisible = !1)
                : (h.RefreshIsVisible(
                    this.GameplayTagComponent,
                    this.RoleConfig,
                  ),
                  h.IsVisible !== s)),
              this.IsCurEntity && t) &&
              (this.eyo.add(h), this.VXe());
          }
      }),
      (this.pyo = (t, i) => {
        t = this.KSo.Get(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.IsVisible;
            s !== i &&
              ((t = i
                ? (h.IsVisible = !0)
                : (h.RefreshIsVisible(
                    this.GameplayTagComponent,
                    this.RoleConfig,
                  ),
                  h.IsVisible !== s)),
              this.IsCurEntity && t) &&
              (this.eyo.add(h), this.VXe());
          }
      }),
      (this._yo = (t, i, s) => {
        if ((this.RefreshSkillButtonEnableByAttributeId(t), this.IsCurEntity)) {
          t = this.GetSkillButtonDataByAttributeId(t);
          if (t) {
            for (const h of t) this.pdt.add(h);
            this.VXe();
          }
        }
      });
  }
  Init(t, i) {
    (t = (this.EntityHandle = t).Entity),
      (this.IsCurEntity = i),
      (this.RoleId =
        SkillButtonUiController_1.SkillButtonUiController.GetRoleId(t)),
      (this.RoleConfig = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.RoleId,
      )),
      (this.AttributeComponent = t.GetComponent(159)),
      (this.GameplayTagComponent = t.GetComponent(190)),
      (this.SkillComponent = t.GetComponent(34)),
      (this.CharacterSkillCdComponent = t.GetComponent(192)),
      (i = ConfigManager_1.ConfigManager.SkillButtonConfig);
    (this.SkillButtonConfigList = i.GetAllSkillButtonConfig(this.RoleId)),
      (this.SkillCommonButtonConfigList = i.GetAllSkillCommonButtonConfig()),
      (2 === this.RoleConfig.RoleType &&
        ((this.SkillButtonIndexConfig = i.GetSkillIndexConfig(this.RoleId)),
        this.SkillButtonIndexConfig)) ||
        (this.SkillButtonIndexConfig = i.GetSkillIndexConfig(0)),
      this.vyo(),
      this.Myo(),
      this.c$e();
  }
  OnChangeRole(t) {
    if ((this.IsCurEntity = t))
      for (const i of this.SkillButtonDataMap.values())
        i.RefreshSkillTexturePath();
    else this.OXe();
  }
  Clear() {
    this.Eyo();
    for (const t of this.SkillButtonDataMap.values()) t.Reset();
    (this.SkillButtonDataMap = void 0),
      this.BehaviorButtonDataMap.clear(),
      (this.BehaviorButtonDataMap = void 0),
      (this.AttributeIdSkillButtonMapping = void 0),
      (this.AttributeIdTagSkillButtonMapping = void 0),
      (this.EnableTagSkillButtonMapping = void 0),
      (this.DisableTagSkillButtonMapping = void 0),
      (this.DisableSkillIdTagSkillButtonMapping = void 0),
      (this.HiddenTagSkillButtonMapping = void 0),
      (this.DynamicEffectTagSkillButtonMapping = void 0),
      (this.SkillIconTagSkillButtonMapping = void 0),
      (this.SkillIdTagSkillButtonMapping = void 0);
    for (const i of this.XSo) i?.EndTask();
    (this.XSo = void 0),
      (this.GYe = void 0),
      (this.KSo = void 0),
      (this.QSo = void 0),
      (this.EntityHandle = void 0),
      (this.RoleId = void 0),
      (this.AttributeComponent = void 0),
      (this.GameplayTagComponent = void 0),
      (this.SkillComponent = void 0),
      (this.CharacterSkillCdComponent = void 0),
      (this.SkillButtonConfigList = void 0),
      (this.SkillCommonButtonConfigList = void 0),
      (this.SkillButtonIndexConfig = void 0);
  }
  vyo() {
    for (const a of SkillButtonUiDefine_1.skillButtonActionList) {
      var t = new SkillButtonData_1.SkillButtonData();
      this.SkillButtonDataMap.set(a, t);
    }
    if (!(this.RoleId <= 0)) {
      var i = 1 === this.RoleConfig.RoleType,
        s = this.SkillButtonConfigList,
        h = this.SkillCommonButtonConfigList;
      if (s)
        for (const l of s) {
          var e = l.ButtonType,
            o = this.GetSkillButtonDataByButton(e);
          i && !commonRoleSkillButtonTypes.has(e)
            ? CombatLog_1.CombatLog.Error(
                "BattleUi",
                this.EntityHandle?.Entity,
                "技能按钮配置错误，常规角色的不允许配置该技能类型",
                ["roleId", this.RoleId],
                ["ButtonType", e],
              )
            : o && this.Syo(o, l);
        }
      if (h)
        for (const f of h) {
          var n = f.ButtonType,
            r = this.GetSkillButtonDataByButton(n);
          r &&
            void 0 === r.Config &&
            (this.Syo(r, f), 11 === n) &&
            (r.SetDefaultHidden(!0),
            (n = this.GetSkillButtonDataByButton(4)) &&
              ((r.DefaultSkillId = n.DefaultSkillId), r.RefreshSkillId()),
            r.RefreshIsVisible(),
            r.RefreshIsEnable());
        }
    }
  }
  Syo(t, i) {
    t.Refresh(this.EntityHandle, i, 0),
      this.AttributeIdSkillButtonMapping.AddSingle(t.AttributeId, t),
      this.AttributeIdSkillButtonMapping.AddSingle(t.MaxAttributeId, t);
    for (const s of t.AttributeIdTagMap.keys())
      this.AttributeIdTagSkillButtonMapping.AddSingle(s, t);
    this.EnableTagSkillButtonMapping.Add(t.GetEnableTagIds(), t),
      this.DisableTagSkillButtonMapping.Add(t.GetDisableTagIds(), t),
      this.DisableSkillIdTagSkillButtonMapping.Add(
        t.GetDisableSkillIdTagIds().keys(),
        t,
      ),
      this.HiddenTagSkillButtonMapping.Add(t.GetHiddenTagIds(), t),
      this.DynamicEffectTagSkillButtonMapping.Add(
        t.DynamicEffectTagIdMap.keys(),
        t,
      ),
      this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
    for (const h of t.SkillIdTagMap.keys())
      this.SkillIdTagSkillButtonMapping.AddSingle(h, t);
    t.GetActionType() === InputEnums_1.EInputAction.幻象2 &&
      this.SkillIdTagSkillButtonMapping.AddSingle(
        SkillButtonData_1.controlVisionTagId,
        t,
      );
  }
  Myo() {
    for (var [t, i] of buttonTypeToActionNameMap) {
      var s = new BehaviorButtonData_1.BehaviorButtonData();
      s.Refresh(t, i, this.GameplayTagComponent, this.RoleConfig),
        this.BehaviorButtonDataMap.set(t, s),
        0 !== s.VisibleTagId && this.KSo.AddSingle(s.VisibleTagId, s),
        this.QSo.Add(s.HiddenTagIds, s);
    }
  }
  c$e() {
    this.yyo(),
      this.Iyo(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
        this.syo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        this.nyo,
      );
  }
  yyo() {
    if (!(this.RoleId <= 0)) {
      for (const s of this.SkillButtonDataMap.values())
        if (s.GetEntityHandle()) {
          for (const h of s.AttributeIdTagMap.keys()) this.Tyo(h, this.hyo);
          for (const e of s.GetEnableTagIds()) this.Tyo(e, this.uyo);
          for (const o of s.GetDisableTagIds()) this.Tyo(o, this.Sri);
          for (const n of s.GetDisableSkillIdTagIds().keys())
            this.Tyo(n, this.cyo);
          for (const r of s.GetHiddenTagIds()) this.Tyo(r, this.Jrt);
          for (const a of s.SkillIdTagMap.keys()) this.Tyo(a, this.myo);
          for (const l of s.SkillIconTagIds) this.Tyo(l, this.dyo);
          for (const f of s.DynamicEffectTagIdMap.keys()) this.Tyo(f, this.Cyo);
        }
      this.Tyo(40422668, this.ayo),
        this.Tyo(SkillButtonData_1.controlVisionTagId, this.syo);
      for (const v of this.KSo.GetAllKey()) this.Tyo(v, this.pyo);
      for (const u of this.QSo.GetAllKey()) this.Tyo(u, this.fyo);
      var t = this.SkillButtonIndexConfig;
      if (t) {
        var i = Info_1.Info.OperationType;
        if (2 === i)
          for (const _ of t.DesktopButtonTypeMap.keys()) this.Tyo(_, this.gyo);
        if (1 === i)
          for (const S of t.PadButtonTypeMap.keys()) this.Tyo(S, this.gyo);
      }
    }
  }
  Iyo() {
    if (!(this.RoleId <= 0))
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
  lyo(t, i) {
    this.AttributeComponent.AddListener(t, i, "SkillButtonUiController"),
      this.GYe.set(t, i);
  }
  VXe() {
    this.wXe ||
      (this.wXe = TimerSystem_1.TimerSystem.Next(
        this.GXe,
        SkillButtonEntityData.jXe,
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
      this.pdt.clear(),
      this.eyo.clear(),
      (this.iyo = !1));
  }
  RefreshSkillButtonData(t) {
    this.oyo
      ? t < this.ryo && (this.ryo = t)
      : ((this.oyo = !0), (this.ryo = t), this.VXe());
  }
  RefreshSkillButtonEnableByAttributeId(t) {
    t = this.GetSkillButtonDataByAttributeId(t);
    if (t)
      for (const s of t) {
        var i = s.IsEnable();
        s.RefreshIsEnable(),
          this.IsCurEntity &&
            i !== s.IsEnable() &&
            (this.$So.add(s), this.VXe());
      }
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.GetSkillId()),
      t.RefreshSkillId(),
      t.RefreshSkillTexturePath(),
      t.RefreshIsEnable(),
      this.IsCurEntity
        ? i !== t.GetSkillId() && (this.JSo.add(t), this.VXe())
        : t.SetExploreSkillChange(!1));
  }
  RefreshEnableByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      h.GetActionType() === t &&
        ((s = h.IsEnable()),
        h.RefreshIsEnable(),
        this.IsCurEntity && s !== h.IsEnable()) &&
        (this.$So.add(h), this.VXe());
    }
  }
  RefreshVisibleByInputEvent(t, i) {
    for (const h of this.SkillButtonDataMap.values()) {
      var s;
      h.GetActionType() === t &&
        ((s = h.IsVisible()),
        i ? h.RefreshIsVisible() : h.SetInvisible(),
        this.IsCurEntity && s !== h.IsVisible()) &&
        (this.YSo.add(h), this.VXe());
    }
  }
  RefreshEnableByButtonType(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.IsEnable()), t.RefreshIsEnable(), this.IsCurEntity) &&
      i !== t.IsEnable() &&
      (this.$So.add(t), this.VXe());
  }
  RefreshVisibleByButtonType(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.IsVisible()), t.RefreshIsVisible(), this.IsCurEntity) &&
      i !== t.IsVisible() &&
      (this.YSo.add(t), this.VXe());
  }
  RefreshSkillTexturePath(t) {
    var i,
      t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.GetSkillTexturePath()),
      t.RefreshSkillTexturePath(),
      this.IsCurEntity) &&
      i !== t.GetSkillTexturePath() &&
      (this.zSo.add(t), this.VXe());
  }
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values())
      i.GetSkillId() === t &&
        (i.RefreshIsEnable(), this.IsCurEntity) &&
        (this.tyo.add(i), this.VXe());
  }
  ExecuteMultiSkillIdChanged(t, i) {
    let s = void 0;
    if (0 !== i) {
      if (
        !(s = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)
      )
        return;
    } else s = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
    s &&
      (s.RefreshIsEnable(), this.IsCurEntity) &&
      (this.tyo.add(s), this.zSo.add(s), this.VXe());
  }
  ExecuteMultiSkillEnable(t, i) {
    let s = void 0;
    if (0 !== i) {
      if (
        !(s = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)
      )
        return;
    } else s = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
    s &&
      (s.RefreshIsEnable(), this.IsCurEntity) &&
      (this.tyo.add(s), this.VXe());
  }
  Eyo() {
    this.EntityHandle?.Valid &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
        this.syo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        this.nyo,
      ),
      this.OXe(),
      this.Lyo(),
      this.Dyo());
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
  GetBehaviorButtonDataByButton(t) {
    return this.BehaviorButtonDataMap.get(t);
  }
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
  GetSkillButtonDataByEnableTag(t) {
    return this.EnableTagSkillButtonMapping.Get(t);
  }
  GetSkillButtonDataByHiddenTag(t) {
    return this.HiddenTagSkillButtonMapping.Get(t);
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
(exports.SkillButtonEntityData = SkillButtonEntityData).jXe =
  Stats_1.Stat.Create("SkillButtonEntityDataNextTick");
//# sourceMappingURL=SkillButtonEntityData.js.map
