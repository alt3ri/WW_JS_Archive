"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationRoleView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MiniElementItem_1 = require("../../Common/MiniElementItem"),
  TowerCostItem_1 = require("../../TowerDetailUi/View/TowerCostItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  EditFormationDefine_1 = require("../EditFormationDefine");
class FormationRoleView extends UiPanelBase_1.UiPanelBase {
  constructor(i, t) {
    super(),
      (this.b4t = void 0),
      (this.cC = 0),
      (this.q4t = void 0),
      (this.Mne = void 0),
      (this.G4t = void 0),
      (this.N4t = void 0),
      (this.O4t = void 0),
      (this.k4t = void 0),
      (this.EPe = void 0),
      (this.F4t = void 0),
      (this.V4t = void 0),
      (this.Mke = void 0),
      (this.H4t = !1),
      (this.j4t = !1),
      (this.W4t = () => {
        this.b4t && this.b4t(this.cC);
      }),
      (this.cC = t),
      this.CreateThenShowByActor(i.GetOwner());
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
      (this.BtnBindInfo = [[0, this.W4t]]);
  }
  BindOnSelectRole(i) {
    this.b4t = i;
  }
  OnStart() {
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.F4t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.V4t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetTexture(6).SetAlpha(0);
  }
  OnBeforeDestroy() {
    this.EPe?.Clear(), (this.EPe = void 0);
  }
  Refresh(i, t, e, s, h) {
    i &&
      this.Mne !== i &&
      (this.GetItem(5).SetUIActive(!0),
      this.V4t?.StopSequenceByKey("PlayerOut", !1, !1),
      this.F4t?.PlayLevelSequenceByName("PlayerIn")),
      this.U4t(i, t, e, h),
      this.RefreshTowerCost(i),
      this.EEt(s, h),
      (this.H4t = !1),
      this.K4t(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0);
  }
  U4t(t, e, s, h) {
    this.Mne = t;
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    if (o) {
      var r = this.GetText(7),
        r = (r && s && r.SetText(s), o.ElementId);
      this.N4t ||
        ((s = this.GetItem(9)) &&
          (this.N4t = new MiniElementItem_1.MiniElementItem(
            r,
            s,
            s.GetOwner(),
          ))),
        this.N4t?.RefreshMiniElement(r);
      const a = this.GetTexture(6);
      a.SetAlpha(0),
        this.SetRoleIcon(o.FormationRoleCard, a, t, void 0, () => {
          a.SetAlpha(1);
        });
      (s = this.GetText(8)),
        (r =
          (s && LguiUtil_1.LguiUtil.SetLocalText(s, "LevelShow", e),
          this.GetItem(24).SetUIActive(!1),
          !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            !ModelManager_1.ModelManager.EditBattleTeamModel
              .IsMultiInstanceDungeon &&
            ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              t,
            ).IsTrialRole()));
      this.GetItem(10).SetUIActive(r);
      let i = !0;
      (ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        ModelManager_1.ModelManager.EditBattleTeamModel
          .IsMultiInstanceDungeon) &&
        (i = h === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (this.j4t = !1),
        !i ||
          r ||
          ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ||
          (this.j4t =
            ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t)),
        this.GetItem(23).SetUIActive(this.j4t);
    }
  }
  EEt(t, e) {
    var s = 0 < t;
    if (
      (this.GetItem(11).SetUIActive(s), this.GetSprite(13).SetUIActive(!1), s)
    ) {
      let i = void 0;
      (s = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (s =
          ((i = s
            ? EditFormationDefine_1.SELF_ONLINE_INDEX
            : EditFormationDefine_1.OTHER_ONLINE_INDEX),
          this.EPe.StopSequenceByKey("LocationNotice", !1, !0),
          s &&
            this.q4t !== e &&
            this.EPe.PlayLevelSequenceByName("LocationNotice"),
          StringUtils_1.StringUtils.Format(i, t.toString()))),
        (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s)),
        (s =
          (this.SetSpriteByPath(s, this.GetSprite(12), !1),
          ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)
            ?.PingState));
      this.RefreshPing(s);
    }
    (this.G4t = t), (this.q4t = e);
  }
  Reset() {
    this.EPe?.Clear(),
      (this.EPe = void 0),
      (this.b4t = void 0),
      this.ResetRole();
  }
  GetPlayer() {
    return this.q4t;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetOnlineIndex() {
    return this.G4t;
  }
  ResetRole() {
    this.Mne
      ? (this.F4t?.StopSequenceByKey("PlayerIn", !1, !1),
        this.V4t?.PlayLevelSequenceByName("PlayerOut"))
      : this.GetItem(5).SetUIActive(!1),
      (this.q4t = void 0),
      (this.Mne = void 0),
      (this.G4t = void 0),
      (this.H4t = !1),
      this.K4t(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetSprite(13).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(1).SetUIActive(!0);
  }
  RefreshPing(i) {
    let t = void 0;
    switch (i) {
      case Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN:
        t = "SP_SignalUnknown";
        break;
      case Protocol_1.Aki.Protocol.oFs.Proto_POOR:
        t = "SP_SignalPoor";
    }
    var e,
      i = this.GetSprite(13);
    t
      ? ((e =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
        this.SetSpriteByPath(e, i, !1),
        i.SetUIActive(!0))
      : i.SetUIActive(!1);
  }
  SetCanAddRole(i) {
    this.GetItem(3).SetUIActive(i), this.GetItem(4).SetUIActive(!i);
  }
  RefreshPrepareState() {
    var i =
        ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon,
      t = this.GetItem(14),
      e = this.GetItem(16),
      s = this.GetItem(23);
    if ((e.SetUIActive(!1), t.SetUIActive(!1), i))
      if (
        ModelManager_1.ModelManager.EditBattleTeamModel.IsRoleConflict(
          this.q4t,
          this.Mne,
        )
      )
        s.SetUIActive(!1), e.SetUIActive(!0);
      else {
        s.SetUIActive(this.j4t);
        var h =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
              .Q4n,
          o = this.q4t ?? h;
        switch (
          ModelManager_1.ModelManager.InstanceDungeonModel.GetPlayerUiState(o)
        ) {
          case Protocol_1.Aki.Protocol.FNs.Proto_Selecting:
            t.SetUIActive(!0),
              this.GetItem(15).SetUIActive(!0),
              this.Mke !== Protocol_1.Aki.Protocol.FNs.Proto_Selecting &&
                this.EPe.PlayLevelSequenceByName("Connecting"),
              (this.Mke = Protocol_1.Aki.Protocol.FNs.Proto_Selecting);
            break;
          case Protocol_1.Aki.Protocol.FNs.WMs:
            o !== h &&
              (t.SetUIActive(!0),
              this.GetItem(15).SetUIActive(!1),
              this.Mke !== Protocol_1.Aki.Protocol.FNs.WMs &&
                this.EPe.PlayLevelSequenceByName("Match"),
              (this.Mke = Protocol_1.Aki.Protocol.FNs.WMs));
            break;
          default:
            this.Mke = Protocol_1.Aki.Protocol.FNs.Proto_Wait;
        }
      }
  }
  SetMatchState(i) {
    this.H4t !== i &&
      ((this.H4t = i),
      this.Mne &&
        (i
          ? (this.F4t?.StopSequenceByKey("PlayerIn", !1, !1),
            this.EPe?.StopSequenceByKey("LocationNotice", !1, !1),
            this.V4t?.PlayLevelSequenceByName("PlayerOut"))
          : (this.V4t?.StopSequenceByKey("PlayerOut", !1, !1),
            this.EPe?.StopSequenceByKey("LocationNotice", !1, !1),
            this.F4t?.PlayLevelSequenceByName("PlayerIn"))),
      this.K4t(i));
  }
  K4t(i) {
    this.GetItem(2).SetUIActive(i),
      this.GetItem(3).SetUIActive(!i),
      this.GetButton(0).SetSelfInteractive(!i),
      i
        ? (this.V4t?.StopSequenceByKey("PlayerOut", !1, !0),
          this.EPe?.PlayLevelSequenceByName("Matching"))
        : this.EPe?.StopSequenceByKey("Matching", !1, !0);
  }
  SetMatchTime(i) {
    this.GetText(22).SetText(TimeUtil_1.TimeUtil.GetTimeString(i));
  }
  RefreshTowerCost(i) {
    if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
      var t = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
          i,
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
        ),
        e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        )?.Cost;
      const s = t < e,
        h = ModelManager_1.ModelManager.TowerModel.GetFloorIncludeRole(
          i,
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        );
      i = s && !h;
      this.GetItem(17).SetUIActive(!0),
        this.O4t ||
          ((this.O4t = new TowerCostItem_1.TowerCostItem()),
          this.O4t.CreateThenShowByActorAsync(
            this.GetItem(20).GetOwner(),
          ).finally(() => {
            this.O4t.SetUiActive(!s && !h);
          })),
        this.k4t ||
          ((this.k4t = new TowerCostItem_1.TowerCostItem()),
          this.k4t
            .CreateThenShowByActorAsync(this.GetItem(21).GetOwner())
            .finally(() => {
              this.k4t.SetUiActive(!s || h);
            })),
        this.GetItem(18).SetUIActive(i),
        this.GetItem(19).SetUIActive(!i),
        this.O4t.SetUiActive(!s && !h),
        this.k4t.SetUiActive(!s || h),
        s || h
          ? h && this.k4t.Update(t)
          : (this.O4t.Update(t), this.k4t.Update(t - e));
    } else this.GetItem(17).SetUIActive(!1);
  }
}
exports.FormationRoleView = FormationRoleView;
//# sourceMappingURL=FormationRoleView.js.map
