"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationPanelHandleCreator = void 0);
class NavigationPanelHandleCreator {
  static RegisterSpecialPanelHandle(a, e) {
    NavigationPanelHandleCreator.nBo.set(a, e);
  }
  static GetPanelHandle(a) {
    let e = NavigationPanelHandleCreator.nBo.get(a),
      t = a;
    return (
      e ||
        ((e = NavigationPanelHandleCreator.nBo.get("Default")),
        (t = "Default")),
      new e(t)
    );
  }
}
(exports.NavigationPanelHandleCreator = NavigationPanelHandleCreator).nBo =
  new Map();
//# sourceMappingURL=NavigationPanelHandleCreator.js.map
