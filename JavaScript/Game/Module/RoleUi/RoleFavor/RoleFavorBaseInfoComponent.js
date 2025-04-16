"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorBaseInfoComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorBaseInfoComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, r) {
    super(),
      (this.dFe = 0),
      (this.dFe = r),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UINiagara],
    ];
  }
  OnStart() {
    var e, r;
    this.dFe &&
      ((r = this.GetText(0)),
      (e = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
        this.dFe,
      )),
      LguiUtil_1.LguiUtil.SetLocalText(r, "FavorBaseInfo"),
      this.GetText(2).SetUIActive(!1),
      this.GetText(3).ShowTextNew(e.Sex),
      this.GetText(4).ShowTextNew(e.Country),
      this.GetText(5).ShowTextNew(e.Influence),
      this.GetText(6).ShowTextNew(e.Info),
      (r = this.GetText(6)),
      ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(
        r,
      ) ||
        ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(
          r,
          1,
          1,
        ));
  }
  OnBeforeDestroy() {
    this.dFe = void 0;
    var e = this.GetText(6);
    ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(
      e,
    ) &&
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(
        e,
      );
  }
}
exports.RoleFavorBaseInfoComponent = RoleFavorBaseInfoComponent;
//# sourceMappingURL=RoleFavorBaseInfoComponent.js.map
