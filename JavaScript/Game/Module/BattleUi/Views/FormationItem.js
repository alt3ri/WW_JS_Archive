"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const SceneTeamController_1 = require("../../SceneTeam/SceneTeamController");
const SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine");
const BattleUiDefine_1 = require("../BattleUiDefine");
const BattleUiRoleData_1 = require("../BattleUiRoleData");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const FormationLevelUpItem_1 = require("./FormationLevelUpItem");
const FormationOnlineItem_1 = require("./FormationOnlineItem");
const FormationTrialItem_1 = require("./FormationTrialItem");
const CombineKeyItem_1 = require("./KeyItem/CombineKeyItem");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const REFRESH_COOLDOWN_INTERVAL = 100;
const CURE_DELAY = 1e3;
const LOW_HP_PERCENT = 0.2;
const LEVE_UP_TIME = 5e3;
class FormationItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Art = void 0),
      (this.RoleData = void 0),
      (this.EntityId = void 0),
      (this.FormationIns = void 0),
      (this.RoleConfig = void 0),
      (this.jQe = []),
      (this.ast = 0),
      (this.hst = 0),
      (this.lst = 0),
      (this._st = void 0),
      (this.ust = void 0),
      (this.cst = void 0),
      (this.mst = ""),
      (this.dst = !1),
      (this.Cst = void 0),
      (this.gst = 0),
      (this.xet = void 0),
      (this.fst = void 0),
      (this.pst = void 0),
      (this.vst = void 0),
      (this.Mst = !1),
      (this.Sst = !1),
      (this.Est = !1),
      (this.yst = (t) => {
        ModelManager_1.ModelManager.PlatformModel.OperationType === 2 &&
          ((t = t * TimeUtil_1.TimeUtil.InverseMillisecond), this.Ist(t, t));
      }),
      (this.ZQe = () => {
        this.RoleData && this.RefreshRoleHealthPercent();
      }),
      (this.YKe = (t) => {
        this.RoleData && this.EntityId === t && this.RefreshRoleHealthPercent();
      }),
      (this.Tst = () => {
        this.Lst();
      }),
      (this.XQe = (t, e, i) => {
        !this.FormationIns ||
          (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
              .length > 1) ||
          this.Dst();
      }),
      (this.QQe = (t, e, i) => {
        this.RefreshQteActive();
      }),
      (this.$Qe = (t, e, i) => {
        this.RefreshQteActive();
      }),
      (this.Rst = (t, e) => {
        this.RefreshQteActive();
      }),
      (this.Zpe = () => {
        this.RefreshQteActive();
      }),
      (this.Ust = (t, e) => {
        this.FormationIns && this.Ast();
      }),
      (this.Pst = (t, e) => {
        this.xst();
      }),
      (this.wst = () => {
        this.Bst();
      }),
      (this.bst = () => {
        this.GetItem(4).SetUIActive(!1);
      }),
      (this.qst = () => {
        this.Gst();
      }),
      (this.WQe = (t, e, i) => {
        t === this.EntityId && e === this.ust && this.RoleData && this.Gnt(i);
      }),
      (this.KQe = (t, e, i) => {
        t === this.EntityId && this.RefreshElementVisible();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UINiagara],
      [9, UE.UITexture],
      [12, UE.UISprite],
      [17, UE.UISprite],
      [13, UE.UISprite],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UISprite],
      [6, UE.UIItem],
      [10, UE.UIItem],
      [7, UE.UINiagara],
      [8, UE.UIText],
      [11, UE.UISprite],
      [18, UE.UIItem],
      [19, UE.UIItem],
    ]),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        this.ComponentRegisterInfos.push([20, UE.UIItem]);
  }
  Initialize(t) {
    super.Initialize(t),
      (this.gst =
        ModelManager_1.ModelManager.BattleUiModel.ConcertoChangeEffectDelay),
      this.GetTexture(9).SetUIActive(!1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "FormationItem init", ["", t]),
      this.Ore();
  }
  async InitializeAsync(t) {
    let e;
    ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
      (this.hnt(18),
      this.hnt(19),
      (e = this.GetItem(20)),
      (this.xet = new CombineKeyItem_1.CombineKeyItem()),
      await this.xet.CreateByActorAsync(e.GetOwner()));
  }
  RefreshOtherSceneRole(t, e, i) {
    this.ClearRoleData(),
      (this.FormationIns = void 0),
      (this.RoleConfig =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
      this.Nst(),
      this.RefreshRoleHealthPercent(),
      this.GetItem(14).SetUIActive(!1),
      this.GetSprite(17).SetUIActive(!1),
      this.vst ||
        (this.vst = new FormationOnlineItem_1.FormationOnlineItem(
          this.RootItem,
        ));
    t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
    this.vst.SetOnlineNumber(t?.PlayerNumber ?? -1),
      this.vst.SetNameText(t?.Name ?? ""),
      this.vst.SetIsGrayByOtherControl(!i),
      this.SetActive(!0);
  }
  Refresh(t) {
    this.ClearRoleData(),
      t
        ? (this.FormationIns !== t &&
            ((this.FormationIns = t),
            (this.RoleConfig =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                this.FormationIns.GetConfigId,
              )),
            this.Nst(),
            this.RefreshRoleName()),
          this.RefreshOnlineItem(),
          (t = this.FormationIns.EntityHandle?.Entity) &&
            ((this.EntityId = t.Id),
            (this.RoleData =
              ModelManager_1.ModelManager.BattleUiModel.GetRoleData(
                this.EntityId,
              )),
            (this.Mst =
              this.RoleData?.GameplayTagComponent.HasTag(-2107968822) ?? !1),
            this.eXe(t)),
          this.RefreshRoleHealthPercent(),
          this.Ost(),
          this.Lst(),
          this.kst(),
          this.Fst(),
          this.Vst(),
          this.RefreshQteActive(!0),
          this.Hst(),
          this.SetActive(!0))
        : ((this.FormationIns = void 0), this.SetActive(!1));
  }
  ClearRoleData() {
    const t = this.RoleData?.EntityHandle?.Entity;
    t && this.RemoveEntityEvents(t),
      (this.RoleData = void 0),
      (this.EntityId = void 0);
  }
  Ore() {
    this.GetExtendToggle(0).OnPointDownCallBack.Bind(this.wst),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiElementEnergyChanged,
        this.WQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiElementHideTagChanged,
        this.KQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiHealthChanged,
        this.YKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.ZQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
        this.XQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiDeadTagChanged,
        this.QQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiQteCdTagChanged,
        this.$Qe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharInQteChanged,
        this.Rst,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      );
  }
  kre() {
    this.GetExtendToggle(0).OnPointDownCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiElementEnergyChanged,
        this.WQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiElementHideTagChanged,
        this.KQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiHealthChanged,
        this.YKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.ZQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
        this.XQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiDeadTagChanged,
        this.QQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiQteCdTagChanged,
        this.$Qe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharInQteChanged,
        this.Rst,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      );
  }
  eXe(t) {
    let e;
    EventSystem_1.EventSystem.AddWithTarget(
      t,
      EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
      this.yst,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.Tst,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharUseSkill,
        this.Tst,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.OnSkillEnd,
        this.Tst,
      ),
      this.FormationIns?.IsMyRole()
        ? this.Mst &&
          ((e = t.GetComponent(185)), this.iXe(e, 1414093614, this.Pst))
        : ((e = t.GetComponent(185)), this.iXe(e, 166024319, this.Ust));
  }
  RemoveEntityEvents(t) {
    EventSystem_1.EventSystem.RemoveWithTarget(
      t,
      EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
      this.yst,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.Tst,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharUseSkill,
        this.Tst,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.OnSkillEnd,
        this.Tst,
      ),
      this.jst();
  }
  iXe(t, e, i) {
    t = t.ListenForTagAddOrRemove(e, i);
    t && this.jQe.push(t);
  }
  jst() {
    for (const t of this.jQe) t?.EndTask();
    this.jQe.length = 0;
  }
  OnShowBattleChildView() {
    this.Wst(!1);
  }
  Reset() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "FormationItem Reset"),
      (this.xet = void 0),
      this.kre(),
      (this.ast = 0),
      this.Kst(),
      this.Gst(),
      TimerSystem_1.TimerSystem.Has(this._st) &&
        TimerSystem_1.TimerSystem.Remove(this._st),
      this.pst && (this.pst.Destroy(), (this.pst = void 0)),
      this.fst && (this.fst.Destroy(), (this.fst = void 0)),
      this.vst && (this.vst.Destroy(), (this.vst = void 0)),
      super.Reset();
  }
  OnTick(t) {
    this.ast > 0 &&
      ((this.hst -= t * Time_1.Time.TimeDilation),
      this.hst <= 0
        ? ((this.hst = 0), (this.ast = 0), this.Kst())
        : (Math.abs(this.lst - this.hst) >
            BattleUiDefine_1.CHANGE_COOLDOWN_INTERVAL &&
            ((this.lst -= REFRESH_COOLDOWN_INTERVAL), this.Qst()),
          this.Xst()));
  }
  RefreshTimeRate() {}
  ResetAllConcertoNiagara() {
    this.$st(!1, !0, !1);
  }
  RefreshQteActive(t = 0) {
    this.FormationIns &&
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length > 1
        ? this.Ast()
        : this.Dst());
  }
  Dst(e = !1) {
    if (this.FormationIns) {
      let t = !1;
      let i;
      this.dst &&
        (i =
          ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
            ?.EntityHandle) &&
        this.RoleData &&
        this.RoleData.EntityHandle !== i &&
        (t = this.RoleData.RoleQteComponent.IsQteReady(i)),
        this.$st(t, e, !1);
    } else this.ResetAllConcertoNiagara();
  }
  Ast(e = !1) {
    if (!this.FormationIns || this.FormationIns.IsMyRole())
      this.ResetAllConcertoNiagara();
    else {
      let t = !1;
      const i =
        ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
          ?.EntityHandle;
      const s = this.FormationIns?.EntityHandle;
      i && s && (t = i.Entity.GetComponent(86).IsQteReady(s)),
        this.$st(t, e, !0);
    }
  }
  $st(t, e, i) {
    let s;
    this.Sst !== t &&
      ((this.Sst = t),
      (s = this.GetUiNiagara(5)).SetUIActive(t),
      t
        ? (s.ActivateSystem(!0),
          e || ModelManager_1.ModelManager.BattleUiModel.AudioData.PlayAudio(0))
        : s.Deactivate(),
      this.Yst()),
      this.Jst();
  }
  Vst() {
    let t = this.RoleData?.EntityHandle?.Entity?.GetComponent(81);
    !t || (t = t.GetChangeRoleCoolDown()) <= 0 || this.Ist(t, t);
  }
  zst(t) {
    this.Est !== t &&
      ((this.Est = t)
        ? (this.Irt(19), this.Ert(18))
        : (this.Irt(18), this.Ert(19)));
  }
  Bst() {
    let t, e;
    this.FormationIns
      ? ((t = this.FormationIns.GetCreatureDataId()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 8, "当点击阵容头像按钮时", [
            "CreatureDataId",
            t,
          ]),
        (e = this.FormationIns.EntityHandle)?.Valid
          ? GlobalData_1.GlobalData.GameInstance &&
            (this.FormationIns.IsMyRole()
              ? SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(t)
              : SceneTeamController_1.SceneTeamController.TryUseMultiQte(e))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Formation",
              18,
              "当点击阵容头像按钮时，角色资源还没加载好",
              ["CreatureDataId", t],
            ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Formation", 8, "当点击阵容头像按钮时，阵容实例不存在");
  }
  Kst() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 8, "重置换人冷却表现"),
      this.Wst(!1);
  }
  LevelUp(t) {
    t = t.toString();
    this.fst
      ? this.fst.SetActive(!0)
      : (this.fst = new FormationLevelUpItem_1.FormationLevelUpItem(
          this.RootItem,
        )),
      this.fst.SetLevelText(t),
      this.Zst();
  }
  RefreshConcertoResponseModule(t) {
    (this.dst = t), this.RefreshElementVisible();
  }
  CureRole() {
    !this.RoleData ||
      this.FormationIns.IsControl() ||
      this.FormationIns.IsDead() ||
      this.eat();
  }
  Zst() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.fst && this.fst.SetActive(!1);
    }, LEVE_UP_TIME);
  }
  PlayReviveSequence() {}
  eat() {
    this.GetItem(4).SetUIActive(!0),
      (this._st = TimerSystem_1.TimerSystem.Delay(this.bst, CURE_DELAY));
  }
  tat(t, e) {
    const i = this.GetTexture(9);
    if (i) {
      const s = this.GetTexture(2);
      s &&
        (this.SetRoleIcon(t, i, e, void 0, () => {
          i.SetUIActive(!0);
        }),
        s.SetUIActive(!1),
        this.SetRoleIcon(t, s, e, void 0, () => {
          s.SetUIActive(!0);
        }));
    }
  }
  iat(t) {
    let e = void 0;
    t <= LOW_HP_PERCENT
      ? ((e = this.GetSprite(13)),
        this.GetSprite(12).SetUIActive(!1),
        this.GetSprite(13).SetUIActive(!0))
      : ((e = this.GetSprite(12)),
        this.GetSprite(12).SetUIActive(!0),
        this.GetSprite(13).SetUIActive(!1)),
      e && e.SetFillAmount(t);
  }
  RefreshRoleName() {
    if (this.FormationIns) {
      const e = this.FormationIns.GetConfigId;
      if (e <= RoleDefine_1.ROBOT_DATA_MIN_ID) this.pst?.SetActive(!1);
      else if (
        ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(e)
          ?.HideTrialLabel
      )
        this.pst?.SetActive(!1);
      else {
        this.pst
          ? this.pst.SetActive(!0)
          : (this.pst = new FormationTrialItem_1.FormationTrialItem(
              this.RootItem,
            ));
        let t = "";
        (t = this.FormationIns.IsMyRole()
          ? ModelManager_1.ModelManager.RoleModel.GetRoleName(e)
          : ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
              this.FormationIns.GetPlayerId(),
            )?.Name ?? ""),
          this.pst.SetNameText(t);
      }
    }
  }
  SetRoleSelected(e) {
    if (ModelManager_1.ModelManager.PlatformModel.OperationType === 2) {
      let t = !1;
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength() > 1 && (t = e),
        this.zst(t);
    } else this.zst(e);
    this.Lst();
  }
  RefreshCoolDownOnShow() {
    this.RoleData && (this.Vst(), this.xst());
  }
  Ist(t, e) {
    t <= 0
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Formation",
            8,
            "播放换人冷却CD时，CD时间小于0，不会播放换人冷却CD表现",
            ["coolDownTime", t],
          ),
        this.Kst())
      : ((this.ast = t),
        (this.hst = e),
        (this.lst = this.hst),
        this.Qst(),
        this.Xst(),
        this.Wst(!0));
  }
  Xst() {
    let t;
    this.ast <= 0 ||
      ((t = this.hst / this.ast), this.GetTexture(2).SetFillAmount(t));
  }
  Qst() {
    this.GetText(3)?.SetText(
      (this.lst * TimeUtil_1.TimeUtil.Millisecond).toFixed(1),
    );
  }
  Wst(t) {
    this.GetItem(1)?.SetUIActive(t);
  }
  Nst() {
    let t;
    this.RoleConfig &&
      (t = this.RoleConfig.RoleHeadIconBig) &&
      t.length !== 0 &&
      this.tat(t, this.RoleConfig.Id);
  }
  RefreshSelectedRole() {
    let t;
    this.FormationIns &&
      this.RoleData?.AttributeComponent &&
      (!this.FormationIns.IsMyRole() ||
      (this.Fst(),
      this.RoleData.AttributeComponent.GetCurrentValue(
        EAttributeId.Proto_Life,
      ) <= 0)
        ? this.SetRoleSelected(!1)
        : ((t = this.RoleData.IsCurEntity),
          this.SetRoleSelected(t),
          this.RefreshElementVisible()));
  }
  ActivateConcertoChangeEffect(t, e) {
    this.GetText(8).SetUIActive(!1);
    this.GetUiNiagara(7).ActivateSystem(!0);
    const i = this.GetItem(6);
    i.IsUIActiveSelf() || i.SetUIActive(!0),
      (this.Cst = TimerSystem_1.TimerSystem.Delay(this.qst, this.gst));
  }
  Gst() {
    const t = this.GetItem(6);
    t.IsUIActiveSelf() && t.SetUIActive(!1),
      this.GetUiNiagara(7).DeactivateSystem(),
      this.Cst &&
        TimerSystem_1.TimerSystem.Has(this.Cst) &&
        (TimerSystem_1.TimerSystem.Remove(this.Cst), (this.Cst = void 0));
  }
  Hst() {
    this.GetItem(10).SetUIActive(!this.Mst), this.Yst(), this.xst();
  }
  Yst() {}
  xst() {
    let t, e;
    this.Mst &&
      (!(this.RoleData?.GameplayTagComponent.HasTag(1414093614) ?? !1) ||
      ((t =
        (e = this.RoleData?.BuffComponent.GetBuffById(
          CharacterBuffIds_1.buffId.QteAssistCd,
        ))?.GetRemainDuration() ?? 0),
      (e = e?.Duration ?? 0),
      t <= 0) ||
      e <= 0
        ? this.Kst()
        : this.Ist(
            e * TimeUtil_1.TimeUtil.InverseMillisecond,
            t * TimeUtil_1.TimeUtil.InverseMillisecond,
          ));
  }
  RefreshRoleHealthPercent() {
    let t;
    let e;
    let i;
    let s;
    const h = this.GetExtendToggle(0);
    h &&
      ((t =
        this.RoleData?.AttributeComponent?.GetCurrentValue(
          EAttributeId.Proto_Life,
        ) ?? 1),
      (e =
        this.RoleData?.AttributeComponent?.GetCurrentValue(EAttributeId.Tkn) ??
        1),
      (i = this.RoleData?.ShieldComponent.ShieldTotal ?? 0),
      t <= 0 || e <= 0
        ? (h.SetToggleState(2, !1),
          this.GetTexture(9).SetIsGray(!0),
          this.GetTexture(2)?.SetIsGray(!0),
          this.GetSprite(11).SetUIActive(!1),
          this.iat(0))
        : (i > 0
            ? ((s = this.GetSprite(11)).SetUIActive(!0), s.SetFillAmount(i / e))
            : this.GetSprite(11).SetUIActive(!1),
          h.SetToggleState(0, !1),
          this.GetTexture(9).SetIsGray(!1),
          this.GetTexture(2)?.SetIsGray(!1),
          this.iat(t / e),
          this.RefreshSelectedRole()));
  }
  Lst() {
    let t;
    ModelManager_1.ModelManager.PlatformModel.OperationType === 2
      ? this.RoleData?.IsCurEntity
        ? this.GetSprite(17).SetUIActive(!1)
        : ((t = this.oat()), this.GetSprite(17).SetUIActive(t))
      : ((t = this.oat()), this.GetSprite(17).SetUIActive(t));
  }
  kst() {
    const t = this.RoleData?.ElementConfig;
    t &&
      this.mst !== t.UltimateSkillColor &&
      ((this.mst = t.UltimateSkillColor),
      this.GetSprite(17).SetColor(this.RoleData.UltimateSkillColor));
  }
  Fst() {
    let t;
    ModelManager_1.ModelManager.PlatformModel.OperationType === 2 &&
      (!this.FormationIns ||
      (this.RoleData && this.RoleData.IsCurEntity) ||
      (t =
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(
          this.FormationIns.GetPlayerId(),
          this.FormationIns.GetConfigId,
        ) ?? 0) <= 0
        ? this.xet.SetActive(!1)
        : (this.xet.RefreshAction("切换角色" + t), this.xet.SetActive(!0)));
  }
  Jst() {
    if (this.xet) {
      let t = !1;
      this.FormationIns?.IsMyRole() || (t = !this.Sst), this.xet.SetGray(t);
    }
  }
  oat() {
    let t;
    const e = this.RoleData?.AttributeComponent;
    return (
      !!e &&
      ((t = e.GetCurrentValue(EAttributeId.Proto_Energy)),
      e.GetCurrentValue(EAttributeId.Proto_EnergyMax) <= t)
    );
  }
  Ost() {
    this.RoleData
      ? (this.ust !== this.RoleData.ElementType &&
          ((this.ust = this.RoleData.ElementType),
          (this.cst = this.RoleData.ElementConfig),
          this.Ont(this.cst, this.ust)),
        this.Gnt(this.GetElementValue()),
        this.RefreshElementVisible())
      : this.GetItem(14).SetUIActive(!1);
  }
  RefreshElementVisible() {
    if (this.RoleData) {
      const t = this.GetItem(14);
      if (this.dst)
        if (this.RoleData.RoleConfig?.RoleType === 2)
          t.SetUIActive(!1), this.ResetAllConcertoNiagara();
        else {
          const e = ModelManager_1.ModelManager.PlatformModel.OperationType;
          if (e === 2 && this.RoleData.IsCurEntity) t.SetUIActive(!1);
          else {
            for (const i of BattleUiRoleData_1.BattleUiRoleData
              .HideElementTagList)
              if (this.RoleData.GameplayTagComponent?.HasTag(i))
                return void t.SetUIActive(!1);
            t.SetUIActive(!0);
          }
        }
      else t.SetUIActive(!1);
    }
  }
  Ont(t, e) {
    var t = t.Icon5;
    const i = this.GetSprite(16);
    const s = this.GetTexture(15);
    this.SetElementIcon(t, s, e),
      s.SetColor(this.RoleData.ElementColor),
      i.SetColor(this.RoleData.ElementColor);
  }
  Gnt(t) {
    const e = this.GetSprite(16);
    var t = t / SceneTeamDefine_1.MAX_ELEMENT_ENERGY;
    e.SetFillAmount(t);
  }
  GetElementValue() {
    let t;
    return this.RoleData && (t = this.RoleData.GetElementAttributeId())
      ? this.RoleData.AttributeComponent.GetCurrentValue(t)
      : 0;
  }
  RefreshOnlineItem() {
    let t, e;
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? (t = this.FormationIns) &&
        (this.vst ||
          (this.vst = new FormationOnlineItem_1.FormationOnlineItem(
            this.RootItem,
          )),
        (e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
          t.GetPlayerId(),
        )) && this.RefreshPlayerPingState(e.PingState),
        t.IsMyRole()
          ? (this.vst.SetOnlineNumber(-1), this.vst.SetNameText(""))
          : (this.vst.SetOnlineNumber(e?.PlayerNumber ?? -1),
            this.vst.SetNameText(e?.Name ?? ""),
            this.vst.SetIsGrayByOtherControl(!t.IsControl())))
      : (this.vst?.Destroy(), (this.vst = void 0));
  }
  RefreshPlayerPingState(t) {
    t === Protocol_1.Aki.Protocol.oFs.Proto_POOR
      ? (this.vst.SetNetWeak(!0), this.vst.SetNetDisconnect(!1))
      : t === Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN
        ? (this.vst.SetNetDisconnect(!0), this.vst.SetNetWeak(!1))
        : (this.vst.SetNetWeak(!1), this.vst.SetNetDisconnect(!1));
  }
  hnt(t) {
    const e = [];
    const i = this.GetItem(t)
      .GetOwner()
      .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    const s = i.Num();
    for (let t = 0; t < s; t++) e.push(i.Get(t));
    this.Art || (this.Art = new Map()), this.Art.set(t, e);
  }
  Ert(t) {
    t = this.Art?.get(t);
    if (t) for (const e of t) e.Play();
  }
  Irt(t) {
    t = this.Art?.get(t);
    if (t) for (const e of t) e.Stop();
  }
}
exports.FormationItem = FormationItem;
// # sourceMappingURL=FormationItem.js.map
