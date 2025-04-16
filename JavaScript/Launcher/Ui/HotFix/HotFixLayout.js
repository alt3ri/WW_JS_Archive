"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixLayout = void 0);
const HotFixLguiUtils_1 = require("./HotFixLguiUtils");
class HotFixLayout {
  constructor(t, i, s) {
    (this.eGe = void 0),
      (this.fGo = void 0),
      (this.mGo = []),
      (this.x5e = []),
      (this.ypt = []),
      (this.trc = void 0),
      (this.pGo = () => {
        (this.eGe = void 0), (this.fGo = void 0);
      }),
      (this.eGe = t),
      this.eGe.GetOwner().OnDestroyed.Add(this.pGo),
      (this.fGo = s || t.RootUIComp.GetAttachUIChild(0)?.GetOwner()),
      this.fGo && ((this.trc = i), this.fGo.GetUIItem().SetUIActive(!1));
  }
  LoadGrid(i) {
    for (let t = this.mGo.length; t < i; t++) {
      var s = this.V2e();
      this.mGo.push(s);
    }
  }
  GetRootUiItem() {
    return this.eGe?.RootUIComp;
  }
  GetDataList() {
    return this.ypt;
  }
  V2e() {
    return HotFixLguiUtils_1.HotFixLguiUtils.CopyItem(
      this.fGo.GetUIItem(),
      this.GetRootUiItem(),
    );
  }
  GetGridItemByIndex(t) {
    if (!(t < 0 || t >= this.mGo.length)) return this.mGo[t];
  }
  GetLayoutItemByIndex(t) {
    if (!(t < 0 || t >= this.x5e.length)) return this.x5e[t];
  }
  GetLayoutItemList() {
    return this.x5e;
  }
  RefreshByData(s) {
    (this.ypt = s), this.HideChildren(), this.LoadGrid(s.length);
    for (let i = 0; i < s.length; ++i) {
      var h,
        e = s[i];
      let t = void 0;
      (e.Index = i) >= this.x5e.length
        ? ((h = this.mGo[i]),
          (t = this.trc()).SetRootActor(h.GetOwner()),
          this.x5e.push(t))
        : (t = this.x5e[i]),
        t.Refresh(e),
        t.SetActive(!0);
    }
  }
  HideChildren() {
    for (const t of this.x5e) t.SetActive(!1);
  }
  ClearChildren() {
    for (const i of this.x5e) i.Destroy();
    this.x5e.length = 0;
    for (const s of this.mGo) {
      var t = s.GetOwner();
      t?.IsValid() && t.K2_DestroyActor();
    }
    this.mGo.length = 0;
  }
}
exports.HotFixLayout = HotFixLayout;
//# sourceMappingURL=HotFixLayout.js.map
