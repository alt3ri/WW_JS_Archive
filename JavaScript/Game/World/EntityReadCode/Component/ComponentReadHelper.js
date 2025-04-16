"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComponentReadHelper = exports.requireModule = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  fb_component_1 = require("../../EntityFb/fb-component"),
  ImportHelper_1 = require("../ImportHelper"),
  requireModule = (e) => require(e);
exports.requireModule = requireModule;
class ComponentReadHelper {
  static ReadComponents(e) {
    if (e) {
      var o = fb_component_1.ComponentData.getRootAsComponentData(e),
        t = {},
        n = t,
        p = o.componentsLength();
      for (let e = 0; e < p; ++e) {
        var r = o.components(e),
          a = r.name();
        r.isNull()
          ? (n[a] = null)
          : ((r = ComponentReadHelper.ReadComponent(r)), (t[a] = r));
      }
      return t;
    }
  }
  static ReadComponent(e) {
    if (e) {
      var o = "../../EntityFb/fb-component",
        t = e.componentType();
      switch (t) {
        case fb_component_1.UnionComponent.AirWallSpawnerComponent:
          var n = "AirWallSpawnerComponent",
            p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            );
          return p
            ? ((p = e.component(p)),
              (a = "./FbAirWallSpawnerComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbAirWallSpawnerComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.ActorStateComponent:
          var r = "ActorStateComponent",
            p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            );
          return p
            ? ((a = e.component(p)),
              (n = "./FbActorStateComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbActorStateComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.AiComponent:
          var p = "AiComponent",
            a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            );
          return a
            ? ((n = e.component(a)),
              (r = "./FbAiComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbAiComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.LevelAIComponent:
          var a = "LevelAIComponent",
            n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            );
          return n
            ? ((r = e.component(n)),
              (p = "./FbLevelAIComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbLevelAIComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.AttributeComponent:
          var n = "AttributeComponent",
            r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            );
          return r
            ? ((p = e.component(r)),
              (a = "./FbAttributeComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbAttributeComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.BaseInfoComponent:
          (r = "BaseInfoComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbBaseInfoComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbBaseInfoComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.BehaviorFlowComponent:
          (p = "BehaviorFlowComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbBehaviorFlowComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbBehaviorFlowComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.CalculateComponent:
          (a = "CalculateComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbCalculateComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbCalculateComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.UnUseComponent:
          (n = "UnUseComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbUnUseComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbUnUseComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.EntityStateComponent:
          (r = "EntityStateComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbEntityStateComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbEntityStateComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.SceneItemAttributeComponent:
          (p = "SceneItemAttributeComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbSceneItemAttributeComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbSceneItemAttributeComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.FlowComponent:
          (a = "FlowComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbFlowComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbFlowComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.GrabComponent:
          (n = "GrabComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbGrabComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbGrabComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.InteractComponent:
          (r = "InteractComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbInteractComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbInteractComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.InteractiveComponent:
          (p = "InteractiveComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbInteractiveComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbInteractiveComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.MoveComponent:
          (a = "MoveComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbMoveComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbMoveComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.RefreshComponent:
          (n = "RefreshComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbRefreshComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbRefreshComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.RefreshGroupComponent:
          (r = "RefreshGroupComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbRefreshGroupComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbRefreshGroupComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.RefreshSingleComponent:
          (p = "RefreshSingleComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbRefreshSingleComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbRefreshSingleComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.RewardComponent:
          (a = "RewardComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbRewardComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbRewardComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.RotatorComponent:
          (n = "RotatorComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbRotatorComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbRotatorComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.RotatorComponent2:
          (r = "RotatorComponent2"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbRotatorComponent2"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbRotatorComponent2.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.SphereFactoryComponent:
          (p = "SphereFactoryComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbSphereFactoryComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbSphereFactoryComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.SpringComponent:
          (a = "SpringComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbSpringComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbSpringComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.SpawnMonsterComponent:
          (n = "SpawnMonsterComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbSpawnMonsterComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSpawnMonsterComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.SwitcherComponent:
          (r = "SwitcherComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbSwitcherComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbSwitcherComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.TrampleUe5Component:
          (p = "TrampleUe5Component"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbTrampleUe5Component"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbTrampleUe5Component.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.TreasureBoxComponent:
          (a = "TreasureBoxComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbTreasureBoxComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbTreasureBoxComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.TriggerUe5Component:
          (n = "TriggerUe5Component"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbTriggerUe5Component"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbTriggerUe5Component.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.UndergroundComponent:
          (r = "UndergroundComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbUndergroundComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbUndergroundComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.VarComponent:
          (p = "VarComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbVarComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbVarComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.TriggerComponent:
          (a = "TriggerComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbTriggerComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbTriggerComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.HookLockPoint:
          (n = "HookLockPoint"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbHookLockPoint"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbHookLockPoint.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.TargetGearComponent:
          (r = "TargetGearComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbTargetGearComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbTargetGearComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.TargetGearGroupComponent:
          (p = "TargetGearGroupComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbTargetGearGroupComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbTargetGearGroupComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.ItemFoundation:
          (a = "ItemFoundation"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbItemFoundation"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbItemFoundation.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.ItemFoundation2:
          (n = "ItemFoundation2"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbItemFoundation2"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbItemFoundation2.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.PullingFoundation:
          (r = "PullingFoundation"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbPullingFoundation"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbPullingFoundation.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.JigsawItem:
          (p = "JigsawItem"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbJigsawItem"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbJigsawItem.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.JigsawFoundation:
          (a = "JigsawFoundation"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbJigsawFoundation"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbJigsawFoundation.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.CollectComponent:
          (n = "CollectComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbCollectComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbCollectComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.TeleControl2:
          (r = "TeleControl2"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbTeleControl2"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbTeleControl2.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.DestructibleItem:
          (p = "DestructibleItem"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbDestructibleItem"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbDestructibleItem.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.LevelPlayComponent:
          (a = "LevelPlayComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbLevelPlayComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbLevelPlayComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.VisionComponent:
          (n = "VisionComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbVisionComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbVisionComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.VisionCaptureComponent:
          (r = "VisionCaptureComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbVisionCaptureComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbVisionCaptureComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.ResetEntitiesPosComponent:
          (p = "ResetEntitiesPosComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbResetEntitiesPosComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbResetEntitiesPosComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.EntityGroupComponent:
          (a = "EntityGroupComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbEntityGroupComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbEntityGroupComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.AdsorbComponent:
          (n = "AdsorbComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbAdsorbComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbAdsorbComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.TeleportComponent:
          (r = "TeleportComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbTeleportComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbTeleportComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.TrampleComponent:
          (p = "TrampleComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbTrampleComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbTrampleComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.NpcPerformComponent:
          (a = "NpcPerformComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbNpcPerformComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbNpcPerformComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.InteractGearComponent:
          (n = "InteractGearComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbInteractGearComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbInteractGearComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.LiftComponent:
          (r = "LiftComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbLiftComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbLiftComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.FollowTrackComponent:
          (p = "FollowTrackComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbFollowTrackComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbFollowTrackComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.SceneItemLifeCycleComponent:
          (a = "SceneItemLifeCycleComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbSceneItemLifeCycleComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbSceneItemLifeCycleComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.BubbleComponent:
          (n = "BubbleComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbBubbleComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbBubbleComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.FightInteractComponent:
          (r = "FightInteractComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbFightInteractComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbFightInteractComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.NearbyTrackingComponent:
          (p = "NearbyTrackingComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbNearbyTrackingComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbNearbyTrackingComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.EntityPackageComponent:
          (a = "EntityPackageComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbEntityPackageComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbEntityPackageComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.SkyboxComponent:
          (n = "SkyboxComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbSkyboxComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSkyboxComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.StateHintComponent:
          (r = "StateHintComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbStateHintComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbStateHintComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.EntityVisibleComponent:
          (p = "EntityVisibleComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbEntityVisibleComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbEntityVisibleComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.CombinedVisibleGroupComponent:
          (a = "CombinedVisibleGroupComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbCombinedVisibleGroupComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbCombinedVisibleGroupComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.WeaponComponent:
          (n = "WeaponComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbWeaponComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbWeaponComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.DungeonEntryComponent:
          (r = "DungeonEntryComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbDungeonEntryComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbDungeonEntryComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.ResurrectionComponent:
          (p = "ResurrectionComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbResurrectionComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbResurrectionComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.BuffProducerComponent:
          (a = "BuffProducerComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbBuffProducerComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbBuffProducerComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.BuffConsumerComponent:
          (n = "BuffConsumerComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbBuffConsumerComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbBuffConsumerComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.GuideLineCreatorComponent:
          (r = "GuideLineCreatorComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbGuideLineCreatorComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbGuideLineCreatorComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.InteractAudioComponent:
          (p = "InteractAudioComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbInteractAudioComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbInteractAudioComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.DropComponent:
          (a = "DropComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbDropComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbDropComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.AdviseItemComponent:
          (n = "AdviseItemComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbAdviseItemComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbAdviseItemComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.VisionItemComponent:
          (r = "VisionItemComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbVisionItemComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbVisionItemComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.MonsterComponent:
          (p = "MonsterComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbMonsterComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbMonsterComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.CombatComponent:
          (a = "CombatComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbCombatComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbCombatComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.EntityListComponent:
          (n = "EntityListComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbEntityListComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbEntityListComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.AnimalComponent:
          (r = "AnimalComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbAnimalComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbAnimalComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.EntityAudioComponent:
          (p = "EntityAudioComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbEntityAudioComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbEntityAudioComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.EntityStateAudioComponent:
          (a = "EntityStateAudioComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbEntityStateAudioComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbEntityStateAudioComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.EntityCustomAudioComponent:
          (n = "EntityCustomAudioComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbEntityCustomAudioComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbEntityCustomAudioComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.SceneItemMovementComponent:
          (r = "SceneItemMovementComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbSceneItemMovementComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbSceneItemMovementComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.RangeComponent:
          (p = "RangeComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbRangeComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbRangeComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.TimelineTrackControlComponent:
          (a = "TimelineTrackControlComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbTimelineTrackControlComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbTimelineTrackControlComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.SplineComponent:
          (n = "SplineComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbSplineComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSplineComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.SceneActorRefComponent:
          (r = "SceneActorRefComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbSceneActorRefComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbSceneActorRefComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.EditCustomAoiComponent:
          (p = "EditCustomAoiComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbEditCustomAoiComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbEditCustomAoiComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.SceneBulletComponent:
          (a = "SceneBulletComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbSceneBulletComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbSceneBulletComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.TurntableControlComponent:
          (n = "TurntableControlComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbTurntableControlComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbTurntableControlComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.ConditionListenerComponent:
          (r = "ConditionListenerComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbConditionListenerComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbConditionListenerComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.AttachTargetComponent:
          (p = "AttachTargetComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbAttachTargetComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbAttachTargetComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.ReboundComponent:
          (a = "ReboundComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbReboundComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbReboundComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.LevitateMagnetComponent:
          (n = "LevitateMagnetComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbLevitateMagnetComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbLevitateMagnetComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.PhotoTargetComponent:
          (r = "PhotoTargetComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbPhotoTargetComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbPhotoTargetComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.AiAlertNotifyComponent:
          (p = "AiAlertNotifyComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbAiAlertNotifyComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbAiAlertNotifyComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.MonsterGachaItemComponent:
          (a = "MonsterGachaItemComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbMonsterGachaItemComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbMonsterGachaItemComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.MonsterGachaBaseComponent:
          (n = "MonsterGachaBaseComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbMonsterGachaBaseComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbMonsterGachaBaseComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.ProgressBarControlComponent:
          (r = "ProgressBarControlComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbProgressBarControlComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbProgressBarControlComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.ConveyorBeltComponent:
          (p = "ConveyorBeltComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbConveyorBeltComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbConveyorBeltComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.DynamicTeleportComponent:
          (a = "DynamicTeleportComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbDynamicTeleportComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbDynamicTeleportComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.ExploreSkillInteractComponent:
          (n = "ExploreSkillInteractComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbExploreSkillInteractComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbExploreSkillInteractComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.FanComponent:
          (r = "FanComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbFanComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbFanComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.ResetSelfPosComponent:
          (p = "ResetSelfPosComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbResetSelfPosComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbResetSelfPosComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.PasserbyNpcSpawnComponent:
          (a = "PasserbyNpcSpawnComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbPasserbyNpcSpawnComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbPasserbyNpcSpawnComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.ModelComponent:
          (n = "ModelComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbModelComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbModelComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.EntityBundleComponent:
          (r = "EntityBundleComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbEntityBundleComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbEntityBundleComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.BeamCastComponent:
          (p = "BeamCastComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbBeamCastComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbBeamCastComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.BeamReceiveComponent:
          (a = "BeamReceiveComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbBeamReceiveComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbBeamReceiveComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.TimeStopComponent:
          (n = "TimeStopComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbTimeStopComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbTimeStopComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.PortalComponent:
          (r = "PortalComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbPortalComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbPortalComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.NoRenderPortalComponent:
          (p = "NoRenderPortalComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbNoRenderPortalComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbNoRenderPortalComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.EffectAreaComponent:
          (a = "EffectAreaComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbEffectAreaComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbEffectAreaComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.PhysicsConstraintComponent:
          (n = "PhysicsConstraintComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbPhysicsConstraintComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbPhysicsConstraintComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.FollowShooterComponent:
          (r = "FollowShooterComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbFollowShooterComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbFollowShooterComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.ConnectorComponent:
          (p = "ConnectorComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbConnectorComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbConnectorComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.CharacterConnectorComponent:
          (a = "CharacterConnectorComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbCharacterConnectorComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbCharacterConnectorComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.HitComponent:
          (n = "HitComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbHitComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbHitComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.DynamicPortalCreatorComponent:
          (r = "DynamicPortalCreatorComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbDynamicPortalCreatorComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbDynamicPortalCreatorComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.AiGearStrategyComponent:
          (p = "AiGearStrategyComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbAiGearStrategyComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbAiGearStrategyComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.PickInteractComponent:
          (a = "PickInteractComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbPickInteractComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbPickInteractComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.ClientTriggerComponent:
          (n = "ClientTriggerComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbClientTriggerComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbClientTriggerComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.LocationSafetyComponent:
          (r = "LocationSafetyComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbLocationSafetyComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbLocationSafetyComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.BatchBulletCasterComponent:
          (p = "BatchBulletCasterComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbBatchBulletCasterComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbBatchBulletCasterComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.VehicleComponent:
          (a = "VehicleComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbVehicleComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbVehicleComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.EnrichmentAreaComponent:
          (n = "EnrichmentAreaComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbEnrichmentAreaComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbEnrichmentAreaComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.ChessmanComponent:
          (r = "ChessmanComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbChessmanComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbChessmanComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.MonitorComponent:
          (p = "MonitorComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbMonitorComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbMonitorComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.GroupAiComponent:
          (a = "GroupAiComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbGroupAiComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbGroupAiComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.InhalationAbilityComponent:
          (n = "InhalationAbilityComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbInhalationAbilityComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbInhalationAbilityComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.InhaledItemComponent:
          (r = "InhaledItemComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbInhaledItemComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbInhaledItemComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.AirPassageComponent:
          (p = "AirPassageComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbAirPassageComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbAirPassageComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.RenderSpecifiedRangeComponent:
          (a = "RenderSpecifiedRangeComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbRenderSpecifiedRangeComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbRenderSpecifiedRangeComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.LevelPrefabPerformComponent:
          (n = "LevelPrefabPerformComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbLevelPrefabPerformComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbLevelPrefabPerformComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.SceneItemAiComponent:
          (r = "SceneItemAiComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbSceneItemAiComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbSceneItemAiComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.GravityFlipComponent:
          (p = "GravityFlipComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbGravityFlipComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbGravityFlipComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.LevelSequenceFrameEventComponent:
          (a = "LevelSequenceFrameEventComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbLevelSequenceFrameEventComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbLevelSequenceFrameEventComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.LevelQteComponent:
          (n = "LevelQteComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbLevelQteComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbLevelQteComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.WalkingPatternComponent:
          (r = "WalkingPatternComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbWalkingPatternComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbWalkingPatternComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.LifePointCenterComponent:
          (p = "LifePointCenterComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbLifePointCenterComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbLifePointCenterComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.HackManagementComponent:
          (a = "HackManagementComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbHackManagementComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbHackManagementComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.ClientConditionListenerComponent:
          (n = "ClientConditionListenerComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbClientConditionListenerComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbClientConditionListenerComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.TemplateEntitySpawnerComponent:
          (r = "TemplateEntitySpawnerComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbTemplateEntitySpawnerComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbTemplateEntitySpawnerComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        case fb_component_1.UnionComponent.WindSourceComponent:
          (p = "WindSourceComponent"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              p,
            ));
          return a
            ? ((n = e.component(a)),
              (r = "./FbWindSourceComponent"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbWindSourceComponent.Create(n)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", p],
                )
              );
        case fb_component_1.UnionComponent.SlideRailComponent:
          (a = "SlideRailComponent"),
            (n = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              a,
            ));
          return n
            ? ((r = e.component(n)),
              (p = "./FbSlideRailComponent"),
              (n = ImportHelper_1.ImportHelper.GetModule(
                p,
                exports.requireModule,
              ))
                ? n.FbSlideRailComponent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", p],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", a],
                )
              );
        case fb_component_1.UnionComponent.CurveControlComponent:
          (n = "CurveControlComponent"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              n,
            ));
          return r
            ? ((p = e.component(r)),
              (a = "./FbCurveControlComponent"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbCurveControlComponent.Create(p)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", n],
                )
              );
        case fb_component_1.UnionComponent.EntityBatchRefreshComponent:
          (r = "EntityBatchRefreshComponent"),
            (p = ImportHelper_1.ImportHelper.CreateInstance(
              o,
              exports.requireModule,
              r,
            ));
          return p
            ? ((a = e.component(p)),
              (n = "./FbEntityBatchRefreshComponent"),
              (p = ImportHelper_1.ImportHelper.GetModule(
                n,
                exports.requireModule,
              ))
                ? p.FbEntityBatchRefreshComponent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取InstanceModule失败",
                      ["ComponentType", t],
                      ["InterfaceModulePath", n],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "创建fbObject失败",
                  ["ComponentType", t],
                  ["FbModulePath", o],
                  ["FbClassName", r],
                )
              );
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "未实现该Component的反序列", [
              "ComponentType",
              t,
            ]);
      }
    }
  }
}
exports.ComponentReadHelper = ComponentReadHelper;
//# sourceMappingURL=ComponentReadHelper.js.map
