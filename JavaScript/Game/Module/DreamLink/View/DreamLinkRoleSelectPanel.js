"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRoleItem = exports.DreamLinkRoleSelectPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  DreamLinkController_1 = require("../DreamLinkController");
class DreamLinkRoleSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RoleItemList = []),
      (this.Lth = () => {
        this.RoleItemList.forEach((e) => {
          e.Refresh();
        });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData(),
      i = [];
    for (let e = 0; e < 3; e++) {
      var r = new DreamLinkRoleItem(t);
      (r.Index = e),
        (r.RefreshHandle = this.Lth),
        this.RoleItemList.push(r),
        i.push(r.CreateThenShowByActorAsync(this.GetItem(0 + e).GetOwner()));
    }
    await Promise.all(i);
  }
  RefreshInstId(e) {
    for (const t of this.RoleItemList) t.RefreshInstId(e);
  }
}
exports.DreamLinkRoleSelectPanel = DreamLinkRoleSelectPanel;
class DreamLinkRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.Index = 0),
      (this.InstId = 0),
      (this.RefreshHandle = void 0),
      (this.Ath = () => {
        var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(
          this.InstId,
        );
        if (t) {
          t =
            ConfigManager_1.ConfigManager.EditBattleTeamConfig?.GetFightFormationConfig(
              t.FightFormationId,
            );
          if (t) {
            var i,
              r = [],
              s =
                ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfigList() ??
                [];
            for (const n of t.TrialRole) {
              var a =
                  ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfigByGroupId(
                    n,
                  ),
                a = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
                  a.Id,
                );
              a && r.push(a);
            }
            let e = !1;
            for (const o of s)
              !o.IsShowInTeamView ||
                !(i =
                  ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(
                    o.Id,
                  )) ||
                (ModelManager_1.ModelManager.RoleModel?.IsMainRole(o.Id) &&
                  e) ||
                (ModelManager_1.ModelManager.RoleModel?.IsMainRole(o.Id) &&
                  (e = !0),
                r.push(i));
            r.sort((e, t) => (e.IsTrialRole() ? 1 : -1));
            t = new TeamRoleSelectView_1.TeamRoleSelectViewData(
              5,
              this.RoleId,
              r,
              (t) => {
                if (this.RoleId === t)
                  this.ActivityBaseData.SetBossRoleId(
                    this.InstId,
                    this.Index,
                    0,
                  );
                else {
                  var i = this.RoleId,
                    r = this.ActivityBaseData.GetAllBossRoleId(this.InstId);
                  for (let e = 0; e < r.length; e++)
                    if (r[e] === t) {
                      this.ActivityBaseData.SetBossRoleId(this.InstId, e, i);
                      break;
                    }
                  this.ActivityBaseData.SetBossRoleId(
                    this.InstId,
                    this.Index,
                    t,
                  );
                }
                this.RefreshHandle?.();
              },
              void 0,
              this.Index + 1,
            );
            (t.FormationRoleList = this.ActivityBaseData.GetAllBossRoleId(
              this.InstId,
            )),
              (t.IsNeedRevive = this.E4t),
              (t.GetConfirmButtonTextCallBack = this.Q4t),
              (t.GetConfirmButtonEnableCallBack = this.v4t),
              (t.CanJoinTeam = this.v4t),
              (t.BackCallBack = this.y5t),
              RoleController_1.RoleController.OpenTeamRoleSelectView(t);
          }
        }
      }),
      (this.y5t = () => {
        var t = this.ActivityBaseData.GetAllBossRoleId(this.InstId);
        for (let e = 0; e < t.length; e++)
          ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
            t[e],
          )?.IsTrialRole() ||
            ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t[e]) ||
            (this.ActivityBaseData.SetBossRoleId(this.InstId, e, 0),
            this.RefreshHandle?.());
      }),
      (this.E4t = (e) => {
        return !(
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            e,
          )?.IsTrialRole() ||
          !ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e)
        );
      }),
      (this.v4t = (t) => {
        if (t !== this.RoleId) {
          var e =
              ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfigList() ??
              [],
            i = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t);
          if (
            ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t) &&
            !i?.IsTrialRole()
          )
            return !1;
          if (
            void 0 === e.find((e) => e.Id === t && e.IsShowInTeamView) &&
            !i?.IsTrialRole()
          )
            return !1;
          for (let e = 0; e < 3; e++) {
            var r = this.ActivityBaseData.GetAllBossRoleId(this.InstId)[e],
              s = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(r);
            if (s && s.IsTrialRole()) {
              s =
                ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(r);
              if (s && s.ParentId === t) return !1;
            }
            if (i && i.IsTrialRole()) {
              s =
                ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(t);
              if (s && r === s.ParentId) return !1;
            }
          }
        }
        return !0;
      }),
      (this.Q4t = (e) => {
        if (e)
          return 0 === this.RoleId
            ? "JoinText"
            : this.RoleId === e
              ? "GoDownText"
              : "ChangeText";
      });
  }
  get RoleId() {
    return this.ActivityBaseData.GetBossRoleId(this.InstId, this.Index);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Ath]]);
  }
  RefreshInstId(e) {
    (this.InstId = e), this.Refresh();
  }
  Refresh() {
    var e = this.RoleId,
      t = 0 === e;
    this.GetTexture(1).SetUIActive(!t),
      this.GetItem(3).SetUIActive(!t),
      this.GetItem(2).SetUIActive(t),
      t ||
        ((t = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e)) &&
          (t.IsTrialRole()
            ? (t =
                ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(
                  e,
                )) &&
              (t = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(
                t.ParentId,
              )) &&
              this.SetTextureByPath(t.RoleHeadIcon, this.GetTexture(1))
            : (t =
                ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e)) &&
              this.SetTextureByPath(t.RoleHeadIcon, this.GetTexture(1))));
  }
}
exports.DreamLinkRoleItem = DreamLinkRoleItem;
//# sourceMappingURL=DreamLinkRoleSelectPanel.js.map
