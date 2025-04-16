"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedRingLightItem = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  BigStuffedDefine_1 = require("../BigStuffedDefine"),
  BigStuffedRingSubItem_1 = require("./BigStuffedRingSubItem");
class BigStuffedRingLightItem extends BigStuffedRingSubItem_1.BigStuffedRingSubItem {
  constructor(e, t) {
    super(e, t), (this.awl = new UE.FName("Progress")), (this.Type = 3);
  }
  OnStart() {
    super.OnStart(),
      this.TextureRing.SetUIActive(!1),
      this.TextureRing.SetAlpha(0);
  }
  SpawnLightByArea(e) {
    var t = e.StartCellIndex,
      e = e.EndCellIndex,
      i = Math.max(t - 1, 0) * BigStuffedDefine_1.SINGLECELL_ANGLE,
      i =
        (this.TextureRing.SetUIRelativeRotation(
          Rotator_1.Rotator.Create(0, -i, 0).ToUeRotator(),
        ),
        (0, BigStuffedDefine_1.calculateCellSize)(t, e) /
          BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT);
    this.TextureRing.SetCustomMaterialScalarParameter(this.awl, i),
      this.TextureRing.SetUIActive(!0);
  }
}
exports.BigStuffedRingLightItem = BigStuffedRingLightItem;
//# sourceMappingURL=BigStuffedRingLightItem.js.map
