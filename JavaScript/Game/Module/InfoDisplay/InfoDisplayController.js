"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayController = exports.INFO_DISPLAY_ITEM_TYPE = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
exports.INFO_DISPLAY_ITEM_TYPE = 12;
class InfoDisplayController extends ControllerBase_1.ControllerBase {
  static OpenInfoDisplay(e, o, r, n = !1) {
    if (
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeOneView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeTwoView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeThreeView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeFourNewView")
    )
      return !1;
    var i = CommonParamById_1.configCommonParamById.GetIntConfig(
      "infodisplay_use_item_cd",
    );
    if (
      0 !== InfoDisplayController.njt &&
      Time_1.Time.Now - InfoDisplayController.njt <= 1e3 * i
    )
      return (
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "InDisplayCd",
        ),
        !1
      );
    let a = void 0;
    ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationId(e);
    i =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayType(
        e,
      );
    return (
      1 === i
        ? (a = "InfoDisplayTypeOneView")
        : 2 === i
          ? (a = "InfoDisplayTypeTwoView")
          : 3 === i
            ? (a = "InfoDisplayTypeThreeView")
            : 4 === i && (a = "InfoDisplayTypeFourNewView"),
      n
        ? UiManager_1.UiManager.OpenViewByPlot(a, r, o)
        : UiManager_1.UiManager.OpenView(a, void 0, o),
      (InfoDisplayController.njt = Time_1.Time.Now),
      !0
    );
  }
  static OpenInfoDisplayImgView() {
    UiManager_1.UiManager.OpenView("InfoDisplayImgView");
  }
  static OnInit() {
    return this.OnAddEvents(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemUse,
      this.OnItemUse,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemUse,
      this.OnItemUse,
    );
  }
  static RequestReadDisplayInfo(e) {
    var o = new Protocol_1.Aki.Protocol.bos();
    (o.T9n = e),
      Net_1.Net.Call(24906, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InfoDisplay", 27, "协议接收", ["协议id", "10162"]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              19452,
            );
      });
  }
}
((exports.InfoDisplayController = InfoDisplayController).njt = 0),
  (InfoDisplayController.OnItemUse = (e, o) => {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    0 < e.Parameters.size &&
      void 0 !== (e = e.Parameters.get(exports.INFO_DISPLAY_ITEM_TYPE)) &&
      0 !== e &&
      InfoDisplayController.OpenInfoDisplay(e);
  });
//# sourceMappingURL=InfoDisplayController.js.map
