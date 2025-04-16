"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixProcessor = exports.FixAction = void 0);
var fix_action_js_1 = require("./fb-fix-processor/fix-action.js"),
  fix_processor_js_1 =
    (Object.defineProperty(exports, "FixAction", {
      enumerable: !0,
      get: function () {
        return fix_action_js_1.FixAction;
      },
    }),
    require("./fb-fix-processor/fix-processor.js"));
Object.defineProperty(exports, "FixProcessor", {
  enumerable: !0,
  get: function () {
    return fix_processor_js_1.FixProcessor;
  },
});
//# sourceMappingURL=fb-fix-processor.js.map
