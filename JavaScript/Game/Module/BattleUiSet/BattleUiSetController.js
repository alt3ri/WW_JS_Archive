"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSetController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class BattleUiSetController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(27045, BattleUiSetController.lgt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27045);
  }
  static MobileButtonSettingUpdateRequest(e) {
    var t = new Protocol_1.Aki.Protocol.Bms();
    (t.v8n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BattleUiSet",
          17,
          "MobileButtonSettingUpdateRequest 客户端请求移动端键位设置",
          ["request", t],
        ),
      Net_1.Net.Call(17422, Protocol_1.Aki.Protocol.Bms.create(t), this._gt);
  }
}
((exports.BattleUiSetController = BattleUiSetController).lgt = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info("BattleUiSet", 17, "SettingNotify 通知移动端按键设置", [
      "notify",
      e,
    ]);
  e = e.v8n;
  if (e) {
    var t = ModelManager_1.ModelManager.BattleUiSetModel;
    for (const r of e) {
      var o = r.s5n,
        o = t.GetPanelItemDataByConfigId(o);
      if (!o) return;
      (o.Size = r.M8n),
        (o.EditSize = r.M8n),
        (o.Alpha = r.S8n),
        (o.EditAlpha = r.S8n),
        (o.OffsetX = r.E8n),
        (o.EditOffsetX = r.E8n),
        (o.OffsetY = r.y8n),
        (o.EditOffsetY = r.y8n),
        (o.HierarchyIndex = r.I8n),
        (o.EditorHierarchyIndex = r.I8n);
    }
  }
}),
  (BattleUiSetController._gt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "BattleUiSet",
        17,
        "MobileButtonSettingUpdateResponse 服务端返回移动端键位设置",
        ["response", e],
      ),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            28200,
          )
        : ModelManager_1.ModelManager.BattleUiModel?.PureModeData?.IsOpen
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "SaveButtonPureMode",
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "SaveButton",
            );
  });
//# sourceMappingURL=BattleUiSetController.js.map
