"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSelectionView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RoleController_1 = require("../RoleController");
const RoleSelectionMediumItemGrid_1 = require("./RoleSelectionMediumItemGrid");
class RoleSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ami = void 0),
      (this.jho = void 0),
      (this.plo = void 0),
      (this.ggo = []),
      (this.fgo = void 0),
      (this.s5i = void 0),
      (this.BackFunction = () => {
        this.fgo !== this.s5i &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoleSystemChangeRole,
            this.fgo,
          ),
          this.CloseMe();
      }),
      (this.z9e = () => {
        const e =
          new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid();
        return (
          e.BindOnExtendToggleStateChanged(this.U4e),
          e.BindOnCanExecuteChange(this.OBt),
          e
        );
      }),
      (this.pgo = (e) => {
        (this.ggo = e), this.vgo(e);
      }),
      (this.U4e = (e) => {
        const i = e.State;
        var e = e.Data;
        i === 1 && (this.jho.DeselectCurrentGridProxy(), this.Mgo(e));
      }),
      (this.OBt = (e, i, t) => {
        return !(
          (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
            void 0 !== this.s5i &&
            t === 0) ||
          (t === 1 && this.s5i === e.GetRoleId())
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
    (this.jho = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      this.GetItem(4).GetOwner(),
      this.z9e,
    )),
      (this.ami = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(5),
        this.pgo,
      )),
      (this.plo = this.OpenParam);
    const e = [];
    for (const i of this.plo.GetRoleIdList())
      e.push(ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i));
    this.ami.UpdateData(1, e);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleSelectionListUpdate,
      ),
      this.ami.Destroy(),
      (this.ami = void 0),
      this.jho.ClearGridProxies(),
      (this.jho = void 0),
      (this.ggo = []);
  }
  OnBeforeShow() {
    const e = this.plo.GetCurSelectRoleData();
    this.Mgo(e, !0);
  }
  vgo(i) {
    if (
      (this.jho.DeselectCurrentGridProxy(),
      this.jho.ReloadData(i),
      void 0 !== this.s5i)
    ) {
      let e = 0;
      for (const t of i) {
        if (t.GetRoleId() === this.s5i)
          return (
            this.jho.ScrollToGridIndex(e), void this.jho.SelectGridProxy(e)
          );
        e++;
      }
      this.Mgo(this.ggo[0], !0);
    }
  }
  CNt(e) {
    this.GetText(2).SetText(e);
  }
  Sgo(e) {
    const i = e.GetDataId();
    const t = this.s5i ?? 0;
    this.s5i !== i &&
      ((this.s5i = i),
      this.CNt(e.GetName()),
      this.plo.SetCurSelectRoleId(this.s5i),
      RoleController_1.RoleController.OnSelectedRoleChange(this.s5i),
      RoleController_1.RoleController.PlayRoleMontage(3, !1, t > 0));
  }
  Mgo(e, i = !1) {
    const t = this.ggo.indexOf(e);
    t >= 0 &&
      (i && this.jho.ScrollToGridIndex(t),
      this.jho.SelectGridProxy(t),
      this.Sgo(e));
  }
}
exports.RoleSelectionView = RoleSelectionView;
// # sourceMappingURL=RoleSelectionView.js.map
