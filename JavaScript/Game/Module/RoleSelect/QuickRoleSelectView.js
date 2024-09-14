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
      (this.HideGrayIcon = !1),
      (this.UseWay = i),
      (this.SelectedRoleList = e),
      (this.RoleList = t);
  }
}
exports.QuickRoleSelectViewData = QuickRoleSelectViewData;
class QuickRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.adi = void 0),
      (this.Flo = void 0),
      (this.Vlo = void 0),
      (this.d5t = void 0),
      (this.C5t = void 0),
      (this.mCa = void 0),
      (this.qAt = () => {
        var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          t = new Array();
        for (
          let i = 1;
          i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
          i++
        ) {
          var s = e.get(i);
          s && t.push(s.GetDataId());
        }
        var i = this.Pe?.CanConfirm;
        (i && !i(t)) ||
          (this.Pe?.OnWaitLoadingConfirm
            ? (this.E5t(),
              this.Pe?.OnWaitLoadingConfirm(t).finally(() => {
                this.CloseMe();
              }))
            : (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName
                  .TowerDefenseBeforeConfirmQuickRoleSelect,
              ),
              this.Pe?.OnConfirm?.(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName
                  .TowerDefenseBeforeConfirmQuickRoleSelect,
              ),
              UiManager_1.UiManager.CloseView(this.Info.Name)));
      }),
      (this.W7t = () => {
        this.Pe?.OnBack?.(), UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.cHe = () => {
        var i = new TeamRoleGrid_1.TeamRoleGrid();
        return (
          i.BindOnExtendToggleStateChanged(this.ToggleFunction),
          i.BindOnCanExecuteChange(this.CanExecuteChange),
          i.SetHideGrayIcon(this.Pe.HideGrayIcon),
          i
        );
      }),
      (this.ToggleFunction = (i) => {
        var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet,
          s = i.Data;
        if (0 === i.State) {
          for (const r of e)
            if (r[1] === s) {
              e.delete(r[0]), t.delete(s.GetDataId());
              break;
            }
        } else if (1 === i.State)
          for (
            let i = 1;
            i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
            i++
          )
            if (!e.has(i)) {
              e.set(i, s), t.add(s.GetDataId());
              break;
            }
        i = this.Vlo.indexOf(s);
        this.Flo.RefreshGridProxy(i);
      }),
      (this.CanExecuteChange = (i, e, t) => {
        return (
          0 !== t ||
          ((t =
            ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >=
            EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) &&
            (this.Pe?.OnRoleSelectFull
              ? this.Pe?.OnRoleSelectFull()
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "EditBattleTeamRoleFull",
                )),
          !t)
        );
      }),
      (this.Hlo = (i, e) => {
        var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          s = new Array();
        for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++)
          t.has(i) && s.push(t.get(i));
        for (const n of i) s.includes(n) || s.push(n);
        i = 0 < s.length;
        if (
          (this.GetItem(11).SetUIActive(!i),
          this.GetButton(3).RootUIComp.SetUIActive(i),
          this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i),
          i)
        ) {
          this.Flo.RefreshByData(s);
          for (const a of t.values()) {
            var r = this.Vlo.indexOf(a),
              o = s.indexOf(a);
            0 <= this.Flo.Iei &&
              r !== o &&
              (ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
                a.GetDataId(),
              ),
              this.Flo.UnsafeGetGridProxy(r)?.OnDeselected(!1));
          }
          for (const l of t.values()) {
            var h = s.indexOf(l);
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(
              l.GetDataId(),
            ),
              this.Flo.UnsafeGetGridProxy(h)?.OnForceSelected();
          }
          this.Vlo = s;
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
    ]),
      (this.BtnBindInfo = [
        [3, this.qAt],
        [4, this.W7t],
      ]);
  }
  E5t() {
    this.d5t ||
      (this.GetItem(14).SetUIActive(!0),
      (this.d5t = TimerSystem_1.TimerSystem.Delay(() => {
        this.GetButton(4)?.RootUIComp.SetUIActive(!1),
          this.GetItem(13)?.SetUIActive(!0),
          this.mCa?.PlaySequence("Progressing");
      }, EditFormationDefine_1.DELAY_SHOW_LOADING))),
      this.C5t ||
        (this.C5t = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.ResetToBattleView();
        }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION));
  }
  OnStart() {
    (this.Pe = this.OpenParam),
      (this.Flo = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(10).GetOwner(),
        this.cHe,
      )),
      (this.mCa = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(13)));
  }
  OnBeforeDestroy() {
    this.Pe?.OnHideFinish?.(),
      (this.Pe = void 0),
      this.adi?.Destroy(),
      (this.adi = void 0),
      this.Flo?.ClearGridProxies(),
      (this.Flo = void 0),
      this.Vlo?.splice(0, this.Vlo.length),
      (this.Vlo = void 0),
      this.d5t &&
        (TimerSystem_1.TimerSystem.Has(this.d5t) &&
          TimerSystem_1.TimerSystem.Remove(this.d5t),
        (this.d5t = void 0)),
      this.C5t &&
        (TimerSystem_1.TimerSystem.Has(this.C5t) &&
          TimerSystem_1.TimerSystem.Remove(this.C5t),
        (this.C5t = void 0));
  }
  OnBeforeShow() {
    this.Vlo = this.Pe?.RoleList;
    var e = this.Pe?.SelectedRoleList,
      t =
        (ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
        ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
    if (e)
      for (
        let i = 1;
        i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length);
        i++
      ) {
        var s = e[i - 1];
        for (const r of this.Vlo)
          if (r.GetDataId() === s) {
            t.set(i, r);
            break;
          }
      }
    var i = this.GetItem(8);
    (this.adi = new FilterSortEntrance_1.FilterSortEntrance(i, this.Hlo)),
      this.Vlo.sort(
        (i, e) => e.GetRoleConfig().Priority - i.GetRoleConfig().Priority,
      ),
      this.adi.UpdateData(this.Pe.UseWay, this.Vlo),
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
