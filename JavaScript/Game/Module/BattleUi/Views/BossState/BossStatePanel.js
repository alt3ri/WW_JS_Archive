"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossStatePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  BattleUiDefine_1 = require("../../BattleUiDefine"),
  BattleChildViewPanel_1 = require("../BattleChildViewPanel/BattleChildViewPanel"),
  CommonBossStateView_1 = require("./CommonBossStateView"),
  MergeMonsterHeadStateView_1 = require("./MergeMonsterHeadStateView"),
  bossStateViewMap = new Map([[1, CommonBossStateView_1.CommonBossStateView]]);
class BossStatePanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.Drt = new Set()),
      (this.YQn = new Map()),
      (this.Rrt = -1),
      (this.Urt = void 0),
      (this.Art = void 0),
      (this.Prt = void 0),
      (this.xrt = 0),
      (this.wrt = 0),
      (this.Brt = (t) => {
        t &&
          this.brt(t) &&
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            this,
            t,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          );
      }),
      (this.zpe = (t, e) => {
        var i;
        e?.Valid &&
          (i = e.Entity.GetComponent(3)) &&
          i.IsBoss &&
          ((i = e.Id), this.Drt.has(i)) &&
          (this.Drt.delete(i),
          this.YQn.delete(i),
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            e,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
          i === this.Rrt) &&
          this.IsTargetBossExist() &&
          (this.qrt(!1), this.Grt());
      }),
      (this.AQe = (t, e, i, s) => {
        this.Rrt !== t ||
          (2 !== e.CueType && 14 !== e.CueType) ||
          this.Art?.ChangeBuff(e, i, s);
      }),
      (this.Nrt = (t) => {
        var e;
        t.IsVisible
          ? this.Prt
            ? (this.Prt.Refresh(t), this.Prt.IsShowOrShowing || this.Prt.Show())
            : ((this.Prt =
                new MergeMonsterHeadStateView_1.MergeMonsterHeadStateView()),
              this.Prt.Refresh(t),
              (t = this.GetItem(0)),
              (e = BattleUiControl_1.BattleUiControl.Pool.GetSrcActor(
                this.Prt.GetResourceId(),
              )),
              (e = LguiUtil_1.LguiUtil.DuplicateActor(e, t)),
              this.Prt.NewByRootActorAsync(e).finally(() => {
                this.Prt.Info && this.Prt.Show();
              }))
          : this.Prt &&
            !this.Prt.IsHideOrHiding &&
            (this.Prt.Refresh(void 0), this.Prt.Hide());
      }),
      (this.Ort = (t) => {
        this.Prt && this.Prt.Info === t && this.Prt.OnHealthChanged();
      }),
      (this.OnLanguageChange = () => {
        this.Prt?.OnLanguageChange();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  InitializeTemp() {
    (this.xrt = CommonParamById_1.configCommonParamById.GetIntConfig(
      "BossStateShowDistance",
    )),
      (this.wrt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "BossStateShowMaxDistance",
      )),
      this.krt();
  }
  async InitializeAsync() {
    await this.Frt(), this.Vrt();
  }
  Reset() {
    this.qrt(), this.Grt(), this.Hrt(), (this.Art = void 0), super.Reset();
  }
  krt() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) for (const e of t) e.IsInit && this.brt(e);
  }
  async Frt() {
    this.Urt = new Map();
    const s = [];
    BattleUiDefine_1.bossStateViewResourceIdMap.forEach((t, e) => {
      var i = this.GetItem(0),
        t = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(t);
      t.K2_AttachRootComponentTo(i);
      i = new (bossStateViewMap.get(e))();
      this.Urt.set(e, i), s.push(i.NewByRootActorAsync(t));
    }),
      await Promise.all(s);
  }
  Hrt() {
    for (const t of this.Urt.values()) t.DestroyCompatible();
    this.Urt = void 0;
  }
  jrt(t, e) {
    this.Art ||
      ((this.Art = this.Urt.get(e)),
      this.Art.Activate(t),
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateBossState(
        !0,
      ));
  }
  qrt(t = !0) {
    var e;
    this.Art &&
      ((e = EntitySystem_1.EntitySystem.Get(this.Rrt)),
      this.Art.Deactivate(e),
      t ? this.Art.Hide() : this.Art.HideWithAnim(),
      (this.Art = void 0),
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateBossState(
        !1,
      ));
  }
  OnTickBattleChildViewPanel(t) {
    BossStatePanel.vJe.Start(),
      this.Vrt(),
      this.Art?.Tick(t),
      this.Prt?.Tick(t),
      BossStatePanel.vJe.Stop();
  }
  OnChangeBoss(t) {
    this.Art && (this.qrt(), this.Grt()), (this.Rrt = t);
    var e,
      t = this.Wrt()?.BossViewConfig?.BossStateViewType ?? 0;
    bossStateViewMap.get(Number(t)) &&
      ((e = EntitySystem_1.EntitySystem.Get(this.Rrt))
        ? this.jrt(e, t)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 8, "显示Boss状态条时找不到对应Boss实体"));
  }
  Vrt() {
    var t = this.Krt();
    -1 === t
      ? this.IsTargetBossExist() && (this.qrt(!1), this.Grt())
      : this.Rrt !== t && this.OnChangeBoss(t);
  }
  Grt() {
    this.Rrt = -1;
  }
  Krt() {
    var t = Global_1.Global.BaseCharacter;
    if (!t) return -1;
    if (0 === this.Drt.size) return -1;
    let e = -1,
      i = MathUtils_1.MathUtils.Int32Max;
    for (const h of this.Drt) {
      var s,
        n = EntitySystem_1.EntitySystem.Get(h);
      n &&
        (n = n.GetComponent(3)) &&
        ((n = n.Owner.GetSquaredDistanceTo(t)),
        (s = this.YQn.get(h))
          ? n <= s && n < i && ((i = n), (e = h))
          : n > this.wrt ||
            (n <= this.xrt && n < i && ((i = n), (e = h)),
            n > this.xrt &&
              n <= this.wrt &&
              -1 !== this.Rrt &&
              n < i &&
              ((i = n), (e = h))));
    }
    return e;
  }
  Wrt() {
    if (this.Rrt) return this.Qrt(this.Rrt);
  }
  Qrt(t) {
    return EntitySystem_1.EntitySystem.Get(t)
      .GetComponent(0)
      ?.GetMonsterComponent();
  }
  IsTargetBossExist() {
    return -1 !== this.Rrt;
  }
  brt(t) {
    if (!t?.Valid) return !1;
    var e = t.Entity.GetComponent(0);
    if (!e) return !1;
    e = e.GetMonsterComponent();
    if (!e) return !1;
    let i = 0;
    var e = e.BossViewConfig;
    return (
      0 !== (i = e ? e.BossStateViewType : i) &&
      !this.Drt.has(t.Id) &&
      (this.Drt.add(t.Id),
      e?.ShowDistance &&
        ((e = e.ShowDistance * e.ShowDistance), this.YQn.set(t.Id, e)),
      !0)
    );
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpawnBoss, this.Brt),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.AQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged,
        this.Nrt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged,
        this.Ort,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SpawnBoss,
      this.Brt,
    ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.AQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged,
        this.Nrt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged,
        this.Ort,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      );
  }
  GetUiActorForGuide() {
    return this.Art?.GetRootActor();
  }
}
(exports.BossStatePanel = BossStatePanel).vJe = Stats_1.Stat.Create(
  "[BattleView]BossStatePanelTick",
);
//# sourceMappingURL=BossStatePanel.js.map
