"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkeletalObserverHandle = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../GlobalData"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager");
class SkeletalObserverHandle {
  constructor() {
    this.uSo = void 0;
  }
  get Model() {
    return this.uSo?.Model;
  }
  CreateSkeletalObserverHandle(e) {
    var t = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(
      GlobalData_1.GlobalData.World,
      UE.TsSkeletalObserver_C.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransform,
      1,
    );
    UE.GameplayStatics.FinishSpawningActor(
      t,
      MathUtils_1.MathUtils.DefaultTransform,
    ),
      (this.uSo = t).Init(e);
  }
  ResetSkeletalObserverHandle() {
    this.uSo?.Destroy();
  }
  AddUiShowRoomShowActor(e) {
    var t = this.uSo;
    UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(t, e);
  }
}
exports.SkeletalObserverHandle = SkeletalObserverHandle;
//# sourceMappingURL=SkeletalObserverHandle.js.map
