"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSelectionView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RoleController_1 = require("../RoleController"),
  RoleSelectionMediumItemGrid_1 = require("./RoleSelectionMediumItemGrid");
class RoleSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.adi = void 0),
      (this.Flo = void 0),
      (this.d1o = void 0),
      (this.m0o = []),
      (this.d0o = void 0),
      (this.nVi = void 0),
      (this.BackFunction = () => {
        this.d0o !== this.nVi &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoleSystemChangeRole,
            this.d0o,
          ),
          this.CloseMe();
      }),
      (this.cHe = () => {
        var e = new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid(),
          i = this.d1o.GetRoleSystemUiParams();
        return (
          e.SetNeedShowTrial(i.RoleListNeedTrial),
          e.BindOnExtendToggleStateChanged(this.j5e),
          e.BindOnCanExecuteChange(this.Vbt),
          e
        );
      }),
      (this.C0o = (e, i, t) => {
        (this.m0o = e), this.g0o(e, i, t);
      }),
      (this.j5e = (e) => {
        var i = e.State,
          e = e.Data;
        1 === i && (this.Flo.DeselectCurrentGridProxy(), this.f0o(e));
      }),
      (this.Vbt = (e, i, t) => {
        return !(
          (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
            void 0 !== this.nVi &&
            0 === t) ||
          (1 === t && this.nVi === e.GetRoleId())
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.BackFunction]]);
  }
  OnStart() {
    (this.Flo = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      this.GetItem(4).GetOwner(),
      this.cHe,
    )),
      (this.adi = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(5),
        this.C0o,
      )),
      (this.d1o = this.OpenParam);
    var e = [];
    for (const i of this.d1o.GetRoleIdList())
      e.push(ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i));
    this.adi.UpdateData(1, e);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleSelectionListUpdate,
      ),
      this.adi.Destroy(),
      (this.adi = void 0),
      this.Flo.ClearGridProxies(),
      (this.Flo = void 0),
      (this.m0o = []);
  }
  OnBeforeShow() {
    var e = this.d1o.GetCurSelectRoleData();
    this.f0o(e, !0);
  }
  g0o(i, e, t) {
    if (
      (this.Flo.DeselectCurrentGridProxy(),
      this.Flo.ReloadData(i),
      void 0 !== this.nVi && !(i.length <= 0))
    ) {
      let e = 0;
      0 === t &&
        (e = (e = i.findIndex((e) => e.GetDataId() === this.nVi)) <= 0 ? 0 : e),
        this.Flo.ScrollToGridIndex(e),
        this.Flo.SelectGridProxy(e),
        this.f0o(i[e], !0);
    }
  }
  gOt(e) {
    this.GetText(2).SetText(e);
  }
  p0o(e) {
    var i = e.GetDataId(),
      t = this.nVi ?? 0;
    this.nVi !== i &&
      ((this.nVi = i),
      this.gOt(e.GetName()),
      this.d1o.SetCurSelectRoleId(this.nVi),
      RoleController_1.RoleController.OnSelectedRoleChange(this.nVi),
      RoleController_1.RoleController.PlayRoleMontage(3, !1, 0 < t));
  }
  f0o(e, i = !1) {
    var t = this.m0o.indexOf(e);
    0 <= t &&
      (i && this.Flo.ScrollToGridIndex(t),
      this.Flo.SelectGridProxy(t),
      this.p0o(e));
  }
}
exports.RoleSelectionView = RoleSelectionView;
//# sourceMappingURL=RoleSelectionView.js.map
