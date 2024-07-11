"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MethodPruner =
    exports.NOT_EDITOR_PRUNER =
    exports.NOT_SHIPPING_PRUNER =
      void 0);
const puerts_1 = require("puerts");
function MethodPruner(e, t, r) {
  typeof e.constructor !== "function" || typeof r.value !== "function"
    ? puerts_1.logger.error(
        `该装饰器只能用在类成员方法上 target: ${e.constructor.name} property: ` +
          t,
      )
    : puerts_1.logger.info(
        `该方法可能会被裁剪 target: ${e.constructor.name} property: ` + t,
      );
}
(exports.NOT_SHIPPING_PRUNER = !1),
  (exports.NOT_EDITOR_PRUNER = !1),
  (exports.MethodPruner = MethodPruner);
// # sourceMappingURL=Macro.js.map
