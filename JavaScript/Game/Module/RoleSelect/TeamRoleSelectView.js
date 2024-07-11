"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamRoleSelectView = exports.TeamRoleSelectViewData = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiPopViewData_1 = require("../../Ui/Define/UiPopViewData"),
  UiManager_1 = require("../../Ui/UiManager"),
  FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance"),
  TeamPlayerSelectionComponent_1 = require("../Common/TeamPlayerSelectionComponent"),
  EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
  RoleController_1 = require("../RoleUi/RoleController"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  RoleTagMediumIconItem_1 = require("../RoleUi/RoleTag/RoleTagMediumIconItem"),
  SceneTeamDefine_1 = require("../SceneTeam/SceneTeamDefine"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
  TeamRoleGrid_1 = require("./TeamRoleGrid"),
  TeamRoleSkillItem_1 = require("./TeamRoleSkillItem"),
  displaySkillTypes = [11, 2, 3, 6];
class TeamRoleSelectViewData extends UiPopViewData_1.UiPopViewData {
  constructor(i, t, e, s, h, o) {
    super(),
      (this.UseWay = void 0),
      (this.CurrentRoleId = 0),
      (this.RoleList = void 0),
      (this.EditBattleRoleSlotDataList = void 0),
      (this.Position = 0),
      (this.FormationRoleList = void 0),
      (this.ConfirmCallBack = void 0),
      (this.OnHideFinishCallBack = void 0),
      (this.BackCallBack = void 0),
      (this.GetConfirmButtonTextCallBack = void 0),
      (this.GetConfirmButtonEnableCallBack = void 0),
      (this.IsNeedRevive = void 0),
      (this.CanConfirmFunc = void 0),
      (this.CanJoinTeam = void 0),
      (this.UseWay = i),
      (this.CurrentRoleId = t),
      (this.RoleList = e),
      (this.BackCallBack = h),
      (this.ConfirmCallBack = s),
      (this.Position = o);
  }
  SetHideFinishCallBack(i) {
    this.OnHideFinishCallBack = i;
  }
  SetGetConfirmButtonTextFunction(i) {
    this.GetConfirmButtonTextCallBack = i;
  }
  SetGetConfirmButtonEnableFunction(i) {
    this.GetConfirmButtonEnableCallBack = i;
  }
  SetOtherTeamSlotData(i) {
    this.EditBattleRoleSlotDataList = i;
  }
  SetConfirmCheckFunction(i) {
    this.CanConfirmFunc = i;
  }
}
exports.TeamRoleSelectViewData = TeamRoleSelectViewData;
class TeamRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.ami = void 0),
      (this.CurSelectRole = void 0),
      (this.jho = void 0),
      (this.Kho = void 0),
      (this.Xho = void 0),
      (this.$ho = void 0),
      (this.Yho = void 0),
      (this.Jho = void 0),
      (this.zho = void 0),
      (this.x4t = !1),
      (this.xUt = () => {
        var i = this.CurSelectRole?.GetDataId(),
          t = this.Pe?.CanConfirmFunc;
        (t && !t(i)) ||
          (this.Pe?.ConfirmCallBack?.(i),
          UiManager_1.UiManager.CloseView(this.Info.Name));
      }),
      (this.W9t = () => {
        this.Pe?.BackCallBack?.(),
          UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.Zho = () => {
        var i = this.CurSelectRole.GetDataId(),
          t = i >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [i] : [];
        RoleController_1.RoleController.OpenRoleMainView(0, i, t),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnRoleChangeEnd,
            this.elo,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          );
      }),
      (this.$Ge = (i) => {
        "RoleRootView" === i &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnRoleChangeEnd,
            this.elo,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          ));
      }),
      (this.w4t = (i) => {
        (ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = i),
          (this.x4t = i);
        i = this.Xho.GetSelectedGridIndex();
        !this.$ho || i < 0 || this.$ho.length < i || this.tlo(this.$ho[i]);
      }),
      (this.Qho = (i, t, e) => {
        this.Kho = i;
        var i = 0 < this.Kho.length,
          s =
            (this.GetItem(8).SetUIActive(!i),
            this.GetButton(3).RootUIComp.SetUIActive(i),
            !ModelManager_1.ModelManager.TowerModel.CheckInTower() && i);
        if (
          (this.GetButton(9).RootUIComp.SetUIActive(s),
          this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i),
          this.GetItem(10).SetUIActive(i),
          i)
        ) {
          s = this.CurSelectRole?.GetDataId();
          if (
            (s &&
              ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
                s,
              ),
            this.jho.DeselectCurrentGridProxy(),
            this.jho.RefreshByData(this.Kho),
            this.CurSelectRole)
          )
            if (1 !== e || t) {
              let i = !1;
              for (const h of this.Kho)
                if (h.GetDataId() === this.CurSelectRole?.GetDataId()) {
                  i = !0;
                  break;
                }
              i || (this.CurSelectRole = this.Kho[0]);
            } else this.CurSelectRole = this.Kho[0];
          else
            for (const o of this.Kho)
              if (
                ((this.CurSelectRole = o),
                this.Pe?.CanJoinTeam?.(o.GetDataId()))
              )
                break;
          this.ilo();
        }
      }),
      (this.z9e = () => {
        var i = new TeamRoleGrid_1.TeamRoleGrid();
        return (
          (i.IsHighlightIndex = this.IsHighlightIndex),
          i.BindOnExtendToggleStateChanged(this.ToggleFunction),
          i.BindOnCanExecuteChange(this.CanExecuteChangeFunction),
          i
        );
      }),
      (this.IsHighlightIndex = (i) => i === this.Pe?.Position),
      (this.ToggleFunction = (i) => {
        var t;
        1 === i.State &&
          ((t = this.CurSelectRole?.GetDataId()) &&
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
              t,
            ),
          (t = i.Data),
          (this.CurSelectRole = t),
          this.olo(),
          (i = this.Kho.indexOf(t)),
          this.jho.SelectGridProxy(i),
          this.jho.RefreshGridProxy(i),
          (t = this.CurSelectRole.GetDataId()),
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(t),
          this.rlo(t),
          this.F6t(t),
          this.U4t(t));
      }),
      (this.CanExecuteChangeFunction = (i, t, e) => {
        return 1 !== e || this.CurSelectRole !== i;
      }),
      (this.nlo = () => {
        var i = new TeamRoleSkillItem_1.TeamRoleSkillItem();
        return i.BindOnSkillStateChange(this.slo), i;
      }),
      (this.slo = (i, t) => {
        1 === i &&
          this.$ho &&
          ((i = this.$ho.indexOf(t)), this.Xho.SelectGridProxy(i), this.tlo(t));
      }),
      (this.alo = () => {
        this.CurSelectRole &&
          (this.olo(), this.rlo(this.CurSelectRole.GetDataId()));
      }),
      (this.elo = () => {
        var t = ModelManager_1.ModelManager.RoleSelectModel;
        let e = !1;
        for (let i = 0; i < this.Kho.length; i++) {
          var s = this.Kho[i],
            h = this.CurSelectRole === s,
            o = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
              s.GetDataId(),
            );
          o &&
            o !== s &&
            ((e = !0),
            (this.Kho[i] = o),
            0 < (s = t.GetRoleIndex(s.GetDataId())) && t.RoleIndexMap.set(s, o),
            h) &&
            (this.CurSelectRole = o);
        }
        e && this.ami?.UpdateData(this.Pe.UseWay, this.Kho);
      }),
      (this.d3t = () => {
        var i;
        this.Pe?.EditBattleRoleSlotDataList &&
          (((i =
            ModelManager_1.ModelManager.EditBattleTeamModel.GetRoleSlotData(
              this.Pe.Position,
            )) &&
            i.GetRoleData?.PlayerId ===
              ModelManager_1.ModelManager.PlayerInfoModel.GetId()) ||
            (this.Pe?.BackCallBack?.(),
            UiManager_1.UiManager.CloseView(this.Info.Name)),
          this.Pe?.SetOtherTeamSlotData(
            ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
          ),
          this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIInteractionGroup],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIText],
      [13, UE.UIHorizontalLayout],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIMultiTemplateLayout],
      [17, UE.UIItem],
      [18, UE.UIText],
      [22, UE.UIExtendToggle],
      [23, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.xUt],
        [4, this.W9t],
        [9, this.Zho],
        [22, this.w4t],
      ]);
  }
  async OnBeforeStartAsync() {
    var i = [];
    for (const t of this.OpenParam.RoleList)
      t.GetDataId() > RoleDefine_1.ROBOT_DATA_MIN_ID && i.push(t.GetDataId());
    0 < i.length &&
      (await RoleController_1.RoleController.RobotRolePropRequest(i));
  }
  OnStart() {
    (this.Pe = this.OpenParam),
      (this.jho = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(7).GetOwner(),
        this.z9e,
      ));
    var i = this.GetItem(20),
      i =
        ((this.Jho =
          new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i)),
        this.GetItem(21)),
      i =
        ((this.zho =
          new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i)),
        ModelManager_1.ModelManager.GameModeModel.IsMulti),
      i =
        (this.GetItem(23).SetUIActive(i),
        (this.x4t =
          ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && i),
        this.x4t ? 1 : 0),
      t =
        (this.GetExtendToggle(22).SetToggleState(i),
        (this.Xho = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(13),
          this.nlo,
        )),
        (this.Yho = new GenericLayout_1.GenericLayout(
          this.GetMultiTemplateLayout(16),
          () => new RoleTagMediumIconItem_1.RoleTagMediumIconItem(),
        )),
        (this.Kho = this.Pe?.RoleList),
        this.Pe?.CurrentRoleId),
      e = this.Pe?.FormationRoleList,
      s =
        (ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
        ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
    if (e)
      for (
        let i = 1;
        i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length);
        i++
      ) {
        var h = e[i - 1];
        for (const o of this.Kho)
          if (o.GetDataId() === h) {
            s.set(i, o);
            break;
          }
      }
    i = this.GetItem(5);
    this.ami = new FilterSortEntrance_1.FilterSortEntrance(i, this.Qho);
    for (const r of this.Kho)
      if (r.GetDataId() === t) {
        this.CurSelectRole = r;
        break;
      }
    this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList),
      this.Kho.sort(
        (i, t) => t.GetRoleConfig().Priority - i.GetRoleConfig().Priority,
      ),
      this.ami?.UpdateData(this.Pe.UseWay, this.Kho);
  }
  OnBeforeDestroy() {
    this.Pe?.OnHideFinishCallBack?.(),
      this.ami?.Destroy(),
      (this.Pe = void 0),
      (this.CurSelectRole = void 0),
      this.ami?.Destroy(),
      (this.ami = void 0),
      this.jho?.ClearGridProxies(),
      (this.jho = void 0),
      this.Kho?.splice(0, this.Kho.length),
      (this.Kho = void 0),
      this.Jho?.Destroy(),
      (this.Jho = void 0),
      this.zho?.Destroy(),
      (this.zho = void 0),
      this.Xho?.ClearChildren(),
      (this.Xho = void 0),
      this.$ho?.splice(0, this.$ho.length),
      (this.$ho = void 0),
      this.Yho?.ClearChildren(),
      (this.Yho = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.d3t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleRefreshAttribute,
        this.alo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRevive,
        this.alo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.d3t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleRefreshAttribute,
        this.alo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRevive,
        this.alo,
      );
  }
  ilo() {
    this.olo();
    var i = this.Kho.indexOf(this.CurSelectRole),
      i = (this.jho.SelectGridProxy(i), this.CurSelectRole.GetDataId());
    ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(i),
      this.rlo(i),
      this.F6t(i),
      this.U4t(i);
  }
  RefreshTeamItem(t) {
    if (t) {
      this.Jho.SetActive(!0),
        this.zho.SetActive(!0),
        (this.Jho.IsSet = !1),
        (this.zho.IsSet = !1);
      for (let i = 1; i <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; i++) {
        var e = t[i - 1];
        !e?.HasRole ||
          e.GetRoleData.IsSelf ||
          (this.Jho.IsSet
            ? this.zho.IsSet ||
              (this.zho.SetRoleId(e.GetRoleData.ConfigId),
              this.zho.SetTeamNumber(e.GetRoleData.OnlineIndex),
              this.zho.RefreshItem())
            : (this.Jho.SetRoleId(e.GetRoleData.ConfigId),
              this.Jho.SetTeamNumber(e.GetRoleData.OnlineIndex),
              this.Jho.RefreshItem()));
      }
      this.Jho.SetActive(this.Jho.IsSet), this.zho.SetActive(this.zho.IsSet);
    } else this.Jho.SetActive(!1), this.zho.SetActive(!1);
  }
  rlo(i) {
    var i = this.Pe?.GetConfirmButtonTextCallBack?.(i);
    i &&
      ((i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i)),
      this.GetText(2).ShowTextNew(i));
  }
  F6t(i) {
    this.Pe?.GetConfirmButtonEnableCallBack &&
      ((i = this.Pe.GetConfirmButtonEnableCallBack(i)),
      this.GetInteractionGroup(0)?.SetInteractable(i));
  }
  U4t(i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleName(i),
      t =
        (this.GetText(11).SetText(t),
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i));
    if (t) {
      var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
        t.SkillId,
      );
      if (e) {
        const h = new Array();
        for (const o of displaySkillTypes)
          for (const r of e)
            if (r.SkillType === o) {
              var s = new TeamRoleSkillItem_1.TeamRoleSkillData();
              (s.SkillIcon = r.Icon),
                (s.SkillType = o),
                (s.SkillName = r.SkillName),
                (s.SkillTagList = r.SkillTagList),
                (s.SkillResume = r.SkillDescribe),
                (s.SkillResumeNum = r.SkillDetailNum),
                (s.MultiSkillDesc = r.MultiSkillDescribe),
                (s.MultiSkillDescNum = r.MultiSkillDetailNum),
                h.push(s);
              break;
            }
        h.length <= 0 ||
          ((this.$ho = h),
          this.Xho.DeselectCurrentGridProxy(),
          this.Xho.RefreshByData(h, () => {
            this.Xho.SelectGridProxy(0), this.slo(1, h[0]);
          }),
          (t = void 0 !== (i = t.Tag) && 0 < i.length),
          this.GetMultiTemplateLayout(16).RootUIComp.SetUIActive(t),
          t && this.Yho?.RefreshByData(i));
      }
    }
  }
  tlo(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.SkillName);
    var t = this.GetText(18),
      t =
        (this.x4t
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              t,
              i.MultiSkillDesc,
              ...i.MultiSkillDescNum,
            )
          : "" === i.SkillResume
            ? t.SetUIActive(!1)
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                t,
                i.SkillResume,
                ...i.SkillResumeNum,
              ),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
          i.SkillType,
        ));
    t && this.GetText(12).SetText(t);
  }
  olo() {
    var i,
      t,
      e = this.GetText(6);
    !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
    ((i = this.CurSelectRole.GetDataId()),
    (t = this.Kho.indexOf(this.CurSelectRole)),
    this.jho.RefreshGridProxy(t),
    this.Pe?.IsNeedRevive?.(i))
      ? (e.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(e, "EditBattleTeamNeedRevive"))
      : e.SetUIActive(!1);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = Number(i[0]);
    if (0 !== t) {
      t = this.hlo(t);
      if (t) return [t, t];
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        i,
      ]);
  }
  hlo(t) {
    let e = 0,
      s = void 0;
    return (
      this.Kho?.forEach(
        (i) =>
          i.GetRoleId() === t &&
          ((e = this.Kho.indexOf(i)), (s = this.jho?.GetGrid(e)), !0),
      ),
      TimerSystem_1.TimerSystem.Next(() => {
        this.jho.ScrollToGridIndex(e, !1);
      }),
      s
    );
  }
}
exports.TeamRoleSelectView = TeamRoleSelectView;
//# sourceMappingURL=TeamRoleSelectView.js.map
