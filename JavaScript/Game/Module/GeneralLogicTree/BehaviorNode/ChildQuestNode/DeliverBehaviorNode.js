"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeliverBehaviorNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ItemDeliverController_1 = require("../../../ItemDeliver/ItemDeliverController"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class DeliverBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.FXt = 0),
      (this.VXt = void 0),
      (this.HXt = void 0),
      (this.jXt = void 0),
      (this.ts = ""),
      (this.HGe = void 0),
      (this.CanRepeat = !1),
      (this.PXt = []),
      (this.WXt = (t) => {
        if (this.VXt && this.VXt.Option.Guid === t) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.FXt,
          );
          if (t) {
            let e = "";
            t && (e = t.Entity.GetComponent(104)?.PawnName ?? ""),
              this.HXt
                ? ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInItem(
                    this.HXt,
                    e,
                    this.HGe,
                    this.ts,
                    this.Context,
                  )
                : this.jXt &&
                  ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInGroup(
                    this.jXt,
                    e,
                    this.HGe,
                    this.ts,
                    this.Context,
                  );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Quest", 8, "交付道具的NPC不存在", [
                "实体Id",
                this.FXt,
              ]);
        }
      });
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    var t;
    return (
      !!super.OnCreate(e) &&
      "HandInItems" === (e = e.Condition).Type &&
      ("Actions" !== (t = e.AddOption).Option.Type.Type
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
              "交付道具任务配置的交互类型错误，应配置行为序列类型的交互",
            ),
          !1)
        : ((this.HXt = e.HandInItems.Items),
          (this.jXt = e.HandInItems.GroupConfig),
          (this.ts = e.HandInItems.TidDescText),
          (this.HGe = e.HandInItems.TidTitleText),
          (this.CanRepeat = e.HandInItems.RepeatItems),
          (this.FXt = t.EntityId),
          (this.VXt = t),
          (this.PXt = [t.EntityId]),
          !0))
    );
  }
  OnDestroy() {
    (this.VXt = void 0), (this.HXt = void 0), super.OnDestroy();
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DynamicInteractServerResponse,
        this.WXt,
      );
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DynamicInteractServerResponse,
      this.WXt,
    ),
      super.RemoveEventsOnChildQuestEnd();
  }
}
exports.DeliverBehaviorNode = DeliverBehaviorNode;
//# sourceMappingURL=DeliverBehaviorNode.js.map
