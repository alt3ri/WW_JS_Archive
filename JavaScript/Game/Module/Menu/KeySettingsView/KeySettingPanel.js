"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GuideController_1 = require("../../Guide/GuideController"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  KeySettingRowBaseItem_1 = require("./KeySettingRowBaseItem"),
  KeySettingRowContainerItem_1 = require("./KeySettingRowContainerItem"),
  ScrollToOffset = 3;
class KeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.MPi = void 0),
      (this.EPi = void 0),
      (this.SPi = void 0),
      (this.tui = void 0),
      (this.iui = void 0),
      (this.yPi = void 0),
      (this.IPi = void 0),
      (this.TPi = []),
      (this.jCa = 0),
      (this.LSi = (i, t, e) => {
        var s = new KeySettingRowContainerItem_1.KeySettingRowContainerItem();
        return (
          s.BindOnToggleStateChanged(this.sui),
          s.BindOnHover(this._ui),
          s.BindOnUnHover(this.uui),
          s.BindOnWaitInput(this.LPi),
          s
        );
      }),
      (this.sui = (i, t) => {
        0 === t
          ? (i.SetDetailItemVisible(!1), (this.yPi = void 0))
          : (this.yPi?.SetDetailItemVisible(!1),
            (this.yPi = i),
            this.yPi.SetDetailItemVisible(!0));
      }),
      (this._ui = (i) => {
        this.tui && this.tui(i);
      }),
      (this.uui = (i) => {
        this.iui && this.iui(i);
      }),
      (this.LPi = (i, t, e) => {
        this.SPi && this.SPi(i, t, e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.EPi = new KeySettingRowBaseItem_1.KeySettingRowBaseItem()),
      (this.MPi = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        this.EPi,
        this.LSi,
      )),
      await this.MPi.Init();
  }
  OnBeforeDestroy() {
    (this.EPi = void 0),
      (this.MPi = void 0),
      (this.yPi = void 0),
      (this.IPi = void 0),
      (this.SPi = void 0),
      (this.jCa = 0);
  }
  SelectKeySettingRow(i) {
    this.IPi?.SetSelected(!1), (this.IPi = i), this.IPi?.SetSelected(!0);
  }
  BindOnWaitInput(i) {
    this.SPi = i;
  }
  BindOnHover(i) {
    this.tui = i;
  }
  BindOnUnHover(i) {
    this.iui = i;
  }
  Refresh(i, t) {
    for (const e of i) e.IsExpandDetail = !1;
    (ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType = t),
      this.MPi?.RefreshByData(i),
      (this.TPi = i),
      (this.yPi = void 0);
  }
  RefreshRow(i) {
    var t = this.TPi.indexOf(i);
    this.MPi?.GetScrollItemFromIndex(t)?.Update(i, t);
  }
  GetRowByData(i, t) {
    var i = this.TPi.indexOf(i),
      e = this.MPi;
    if (e)
      return (
        t &&
          0 === this.jCa &&
          ((this.jCa = 1),
          e.ScrollToItemIndex(i - ScrollToOffset).finally(() => {
            this.jCa = 2;
          })),
        1 === this.jCa
          ? void 0
          : ((this.jCa = 0),
            e.AddListenerOnItemClear(i, () => {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Guide", 65, "停止当前所有引导"),
                GuideController_1.GuideController.TryFinishRunningGuides();
            }),
            e.GetScrollItemFromIndex(i))
      );
  }
  StopScroll() {
    this.GetUIDynScrollViewComponent(0).StopMovement();
  }
}
exports.KeySettingPanel = KeySettingPanel;
//# sourceMappingURL=KeySettingPanel.js.map
