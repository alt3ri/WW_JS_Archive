"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewSetContainer = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  UiViewContainer_1 = require("./UiViewContainer");
class UiViewSetContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super(), (this.v3o = void 0), (this.v3o = e);
  }
  async OpenViewAsync(e) {
    var i = e.Info.Name;
    this.v3o.has(i)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCore", 1, "界面重复", ["name", i])
      : (this.v3o.set(i, e), await this.OpenViewImplementAsync(e));
  }
  async CloseViewAsync(e) {
    this.v3o.delete(e.Info.Name), await this.CloseViewImplementAsync(e);
  }
  ClearContainer() {
    var e,
      i,
      o = [];
    for ([e, i] of this.v3o)
      (i.IsExistInLeaveLevel = !0),
        i.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(i), o.push(e));
    for (const r of o) this.v3o.delete(r);
  }
  async PreOpenViewAsync(e) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          17,
          "此类型容器不支持预打开界面",
          ["name", e.Info.Name],
          ["type", e.Info.Type],
        ),
      Promise.resolve()
    );
  }
  async OpenViewAfterPreOpenedAsync(e) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          17,
          "此类型容器不支持预打开界面",
          ["name", e.Info.Name],
          ["type", e.Info.Type],
        ),
      Promise.reject(TypeError("此类型容器不支持预打开界面"))
    );
  }
}
exports.UiViewSetContainer = UiViewSetContainer;
//# sourceMappingURL=UiViewSetContainer.js.map
