"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTagDetailView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoleTagDetailItem_1 = require("./RoleTagDetailItem");
class RoleTagDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Klo = void 0),
      (this.bdo = void 0),
      (this.qdo = () => new RoleTagDetailItem_1.RoleTagDetailItem()),
      (this.Obt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.OpenParam;
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 59, "RoleTagDetailView无效tagList")
      : ((this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
        this.lqe.SetCloseCallBack(this.Obt),
        (this.Klo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.qdo,
          this.GetItem(3).GetOwner(),
        )),
        (this.bdo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(2),
          this.qdo,
          this.GetItem(3).GetOwner(),
        )),
        this.Klo.RefreshByData(e),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetAllRoleTagList()),
        this.bdo.RefreshByData(e));
  }
}
exports.RoleTagDetailView = RoleTagDetailView;
//# sourceMappingURL=RoleTagDetailView.js.map
