"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedTokenMediumItemGrid = void 0);
const RogueResBuffPoolById_1 = require("../../../../Core/Define/ConfigQuery/RogueResBuffPoolById"),
  RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RogueIllustratedTokenMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.j5c = void 0), (this.ndi = void 0);
  }
  OnRefresh(e, o, t) {
    this.j5c = e;
    var i = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(
        e.GetConfigId(),
      ),
      r = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
        e.GetCollectionIndex(),
      ),
      r =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
          r.IdKey,
        ),
      e = {
        Type: 4,
        Data: e,
        StarLevel: i?.Quality,
        BottomTextId: i?.BuffName,
        IsLockVisible: r === Protocol_1.Aki.Protocol.zps.Z6n,
        IsRedDotVisible: r === Protocol_1.Aki.Protocol.zps.CMs,
        IconPath: i?.BuffIcon,
        IsDisable: r === Protocol_1.Aki.Protocol.zps.Z6n,
      };
    this.Apply(e), this.SetSelected(o);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  BindOnItemButtonClickedCallback(e) {
    this.ndi = e;
  }
  OnExtendToggleStateChanged(e) {
    this.ndi && this.ndi(this.j5c);
  }
}
exports.RogueIllustratedTokenMediumItemGrid =
  RogueIllustratedTokenMediumItemGrid;
//# sourceMappingURL=RogueIllustratedTokenMediumItemGrid.js.map
