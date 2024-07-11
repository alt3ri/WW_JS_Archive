"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceExpressionItem = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class AdviceExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.U9e = 0),
      (this.oHe = () => {
        this.rHe(), this.nHe();
      }),
      (this.sHe = () => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId =
          this.U9e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceExpression,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.sHe]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceExpression,
      this.oHe,
    );
  }
  Refresh(e, t, s) {
    this.U9e = e.Id;
    var r = e.ExpressionTexturePath,
      r =
        (ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.Texture, (e, t) => {
          this.GetRootActor()?.IsValid() && this.GetTexture(2).SetTexture(e);
        }),
        e.Name);
    this.GetText(1).ShowTextNew(r), this.rHe(), this.nHe();
  }
  nHe() {
    var e = this.GetExtendToggle(0).ToggleState,
      t =
        ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId ===
        this.U9e
          ? 1
          : 0;
    e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
  rHe() {
    var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
    this.GetItem(3).SetUIActive(e === this.U9e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceExpression,
      this.oHe,
    );
  }
}
exports.AdviceExpressionItem = AdviceExpressionItem;
//# sourceMappingURL=AdviceExpressionItem.js.map
