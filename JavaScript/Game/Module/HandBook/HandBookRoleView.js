"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookRoleView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const HandBookRoleMediumItemGird_1 = require("./HandBookRoleMediumItemGird");
class HandBookRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleScrollView = void 0),
      (this.lqe = void 0),
      (this.w5i = void 0),
      (this.ami = void 0),
      (this.s5i = void 0),
      (this.ggo = []),
      (this.pgo = (e) => {
        (this.ggo = e), this.vgo(e);
      }),
      (this.z9e = () => {
        const e = new HandBookRoleMediumItemGird_1.HandBookRoleMediumItemGird();
        return (
          e.BindOnExtendToggleStateChanged(this.U4e),
          e.BindOnCanExecuteChange(this.OBt),
          e
        );
      }),
      (this.U4e = (e) => {
        const i = e.State;
        var e = e.Data;
        i === 1 &&
          (this.RoleScrollView.DeselectCurrentGridProxy(), this.Mgo(e));
      }),
      (this.OBt = (e, i, t) => {
        return !(
          (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
            void 0 !== this.s5i &&
            t === 0) ||
          (t === 1 && this.s5i === e.GetDataId())
        );
      }),
      (this.Zho = () => {
        const e = [
          ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(this.s5i)
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
      (this.BtnBindInfo = [[5, this.Zho]]);
  }
  OnBeforeCreate() {
    this.w5i = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
  }
  OnStart() {
    (this.RoleScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      this.GetItem(3).GetOwner(),
      this.z9e,
    )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetTitleLocalText("HandBookRoleTitle"),
      (this.ami = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(4),
        this.pgo,
      ));
    const e = [];
    for (const t of ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList().filter(
      (e) =>
        e.RoleType === 1 &&
        !ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id),
    )) {
      const i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id);
      e.push(i || new RoleRobotData_1.RoleRobotData(t.TrialRole));
    }
    e.push(
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance(),
    ),
      this.ami.UpdateData(21, e),
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
  vgo(t) {
    this.RoleScrollView.DeselectCurrentGridProxy(),
      this.RoleScrollView.RefreshByData(t, !1, () => {
        let e = 0;
        for (const i of t) {
          if (i.GetDataId() === this.s5i)
            return (
              this.RoleScrollView.ScrollToGridIndex(e),
              void this.RoleScrollView.SelectGridProxy(e)
            );
          e++;
        }
        this.Mgo(this.ggo[0], !0);
      });
  }
  Mgo(e, i = !1) {
    const t = this.ggo.indexOf(e);
    t >= 0 &&
      (i && this.RoleScrollView.ScrollToGridIndex(t),
      this.RoleScrollView.SelectGridProxy(t),
      this.Sgo(e));
  }
  Sgo(e) {
    let i;
    let t;
    const o = e.GetDataId();
    const r = this.s5i ?? 0;
    this.s5i !== o &&
      ((this.s5i = o),
      this.CNt(e.GetName()),
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
        this.s5i,
      ),
      ControllerHolder_1.ControllerHolder.RoleController.PlayRoleMontage(
        3,
        !1,
        r > 0,
      ));
  }
  CNt(e) {
    this.GetText(1).SetText(e);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.w5i),
      (this.RoleScrollView = void 0);
  }
}
exports.HandBookRoleView = HandBookRoleView;
// # sourceMappingURL=HandBookRoleView.js.map
