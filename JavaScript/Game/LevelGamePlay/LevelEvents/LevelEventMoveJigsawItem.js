"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventMoveJigsawItem = void 0);
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventMoveJigsawItem extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.Lo = void 0);
  }
  ExecuteNew(e, t) {
    e
      ? ((this.Lo = e.Config),
        (e = []).push(this.Lo.ItemEntityId),
        e.push(this.Lo.FoundationEntityId),
        this.CreateWaitEntityTask(e))
      : this.FinishExecute(!1);
  }
  ExecuteWhenEntitiesReady() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.Lo.ItemEntityId,
      ),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.Lo.FoundationEntityId,
      ),
      s = e.Entity.GetComponent(187);
    if (s)
      if (e && t) {
        var n = e.Entity.GetComponent(125),
          i = t.Entity.GetComponent(124);
        if (n && i) {
          var o = n.PutDownBase;
          if (o) {
            const a = o.Entity.GetComponent(148),
              r =
                a?.Config.Config.Type ??
                IComponent_1.EItemFoundation.BuildingBlock;
            o.PickUpItem(n, n.PutDownIndex, r);
          }
          o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
            this.Lo.Destination.RowIndex,
            this.Lo.Destination.ColumnIndex,
          );
          const a = t.Entity.GetComponent(148),
            r =
              a?.Config.Config.Type ??
              IComponent_1.EItemFoundation.BuildingBlock;
          i.PutDownItem(n, o, r);
          (t = i.GetBlockLocationByIndex(o)),
            (s =
              (s.SetActorLocation(t.ToUeVector(), "LevelEventMoveJigsawItem"),
              e.Entity.GetComponent(145)));
          s && s.CollectSampleAndSend(!0),
            i.RequestMoveItem(n, o),
            i.CheckFinish(),
            this.FinishExecute(!0);
        } else this.FinishExecute(!1);
      } else this.FinishExecute(!1);
  }
}
exports.LevelEventMoveJigsawItem = LevelEventMoveJigsawItem;
//# sourceMappingURL=LevelEventMoveJigsawItem.js.map
