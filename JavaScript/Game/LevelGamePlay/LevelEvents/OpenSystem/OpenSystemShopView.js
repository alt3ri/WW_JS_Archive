"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemShopView = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShopView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) return !1;
    const o = new CustomPromise_1.CustomPromise();
    return (
      !!ControllerHolder_1.ControllerHolder.ShopController.OpenShop(
        e.BoardId,
        (e) => {
          o.SetResult(e);
        },
      ) && o.Promise
    );
  }
  GetViewName(e) {
    return "ShopView";
  }
}
exports.OpenSystemShopView = OpenSystemShopView;
//# sourceMappingURL=OpenSystemShopView.js.map
