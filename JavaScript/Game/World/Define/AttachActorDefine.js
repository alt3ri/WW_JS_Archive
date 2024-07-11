"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttachActorEntry = exports.AttachActorItem = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GlobalData_1 = require("../../GlobalData"),
  CustomMap_1 = require("./CustomMap");
class AttachActorItem {
  constructor() {
    (this.Id = 0),
      (this.EntityId = 0),
      (this.Reason = void 0),
      (this.Actor = void 0),
      (this.Name = void 0),
      (this.ParentActorName = void 0),
      (this.DetachType = void 0);
  }
}
exports.AttachActorItem = AttachActorItem;
class AttachActorEntry {
  constructor() {
    (this.SPn = 0),
      (this.EPn = new Map()),
      (this.wQe = new CustomMap_1.CustomMap());
  }
  AddAttachActorItem(t, s, r, e, i, h) {
    if (this.EPn.has(r)) return !1;
    this.EPn.set(r, ++this.SPn);
    var o = new AttachActorItem();
    return (
      (o.Id = t),
      (o.EntityId = s),
      (o.Reason = i),
      (o.Actor = r),
      (o.Name = r.GetName()),
      (o.ParentActorName = e.GetName()),
      (o.DetachType = h),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        r.Tags.Add(FNameUtil_1.FNameUtil.GetDynamicFName("AttachId: " + t)),
      this.wQe.Set(this.SPn, o),
      !0
    );
  }
  GetAttachActorItem(t) {
    t = this.EPn.get(t);
    if (t) return this.wQe.Get(t);
  }
  GetAttachActorItems() {
    return this.wQe.GetItems();
  }
  Size() {
    return this.EPn.size;
  }
  RemoveAttachActorItem(t) {
    var s = this.EPn.get(t);
    return !!s && this.EPn.delete(t) && this.wQe.Remove(s);
  }
  Clear() {
    (this.SPn = 0), this.EPn.clear(), this.wQe.Clear();
  }
}
exports.AttachActorEntry = AttachActorEntry;
//# sourceMappingURL=AttachActorDefine.js.map
