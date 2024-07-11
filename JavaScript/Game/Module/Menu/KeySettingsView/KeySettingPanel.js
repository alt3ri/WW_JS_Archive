"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingPanel = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const KeySettingRowBaseItem_1 = require("./KeySettingRowBaseItem");
const KeySettingRowContainerItem_1 = require("./KeySettingRowContainerItem");
class KeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.MAi = void 0),
      (this.SAi = void 0),
      (this.EAi = void 0),
      (this.t_i = void 0),
      (this.i_i = void 0),
      (this.yAi = void 0),
      (this.IAi = void 0),
      (this.TAi = []),
      (this.LSi = (t, i, e) => {
        const s = new KeySettingRowContainerItem_1.KeySettingRowContainerItem();
        return (
          s.BindOnToggleStateChanged(this.s_i),
          s.BindOnHover(this.__i),
          s.BindOnUnHover(this.u_i),
          s.BindOnWaitInput(this.LAi),
          s
        );
      }),
      (this.s_i = (t, i) => {
        i === 0
          ? (t.SetDetailItemVisible(!1), (this.yAi = void 0))
          : (this.yAi?.SetDetailItemVisible(!1),
            (this.yAi = t),
            this.yAi.SetDetailItemVisible(!0));
      }),
      (this.__i = (t) => {
        this.t_i && this.t_i(t);
      }),
      (this.u_i = (t) => {
        this.i_i && this.i_i(t);
      }),
      (this.LAi = (t, i, e) => {
        this.EAi && this.EAi(t, i, e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.SAi = new KeySettingRowBaseItem_1.KeySettingRowBaseItem()),
      (this.MAi = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        this.SAi,
        this.LSi,
      )),
      await this.MAi.Init();
  }
  OnBeforeDestroy() {
    (this.SAi = void 0),
      (this.MAi = void 0),
      (this.yAi = void 0),
      (this.IAi = void 0),
      (this.EAi = void 0);
  }
  SelectKeySettingRow(t) {
    this.IAi?.SetSelected(!1), (this.IAi = t), this.IAi?.SetSelected(!0);
  }
  BindOnWaitInput(t) {
    this.EAi = t;
  }
  BindOnHover(t) {
    this.t_i = t;
  }
  BindOnUnHover(t) {
    this.i_i = t;
  }
  Refresh(t, i) {
    for (const e of t) e.IsExpandDetail = !1;
    (ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType = i),
      this.MAi?.RefreshByData(t),
      (this.TAi = t),
      (this.yAi = void 0);
  }
  RefreshRow(t) {
    const i = this.TAi.indexOf(t);
    this.MAi?.GetScrollItemFromIndex(i)?.Update(t, i);
  }
  StopScroll() {
    this.GetUIDynScrollViewComponent(0).StopMovement();
  }
}
exports.KeySettingPanel = KeySettingPanel;
// # sourceMappingURL=KeySettingPanel.js.map
