"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericPromptView = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PromptForFloatLineView_1 = require("./GenericPromptSubViews/PromptForFloatLineView");
class GenericPromptView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.S7 = (e, i) => {
        const t = ConfigManager_1.ConfigManager.GenericPromptConfig;
        var e = t.GetPriority(e);
        return t.GetPriority(i) - e;
      }),
      (this.eYt = new PriorityQueue_1.PriorityQueue(this.S7)),
      (this.tYt = void 0),
      (this.iYt = (e) => {
        this.eYt.Push(e), this.oYt();
      }),
      (this.rYt = (e) => {
        this.eYt.Empty ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GenericPrompt", 11, "获取下一个显示数据"),
          this.oYt());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.tYt = new PromptForFloatLineView_1.PromptForFloatLineView()),
      this.tYt.SetHideCallback(this.rYt),
      await this.tYt.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this.nYt();
  }
  OnTick(e) {
    this.tYt.Tick(e);
  }
  OnBeforeDestroy() {
    this.tYt.SetHideCallback(void 0), this.eYt.Clear();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InsertFloatTips,
      this.iYt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InsertFloatTips,
      this.iYt,
    );
  }
  nYt() {
    let e;
    const i =
      ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(9);
    i.OffsetY !== 0 &&
      (e = this.GetItem(0)).SetAnchorOffsetY(e.GetAnchorOffsetY() + i.OffsetY);
  }
  sYt(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("GenericPrompt", 11, "打开提示界面", [
        "观察队列长度",
        this.eYt.Size,
      ]),
      this.tYt.SetPromptHub(e),
      this.tYt.ShowView();
  }
  oYt() {
    const e = this.eYt.Pop();
    this.sYt(e);
  }
}
exports.GenericPromptView = GenericPromptView;
// # sourceMappingURL=GenericPromptView.js.map
