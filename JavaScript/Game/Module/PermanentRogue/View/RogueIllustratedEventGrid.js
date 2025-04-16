"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedEventItem = void 0);
const UE = require("ue"),
  RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResGridEventById_1 = require("../../../../Core/Define/ConfigQuery/RogueResGridEventById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueIllustratedEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Nn1 = 0),
      (this.ac = Protocol_1.Aki.Protocol.zps.Z6n),
      (this.ndi = void 0),
      (this.PPt = (e) => {
        this.ndi && this.ndi(this.Nn1, this.ac);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnStartImplement() {
    this.GetExtendToggle(0)?.OnStateChange.Add(this.PPt);
  }
  OnBeforeDestroyImplement() {
    this.GetExtendToggle(0)?.OnStateChange.Remove(this.PPt);
  }
  Refresh(e, t, i) {
    this.Nn1 = e;
    var o,
      e =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e,
        );
    (this.ac =
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
        this.Nn1,
      )),
      this.GetItem(2).SetUIActive(this.ac === Protocol_1.Aki.Protocol.zps.CMs),
      this.ac === Protocol_1.Aki.Protocol.zps.Z6n
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "RogueRes_CollectionEventLock",
          )
        : 1 === e.Type
          ? ((o = RogueResGridEventById_1.configRogueResGridEventById.GetConfig(
              e.Id,
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o.Title))
          : 2 === e.Type &&
            ((o = RogueResGridEventById_1.configRogueResGridEventById.GetConfig(
              e.Id,
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o.Title)),
      this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  SetSelected(e, t = !1) {
    var i = this.GetExtendToggle(0);
    e
      ? t
        ? i.SetToggleStateForce(1, !1)
        : i.SetToggleState(1, !1)
      : t
        ? i.SetToggleStateForce(0, !1)
        : i.SetToggleState(0, !1);
  }
  BindOnItemButtonClickedCallback(e) {
    this.ndi = e;
  }
}
exports.RogueIllustratedEventItem = RogueIllustratedEventItem;
//# sourceMappingURL=RogueIllustratedEventGrid.js.map
