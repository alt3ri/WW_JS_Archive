"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossStateViewBase = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  BattleEntityChildView_1 = require("../BattleChildView/BattleEntityChildView");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const PERCENT_RATE = 100;
class BossStateViewBase extends BattleEntityChildView_1.BattleEntityChildView {
  constructor() {
    super(...arguments),
      (this.Xrt = void 0),
      (this.$rt = void 0),
      (this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.BossStateViewConfig = void 0),
      (this.HasHiddenTag = !1),
      (this.HasFallDownTag = !1),
      (this.HasFightTag = !1),
      (this.OnlyShowInBattleState = !1),
      (this.OnBossHeathChanged = (t, i, e) => {}),
      (this.u$e = (t) => {
        this.IsValid() && this.OnBossShieldChanged(t);
      }),
      (this.OnTimeScale = (t, i) => {
        this.IsValid() && this.OnBossTimeScaleChange(t);
      }),
      (this.OnLanguageChange = () => {
        this.IsValid() && this.OnBossLanguageChange();
      }),
      (this.Yrt = (t, i) => {
        this.OnBossHardnessActivated(i);
      }),
      (this.Jrt = (t, i) => {
        (this.HasHiddenTag = i), this.RefreshHidden();
      }),
      (this.zrt = (t, i) => {
        (this.HasFallDownTag = i), this.OnFallDownVisibleChanged(i);
      }),
      (this.Zrt = (t, i) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.ent = (t, i) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.aXe = (t, i) => {
        (this.HasFightTag = i), this.RefreshHidden();
      }),
      (this.tnt = (t, i, e) => {
        this.OnBossHardnessChanged(i);
      }),
      (this.OnBossMaxHealthChanged = (t, i, e) => {}),
      (this.OnVulnerabilityActivated = (t, i) => {}),
      (this.OnLevelChanged = (t, i, e) => {});
  }
  Initialize(t) {
    super.Initialize(t);
    t = ConfigManager_1.ConfigManager.BattleUiConfig;
    (this.Xrt = t.GetBufferAnimationSpeed()),
      (this.$rt = t.GetHardnessPercentList()),
      this.RefreshHiddenTagState(),
      this.RefreshHidden();
  }
  OnActivate() {
    (this.BossStateViewConfig = this.GetMonsterConfig()),
      (this.OnlyShowInBattleState =
        this.BossStateViewConfig?.OnlyShowInBattleState ?? !1),
      this.RefreshHiddenTagState(),
      this.RefreshHidden(),
      this.RefreshHardnessAttributeId();
  }
  OnDeactivate() {
    (this.BossStateViewConfig = void 0),
      (this.Xrt = void 0),
      (this.$rt = void 0);
  }
  DestroyOverride() {
    return (
      super.DestroyOverride(),
      BattleUiControl_1.BattleUiControl.Pool.RecycleHeadStateView(
        this.GetResourceId(),
        this.RootActor,
        !0,
      ),
      (this.RootActor = void 0),
      !(this.RootItem = void 0)
    );
  }
  AddEntityEvents(t) {
    EventSystem_1.EventSystem.AddWithTarget(
      t,
      EventDefine_1.EEventName.CharShieldChange,
      this.u$e,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitTimeScale,
        this.OnTimeScale,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      ),
      this.ListenForTagSignificantChanged(
        t,
        242005298,
        this.OnVulnerabilityActivated,
      ),
      this.ListenForTagSignificantChanged(t, 1261361093, this.Yrt),
      this.ListenForTagSignificantChanged(t, -13489149, this.Jrt),
      this.ListenForTagSignificantChanged(t, 1922078392, this.zrt),
      this.ListenForTagSignificantChanged(t, -1109506297, this.Zrt),
      this.ListenForTagSignificantChanged(t, -1838149281, this.ent),
      this.OnlyShowInBattleState &&
        this.ListenForTagSignificantChanged(t, 1996802261, this.aXe),
      this.ListenForAttributeChanged(t, EAttributeId.Proto_Hardness, this.tnt),
      this.ListenForAttributeChanged(t, EAttributeId.Proto_Rage, this.tnt),
      this.ListenForAttributeChanged(t, EAttributeId.Proto_RageMax, this.tnt),
      this.ListenForAttributeChanged(
        t,
        EAttributeId.Proto_Lv,
        this.OnLevelChanged,
      ),
      this.ListenForAttributeChanged(
        t,
        EAttributeId.Proto_Life,
        this.OnBossHeathChanged,
      ),
      this.ListenForAttributeChanged(
        t,
        EAttributeId.l5n,
        this.OnBossMaxHealthChanged,
      );
  }
  RemoveEntityEvents(t) {
    super.RemoveEntityEvents(t),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharShieldChange,
        this.u$e,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitTimeScale,
        this.OnTimeScale,
      );
  }
  Reset() {
    super.Reset();
  }
  Tick(t) {}
  ChangeBuff(t, i, e) {}
  OnHardnessAttributeChanged() {
    this.RefreshHardnessAttributeId();
  }
  RefreshHardnessAttributeId() {
    this.GetEntity().GetComponent(190).HasTag(-1838149281)
      ? ((this.HardnessAttributeId = EAttributeId.Proto_Rage),
        (this.MaxHardnessAttributeId = EAttributeId.Proto_RageMax))
      : ((this.HardnessAttributeId = EAttributeId.Proto_Hardness),
        (this.MaxHardnessAttributeId = EAttributeId.Proto_HardnessMax)),
      this.OnBossStateChange();
  }
  OnBossStateChange() {}
  OnBossShieldChanged(t) {}
  OnFallDownVisibleChanged(t) {}
  OnBossTimeScaleChange(t) {}
  OnBossHardnessActivated(t) {}
  OnBossHardnessChanged(t) {}
  OnBossLanguageChange() {}
  RefreshHiddenTagState() {
    var t = this.GetEntity()?.GetComponent(190);
    (this.HasHiddenTag = t?.HasTag(-13489149)),
      (this.HasFallDownTag = t?.HasTag(1922078392)),
      (this.HasFightTag = t?.HasTag(1996802261) ?? !1);
  }
  RefreshHidden() {
    !this.IsValid() ||
    this.HasHiddenTag ||
    (this.OnlyShowInBattleState && !this.HasFightTag)
      ? this.Hide()
      : this.Show();
  }
  GetBossStateViewState() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t)
        return t.GetMonsterComponent()?.BossViewConfig?.BossStateViewType ?? 0;
    }
  }
  GetHardnessStrength(t) {
    var i = t * PERCENT_RATE;
    for (const e of this.$rt) if (e[0] <= i) return e[1];
    return 0;
  }
  GetHpAndShieldPercent() {
    if (!this.IsValid()) return [0, 0];
    var t = this.GetCurrentAttributeValueById(EAttributeId.Proto_Life),
      i = this.GetCurrentAttributeValueById(EAttributeId.l5n),
      e = this.GetBossShield();
    let s = e <= i ? e / i : 1;
    return [t / i, s];
  }
  GetAttributeComponent() {
    return this.GetEntity().CheckGetComponent(159);
  }
  GetCurrentAttributeValueById(t) {
    return this.GetAttributeComponent().GetCurrentValue(t);
  }
  GetBossShield() {
    return this.IsValid()
      ? this.GetEntity().CheckGetComponent(67).ShieldTotal
      : 0;
  }
  GetMonsterConfig() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) return t.GetMonsterComponent()?.BossViewConfig;
    }
  }
  GetBaseInfo() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) return t.GetBaseInfo();
    }
  }
  GetAttributeInfo() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) return t.GetAttributeComponent();
    }
  }
  get BarBufferAnimLength() {
    return this.Xrt;
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
  HideWithAnim() {
    this.Hide();
  }
}
exports.BossStateViewBase = BossStateViewBase;
//# sourceMappingURL=BossStateViewBase.js.map
