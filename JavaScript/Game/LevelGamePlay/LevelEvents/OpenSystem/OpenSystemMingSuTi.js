"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemMingSuTi = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  MingSuDefine_1 = require("../../../Module/MingSu/MingSuDefine"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMingSuTi extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    e = e.BoardId;
    if (!e) return !1;
    const n = new CustomPromise_1.CustomPromise();
    return (
      !!ControllerHolder_1.ControllerHolder.MingSuController.OpenView(
        e,
        (e) => {
          n.SetResult(e);
        },
      ) && n.Promise
    );
  }
  GetViewName(e) {
    switch (e.BoardId) {
      case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
        return "MingSuView";
      case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
        return "CollectItemView";
      case MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID:
        return "PupuVillageItemView";
      case MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID:
        return "DarkCoastDeliveryMainView";
      default:
        return "MingSuView";
    }
  }
}
exports.OpenSystemMingSuTi = OpenSystemMingSuTi;
//# sourceMappingURL=OpenSystemMingSuTi.js.map
