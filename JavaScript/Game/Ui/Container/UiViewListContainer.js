"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewListContainer = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  UiViewContainer_1 = require("./UiViewContainer");
class UiViewListContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super(), (this.Gcr = void 0), (this.gF_ = []), (this.Gcr = e);
  }
  async OpenViewAsync(e) {
    this.Gcr.push(e), await this.OpenViewImplementAsync(e);
  }
  async CloseViewAsync(e) {
    var i = this.Gcr.indexOf(e);
    i < 0
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          10,
          "ListContainer: 界面关闭重复执行,直接返回",
          ["界面名称", e.Info?.Name],
          ["ViewId", e.GetViewId()],
        )
      : (this.Gcr.splice(i, 1), await this.CloseViewImplementAsync(e));
  }
  ClearContainer() {
    var i = [];
    for (let e = this.Gcr.length - 1; 0 <= e; --e) {
      var s = this.Gcr[e];
      (s.IsExistInLeaveLevel = !0),
        s.Info.IsPermanent ||
          (s.IsDestroyOrDestroying || this.TryCatchViewDestroyCompatible(s),
          i.push(s));
    }
    for (const o of i) {
      var e = this.Gcr.indexOf(o);
      this.Gcr.splice(e, 1);
    }
  }
  CloseAllView() {
    for (let e = this.Gcr.length - 1; 0 <= e; --e)
      this.Gcr[e].Destroy(), this.Gcr.splice(e, 1);
  }
  async PreOpenViewAsync(e) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          16,
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
          16,
          "此类型容器不支持预打开界面",
          ["name", e.Info.Name],
          ["type", e.Info.Type],
        ),
      Promise.reject(TypeError("此类型容器不支持预打开界面"))
    );
  }
  async HideView() {
    var e = [];
    this.gF_.length = 0;
    for (const i of this.Gcr)
      (i.IsCreateOrCreating || i.IsStartOrStarting || i.IsShowOrShowing) &&
        ((i.HidePromise = new CustomPromise_1.CustomPromise()),
        e.push(i.HidePromise.Promise),
        i.SetActive(!1),
        this.gF_.push(i));
    await Promise.all(e);
  }
  ShowView() {
    for (const e of this.gF_) e.IsDestroyOrDestroying || e.SetActive(!0);
    this.gF_.length = 0;
  }
}
exports.UiViewListContainer = UiViewListContainer;
//# sourceMappingURL=UiViewListContainer.js.map
