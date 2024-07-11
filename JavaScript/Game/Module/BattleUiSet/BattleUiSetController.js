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
    Net_1.Net.Register(1037, BattleUiSetController.lgt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(1037);
  }
  static MobileButtonSettingUpdateRequest(e) {
    var t = new Protocol_1.Aki.Protocol.Dms();
    (t._8n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BattleUiSet",
          8,
          "MobileButtonSettingUpdateRequest 客户端请求移动端键位设置",
          ["request", t],
        ),
      Net_1.Net.Call(25139, Protocol_1.Aki.Protocol.Dms.create(t), this._gt);
  }
}
((exports.BattleUiSetController = BattleUiSetController).lgt = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info("BattleUiSet", 8, "SettingNotify 通知移动端按键设置", [
      "notify",
      e,
    ]);
  e = e._8n;
  if (e) {
    var t = ModelManager_1.ModelManager.BattleUiSetModel;
    for (const r of e) {
      var o = r.J4n,
        o = t.GetPanelItemDataByConfigId(o);
      if (!o) return;
      (o.Size = r.u8n),
        (o.EditSize = r.u8n),
        (o.Alpha = r.c8n),
        (o.EditAlpha = r.c8n),
        (o.OffsetX = r.m8n),
        (o.EditOffsetX = r.m8n),
        (o.OffsetY = r.d8n),
        (o.EditOffsetY = r.d8n),
        (o.HierarchyIndex = r.C8n),
        (o.EditorHierarchyIndex = r.C8n);
    }
  }
}),
  (BattleUiSetController._gt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "BattleUiSet",
        8,
        "MobileButtonSettingUpdateResponse 服务端返回移动端键位设置",
        ["response", e],
      ),
      e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "SaveButton",
        );
  });
//# sourceMappingURL=BattleUiSetController.js.map
