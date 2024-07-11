"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneInteractionModel = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
class SceneInteractionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Fsr = !1);
  }
  GetEntityByBaseItem(e) {
    this.Fsr ||
      ((this.Fsr = !0),
      UE.KuroLevelPlayLibrary.RegisterBaseItemInfo(
        UE.BP_BaseItem_C.StaticClass(),
        "EntityId",
      ));
    e = UE.KuroLevelPlayLibrary.GetEntityIdByBaseItem(e);
    return ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e);
  }
  GetEntityByActor(e, t = !1) {
    e = this.GetBaseItemByActor(e, t);
    if (e) return ActorUtils_1.ActorUtils.GetEntityByActor(e);
  }
  GetBaseItemByActor(t, r = !1) {
    if (t?.IsValid()) {
      let e = t.GetOwner();
      if (void 0 === e) {
        if (r) return;
        if (void 0 === (e = this.Vsr(t))) return;
      }
      return UE.KuroStaticLibrary.IsObjectClassByName(
        e,
        CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
      )
        ? e
        : r
          ? void 0
          : this.Vsr(t);
    }
  }
  Vsr(e) {
    let t = e;
    for (
      ;
      t &&
      !UE.KuroStaticLibrary.IsImplementInterface(
        t.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      );

    )
      t = t.GetAttachParentActor();
    if (t) {
      e = t;
      if (EntitySystem_1.EntitySystem.Get(e.GetEntityId())?.Valid) return t;
    }
  }
}
exports.SceneInteractionModel = SceneInteractionModel;
//# sourceMappingURL=SceneInteractionModel.js.map
