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
  static OpenInfoDisplay(e, r, o) {
    if (
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeOneView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeTwoView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeThreeView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeFourView")
    )
      return !1;
    var n = CommonParamById_1.configCommonParamById.GetIntConfig(
      "infodisplay_use_item_cd",
    );
    if (
      0 !== InfoDisplayController.njt &&
      Time_1.Time.Now - InfoDisplayController.njt <= 1e3 * n
    )
      return (
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "InDisplayCd",
        ),
        !1
      );
    ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationId(e);
    n =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayType(
        e,
      );
    return (
      1 === n
        ? UiManager_1.UiManager.OpenView("InfoDisplayTypeOneView", o, r)
        : 2 === n
          ? UiManager_1.UiManager.OpenView("InfoDisplayTypeTwoView", o, r)
          : 3 === n
            ? UiManager_1.UiManager.OpenView("InfoDisplayTypeThreeView", o, r)
            : 4 === n &&
              UiManager_1.UiManager.OpenView("InfoDisplayTypeFourView", o, r),
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
    var r = new Protocol_1.Aki.Protocol.Los();
    (r.g9n = e),
      Net_1.Net.Call(28765, r, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InfoDisplay", 28, "协议接收", ["协议id", "10162"]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              24908,
            );
      });
  }
}
((exports.InfoDisplayController = InfoDisplayController).njt = 0),
  (InfoDisplayController.OnItemUse = (e, r) => {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    0 < e.Parameters.size &&
      void 0 !== (e = e.Parameters.get(exports.INFO_DISPLAY_ITEM_TYPE)) &&
      0 !== e &&
      InfoDisplayController.OpenInfoDisplay(e);
  });
//# sourceMappingURL=InfoDisplayController.js.map
