"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionUnlockCookSystemOption =
    exports.unionToUnionUnlockCookSystemOption =
    exports.UnionUnlockCookSystemOption =
      void 0);
const unlock_cook_system_cook_book_js_1 = require("../fb-action/unlock-cook-system-cook-book.js");
var UnionUnlockCookSystemOption;
function unionToUnionUnlockCookSystemOption(o, n) {
  switch (UnionUnlockCookSystemOption[o]) {
    case "NONE":
      return;
    case "UnlockCookSystemCookBook":
      return n(
        new unlock_cook_system_cook_book_js_1.UnlockCookSystemCookBook(),
      );
    default:
      return;
  }
}
function unionListToUnionUnlockCookSystemOption(o, n, t) {
  switch (UnionUnlockCookSystemOption[o]) {
    case "NONE":
      return;
    case "UnlockCookSystemCookBook":
      return n(
        t,
        new unlock_cook_system_cook_book_js_1.UnlockCookSystemCookBook(),
      );
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.UnlockCookSystemCookBook = 1)] = "UnlockCookSystemCookBook");
})(
  (UnionUnlockCookSystemOption =
    exports.UnionUnlockCookSystemOption ||
    (exports.UnionUnlockCookSystemOption = {})),
),
  (exports.unionToUnionUnlockCookSystemOption =
    unionToUnionUnlockCookSystemOption),
  (exports.unionListToUnionUnlockCookSystemOption =
    unionListToUnionUnlockCookSystemOption);
//# sourceMappingURL=union-unlock-cook-system-option.js.map
