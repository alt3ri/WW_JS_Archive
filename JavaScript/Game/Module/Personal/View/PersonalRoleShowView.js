"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleShowView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalRoleMediumItemGrid_1 = require("./PersonalRoleMediumItemGrid");
class PersonalRoleShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.Wke = void 0),
      (this.nVi = 0),
      (this.DVi = 0),
      (this.RVi = 0),
      (this.UVi = void 0),
      (this.sOt = () => {
        var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList(),
          t = i.length,
          s = [];
        if (0 === this.RVi) {
          for (let e = 0; e < t; e++) {
            var r = i[e];
            s.push(r.Q6n);
          }
          s.push(this.nVi);
        } else if (2 === this.RVi)
          for (let e = 0; e < t; e++) {
            var h = i[e];
            h.Q6n !== this.nVi && s.push(h.Q6n);
          }
        else if (1 === this.RVi)
          for (let e = 0; e < t; e++) {
            var o = i[e];
            o.Q6n === this.nVi
              ? s.push(this.DVi)
              : o.Q6n === this.DVi
                ? s.push(this.nVi)
                : s.push(o.Q6n);
          }
        PersonalController_1.PersonalController.SendRoleShowListUpdateRequest(
          s,
        ),
          this.CloseMe();
      }),
      (this.nFe = (e, i, t) => {
        var s = new PersonalRoleMediumItemGrid_1.PersonalRoleMediumItemGrid();
        return (
          s.Initialize(i.GetOwner()),
          s.Refresh(e, !1, t),
          s.BindOnExtendToggleStateChanged(this.sVi),
          { Key: t, Value: s }
        );
      }),
      (this.sVi = (e) => {
        this.UVi?.SetSelected(!1),
          (this.UVi = e.MediumItemGrid),
          this.UVi?.SetSelected(!0);
        e = e.Data;
        this.Refresh(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.sOt]]);
  }
  OnStart() {
    (this.DVi = this.OpenParam),
      (this.xqe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(0),
        this.nFe,
      ));
  }
  Refresh(e) {
    this.nVi = e;
    var e = this.DVi === this.nVi,
      i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList(),
      t =
        (this.GetButton(1).RootUIComp.SetUIActive(!0),
        this.IsRoleInShow(this.nVi));
    1 === i.length && t
      ? this.GetButton(1).RootUIComp.SetUIActive(!1)
      : void 0 === this.DVi
        ? t
          ? this.odi(2)
          : this.odi(0)
        : e
          ? this.odi(2)
          : this.odi(1);
  }
  odi(e) {
    this.RVi = e;
    var i = this.GetText(2);
    switch (e) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(i, "JoinText");
        break;
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(i, "GoDownText");
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalText(i, "ChangeText");
    }
  }
  IsRoleInShow(e) {
    var i = ModelManager_1.ModelManager.PersonalModel.GetRoleShowList(),
      t = i.length;
    let s = !1;
    for (let e = 0; e < t; e++)
      if (i[e].Q6n === this.nVi) {
        s = !0;
        break;
      }
    return s;
  }
  OnAfterShow() {
    (this.Wke = ModelManager_1.ModelManager.RoleModel.GetRoleIdList()),
      0 < this.Wke.length &&
        (this.xqe.RefreshByData(this.Wke),
        (this.nVi = this.Wke[0]),
        (this.UVi = this.xqe.GetScrollItemList()[0]),
        this.UVi.SetSelected(!0),
        this.Refresh(this.nVi));
  }
  OnBeforeDestroy() {
    this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0));
  }
}
exports.PersonalRoleShowView = PersonalRoleShowView;
//# sourceMappingURL=PersonalRoleShowView.js.map
