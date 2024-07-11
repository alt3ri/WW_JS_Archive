"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorHintData =
    exports.RoleFavorLockItemData =
    exports.RoleFavorDescComponentData =
    exports.ContentItemData =
    exports.ClassifyItemData =
      void 0);
class ClassifyItemData {
  constructor(t, s, o, a) {
    (this.TitleTableId = t),
      (this.FavorTabType = s),
      (this.RoleId = o),
      (this.TypeParam = a);
  }
}
exports.ClassifyItemData = ClassifyItemData;
class ContentItemData {
  constructor(t, s, o, a) {
    (this.FavorTabType = t),
      (this.RoleId = s),
      (this.TypeParam = a),
      (this.Config = o);
  }
}
exports.ContentItemData = ContentItemData;
class RoleFavorDescComponentData {
  constructor(t, s) {
    (this.Title = t), (this.Desc = s);
  }
}
exports.RoleFavorDescComponentData = RoleFavorDescComponentData;
class RoleFavorLockItemData {
  constructor(t, s) {
    (this.IsLock = t), (this.Desc = s);
  }
}
exports.RoleFavorLockItemData = RoleFavorLockItemData;
class RoleFavorHintData {
  constructor(t, s) {
    (this.RoleConfig = t), (this.Exp = s);
  }
}
exports.RoleFavorHintData = RoleFavorHintData;
// # sourceMappingURL=RoleFavorDefine.js.map
