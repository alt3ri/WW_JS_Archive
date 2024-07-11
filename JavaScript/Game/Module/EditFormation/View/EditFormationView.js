"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  BuffItemControl_1 = require("../../BuffItem/BuffItemControl"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
  EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem"),
  QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
  TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  EditFormationController_1 = require("../EditFormationController"),
  EditFormationDefine_1 = require("../EditFormationDefine"),
  ExitSkillView_1 = require("./ExitSkill/ExitSkillView"),
  FormationRoleView_1 = require("./FormationRoleView");
class EditFormationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.l5t = []),
      (this.Ivt = void 0),
      (this.u4t = [10, 11, 12]),
      (this._5t = 0),
      (this.u5t = 0),
      (this.c5t = -1),
      (this.m5t = !1),
      (this.d5t = void 0),
      (this.C5t = void 0),
      (this.g5t = () => {
        this.IsDestroyOrDestroying || this.f5t(this._5t);
      }),
      (this.oZe = (e, i) => {
        for (const t of this.l5t) t.GetPlayer() === e && t.RefreshPing(i);
      }),
      (this.p5t = () => {
        var e;
        this.m5t ||
          (this.v5t() &&
            ((e = () => {
              (this.c5t = this._5t),
                ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                  ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(
                    this.c5t,
                  ),
                this.M5t();
            }),
            (ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? EditFormationController_1.EditFormationController.UpdateFightRoleRequest()
              : EditFormationController_1.EditFormationController.EditFormationRequest(
                  this._5t,
                )
            ).finally(e),
            this.E5t()));
      }),
      (this.G4t = () => {
        if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
          var e = ModelManager_1.ModelManager.EditFormationModel,
            i = new Array(),
            e = e.GetEditingRoleIdList(this._5t);
          if (e) for (const t of e) i.push(t);
          (e = ModelManager_1.ModelManager.RoleModel.GetRoleList()),
            (e = new QuickRoleSelectView_1.QuickRoleSelectViewData(5, i, e));
          (e.CanConfirm = this.S5t),
            (e.OnConfirm = this.N4t),
            (e.OnBack = this.y5t),
            (e.OnHideFinish = this.g5t),
            UiManager_1.UiManager.OpenView("QuickRoleSelectView", e),
            this.k4t(!1);
        }
      }),
      (this.S5t = (e) => {
        var i = ModelManager_1.ModelManager.EditFormationModel;
        if (this._5t !== i.GetCurrentFormationId) return !0;
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
      (this.N4t = (i) => {
        this.k4t(!0);
        var t = ModelManager_1.ModelManager.EditFormationModel;
        for (
          let e = 0;
          e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
          e++
        ) {
          var o = e <= i.length ? i[e] : 0,
            r = e + 1;
          t.SetEditingRoleId(this._5t, r, o, !1);
        }
      }),
      (this.I5t = () => {
        var e, i, t;
        this.m5t ||
          (this._5t === this.c5t && !this.v5t()) ||
          ((e = () => {
            this.M5t();
          }),
          ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? EditFormationController_1.EditFormationController.UpdateFightRoleRequest().finally(
                e,
              )
            : ((i =
                ModelManager_1.ModelManager.EditFormationModel
                  .GetCurrentFormationId),
              (t = this._5t === i),
              EditFormationController_1.EditFormationController.EditFormationRequest(
                i,
              ).finally(e),
              t &&
                ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(
                  this.c5t,
                )),
          this.E5t());
      }),
      (this.F4t = () => {
        if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
          var e = new ExitSkillView_1.ExitSkillViewData();
          for (const r of this.l5t) {
            var i = r.GetConfigId(),
              t = r.GetOnlineIndex(),
              o = r.GetPlayer();
            e.AddData(i, t, o);
          }
          UiManager_1.UiManager.OpenView("ExitSkillView", e);
        }
      }),
      (this.y5t = () => {
        this.k4t(!0);
      }),
      (this.S4t = (e) => {
        var i, t;
        return this.E4t(e)
          ? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
          : ((e = (t =
              ModelManager_1.ModelManager
                .EditFormationModel).IsInEditingFormation(this._5t, e)),
            (i = t.GetCurrentFormationId === this._5t),
            (t = (t = t.GetEditingRoleIdList(this._5t)) && 1 === t.length),
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
      (this.X4t = (e) => {
        this.k4t(!0);
        var i,
          t = ModelManager_1.ModelManager.EditFormationModel,
          o = t.GetEditingRolePosition(this._5t, e),
          r = this.u5t;
        t.IsInEditingFormation(this._5t, e)
          ? t.GetEditingRoleId(this._5t, r)
            ? o === r
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Formation", 49, "编队角色位置相同，换下", [
                    "位置",
                    r,
                  ]),
                t.SetEditingRoleId(this._5t, r))
              : ((i = t.GetEditingRoleId(this._5t, r)),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Formation", 49, "编队角色更换"),
                t.SetEditingRoleId(this._5t, r, e),
                t.SetEditingRoleId(this._5t, o, i))
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Formation", 49, "编队角色换下", ["位置", o]),
              t.SetEditingRoleId(this._5t, o))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                49,
                "编队角色加入",
                ["位置", r],
                ["roleId", e],
              ),
            t.SetEditingRoleId(this._5t, this.u5t, e),
            this.T5t(e));
      }),
      (this.v4t = (e) =>
        !ModelManager_1.ModelManager.EditFormationModel.IsInEditingFormation(
          this._5t,
          e,
        )),
      (this.M4t = (e) => this.E4t(e)),
      (this.W4t = (e) => {
        var i = ModelManager_1.ModelManager.EditFormationModel,
          e = i.IsInEditingFormation(this._5t, e),
          t = i.GetEditingRoleIdList(this._5t);
        let o = !0;
        return (o = t && !i.GetEditingRoleId(this._5t, this.u5t) && e ? !1 : o);
      }),
      (this.Q4t = (e) => {
        var i, t;
        if (e)
          return this.E4t(e)
            ? "EditBattleTeamRevive"
            : ((t = (i =
                ModelManager_1.ModelManager
                  .EditFormationModel).IsInEditingFormation(this._5t, e)),
              (e = i.GetEditingRolePosition(this._5t, e)),
              i.GetEditingRoleIdList(this._5t)
                ? i.GetEditingRoleId(this._5t, this.u5t)
                  ? t
                    ? void 0 === e
                      ? "JoinText"
                      : e === this.u5t
                        ? "GoDownText"
                        : "ChangeText"
                    : "ChangeText"
                  : t
                    ? "ChangeText"
                    : "JoinText"
                : "JoinText");
      }),
      (this.R6e = (e, i) => {
        return new EditFormationTabItem_1.EditFormationTabItem();
      }),
      (this.yqe = (e) => {
        var i = EditFormationDefine_1.FORMATION_SPRITES[e],
          i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i),
          e = e + 1,
          t =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "TeamText",
            ),
          i = new CommonTabData_1.CommonTabData(
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
      (this.$4t = (e) => {
        this.m5t ||
          ((e = e + 1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Test", 5, "当点击编队按钮时", ["formationId", e]),
          this.f5t(e),
          (this._5t = e),
          this.M3e());
      }),
      (this.L5t = (e) => {
        this.m5t ||
          (ModelManager_1.ModelManager.EditFormationModel.IsMyPosition(e)
            ? ((this.u5t = e),
              UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") ||
                UiManager_1.UiManager.OpenView(
                  "TeamRoleSelectView",
                  this.D5t(),
                ),
              this.k4t(!1))
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
        [1, this.F4t],
        [6, this.p5t],
        [8, this.I5t],
        [9, this.G4t],
      ]);
  }
  async OnBeforeStartAsync() {
    var i = ModelManager_1.ModelManager.EditFormationModel,
      t = i.GetCurrentFormationId;
    if (void 0 === t)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Formation", 49, "打开大世界编队界面时，当前编队为空");
    else {
      (this._5t = t),
        (this.c5t = t),
        i.InitEditingFormationMap(),
        await this.Y4t();
      let e = 1;
      var o = [];
      for (const a of [this.GetItem(3), this.GetItem(4), this.GetItem(5)]) {
        var r = new FormationRoleView_1.FormationRoleView(e);
        r.BindOnSelectRole(this.L5t),
          o.push(r.CreateThenShowByActorAsync(a.GetOwner())),
          this.l5t.push(r),
          e++;
      }
      await Promise.all(o), this.M3e();
      t = ModelManager_1.ModelManager.GameModeModel.IsMulti;
      this.GetButton(6).RootUIComp.SetUIActive(!t),
        this.GetButton(9).RootUIComp.SetUIActive(!t),
        this.GetItem(13).SetUIActive(!1),
        this.k4t(!0);
    }
  }
  OnBeforeShow() {
    var e;
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((e = this._5t - 1),
      this.Ivt.SelectToggleByIndex(e),
      (e =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId -
        1),
      this.Ivt.GetTabItemByIndex(e).ShowTeamBattleTips()),
      this.f5t(this._5t);
  }
  OnAddEventListener() {
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.oZe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnRefreshPlayerPing,
      this.oZe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        this.oZe,
      );
  }
  OnBeforeDestroy() {
    for (const e of this.l5t) e.Reset();
    (this.l5t = []),
      this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      (this.m5t = !1),
      this.d5t &&
        (TimerSystem_1.TimerSystem.Has(this.d5t) &&
          TimerSystem_1.TimerSystem.Remove(this.d5t),
        (this.d5t = void 0)),
      this.C5t &&
        (TimerSystem_1.TimerSystem.Has(this.C5t) &&
          TimerSystem_1.TimerSystem.Remove(this.C5t),
        (this.C5t = void 0));
  }
  E5t() {
    this.d5t ||
      (this.GetItem(14).SetUIActive(!0),
      (this.d5t = TimerSystem_1.TimerSystem.Delay(() => {
        this.k4t(!1),
          this.GetButton(1).RootUIComp.SetUIActive(!1),
          this.GetItem(13).SetUIActive(!0);
      }, EditFormationDefine_1.DELAY_SHOW_LOADING))),
      this.C5t ||
        (this.C5t = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.ResetToBattleView();
        }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION));
  }
  async M5t() {
    (this.m5t = !0),
      await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise,
      UiManager_1.UiManager.ResetToBattleView();
  }
  D5t() {
    var e = ModelManager_1.ModelManager.EditFormationModel,
      i = ModelManager_1.ModelManager.RoleModel.GetRoleList(),
      t = e.GetEditingRoleId(this._5t, this.u5t),
      t = new TeamRoleSelectView_1.TeamRoleSelectViewData(
        5,
        t,
        i,
        this.X4t,
        this.y5t,
        this.u5t,
      ),
      i =
        (t.SetGetConfirmButtonEnableFunction(this.W4t),
        t.SetGetConfirmButtonTextFunction(this.Q4t),
        t.SetHideFinishCallBack(this.g5t),
        t.SetConfirmCheckFunction(this.S4t),
        (t.IsNeedRevive = this.M4t),
        (t.CanJoinTeam = this.v4t),
        e.GetEditingRoleIdList(this._5t));
    return (t.FormationRoleList = i), t;
  }
  T5t(e) {
    e =
      ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(
        e,
      )?.JoinTeamEvent;
    e &&
      (AudioSystem_1.AudioSystem.PostEvent(e), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Audio", 57, "[Game.EditFormationView] PostEvent", [
        "Event",
        e,
      ]);
  }
  k4t(e) {
    var i = this.GetButton(8)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
    i && i.SetUIActive(e);
  }
  async Y4t() {
    var e = this.GetItem(0),
      i = new CommonTabComponentData_1.CommonTabComponentData(
        this.R6e,
        this.$4t,
        this.yqe,
      );
    (this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(e, i)),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        (this.Ivt.SetCanChange(
          () =>
            this._5t !==
              ModelManager_1.ModelManager.EditFormationModel
                .GetCurrentFormationId || this.v5t(),
        ),
        await this.Ivt.RefreshTabItemAsync(
          EditFormationDefine_1.MAX_FORMATION_ID - 1,
        ));
  }
  M3e() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var i =
        this._5t !==
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId;
      this.GetButton(6).SetSelfInteractive(i);
      let e = void 0;
      (e = i ? "EditBattleTeamFight" : "EditBattleTeamFighting"),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), e);
    }
  }
  f5t(n) {
    var s = ModelManager_1.ModelManager.EditFormationModel,
      e = this.GetButton(1).RootUIComp;
    if (s.GetEditingRoleIdList(n).length <= 0) {
      for (const i of this.l5t) i.ResetRole();
      e.SetUIActive(!1);
    } else {
      e.SetUIActive(!0);
      var h,
        l,
        _,
        m =
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
      for (let a = 1; a <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; a++) {
        let e = 0,
          i = 0,
          t = "",
          o = 0,
          r = 0;
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
                this.t5t(a, e, i, t, o, r))
              : this.t5t(a))
          : (h = s.GetCurrentFormationData?.GetRoleDataByPosition(a))
            ? ((r = h.PlayerId),
              (l =
                ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
                  r,
                )),
              m && !l
                ? this.t5t(a)
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
                  this.t5t(a, e, i, t, o, r)))
            : this.t5t(a);
      }
    }
  }
  t5t(e, i = 0, t = 0, o = "", r = 0, a = 0) {
    var e = e - 1,
      n = this.l5t[e];
    const s = this.GetUiSpriteTransition(this.u4t[e]);
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
  v5t() {
    var e = ModelManager_1.ModelManager.EditFormationModel,
      i = e.GetEditingRoleIdList(this._5t);
    if (0 === i.length)
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
  E4t(e) {
    var i, t;
    return !(
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((t = (i =
        ModelManager_1.ModelManager.EditFormationModel).IsInEditingFormation(
        this._5t,
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
    var i = Number(e[0]);
    if (0 !== i) {
      i = this.l5t[i - 1]?.GetRootItem();
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
//# sourceMappingURL=EditFormationView.js.map
