"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.flowOp = void 0);
const immer_1 = require("immer"),
  IAction_1 = require("../../Interface/IAction"),
  CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  SexFormat_1 = require("../CsvConfig/SexFormat"),
  Geometry_1 = require("./Geometry");
function setVectorOffset(e, t) {
  return Geometry_1.Vector3Op.Add(
    (0, Geometry_1.toVector3R)(e),
    (0, Geometry_1.toVector3R)(t),
  );
}
function setFlowTemplateOffset(e, s, r) {
  e.TargetPos && (e.TargetPos = setVectorOffset(e.TargetPos, s)),
    e.CameraPosAndRot &&
      ((e.CameraPosAndRot.CameraOffset = setVectorOffset(
        e.CameraPosAndRot.CameraOffset,
        s,
      )),
      (e.CameraPosAndRot.CameraRotate.Z =
        (e.CameraPosAndRot.CameraRotate.Z ?? 0) + r)),
    e.ActorIndexArray &&
      e.ActorIndexArray.forEach((e) => {
        var t;
        e.Offset &&
          ((t = e.Offset.A ?? 0),
          (e.Offset = setVectorOffset(e.Offset, s)),
          (e.Offset.A = t + r));
      });
}
function setCameraMotionOffset(e, t, s) {
  (e.Start.Pos = setVectorOffset(e.Start.Pos, t)),
    (e.End.Pos = setVectorOffset(e.End.Pos, t)),
    (e.Start.Rot.Z = (e.Start.Rot.Z ?? 0) + s);
}
function setOffsetInStateActions(e, s, r) {
  e.forEach((e) => {
    var t;
    "SetFlowTemplate" === e.Name && setFlowTemplateOffset(e.Params, s, r),
      "ShowTalk" === e.Name &&
        e.Params.TalkItems.forEach((e) => {
          var t;
          e.FlowTemplate && setFlowTemplateOffset(e.FlowTemplate, s, r),
            e.FlowTemplateList &&
              e.FlowTemplateList.forEach((e) => {
                setFlowTemplateOffset(e, s, r);
              }),
            e.ActorLookAtArray &&
              e.ActorLookAtArray.forEach((e) => {
                3 === e.Target.Type &&
                  ((e = e.Target).Pos = setVectorOffset(e.Pos, s));
              }),
            e.ActorTurnToArray &&
              e.ActorTurnToArray.forEach((e) => {
                3 === e.Target.Type &&
                  ((e = e.Target).Pos = setVectorOffset(e.Pos, s));
              }),
            "Talk" === e.Type &&
              (t = e).CameraMotion &&
              t.CameraMotion.Type ===
                IAction_1.EShowTalkCameraMotionType.Tween &&
              setCameraMotionOffset(t.CameraMotion, s, r),
            "Option" === e.Type &&
              (t = e).CameraMotion &&
              t.CameraMotion.Type ===
                IAction_1.EShowTalkCameraMotionType.Tween &&
              setCameraMotionOffset(t.CameraMotion, s, r),
            e.Actions && setOffsetInStateActions(e.Actions, s, r),
            e.Options &&
              e.Options.forEach((e) => {
                e.Actions && setOffsetInStateActions(e.Actions, s, r);
              });
        }),
      "AdjustPlayerCamera" === e.Name &&
        ((e = e.Params).Option.Type === IAction_1.EAdjustPlayerCamera.Fixed &&
          (((t = e.Option).CenterPos = setVectorOffset(t.CenterPos, s)),
          (t.CenterRot.Z = (t.CenterRot.Z ?? 0) + r)),
        e.Option.Type === IAction_1.EAdjustPlayerCamera.Dialog) &&
        (t = e.Option).CenterPos &&
        (t.CenterPos = setVectorOffset(t.CenterPos, s));
  });
}
class FlowOp {
  GetState(e, t) {
    return e.States.find((e) => e.Id === t);
  }
  GetStateNames(e) {
    return e.States.map((e) => e.Name);
  }
  GetSexFormat(e) {
    var t = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      SexFormat_1.SexFormatCsv,
    );
    let s = 0;
    for (s = 0; s < t.length; s++) {
      var r = t[s];
      if (r.MaleText === e) return r.FemaleText;
    }
    return e;
  }
  SetStateOffset(t, s, e) {
    return (0, immer_1.default)(e, (e) => {
      setOffsetInStateActions(e.Actions, t, s);
    });
  }
}
exports.flowOp = new FlowOp();
//# sourceMappingURL=Flow.js.map
