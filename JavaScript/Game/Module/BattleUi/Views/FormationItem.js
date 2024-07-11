"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  SceneTeamController_1 = require("../../SceneTeam/SceneTeamController"),
  BattleUiDefine_1 = require("../BattleUiDefine"),
  BattleUiRoleData_1 = require("../BattleUiRoleData"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  FormationLevelUpItem_1 = require("./FormationLevelUpItem"),
  FormationOnlineItem_1 = require("./FormationOnlineItem"),
  FormationTrialItem_1 = require("./FormationTrialItem"),
  CombineKeyItem_1 = require("./KeyItem/CombineKeyItem");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const Info_1 = require("../../../../Core/Common/Info"),
  CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  REFRESH_COOLDOWN_INTERVAL = 100,
  CURE_DELAY = 1e3,
  LOW_HP_PERCENT = 0.2,
  LEVE_UP_TIME = 5e3;
class FormationItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Hnt = void 0),
      (this.RoleData = void 0),
      (this.EntityId = void 0),
      (this.FormationIns = void 0),
      (this.RoleConfig = void 0),
      (this.i$e = []),
      (this.vat = 0),
      (this.Eat = 0),
      (this.Sat = 0),
      (this.yat = void 0),
      (this.Iat = void 0),
      (this.Tat = void 0),
      (this.Lat = ""),
      (this.Dat = !1),
      (this.Rat = void 0),
      (this.Uat = 0),
      (this.Qtt = void 0),
      (this.Aat = void 0),
      (this.Pat = void 0),
      (this.xat = void 0),
      (this.wat = !1),
      (this.Bat = !1),
      (this.bat = !1),
      (this.qat = (t) => {
        2 === Info_1.Info.OperationType &&
          ((t = t * TimeUtil_1.TimeUtil.InverseMillisecond), this.Gat(t, t));
      }),
      (this.u$e = () => {
        this.RoleData && this.RefreshRoleHealthPercent();
      }),
      (this.hXe = (t) => {
        this.RoleData && this.EntityId === t && this.RefreshRoleHealthPercent();
      }),
      (this.Nat = () => {
        this.Oat();
      }),
      (this.s$e = (t, i, e) => {
        !this.FormationIns ||
          (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            1 <
              ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
                .length) ||
          this.kat();
      }),
      (this.n$e = (t, i, e) => {
        this.RefreshQteActive();
      }),
      (this.a$e = (t, i, e) => {
        this.RefreshQteActive();
      }),
      (this.Fat = (t, i) => {
        this.RefreshQteActive();
      }),
      (this.Zpe = () => {
        this.RefreshQteActive();
      }),
      (this.Vat = (t, i) => {
        this.FormationIns && this.Hat();
      }),
      (this.jat = (t, i) => {
        this.Wat();
      }),
      (this.Kat = () => {
        this.Qat();
      }),
      (this.Xat = () => {
        this.GetItem(4).SetUIActive(!1);
      }),
      (this.$at = () => {
        this.Yat();
      }),
      (this.o$e = (t) => {
        t === this.EntityId && this.KSa();
      }),
      (this.r$e = (t, i, e) => {
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
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([20, UE.UIItem]);
  }
  Initialize(t) {
    super.Initialize(t),
      (this.Uat =
        ModelManager_1.ModelManager.BattleUiModel.ConcertoChangeEffectDelay),
      this.GetTexture(9).SetUIActive(!1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "FormationItem init", ["", t]),
      this.Ore();
  }
  async InitializeAsync(t) {
    var i;
    Info_1.Info.IsInTouch() ||
      (this.Est(18),
      this.Est(19),
      (i = this.GetItem(20)),
      (this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
      await this.Qtt.CreateByActorAsync(i.GetOwner()));
  }
  RefreshOtherSceneRole(t, i, e) {
    this.ClearRoleData(),
      (this.FormationIns = void 0),
      (this.RoleConfig =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
      this.Jat(),
      this.RefreshRoleHealthPercent(),
      this.GetItem(14).SetUIActive(!1),
      this.GetSprite(17).SetUIActive(!1),
      this.xat ||
        (this.xat = new FormationOnlineItem_1.FormationOnlineItem(
          this.RootItem,
        ));
    t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(i);
    this.xat.SetOnlineNumber(t?.PlayerNumber ?? -1),
      this.xat.SetNameText(t?.Name ?? ""),
      this.xat.SetIsGrayByOtherControl(!e),
      this.SetActive(!0);
  }
  Refresh(i) {
    if ((this.ClearRoleData(), i)) {
      var e = i.EntityHandle?.Entity;
      let t = void 0;
      if (e) {
        var s = (t = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(
          e.Id,
        ))?.RoleBattleViewInfo;
        if (s && !s.FormationVisible)
          return (this.FormationIns = void 0), void this.SetActive(!1);
      }
      this.FormationIns !== i &&
        ((this.FormationIns = i),
        (this.RoleConfig =
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            this.FormationIns.GetConfigId,
          )),
        this.Jat(),
        this.RefreshRoleName()),
        this.RefreshOnlineItem(),
        e &&
          ((this.EntityId = e.Id),
          (this.RoleData = t),
          (this.wat =
            this.RoleData?.GameplayTagComponent.HasTag(-2107968822) ?? !1),
          this.c$e(e)),
        this.RefreshRoleHealthPercent(),
        this.zat(),
        this.Oat(),
        this.Zat(),
        this.eht(),
        this.tht(),
        this.RefreshQteActive(!0),
        this.iht(),
        this.SetActive(!0);
    } else (this.FormationIns = void 0), this.SetActive(!1);
  }
  ClearRoleData() {
    var t = this.RoleData?.EntityHandle?.Entity;
    t && this.RemoveEntityEvents(t),
      (this.RoleData = void 0),
      (this.EntityId = void 0);
  }
  Ore() {
    this.GetExtendToggle(0).OnPointDownCallBack.Bind(this.Kat),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiElementEnergyChanged,
        this.o$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiElementHideTagChanged,
        this.r$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiHealthChanged,
        this.hXe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.u$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
        this.s$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiDeadTagChanged,
        this.n$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiQteCdTagChanged,
        this.a$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharInQteChanged,
        this.Fat,
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
        this.o$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiElementHideTagChanged,
        this.r$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiHealthChanged,
        this.hXe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.u$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
        this.s$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiDeadTagChanged,
        this.n$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiQteCdTagChanged,
        this.a$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharInQteChanged,
        this.Fat,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      );
  }
  c$e(t) {
    var i;
    EventSystem_1.EventSystem.AddWithTarget(
      t,
      EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
      this.qat,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.Nat,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharUseSkill,
        this.Nat,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.OnSkillEnd,
        this.Nat,
      ),
      this.FormationIns?.IsMyRole()
        ? this.wat &&
          ((i = t.GetComponent(188)), this.d$e(i, 1414093614, this.jat))
        : ((i = t.GetComponent(188)), this.d$e(i, 166024319, this.Vat));
  }
  RemoveEntityEvents(t) {
    EventSystem_1.EventSystem.RemoveWithTarget(
      t,
      EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
      this.qat,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.Nat,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharUseSkill,
        this.Nat,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.OnSkillEnd,
        this.Nat,
      ),
      this.oht();
  }
  d$e(t, i, e) {
    t = t.ListenForTagAddOrRemove(i, e);
    t && this.i$e.push(t);
  }
  oht() {
    for (const t of this.i$e) t?.EndTask();
    this.i$e.length = 0;
  }
  OnShowBattleChildView() {
    this.rht(!1);
  }
  Reset() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "FormationItem Reset"),
      (this.Qtt = void 0),
      this.kre(),
      (this.vat = 0),
      this.nht(),
      this.Yat(),
      TimerSystem_1.TimerSystem.Has(this.yat) &&
        TimerSystem_1.TimerSystem.Remove(this.yat),
      this.Pat && (this.Pat.Destroy(), (this.Pat = void 0)),
      this.Aat && (this.Aat.Destroy(), (this.Aat = void 0)),
      this.xat && (this.xat.Destroy(), (this.xat = void 0)),
      super.Reset();
  }
  OnTick(t) {
    0 < this.vat &&
      ((this.Eat -= t * Time_1.Time.TimeDilation),
      this.Eat <= 0
        ? ((this.Eat = 0), (this.vat = 0), this.nht())
        : (Math.abs(this.Sat - this.Eat) >
            BattleUiDefine_1.CHANGE_COOLDOWN_INTERVAL &&
            ((this.Sat -= REFRESH_COOLDOWN_INTERVAL), this.sht()),
          this.aht()));
  }
  RefreshTimeRate() {}
  ResetAllConcertoNiagara() {
    this.hht(!1, !0, !1);
  }
  RefreshQteActive(t = 0) {
    this.FormationIns &&
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
        ? this.Hat()
        : this.kat());
  }
  kat(i = !1) {
    if (this.FormationIns) {
      let t = !1;
      var e;
      this.Dat &&
        (e =
          ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
            ?.EntityHandle) &&
        this.RoleData &&
        this.RoleData.EntityHandle !== e &&
        (t = this.RoleData.RoleQteComponent.IsQteReady(e)),
        this.hht(t, i, !1);
    } else this.ResetAllConcertoNiagara();
  }
  Hat(i = !1) {
    if (!this.FormationIns || this.FormationIns.IsMyRole())
      this.ResetAllConcertoNiagara();
    else {
      let t = !1;
      var e =
          ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
            ?.EntityHandle,
        s = this.FormationIns?.EntityHandle;
      e && s && (t = e.Entity.GetComponent(88).IsQteReady(s)),
        this.hht(t, i, !0);
    }
  }
  hht(t, i, e) {
    var s;
    this.Bat !== t &&
      ((this.Bat = t),
      (s = this.GetUiNiagara(5)).SetUIActive(t),
      t
        ? (s.ActivateSystem(!0),
          i ||
            ((t = this.wat ? 1 : 0),
            (i = Info_1.Info.IsInGamepad() ? 8 : 7),
            ModelManager_1.ModelManager.BattleUiModel.AudioData.PlayAudio(
              t,
              i,
            )))
        : s.Deactivate(),
      this.lht()),
      this._ht();
  }
  tht() {
    var t = this.RoleData?.EntityHandle?.Entity?.GetComponent(83);
    !t || (t = t.GetChangeRoleCoolDown()) <= 0 || this.Gat(t, t);
  }
  uht(t) {
    this.bat !== t &&
      ((this.bat = t)
        ? (this.Gnt(19), this.bnt(18))
        : (this.Gnt(18), this.bnt(19)));
  }
  Qat() {
    var t, i;
    this.FormationIns
      ? ((t = this.FormationIns.GetCreatureDataId()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 8, "当点击阵容头像按钮时", [
            "CreatureDataId",
            t,
          ]),
        (i = this.FormationIns.EntityHandle)?.Valid
          ? GlobalData_1.GlobalData.GameInstance &&
            (this.FormationIns.IsMyRole()
              ? SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(t)
              : SceneTeamController_1.SceneTeamController.TryUseMultiQte(i))
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
  nht() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 8, "重置换人冷却表现"),
      this.rht(!1);
  }
  LevelUp(t) {
    t = t.toString();
    this.Aat
      ? this.Aat.SetActive(!0)
      : (this.Aat = new FormationLevelUpItem_1.FormationLevelUpItem(
          this.RootItem,
        )),
      this.Aat.SetLevelText(t),
      this.cht();
  }
  RefreshConcertoResponseModule(t) {
    (this.Dat = t), this.RefreshElementVisible();
  }
  CureRole() {
    !this.RoleData ||
      this.FormationIns.IsControl() ||
      this.FormationIns.IsDead() ||
      this.mht();
  }
  cht() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Aat && this.Aat.SetActive(!1);
    }, LEVE_UP_TIME);
  }
  PlayReviveSequence() {}
  mht() {
    this.GetItem(4).SetUIActive(!0),
      (this.yat = TimerSystem_1.TimerSystem.Delay(this.Xat, CURE_DELAY));
  }
  dht(t, i) {
    const e = this.GetTexture(9);
    if (e) {
      const s = this.GetTexture(2);
      s &&
        (this.SetRoleIcon(t, e, i, void 0, () => {
          e.SetUIActive(!0);
        }),
        s.SetUIActive(!1),
        this.SetRoleIcon(t, s, i, void 0, () => {
          s.SetUIActive(!0);
        }));
    }
  }
  Cht(t) {
    let i = void 0;
    t <= LOW_HP_PERCENT
      ? ((i = this.GetSprite(13)),
        this.GetSprite(12).SetUIActive(!1),
        this.GetSprite(13).SetUIActive(!0))
      : ((i = this.GetSprite(12)),
        this.GetSprite(12).SetUIActive(!0),
        this.GetSprite(13).SetUIActive(!1)),
      i && i.SetFillAmount(t);
  }
  RefreshRoleName() {
    if (this.FormationIns) {
      var i = this.FormationIns.GetConfigId;
      if (i <= RoleDefine_1.ROBOT_DATA_MIN_ID) this.Pat?.SetActive(!1);
      else if (
        ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(i)
          ?.HideTrialLabel
      )
        this.Pat?.SetActive(!1);
      else {
        this.Pat
          ? this.Pat.SetActive(!0)
          : (this.Pat = new FormationTrialItem_1.FormationTrialItem(
              this.RootItem,
            ));
        let t = "";
        (t = this.FormationIns.IsMyRole()
          ? ModelManager_1.ModelManager.RoleModel.GetRoleName(i)
          : ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
              this.FormationIns.GetPlayerId(),
            )?.Name ?? ""),
          this.Pat.SetNameText(t);
      }
    }
  }
  SetRoleSelected(i) {
    if (2 === Info_1.Info.OperationType) {
      let t = !1;
      1 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength() && (t = i),
        this.uht(t);
    } else this.uht(i);
    this.Oat();
  }
  RefreshCoolDownOnShow() {
    this.RoleData && (this.tht(), this.Wat());
  }
  Gat(t, i) {
    t <= 0
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Formation",
            8,
            "播放换人冷却CD时，CD时间小于0，不会播放换人冷却CD表现",
            ["coolDownTime", t],
          ),
        this.nht())
      : ((this.vat = t),
        (this.Eat = i),
        (this.Sat = this.Eat),
        this.sht(),
        this.aht(),
        this.rht(!0));
  }
  aht() {
    var t;
    this.vat <= 0 ||
      ((t = this.Eat / this.vat), this.GetTexture(2).SetFillAmount(t));
  }
  sht() {
    this.GetText(3)?.SetText(
      (this.Sat * TimeUtil_1.TimeUtil.Millisecond).toFixed(1),
    );
  }
  rht(t) {
    this.GetItem(1)?.SetUIActive(t);
  }
  Jat() {
    var t;
    this.RoleConfig &&
      (t = this.RoleConfig.RoleHeadIconBig) &&
      0 !== t.length &&
      this.dht(t, this.RoleConfig.Id);
  }
  RefreshSelectedRole() {
    var t;
    this.FormationIns &&
      this.RoleData?.AttributeComponent &&
      (!this.FormationIns.IsMyRole() ||
      (this.eht(),
      this.RoleData.AttributeComponent.GetCurrentValue(
        EAttributeId.Proto_Life,
      ) <= 0)
        ? this.SetRoleSelected(!1)
        : ((t = this.RoleData.IsCurEntity),
          this.SetRoleSelected(t),
          this.RefreshElementVisible()));
  }
  ActivateConcertoChangeEffect(t, i) {
    this.GetText(8).SetUIActive(!1);
    this.GetUiNiagara(7).ActivateSystem(!0);
    var e = this.GetItem(6);
    e.IsUIActiveSelf() || e.SetUIActive(!0),
      (this.Rat = TimerSystem_1.TimerSystem.Delay(this.$at, this.Uat));
  }
  Yat() {
    var t = this.GetItem(6);
    t.IsUIActiveSelf() && t.SetUIActive(!1),
      this.GetUiNiagara(7).DeactivateSystem(),
      this.Rat &&
        TimerSystem_1.TimerSystem.Has(this.Rat) &&
        (TimerSystem_1.TimerSystem.Remove(this.Rat), (this.Rat = void 0));
  }
  iht() {
    this.GetItem(10).SetUIActive(!this.wat), this.lht(), this.Wat();
  }
  lht() {}
  Wat() {
    var t, i;
    this.wat &&
      (!(this.RoleData?.GameplayTagComponent.HasTag(1414093614) ?? !1) ||
      ((t =
        (i = this.RoleData?.BuffComponent.GetBuffById(
          CharacterBuffIds_1.buffId.QteAssistCd,
        ))?.GetRemainDuration() ?? 0),
      (i = i?.Duration ?? 0),
      t <= 0) ||
      i <= 0
        ? this.nht()
        : this.Gat(
            i * TimeUtil_1.TimeUtil.InverseMillisecond,
            t * TimeUtil_1.TimeUtil.InverseMillisecond,
          ));
  }
  RefreshRoleHealthPercent() {
    var t,
      i,
      e,
      s,
      h = this.GetExtendToggle(0);
    h &&
      ((t =
        this.RoleData?.AttributeComponent?.GetCurrentValue(
          EAttributeId.Proto_Life,
        ) ?? 1),
      (i =
        this.RoleData?.AttributeComponent?.GetCurrentValue(EAttributeId.e5n) ??
        1),
      (e = this.RoleData?.ShieldComponent.ShieldTotal ?? 0),
      t <= 0 || i <= 0
        ? (h.SetToggleState(2, !1),
          this.GetTexture(9).SetIsGray(!0),
          this.GetTexture(2)?.SetIsGray(!0),
          this.GetSprite(11).SetUIActive(!1),
          this.Cht(0))
        : (0 < e
            ? ((s = this.GetSprite(11)).SetUIActive(!0), s.SetFillAmount(e / i))
            : this.GetSprite(11).SetUIActive(!1),
          h.SetToggleState(0, !1),
          this.GetTexture(9).SetIsGray(!1),
          this.GetTexture(2)?.SetIsGray(!1),
          this.Cht(t / i),
          this.RefreshSelectedRole()));
  }
  Oat() {
    var t;
    2 === Info_1.Info.OperationType
      ? this.RoleData?.IsCurEntity
        ? this.GetSprite(17).SetUIActive(!1)
        : ((t = this.ght()), this.GetSprite(17).SetUIActive(t))
      : ((t = this.ght()), this.GetSprite(17).SetUIActive(t));
  }
  Zat() {
    var t = this.RoleData?.ElementConfig;
    t &&
      this.Lat !== t.UltimateSkillColor &&
      ((this.Lat = t.UltimateSkillColor),
      this.GetSprite(17).SetColor(this.RoleData.UltimateSkillColor));
  }
  eht() {
    var t;
    2 === Info_1.Info.OperationType &&
      (!this.FormationIns ||
      (this.RoleData && this.RoleData.IsCurEntity) ||
      (t =
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(
          this.FormationIns.GetPlayerId(),
          this.FormationIns.GetConfigId,
        ) ?? 0) <= 0
        ? this.Qtt.SetActive(!1)
        : (this.Qtt.RefreshAction("切换角色" + t), this.Qtt.SetActive(!0)));
  }
  _ht() {
    if (this.Qtt) {
      let t = !1;
      this.FormationIns?.IsMyRole() || (t = !this.Bat), this.Qtt.SetGray(t);
    }
  }
  ght() {
    var t,
      i = this.RoleData?.AttributeComponent;
    return (
      !!i &&
      ((t = i.GetCurrentValue(EAttributeId.Proto_Energy)),
      i.GetCurrentValue(EAttributeId.Proto_EnergyMax) <= t)
    );
  }
  zat() {
    this.RoleData
      ? (this.Iat !== this.RoleData.ElementType &&
          ((this.Iat = this.RoleData.ElementType),
          (this.Tat = this.RoleData.ElementConfig),
          this.Jst(this.Tat, this.Iat)),
        this.KSa(),
        this.RefreshElementVisible())
      : this.GetItem(14).SetUIActive(!1);
  }
  RefreshElementVisible() {
    if (this.RoleData) {
      var t = this.GetItem(14);
      if (this.Dat)
        if (2 === this.RoleData.RoleConfig?.RoleType)
          t.SetUIActive(!1), this.ResetAllConcertoNiagara();
        else {
          var i = Info_1.Info.OperationType;
          if (2 === i && this.RoleData.IsCurEntity) t.SetUIActive(!1);
          else {
            for (const e of BattleUiRoleData_1.BattleUiRoleData
              .HideElementTagList)
              if (this.RoleData.GameplayTagComponent?.HasTag(e))
                return void t.SetUIActive(!1);
            t.SetUIActive(!0);
          }
        }
      else t.SetUIActive(!1);
    }
  }
  Jst(t, i) {
    var t = t.Icon5,
      e = this.GetSprite(16),
      s = this.GetTexture(15);
    this.SetElementIcon(t, s, i),
      s.SetColor(this.RoleData.ElementColor),
      e.SetColor(this.RoleData.ElementColor);
  }
  KSa() {
    this.GetSprite(16).SetFillAmount(this.GetElementPercent());
  }
  GetElementPercent() {
    return this.RoleData ? this.RoleData.GetElementAttributePercent() : 0;
  }
  RefreshOnlineItem() {
    var t, i;
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? (t = this.FormationIns) &&
        (this.xat ||
          (this.xat = new FormationOnlineItem_1.FormationOnlineItem(
            this.RootItem,
          )),
        (i = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
          t.GetPlayerId(),
        )) && this.RefreshPlayerPingState(i.PingState),
        t.IsMyRole()
          ? (this.xat.SetOnlineNumber(-1), this.xat.SetNameText(""))
          : (this.xat.SetOnlineNumber(i?.PlayerNumber ?? -1),
            this.xat.SetNameText(i?.Name ?? ""),
            this.xat.SetIsGrayByOtherControl(!t.IsControl())))
      : (this.xat?.Destroy(), (this.xat = void 0));
  }
  RefreshPlayerPingState(t) {
    t === Protocol_1.Aki.Protocol.Y8s.Proto_POOR
      ? (this.xat.SetNetWeak(!0), this.xat.SetNetDisconnect(!1))
      : t === Protocol_1.Aki.Protocol.Y8s.Proto_UNKNOWN
        ? (this.xat.SetNetDisconnect(!0), this.xat.SetNetWeak(!1))
        : (this.xat.SetNetWeak(!1), this.xat.SetNetDisconnect(!1));
  }
  Est(t) {
    var i = [],
      e = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e.Num();
    for (let t = 0; t < s; t++) i.push(e.Get(t));
    this.Hnt || (this.Hnt = new Map()), this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const i of t) i.Play();
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const i of t) i.Stop();
  }
}
exports.FormationItem = FormationItem;
//# sourceMappingURL=FormationItem.js.map
