"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonEntityData = void 0);
const Stats_1 = require("../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputEnums_1 = require("../../Input/InputEnums");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const BehaviorButtonData_1 = require("./BehaviorButtonData");
const BehaviorButtonMapping_1 = require("./BehaviorButtonMapping");
const SkillButtonData_1 = require("./SkillButtonData");
const SkillButtonMapping_1 = require("./SkillButtonMapping");
const SkillButtonUiController_1 = require("./SkillButtonUiController");
const SkillButtonUiDefine_1 = require("./SkillButtonUiDefine");
const buttonTypeToActionNameMap = new Map([
  [101, InputEnums_1.EInputAction.瞄准],
  [102, InputEnums_1.EInputAction.锁定目标],
]);
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
      (this.$So = new BehaviorButtonMapping_1.BehaviorButtonMapping()),
      (this.YSo = new BehaviorButtonMapping_1.BehaviorButtonMapping()),
      (this.JSo = new Set()),
      (this.T$e = new Map()),
      (this.SQe = void 0),
      (this.zSo = new Set()),
      (this.ZSo = new Set()),
      (this.eEo = new Set()),
      (this.tEo = new Set()),
      (this.iEo = new Set()),
      (this.oEo = new Set()),
      (this.rEo = new Set()),
      (this.smt = new Set()),
      (this.nEo = !1),
      (this.sEo = !1),
      (this.aEo = 4),
      (this.TQe = () => {
        this.SQe = void 0;
        for (const t of this.zSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
            t.GetButtonType(),
            -1,
          );
        this.zSo.clear();
        for (const i of this.ZSo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
            i.GetButtonType(),
          );
        this.ZSo.clear();
        for (const s of this.eEo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
            s.GetButtonType(),
          );
        this.eEo.clear();
        for (const h of this.tEo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
            h.GetButtonType(),
          );
        this.tEo.clear();
        for (const e of this.iEo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
            e.GetButtonType(),
          );
        this.iEo.clear();
        for (const o of this.rEo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonCdRefresh,
            o.GetButtonType(),
          );
        this.rEo.clear();
        for (const n of this.smt)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
            n.GetButtonType(),
          );
        this.smt.clear();
        for (const r of this.oEo)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
            r.ButtonType,
          );
        this.oEo.clear(),
          this.nEo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
            ),
            (this.nEo = !1)),
          this.sEo &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillButtonDataRefresh,
              this.aEo,
            ),
            (this.sEo = !1));
      }),
      (this.hEo = (t, i) => {
        let s;
        const h = this.SkillButtonDataMap.get(7);
        h &&
          h.IsUseItem &&
          ((s = h.IsEnable()), h.RefreshIsEnable(), this.IsCurEntity) &&
          (s !== h.IsEnable() && this.zSo.add(h), this.AQe());
      }),
      (this.lEo = () => {
        let t;
        let i;
        let s;
        let h;
        const e = this.SkillButtonDataMap.get(9);
        e &&
          ((t = e.GetSkillId()),
          (i = e.GetSkillTexturePath()),
          e.RefreshSkillId(),
          e.RefreshSkillTexturePath(),
          (s = e.GetSkillId()),
          (h = e.GetSkillTexturePath()),
          t !== s &&
            (e.RefreshIsEnable(), this.IsCurEntity) &&
            (this.eEo.add(e), this.AQe()),
          i !== h) &&
          this.IsCurEntity &&
          (this.tEo.add(e), this.AQe());
      }),
      (this._Eo = (t, i) => {
        let s;
        const h = this.SkillButtonDataMap.get(9);
        h &&
          !h.GetIsVisionEnableInAir() &&
          ((s = h.IsEnable()),
          h.RefreshIsEnable(),
          this.IsCurEntity && h.IsEnable() !== s) &&
          (this.zSo.add(h), this.AQe());
      }),
      (this.uEo = (t, i) => {
        t = this.AttributeIdTagSkillButtonMapping.Get(t);
        if (t)
          for (const n of t) {
            let s = n.AttributeId;
            const h = n.MaxAttributeId;
            const e = (n.RefreshAttributeId(), n.AttributeId);
            const o = n.MaxAttributeId;
            (s === e && h === o) ||
              (n.RefreshFrameSpriteColor(),
              this.AttributeIdSkillButtonMapping.RemoveSingle(s, n),
              this.AttributeIdSkillButtonMapping.RemoveSingle(h, n),
              e > 0 &&
                (this.AttributeIdSkillButtonMapping.AddSingle(e, n),
                this.AttributeIdSkillButtonMapping.AddSingle(o, n),
                this.T$e.has(e) || this.cEo(e, this.mEo),
                this.T$e.has(o) || this.cEo(o, this.mEo)),
              (s = n.IsEnable()),
              n.RefreshIsEnable(),
              this.IsCurEntity &&
                (this.smt.add(n),
                s !== n.IsEnable() && this.zSo.add(n),
                this.AQe()));
          }
      }),
      (this.dEo = (t, i) => {
        t = this.GetSkillButtonDataByEnableTag(t);
        if (t)
          for (const h of t) {
            let t = !1;
            const s = h.IsEnable();
            (s && i) ||
              ((t = i
                ? (h.SetEnable(!0), !0)
                : (h.RefreshIsEnable(), h.IsEnable() !== s)),
              this.IsCurEntity && t && (this.zSo.add(h), this.AQe()));
          }
      }),
      (this.Moi = (t, i) => {
        t = this.GetSkillButtonDataByDisableTag(t);
        if (t)
          for (const h of t) {
            let t = !1;
            const s = h.IsEnable();
            s === i &&
              ((t = i
                ? (h.SetEnable(!1), !0)
                : (h.RefreshIsEnable(), h.IsEnable() !== s)),
              this.IsCurEntity && t) &&
              (this.zSo.add(h), this.AQe());
          }
      }),
      (this.CEo = (i, s) => {
        const t = this.GetSkillButtonDataByDisableSkillIdTag(i);
        if (t)
          for (const o of t) {
            let t = !1;
            var h;
            const e = o.IsEnable();
            e === s &&
              (s
                ? (h = o.GetSkillId()) &&
                  o.GetDisableSkillIdTagIds().get(i)?.has(h) &&
                  (o.SetEnable(!1), (t = !0))
                : (o.RefreshIsEnable(), (t = o.IsEnable() !== e)),
              this.IsCurEntity && t) &&
              (this.zSo.add(o), this.AQe());
          }
      }),
      (this.Oot = (t, i) => {
        t = this.GetSkillButtonDataByHiddenTag(t);
        if (t)
          for (const h of t) {
            let t = !1;
            const s = h.IsVisible();
            s === i &&
              ((t = i
                ? (h.SetVisible(!1), !0)
                : (h.RefreshIsVisible(), h.IsVisible() !== s)),
              this.IsCurEntity && t) &&
              (this.ZSo.add(h), this.AQe());
          }
      }),
      (this.gEo = (t, i) => {
        const s = this.GetSkillButtonDataBySkillIdTag(t);
        if (s)
          for (const o of s) {
            const h = o.GetSkillId();
            const e =
              (i ? o.RefreshSkillIdByTag(t) : o.RefreshSkillId(),
              o.GetSkillId());
            h !== e &&
              (o.RefreshSkillTexturePath(),
              o.RefreshIsEnable(),
              this.IsCurEntity) &&
              (this.eEo.add(o), this.AQe());
          }
      }),
      (this.fEo = (t, i) => {
        const s = this.GetSkillButtonDataBySkillIconTag(t);
        if (s)
          for (const o of s) {
            var h;
            const e = o.GetSkillTexturePath();
            i
              ? ((h = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
                o.RefreshSkillTexturePathBySkillIconTag(h))
              : o.RefreshSkillTexturePath(),
              this.IsCurEntity &&
                e !== o.GetSkillTexturePath() &&
                (this.tEo.add(o), this.AQe());
          }
      }),
      (this.pEo = (t, i) => {
        t = this.GetSkillButtonDataByDynamicEffectTag(t);
        if (t)
          for (const s of t)
            s.RefreshDynamicEffect(),
              this.IsCurEntity && (this.iEo.add(s), this.AQe());
      }),
      (this.vEo = (t, i) => {
        let s, h;
        this.IsCurEntity &&
          ((h = ModelManager_1.ModelManager.PlatformModel.OperationType),
          (s = ModelManager_1.ModelManager.SkillButtonUiModel),
          (h = h === 2),
          i
            ? ((i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
              s.RefreshSkillButtonIndexByTag(this.SkillButtonIndexConfig, i, h))
            : s.RefreshSkillButtonIndex(
                this.SkillButtonIndexConfig,
                this.EntityHandle,
                h,
              ),
          (this.nEo = !0),
          this.AQe());
      }),
      (this.MEo = (t, i) => {
        t = this.YSo.Get(t);
        if (t)
          for (const h of t) {
            let t = !1;
            const s = h.IsVisible;
            s === i &&
              ((t = i
                ? !(h.IsVisible = !1)
                : (h.RefreshIsVisible(
                    this.GameplayTagComponent,
                    this.RoleConfig,
                  ),
                  h.IsVisible !== s)),
              this.IsCurEntity && t) &&
              (this.oEo.add(h), this.AQe());
          }
      }),
      (this.SEo = (t, i) => {
        t = this.$So.Get(t);
        if (t)
          for (const h of t) {
            let t = !1;
            const s = h.IsVisible;
            s !== i &&
              ((t = i
                ? (h.IsVisible = !0)
                : (h.RefreshIsVisible(
                    this.GameplayTagComponent,
                    this.RoleConfig,
                  ),
                  h.IsVisible !== s)),
              this.IsCurEntity && t) &&
              (this.oEo.add(h), this.AQe());
          }
      }),
      (this.mEo = (t, i, s) => {
        if ((this.RefreshSkillButtonEnableByAttributeId(t), this.IsCurEntity)) {
          t = this.GetSkillButtonDataByAttributeId(t);
          if (t) {
            for (const h of t) this.smt.add(h);
            this.AQe();
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
      (this.AttributeComponent = t.GetComponent(156)),
      (this.GameplayTagComponent = t.GetComponent(185)),
      (this.SkillComponent = t.GetComponent(33)),
      (this.CharacterSkillCdComponent = t.GetComponent(186)),
      (i = ConfigManager_1.ConfigManager.SkillButtonConfig);
    (this.SkillButtonConfigList = i.GetAllSkillButtonConfig(this.RoleId)),
      (this.SkillCommonButtonConfigList = i.GetAllSkillCommonButtonConfig()),
      (this.RoleConfig.RoleType === 2 &&
        ((this.SkillButtonIndexConfig = i.GetSkillIndexConfig(this.RoleId)),
        this.SkillButtonIndexConfig)) ||
        (this.SkillButtonIndexConfig = i.GetSkillIndexConfig(0)),
      this.EEo(),
      this.yEo(),
      this.eXe();
  }
  OnChangeRole(t) {
    if ((this.IsCurEntity = t))
      for (const i of this.SkillButtonDataMap.values())
        i.RefreshSkillTexturePath();
    else this.DQe();
  }
  Clear() {
    this.IEo();
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
    for (const i of this.JSo) i?.EndTask();
    (this.JSo = void 0),
      (this.T$e = void 0),
      (this.$So = void 0),
      (this.YSo = void 0),
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
  EEo() {
    for (const o of SkillButtonUiDefine_1.skillButtonActionList) {
      const t = new SkillButtonData_1.SkillButtonData();
      this.SkillButtonDataMap.set(o, t);
    }
    if (!(this.RoleId <= 0)) {
      const i = this.SkillButtonConfigList;
      const s = this.SkillCommonButtonConfigList;
      if (i)
        for (const n of i) {
          var h = n.ButtonType;
          var h = this.GetSkillButtonDataByButton(h);
          h && this.TEo(h, n);
        }
      if (s)
        for (const r of s) {
          var e = r.ButtonType;
          var e = this.GetSkillButtonDataByButton(e);
          e && void 0 === e.Config && this.TEo(e, r);
        }
    }
  }
  TEo(t, i) {
    t.Refresh(this.EntityHandle, i),
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
  yEo() {
    for (const [t, i] of buttonTypeToActionNameMap) {
      const s = new BehaviorButtonData_1.BehaviorButtonData();
      s.Refresh(t, i, this.GameplayTagComponent, this.RoleConfig),
        this.BehaviorButtonDataMap.set(t, s),
        s.VisibleTagId > 0 && this.$So.AddSingle(s.VisibleTagId, s),
        this.YSo.Add(s.HiddenTagIds, s);
    }
  }
  eXe() {
    this.LEo(),
      this.DEo(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
        this.lEo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        this.hEo,
      );
  }
  LEo() {
    if (!(this.RoleId <= 0)) {
      for (const s of this.SkillButtonDataMap.values())
        if (s.GetEntityHandle()) {
          for (const h of s.AttributeIdTagMap.keys()) this.REo(h, this.uEo);
          for (const e of s.GetEnableTagIds()) this.REo(e, this.dEo);
          for (const o of s.GetDisableTagIds()) this.REo(o, this.Moi);
          for (const n of s.GetDisableSkillIdTagIds().keys())
            this.REo(n, this.CEo);
          for (const r of s.GetHiddenTagIds()) this.REo(r, this.Oot);
          for (const a of s.SkillIdTagMap.keys()) this.REo(a, this.gEo);
          for (const l of s.SkillIconTagIds) this.REo(l, this.fEo);
          for (const f of s.DynamicEffectTagIdMap.keys()) this.REo(f, this.pEo);
        }
      this.REo(40422668, this._Eo),
        this.REo(SkillButtonData_1.controlVisionTagId, this.lEo);
      for (const v of this.$So.GetAllKey()) this.REo(v, this.SEo);
      for (const u of this.YSo.GetAllKey()) this.REo(u, this.MEo);
      const t = this.SkillButtonIndexConfig;
      if (t) {
        const i = ModelManager_1.ModelManager.PlatformModel.OperationType;
        if (i === 2)
          for (const _ of t.DesktopButtonTypeMap.keys()) this.REo(_, this.vEo);
        if (i === 1)
          for (const S of t.PadButtonTypeMap.keys()) this.REo(S, this.vEo);
      }
    }
  }
  DEo() {
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
            (this.cEo(t, this.mEo), this.cEo(i, this.mEo)));
      }
  }
  REo(t, i) {
    let s = void 0;
    (s =
      typeof t === "string"
        ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)
        : t) &&
      (t = this.GameplayTagComponent.ListenForTagAddOrRemove(s, i)) &&
      this.JSo.add(t);
  }
  cEo(t, i) {
    this.AttributeComponent.AddListener(t, i, "SkillButtonUiController"),
      this.T$e.set(t, i);
  }
  AQe() {
    this.SQe ||
      (this.SQe = TimerSystem_1.TimerSystem.Next(
        this.TQe,
        SkillButtonEntityData.xQe,
      ));
  }
  DQe() {
    this.SQe ||
      (TimerSystem_1.TimerSystem.Has(this.SQe) &&
        TimerSystem_1.TimerSystem.Remove(this.SQe),
      (this.SQe = void 0),
      this.zSo.clear(),
      this.ZSo.clear(),
      this.eEo.clear(),
      this.tEo.clear(),
      this.iEo.clear(),
      this.rEo.clear(),
      this.smt.clear(),
      this.oEo.clear(),
      (this.nEo = !1));
  }
  RefreshSkillButtonData(t) {
    this.sEo
      ? t < this.aEo && (this.aEo = t)
      : ((this.sEo = !0), (this.aEo = t), this.AQe());
  }
  RefreshSkillButtonEnableByAttributeId(t) {
    t = this.GetSkillButtonDataByAttributeId(t);
    if (t)
      for (const s of t) {
        const i = s.IsEnable();
        s.RefreshIsEnable(),
          this.IsCurEntity &&
            i !== s.IsEnable() &&
            (this.zSo.add(s), this.AQe());
      }
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    let i;
    var t = this.GetSkillButtonDataByButton(t);
    t &&
      ((i = t.GetSkillId()),
      t.RefreshSkillId(),
      t.RefreshSkillTexturePath(),
      t.RefreshIsEnable(),
      this.IsCurEntity
        ? i !== t.GetSkillId() && (this.eEo.add(t), this.AQe())
        : t.SetExploreSkillChange(!1));
  }
  RefreshSkillCd(t) {
    for (const i of this.SkillButtonDataMap.values())
      i.GetSkillId() === t &&
        (i.RefreshIsEnable(), this.IsCurEntity) &&
        (this.rEo.add(i), this.AQe());
  }
  ExecuteMultiSkillIdChanged(t, i) {
    let s = void 0;
    if (i !== 0) {
      if (
        !(s = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)
      )
        return;
    } else s = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
    s &&
      (s.RefreshIsEnable(), this.IsCurEntity) &&
      (this.rEo.add(s), this.tEo.add(s), this.AQe());
  }
  ExecuteMultiSkillEnable(t, i) {
    let s = void 0;
    if (i !== 0) {
      if (
        !(s = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)
      )
        return;
    } else s = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
    s &&
      (s.RefreshIsEnable(), this.IsCurEntity) &&
      (this.rEo.add(s), this.AQe());
  }
  IEo() {
    this.EntityHandle?.Valid &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.EntityHandle,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
        this.lEo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        this.hEo,
      ),
      this.DQe(),
      this.UEo(),
      this.AEo());
  }
  UEo() {
    for (const t of this.JSo) t?.EndTask();
    this.JSo.clear();
  }
  AEo() {
    for (const [t, i] of this.T$e) this.AttributeComponent.RemoveListener(t, i);
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
(exports.SkillButtonEntityData = SkillButtonEntityData).xQe = void 0;
// # sourceMappingURL=SkillButtonEntityData.js.map
