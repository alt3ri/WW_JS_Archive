"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaSceneView = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
class GachaSceneView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.CloseViewEvent = () => {
        this.wWt();
      }),
      (this.wWt = () => {
        this.BWt(!0);
      }),
      (this.BWt = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Gacha", 28, "GachaScene被关闭"),
          e &&
            (this.OnAfterCloseUiScene(),
            (ModelManager_1.ModelManager.GachaModel.CanCloseView = !0),
            UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.AfterCloseGachaScene,
            ));
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CloseGachaSceneView,
      this.CloseViewEvent,
    ),
      this.AfterAddEventListener();
  }
  AfterAddEventListener() {}
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseGachaSceneView,
      this.CloseViewEvent,
    ),
      this.AfterRemoveEventListener();
  }
  AfterRemoveEventListener() {}
  OnBeforeShow() {
    this.OnAfterOpenUiScene();
  }
  OnAfterOpenUiScene() {}
  OnStart() {
    (ModelManager_1.ModelManager.GachaModel.CanCloseView = !1),
      this.OnAfterInitComponentsData();
  }
  OnAfterCloseUiScene() {}
  OnBeforeDestroyImplementImplement() {}
  OnBeforeDestroyImplement() {
    (ModelManager_1.ModelManager.GachaModel.CanCloseView = !0),
      this.OnBeforeDestroyImplementImplement();
  }
  OnAfterInitComponentsData() {}
}
(exports.GachaSceneView = GachaSceneView).UiCameraHandleData = void 0;
// # sourceMappingURL=GachaSceneView.js.map
