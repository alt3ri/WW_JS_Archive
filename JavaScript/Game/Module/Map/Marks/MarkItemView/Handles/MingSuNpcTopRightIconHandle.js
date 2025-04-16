"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuNpcTopRightIconHandle = void 0);
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  MarkItemTopRightIconHandle_1 = require("./MarkItemTopRightIconHandle");
class MingSuNpcTopRightIconHandle extends MarkItemTopRightIconHandle_1.MarkItemTopRightIconHandle {
  OnUpdate() {
    var e = this.Context.MarkItemEntity,
      t = e.GetComponent(15).MapMarkConfig;
    let a = !1;
    1 === t.RelativeType &&
      5 === t.RelativeSubType &&
      ((t = t.RelativeId),
      (t =
        ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(
          t,
        ).GetDarkCoastDeliveryGuardState()),
      (a = 4 === t)) &&
      ((t = e.Resource.TopRightIconPath),
      this.Context.SetSpriteByPathAction(
        t,
        this.Context.TopRightIconSprite,
        !1,
      )),
      this.SetVisible(a);
  }
}
exports.MingSuNpcTopRightIconHandle = MingSuNpcTopRightIconHandle;
//# sourceMappingURL=MingSuNpcTopRightIconHandle.js.map
