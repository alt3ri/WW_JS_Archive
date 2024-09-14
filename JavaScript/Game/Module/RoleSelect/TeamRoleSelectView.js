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
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
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
  constructor(i, e, t, s, h, o) {
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
      (this.CurrentRoleId = e),
      (this.RoleList = t),
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
      (this.adi = void 0),
      (this.CurSelectRole = void 0),
      (this.Flo = void 0),
      (this.Vlo = void 0),
      (this.jlo = void 0),
      (this.Wlo = void 0),
      (this.Klo = void 0),
      (this.Qlo = void 0),
      (this.Xlo = void 0),
      (this.x5t = !1),
      (this.SPe = void 0),
      (this.qAt = () => {
        var i = this.CurSelectRole?.GetDataId(),
          e = this.Pe?.CanConfirmFunc;
        (e && !e(i)) ||
          (this.Pe?.ConfirmCallBack?.(i),
          UiManager_1.UiManager.CloseView(this.Info.Name));
      }),
      (this.W7t = () => {
        this.Pe?.BackCallBack?.(),
          UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.$lo = () => {
        var i = this.CurSelectRole.GetDataId(),
          e = i >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [i] : [];
        RoleController_1.RoleController.OpenRoleMainView(0, i, e),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnRoleChangeEnd,
            this.Ylo,
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
            this.Ylo,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          ));
      }),
      (this.w5t = (i) => {
        (ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = i),
          (this.x5t = i);
        i = this.jlo.GetSelectedGridIndex();
        !this.Wlo || i < 0 || this.Wlo.length < i || this.Jlo(this.Wlo[i]);
      }),
      (this.Hlo = (i, e, t) => {
        this.Vlo = i;
        var i = 0 < this.Vlo.length,
          s =
            (this.GetItem(8).SetUIActive(!i),
            this.GetButton(3).RootUIComp.SetUIActive(i),
            !ModelManager_1.ModelManager.TowerModel.CheckInTower() && i);
        if (
          (this.GetButton(9).RootUIComp.SetUIActive(s),
          this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i),
          this.GetItem(24).SetUIActive(i),
          this.GetItem(10).SetUIActive(i),
          i)
        ) {
          s = this.CurSelectRole?.GetDataId();
          if (
            (s &&
              ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
                s,
              ),
            this.Flo.DeselectCurrentGridProxy(),
            this.Flo.RefreshByData(this.Vlo),
            this.CurSelectRole)
          )
            if (1 !== t || e) {
              let i = !1;
              for (const h of this.Vlo)
                if (h.GetDataId() === this.CurSelectRole?.GetDataId()) {
                  i = !0;
                  break;
                }
              i || (this.CurSelectRole = this.Vlo[0]);
            } else this.CurSelectRole = this.Vlo[0];
          else
            for (const o of this.Vlo)
              if (
                ((this.CurSelectRole = o),
                this.Pe?.CanJoinTeam?.(o.GetDataId()))
              )
                break;
          this.zlo();
        }
      }),
      (this.cHe = () => {
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
        var e;
        1 === i.State &&
          ((e = this.CurSelectRole?.GetDataId()) &&
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
              e,
            ),
          (e = i.Data),
          (this.CurSelectRole = e),
          this.Zlo(),
          (i = this.Vlo.indexOf(e)),
          this.Flo.SelectGridProxy(i),
          (e = this.CurSelectRole.GetDataId()),
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(e),
          this.e1o(e),
          this.F8t(e),
          this.U5t(e));
      }),
      (this.CanExecuteChangeFunction = (i, e, t) => {
        return 1 !== t || this.CurSelectRole !== i;
      }),
      (this.t1o = () => {
        var i = new TeamRoleSkillItem_1.TeamRoleSkillItem();
        return i.BindOnSkillStateChange(this.i1o), i;
      }),
      (this.i1o = (i, e) => {
        1 === i &&
          this.Wlo &&
          ((i = this.Wlo.indexOf(e)), this.jlo.SelectGridProxy(i), this.Jlo(e));
      }),
      (this.o1o = () => {
        this.CurSelectRole &&
          (this.Zlo(), this.e1o(this.CurSelectRole.GetDataId()));
      }),
      (this.Ylo = () => {
        var e = ModelManager_1.ModelManager.RoleSelectModel;
        let t = !1;
        for (let i = 0; i < this.Vlo.length; i++) {
          var s = this.Vlo[i],
            h = this.CurSelectRole === s,
            o = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(
              s.GetDataId(),
            );
          o &&
            o !== s &&
            ((t = !0),
            (this.Vlo[i] = o),
            0 < (s = e.GetRoleIndex(s.GetDataId())) && e.RoleIndexMap.set(s, o),
            h) &&
            (this.CurSelectRole = o);
        }
        t && this.adi?.UpdateData(this.Pe.UseWay, this.Vlo);
      }),
      (this.C4t = (i) => {
        var e;
        this.Pe?.EditBattleRoleSlotDataList &&
          (((e =
            ModelManager_1.ModelManager.EditBattleTeamModel.GetRoleSlotData(
              this.Pe.Position,
            )) &&
            e.GetRoleData?.PlayerId ===
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
      [24, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.qAt],
        [4, this.W7t],
        [9, this.$lo],
        [22, this.w5t],
      ]);
  }
  async OnBeforeStartAsync() {
    var i = [];
    for (const e of this.OpenParam.RoleList)
      e.GetDataId() > RoleDefine_1.ROBOT_DATA_MIN_ID && i.push(e.GetDataId());
    0 < i.length &&
      (await RoleController_1.RoleController.RobotRolePropRequest(i));
  }
  OnStart() {
    (this.Pe = this.OpenParam),
      (this.Flo = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(7).GetOwner(),
        this.cHe,
      ));
    var i = this.GetItem(20),
      i =
        ((this.Qlo =
          new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i)),
        this.GetItem(21)),
      i =
        ((this.Xlo =
          new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i)),
        ModelManager_1.ModelManager.GameModeModel.IsMulti),
      i =
        (this.GetItem(23).SetUIActive(i),
        (this.x5t =
          ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && i),
        this.x5t ? 1 : 0),
      e =
        (this.GetExtendToggle(22).SetToggleState(i),
        (this.jlo = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(13),
          this.t1o,
        )),
        (this.Klo = new GenericLayout_1.GenericLayout(
          this.GetMultiTemplateLayout(16),
          () => new RoleTagMediumIconItem_1.RoleTagMediumIconItem(),
        )),
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )),
        (this.Vlo = this.Pe?.RoleList),
        this.Pe?.CurrentRoleId),
      t = this.Pe?.FormationRoleList,
      s =
        (ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
        ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
    if (t)
      for (
        let i = 1;
        i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > t.length);
        i++
      ) {
        var h = t[i - 1];
        for (const o of this.Vlo)
          if (o.GetDataId() === h) {
            s.set(i, o);
            break;
          }
      }
    i = this.GetItem(5);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(i, this.Hlo);
    for (const r of this.Vlo)
      if (r.GetDataId() === e) {
        this.CurSelectRole = r;
        break;
      }
    this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList),
      this.Vlo.sort(
        (i, e) => e.GetRoleConfig().Priority - i.GetRoleConfig().Priority,
      );
  }
  OnBeforeShow() {
    this.adi?.UpdateData(this.Pe.UseWay, this.Vlo);
  }
  OnBeforeDestroy() {
    this.Pe?.OnHideFinishCallBack?.(),
      this.adi?.Destroy(),
      (this.Pe = void 0),
      (this.CurSelectRole = void 0),
      this.adi?.Destroy(),
      (this.adi = void 0),
      this.Flo?.ClearGridProxies(),
      (this.Flo = void 0),
      this.Vlo?.splice(0, this.Vlo.length),
      (this.Vlo = void 0),
      this.Qlo?.Destroy(),
      (this.Qlo = void 0),
      this.Xlo?.Destroy(),
      (this.Xlo = void 0),
      this.jlo?.ClearChildren(),
      (this.jlo = void 0),
      this.Wlo?.splice(0, this.Wlo.length),
      (this.Wlo = void 0),
      this.Klo?.ClearChildren(),
      (this.Klo = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.C4t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleRefreshAttribute,
        this.o1o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRevive,
        this.o1o,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.C4t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleRefreshAttribute,
        this.o1o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRevive,
        this.o1o,
      );
  }
  zlo() {
    this.Zlo();
    var i = this.Vlo.indexOf(this.CurSelectRole),
      i = (this.Flo.SelectGridProxy(i), this.CurSelectRole.GetDataId());
    ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(i),
      this.e1o(i),
      this.F8t(i),
      this.U5t(i);
  }
  RefreshTeamItem(e) {
    if (e) {
      this.Qlo.SetActive(!0),
        this.Xlo.SetActive(!0),
        (this.Qlo.IsSet = !1),
        (this.Xlo.IsSet = !1);
      for (let i = 1; i <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; i++) {
        var t = e[i - 1];
        !t?.HasRole ||
          t.GetRoleData.IsSelf ||
          (this.Qlo.IsSet
            ? this.Xlo.IsSet ||
              (this.Xlo.SetRoleId(t.GetRoleData.ConfigId),
              this.Xlo.SetTeamNumber(t.GetRoleData.OnlineIndex),
              this.Xlo.RefreshItem())
            : (this.Qlo.SetRoleId(t.GetRoleData.ConfigId),
              this.Qlo.SetTeamNumber(t.GetRoleData.OnlineIndex),
              this.Qlo.RefreshItem()));
      }
      this.Qlo.SetActive(this.Qlo.IsSet), this.Xlo.SetActive(this.Xlo.IsSet);
    } else this.Qlo.SetActive(!1), this.Xlo.SetActive(!1);
  }
  e1o(i) {
    var i = this.Pe?.GetConfirmButtonTextCallBack?.(i);
    i &&
      ((i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i)),
      this.GetText(2).ShowTextNew(i));
  }
  F8t(i) {
    this.Pe?.GetConfirmButtonEnableCallBack &&
      ((i = this.Pe.GetConfirmButtonEnableCallBack(i)),
      this.GetInteractionGroup(0)?.SetInteractable(i));
  }
  U5t(i) {
    "Switch" === this.SPe?.GetCurrentSequence()
      ? this.SPe.ReplaySequenceByKey("Switch")
      : this.SPe?.PlayLevelSequenceByName("Switch");
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleName(i),
      e =
        (this.GetText(11).SetText(e),
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i));
    if (e) {
      var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
        e.SkillId,
      );
      if (t) {
        const h = new Array();
        for (const o of displaySkillTypes)
          for (const r of t)
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
          ((this.Wlo = h),
          this.jlo.DeselectCurrentGridProxy(),
          this.jlo.RefreshByData(h, () => {
            this.jlo.SelectGridProxy(0), this.i1o(1, h[0]);
          }),
          (e = void 0 !== (i = e.Tag) && 0 < i.length),
          this.GetMultiTemplateLayout(16).RootUIComp.SetUIActive(e),
          e && this.Klo?.RefreshByData(i));
      }
    }
  }
  Jlo(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.SkillName);
    var e = this.GetText(18),
      e =
        (this.x5t
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              e,
              i.MultiSkillDesc,
              ...i.MultiSkillDescNum,
            )
          : "" === i.SkillResume
            ? e.SetUIActive(!1)
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                e,
                i.SkillResume,
                ...i.SkillResumeNum,
              ),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
          i.SkillType,
        ));
    e && this.GetText(12).SetText(e);
  }
  Zlo() {
    var i,
      e,
      t = this.GetText(6);
    !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
    ((i = this.CurSelectRole.GetDataId()),
    (e = this.Vlo.indexOf(this.CurSelectRole)),
    this.Flo.RefreshGridProxy(e),
    this.Pe?.IsNeedRevive?.(i))
      ? (t.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(t, "EditBattleTeamNeedRevive"))
      : t.SetUIActive(!1);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var e = Number(i[0]);
    if (0 !== e) {
      e = this.r1o(e);
      if (e) return [e, e];
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        i,
      ]);
  }
  r1o(e) {
    let t = 0,
      s = void 0;
    return (
      this.Vlo?.forEach(
        (i) =>
          i.GetRoleId() === e &&
          ((t = this.Vlo.indexOf(i)), (s = this.Flo?.GetGrid(t)), !0),
      ),
      TimerSystem_1.TimerSystem.Next(() => {
        this.Flo.ScrollToGridIndex(t, !1);
      }),
      s
    );
  }
}
exports.TeamRoleSelectView = TeamRoleSelectView;
//# sourceMappingURL=TeamRoleSelectView.js.map
