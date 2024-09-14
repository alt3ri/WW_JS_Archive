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
      (this.Vze = (t, e) => {
        this.Fze.push([t, e]);
      }),
      (this.Hze = () => {
        if (!(this.Fze.length <= 0)) {
          FormationPanel.kQe.Start();
          var t = this.GetOperationType();
          for (const e of this.Fze)
            2 === t ? this.jze(e[0], e[1]) : 1 === t && this.Wze(e[0], e[1]);
          for (const i of this.Gze) i.FormationIns && i.RefreshQteActive();
          (this.Fze.length = 0), FormationPanel.kQe.Stop();
        }
      }),
      (this.mWe = () => {
        this.Kze(), (this.Fze.length = 0);
      }),
      (this.Xze = (t, e) => {
        e = this.$ze(e);
        e && e.ActivateConcertoChangeEffect(0, 0);
      }),
      (this.Yze = (t) => {
        t = this.$ze(t.Id);
        t && t.CureRole();
      }),
      (this.Jze = (t) => {
        t = this.$ze(t);
        t && t.RefreshRoleHealthPercent();
      }),
      (this.zze = () => {
        for (const t of this.Gze) t.RefreshTimeRate();
      }),
      (this.TQe = (t, e, i) => {
        t = this.Zze(t);
        t && t.LevelUp(i);
      }),
      (this.UQe = (t) => {
        for (const i of t) {
          var e = this.$ze(i);
          e && e.PlayReviveSequence();
        }
      }),
      (this.zpe = (t, e) => {
        e = this.$ze(e.Id);
        e && e.ClearRoleData();
      }),
      (this.eZe = () => {
        for (const t of this.Gze) t.RefreshRoleName();
      }),
      (this.tZe = () => {
        for (const t of this.Gze) t && t.RefreshRoleHealthPercent();
      }),
      (this.mJe = (t) => {
        for (const e of this.Gze) {
          if (!e) return;
          e.RefreshConcertoResponseModule(t);
        }
      }),
      (this.iZe = () => {
        for (const t of this.Gze) t.RefreshRoleName();
      }),
      (this.oZe = (t, e) => {
        for (const i of this.Gze)
          i &&
            i.FormationIns?.GetPlayerId() === t &&
            i.RefreshPlayerPingState(e);
      }),
      (this.rZe = () => {
        for (const t of this.Gze)
          !t || t.FormationIns?.IsMyRole() || t.RefreshOnlineItem();
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
    for (const t of this.Gze) t.Refresh(void 0);
    (this.Gze.length = 0), super.Reset();
  }
  OnRegisterComponent() {
    var t = this.GetOperationType();
    2 === t
      ? (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
          [3, UE.UIItem],
        ])
      : 1 === t &&
        (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
        ]);
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) {
      FormationPanel.vJe.Start();
      for (const e of this.Gze) e.OnTick(t);
      FormationPanel.vJe.Stop();
    }
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.Gze) t.RefreshCoolDownOnShow();
  }
  async nZe(t, e) {
    t = await this.NewStaticChildViewAsync(t, FormationItem_1.FormationItem);
    t.SetActive(!1), this.Gze.push(t);
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
        let e = 0;
        for (let t = 1; t <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++) {
          var n,
            o,
            h,
            a,
            r = this.Gze[e];
          r &&
            (e++,
            r.RefreshConcertoResponseModule(s),
            (h =
              ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(
                t,
              )),
            (n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              h?.CreatureDataId ?? 0,
              { ParamType: 3 },
            )),
            h && !n
              ? ((o = h.RoleId),
                (h = h.PlayerId),
                (a =
                  ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
                    h,
                  )?.CurRoleId),
                r.RefreshOtherSceneRole(o, h, o === a))
              : i
                ? (r.Refresh(n), r.RefreshSelectedRole())
                : n && n.IsMyRole() && n.IsControl()
                  ? e--
                  : r.Refresh(n));
        }
      }
      this.Nze = !1;
    }
  }
  async sZe() {
    if (0 === this.Gze.length)
      switch (this.GetOperationType()) {
        case 2:
          var t = this.GetItem(0).GetOwner(),
            e = this.GetItem(1).GetOwner(),
            i = this.GetItem(2).GetOwner(),
            s = this.GetItem(3).GetOwner();
          await Promise.all([
            this.nZe(t, 1),
            this.nZe(e, 2),
            this.nZe(i, 3),
            this.nZe(s, 4),
          ]);
          break;
        case 1:
          (t = this.GetItem(0).GetOwner()),
            (e = this.GetItem(1).GetOwner()),
            (i = this.GetItem(2).GetOwner());
          await Promise.all([this.nZe(t, 1), this.nZe(e, 2), this.nZe(i, 3)]);
      }
  }
  Zze(t) {
    for (const e of this.Gze) if (e.FormationIns?.GetConfigId === t) return e;
  }
  $ze(t) {
    for (const e of this.Gze) if (e.EntityId === t) return e;
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
  jze(t, e) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t),
      s = this.$ze(this.kze),
      t = ((this.kze = t), this.$ze(this.kze));
    s && s.RefreshSelectedRole(),
      t &&
        (t.RefreshSelectedRole(),
        (s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e))) &&
        i &&
        i.GameplayTagComponent.HasTag(-1732116741) &&
        t.ActivateConcertoChangeEffect(i.ElementType, s.ElementType);
  }
  Wze(t, e) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e),
      s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t);
    (this.kze = t),
      this.kze &&
        ((t = this.$ze(this.kze))
          ? (t.Refresh(
              ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(e, {
                ParamType: 1,
              }),
            ),
            i &&
              s &&
              s.GameplayTagComponent.HasTag(-1732116741) &&
              t.ActivateConcertoChangeEffect(s.ElementType, i.ElementType))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 18, "角色上场时找不到之前的头像"));
  }
  RefreshOnDelayShow() {
    this.aZe();
  }
  aZe() {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
      for (const t of this.Gze) t.ResetAllConcertoNiagara();
  }
  RefreshFormationCooldownExternal(t, e, i) {
    t < 0 ||
      t > this.Gze.length - 1 ||
      this.Gze[t].RefreshCoolDownExternal(e, i);
  }
  ResetFormationCooldownExternal() {
    for (const t of this.Gze) t.RefreshCoolDownExternal();
  }
}
((exports.FormationPanel = FormationPanel).vJe = Stats_1.Stat.Create(
  "[BattleView]FormationPanelTick",
)),
  (FormationPanel.kQe = Stats_1.Stat.Create("[ChangeRole]FormationPanel"));
//# sourceMappingURL=FormationPanel.js.map
