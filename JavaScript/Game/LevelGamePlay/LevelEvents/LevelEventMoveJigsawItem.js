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
      s = e.Entity.GetComponent(185);
    if (s)
      if (e && t) {
        var n = e.Entity.GetComponent(124),
          i = t.Entity.GetComponent(123);
        if (n && i) {
          var o = n.PutDownBase;
          if (o) {
            const a = o.Entity.GetComponent(147),
              r =
                a?.Config.Config.Type ??
                IComponent_1.EItemFoundation.BuildingBlock;
            o.OnPickUpItem(n, r, !1);
          }
          o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
            this.Lo.Destination.RowIndex,
            this.Lo.Destination.ColumnIndex,
          );
          const a = t.Entity.GetComponent(147),
            r =
              a?.Config.Config.Type ??
              IComponent_1.EItemFoundation.BuildingBlock;
          i.OnPutDownItem(n, o, r, !1);
          (t = i.GetBlockLocationByIndex(o)),
            (o =
              (s.SetActorLocation(t.ToUeVector(), "LevelEventMoveJigsawItem"),
              e.Entity.GetComponent(144)));
          o && o.CollectSampleAndSend(!0),
            i.RequestMoveItem(n),
            i.CheckFinish();
        } else this.FinishExecute(!1);
      } else this.FinishExecute(!1);
  }
}
exports.LevelEventMoveJigsawItem = LevelEventMoveJigsawItem;
//# sourceMappingURL=LevelEventMoveJigsawItem.js.map
