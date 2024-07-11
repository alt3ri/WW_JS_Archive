"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayController = exports.INFO_DISPLAY_ITEM_TYPE = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
exports.INFO_DISPLAY_ITEM_TYPE = 12;
class InfoDisplayController extends ControllerBase_1.ControllerBase {
  static OpenInfoDisplay(e, o) {
    if (
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeOneView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeTwoView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeThreeView") ||
      UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeFourView")
    )
      return !1;
    let r = CommonParamById_1.configCommonParamById.GetIntConfig(
      "infodisplay_use_item_cd",
    );
    if (
      InfoDisplayController.nHt !== 0 &&
      Time_1.Time.Now - InfoDisplayController.nHt <= 1e3 * r
    )
      return (
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "InDisplayCd",
        ),
        !1
      );
    ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationId(e);
    r =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayType(
        e,
      );
    return (
      r === 1
        ? UiManager_1.UiManager.OpenView("InfoDisplayTypeOneView", void 0, o)
        : r === 2
          ? UiManager_1.UiManager.OpenView("InfoDisplayTypeTwoView", void 0, o)
          : r === 3
            ? UiManager_1.UiManager.OpenView(
                "InfoDisplayTypeThreeView",
                void 0,
                o,
              )
            : r === 4 &&
              UiManager_1.UiManager.OpenView(
                "InfoDisplayTypeFourView",
                void 0,
                o,
              ),
      (InfoDisplayController.nHt = Time_1.Time.Now),
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
    const o = new Protocol_1.Aki.Protocol.Ues();
    (o.q5n = e),
      Net_1.Net.Call(14219, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InfoDisplay", 28, "协议接收", ["协议id", "10162"]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              15878,
            );
      });
  }
}
((exports.InfoDisplayController = InfoDisplayController).nHt = 0),
  (InfoDisplayController.OnItemUse = (e, o) => {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    e.Parameters.size > 0 &&
      void 0 !== (e = e.Parameters.get(exports.INFO_DISPLAY_ITEM_TYPE)) &&
      e !== 0 &&
      InfoDisplayController.OpenInfoDisplay(e);
  });
// # sourceMappingURL=InfoDisplayController.js.map
