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
      (this.Cvl = void 0),
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
      (this.ConfigShowLongPressTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIconTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.SkillIdTagSkillButtonMapping =
        new SkillButtonMapping_1.SkillButtonMapping()),
      (this.CustomHandleSkillButtonMapping =
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
      (this.vvl = new Set()),
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
        for (const n of this.tyo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonCdRefresh,
            n.GetButtonType(),
          );
        this.tyo.clear();
        for (const o of this.pdt)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
            o.GetButtonType(),
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
        for (const a of this.vvl)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonLongPressRefresh,
            a.GetButtonType(),
          );
        this.vvl.clear();
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
      (this.M6l = (t) => {
        t.IsRolePassenger(!0) && this.Ai_(!0, t);
      }),
      (this.E6l = (t) => {
        t.IsRolePassenger(!0) && this.Ai_(!1, t);
      }),
      (this.yKl = (t, i) => {
        i === InputEnums_1.EInputAction.跳跃
          ? (this.RefreshEnableByButtonType(1),
            t ||
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SkillLongPressEnd,
                InputEnums_1.EInputAction.跳跃,
              ))
          : i === InputEnums_1.EInputAction.闪避
            ? this.RefreshEnableByButtonType(5)
            : i === InputEnums_1.EInputAction.技能1 &&
              this.RefreshEnableByButtonType(6);
      }),
      (this.H6l = (t, i) => {
        var s = this.SkillButtonDataMap.get(5);
        s &&
          ((s.RemainingCountVehicleSkill = i),
          this.RefreshEnableByButtonType(5),
          this.IsCurEntity) &&
          (this.tyo.add(s), this.VXe());
      }),
      (this.hyo = (t, i) => {
        t = this.AttributeIdTagSkillButtonMapping.Get(t);
        if (t)
          for (const o of t) {
            var s = o.AttributeId,
              h = o.MaxAttributeId,
              e = (o.RefreshAttributeId(), o.AttributeId),
              n = o.MaxAttributeId;
            (s === e && h === n) ||
              (o.RefreshFrameSpriteColor(),
              this.AttributeIdSkillButtonMapping.RemoveSingle(s, o),
              this.AttributeIdSkillButtonMapping.RemoveSingle(h, o),
              0 < e &&
                (this.AttributeIdSkillButtonMapping.AddSingle(e, o),
                this.AttributeIdSkillButtonMapping.AddSingle(n, o),
                this.GYe.has(e) || this.lyo(e, this._yo),
                this.GYe.has(n) || this.lyo(n, this._yo)),
              (s = o.IsEnable()),
              o.RefreshIsEnable(),
              this.IsCurEntity &&
                (this.pdt.add(o),
                s !== o.IsEnable() && this.$So.add(o),
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
            var s = h.IsEnable();
            s === i &&
              (h.RefreshIsEnable(),
              (s = h.IsEnable() !== s),
              this.IsCurEntity && s) &&
              (this.$So.add(h), this.VXe());
          }
      }),
      (this.cyo = (i, s) => {
        var t = this.GetSkillButtonDataByDisableSkillIdTag(i);
        if (t)
          for (const n of t) {
            let t = !1;
            var h,
              e = n.IsEnable();
            e === s &&
              (s
                ? (h = n.GetSkillId()) &&
                  n.GetDisableSkillIdTagIds().get(i)?.has(h) &&
                  (n.SetEnable(!1, 5), (t = !0))
                : (n.RefreshIsEnable(), (t = n.IsEnable() !== e)),
              this.IsCurEntity && t) &&
              (this.$So.add(n), this.VXe());
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
          for (const n of s) {
            var h = n.GetSkillId(),
              e =
                (i ? n.RefreshSkillIdByTag(t) : n.RefreshSkillId(),
                n.GetSkillId());
            h !== e &&
              (n.RefreshSkillTexturePath(),
              n.RefreshIsEnable(),
              this.IsCurEntity) &&
              (this.JSo.add(n), this.VXe());
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
              this.IsCurEntity &&
                h !== e.GetSkillTexturePath() &&
                (this.zSo.add(e), this.VXe());
          }
      }),
      (this.Cyo = (t, i) => {
        t = this.GetSkillButtonDataByDynamicEffectTag(t);
        if (t)
          for (const s of t)
            s.RefreshDynamicEffect(),
              this.IsCurEntity && (this.ZSo.add(s), this.VXe());
      }),
      (this.hyc = (t, i) => {
        t = this.ConfigShowLongPressTagSkillButtonMapping?.Get(t);
        if (t)
          for (const h of t) {
            let t = !1;
            var s = h.GetIsConfigShowLongPress();
            if (i) {
              if (s) continue;
              h.SetIsConfigShowLongPress(!0), (t = !0);
            } else
              h.RefreshConfigIsShowLongPress(),
                (t = h.GetIsConfigShowLongPress() !== s);
            this.IsCurEntity && t && (this.vvl.add(h), this.VXe());
          }
      }),
      (this.Wpl = (t, i) => {
        var s,
          i = this.CustomHandleSkillButtonMapping?.Get(i);
        if (i)
          for (const h of i)
            if (h.CustomHandle) {
              if ((h.CustomHandle.RefreshByTagChanged(), !this.IsCurEntity))
                return void h.CustomHandle.ClearModifyMark();
              h.CustomHandle.SkillCdModifyMark && (this.tyo.add(h), this.VXe()),
                h.CustomHandle.EnableModifyMark &&
                  ((s = h.IsEnable()),
                  h.RefreshIsEnable(),
                  s !== h.IsEnable()) &&
                  (this.$So.add(h), this.VXe()),
                h.CustomHandle.ClearModifyMark();
            }
      }),
      (this.iO_ = (t, i) => {
        var s,
          h = this.GetSkillButtonDataByButton(7);
        h &&
          ((s = h.IsExploreAsFight),
          h.RefreshIsExploreAsFight(),
          s !== h.IsExploreAsFight) &&
          ((s = h.IsEnable()), h.RefreshIsEnable(), this.IsCurEntity) &&
          s !== h.IsEnable() &&
          (this.$So.add(h), this.VXe());
      }),
      (this.gyo = (t, i) => {
        this.IsCurEntity &&
          (ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonIndexByTag(
            this.SkillButtonIndexConfig,
            this.EntityHandle,
            t,
            i,
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
      (this.AttributeComponent = t.GetComponent(171)),
      (this.GameplayTagComponent = t.GetComponent(203)),
      (this.SkillComponent = t.GetComponent(39)),
      (this.CharacterSkillCdComponent = t.GetComponent(205)),
      (this.Cvl = t.GetComponent(226)),
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
      (this.ConfigShowLongPressTagSkillButtonMapping = void 0),
      (this.SkillIconTagSkillButtonMapping = void 0),
      (this.SkillIdTagSkillButtonMapping = void 0);
    for (const i of this.XSo) i?.EndTask();
    (this.XSo = void 0),
      (this.GYe = void 0),
      (this.KSo = void 0),
      (this.QSo = void 0),
      (this.CustomHandleSkillButtonMapping = void 0),
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
    for (const f of SkillButtonUiDefine_1.skillButtonActionList) {
      var t = new SkillButtonData_1.SkillButtonData();
      this.SkillButtonDataMap.set(f, t);
    }
    if (!(this.RoleId <= 0)) {
      var i = 1 === this.RoleConfig.RoleType,
        s = this.SkillButtonConfigList,
        h = this.SkillCommonButtonConfigList,
        e =
          ModelManager_1.ModelManager.SkillButtonUiModel
            .SkillPriorityButtonConfigMap;
      if (s)
        for (const l of s) {
          var n = l.ButtonType,
            o = this.GetSkillButtonDataByButton(n);
          i && !commonRoleSkillButtonTypes.has(n)
            ? CombatLog_1.CombatLog.Error(
                "BattleUi",
                this.EntityHandle?.Entity,
                "技能按钮配置错误，常规角色的不允许配置该技能类型",
                ["roleId", this.RoleId],
                ["ButtonType", n],
              )
            : o && ((n = e.get(n)), this.Syo(o, l, n));
        }
      if (h)
        for (const v of h) {
          var r = v.ButtonType,
            a = this.GetSkillButtonDataByButton(r);
          a &&
            void 0 === a.Config &&
            (this.Syo(a, v), 11 === r) &&
            (a.SetDefaultHidden(!0),
            (r = this.GetSkillButtonDataByButton(4)) &&
              ((a.DefaultSkillId = r.DefaultSkillId), a.RefreshSkillId()),
            a.RefreshIsVisible(),
            a.RefreshIsEnable());
        }
    }
  }
  Syo(t, i, s) {
    t.Refresh(this.EntityHandle, i, 0, s),
      this.AttributeIdSkillButtonMapping.AddSingle(t.AttributeId, t),
      this.AttributeIdSkillButtonMapping.AddSingle(t.MaxAttributeId, t);
    for (const h of t.AttributeIdTagMap.keys())
      this.AttributeIdTagSkillButtonMapping.AddSingle(h, t);
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
      this.ConfigShowLongPressTagSkillButtonMapping.Add(
        t.ConfigShowLongPressTagIds,
        t,
      ),
      this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
    for (const e of t.SkillIdTagMap.keys())
      this.SkillIdTagSkillButtonMapping.AddSingle(e, t);
    t.GetActionType() === InputEnums_1.EInputAction.幻象2 &&
      this.SkillIdTagSkillButtonMapping.AddSingle(
        SkillButtonData_1.controlVisionTagId,
        t,
      ),
      t.CustomHandle &&
        0 < t.CustomHandle.TagIds.length &&
        this.CustomHandleSkillButtonMapping.Add(t.CustomHandle.TagIds, t);
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVehicleSkillUsableCountChanged,
        this.H6l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVehicleSkillEnableChanged,
        this.yKl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.M6l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.E6l,
      );
  }
  yyo() {
    if (!(this.RoleId <= 0)) {
      for (const n of this.SkillButtonDataMap.values())
        if (n.GetEntityHandle()) {
          for (const o of n.AttributeIdTagMap.keys()) this.Tyo(o, this.hyo);
          for (const r of n.GetEnableTagIds()) this.Tyo(r, this.uyo);
          for (const a of n.GetDisableTagIds()) this.Tyo(a, this.Sri);
          for (const f of n.GetDisableSkillIdTagIds().keys())
            this.Tyo(f, this.cyo);
          for (const l of n.GetHiddenTagIds()) this.Tyo(l, this.Jrt);
          for (const v of n.SkillIdTagMap.keys()) this.Tyo(v, this.myo);
          for (const _ of n.SkillIconTagIds) this.Tyo(_, this.dyo);
          for (const u of n.DynamicEffectTagIdMap.keys()) this.Tyo(u, this.Cyo);
          for (const S of n.ConfigShowLongPressTagIds) this.Tyo(S, this.hyc);
          var t = n.CustomHandle?.TagIds;
          if (t) for (const B of t) this.Qpl(B, this.Wpl);
          if (7 === n.GetButtonType())
            for (const E of n.ExploreAsFightTagIds) this.Tyo(E, this.iO_);
        }
      this.Tyo(40422668, this.ayo),
        this.Tyo(SkillButtonData_1.controlVisionTagId, this.syo);
      for (const p of this.KSo.GetAllKey()) this.Tyo(p, this.pyo);
      for (const c of this.QSo.GetAllKey()) this.Tyo(c, this.fyo);
      var i = this.SkillButtonIndexConfig;
      if (i) {
        var s = new Set(),
          h =
            ModelManager_1.ModelManager.SkillButtonUiModel
              .DefaultSkillButtonIndexData;
        if (i.Id === h.ButtonIndexConfigId) {
          for (const d of h.ButtonIndexTagIdSet) s.add(d);
          for (const m of h.ButtonTypeTagMap.keys()) s.add(m);
        } else {
          for (const y of i.TagList)
            for (const g of y.ArrayString) {
              var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(g);
              e && s.add(e);
            }
          for (const k of (2 === Info_1.Info.OperationType
            ? i.DesktopButtonTypeMap
            : i.PadButtonTypeMap
          ).keys())
            s.add(k);
        }
        for (const D of s) this.Tyo(D, this.gyo);
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
      this.vvl.clear(),
      (this.iyo = !1));
  }
  RefreshSkillButtonData(t) {
    this.oyo
      ? t < this.ryo && (this.ryo = t)
      : ((this.oyo = !0), (this.ryo = t), this.VXe());
  }
  Ai_(t, i) {
    var s,
      h = this.SkillButtonDataMap.get(1);
    h &&
      ((s = h.IsShowLongPress()),
      h.RefreshIsShowLongPress(),
      this.IsCurEntity) &&
      h.IsShowLongPress() !== s &&
      (this.vvl.add(h), this.VXe()),
      this.RefreshEnableByButtonType(1),
      this.Cvl?.IsVehicleType("Gongduola") &&
        (this.RefreshEnableByButtonType(7),
        this.RefreshEnableByButtonType(5),
        this.RefreshEnableByButtonType(6));
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
      this.Lyo(),
      this.Dyo()),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        this.nyo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVehicleSkillUsableCountChanged,
        this.H6l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVehicleSkillEnableChanged,
        this.yKl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.M6l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.E6l,
      ),
      this.OXe();
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
