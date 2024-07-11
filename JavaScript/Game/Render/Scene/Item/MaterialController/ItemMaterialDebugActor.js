"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const ItemMaterialManager_1 = require("./ItemMaterialManager");
class ItemMaterialDebugActor extends UE.KuroEffectActor {
  constructor() {
    super(...arguments),
      (this.GlobalNum = 0),
      (this.Actor = void 0),
      (this.SimpleScalarNameTest = void 0),
      (this.SimpleScalarValueTest = 0),
      (this.SimpleVectorNameTest = void 0),
      (this.SimpleVectorValueTest = void 0),
      (this.GlobalMaterialData = void 0),
      (this.MaterialData = void 0),
      (this.ActorMaterialControllerNum = 0),
      (this.GlobalItemMaterialController = void 0),
      (this.Controllers = []);
  }
  EditorTick(t) {
    ItemMaterialManager_1.ItemMaterialManager.Tick(
      t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
    ),
      this.SimpleMaterialControllerUpdate();
  }
  DisableAllActorData() {
    ItemMaterialManager_1.ItemMaterialManager.DisableAllActorData();
  }
  DisableActorData() {
    ItemMaterialManager_1.ItemMaterialManager.DisableActorData(
      this.ActorMaterialControllerNum,
    );
  }
  EnableActorData() {
    this.Controllers || (this.Controllers = []),
      this.Actor &&
        this.MaterialData &&
        ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
          this.Actor,
          this.MaterialData,
        );
  }
  SimpleMaterialControllerDisable() {
    ItemMaterialManager_1.ItemMaterialManager.DisableSimpleMaterialController(
      this.ActorMaterialControllerNum,
    );
  }
  SimpleMaterialControllerUpdate() {
    let t, e;
    this.Actor &&
      this.SimpleScalarNameTest &&
      this.SimpleScalarValueTest &&
      this.SimpleVectorNameTest &&
      this.SimpleVectorValueTest &&
      ((t = new Map()),
      (e = new Map()),
      t.set(this.SimpleScalarNameTest, this.SimpleScalarValueTest),
      e.set(this.SimpleVectorNameTest, this.SimpleVectorValueTest),
      ItemMaterialManager_1.ItemMaterialManager.AddSimpleMaterialController(
        this.Actor,
        t,
        e,
      ));
  }
}
exports.default = ItemMaterialDebugActor;
// # sourceMappingURL=ItemMaterialDebugActor.js.map
