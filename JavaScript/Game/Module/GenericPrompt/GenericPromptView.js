"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericPromptView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  PromptForFloatLineView_1 = require("./GenericPromptSubViews/PromptForFloatLineView");
class GenericPromptView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.E7 = (e, i) => {
        var t = ConfigManager_1.ConfigManager.GenericPromptConfig,
          e = t.GetPriority(e);
        return t.GetPriority(i) - e;
      }),
      (this.eJt = new PriorityQueue_1.PriorityQueue(this.E7)),
      (this.tJt = void 0),
      (this.iJt = (e) => {
        this.eJt.Push(e), this.oJt();
      }),
      (this.rJt = (e) => {
        this.eJt.Empty ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GenericPrompt", 11, "获取下一个显示数据"),
          this.oJt());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.tJt = new PromptForFloatLineView_1.PromptForFloatLineView()),
      this.tJt.SetHideCallback(this.rJt),
      await this.tJt.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this.nJt();
  }
  OnTick(e) {
    this.tJt.Tick(e);
  }
  OnBeforeDestroy() {
    this.tJt.SetHideCallback(void 0), this.eJt.Clear();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InsertFloatTips,
      this.iJt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InsertFloatTips,
      this.iJt,
    );
  }
  nJt() {
    var e,
      i =
        ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(9);
    0 !== i.OffsetY &&
      (e = this.GetItem(0)).SetAnchorOffsetY(e.GetAnchorOffsetY() + i.OffsetY);
  }
  sJt(e) {
    this.tJt.SetPromptHub(e), this.tJt.ShowView();
  }
  oJt() {
    var e = this.eJt.Pop();
    this.sJt(e);
  }
}
exports.GenericPromptView = GenericPromptView;
//# sourceMappingURL=GenericPromptView.js.map
