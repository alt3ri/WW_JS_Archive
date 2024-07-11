"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionItem = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FunctionController_1 = require("../FunctionController");
class FunctionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.FunctionId = 0),
      (this.QFe = void 0),
      (this.j7e = () => {
        this.FunctionId &&
          FunctionController_1.FunctionController.OpenFunctionRelateView(
            this.FunctionId,
          );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  GetButtonItem() {
    return this.GetButton(2).RootUIComp;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UISpriteTransition],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.j7e]]);
  }
  UpdateItem(e) {
    this.FunctionId = e;
    const t = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionConfig(e);
    var e =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.FunctionName),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(e));
    this.GetItem(0).SetUIActive(!e);
    const i = this.GetUiSpriteTransition(3);
    ResourceSystem_1.ResourceSystem.LoadAsync(
      t.FunctionIcon,
      UE.LGUISpriteData_BaseObject,
      (e, t) => {
        e.IsValid() && i.IsValid() && i.SetAllTransitionSprite(e);
      },
      102,
    ),
      this.x6e();
  }
  x6e() {
    let e;
    this.FunctionId &&
      ((this.QFe =
        ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(
          this.FunctionId,
        )),
      (e = this.GetItem(4)),
      this.QFe
        ? RedDotController_1.RedDotController.BindRedDot(this.QFe, e)
        : e.SetUIActive(!1));
  }
  Dpt() {
    let e;
    this.QFe &&
      ((e = this.GetItem(4)),
      RedDotController_1.RedDotController.UnBindGivenUi(this.QFe, e),
      (this.QFe = void 0));
  }
  OnBeforeDestroy() {
    this.Dpt();
    const e = this.GetButton(2);
    e.OnPointEnterCallBack.Unbind(), e.OnPointExitCallBack.Unbind();
  }
}
exports.FunctionItem = FunctionItem;
// # sourceMappingURL=FunctionItem.js.map
