"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickRoleSelectView = exports.QuickRoleSelectViewData = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const TeamRoleGrid_1 = require("./TeamRoleGrid");
class QuickRoleSelectViewData {
  constructor(i, e, t) {
    (this.UseWay = void 0),
      (this.SelectedRoleList = void 0),
      (this.RoleList = void 0),
      (this.CanConfirm = void 0),
      (this.OnConfirm = void 0),
      (this.OnBack = void 0),
      (this.OnHideFinish = void 0),
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
      (this.ami = void 0),
      (this.jho = void 0),
      (this.Kho = void 0),
      (this.xUt = () => {
        const e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
        const t = new Array();
        for (
          let i = 1;
          i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
          i++
        ) {
          const r = e.get(i);
          r && t.push(r.GetDataId());
        }
        const i = this.Pe?.CanConfirm;
        (i && !i(t)) ||
          (this.Pe?.OnConfirm?.(t),
          UiManager_1.UiManager.CloseView(this.Info.Name));
      }),
      (this.W9t = () => {
        this.Pe?.OnBack?.(), UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.z9e = () => {
        const i = new TeamRoleGrid_1.TeamRoleGrid();
        return (
          i.BindOnExtendToggleStateChanged(this.ToggleFunction),
          i.BindOnCanExecuteChange(this.CanExecuteChange),
          i
        );
      }),
      (this.ToggleFunction = (i) => {
        const e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
        const t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
        const r = i.Data;
        if (i.State === 0) {
          for (const o of e)
            if (o[1] === r) {
              e.delete(o[0]), t.delete(r.GetDataId());
              break;
            }
        } else if (i.State === 1)
          for (
            let i = 1;
            i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
            i++
          )
            if (!e.has(i)) {
              e.set(i, r), t.add(r.GetDataId());
              break;
            }
        i = this.Kho.indexOf(r);
        this.jho.RefreshGridProxy(i);
      }),
      (this.CanExecuteChange = (i, e, t) => {
        return (
          t !== 0 ||
          ((t =
            ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >=
            EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) &&
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "EditBattleTeamRoleFull",
            ),
          !t)
        );
      }),
      (this.Qho = (i, e) => {
        const t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
        const r = new Array();
        for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++)
          t.has(i) && r.push(t.get(i));
        for (const h of i) r.includes(h) || r.push(h);
        i = r.length > 0;
        if (
          (this.GetItem(11).SetUIActive(!i),
          this.GetButton(3).RootUIComp.SetUIActive(i),
          this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i),
          i)
        ) {
          this.jho.RefreshByData(r);
          for (const n of t.values()) {
            const o = this.Kho.indexOf(n);
            const s = r.indexOf(n);
            this.jho.IZt >= 0 &&
              o !== s &&
              (ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
                n.GetDataId(),
              ),
              this.jho.UnsafeGetGridProxy(o)?.OnDeselected(!1));
          }
          for (const l of t.values()) {
            const a = r.indexOf(l);
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(
              l.GetDataId(),
            ),
              this.jho.UnsafeGetGridProxy(a)?.OnForceSelected();
          }
          this.Kho = r;
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
    ]),
      (this.BtnBindInfo = [
        [3, this.xUt],
        [4, this.W9t],
      ]);
  }
  OnStart() {
    (this.Pe = this.OpenParam),
      (this.jho = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(10).GetOwner(),
        this.z9e,
      ));
  }
  OnBeforeDestroy() {
    this.Pe?.OnHideFinish?.(),
      (this.Pe = void 0),
      this.ami?.Destroy(),
      (this.ami = void 0),
      this.jho?.ClearGridProxies(),
      (this.jho = void 0),
      this.Kho?.splice(0, this.Kho.length),
      (this.Kho = void 0);
  }
  OnBeforeShow() {
    this.Kho = this.Pe?.RoleList;
    const e = this.Pe?.SelectedRoleList;
    const t =
      (ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
      ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
    if (e)
      for (
        let i = 1;
        i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length);
        i++
      ) {
        const r = e[i - 1];
        for (const o of this.Kho)
          if (o.GetDataId() === r) {
            t.set(i, o);
            break;
          }
      }
    const i = this.GetItem(8);
    (this.ami = new FilterSortEntrance_1.FilterSortEntrance(i, this.Qho)),
      this.Kho.sort(
        (i, e) => e.GetRoleConfig().Priority - i.GetRoleConfig().Priority,
      ),
      this.ami.UpdateData(this.Pe.UseWay, this.Kho),
      this.GetItem(5).SetUIActive(!1),
      this.GetText(9).SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "ConfirmText");
  }
}
exports.QuickRoleSelectView = QuickRoleSelectView;
// # sourceMappingURL=QuickRoleSelectView.js.map
