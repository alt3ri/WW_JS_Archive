"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationPanel = void 0);
const UE = require("ue"),
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
      (this.TJe = []),
      (this.LJe = !1),
      (this.DJe = !1),
      (this.RJe = 0),
      (this.UJe = []),
      (this.AJe = (e, t) => {
        this.UJe.push([e, t]);
      }),
      (this.PJe = () => {
        if (!(this.UJe.length <= 0)) {
          var e = this.GetOperationType();
          for (const t of this.UJe)
            2 === e ? this.xJe(t[0], t[1]) : 1 === e && this.wJe(t[0], t[1]);
          for (const i of this.TJe) i.FormationIns && i.RefreshQteActive();
          this.UJe.length = 0;
        }
      }),
      (this.tje = () => {
        this.BJe(), (this.UJe.length = 0);
      }),
      (this.qJe = (e, t) => {
        t = this.GJe(t);
        t && t.ActivateConcertoChangeEffect(0, 0);
      }),
      (this.NJe = (e) => {
        e = this.GJe(e.Id);
        e && e.CureRole();
      }),
      (this.OJe = (e) => {
        e = this.GJe(e);
        e && e.RefreshRoleHealthPercent();
      }),
      (this.kJe = () => {
        for (const e of this.TJe) e.RefreshTimeRate();
      }),
      (this.mKe = (e, t, i) => {
        e = this.FJe(e);
        e && e.LevelUp(i);
      }),
      (this.fKe = (e) => {
        for (const i of e) {
          var t = this.GJe(i);
          t && t.PlayReviveSequence();
        }
      }),
      (this.zpe = (e, t) => {
        t = this.GJe(t.Id);
        t && t.ClearRoleData();
      }),
      (this.VJe = () => {
        for (const e of this.TJe) e.RefreshRoleName();
      }),
      (this.HJe = () => {
        for (const e of this.TJe) e && e.RefreshRoleHealthPercent();
      }),
      (this.tYe = (e) => {
        for (const t of this.TJe) {
          if (!t) return;
          t.RefreshConcertoResponseModule(e);
        }
      }),
      (this.jJe = () => {
        for (const e of this.TJe) e.RefreshRoleName();
      }),
      (this.WJe = (e, t) => {
        for (const i of this.TJe)
          i &&
            i.FormationIns?.GetPlayerId() === e &&
            i.RefreshPlayerPingState(t);
      }),
      (this.KJe = () => {
        for (const e of this.TJe)
          !e || e.FormationIns?.IsMyRole() || e.RefreshOnlineItem();
      }),
      (this.dKe = (e, t, i) => {
        this.SetVisible(
          5,
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() === this.DJe,
        );
      });
  }
  async InitializeAsync() {
    await this.BJe(),
      this.SetVisible(
        5,
        ModelManager_1.ModelManager.PlatformModel.IsGamepad() === this.DJe,
      );
  }
  SetIsGamepad() {
    (this.DJe = !0),
      this.SetVisible(
        5,
        ModelManager_1.ModelManager.PlatformModel.IsGamepad() === this.DJe,
      );
  }
  Reset() {
    for (const e of this.TJe) e.Refresh(void 0);
    (this.TJe.length = 0), super.Reset();
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
    if (this.Visible) for (const t of this.TJe) t.OnTick(e);
  }
  OnShowBattleChildViewPanel() {
    for (const e of this.TJe) e.RefreshCoolDownOnShow();
  }
  async QJe(e, t) {
    e = await this.NewStaticChildViewAsync(e, FormationItem_1.FormationItem);
    e.SetActive(!1), this.TJe.push(e);
  }
  async BJe() {
    if (!this.LJe) {
      if (
        ((this.LJe = !0),
        await this.XJe(),
        3 !== ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType)
      ) {
        this.RJe =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id;
        var i = 2 === this.GetOperationType(),
          s = ModelManager_1.ModelManager.FunctionModel.IsOpen(10036);
        let t = 0;
        for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var n,
            h,
            o,
            a,
            _ = this.TJe[t];
          _ &&
            (t++,
            _.RefreshConcertoResponseModule(s),
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
                (a =
                  ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
                    o,
                  )?.CurRoleId),
                _.RefreshOtherSceneRole(h, o, h === a))
              : i
                ? (_.Refresh(n), _.RefreshSelectedRole())
                : n && n.IsMyRole() && n.IsControl()
                  ? t--
                  : _.Refresh(n));
        }
      }
      this.LJe = !1;
    }
  }
  async XJe() {
    if (0 === this.TJe.length)
      switch (this.GetOperationType()) {
        case 2:
          var e = this.GetItem(0).GetOwner(),
            t = this.GetItem(1).GetOwner(),
            i = this.GetItem(2).GetOwner(),
            s = this.GetItem(3).GetOwner();
          await Promise.all([
            this.QJe(e, 1),
            this.QJe(t, 2),
            this.QJe(i, 3),
            this.QJe(s, 4),
          ]);
          break;
        case 1:
          (e = this.GetItem(0).GetOwner()),
            (t = this.GetItem(1).GetOwner()),
            (i = this.GetItem(2).GetOwner());
          await Promise.all([this.QJe(e, 1), this.QJe(t, 2), this.QJe(i, 3)]);
      }
  }
  FJe(e) {
    for (const t of this.TJe) if (t.FormationIns?.GetConfigId === e) return t;
  }
  GJe(e) {
    for (const t of this.TJe) if (t.EntityId === e) return t;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.AJe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
        this.PJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.tje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.qJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
        this.NJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.OJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFormationPlayLevelUp,
        this.mKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFormationPlayRevive,
        this.fKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleRefreshName,
        this.VJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRoleHp,
        this.HJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.tYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.jJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.WJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnOtherChangeRole,
        this.KJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.AJe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
        this.PJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.tje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.qJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
        this.NJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.OJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFormationPlayLevelUp,
        this.mKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFormationPlayRevive,
        this.fKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleRefreshName,
        this.VJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRoleHp,
        this.HJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        this.tYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.jJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.WJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnOtherChangeRole,
        this.KJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      );
  }
  xJe(e, t) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e),
      s = this.GJe(this.RJe),
      e = ((this.RJe = e), this.GJe(this.RJe));
    s && s.RefreshSelectedRole(),
      e &&
        (e.RefreshSelectedRole(),
        (s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t))) &&
        i &&
        i.GameplayTagComponent.HasTag(-1732116741) &&
        e.ActivateConcertoChangeEffect(i.ElementType, s.ElementType);
  }
  wJe(e, t) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t),
      s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e);
    (this.RJe = e),
      this.RJe &&
        ((e = this.GJe(this.RJe))
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
    this.$Je();
  }
  $Je() {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
      for (const e of this.TJe) e.ResetAllConcertoNiagara();
  }
}
((exports.FormationPanel = FormationPanel).aYe = void 0),
  (FormationPanel.RKe = void 0);
//# sourceMappingURL=FormationPanel.js.map
