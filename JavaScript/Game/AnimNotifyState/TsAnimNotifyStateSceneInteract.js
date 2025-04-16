"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  MAX_ENABLE_TIME = 2e4;
class TsAnimNotifyStateSceneInteract extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.SocketName = void 0),
      (this.DataAsset = void 0),
      (this.HandleMap = new Map());
  }
  Constructor() {
    this.HandleMap = new Map();
  }
  K2_NotifyBegin(e, t, r) {
    if (this.DataAsset && e.GetOwner() instanceof TsBaseCharacter_1.default) {
      if (!ModelManager_1.ModelManager.SceneBattleInteractModel?.Open)
        return !1;
      var a,
        i =
          ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(
            this.DataAsset,
          );
      if (i)
        return (
          (a = i.Id),
          i.SetUpdateLocationSocket(
            e,
            this.SocketName ?? FNameUtil_1.FNameUtil.EMPTY,
          ),
          i.SetEnable(!0, MAX_ENABLE_TIME),
          this.HandleMap.set(e, a),
          !0
        );
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    if (this.DataAsset && e.GetOwner() instanceof TsBaseCharacter_1.default) {
      var r = this.HandleMap.get(e);
      if (r)
        return (
          ModelManager_1.ModelManager.SceneBattleInteractModel?.Open &&
            ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(
              r,
            ),
          this.HandleMap.delete(e),
          !0
        );
    }
    return !1;
  }
  GetNotifyName() {
    return "场景物件交互";
  }
}
exports.default = TsAnimNotifyStateSceneInteract;
//# sourceMappingURL=TsAnimNotifyStateSceneInteract.js.map
