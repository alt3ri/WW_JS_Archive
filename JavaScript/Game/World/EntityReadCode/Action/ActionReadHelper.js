"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActionReadHelper = exports.requireModule = void 0);
const fb_action_1 = require("../../EntityFb/fb-action"),
  fb_action_2 = require("../../EntityFb/fb-action"),
  Log_1 = require("../../../../Core/Common/Log"),
  ImportHelper_1 = require("../ImportHelper"),
  FB_ACTION_MODULE_PATH = "../../EntityFb/fb-action",
  requireModule = (o) => require(o);
exports.requireModule = requireModule;
class ActionReadHelper {
  static ReadActionParams(o) {
    if (o) {
      var t = o.paramsExtActionPage();
      if (-1 !== t) return ActionReadHelper["ReadActionParams" + t](o);
    }
  }
  static ReadActionParams0(o) {
    if (o) {
      var t = o.params0Type();
      switch (t) {
        case fb_action_1.UnionActionParams0.Interact:
          var e = "Interact",
            _ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            );
          return _
            ? ((_ = o.params0(_)),
              (r = "./FbInteract"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbInteract.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.AcceptCurrentQuest:
          var a = "AcceptCurrentQuest",
            _ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            );
          return _
            ? ((r = o.params0(_)),
              (e = "./FbAcceptCurrentQuest"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbAcceptCurrentQuest.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.AddFlowInteractOption:
          var _ = "AddFlowInteractOption",
            r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            );
          return r
            ? ((e = o.params0(r)),
              (a = "./FbAddFlowInteractOption"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbAddFlowInteractOption.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.AdjustTodTime:
          var r = "AdjustTodTime",
            e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            );
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbAdjustTodTime"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbAdjustTodTime.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.AwakeEntity:
          var e = "AwakeEntity",
            a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            );
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbAwakeEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbAwakeEntity.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.CalculateVar:
          (a = "CalculateVar"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbCalculateVar"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbCalculateVar.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RandomVar:
          (_ = "RandomVar"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbRandomVar"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbRandomVar.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.CallByCondition:
          (r = "CallByCondition"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbCallByCondition"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbCallByCondition.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.CallFunction:
          (e = "CallFunction"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbCallFunction"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbCallFunction.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.CameraLookAt:
          (a = "CameraLookAt"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbCameraLookAt"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbCameraLookAt.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.StopCameraLookAt:
          (_ = "StopCameraLookAt"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbStopCameraLookAt"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbStopCameraLookAt.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.EnableHostility:
          (r = "EnableHostility"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbEnableHostility"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbEnableHostility.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeActorState:
          (e = "ChangeActorState"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbChangeActorState"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbChangeActorState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeBehaviorState:
          (a = "ChangeBehaviorState"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbChangeBehaviorState"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbChangeBehaviorState.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeEntityState:
          (_ = o.paramsExtType0()),
            (r = "./UnionChangeEntityStateHelper"),
            (e = ImportHelper_1.ImportHelper.GetModule(
              r,
              exports.requireModule,
            ));
          return e
            ? ((a =
                e.UnionChangeEntityStateHelper.GetUnionChangeEntityStateObject(
                  _,
                )),
              e.UnionChangeEntityStateHelper.ReadUnionChangeEntityState(
                _,
                o.params0(a),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", r],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeNpcPerformState:
          (e = "ChangeNpcPerformState"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbChangeNpcPerformState"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbChangeNpcPerformState.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeInteractOptionText:
          (_ = "ChangeInteractOptionText"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbChangeInteractOptionText"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbChangeInteractOptionText.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeOtherState:
          (a = "ChangeOtherState"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbChangeOtherState"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbChangeOtherState.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeRandomState:
          (r = "ChangeRandomState"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbChangeRandomState"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbChangeRandomState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeState:
          (e = "ChangeState"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbChangeState"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbChangeState.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.Collect:
          (_ = "Collect"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbCollect"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbCollect.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.CompleteChildQuest:
          (a = "CompleteChildQuest"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbCompleteChildQuest"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbCompleteChildQuest.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.Destroy:
          (r = "Destroy"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbDestroy"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbDestroy.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.DestroyAllChild:
          (e = "DestroyAllChild"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbDestroyAllChild"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbDestroyAllChild.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.DestroyEntity:
          (_ = "DestroyEntity"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbDestroyEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbDestroyEntity.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.DestroySelf:
          (a = "DestroySelf"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbDestroySelf"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbDestroySelf.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.DoCalculate:
          (r = "DoCalculate"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbDoCalculate"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbDoCalculate.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.EnableFunction:
          (e = "EnableFunction"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbEnableFunction"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbEnableFunction.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.FaceToPos:
          (_ = "FaceToPos"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbFaceToPos"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbFaceToPos.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.FinishDoInteract:
          (a = "FinishDoInteract"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbFinishDoInteract"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbFinishDoInteract.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.FinishState:
          (r = "FinishState"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbFinishState"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbFinishState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.FinishTalk:
          (e = "FinishTalk"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbFinishTalk"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbFinishTalk.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.GetItem:
          (_ = "GetItem"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbGetItem"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbGetItem.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.DestroyQuestItem:
          (a = "DestroyQuestItem"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbDestroyQuestItem"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbDestroyQuestItem.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.GuideTrigger:
          (r = "GuideTrigger"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbGuideTrigger"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbGuideTrigger.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.CompleteGuide:
          (e = "CompleteGuide"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbCompleteGuide"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbCompleteGuide.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.Invoke:
          _ = ImportHelper_1.ImportHelper.CreateInstance(
            FB_ACTION_MODULE_PATH,
            exports.requireModule,
            "Invoke",
          );
          return _
            ? ((a = o.params0(_)),
              (r = "./FbInvoke"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbInvoke.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", "Invoke"],
                )
              );
        case fb_action_1.UnionActionParams0.JumpTalk:
          (_ = "JumpTalk"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbJumpTalk"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbJumpTalk.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.Log:
          e = ImportHelper_1.ImportHelper.CreateInstance(
            FB_ACTION_MODULE_PATH,
            exports.requireModule,
            "Log",
          );
          return e
            ? ((a = o.params0(e)),
              (r = "./FbLog"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbLog.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", "Log"],
                )
              );
        case fb_action_1.UnionActionParams0.MoveToPosA:
          (e = "MoveToPosA"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbMoveToPosA"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbMoveToPosA.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.MoveWithSpline:
          (_ = "MoveWithSpline"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbMoveWithSpline"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbMoveWithSpline.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.NewMoveWithSpline:
          (a = "NewMoveWithSpline"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbNewMoveWithSpline"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbNewMoveWithSpline.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.StopNewMoveWithSpline:
          (r = "StopNewMoveWithSpline"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbStopNewMoveWithSpline"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbStopNewMoveWithSpline.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.CharacterMoveToPoint:
          (e = "CharacterMoveToPoint"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbCharacterMoveToPoint"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbCharacterMoveToPoint.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.OpenSystemBoard:
          (_ = "OpenSystemBoard"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbOpenSystemBoard"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbOpenSystemBoard.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.OpenSystemFunction:
          (a = "OpenSystemFunction"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbOpenSystemFunction"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbOpenSystemFunction.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.PlayCustomSequence:
          (r = "PlayCustomSequence"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbPlayCustomSequence"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbPlayCustomSequence.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PlayerLookAt:
          (e = "PlayerLookAt"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbPlayerLookAt"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbPlayerLookAt.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.EntityLookAt:
          (_ = "EntityLookAt"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbEntityLookAt"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbEntityLookAt.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.CharacterLookAt:
          (a = "CharacterLookAt"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbCharacterLookAt"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbCharacterLookAt.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.EntityTurnTo:
          (r = "EntityTurnTo"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbEntityTurnTo"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbEntityTurnTo.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PlayFlow:
          (e = "PlayFlow"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbPlayFlow"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbPlayFlow.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.PlayMovie:
          (_ = "PlayMovie"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbPlayMovie"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbPlayMovie.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.PlayEffect:
          (a = "PlayEffect"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbPlayEffect"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbPlayEffect.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.PlayCommonEffect:
          (r = "PlayCommonEffect"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((_ = o.params0(e)),
              (a = "./FbPlayCommonEffect"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbPlayCommonEffect.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PlayMontage:
          (e = "PlayMontage"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((a = o.params0(_)),
              (r = "./FbPlayMontage"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbPlayMontage.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.PlaySequenceData:
          (_ = "PlaySequenceData"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((r = o.params0(a)),
              (e = "./FbPlaySequenceData"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbPlaySequenceData.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.PlayerInput:
          (a = "PlayerInput"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbPlayerInput"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbPlayerInput.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.Prompt:
          r = ImportHelper_1.ImportHelper.CreateInstance(
            FB_ACTION_MODULE_PATH,
            exports.requireModule,
            "Prompt",
          );
          return r
            ? ((e = o.params0(r)),
              (_ = "./FbPrompt"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbPrompt.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", "Prompt"],
                )
              );
        case fb_action_1.UnionActionParams0.AddPlayBubble:
          (r = "AddPlayBubble"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((e = o.params0(a)),
              (_ = "./FbAddPlayBubble"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbAddPlayBubble.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PlayBubble:
          (a = "PlayBubble"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return e
            ? ((_ = o.params0(e)),
              (r = "./FbPlayBubble"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbPlayBubble.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ClearPlayBubble:
          (e = "ClearPlayBubble"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((r = o.params0(_)),
              (a = "./FbClearPlayBubble"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbClearPlayBubble.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.EnableAI:
          (_ = "EnableAI"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((a = o.params0(r)),
              (e = "./FbEnableAI"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbEnableAI.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveFlowInteractOption:
          (r = "RemoveFlowInteractOption"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((e = o.params0(a)),
              (_ = "./FbRemoveFlowInteractOption"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbRemoveFlowInteractOption.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SendNpcMail:
          (a = "SendNpcMail"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return e
            ? ((_ = o.params0(e)),
              (r = "./FbSendNpcMail"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbSendNpcMail.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetBehaviorIsPaused:
          (e = "SetBehaviorIsPaused"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((r = o.params0(_)),
              (a = "./FbSetBehaviorIsPaused"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetBehaviorIsPaused.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetCameraMode:
          (_ = "SetCameraMode"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((a = o.params0(r)),
              (e = "./FbSetCameraMode"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbSetCameraMode.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetEntityVisible:
          (r = "SetEntityVisible"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((e = o.params0(a)),
              (_ = "./FbSetEntityVisible"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbSetEntityVisible.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SetEntityClientVisible:
          (a = "SetEntityClientVisible"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return e
            ? ((_ = o.params0(e)),
              (r = "./FbSetEntityClientVisible"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbSetEntityClientVisible.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetEntityClientVisibleSave:
          (e = "SetEntityClientVisibleSave"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((r = o.params0(_)),
              (a = "./FbSetEntityClientVisibleSave"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetEntityClientVisibleSave.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetHeadIconVisible:
          (_ = "SetHeadIconVisible"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((a = o.params0(r)),
              (e = "./FbSetHeadIconVisible"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbSetHeadIconVisible.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetMoveSpeed:
          (r = "SetMoveSpeed"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((e = o.params0(a)),
              (_ = "./FbSetMoveSpeed"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbSetMoveSpeed.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SetNumberVar:
          (a = "SetNumberVar"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return e
            ? ((_ = o.params0(e)),
              (r = "./FbSetNumberVar"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbSetNumberVar.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetPlotMode:
          (e = "SetPlotMode"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return _
            ? ((r = o.params0(_)),
              (a = "./FbSetPlotMode"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetPlotMode.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetPosA:
          (_ = "SetPosA"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((a = o.params0(r)),
              (e = "./FbSetPosA"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbSetPosA.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetVar:
          r = ImportHelper_1.ImportHelper.CreateInstance(
            FB_ACTION_MODULE_PATH,
            exports.requireModule,
            "SetVar",
          );
          return r
            ? ((a = o.params0(r)),
              (e = "./FbSetVar"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbSetVar.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", "SetVar"],
                )
              );
        case fb_action_1.UnionActionParams0.ShowCenterText:
          (r = "ShowCenterText"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((a = o.params0(_)),
              (e = "./FbShowCenterText"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbShowCenterText.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ShowMessage:
          (_ = "ShowMessage"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((e = o.params0(a)),
              (r = "./FbShowMessage"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbShowMessage.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ShowTalk:
          (a = "ShowTalk"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return e
            ? ((r = o.params0(e)),
              (_ = "./FbShowTalk"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbShowTalk.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SimpleMove:
          (e = "SimpleMove"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((_ = o.params0(r)),
              (a = "./FbSimpleMove"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSimpleMove.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SpawnChild:
          (r = "SpawnChild"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((a = o.params0(_)),
              (e = "./FbSpawnChild"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbSpawnChild.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SpawnEntity:
          (_ = "SpawnEntity"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return a
            ? ((e = o.params0(a)),
              (r = "./FbSpawnEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbSpawnEntity.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SyncVarToActorState:
          (a = "SyncVarToActorState"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return e
            ? ((r = o.params0(e)),
              (_ = "./FbSyncVarToActorState"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbSyncVarToActorState.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.Wait:
          e = ImportHelper_1.ImportHelper.CreateInstance(
            FB_ACTION_MODULE_PATH,
            exports.requireModule,
            "Wait",
          );
          return e
            ? ((r = o.params0(e)),
              (_ = "./FbWait"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbWait.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", "Wait"],
                )
              );
        case fb_action_1.UnionActionParams0.AddBuffToEntity:
          (e = "AddBuffToEntity"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbAddBuffToEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbAddBuffToEntity.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.AddBuffToPlayer:
          (a = "AddBuffToPlayer"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbAddBuffToPlayer"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbAddBuffToPlayer.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.AddBuffToFollowShooter:
          (r = "AddBuffToFollowShooter"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbAddBuffToFollowShooter"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbAddBuffToFollowShooter.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.LockEntity:
          (_ = "LockEntity"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbLockEntity"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbLockEntity.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.UnlockEntity:
          (e = "UnlockEntity"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbUnlockEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbUnlockEntity.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetForceLock:
          (a = "SetForceLock"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbSetForceLock"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbSetForceLock.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetAreaState:
          (r = "SetAreaState"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbSetAreaState"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetAreaState.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SetWuYinQuState:
          (_ = "SetWuYinQuState"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbSetWuYinQuState"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbSetWuYinQuState.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveBuffFromEntity:
          (e = "RemoveBuffFromEntity"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbRemoveBuffFromEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbRemoveBuffFromEntity.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveBuffFromPlayer:
          (a = "RemoveBuffFromPlayer"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbRemoveBuffFromPlayer"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbRemoveBuffFromPlayer.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetPlayerMoveControl:
          (r = "SetPlayerMoveControl"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbSetPlayerMoveControl"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetPlayerMoveControl.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.UnlockTeleportTrigger:
          (_ = "UnlockTeleportTrigger"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbUnlockTeleportTrigger"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbUnlockTeleportTrigger.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeTeamPosition:
          (e = "ChangeTeamPosition"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbChangeTeamPosition"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbChangeTeamPosition.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ClaimLevelPlayReward:
          (a = "ClaimLevelPlayReward"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbClaimLevelPlayReward"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbClaimLevelPlayReward.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetReviveRegion:
          (r = "SetReviveRegion"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbSetReviveRegion"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetReviveRegion.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PromptQuestChapterUI:
          (_ = "PromptQuestChapterUI"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbPromptQuestChapterUI"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbPromptQuestChapterUI.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.FireBullet:
          (e = "FireBullet"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbFireBullet"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbFireBullet.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.FireBulletEffect:
          (a = "FireBulletEffect"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbFireBulletEffect"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbFireBulletEffect.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetPlayerPos:
          (r = "SetPlayerPos"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbSetPlayerPos"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbSetPlayerPos.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ClientSetPlayerPos:
          (_ = "ClientSetPlayerPos"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbClientSetPlayerPos"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbClientSetPlayerPos.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ClientPreEnableSubLevels:
          (e = "ClientPreEnableSubLevels"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbClientPreEnableSubLevels"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbClientPreEnableSubLevels.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeSelfEntityState:
          (a = "ChangeSelfEntityState"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbChangeSelfEntityState"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbChangeSelfEntityState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.InterludeActions:
          (r = "InterludeActions"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbInterludeActions"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbInterludeActions.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.AddBuffToTriggeredEntity:
          (_ = "AddBuffToTriggeredEntity"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbAddBuffToTriggeredEntity"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbAddBuffToTriggeredEntity.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveBuffToTriggeredEntity:
          (e = "RemoveBuffToTriggeredEntity"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbRemoveBuffToTriggeredEntity"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbRemoveBuffToTriggeredEntity.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.DetectTrigger:
          (a = "DetectTrigger"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbDetectTrigger"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbDetectTrigger.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ItemFoundationMatch:
          (r = "ItemFoundationMatch"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbItemFoundationMatch"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbItemFoundationMatch.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SetBattleState:
          (_ = "SetBattleState"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbSetBattleState"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbSetBattleState.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ExecBattleAction:
          (e = "ExecBattleAction"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbExecBattleAction"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbExecBattleAction.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.WaitBattleCondition:
          (a = "WaitBattleCondition"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbWaitBattleCondition"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbWaitBattleCondition.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.UnlockSystemItem:
          (r = "UnlockSystemItem"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbUnlockSystemItem"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbUnlockSystemItem.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.RunActions:
          (_ = "RunActions"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbRunActions"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbRunActions.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.CommonTip:
          (e = "CommonTip"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbCommonTip"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbCommonTip.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.CommonTip2:
          (a = "CommonTip2"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbCommonTip2"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbCommonTip2.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.EnableNearbyTracking:
          (r = "EnableNearbyTracking"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbEnableNearbyTracking"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbEnableNearbyTracking.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.EnableLevelPlay:
          (_ = "EnableLevelPlay"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbEnableLevelPlay"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbEnableLevelPlay.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.UnLimitPlayerOperation:
          (e = "UnLimitPlayerOperation"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbUnLimitPlayerOperation"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbUnLimitPlayerOperation.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.LimitPlayerOperation:
          (a = "LimitPlayerOperation"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbLimitPlayerOperation"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbLimitPlayerOperation.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetPlayerOperationRestriction:
          (r = o.paramsExtType0()),
            (_ = "./UnionSetPlayerOperationRestrictionHelper"),
            (e = ImportHelper_1.ImportHelper.GetModule(
              _,
              exports.requireModule,
            ));
          return e
            ? ((a =
                e.UnionSetPlayerOperationRestrictionHelper.GetUnionSetPlayerOperationRestrictionObject(
                  r,
                )),
              e.UnionSetPlayerOperationRestrictionHelper.ReadUnionSetPlayerOperationRestriction(
                r,
                o.params0(a),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", _],
                )
              );
        case fb_action_1.UnionActionParams0.LeisureInteract:
          (e = "LeisureInteract"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbLeisureInteract"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbLeisureInteract.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.NpcLeisureInteract:
          (r = "NpcLeisureInteract"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbNpcLeisureInteract"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbNpcLeisureInteract.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ChangePhantom:
          (a = "ChangePhantom"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbChangePhantom"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbChangePhantom.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RestorePhantom:
          (_ = "RestorePhantom"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbRestorePhantom"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbRestorePhantom.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.TakePlotPhoto:
          (e = "TakePlotPhoto"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbTakePlotPhoto"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbTakePlotPhoto.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.OpenQteAction:
          (r = "OpenQteAction"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbOpenQteAction"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbOpenQteAction.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PreloadAction:
          (a = "PreloadAction"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbPreloadAction"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbPreloadAction.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RemovePreloadResourceAction:
          (_ = "RemovePreloadResourceAction"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbRemovePreloadResourceAction"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbRemovePreloadResourceAction.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ExecAlertSystemAction:
          (e = "ExecAlertSystemAction"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbExecAlertSystemAction"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbExecAlertSystemAction.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeEntityCamp:
          (r = "ChangeEntityCamp"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbChangeEntityCamp"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbChangeEntityCamp.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.RecordDungeonEvent:
          (a = "RecordDungeonEvent"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbRecordDungeonEvent"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbRecordDungeonEvent.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ResetLevelPlay:
          (_ = "ResetLevelPlay"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbResetLevelPlay"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbResetLevelPlay.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.GetRewardByInteract:
          (e = "GetRewardByInteract"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbGetRewardByInteract"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbGetRewardByInteract.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.GuestOperateUiAnimation:
          (r = "GuestOperateUiAnimation"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbGuestOperateUiAnimation"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbGuestOperateUiAnimation.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.VehicleEnter:
          (a = "VehicleEnter"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbVehicleEnter"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbVehicleEnter.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.EnterNpcVehicle:
          (_ = "EnterNpcVehicle"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbEnterNpcVehicle"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbEnterNpcVehicle.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.VehicleExitPlayer:
          (e = "VehicleExitPlayer"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbVehicleExitPlayer"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbVehicleExitPlayer.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.VehicleExitNpc:
          (r = "VehicleExitNpc"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbVehicleExitNpc"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbVehicleExitNpc.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.TeleportVehicle:
          (a = "TeleportVehicle"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbTeleportVehicle"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbTeleportVehicle.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.VehiclePlayPassengerVoice:
          (_ = "VehiclePlayPassengerVoice"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbVehiclePlayPassengerVoice"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbVehiclePlayPassengerVoice.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.VehicleWaterfallClimbing:
          (e = "VehicleWaterfallClimbing"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbVehicleWaterfallClimbing"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbVehicleWaterfallClimbing.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.TeleportToAndEnterVehicle:
          (r = "TeleportToAndEnterVehicle"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbTeleportToAndEnterVehicle"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbTeleportToAndEnterVehicle.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.VehicleMoveWithPathLine:
          (a = "VehicleMoveWithPathLine"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbVehicleMoveWithPathLine"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbVehicleMoveWithPathLine.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.VehicleSprint:
          (_ = "VehicleSprint"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbVehicleSprint"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbVehicleSprint.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetAreaTimeState:
          (e = "SetAreaTimeState"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbSetAreaTimeState"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbSetAreaTimeState.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SlideRailStart:
          (r = "SlideRailStart"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbSlideRailStart"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbSlideRailStart.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.BvbSendSystemEvent:
          (a = "BvbSendSystemEvent"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbBvbSendSystemEvent"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbBvbSendSystemEvent.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.TeleportDungeon:
          (_ = "TeleportDungeon"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbTeleportDungeon"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbTeleportDungeon.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SettlementDungeon:
          (e = "SettlementDungeon"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbSettlementDungeon"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbSettlementDungeon.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ClaimDungeonReward:
          (r = "ClaimDungeonReward"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbClaimDungeonReward"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbClaimDungeonReward.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ExitDungeon:
          (a = "ExitDungeon"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbExitDungeon"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbExitDungeon.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.UnlockDungeonEntry:
          (_ = "UnlockDungeonEntry"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbUnlockDungeonEntry"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbUnlockDungeonEntry.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.FinishDungeon:
          (e = "FinishDungeon"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbFinishDungeon"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbFinishDungeon.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.StartFlowTemplate:
          (r = "StartFlowTemplate"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbStartFlowTemplate"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbStartFlowTemplate.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.BeginFlowTemplate:
          (a = "BeginFlowTemplate"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbBeginFlowTemplate"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbBeginFlowTemplate.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeFlowTemplate:
          (_ = "ChangeFlowTemplate"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbChangeFlowTemplate"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbChangeFlowTemplate.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetFlowTemplate:
          (e = "SetFlowTemplate"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbSetFlowTemplate"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbSetFlowTemplate.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.EndFlowTemplate:
          (r = "EndFlowTemplate"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbEndFlowTemplate"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbEndFlowTemplate.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.CloseFlowTemplate:
          (a = "CloseFlowTemplate"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbCloseFlowTemplate"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbCloseFlowTemplate.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SendAiEvent:
          (_ = "SendAiEvent"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbSendAiEvent"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbSendAiEvent.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.FadeInScreen:
          (e = "FadeInScreen"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbFadeInScreen"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbFadeInScreen.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.FadeOutScreen:
          (r = "FadeOutScreen"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbFadeOutScreen"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbFadeOutScreen.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeFightTeam:
          (a = "ChangeFightTeam"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbChangeFightTeam"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbChangeFightTeam.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ManualOccupations:
          (_ = "ManualOccupations"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbManualOccupations"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbManualOccupations.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.AddTrialCharacter:
          (e = "AddTrialCharacter"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbAddTrialCharacter"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbAddTrialCharacter.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveTrialCharacter:
          (r = "RemoveTrialCharacter"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbRemoveTrialCharacter"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbRemoveTrialCharacter.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.AddGuestCharacter:
          (a = "AddGuestCharacter"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbAddGuestCharacter"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbAddGuestCharacter.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveGuestCharacter:
          (_ = "RemoveGuestCharacter"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbRemoveGuestCharacter"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbRemoveGuestCharacter.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.AddTrialFollowShooter:
          (e = "AddTrialFollowShooter"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbAddTrialFollowShooter"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbAddTrialFollowShooter.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.RemoveTrialFollowShooter:
          (r = "RemoveTrialFollowShooter"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbRemoveTrialFollowShooter"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbRemoveTrialFollowShooter.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.DestroyQuest:
          (a = "DestroyQuest"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbDestroyQuest"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbDestroyQuest.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetCameraAnim:
          (_ = "SetCameraAnim"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbSetCameraAnim"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbSetCameraAnim.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.RotatorEntity:
          (e = "RotatorEntity"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbRotatorEntity"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbRotatorEntity.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.TraceSpline:
          (r = "TraceSpline"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbTraceSpline"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbTraceSpline.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ToggleScanSplineEffect:
          (a = o.paramsExtType0()),
            (_ = "./UnionToggleScanSplineEffectHelper"),
            (e = ImportHelper_1.ImportHelper.GetModule(
              _,
              exports.requireModule,
            ));
          return e
            ? ((r =
                e.UnionToggleScanSplineEffectHelper.GetUnionToggleScanSplineEffectObject(
                  a,
                )),
              e.UnionToggleScanSplineEffectHelper.ReadUnionToggleScanSplineEffect(
                a,
                o.params0(r),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", _],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeTimer:
          (e = "ChangeTimer"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbChangeTimer"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbChangeTimer.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ToggleTimerPauseState:
          (a = "ToggleTimerPauseState"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbToggleTimerPauseState"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbToggleTimerPauseState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.EnableSystem:
          (r = "EnableSystem"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbEnableSystem"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbEnableSystem.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.PostAkEvent:
          (_ = "PostAkEvent"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbPostAkEvent"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbPostAkEvent.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.MoveSceneItem:
          (e = "MoveSceneItem"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbMoveSceneItem"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbMoveSceneItem.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.StopSceneItemMove:
          (a = "StopSceneItemMove"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbStopSceneItemMove"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbStopSceneItemMove.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeLiftTarget:
          (r = "ChangeLiftTarget"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return _
            ? ((e = o.params0(_)),
              (a = "./FbChangeLiftTarget"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? _.FbChangeLiftTarget.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.HideByRangeInFlow:
          (_ = "HideByRangeInFlow"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((a = o.params0(e)),
              (r = "./FbHideByRangeInFlow"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? e.FbHideByRangeInFlow.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.OpenSimpleGameplay:
          (e = "OpenSimpleGameplay"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((r = o.params0(a)),
              (_ = "./FbOpenSimpleGameplay"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? a.FbOpenSimpleGameplay.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeActorTalker:
          (a = "ChangeActorTalker"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return r
            ? ((_ = o.params0(r)),
              (e = "./FbChangeActorTalker"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? r.FbChangeActorTalker.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SwitchSubLevels:
          (r = o.paramsExtType0()),
            (_ = "./UnionSwitchSubLevelsHelper"),
            (e = ImportHelper_1.ImportHelper.GetModule(
              _,
              exports.requireModule,
            ));
          return e
            ? ((a =
                e.UnionSwitchSubLevelsHelper.GetUnionSwitchSubLevelsObject(r)),
              e.UnionSwitchSubLevelsHelper.ReadUnionSwitchSubLevels(
                r,
                o.params0(a),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", _],
                )
              );
        case fb_action_1.UnionActionParams0.SwitchDataLayers:
          (e = "SwitchDataLayers"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbSwitchDataLayers"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbSwitchDataLayers.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ActivateResetPoint:
          (r = "ActivateResetPoint"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbActivateResetPoint"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbActivateResetPoint.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.TeleportToLatestResetPoint:
          (a = "TeleportToLatestResetPoint"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbTeleportToLatestResetPoint"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbTeleportToLatestResetPoint.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetWeather:
          (_ = "SetWeather"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbSetWeather"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbSetWeather.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetTimeLockState:
          (e = "SetTimeLockState"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbSetTimeLockState"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbSetTimeLockState.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetWeatherLockState:
          (r = "SetWeatherLockState"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbSetWeatherLockState"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbSetWeatherLockState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.AdjustPlayerCamera:
          (a = "AdjustPlayerCamera"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbAdjustPlayerCamera"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbAdjustPlayerCamera.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RestorePlayerCameraAdjustment:
          (_ = "RestorePlayerCameraAdjustment"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbRestorePlayerCameraAdjustment"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbRestorePlayerCameraAdjustment.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ResetPlayerCameraFocus:
          (e = "ResetPlayerCameraFocus"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbResetPlayerCameraFocus"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbResetPlayerCameraFocus.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.UsePhantomSkill:
          (r = "UsePhantomSkill"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbUsePhantomSkill"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbUsePhantomSkill.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ChangePhantomFormation:
          (a = "ChangePhantomFormation"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbChangePhantomFormation"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbChangePhantomFormation.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RestorePhantomFormation:
          (_ = "RestorePhantomFormation"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbRestorePhantomFormation"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbRestorePhantomFormation.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.EnterOrbitalCamera:
          (e = "EnterOrbitalCamera"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbEnterOrbitalCamera"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbEnterOrbitalCamera.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ExitOrbitalCamera:
          (r = "ExitOrbitalCamera"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbExitOrbitalCamera"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbExitOrbitalCamera.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.EnableSplineMoveModel:
          (a = "EnableSplineMoveModel"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbEnableSplineMoveModel"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbEnableSplineMoveModel.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetSportsState:
          (_ = "SetSportsState"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbSetSportsState"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbSetSportsState.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.PlayLevelSequence:
          (e = "PlayLevelSequence"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbPlayLevelSequence"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbPlayLevelSequence.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetExploreState:
          (r = "SetExploreState"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbSetExploreState"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbSetExploreState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.RogueGotoNextFloor:
          (a = "RogueGotoNextFloor"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbRogueGotoNextFloor"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbRogueGotoNextFloor.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.RogueSelectRoom:
          (_ = "RogueSelectRoom"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbRogueSelectRoom"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbRogueSelectRoom.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.RogueActivatePortal:
          (e = "RogueActivatePortal"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbRogueActivatePortal"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbRogueActivatePortal.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.RogueReceiveReward:
          (r = "RogueReceiveReward"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbRogueReceiveReward"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbRogueReceiveReward.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.EnableAoiNotify:
          (a = "EnableAoiNotify"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbEnableAoiNotify"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbEnableAoiNotify.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ChangeEntityPrefabPerformance:
          (_ = o.paramsExtType0()),
            (e = "./UnionChangeEntityPrefabPerformanceHelper"),
            (r = ImportHelper_1.ImportHelper.GetModule(
              e,
              exports.requireModule,
            ));
          return r
            ? ((a =
                r.UnionChangeEntityPrefabPerformanceHelper.GetUnionChangeEntityPrefabPerformanceObject(
                  _,
                )),
              r.UnionChangeEntityPrefabPerformanceHelper.ReadUnionChangeEntityPrefabPerformance(
                _,
                o.params0(a),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", e],
                )
              );
        case fb_action_1.UnionActionParams0.ModifySceneItemAttributeTag:
          (r = o.paramsExtType0()),
            (_ = "./UnionModifySceneItemAttributeTagHelper"),
            (a = ImportHelper_1.ImportHelper.GetModule(
              _,
              exports.requireModule,
            ));
          return a
            ? ((e =
                a.UnionModifySceneItemAttributeTagHelper.GetUnionModifySceneItemAttributeTagObject(
                  r,
                )),
              a.UnionModifySceneItemAttributeTagHelper.ReadUnionModifySceneItemAttributeTag(
                r,
                o.params0(e),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", _],
                )
              );
        case fb_action_1.UnionActionParams0.ToggleMapMarkState:
          (a = o.paramsExtType0()),
            (r = "./UnionToggleMapMarkStateHelper"),
            (e = ImportHelper_1.ImportHelper.GetModule(
              r,
              exports.requireModule,
            ));
          return e
            ? ((_ =
                e.UnionToggleMapMarkStateHelper.GetUnionToggleMapMarkStateObject(
                  a,
                )),
              e.UnionToggleMapMarkStateHelper.ReadUnionToggleMapMarkState(
                a,
                o.params0(_),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", r],
                )
              );
        case fb_action_1.UnionActionParams0.FocusOnMapMark:
          (e = "FocusOnMapMark"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbFocusOnMapMark"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbFocusOnMapMark.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.EnableTemporaryTeleport:
          (a = "EnableTemporaryTeleport"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbEnableTemporaryTeleport"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbEnableTemporaryTeleport.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetTeleControl:
          (_ = "SetTeleControl"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbSetTeleControl"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSetTeleControl.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ActiveAntiGravitySafePoint:
          (r = "ActiveAntiGravitySafePoint"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbActiveAntiGravitySafePoint"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbActiveAntiGravitySafePoint.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ClearFishingCabinInSaleItems:
          (e = "ClearFishingCabinInSaleItems"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbClearFishingCabinInSaleItems"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbClearFishingCabinInSaleItems.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.AcceptFishingEntrust:
          (a = "AcceptFishingEntrust"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbAcceptFishingEntrust"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbAcceptFishingEntrust.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.DestroyFishingBoat:
          (_ = "DestroyFishingBoat"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbDestroyFishingBoat"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbDestroyFishingBoat.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetSpineAnimation:
          (r = "SetSpineAnimation"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbSetSpineAnimation"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbSetSpineAnimation.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.DangoAbyssActivatePortal:
          (e = "DangoAbyssActivatePortal"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbDangoAbyssActivatePortal"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbDangoAbyssActivatePortal.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.DangoAbyssGotoNextFloor:
          (a = "DangoAbyssGotoNextFloor"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbDangoAbyssGotoNextFloor"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbDangoAbyssGotoNextFloor.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.DangoAbyssCreateRewardTreasureBox:
          (_ = "DangoAbyssCreateRewardTreasureBox"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbDangoAbyssCreateRewardTreasureBox"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbDangoAbyssCreateRewardTreasureBox.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.DangoAbyssReceiveReward:
          (r = "DangoAbyssReceiveReward"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbDangoAbyssReceiveReward"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbDangoAbyssReceiveReward.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.SetTimeScale:
          (e = "SetTimeScale"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbSetTimeScale"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbSetTimeScale.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.EnableActor:
          (a = "EnableActor"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbEnableActor"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbEnableActor.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ModifyActorMaterial:
          (_ = "ModifyActorMaterial"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbModifyActorMaterial"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbModifyActorMaterial.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ToggleAirWall:
          (r = "ToggleAirWall"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbToggleAirWall"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbToggleAirWall.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.TriggerCameraShake:
          (e = "TriggerCameraShake"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbTriggerCameraShake"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbTriggerCameraShake.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.CreatePrefab:
          (a = "CreatePrefab"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbCreatePrefab"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbCreatePrefab.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.DestroyPrefab:
          (_ = "DestroyPrefab"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbDestroyPrefab"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbDestroyPrefab.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.PlayRegisteredMontage:
          (r = "PlayRegisteredMontage"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbPlayRegisteredMontage"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbPlayRegisteredMontage.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.RecoverDurability:
          (e = "RecoverDurability"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params0(a)),
              (r = "./FbRecoverDurability"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbRecoverDurability.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetRegionConfig:
          (a = "SetRegionConfig"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params0(_)),
              (e = "./FbSetRegionConfig"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbSetRegionConfig.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.SetJigsawItem:
          (_ = "SetJigsawItem"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params0(r)),
              (a = "./FbSetJigsawItem"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSetJigsawItem.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetJigsawFoundation:
          (r = "SetJigsawFoundation"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params0(e)),
              (_ = "./FbSetJigsawFoundation"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbSetJigsawFoundation.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ToggleHighlightExploreUi:
          (e = o.paramsExtType0()),
            (a = "./UnionHighlightExploreSkillIconHelper"),
            (_ = ImportHelper_1.ImportHelper.GetModule(
              a,
              exports.requireModule,
            ));
          return _
            ? ((r =
                _.UnionHighlightExploreSkillIconHelper.GetUnionHighlightExploreSkillIconObject(
                  e,
                )),
              _.UnionHighlightExploreSkillIconHelper.ReadUnionHighlightExploreSkillIcon(
                e,
                o.params0(r),
              ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "获取unionModule失败",
                  ["ParamsType", t],
                  ["UnionModulePath", a],
                )
              );
        case fb_action_1.UnionActionParams0.ResetEntity:
          (_ = "ResetEntity"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbResetEntity"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbResetEntity.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.PlayDynamicSettlement:
          (e = "PlayDynamicSettlement"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbPlayDynamicSettlement"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbPlayDynamicSettlement.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.SetInteractionLockState:
          (r = "SetInteractionLockState"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbSetInteractionLockState"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbSetInteractionLockState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.FinishCondition:
          (a = "FinishCondition"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbFinishCondition"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbFinishCondition.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ClearEntityVisibleTag:
          (_ = "ClearEntityVisibleTag"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbClearEntityVisibleTag"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbClearEntityVisibleTag.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.SetEntityPos:
          (e = "SetEntityPos"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbSetEntityPos"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbSetEntityPos.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.ResetEntityPos:
          (r = "ResetEntityPos"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbResetEntityPos"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbResetEntityPos.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.ServerSetPlayerPos:
          (a = "ServerSetPlayerPos"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbServerSetPlayerPos"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbServerSetPlayerPos.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.FixTeleControllerPos:
          (_ = "FixTeleControllerPos"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbFixTeleControllerPos"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbFixTeleControllerPos.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.CustomJson:
          (e = "CustomJson"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbCustomJson"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbCustomJson.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.FixFoundationRelation:
          (r = "FixFoundationRelation"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbFixFoundationRelation"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbFixFoundationRelation.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_1.UnionActionParams0.FixShowTargetRange:
          (a = "FixShowTargetRange"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((e = o.params0(_)),
              (r = "./FbFixShowTargetRange"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? _.FbFixShowTargetRange.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_1.UnionActionParams0.ForceOccupations:
          (_ = "ForceOccupations"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return e
            ? ((r = o.params0(e)),
              (a = "./FbForceOccupations"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? e.FbForceOccupations.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_1.UnionActionParams0.ServerForceEnableLevelPlay:
          (e = "ServerForceEnableLevelPlay"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return r
            ? ((a = o.params0(r)),
              (_ = "./FbServerForceEnableLevelPlay"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? r.FbServerForceEnableLevelPlay.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_1.UnionActionParams0.TeleportDungeonPos:
          (r = "TeleportDungeonPos"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return a
            ? ((_ = o.params0(a)),
              (e = "./FbTeleportDungeonPos"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? a.FbTeleportDungeonPos.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "未实现该Action的反序列化", [
              "ActionType",
              t,
            ]);
      }
    }
  }
  static ReadActionParams1(o) {
    if (o) {
      var t = o.params1Type();
      switch (t) {
        case fb_action_2.UnionActionParams1.SetAudioState:
          var e = "SetAudioState",
            _ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            );
          return _
            ? ((_ = o.params1(_)),
              (r = "./FbSetAudioState"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbSetAudioState.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_2.UnionActionParams1.PerformerAiSplineMove:
          var a = "PerformerAiSplineMove",
            _ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            );
          return _
            ? ((r = o.params1(_)),
              (e = "./FbPerformerAiSplineMove"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbPerformerAiSplineMove.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_2.UnionActionParams1.PerformerAiMoveTo:
          var _ = "PerformerAiMoveTo",
            r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            );
          return r
            ? ((e = o.params1(r)),
              (a = "./FbPerformerAiMoveTo"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbPerformerAiMoveTo.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_2.UnionActionParams1.HideTargetRange:
          var r = "HideTargetRange",
            e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            );
          return e
            ? ((a = o.params1(e)),
              (_ = "./FbHideTargetRange"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbHideTargetRange.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_2.UnionActionParams1.ShowTargetRange:
          var e = "ShowTargetRange",
            a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            );
          return a
            ? ((_ = o.params1(a)),
              (r = "./FbShowTargetRange"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbShowTargetRange.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_2.UnionActionParams1.HideSpecificEntities:
          (a = "HideSpecificEntities"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params1(_)),
              (e = "./FbHideSpecificEntities"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbHideSpecificEntities.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_2.UnionActionParams1.ShowSpecificEntities:
          (_ = "ShowSpecificEntities"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params1(r)),
              (a = "./FbShowSpecificEntities"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbShowSpecificEntities.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_2.UnionActionParams1.HideGroup:
          (r = "HideGroup"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params1(e)),
              (_ = "./FbHideGroup"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbHideGroup.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_2.UnionActionParams1.ShowHidedGroup:
          (e = "ShowHidedGroup"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params1(a)),
              (r = "./FbShowHidedGroup"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbShowHidedGroup.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_2.UnionActionParams1.ExecResurrection:
          (a = "ExecResurrection"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params1(_)),
              (e = "./FbExecResurrection"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbExecResurrection.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_2.UnionActionParams1.OpenSystemBoardWithReturn:
          (_ = "OpenSystemBoardWithReturn"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params1(r)),
              (a = "./FbOpenSystemBoardWithReturn"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbOpenSystemBoardWithReturn.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_2.UnionActionParams1.ExecRiskHarvestEffect:
          (r = "ExecRiskHarvestEffect"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params1(e)),
              (_ = "./FbExecRiskHarvestEffect"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbExecRiskHarvestEffect.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        case fb_action_2.UnionActionParams1.MowingTowerGotoNextFloor:
          (e = "MowingTowerGotoNextFloor"),
            (a = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              e,
            ));
          return a
            ? ((_ = o.params1(a)),
              (r = "./FbMowingTowerGotoNextFloor"),
              (a = ImportHelper_1.ImportHelper.GetModule(
                r,
                exports.requireModule,
              ))
                ? a.FbMowingTowerGotoNextFloor.Create(_)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", r],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", e],
                )
              );
        case fb_action_2.UnionActionParams1.SlashAndTowerGotoNextFloor:
          (a = "SlashAndTowerGotoNextFloor"),
            (_ = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              a,
            ));
          return _
            ? ((r = o.params1(_)),
              (e = "./FbSlashAndTowerGotoNextFloor"),
              (_ = ImportHelper_1.ImportHelper.GetModule(
                e,
                exports.requireModule,
              ))
                ? _.FbSlashAndTowerGotoNextFloor.Create(r)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", e],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", a],
                )
              );
        case fb_action_2.UnionActionParams1.SummonEntity:
          (_ = "SummonEntity"),
            (r = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              _,
            ));
          return r
            ? ((e = o.params1(r)),
              (a = "./FbSummonEntity"),
              (r = ImportHelper_1.ImportHelper.GetModule(
                a,
                exports.requireModule,
              ))
                ? r.FbSummonEntity.Create(e)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", a],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", _],
                )
              );
        case fb_action_2.UnionActionParams1.SetupMoraleSystem:
          (r = "SetupMoraleSystem"),
            (e = ImportHelper_1.ImportHelper.CreateInstance(
              FB_ACTION_MODULE_PATH,
              exports.requireModule,
              r,
            ));
          return e
            ? ((a = o.params1(e)),
              (_ = "./FbSetupMoraleSystem"),
              (e = ImportHelper_1.ImportHelper.GetModule(
                _,
                exports.requireModule,
              ))
                ? e.FbSetupMoraleSystem.Create(a)
                : void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "获取actionModule失败",
                      ["ParamsType", t],
                      ["ActionModulePath", _],
                    )
                  ))
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "fbActionObject为空",
                  ["ParamsType", t],
                  ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH],
                  ["ActionClassName", r],
                )
              );
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "未实现该Action的反序列化", [
              "ActionType",
              t,
            ]);
      }
    }
  }
}
exports.ActionReadHelper = ActionReadHelper;
//# sourceMappingURL=ActionReadHelper.js.map
