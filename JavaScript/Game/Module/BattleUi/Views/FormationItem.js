"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
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
  CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  RoleQteComponent_1 = require("../../../NewWorld/Character/Role/Component/RoleQteComponent"),
  CooperationController_1 = require("../../Battle/Cooperation/CooperationController"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  BattleUiDefine_1 = require("../BattleUiDefine"),
  BattleUiRoleData_1 = require("../BattleUiRoleData"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  FormationLevelUpItem_1 = require("./FormationLevelUpItem"),
  FormationOnlineItem_1 = require("./FormationOnlineItem"),
  FormationTrialItem_1 = require("./FormationTrialItem"),
  CombineKeyItem_1 = require("./KeyItem/CombineKeyItem");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const REFRESH_COOLDOWN_INTERVAL = 100,
  CURE_DELAY = 1e3,
  LOW_HP_PERCENT = 0.2,
  LEVE_UP_TIME = 5e3;
class FormationItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Hnt = void 0),
      (this.PrefabIndex = 0),
      (this.PlayerId = 0),
      (this.IsMyRole = !1),
      (this.RoleConfigId = 0),
      (this.RoleSkinId = 0),
      (this.RoleData = void 0),
      (this.EntityId = void 0),
      (this.RoleConfig = void 0),
      (this.RoleSkinConfig = void 0),
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
      (this.yoh = !1),
      (this.rxl = !1),
      (this.Znh = !1),
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
      (this.s$e = (t, i, e) => {
        (0, RoleQteComponent_1.isMultiQte)() || this.kat();
      }),
      (this.Vat = (t, i) => {
        this.Hat();
      }),
      (this.jat = (t, i) => {
        this.Wat();
      }),
      (this.RefreshQteActive = () => {
        (0, RoleQteComponent_1.isMultiQte)() ? this.Hat() : this.kat();
      }),
      (this.Kat = () => {
        var t = this.RoleData?.CreatureDataId;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 17, "当点击阵容头像按钮时", [
            "CreatureDataId",
            t,
          ]),
          GlobalData_1.GlobalData.GameInstance &&
            t &&
            CooperationController_1.CooperationController.TryCooperate(t);
      }),
      (this.$at = () => {
        this.Yat();
      }),
      (this.o$e = (t) => {
        t === this.EntityId && this.yTa();
      }),
      (this.Trc = (t) => {
        t === this.EntityId && this.Oat();
      }),
      (this.r$e = (t, i, e) => {
        t === this.EntityId && this.RefreshElementVisible();
      }),
      (this.Eoh = (t) => {
        var i =
          ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
        i && i.Id === this.EntityId && 4 !== t
          ? this.RefreshLinkActive(!1)
          : 2 === t
            ? this.RefreshLinkActive(!0)
            : 3 === t
              ? this.EntityId
                ? ((i =
                    !ModelManager_1.ModelManager.BattleLinkModel.HasLinkEntityId(
                      this.EntityId,
                    )),
                  this.RefreshLinkActive(i))
                : this.RefreshLinkActive(!1)
              : 4 === t
                ? this.RefreshLinkActive(!0, !0)
                : this.RefreshLinkActive(!1);
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
      [20, UE.UIItem],
      [21, UE.UINiagara],
      [22, UE.UINiagara],
      [23, UE.UIItem],
    ]),
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([24, UE.UIItem]);
  }
  Initialize(t) {
    super.Initialize(t),
      (this.PrefabIndex = t),
      (this.Uat =
        ModelManager_1.ModelManager.BattleUiModel.ConcertoChangeEffectDelay),
      this.GetTexture(9).SetUIActive(!1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "FormationItem init", ["", t]),
      this.Ore();
  }
  async InitializeAsync(t) {
    var i;
    Info_1.Info.IsInTouch() ||
      (this.Est(18),
      this.Est(19),
      (i = this.GetItem(24)),
      (this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
      await this.Qtt.CreateByActorAsync(i.GetOwner()));
  }
  ResetItem() {
    this.ClearData(), this.SetActive(!1);
  }
  Refresh(t, i, e, s) {
    this.ClearData(),
      (this.PlayerId = t),
      (this.IsMyRole =
        t === ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
      (this.RoleConfigId === i && this.RoleSkinId === e) ||
        ((this.RoleConfigId = i),
        (this.RoleSkinId = e),
        (this.RoleConfig =
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            this.RoleConfigId,
          )),
        1 === this.RoleConfig.RoleType
          ? (this.RoleSkinConfig =
              ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(
                this.RoleSkinId,
              ))
          : (this.RoleSkinConfig = void 0),
        this.Jat(),
        this.RefreshRoleName()),
      this.RefreshOnlineItem();
    t = s?.EntityHandle?.Entity;
    t?.IsInit
      ? ((this.EntityId = t.Id),
        (this.RoleData = s),
        (this.wat =
          this.RoleData?.GameplayTagComponent.HasTag(-2107968822) ?? !1),
        this.c$e(t),
        this.RefreshRoleHealthPercent(),
        this.zat(),
        this.Oat(),
        this.Zat(),
        this.eht(),
        this.tht(),
        this.RefreshQteActive(),
        this.RefreshLinkEffect(),
        this.iht())
      : (this.RefreshRoleHealthPercent(),
        this.GetItem(14).SetUIActive(!1),
        this.GetSprite(17).SetUIActive(!1)),
      this.SetActive(!0);
  }
  ClearData() {
    let t = this.RoleData?.EntityHandle?.Entity;
    !t &&
      this.EntityId &&
      (t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(
        this.EntityId,
      )?.Entity),
      this.RemoveEntityEvents(t),
      (this.RoleData = void 0),
      (this.EntityId = void 0),
      (this.PlayerId = 0),
      (this.IsMyRole = !1),
      (this.RoleConfigId = 0),
      (this.RoleConfig = void 0);
  }
  Ore() {
    this.GetExtendToggle(0).OnPointDownCallBack.Bind(this.Kat),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiElementEnergyChanged,
        this.o$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiEnergyChanged,
        this.Trc,
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
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiQteCdTagChanged,
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharInQteChanged,
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleLinkStatusChanged,
        this.Eoh,
      );
  }
  kre() {
    this.GetExtendToggle(0).OnPointDownCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiElementEnergyChanged,
        this.o$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiEnergyChanged,
        this.Trc,
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
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiQteCdTagChanged,
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharInQteChanged,
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.RefreshQteActive,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleLinkStatusChanged,
        this.Eoh,
      );
  }
  c$e(t) {
    var i;
    EventSystem_1.EventSystem.AddWithTarget(
      t,
      EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
      this.qat,
    ),
      this.IsMyRole
        ? this.wat &&
          ((i = t.GetComponent(203)), this.d$e(i, 1414093614, this.jat))
        : ((i = t.GetComponent(203)), this.d$e(i, 166024319, this.Vat));
  }
  d$e(t, i, e) {
    t = t.ListenForTagAddOrRemove(i, e);
    t && this.i$e.push(t);
  }
  RemoveEntityEvents(t) {
    t &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        this.qat,
      );
    for (const i of this.i$e) i.EndTask();
    this.i$e.length = 0;
  }
  OnShowBattleChildView() {
    this.rht(!1);
  }
  Reset() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "FormationItem Reset"),
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
  zPl() {
    let t = void 0;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(
      this.PlayerId,
    );
    return (
      (t = i
        ? i.GetGroup(1)?.GetCurrentRole()?.RoleId
        : ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
            this.PlayerId,
          )?.CurRoleId) === this.RoleConfigId
    );
  }
  JPl() {
    this.hht(!1, !0);
  }
  kat() {
    if (this.RoleData) {
      let t = !1;
      var i;
      this.Dat &&
        (i =
          ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
            ?.EntityHandle) &&
        this.RoleData.EntityHandle !== i &&
        (t = this.RoleData.RoleQteComponent?.IsQteReady(i) ?? !1),
        this.hht(t, !1);
    } else this.JPl();
  }
  Hat() {
    if (!this.RoleData || this.IsMyRole) this.JPl();
    else {
      let t = !1;
      var i =
          ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()
            ?.EntityHandle,
        e = this.RoleData.EntityHandle;
      i && e?.IsInit && (t = i.Entity.GetComponent(96).IsQteReady(e)),
        this.hht(t, !1);
    }
  }
  hht(t, i) {
    var e;
    this.Bat !== t &&
      ((this.Bat = t),
      (e = this.GetUiNiagara(5)).SetUIActive(t),
      t
        ? (e.ActivateSystem(!0),
          i ||
            ((t = this.wat ? 1 : 0),
            (i = Info_1.Info.IsInGamepad() ? 8 : 7),
            ModelManager_1.ModelManager.BattleUiModel.AudioData.PlayAudio(
              t,
              i,
            )))
        : e.Deactivate()),
      this._ht();
  }
  tht() {
    var t = this.RoleData?.EntityHandle?.Entity?.GetComponent(91);
    !t || (t = t.GetChangeRoleCoolDown()) <= 0 || this.Gat(t, t);
  }
  uht(t) {
    this.bat !== t &&
      ((this.bat = t)
        ? (this.Gnt(19), this.bnt(18))
        : (this.Gnt(18), this.bnt(19)));
  }
  nht() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 17, "重置换人冷却表现"),
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
      TimerSystem_1.TimerSystem.Delay(() => {
        this.Aat && this.Aat.SetActive(!1);
      }, LEVE_UP_TIME);
  }
  RefreshConcertoResponseModule(t) {
    (this.Dat = t), this.RefreshElementVisible();
  }
  CureRole() {
    this.zPl() ||
      (this.RoleData?.BaseDeathComponent?.IsDead() ?? !0) ||
      (this.GetItem(4).SetUIActive(!0),
      (this.yat = TimerSystem_1.TimerSystem.Delay(() => {
        this.GetItem(4).SetUIActive(!1);
      }, CURE_DELAY)));
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
  pkl(t, i) {
    const e = this.GetTexture(9);
    if (e) {
      const s = this.GetTexture(2);
      s &&
        (this.SetRoleSkinIcon(t, e, i, void 0, () => {
          e.SetUIActive(!0);
        }),
        s.SetUIActive(!1),
        this.SetRoleSkinIcon(t, s, i, void 0, () => {
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
    var i = this.RoleConfigId;
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
      (t = this.IsMyRole
        ? ModelManager_1.ModelManager.RoleModel.GetRoleName(i)
        : (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
            this.PlayerId,
          )?.Name ?? "")),
        this.Pat.SetNameText(t);
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
            17,
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
    this.Znh ||
      this.vat <= 0 ||
      ((t = this.Eat / this.vat), this.GetTexture(2).SetFillAmount(t));
  }
  sht() {
    this.Znh ||
      this.GetText(3)?.SetText(
        (this.Sat * TimeUtil_1.TimeUtil.Millisecond).toFixed(1),
      );
  }
  rht(t) {
    this.Znh || this.GetItem(1)?.SetUIActive(t);
  }
  RefreshCoolDownExternal(t, i) {
    var e = this.GetItem(1);
    void 0 === t || void 0 === i
      ? this.Znh && ((this.Znh = !1), e?.SetUIActive(!1))
      : ((this.Znh = !0),
        e?.SetUIActive(!0),
        this.GetText(3)?.SetText(t.toFixed(1)),
        (e = t / i),
        this.GetTexture(2).SetFillAmount(e));
  }
  Jat() {
    if (this.RoleSkinConfig) {
      const t = this.RoleSkinConfig.RoleHeadIconBig;
      if (t && 0 < t.length) return void this.pkl(t, this.RoleSkinConfig.Id);
    }
    if (this.RoleConfig) {
      const t = this.RoleConfig.RoleHeadIconBig;
      t && 0 !== t.length && this.dht(t, this.RoleConfig.Id);
    }
  }
  RefreshSelectedRole() {
    var t;
    this.RoleData?.AttributeComponent &&
      (!this.IsMyRole ||
      (this.eht(),
      this.RoleData.AttributeComponent.GetCurrentValue(
        EAttributeId.Proto_Life,
      ) <= 0)
        ? this.SetRoleSelected(!1)
        : ((t = this.zPl()),
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
    this.GetItem(10).SetUIActive(!this.wat), this.Wat();
  }
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
  GetExtraContainer() {
    return this.GetItem(23);
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
        this.RoleData?.AttributeComponent?.GetCurrentValue(EAttributeId.l5n) ??
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
      ? this.IsMyRole && this.zPl()
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
      ((this.IsMyRole && this.zPl()) ||
      (t =
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(
          this.PlayerId,
          this.RoleConfigId,
        ) ?? 0) <= 0
        ? this.Qtt.SetActive(!1)
        : (this.Qtt.RefreshAction("切换角色" + t), this.Qtt.SetActive(!0)));
  }
  _ht() {
    if (this.Qtt) {
      let t = !1;
      this.IsMyRole || (t = !this.Bat), this.Qtt.SetGray(t);
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
        this.yTa(),
        this.RefreshElementVisible())
      : this.GetItem(14).SetUIActive(!1);
  }
  RefreshElementVisible() {
    if (this.RoleData) {
      var t = this.GetItem(14);
      if (this.Dat)
        if (2 === this.RoleConfig?.RoleType) t.SetUIActive(!1), this.JPl();
        else {
          var i = Info_1.Info.OperationType;
          if (2 === i && this.IsMyRole && this.zPl()) t.SetUIActive(!1);
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
  yTa() {
    var t = this.GetSprite(16),
      i = this.RoleData?.GetElementAttributePercent() ?? 0;
    t.SetFillAmount(i);
  }
  RefreshOnlineItem() {
    var t;
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? (this.xat ||
          (this.xat = new FormationOnlineItem_1.FormationOnlineItem(
            this.RootItem,
          )),
        (t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
          this.PlayerId,
        )) && this.RefreshPlayerPingState(t.PingState),
        this.IsMyRole
          ? (this.xat.SetOnlineNumber(-1),
            this.xat.SetNameText(""),
            this.xat.RefreshPlayStationItem(
              ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId() ??
                "",
            ))
          : (this.xat.SetOnlineNumber(t?.PlayerNumber ?? -1),
            this.xat.SetNameText(t?.GetFormationName() ?? ""),
            this.xat.RefreshPlayStationItem(t?.PlayerDetails.ywa ?? ""),
            this.xat.SetIsGrayByOtherControl(!this.zPl())))
      : (this.xat?.Destroy(), (this.xat = void 0));
  }
  RefreshPlayerPingState(t) {
    this.xat &&
      (t === Protocol_1.Aki.Protocol.r7s.Proto_POOR
        ? (this.xat.SetNetWeak(!0), this.xat.SetNetDisconnect(!1))
        : t === Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN
          ? (this.xat.SetNetDisconnect(!0), this.xat.SetNetWeak(!1))
          : (this.xat.SetNetWeak(!1), this.xat.SetNetDisconnect(!1)));
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
  RefreshLinkEffect() {
    var t;
    ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()
      ? ((t = ModelManager_1.ModelManager.BattleLinkModel.GetLinkStatus()),
        this.Eoh(t))
      : this.Eoh(0);
  }
  RefreshLinkActive(t, i = !1) {
    var e, s;
    (this.yoh === t && this.rxl) ||
      ((this.yoh = t),
      (this.rxl = !0),
      (e = this.GetItem(20)) && e.SetUIActive(t),
      (e = this.GetUiNiagara(21)),
      (s = this.GetUiNiagara(22)),
      (i = i && t),
      (t = t && !i),
      e && (t ? e.ActivateSystem(!0) : e.Deactivate(), e.SetUIActive(t)),
      s && (i ? s.ActivateSystem(!0) : s.Deactivate(), s.SetUIActive(i)));
  }
}
exports.FormationItem = FormationItem;
//# sourceMappingURL=FormationItem.js.map
