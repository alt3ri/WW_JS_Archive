"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamDefine_1 = require("../../../SceneTeam/SceneTeamDefine"),
  FormationItem_1 = require("../FormationItem"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class FormationPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.Gze = []),
      (this.Nze = !1),
      (this.Oze = !1),
      (this.kze = 0),
      (this.Fze = []),
      (this.Vze = (e, t) => {
        this.Fze.push([e, t]);
      }),
      (this.Hze = () => {
        if (!(this.Fze.length <= 0)) {
          var e = this.GetOperationType();
          for (const t of this.Fze)
            2 === e ? this.jze(t[0], t[1]) : 1 === e && this.Wze(t[0], t[1]);
          for (const i of this.Gze) i.FormationIns && i.RefreshQteActive();
          this.Fze.length = 0;
        }
      }),
      (this.mWe = () => {
        this.Kze(), (this.Fze.length = 0);
      }),
      (this.Xze = (e, t) => {
        t = this.$ze(t);
        t && t.ActivateConcertoChangeEffect(0, 0);
      }),
      (this.Yze = (e) => {
        e = this.$ze(e.Id);
        e && e.CureRole();
      }),
      (this.Jze = (e) => {
        e = this.$ze(e);
        e && e.RefreshRoleHealthPercent();
      }),
      (this.zze = () => {
        for (const e of this.Gze) e.RefreshTimeRate();
      }),
      (this.TQe = (e, t, i) => {
        e = this.Zze(e);
        e && e.LevelUp(i);
      }),
      (this.UQe = (e) => {
        for (const i of e) {
          var t = this.$ze(i);
          t && t.PlayReviveSequence();
        }
      }),
      (this.zpe = (e, t) => {
        t = this.$ze(t.Id);
        t && t.ClearRoleData();
      }),
      (this.eZe = () => {
        for (const e of this.Gze) e.RefreshRoleName();
      }),
      (this.tZe = () => {
        for (const e of this.Gze) e && e.RefreshRoleHealthPercent();
      }),
      (this.mJe = (e) => {
        for (const t of this.Gze) {
          if (!t) return;
          t.RefreshConcertoResponseModule(e);
        }
      }),
      (this.iZe = () => {
        for (const e of this.Gze) e.RefreshRoleName();
      }),
      (this.oZe = (e, t) => {
        for (const i of this.Gze)
          i &&
            i.FormationIns?.GetPlayerId() === e &&
            i.RefreshPlayerPingState(t);
      }),
      (this.rZe = () => {
        for (const e of this.Gze)
          !e || e.FormationIns?.IsMyRole() || e.RefreshOnlineItem();
      }),
      (this.XBo = () => {
        this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze);
      });
  }
  async InitializeAsync() {
    await this.Kze(),
      this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze);
  }
  SetIsGamepad() {
    (this.Oze = !0), this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze);
  }
  Reset() {
    for (const e of this.Gze) e.Refresh(void 0);
    (this.Gze.length = 0), super.Reset();
  }
  OnRegisterComponent() {
    var e = this.GetOperationType();
    2 === e
      ? (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
          [3, UE.UIItem],
        ])
      : 1 === e &&
        (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
        ]);
  }
  OnTickBattleChildViewPanel(e) {
    if (this.Visible) for (const t of this.Gze) t.OnTick(e);
  }
  OnShowBattleChildViewPanel() {
    for (const e of this.Gze) e.RefreshCoolDownOnShow();
  }
  async nZe(e, t) {
    e = await this.NewStaticChildViewAsync(e, FormationItem_1.FormationItem);
    e.SetActive(!1), this.Gze.push(e);
  }
  async Kze() {
    if (!this.Nze) {
      if (
        ((this.Nze = !0),
        await this.sZe(),
        3 !== ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType)
      ) {
        this.kze =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id;
        var i = 2 === this.GetOperationType(),
          s = ModelManager_1.ModelManager.FunctionModel.IsOpen(10036);
        let t = 0;
        for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var n,
            h,
            o,
            _,
            a = this.Gze[t];
          a &&
            (t++,
            a.RefreshConcertoResponseModule(s),
            (o =
              ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(
                e,
              )),
            (n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              o?.CreatureDataId ?? 0,
              { ParamType: 3 },
            )),
            o && !n
              ? ((h = o.RoleId),
                (o = o.PlayerId),
                (_ =
                  ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
                    o,
                  )?.CurRoleId),
                a.RefreshOtherSceneRole(h, o, h === _))
              : i
                ? (a.Refresh(n), a.RefreshSelectedRole())
                : n && n.IsMyRole() && n.IsControl()
                  ? t--
                  : a.Refresh(n));
        }
      }
      this.Nze = !1;
    }
  }
  async sZe() {
    if (0 === this.Gze.length)
      switch (this.GetOperationType()) {
        case 2:
          var e = this.GetItem(0).GetOwner(),
            t = this.GetItem(1).GetOwner(),
            i = this.GetItem(2).GetOwner(),
            s = this.GetItem(3).GetOwner();
          await Promise.all([
            this.nZe(e, 1),
            this.nZe(t, 2),
            this.nZe(i, 3),
            this.nZe(s, 4),
          ]);
          break;
        case 1:
          (e = this.GetItem(0).GetOwner()),
            (t = this.GetItem(1).GetOwner()),
            (i = this.GetItem(2).GetOwner());
          await Promise.all([this.nZe(e, 1), this.nZe(t, 2), this.nZe(i, 3)]);
      }
  }
  Zze(e) {
    for (const t of this.Gze) if (t.FormationIns?.GetConfigId === e) return t;
  }
  $ze(e) {
    for (const t of this.Gze) if (t.EntityId === e) return t;
  }
  GetFormationItemList() {
    return this.Gze;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.Vze,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
        this.Hze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.Xze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
        this.Yze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Jze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.zze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFormationPlayLevelUp,
        this.TQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFormationPlayRevive,
        this.UQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleRefreshName,
        this.eZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRoleHp,
        this.tZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.mJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.iZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.oZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnOtherChangeRole,
        this.rZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.Vze,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
        this.Hze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.Xze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
        this.Yze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Jze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.zze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFormationPlayLevelUp,
        this.TQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFormationPlayRevive,
        this.UQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleRefreshName,
        this.eZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRoleHp,
        this.tZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.mJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.iZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.oZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnOtherChangeRole,
        this.rZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      );
  }
  jze(e, t) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e),
      s = this.$ze(this.kze),
      e = ((this.kze = e), this.$ze(this.kze));
    s && s.RefreshSelectedRole(),
      e &&
        (e.RefreshSelectedRole(),
        (s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t))) &&
        i &&
        i.GameplayTagComponent.HasTag(-1732116741) &&
        e.ActivateConcertoChangeEffect(i.ElementType, s.ElementType);
  }
  Wze(e, t) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t),
      s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e);
    (this.kze = e),
      this.kze &&
        ((e = this.$ze(this.kze))
          ? (e.Refresh(
              ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(t, {
                ParamType: 1,
              }),
            ),
            i &&
              s &&
              s.GameplayTagComponent.HasTag(-1732116741) &&
              e.ActivateConcertoChangeEffect(s.ElementType, i.ElementType))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 18, "角色上场时找不到之前的头像"));
  }
  RefreshOnDelayShow() {
    this.aZe();
  }
  aZe() {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
      for (const e of this.Gze) e.ResetAllConcertoNiagara();
  }
}
((exports.FormationPanel = FormationPanel).vJe = void 0),
  (FormationPanel.kQe = void 0);
//# sourceMappingURL=FormationPanel.js.map
