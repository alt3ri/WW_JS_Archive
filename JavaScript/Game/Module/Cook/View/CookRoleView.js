"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookRoleView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  CookRoleItem_1 = require("./CookRoleItem");
class CookRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hNt = void 0),
      (this.lNt = void 0),
      (this.ETt = 0),
      (this._Nt = 0),
      (this.cHe = () => {
        var e = new CookRoleItem_1.CookRoleItem();
        return e.BindOnClickedCallback(this.Tke), e;
      }),
      (this.uNt = () => {
        (this.lNt =
          ModelManager_1.ModelManager.CookModel.GetCookRoleItemDataList(
            this.ETt,
          )),
          this.hNt.ReloadData(this.lNt),
          this.cNt();
      }),
      (this.Tke = (e) => {
        this._Nt = e;
        let t = 0;
        for (
          this.hNt.DeselectCurrentGridProxy();
          t < this.lNt.length && e !== this.lNt[t].RoleId;
          t++
        );
        this.hNt.SelectGridProxy(t), this.hNt.RefreshGridProxy(t);
      }),
      (this.Mke = () => {
        (ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = this._Nt),
          this.CloseMe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CloseCookRole,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.Mke]]);
  }
  OnBeforeDestroy() {
    this.hNt && (this.hNt.ClearGridProxies(), (this.hNt = void 0));
  }
  OnStart() {
    (this.hNt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.cHe,
    )),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(3),
        "CookSelectRoleButtonText",
      );
    var e = this.OpenParam;
    this.ShowView(e);
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem?.SetTexBgVisible(!1);
  }
  HideView(e) {
    this.SetActive(!e);
  }
  ShowView(e) {
    this.SetActive(!0),
      (ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 2),
      (this.ETt = e),
      (this._Nt = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId),
      this.uNt();
  }
  cNt() {
    let e = 0;
    for (
      this.hNt.DeselectCurrentGridProxy();
      e < this.lNt.length && this._Nt !== this.lNt[e].RoleId;
      e++
    );
    this.hNt.ScrollToGridIndex(e), this.hNt.SelectGridProxy(e);
  }
}
exports.CookRoleView = CookRoleView;
//# sourceMappingURL=CookRoleView.js.map
