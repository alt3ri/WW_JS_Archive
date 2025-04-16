"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickRoleSelectView = exports.QuickRoleSelectViewData = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../Ui/Base/UiSequencePlayer"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance"),
  EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
  TeamRoleGrid_1 = require("./TeamRoleGrid");
class QuickRoleSelectViewData {
  constructor(i, e, t) {
    (this.UseWay = void 0),
      (this.SelectedRoleList = void 0),
      (this.RoleList = void 0),
      (this.CanConfirm = void 0),
      (this.OnConfirm = void 0),
      (this.OnWaitLoadingConfirm = void 0),
      (this.OnBack = void 0),
      (this.OnHideFinish = void 0),
      (this.OnRoleSelectFull = void 0),
      (this.UseWay = i),
      (this.SelectedRoleList = e),
      (this.RoleList = t);
  }
}
exports.QuickRoleSelectViewData = QuickRoleSelectViewData;
class QuickRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.FilterSortEntrance = void 0),
      (this.RoleScrollView = void 0),
      (this.RoleList = void 0),
      (this.DelayLoadingTimer = void 0),
      (this.AutoCloseTimer = void 0),
      (this.LoadingSequencePlayer = void 0),
      (this.qAt = () => {
        var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          t = new Array();
        for (
          let i = 1;
          i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
          i++
        ) {
          var r = e.get(i);
          r && t.push(r.GetDataId());
        }
        var i = this.Data?.CanConfirm;
        (i && !i(t)) ||
          (this.Data?.OnWaitLoadingConfirm
            ? (this.E5t(),
              this.Data?.OnWaitLoadingConfirm(t).finally(() => {
                this.CloseMe();
              }))
            : (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName
                  .TowerDefenseBeforeConfirmQuickRoleSelect,
              ),
              this.Data?.OnConfirm?.(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName
                  .TowerDefenseBeforeConfirmQuickRoleSelect,
              ),
              UiManager_1.UiManager.CloseView(this.Info.Name)));
      }),
      (this.W7t = () => {
        this.Data?.OnBack?.(), UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.cHe = () => {
        var i = new TeamRoleGrid_1.TeamRoleGrid();
        return (
          i.BindOnExtendToggleStateChanged(this.ToggleFunction),
          i.BindOnCanExecuteChange(this.CanExecuteChange),
          i
        );
      }),
      (this.ToggleFunction = (i) => {
        var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet,
          r = i.Data;
        if (0 === i.State) {
          for (const s of e)
            if (s[1] === r) {
              e.delete(s[0]), t.delete(r.GetDataId());
              break;
            }
        } else if (1 === i.State)
          for (
            let i = 1;
            i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
            i++
          )
            if (!e.has(i)) {
              e.set(i, r), t.add(r.GetDataId());
              break;
            }
        i = this.RoleList.indexOf(r);
        this.RoleScrollView.RefreshGridProxy(i);
      }),
      (this.CanExecuteChange = (i, e, t) => {
        return (
          0 !== t ||
          ((t = i.GetRoleId()),
          ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(
            t,
          )
            ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "EditBattleTeamCannotSwitchOtherArea",
              ),
              !1)
            : ((i =
                ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >=
                EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) &&
                (this.Data?.OnRoleSelectFull
                  ? this.Data?.OnRoleSelectFull()
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "EditBattleTeamRoleFull",
                    )),
              !i))
        );
      }),
      (this.Hlo = (i, e) => {
        var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          r = new Array();
        for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++)
          t.has(i) && r.push(t.get(i));
        for (const n of i) r.includes(n) || r.push(n);
        i = 0 < r.length;
        if (
          (this.GetItem(11).SetUIActive(!i),
          this.GetButton(3).RootUIComp.SetUIActive(i),
          this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i),
          i)
        ) {
          this.RoleScrollView.RefreshByData(r);
          for (const a of t.values()) {
            var s = this.RoleList.indexOf(a),
              o = r.indexOf(a);
            0 <= this.RoleScrollView.Iei &&
              s !== o &&
              (ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
                a.GetDataId(),
              ),
              this.RoleScrollView.UnsafeGetGridProxy(s)?.OnDeselected(!1));
          }
          for (const l of t.values()) {
            var h = r.indexOf(l);
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(
              l.GetDataId(),
            ),
              this.RoleScrollView.UnsafeGetGridProxy(h)?.OnForceSelected();
          }
          this.RoleList = r;
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIInteractionGroup],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIText],
      [5, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.qAt],
        [4, this.W7t],
      ]);
  }
  E5t() {
    this.DelayLoadingTimer ||
      (this.GetItem(14).SetUIActive(!0),
      (this.DelayLoadingTimer = TimerSystem_1.TimerSystem.Delay(() => {
        this.GetButton(4)?.RootUIComp.SetUIActive(!1),
          this.GetItem(13)?.SetUIActive(!0),
          this.LoadingSequencePlayer?.PlaySequence("Progressing");
      }, EditFormationDefine_1.DELAY_SHOW_LOADING))),
      this.AutoCloseTimer ||
        (this.AutoCloseTimer = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.ResetToBattleView();
        }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION));
  }
  OnStart() {
    (this.Data = this.OpenParam),
      (this.RoleScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(10).GetOwner(),
        this.cHe,
      )),
      (this.LoadingSequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(
        this.GetItem(13),
      )),
      this.GetText(15)?.SetUIActive(
        -1 !== ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea,
      );
    var i = ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(15),
      "MowTower_LevelTips",
      i,
      i,
    );
  }
  OnBeforeDestroy() {
    this.Data?.OnHideFinish?.(),
      (this.Data = void 0),
      this.FilterSortEntrance?.Destroy(),
      (this.FilterSortEntrance = void 0),
      this.RoleScrollView?.ClearGridProxies(),
      (this.RoleScrollView = void 0),
      this.RoleList?.splice(0, this.RoleList.length),
      (this.RoleList = void 0),
      this.DelayLoadingTimer &&
        (TimerSystem_1.TimerSystem.Has(this.DelayLoadingTimer) &&
          TimerSystem_1.TimerSystem.Remove(this.DelayLoadingTimer),
        (this.DelayLoadingTimer = void 0)),
      this.AutoCloseTimer &&
        (TimerSystem_1.TimerSystem.Has(this.AutoCloseTimer) &&
          TimerSystem_1.TimerSystem.Remove(this.AutoCloseTimer),
        (this.AutoCloseTimer = void 0));
  }
  OnBeforeShow() {
    this.RoleList = this.Data?.RoleList;
    var e = this.Data?.SelectedRoleList,
      t =
        (ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
        ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
    if (e)
      for (
        let i = 1;
        i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length);
        i++
      ) {
        var r = e[i - 1];
        for (const s of this.RoleList)
          if (s.GetDataId() === r) {
            t.set(i, s);
            break;
          }
      }
    var i = this.GetItem(8);
    (this.FilterSortEntrance = new FilterSortEntrance_1.FilterSortEntrance(
      i,
      this.Hlo,
    )),
      this.RoleList.sort(
        (i, e) => e.GetRoleConfig().Priority - i.GetRoleConfig().Priority,
      ),
      this.FilterSortEntrance.UpdateData(this.Data.UseWay, this.RoleList),
      this.GetItem(5).SetUIActive(!1),
      this.GetText(9).SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "FastFormation_Finish",
      );
  }
}
exports.QuickRoleSelectView = QuickRoleSelectView;
//# sourceMappingURL=QuickRoleSelectView.js.map
