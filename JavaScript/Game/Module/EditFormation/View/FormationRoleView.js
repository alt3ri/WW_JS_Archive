"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationRoleView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MiniElementItem_1 = require("../../Common/MiniElementItem"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  TowerCostItem_1 = require("../../TowerDetailUi/View/TowerCostItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  EditFormationDefine_1 = require("../EditFormationDefine"),
  UiPanelFormationRolePhantomExtension_1 = require("../UiPanelFormationRolePhantomExtension");
class FormationRoleView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.b5t = void 0),
      (this.cC = 0),
      (this.q5t = void 0),
      (this.Mne = void 0),
      (this.G5t = void 0),
      (this.N5t = void 0),
      (this.O5t = void 0),
      (this.k5t = void 0),
      (this.HYs = void 0),
      (this.SPe = void 0),
      (this.F5t = void 0),
      (this.V5t = void 0),
      (this.G2e = void 0),
      (this.H5t = !1),
      (this.j5t = !1),
      (this.W5t = () => {
        this.b5t && this.b5t(this.cC);
      }),
      (this.jYs = () => {
        this.WYs();
      }),
      (this.cC = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UISprite],
      [13, UE.UISprite],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIText],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.W5t]]);
  }
  BindOnSelectRole(e) {
    this.b5t = e;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TowerDefensePhantomChanged,
      this.jYs,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TowerDefensePhantomChanged,
      this.jYs,
    );
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), await this.QYs();
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.F5t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.V5t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetTexture(6).SetAlpha(0);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), (this.SPe = void 0), (this.HYs = void 0);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    return !this.HYs ||
      e.length < 2 ||
      void 0 === (t = this.HYs.GetGuideUiItemAndUiItemForShowEx(e))
      ? void 0
      : ("G" === e[1] && (t[1] = this.GetButton(0).RootUIComp), t);
  }
  Refresh(e, t, i, s, o) {
    e &&
      this.Mne !== e &&
      (this.GetItem(5).SetUIActive(!0),
      this.V5t?.StopSequenceByKey("PlayerOut", !1, !1),
      this.F5t?.PlayLevelSequenceByName("PlayerIn")),
      this.U5t(e, t, i, o),
      this.RefreshTowerCost(e),
      this.wyt(s, o),
      (this.H5t = !1),
      this.K5t(!1),
      this.WYs(),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0);
  }
  U5t(t, i, s, o) {
    this.Mne = t;
    var h = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    if (h) {
      var r = this.GetText(7),
        r = (r && s && r.SetText(s), h.ElementId);
      this.N5t ||
        ((s = this.GetItem(9)) &&
          (this.N5t = new MiniElementItem_1.MiniElementItem(
            r,
            s,
            s.GetOwner(),
          ))),
        this.N5t?.RefreshMiniElement(r);
      const n = this.GetTexture(6);
      n.SetAlpha(0),
        this.SetRoleIcon(h.FormationRoleCard, n, t, void 0, () => {
          n.SetAlpha(1);
        });
      (s = this.GetText(8)),
        (r =
          (s && LguiUtil_1.LguiUtil.SetLocalText(s, "LevelShow", i),
          this.GetItem(24).SetUIActive(!1),
          !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            !ModelManager_1.ModelManager.EditBattleTeamModel
              .IsMultiInstanceDungeon &&
            ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              t,
            ).IsTrialRole()));
      this.GetItem(10).SetUIActive(r);
      let e = !0;
      (ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        ModelManager_1.ModelManager.EditBattleTeamModel
          .IsMultiInstanceDungeon) &&
        (e = o === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (this.j5t = !1),
        !e ||
          r ||
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
          (this.j5t =
            ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t)),
        this.GetItem(23).SetUIActive(this.j5t);
    }
  }
  wyt(t, i) {
    var s = 0 < t;
    if (
      (this.GetItem(11).SetUIActive(s), this.GetSprite(13).SetUIActive(!1), s)
    ) {
      let e = void 0;
      (s = i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (s =
          ((e = s
            ? EditFormationDefine_1.SELF_ONLINE_INDEX
            : EditFormationDefine_1.OTHER_ONLINE_INDEX),
          this.SPe.StopSequenceByKey("LocationNotice", !1, !0),
          s &&
            this.q5t !== i &&
            this.SPe.PlayLevelSequenceByName("LocationNotice"),
          StringUtils_1.StringUtils.Format(e, t.toString()))),
        (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s)),
        (s =
          (this.SetSpriteByPath(s, this.GetSprite(12), !1),
          ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(i)
            ?.PingState));
      this.RefreshPing(s);
    }
    (this.G5t = t), (this.q5t = i);
  }
  Reset() {
    this.SPe?.Clear(),
      (this.SPe = void 0),
      (this.b5t = void 0),
      this.ResetRole();
  }
  GetPlayer() {
    return this.q5t;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetOnlineIndex() {
    return this.G5t;
  }
  ResetRole() {
    this.Mne
      ? (this.F5t?.StopSequenceByKey("PlayerIn", !1, !1),
        this.V5t?.PlayLevelSequenceByName("PlayerOut"))
      : this.GetItem(5).SetUIActive(!1),
      (this.q5t = void 0),
      (this.Mne = void 0),
      (this.G5t = void 0),
      (this.H5t = !1),
      this.K5t(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetSprite(13).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(1).SetUIActive(!0);
  }
  RefreshPing(e) {
    let t = void 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.Y8s.Proto_UNKNOWN:
        t = "SP_SignalUnknown";
        break;
      case Protocol_1.Aki.Protocol.Y8s.Proto_POOR:
        t = "SP_SignalPoor";
    }
    var i,
      e = this.GetSprite(13);
    t
      ? ((i =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
        this.SetSpriteByPath(i, e, !1),
        e.SetUIActive(!0))
      : e.SetUIActive(!1);
  }
  SetCanAddRole(e) {
    this.GetItem(3).SetUIActive(e), this.GetItem(4).SetUIActive(!e);
  }
  RefreshPrepareState() {
    var e =
        ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon,
      t = this.GetItem(14),
      i = this.GetItem(16),
      s = this.GetItem(23);
    if ((i.SetUIActive(!1), t.SetUIActive(!1), e))
      if (
        ModelManager_1.ModelManager.EditBattleTeamModel.IsRoleConflict(
          this.q5t,
          this.Mne,
        ) &&
        !TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()
      )
        s.SetUIActive(!1), i.SetUIActive(!0);
      else {
        s.SetUIActive(this.j5t);
        e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
        if (e) {
          var o = e.DVn,
            h = this.q5t ?? o;
          switch (
            ModelManager_1.ModelManager.InstanceDungeonModel.GetPlayerUiState(h)
          ) {
            case Protocol_1.Aki.Protocol.P6s.Proto_Selecting:
              t.SetUIActive(!0),
                this.GetItem(15).SetUIActive(!0),
                this.G2e !== Protocol_1.Aki.Protocol.P6s.Proto_Selecting &&
                  this.SPe.PlayLevelSequenceByName("Connecting"),
                (this.G2e = Protocol_1.Aki.Protocol.P6s.Proto_Selecting);
              break;
            case Protocol_1.Aki.Protocol.P6s.hTs:
              h !== o &&
                (t.SetUIActive(!0),
                this.GetItem(15).SetUIActive(!1),
                this.G2e !== Protocol_1.Aki.Protocol.P6s.hTs &&
                  this.SPe.PlayLevelSequenceByName("Match"),
                (this.G2e = Protocol_1.Aki.Protocol.P6s.hTs));
              break;
            default:
              this.G2e = Protocol_1.Aki.Protocol.P6s.Proto_Wait;
          }
        }
      }
  }
  SetMatchState(e) {
    this.H5t !== e &&
      ((this.H5t = e),
      this.Mne &&
        (e
          ? (this.F5t?.StopSequenceByKey("PlayerIn", !1, !1),
            this.SPe?.StopSequenceByKey("LocationNotice", !1, !1),
            this.V5t?.PlayLevelSequenceByName("PlayerOut"))
          : (this.V5t?.StopSequenceByKey("PlayerOut", !1, !1),
            this.SPe?.StopSequenceByKey("LocationNotice", !1, !1),
            this.F5t?.PlayLevelSequenceByName("PlayerIn"))),
      this.K5t(e));
  }
  K5t(e) {
    this.GetItem(2).SetUIActive(e),
      this.GetItem(3).SetUIActive(!e),
      this.GetButton(0).SetSelfInteractive(!e),
      e
        ? (this.V5t?.StopSequenceByKey("PlayerOut", !1, !0),
          this.SPe?.PlayLevelSequenceByName("Matching"))
        : this.SPe?.StopSequenceByKey("Matching", !1, !0);
  }
  SetMatchTime(e) {
    this.GetText(22).SetText(TimeUtil_1.TimeUtil.GetTimeString(e));
  }
  RefreshTowerCost(e) {
    if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
      var t = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
          e,
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
        ),
        i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        )?.Cost;
      const s = t < i,
        o = ModelManager_1.ModelManager.TowerModel.GetFloorIncludeRole(
          e,
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        );
      e = s && !o;
      this.GetItem(17).SetUIActive(!0),
        this.O5t ||
          ((this.O5t = new TowerCostItem_1.TowerCostItem()),
          this.O5t.CreateThenShowByActorAsync(
            this.GetItem(20).GetOwner(),
          ).finally(() => {
            this.O5t.SetUiActive(!s && !o);
          })),
        this.k5t ||
          ((this.k5t = new TowerCostItem_1.TowerCostItem()),
          this.k5t
            .CreateThenShowByActorAsync(this.GetItem(21).GetOwner())
            .finally(() => {
              this.k5t.SetUiActive(!s || o);
            })),
        this.GetItem(18).SetUIActive(e),
        this.GetItem(19).SetUIActive(!e),
        this.O5t.SetUiActive(!s && !o),
        this.k5t.SetUiActive(!s || o),
        s || o
          ? o && this.k5t.Update(t)
          : (this.O5t.Update(t), this.k5t.Update(t - i));
    } else this.GetItem(17).SetUIActive(!1);
  }
  async QYs() {
    var e, t;
    TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
      ((e = this.GetItem(5)),
      await (t =
        new UiPanelFormationRolePhantomExtension_1.UiPanelFormationRolePhantomExtension(
          this.RootItem,
        )).CreateThenShowByActorAsync(e.GetOwner()),
      t.SetRelativeUiActive(!0),
      (this.HYs = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TowerDefenseOnShowPhantomInFormation,
      ));
  }
  WYs() {
    var e, t;
    this.HYs &&
      ((e =
        void 0 !== this.q5t && this.q5t <= 0
          ? ModelManager_1.ModelManager.PlayerInfoModel.GetId()
          : this.q5t),
      (t = this.Mne),
      (this.HYs.PlayerId = e),
      (this.HYs.RoleCfgId = t),
      (t =
        TowerDefenceController_1.TowerDefenseController.BuildTeamPhantomIconData(
          e,
          t,
        )),
      this.HYs.SetIcon(
        t,
        TowerDefenceController_1.TowerDefenseController.CheckIsSelf(e),
      ),
      this.HYs.SetRedDotActive(!t));
  }
}
exports.FormationRoleView = FormationRoleView;
//# sourceMappingURL=FormationRoleView.js.map
