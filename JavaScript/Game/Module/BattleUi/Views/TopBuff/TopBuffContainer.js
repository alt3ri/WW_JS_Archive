"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopBuffContainer = void 0);
class TopBuffContainer {
  constructor() {
    (this.ParentItem = void 0),
      (this.RoleData = void 0),
      (this.TagTaskList = []);
  }
  async InitAsync(t, s) {
    (this.ParentItem = t), (this.RoleData = s), await this.OnInitAsync();
  }
  SetVisible(t) {}
  Tick(t) {}
  Destroy() {
    this.FYe(), this.OnDestroy();
  }
  async OnInitAsync() {}
  OnDestroy() {}
  ListenForTagCountChanged(t, s) {
    var i = this.RoleData?.GameplayTagComponent;
    i && ((i = i.ListenForTagAnyCountChanged(t, s)), this.TagTaskList.push(i));
  }
  FYe() {
    if (this.TagTaskList) {
      for (const t of this.TagTaskList) t.EndTask();
      this.TagTaskList.length = 0;
    }
  }
}
exports.TopBuffContainer = TopBuffContainer;
//# sourceMappingURL=TopBuffContainer.js.map
