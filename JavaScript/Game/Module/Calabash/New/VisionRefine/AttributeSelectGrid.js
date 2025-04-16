"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeSelectGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class AttributeSelectGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Ydc = void 0),
      (this.OnClickToggleCallBack = void 0),
      (this.kqe = () => {
        this.OnClickToggleCallBack?.(this.Ydc, this.GridIndex);
      }),
      (this.Lke = () => !(!this.Ydc || this.Ydc.IsDisable));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.kqe]]);
  }
  OnStart() {
    this.GetItem(3).SetUIActive(!1),
      this.GetExtendToggle(1).CanExecuteChange.Unbind(),
      this.GetExtendToggle(1).SetToggleState(2),
      this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  Refresh(t, i, s) {
    this.Ydc = t;
    var e =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          t.PropIndexId,
        ),
      r = (this.GetText(0).ShowTextNew(e.Name), this.GetTexture(2)),
      e =
        (this.SetTextureShowUntilLoaded(e.Icon, r),
        r.SetChangeColor(!0, r.changeColor),
        this.GetItem(3).SetUIActive(t.IsRecommend),
        i ? 1 : 0);
    this.GetExtendToggle(1).SetToggleState(e);
  }
  OnSelected(t) {
    this.GetExtendToggle(1).SetToggleState(1, !1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(1).SetToggleState(0, !1);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
}
exports.AttributeSelectGrid = AttributeSelectGrid;
//# sourceMappingURL=AttributeSelectGrid.js.map
