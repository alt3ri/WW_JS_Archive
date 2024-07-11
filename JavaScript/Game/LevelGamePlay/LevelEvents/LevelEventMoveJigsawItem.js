"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventMoveJigsawItem = void 0);
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
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
    const e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.Lo.ItemEntityId,
    );
    let t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.Lo.FoundationEntityId,
    );
    const s = e.Entity.GetComponent(182);
    if (s)
      if (e && t) {
        const n = e.Entity.GetComponent(122);
        const i = t.Entity.GetComponent(121);
        if (n && i) {
          let o = n.PutDownBase;
          if (o) {
            const a = o.Entity.GetComponent(145);
            const r =
              a?.Config.Config.Type ??
              IComponent_1.EItemFoundation.BuildingBlock;
            o.OnPickUpItem(n, r, !1);
          }
          o = new SceneItemJigsawBaseComponent_1.JigsawIndex(
            this.Lo.Destination.RowIndex,
            this.Lo.Destination.ColumnIndex,
          );
          const a = t.Entity.GetComponent(145);
          const r =
            a?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock;
          i.OnPutDownItem(n, o, r, !1);
          (t = i.GetBlockLocationByIndex(o)),
            (o =
              (s.SetActorLocation(t.ToUeVector(), "LevelEventMoveJigsawItem"),
              e.Entity.GetComponent(142)));
          o && o.ForceSendPendingMoveInfos(),
            i.RequestMoveItem(n),
            i.CheckFinish();
        } else this.FinishExecute(!1);
      } else this.FinishExecute(!1);
  }
}
exports.LevelEventMoveJigsawItem = LevelEventMoveJigsawItem;
// # sourceMappingURL=LevelEventMoveJigsawItem.js.map
