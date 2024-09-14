"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getInstantiationService =
    exports.setInstantiationService =
    exports.IInstantiationService =
      void 0);
const Instantiation_1 = require("./Instantiation/Instantiation");
exports.IInstantiationService = (0, Instantiation_1.createDecorator)(
  "instantiationService",
);
let instantiationService = void 0;
function setInstantiationService(t) {
  instantiationService = t;
}
function getInstantiationService() {
  if (instantiationService) return instantiationService;
  throw new Error("No instantiation service!");
}
(exports.setInstantiationService = setInstantiationService),
  (exports.getInstantiationService = getInstantiationService);
//# sourceMappingURL=Service.js.map
