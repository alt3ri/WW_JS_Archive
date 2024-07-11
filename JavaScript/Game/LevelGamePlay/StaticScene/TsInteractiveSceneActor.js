"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SimpleLevelSequenceActor_1 = require("./SimpleLevelSequenceActor");
class TsInteractiveSceneActor extends UE.Actor {
  constructor() {
    super(...arguments),
      (this.EntityConfigId = 0),
      (this.Configs = void 0),
      (this.InteractiveType = 0),
      (this.WuYinQuName = ""),
      (this.LevelSequence = void 0),
      (this.EntityId = 0),
      (this.CurrentTag = void 0),
      (this.LevelSequenceActor = void 0),
      (this.OnGameplayTagChanged = void 0),
      (this.OnEntityCreate = void 0),
      (this.OnEntityRemove = void 0),
      (this.HandleWorldDone = void 0);
  }
  ReceiveBeginPlay() {
    (this.OnGameplayTagChanged = () => {
      this.CheckGameplayTagChange();
    }),
      (this.OnEntityCreate = (e, t, i) => {
        this.HandleEntityCreate(t);
      }),
      (this.OnEntityRemove = (e, t) => {
        this.HandleEntityRemove(t);
      }),
      (this.HandleWorldDone = () => {
        this.OnWorldDone();
      }),
      GlobalData_1.GlobalData.BpEventManager?.IsValid()
        ? (ModelManager_1.ModelManager.GameModeModel?.WorldDone
            ? this.OnWorldDone()
            : (GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
                this.HandleWorldDone,
              ),
              GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Add(
                this.HandleWorldDone,
              )),
          this.SetActorTickEnabled(!1))
        : this.SetActorTickEnabled(!0);
  }
  ReceiveEndPlay() {
    this.LevelSequenceActor &&
      (this.LevelSequenceActor.Clear(), (this.LevelSequenceActor = void 0));
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
      this.EntityConfigId,
    );
    e?.Valid && this.SafeRemoveEntityGameplayTagEvent(e),
      this.OnEntityCreate &&
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.OnEntityCreate,
        ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddEntity,
          this.OnEntityCreate,
        ),
      this.OnEntityRemove &&
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.RemoveEntity,
          this.OnEntityRemove,
        ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.OnEntityRemove,
        ),
      GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
        this.HandleWorldDone,
      );
  }
  ReceiveTick(e) {
    GlobalData_1.GlobalData.BpEventManager &&
      (this.SetActorTickEnabled(!1),
      GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
        this.HandleWorldDone,
      ),
      GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Add(
        this.HandleWorldDone,
      ));
  }
  OnWorldDone() {
    var e;
    this.Configs?.Num() &&
      ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.EntityConfigId,
      )),
      this.OnEntityCreate &&
        !EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.OnEntityCreate,
        ) &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.OnEntityCreate,
        ),
      this.OnEntityRemove &&
        !EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.RemoveEntity,
          this.OnEntityRemove,
        ) &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.OnEntityRemove,
        ),
      e?.Valid) &&
      ((this.EntityId = e.Id),
      this.ApplyInteractionConfig(!0),
      this.SafeAddEntityGameplayTagEvent(e));
  }
  ApplyInteractionConfig(t) {
    var i = EntitySystem_1.EntitySystem.Get(this.EntityId);
    if (i?.Valid) {
      var s = i.GetComponent(177);
      if (s?.Valid) {
        for (let e = 0; e <= this.Configs.Num(); e++)
          if (this.Configs?.IsValidIndex(e)) {
            var n = this.Configs.GetKey(e);
            if (s.ContainsTag(n)) {
              if (this.CurrentTag === n)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Interaction",
                    34,
                    "监听实体无初始状态",
                    ["Actor EntityId", this.EntityId],
                    ["状态实体 EntityId", i.Id],
                  )
                );
              this.CurrentTag = n;
              const r = this.Configs.Get(n);
              switch (this.InteractiveType) {
                case 0:
                  var a = r.MaterialData.ToAssetPathName();
                  a && "None" !== a
                    ? ResourceSystem_1.ResourceSystem.LoadAsync(
                        r.MaterialData.ToAssetPathName(),
                        UE.ItemMaterialControllerActorData_C,
                        (t) => {
                          if (t?.IsValid())
                            for (let e = 0; e < r.ReferActors.Num(); e++)
                              ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
                                t,
                                r.ReferActors.Get(e),
                              );
                        },
                      )
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Interaction",
                        7,
                        "未配置对应MaterialData",
                      );
                  break;
                case 1:
                  var a = this.WuYinQuName,
                    o = r.WuYinQuState;
                  ModelManager_1.ModelManager.RenderModuleModel.SetBattleState(
                    a,
                    o,
                  ),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Interaction",
                        34,
                        "设置无音区状态",
                        ["wuYinQuName", a],
                        ["wuYinQuState", o],
                      );
                  break;
                case 2:
                  for (let e = 0; e < r.HideActors.Num(); e++)
                    r.HideActors.Get(e)?.SetActorHiddenInGame(!0),
                      r.HideActors.Get(e)?.SetActorEnableCollision(!1);
                  for (let e = 0; e < r.ShowActors.Num(); e++)
                    r.ShowActors.Get(e)?.SetActorHiddenInGame(!1),
                      r.ShowActors.Get(e)?.SetActorEnableCollision(!0);
                  break;
                case 3:
                  break;
                case 4:
                  if (!this.LevelSequence)
                    return void (
                      Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Interaction",
                        34,
                        "未配置对应LevelSequence",
                        ["name", this.GetName()],
                      )
                    );
                  o = r.LevelSequenceConfig;
                  if (o.切入时间 < 0 || o.切出时间 < 0)
                    return void (
                      Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Interaction",
                        34,
                        "镜头过渡时间应大于等于0",
                        ["name", this.GetName()],
                      )
                    );
                  this.LevelSequenceActor ||
                    (this.LevelSequenceActor =
                      new SimpleLevelSequenceActor_1.default(
                        this.LevelSequence,
                      )),
                    this.LevelSequenceActor.PlayToMarkOld(
                      o.Mark,
                      o.切入时间,
                      o.切出时间,
                      t,
                    );
                  break;
                case 5:
                  r.MPCParams &&
                    ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
                      new UE.ItemMaterialControllerMPCData_C(),
                    );
              }
            } else
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Interaction", 34, "Entity不存在tag ", [
                  "key.TagName",
                  n.TagName,
                ]);
          }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Interaction",
            34,
            "tagComponent is invalid   EntityId: ",
            ["this.EntityId", this.EntityId],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Interaction", 34, "Entity is invalid.    EntityId: ", [
          "this.EntityId",
          this.EntityId,
        ]);
  }
  CheckGameplayTagChange() {
    this.ApplyInteractionConfig(!1);
  }
  HandleEntityCreate(e) {
    var t;
    e?.Valid &&
      (t = e.Entity.GetComponent(0))?.Valid &&
      t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
      t.GetPbDataId() === this.EntityConfigId &&
      ((this.EntityId = e.Id),
      this.ApplyInteractionConfig(!0),
      this.SafeAddEntityGameplayTagEvent(e));
  }
  HandleEntityRemove(e) {
    var t;
    e?.Valid &&
      (t = e.Entity.GetComponent(0))?.Valid &&
      t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
      t.GetPbDataId() === this.EntityConfigId &&
      ((this.EntityId = 0), this.SafeRemoveEntityGameplayTagEvent(e));
  }
  SafeAddEntityGameplayTagEvent(e) {
    EventSystem_1.EventSystem.HasWithTarget(
      e.Entity,
      EventDefine_1.EEventName.OnGameplayTagChanged,
      this.OnGameplayTagChanged,
    ) ||
      EventSystem_1.EventSystem.AddWithTarget(
        e.Entity,
        EventDefine_1.EEventName.OnGameplayTagChanged,
        this.OnGameplayTagChanged,
      );
  }
  SafeRemoveEntityGameplayTagEvent(e) {
    EventSystem_1.EventSystem.HasWithTarget(
      e.Entity,
      EventDefine_1.EEventName.OnGameplayTagChanged,
      this.OnGameplayTagChanged,
    ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e.Entity,
        EventDefine_1.EEventName.OnGameplayTagChanged,
        this.OnGameplayTagChanged,
      );
  }
}
exports.default = TsInteractiveSceneActor;
//# sourceMappingURL=TsInteractiveSceneActor.js.map
