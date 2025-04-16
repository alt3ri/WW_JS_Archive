"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  MenuDefine_1 = require("../MenuDefine"),
  KeySettingRowBaseItem_1 = require("./KeySettingRowBaseItem"),
  KeySettingRowContainerItem_1 = require("./KeySettingRowContainerItem"),
  SCROLL_TO_OFFSET = 3;
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
      (this.qfa = 0),
      (this.LSi = (e, t, i) => {
        var s = new KeySettingRowContainerItem_1.KeySettingRowContainerItem();
        return (
          s.BindOnToggleStateChanged(this.sui),
          s.BindOnHover(this._ui),
          s.BindOnUnHover(this.uui),
          s.BindOnWaitInput(this.LPi),
          s
        );
      }),
      (this.sui = (e, t) => {
        0 === t
          ? (e.SetDetailItemVisible(!1), (this.yPi = void 0))
          : (this.yPi?.SetDetailItemVisible(!1),
            (this.yPi = e),
            this.yPi.SetDetailItemVisible(!0));
      }),
      (this._ui = (e) => {
        this.tui && this.tui(e);
      }),
      (this.uui = (e) => {
        this.iui && this.iui(e);
      }),
      (this.LPi = (e, t, i) => {
        this.SPi && this.SPi(e, t, i);
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
      (this.qfa = 0);
  }
  SelectKeySettingRow(e) {
    this.IPi?.SetSelected(!1), (this.IPi = e), this.IPi?.SetSelected(!0);
  }
  BindOnWaitInput(e) {
    this.SPi = e;
  }
  BindOnHover(e) {
    this.tui = e;
  }
  BindOnUnHover(e) {
    this.iui = e;
  }
  Refresh(e, t) {
    for (const i of e) i.IsExpandDetail = !1;
    (ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType = t),
      this.MPi?.RefreshByData(e),
      (this.TPi = e),
      (this.yPi = void 0);
  }
  RefreshRow(e) {
    var t = this.TPi.indexOf(e);
    this.MPi?.GetScrollItemFromIndex(t)?.Update(e, t);
  }
  GetRowByData(e, t) {
    var e = this.TPi.indexOf(e),
      i = this.MPi;
    if (i)
      return (
        t &&
          0 === this.qfa &&
          ((this.qfa = 1),
          i.ScrollToItemIndex(e - SCROLL_TO_OFFSET).finally(() => {
            this.qfa = 2;
          })),
        1 === this.qfa
          ? void 0
          : ((this.qfa = 0),
            i.AddListenerOnItemClear(e, () => {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Guide",
                  64,
                  "当item拖出view之后，停止引导@[KeySettingPanel]",
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.FinishGuideStepByEvent,
                  MenuDefine_1.STOP_GUIDE_TAG,
                );
            }),
            i.GetScrollItemFromIndex(e))
      );
  }
  StopScroll() {
    this.GetUIDynScrollViewComponent(0).StopMovement();
  }
}
exports.KeySettingPanel = KeySettingPanel;
//# sourceMappingURL=KeySettingPanel.js.map
