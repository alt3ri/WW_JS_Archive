"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTogetherView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
  ShipTogetherRoleItem_1 = require("./ShipTogetherRoleItem");
class ShipTogetherView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Flo = void 0),
      (this.ebl = void 0),
      (this.I2i = () => {
        var e = new ShipTogetherRoleItem_1.ShipTogetherRoleItem();
        return e.BindOnClickToggleCallBack(this.tbl), e;
      }),
      (this.tbl = (e, t) => {
        this.ebl?.SetToggleState(0),
          (this.ebl = e),
          (ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId =
            t);
      }),
      (this.L3e = () => {
        -1 !==
        ModelManager_1.ModelManager.ShipTogetherModel
          .CurrentSelectTogetherRoleId
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnChangeRideSharingPassenger,
              ModelManager_1.ModelManager.ShipTogetherModel
                .CurrentSelectTogetherRoleId,
              1,
            )
          : EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRemoveRideSharingPassenger,
            ),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.L3e]]);
  }
  OnStart() {
    (this.Flo = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.I2i,
    )),
      (ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId =
        ModelManager_1.ModelManager.ShipTogetherModel.ShipTogetherRoleId);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    const o =
      ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
        ?.GetRoleIdList ?? [];
    var t = [];
    for (const r of e)
      ModelManager_1.ModelManager.RoleModel.IsMainRole(r.GetRoleId()) ||
        t.push(r);
    t.sort((e, t) => {
      var r = o.includes(e.GetRoleId()),
        i = o.includes(t.GetRoleId());
      return r || i
        ? r && i
          ? 0
          : r
            ? 1
            : -1
        : (i = e.GetFavorData().GetFavorLevel()) !==
            (r = t.GetFavorData().GetFavorLevel())
          ? r - i
          : t.GetRoleCreateTime() - e.GetRoleCreateTime();
    }),
      this.Flo?.RefreshByData(t);
  }
}
exports.ShipTogetherView = ShipTogetherView;
//# sourceMappingURL=ShipTogetherView.js.map
