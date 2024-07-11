"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const BuffItemControl_1 = require("../../BuffItem/BuffItemControl");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle");
const EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem");
const QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView");
const TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const EditFormationController_1 = require("../EditFormationController");
const EditFormationDefine_1 = require("../EditFormationDefine");
const ExitSkillView_1 = require("./ExitSkill/ExitSkillView");
const FormationRoleView_1 = require("./FormationRoleView");
class EditFormationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.l4t = []),
      (this.cpt = void 0),
      (this._3t = [10, 11, 12]),
      (this._4t = 0),
      (this.u4t = 0),
      (this.c4t = -1),
      (this.m4t = !1),
      (this.d4t = void 0),
      (this.C4t = void 0),
      (this.g4t = () => {
        this.IsDestroyOrDestroying || this.f4t(this._4t);
      }),
      (this.WJe = (e, i) => {
        for (const t of this.l4t) t.GetPlayer() === e && t.RefreshPing(i);
      }),
      (this.p4t = () => {
        let e;
        this.m4t ||
          (this.v4t() &&
            ((e = () => {
              (this.c4t = this._4t),
                ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                  ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(
                    this.c4t,
                  ),
                this.M4t();
            }),
            (ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? EditFormationController_1.EditFormationController.UpdateFightRoleRequest()
              : EditFormationController_1.EditFormationController.EditFormationRequest(
                  this._4t,
                )
            ).finally(e),
            this.S4t()));
      }),
      (this.q3t = () => {
        if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
          var e = ModelManager_1.ModelManager.EditFormationModel;
          const i = new Array();
          var e = e.GetEditingRoleIdList(this._4t);
          if (e) for (const t of e) i.push(t);
          (e = ModelManager_1.ModelManager.RoleModel.GetRoleList()),
            (e = new QuickRoleSelectView_1.QuickRoleSelectViewData(5, i, e));
          (e.CanConfirm = this.E4t),
            (e.OnConfirm = this.G3t),
            (e.OnBack = this.y4t),
            (e.OnHideFinish = this.g4t),
            UiManager_1.UiManager.OpenView("QuickRoleSelectView", e),
            this.O3t(!1);
        }
      }),
      (this.E4t = (e) => {
        const i = ModelManager_1.ModelManager.EditFormationModel;
        if (this._4t !== i.GetCurrentFormationId) return !0;
        if (e.length <= 0)
          return (
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "EditBattleTeamRoleEmpty",
            ),
            !1
          );
        let t = !0;
        for (const o of e)
          if (!i.IsRoleDead(o)) {
            t = !1;
            break;
          }
        return (
          !t ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "EditFormationAllDead",
          ),
          !1)
        );
      }),
      (this.G3t = (i) => {
        this.O3t(!0);
        const t = ModelManager_1.ModelManager.EditFormationModel;
        for (
          let e = 0;
          e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
          e++
        ) {
          const o = e <= i.length ? i[e] : 0;
          const r = e + 1;
          t.SetEditingRoleId(this._4t, r, o, !1);
        }
      }),
      (this.I4t = () => {
        let e, i, t;
        this.m4t ||
          (this._4t === this.c4t && !this.v4t()) ||
          ((e = () => {
            this.M4t();
          }),
          ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? EditFormationController_1.EditFormationController.UpdateFightRoleRequest().finally(
                e,
              )
            : ((i =
                ModelManager_1.ModelManager.EditFormationModel
                  .GetCurrentFormationId),
              (t = this._4t === i),
              EditFormationController_1.EditFormationController.EditFormationRequest(
                i,
              ).finally(e),
              t &&
                ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(
                  this.c4t,
                )),
          this.S4t());
      }),
      (this.k3t = () => {
        if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
          const e = new ExitSkillView_1.ExitSkillViewData();
          for (const r of this.l4t) {
            const i = r.GetConfigId();
            const t = r.GetOnlineIndex();
            const o = r.GetPlayer();
            e.AddData(i, t, o);
          }
          UiManager_1.UiManager.OpenView("ExitSkillView", e);
        }
      }),
      (this.y4t = () => {
        this.O3t(!0);
      }),
      (this.S3t = (e) => {
        let i, t;
        return this.M3t(e)
          ? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
          : ((e = (t =
              ModelManager_1.ModelManager
                .EditFormationModel).IsInEditingFormation(this._4t, e)),
            (i = t.GetCurrentFormationId === this._4t),
            (t = (t = t.GetEditingRoleIdList(this._4t)) && t.length === 1),
            !(
              i &&
              e &&
              t &&
              (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "EditBattleTeamRoleEmpty",
              ),
              1)
            ));
      }),
      (this.Q3t = (e) => {
        this.O3t(!0);
        let i;
        const t = ModelManager_1.ModelManager.EditFormationModel;
        const o = t.GetEditingRolePosition(this._4t, e);
        const r = this.u4t;
        t.IsInEditingFormation(this._4t, e)
          ? t.GetEditingRoleId(this._4t, r)
            ? o === r
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Formation", 49, "编队角色位置相同，换下", [
                    "位置",
                    r,
                  ]),
                t.SetEditingRoleId(this._4t, r))
              : ((i = t.GetEditingRoleId(this._4t, r)),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Formation", 49, "编队角色更换"),
                t.SetEditingRoleId(this._4t, r, e),
                t.SetEditingRoleId(this._4t, o, i))
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Formation", 49, "编队角色换下", ["位置", o]),
              t.SetEditingRoleId(this._4t, o))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                49,
                "编队角色加入",
                ["位置", r],
                ["roleId", e],
              ),
            t.SetEditingRoleId(this._4t, this.u4t, e),
            this.T4t(e));
      }),
      (this.p3t = (e) =>
        !ModelManager_1.ModelManager.EditFormationModel.IsInEditingFormation(
          this._4t,
          e,
        )),
      (this.v3t = (e) => this.M3t(e)),
      (this.j3t = (e) => {
        const i = ModelManager_1.ModelManager.EditFormationModel;
        var e = i.IsInEditingFormation(this._4t, e);
        const t = i.GetEditingRoleIdList(this._4t);
        let o = !0;
        return (o = t && !i.GetEditingRoleId(this._4t, this.u4t) && e ? !1 : o);
      }),
      (this.K3t = (e) => {
        let i, t;
        if (e)
          return this.M3t(e)
            ? "EditBattleTeamRevive"
            : ((t = (i =
                ModelManager_1.ModelManager
                  .EditFormationModel).IsInEditingFormation(this._4t, e)),
              (e = i.GetEditingRolePosition(this._4t, e)),
              i.GetEditingRoleIdList(this._4t)
                ? i.GetEditingRoleId(this._4t, this.u4t)
                  ? t
                    ? void 0 === e
                      ? "JoinText"
                      : e === this.u4t
                        ? "GoDownText"
                        : "ChangeText"
                    : "ChangeText"
                  : t
                    ? "ChangeText"
                    : "JoinText"
                : "JoinText");
      }),
      (this.dVe = (e, i) => {
        return new EditFormationTabItem_1.EditFormationTabItem();
      }),
      (this.yqe = (e) => {
        var i = EditFormationDefine_1.FORMATION_SPRITES[e];
        var i =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        var e = e + 1;
        const t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "TeamText",
          );
        var i = new CommonTabData_1.CommonTabData(
          i,
          new CommonTabTitleData_1.CommonTabTitleData(t, e),
        );
        return (
          i.SetSmallIcon(
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_TeamTitle",
            ),
          ),
          i
        );
      }),
      (this.X3t = (e) => {
        this.m4t ||
          ((e = e + 1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Test", 5, "当点击编队按钮时", ["formationId", e]),
          this.f4t(e),
          (this._4t = e),
          this.rFe());
      }),
      (this.L4t = (e) => {
        this.m4t ||
          (ModelManager_1.ModelManager.EditFormationModel.IsMyPosition(e)
            ? ((this.u4t = e),
              UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") ||
                UiManager_1.UiManager.OpenView(
                  "TeamRoleSelectView",
                  this.D4t(),
                ),
              this.O3t(!1))
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "IsNotMyRole",
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UISpriteTransition],
      [11, UE.UISpriteTransition],
      [12, UE.UISpriteTransition],
      [13, UE.UIItem],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.k3t],
        [6, this.p4t],
        [8, this.I4t],
        [9, this.q3t],
      ]);
  }
  async OnBeforeStartAsync() {
    const i = ModelManager_1.ModelManager.EditFormationModel;
    let t = i.GetCurrentFormationId;
    if (void 0 === t)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Formation", 49, "打开大世界编队界面时，当前编队为空");
    else {
      (this._4t = t),
        (this.c4t = t),
        i.InitEditingFormationMap(),
        await this.$3t();
      let e = 1;
      for (const r of [this.GetItem(3), this.GetItem(4), this.GetItem(5)]) {
        const o = new FormationRoleView_1.FormationRoleView(r, e);
        o.BindOnSelectRole(this.L4t), this.l4t.push(o), e++;
      }
      this.rFe();
      t = ModelManager_1.ModelManager.GameModeModel.IsMulti;
      this.GetButton(6).RootUIComp.SetUIActive(!t),
        this.GetButton(9).RootUIComp.SetUIActive(!t),
        this.GetItem(13).SetUIActive(!1),
        this.O3t(!0);
    }
  }
  OnBeforeShow() {
    let e;
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((e = this._4t - 1),
      this.cpt.SelectToggleByIndex(e),
      (e =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId -
        1),
      this.cpt.GetTabItemByIndex(e).ShowTeamBattleTips()),
      this.f4t(this._4t);
  }
  OnAddEventListener() {
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.WJe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnRefreshPlayerPing,
      this.WJe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.WJe,
      );
  }
  OnBeforeDestroy() {
    for (const e of this.l4t) e.Reset();
    (this.l4t = []),
      this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
      (this.m4t = !1),
      this.d4t &&
        (TimerSystem_1.TimerSystem.Has(this.d4t) &&
          TimerSystem_1.TimerSystem.Remove(this.d4t),
        (this.d4t = void 0)),
      this.C4t &&
        (TimerSystem_1.TimerSystem.Has(this.C4t) &&
          TimerSystem_1.TimerSystem.Remove(this.C4t),
        (this.C4t = void 0));
  }
  S4t() {
    this.d4t ||
      (this.GetItem(14).SetUIActive(!0),
      (this.d4t = TimerSystem_1.TimerSystem.Delay(() => {
        this.O3t(!1),
          this.GetButton(1).RootUIComp.SetUIActive(!1),
          this.GetItem(13).SetUIActive(!0);
      }, EditFormationDefine_1.DELAY_SHOW_LOADING))),
      this.C4t ||
        (this.C4t = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.ResetToBattleView();
        }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION));
  }
  async M4t() {
    (this.m4t = !0),
      await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise,
      UiManager_1.UiManager.ResetToBattleView();
  }
  D4t() {
    const e = ModelManager_1.ModelManager.EditFormationModel;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    var t = e.GetEditingRoleId(this._4t, this.u4t);
    var t = new TeamRoleSelectView_1.TeamRoleSelectViewData(
      5,
      t,
      i,
      this.Q3t,
      this.y4t,
      this.u4t,
    );
    var i =
      (t.SetGetConfirmButtonEnableFunction(this.j3t),
      t.SetGetConfirmButtonTextFunction(this.K3t),
      t.SetHideFinishCallBack(this.g4t),
      t.SetConfirmCheckFunction(this.S3t),
      (t.IsNeedRevive = this.v3t),
      (t.CanJoinTeam = this.p3t),
      e.GetEditingRoleIdList(this._4t));
    return (t.FormationRoleList = i), t;
  }
  T4t(e) {
    e =
      ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(
        e,
      )?.JoinTeamEvent;
    e &&
      (AudioSystem_1.AudioSystem.PostEvent(e), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Audio", 57, "[Game.EditFormationView] PostEvent", [
        "Event",
        e,
      ]);
  }
  O3t(e) {
    const i = this.GetButton(8)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
    i && i.SetUIActive(e);
  }
  async $3t() {
    const e = this.GetItem(0);
    const i = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.X3t,
      this.yqe,
    );
    (this.cpt = new TabComponentWithTitle_1.TabComponentWithTitle(e, i)),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        (this.cpt.SetCanChange(
          () =>
            this._4t !==
              ModelManager_1.ModelManager.EditFormationModel
                .GetCurrentFormationId || this.v4t(),
        ),
        await this.cpt.RefreshTabItemAsync(
          EditFormationDefine_1.MAX_FORMATION_ID - 1,
        ));
  }
  rFe() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      const i =
        this._4t !==
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId;
      this.GetButton(6).SetSelfInteractive(i);
      let e = void 0;
      (e = i ? "EditBattleTeamFight" : "EditBattleTeamFighting"),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), e);
    }
  }
  f4t(n) {
    const s = ModelManager_1.ModelManager.EditFormationModel;
    const e = this.GetButton(1).RootUIComp;
    if (s.GetEditingRoleIdList(n).length <= 0) {
      for (const i of this.l4t) i.ResetRole();
      e.SetUIActive(!1);
    } else {
      e.SetUIActive(!0);
      let h;
      let l;
      let _;
      const m =
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
      for (let a = 1; a <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; a++) {
        let e = 0;
        let i = 0;
        let t = "";
        let o = 0;
        let r = 0;
        s.IsMyPosition(a)
          ? ((l = ModelManager_1.ModelManager.RoleModel),
            (e = s.GetEditingRoleId(n, a)),
            (h = l.GetRoleInstanceById(e))
              ? ((h = h.GetLevelData()),
                (i = h.GetLevel()),
                (r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
                ModelManager_1.ModelManager.GameModeModel.IsMulti
                  ? ((t =
                      ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ??
                      ""),
                    (o =
                      ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
                        r,
                      )?.PlayerNumber ?? 1))
                  : (t = l.GetRoleName(e)),
                this.e4t(a, e, i, t, o, r))
              : this.e4t(a))
          : (h = s.GetCurrentFormationData?.GetRoleDataByPosition(a))
            ? ((r = h.PlayerId),
              (l =
                ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
                  r,
                )),
              m && !l
                ? this.e4t(a)
                : ((e = h.ConfigId),
                  (_ =
                    ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
                      r,
                    )),
                  (i = h.Level),
                  (t = _?.Name ?? ""),
                  (o =
                    ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
                      r,
                    )?.PlayerNumber ?? 1),
                  this.e4t(a, e, i, t, o, r)))
            : this.e4t(a);
      }
    }
  }
  e4t(e, i = 0, t = 0, o = "", r = 0, a = 0) {
    var e = e - 1;
    const n = this.l4t[e];
    const s = this.GetUiSpriteTransition(this._3t[e]);
    let h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "SP_TeamRoleSkillNone",
    );
    if (i) {
      n.Refresh(i, t, o, r, a);
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)?.SkillId;
      if (e)
        for (const l of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
          e,
        ))
          if (l.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
            h = l.Icon;
            break;
          }
    } else n.ResetRole();
    ResourceSystem_1.ResourceSystem.LoadAsync(
      h,
      UE.LGUISpriteData_BaseObject,
      (e, i) => {
        s.SetAllTransitionSprite(e);
      },
      102,
    );
  }
  v4t() {
    const e = ModelManager_1.ModelManager.EditFormationModel;
    const i = e.GetEditingRoleIdList(this._4t);
    if (i.length === 0)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "EditBattleTeamNoRole",
        ),
        !1
      );
    let t = !0;
    for (const o of i)
      if (!e.IsRoleDead(o)) {
        t = !1;
        break;
      }
    return (
      !t ||
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "EditFormationAllDead",
      ),
      !1)
    );
  }
  M3t(e) {
    let i, t;
    return !(
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((t = (i =
        ModelManager_1.ModelManager.EditFormationModel).IsInEditingFormation(
        this._4t,
        e,
      )),
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        e,
      )?.IsTrialRole()) ||
      t ||
      !i.IsRoleDead(e)
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    let i = Number(e[0]);
    if (i !== 0) {
      i = this.l4t[i - 1]?.GetRootItem();
      if (i) return [i, i];
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.EditFormationView = EditFormationView;
// # sourceMappingURL=EditFormationView.js.map
