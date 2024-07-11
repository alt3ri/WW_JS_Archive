"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
class AreaView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.bWe = !1),
      (this.qWe = () => {
        this.GetText(0) &&
          ModelManager_1.ModelManager.AreaModel.AreaHintName &&
          this.GetText(0).SetText(
            ModelManager_1.ModelManager.AreaModel.AreaHintName,
          );
      }),
      (this.GWe = () => {
        this.UiViewSequence.ReplaySequence("Start"), this.qWe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
      this.bWe = !0;
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateAreaView,
      this.GWe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateAreaView,
      this.GWe,
    );
  }
  OnBeforeShow() {
    this.qWe();
  }
  OnTick(e) {
    this.bWe && this.IsShow && ((this.bWe = !1), this.CloseMe());
  }
}
exports.AreaView = AreaView;
//# sourceMappingURL=AreaView.js.map
