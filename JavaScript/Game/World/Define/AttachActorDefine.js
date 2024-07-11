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
    (this.ebn = 0),
      (this.tbn = new Map()),
      (this.WXe = new CustomMap_1.CustomMap());
  }
  AddAttachActorItem(t, s, r, e, i, h) {
    if (this.tbn.has(r)) return !1;
    this.tbn.set(r, ++this.ebn);
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
      this.WXe.Set(this.ebn, o),
      !0
    );
  }
  GetAttachActorItem(t) {
    t = this.tbn.get(t);
    if (t) return this.WXe.Get(t);
  }
  GetAttachActorItems() {
    return this.WXe.GetItems();
  }
  Size() {
    return this.tbn.size;
  }
  RemoveAttachActorItem(t) {
    var s = this.tbn.get(t);
    return !!s && this.tbn.delete(t) && this.WXe.Remove(s);
  }
  Clear() {
    (this.ebn = 0), this.tbn.clear(), this.WXe.Clear();
  }
}
exports.AttachActorEntry = AttachActorEntry;
//# sourceMappingURL=AttachActorDefine.js.map
