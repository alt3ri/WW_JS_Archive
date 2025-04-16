"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CaveHoleMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  CaveHoleMarkItemView_1 = require("../MarkItemView/CaveHoleMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class CaveHoleMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  OnInitialize() {
    this.uil(), super.OnInitialize();
  }
  GetMarkItemViewType() {
    return 2;
  }
  CreateView() {
    return new CaveHoleMarkItemView_1.CaveHoleMarkItemView(this);
  }
  CheckCanShowView() {
    var e,
      t,
      r,
      i,
      a = super.CheckCanShowView();
    return this.IsMultiMap()
      ? ((e = this.GetMultiMapId()),
        (t = this.GetConnectMultiMapIds()),
        (i = this.ConnectGround()),
        (r =
          ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId ??
          0),
        (i = i || e === r || t.includes(r)),
        a && i)
      : a;
  }
  OnUpdate(e) {
    super.OnUpdate(e), 1 === this.MapType && this.uil();
  }
  GetIsSelectThisFloor() {
    var e, t, r;
    return this.IsMultiMap()
      ? ((e = this.GetMultiMapId()),
        (t = this.MarkConfig.MultiMapFloorId),
        1 === this.MapType
          ? !!this.InMultiMapArea(e) || this.InMultiMapArea(t)
          : (r =
              ModelManager_1.ModelManager.WorldMapModel
                .WorldMapCurrentMultiMapId ?? 0) === e || r === t)
      : this.LocateInGround();
  }
  uil() {
    var e = this.IsSelectThisFloor;
    (this.IsSelectThisFloor = this.GetIsSelectThisFloor()),
      e !== this.IsSelectThisFloor && this.UpdateViewIcon();
  }
}
exports.CaveHoleMarkItem = CaveHoleMarkItem;
//# sourceMappingURL=CaveHoleMarkItem.js.map
