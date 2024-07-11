"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookRoleView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance"),
  RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
  HandBookRoleMediumItemGird_1 = require("./HandBookRoleMediumItemGird");
class HandBookRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleScrollView = void 0),
      (this.lqe = void 0),
      (this.xVi = void 0),
      (this.adi = void 0),
      (this.nVi = void 0),
      (this.m0o = []),
      (this.C0o = (e) => {
        (this.m0o = e), this.g0o(e);
      }),
      (this.cHe = () => {
        var e = new HandBookRoleMediumItemGird_1.HandBookRoleMediumItemGird();
        return (
          e.BindOnExtendToggleStateChanged(this.j5e),
          e.BindOnCanExecuteChange(this.Vbt),
          e
        );
      }),
      (this.j5e = (e) => {
        var i = e.State,
          e = e.Data;
        1 === i &&
          (this.RoleScrollView.DeselectCurrentGridProxy(), this.f0o(e));
      }),
      (this.Vbt = (e, i, t) => {
        return !(
          (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
            void 0 !== this.nVi &&
            0 === t) ||
          (1 === t && this.nVi === e.GetDataId())
        );
      }),
      (this.$lo = () => {
        var e = [
          ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(this.nVi)
            ?.TrialRole,
        ];
        ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(
          1,
          0,
          e,
          void 0,
          () => {},
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.$lo]]);
  }
  OnBeforeCreate() {
    this.xVi = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
  }
  OnStart() {
    (this.RoleScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      this.GetItem(3).GetOwner(),
      this.cHe,
    )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetTitleLocalText("HandBookRoleTitle"),
      (this.adi = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(4),
        this.C0o,
      ));
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList().filter(
      (e) =>
        1 === e.RoleType &&
        !ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id),
    )) {
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id);
      e.push(i || new RoleRobotData_1.RoleRobotData(t.TrialRole));
    }
    e.push(
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance(),
    ),
      this.adi.UpdateData(21, e),
      this.InitRole();
  }
  OnHandleLoadScene() {
    this.InitRole();
  }
  InitRole() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
      .Model?.CheckGetComponent(1)
      ?.SetTransformByTag("RoleCase");
  }
  g0o(t) {
    this.RoleScrollView.DeselectCurrentGridProxy(),
      this.RoleScrollView.RefreshByData(t, !1, () => {
        let e = 0;
        for (const i of t) {
          if (i.GetDataId() === this.nVi)
            return (
              this.RoleScrollView.ScrollToGridIndex(e),
              void this.RoleScrollView.SelectGridProxy(e)
            );
          e++;
        }
        this.f0o(this.m0o[0], !0);
      });
  }
  f0o(e, i = !1) {
    var t = this.m0o.indexOf(e);
    0 <= t &&
      (i && this.RoleScrollView.ScrollToGridIndex(t),
      this.RoleScrollView.SelectGridProxy(t),
      this.p0o(e));
  }
  p0o(e) {
    var i,
      t,
      o = e.GetDataId(),
      r = this.nVi ?? 0;
    this.nVi !== o &&
      ((this.nVi = o),
      this.gOt(e.GetName()),
      (i = this.GetText(6)),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "HandBookRoleGetDate",
      )),
      o < RoleDefine_1.ROBOT_DATA_MIN_ID
        ? (i.SetUIActive(!0),
          i.SetText(
            t +
              TimeUtil_1.TimeUtil.DateFormat4(
                new Date(
                  e.GetRoleCreateTime() *
                    TimeUtil_1.TimeUtil.InverseMillisecond,
                ),
              ),
          ))
        : i.SetUIActive(!1),
      ControllerHolder_1.ControllerHolder.RoleController.OnSelectedRoleChange(
        this.nVi,
      ),
      ControllerHolder_1.ControllerHolder.RoleController.PlayRoleMontage(
        3,
        !1,
        0 < r,
      ));
  }
  gOt(e) {
    this.GetText(1).SetText(e);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi),
      (this.RoleScrollView = void 0);
  }
}
exports.HandBookRoleView = HandBookRoleView;
//# sourceMappingURL=HandBookRoleView.js.map
