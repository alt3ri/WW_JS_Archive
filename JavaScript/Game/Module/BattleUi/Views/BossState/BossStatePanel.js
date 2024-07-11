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
      (this.mot = new Set()),
      (this._jn = new Map()),
      (this.dot = -1),
      (this.Cot = void 0),
      (this.got = void 0),
      (this.fot = void 0),
      (this.pot = 0),
      (this.vot = 0),
      (this.Mot = (t) => {
        t && this.Sot(t);
      }),
      (this.zpe = (t, e) => {
        var i;
        e?.Valid &&
          (i = e.Entity.GetComponent(3)) &&
          i.IsBoss &&
          ((i = e.Id), this.mot.has(i)) &&
          (this.mot.delete(i), this._jn.delete(i), i === this.dot) &&
          this.IsTargetBossExist() &&
          (this.Eot(!1), this.yot());
      }),
      (this.pKe = (t, e, i, s) => {
        this.dot === t &&
          e.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
          this.got?.ChangeBuff(e, i, s);
      }),
      (this.Iot = (t) => {
        var e;
        t.IsVisible
          ? this.fot
            ? (this.fot.Refresh(t), this.fot.IsShowOrShowing || this.fot.Show())
            : ((this.fot =
                new MergeMonsterHeadStateView_1.MergeMonsterHeadStateView()),
              this.fot.Refresh(t),
              (t = this.GetItem(0)),
              (e = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(
                this.fot.GetResourceId(),
              )),
              (e = LguiUtil_1.LguiUtil.DuplicateActor(e, t)),
              this.fot.NewByRootActorAsync(e).finally(() => {
                this.fot.Info && this.fot.Show();
              }))
          : this.fot &&
            !this.fot.IsHideOrHiding &&
            (this.fot.Refresh(void 0), this.fot.Hide());
      }),
      (this.Tot = (t) => {
        this.fot && this.fot.Info === t && this.fot.OnHealthChanged();
      }),
      (this.OnLanguageChange = () => {
        this.fot?.OnLanguageChange();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  InitializeTemp() {
    (this.pot = CommonParamById_1.configCommonParamById.GetIntConfig(
      "BossStateShowDistance",
    )),
      (this.vot = CommonParamById_1.configCommonParamById.GetIntConfig(
        "BossStateShowMaxDistance",
      )),
      this.Lot();
  }
  async InitializeAsync() {
    await this.Uot(), this.Aot();
  }
  Reset() {
    this.Eot(), this.yot(), this.Pot(), (this.got = void 0), super.Reset();
  }
  Lot() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) for (const e of t) e.IsInit && this.Sot(e);
  }
  async Uot() {
    this.Cot = new Map();
    const s = [];
    BattleUiDefine_1.bossStateViewResourceIdMap.forEach((t, e) => {
      var i = this.GetItem(0),
        t = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(t);
      t.K2_AttachRootComponentTo(i);
      i = new (bossStateViewMap.get(e))();
      this.Cot.set(e, i), s.push(i.NewByRootActorAsync(t));
    }),
      await Promise.all(s);
  }
  Pot() {
    for (const t of this.Cot.values()) t.DestroyCompatible();
    this.Cot = void 0;
  }
  xot(t, e) {
    this.got ||
      ((this.got = this.Cot.get(e)),
      this.got.Activate(t),
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateBossState(
        !0,
      ));
  }
  Eot(t = !0) {
    var e;
    this.got &&
      ((e = EntitySystem_1.EntitySystem.Get(this.dot)),
      this.got.Deactivate(e),
      t ? this.got.Hide() : this.got.HideWithAnim(),
      (this.got = void 0),
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateBossState(
        !1,
      ));
  }
  OnTickBattleChildViewPanel(t) {
    this.Aot(), this.got?.Tick(t), this.fot?.Tick(t);
  }
  OnChangeBoss(t) {
    this.got && (this.Eot(), this.yot()), (this.dot = t);
    var e,
      t = this.wot()?.BossViewConfig?.BossStateViewType ?? 0;
    bossStateViewMap.get(Number(t)) &&
      ((e = EntitySystem_1.EntitySystem.Get(this.dot))
        ? this.xot(e, t)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 8, "显示Boss状态条时找不到对应Boss实体"));
  }
  Aot() {
    var t = this.Bot();
    -1 === t
      ? this.IsTargetBossExist() && (this.Eot(!1), this.yot())
      : this.dot !== t && this.OnChangeBoss(t);
  }
  yot() {
    this.dot = -1;
  }
  Bot() {
    var t = Global_1.Global.BaseCharacter;
    if (!t) return -1;
    if (0 === this.mot.size) return -1;
    let e = -1,
      i = MathUtils_1.MathUtils.Int32Max;
    for (const h of this.mot) {
      var s,
        n = EntitySystem_1.EntitySystem.Get(h);
      n &&
        (n = n.GetComponent(3)) &&
        ((n = n.Owner.GetSquaredDistanceTo(t)),
        (s = this._jn.get(h))
          ? n <= s && n < i && ((i = n), (e = h))
          : n > this.vot ||
            (n <= this.pot && n < i && ((i = n), (e = h)),
            n > this.pot &&
              n <= this.vot &&
              -1 !== this.dot &&
              n < i &&
              ((i = n), (e = h))));
    }
    return e;
  }
  wot() {
    if (this.dot) return this.bot(this.dot);
  }
  bot(t) {
    return EntitySystem_1.EntitySystem.Get(t)
      .GetComponent(0)
      ?.GetMonsterComponent();
  }
  IsTargetBossExist() {
    return -1 !== this.dot;
  }
  Sot(e) {
    if (e?.Valid) {
      var i = e.Entity.GetComponent(0);
      if (i) {
        i = i.GetMonsterComponent();
        if (i) {
          let t = 0;
          var i = i.BossViewConfig;
          0 === (t = i ? i.BossStateViewType : t) ||
            this.mot.has(e.Id) ||
            (this.mot.add(e.Id),
            i?.ShowDistance &&
              ((i = i.ShowDistance * i.ShowDistance), this._jn.set(e.Id, i)));
        }
      }
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpawnBoss, this.Mot),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.pKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged,
        this.Iot,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged,
        this.Tot,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SpawnBoss,
      this.Mot,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.pKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged,
        this.Iot,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged,
        this.Tot,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      );
  }
  GetUiActorForGuide() {
    return this.got?.GetRootActor();
  }
}
(exports.BossStatePanel = BossStatePanel).aYe = void 0;
//# sourceMappingURL=BossStatePanel.js.map
