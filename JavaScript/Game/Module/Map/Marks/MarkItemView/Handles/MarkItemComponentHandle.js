"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemComponentHandle = void 0);
class MarkItemComponentHandle {
  constructor(t) {
    (this.Context = void 0),
      (this.ComponentInternal = void 0),
      (this.Context = t);
  }
  Init() {
    this.OnInit();
  }
  Update() {
    void 0 !== this.Context.MarkItemEntity && this.OnUpdate();
  }
  SetVisible(t) {
    void 0 !== this.Context.MarkItemEntity && this.OnSetVisible(t);
  }
  ApplyModified() {
    void 0 !== this.Context.MarkItemEntity && this.OnApplyModified();
  }
  Dispose() {
    this.OnDispose();
  }
  OnInit() {}
  OnUpdate() {}
  OnDispose() {
    this.DestroyComponent();
  }
  OnSetVisible(t) {}
  OnApplyModified() {}
  async PreloadComponentAsync() {
    await this.LoadComponentAsync();
  }
  async LoadComponentAsync() {
    return new Promise((t) => {
      t(this.ComponentInternal);
    });
  }
  GetOrCreateComponent() {
    return this.ComponentInternal;
  }
  DestroyComponent() {
    void 0 !== this.ComponentInternal &&
      (this.ComponentInternal.RecycleToPool(),
      (this.ComponentInternal = void 0));
  }
  IsComponentValid(t) {
    return !!(t.IsStart || t.IsShowOrShowing || t.IsHideOrHiding);
  }
}
exports.MarkItemComponentHandle = MarkItemComponentHandle;
//# sourceMappingURL=MarkItemComponentHandle.js.map
