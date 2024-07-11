"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.beginActorPickerMode =
    exports.isInActorPickerMode =
    exports.copyRotatorToTransformInUeClipboard =
    exports.copyVectorInfoToTransformInUeClipboard =
    exports.getVectorInfoFromTransformInClipboard =
    exports.getRotatorFromTransformInUeClipboard =
    exports.getVectorInfoFromTransformInUeClipboard =
    exports.isInPieOrPkg =
    exports.findActorInEditorWorld =
    exports.sendHttpRequest =
    exports.isTextFile =
    exports.getStringMd5 =
    exports.getFileMd5 =
    exports.execPythonCommand =
    exports.loadWpActorsByLabels =
    exports.loadWpActorsByPathNames =
    exports.loadWpActorsByGuids =
    exports.getWpActorsByLabels =
    exports.getWpActorsByPathNames =
    exports.getWpActorsByGuids =
    exports.findWpActorGuidByLabels =
    exports.posaToTransform =
    exports.angleToRotation =
    exports.toTransform =
    exports.toScale =
    exports.toRotation =
    exports.toVector =
    exports.transformToPosA =
    exports.toPosA =
    exports.toTransformInfo =
    exports.toScaleInfo =
    exports.toRotationInfo =
    exports.toRotationInfoQuat =
    exports.toRequiredVectorInfoWithFloat6 =
    exports.toRequiredVectorInfo =
    exports.toVectorInfo2 =
    exports.toVectorInfo =
    exports.toTsMap =
    exports.toTsArray =
    exports.calUpRotatorByPoints =
    exports.getTotalSecond =
    exports.toUeSet =
    exports.toUeArray =
    exports.isObjChildOfClass =
    exports.isChildOfClass =
    exports.sendObjToCommandService =
    exports.sendTextObjToCommandService =
    exports.sendMessageToCommandService =
    exports.loadClass =
    exports.isValidActor =
      void 0),
  (exports.endActorPickerMode = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ue_1 = require("ue");
const Config_1 = require("../Config");
const File_1 = require("../Misc/File");
const Log_1 = require("../Misc/Log");
const Util_1 = require("../Misc/Util");
const Action_1 = require("../Operation/Action");
function isValidActor(t) {
  let o = !1;
  try {
    t.GetTransform();
  } catch (t) {
    o = !0;
  }
  return !o;
}
function loadClass(t) {
  return t.includes("/") ? ue_1.Class.Load(t) : UE[t].StaticClass();
}
function sendMessageToCommandService(t, o) {
  ue_1.EditorRuntimeOperations.SendMessage(t, "127.0.0.1", o);
}
function sendTextObjToCommandService(t, o) {
  try {
    const e = JSON.parse(t);
    sendMessageToCommandService(JSON.stringify(e), o);
  } catch (t) {}
}
function sendObjToCommandService(t, o) {
  sendMessageToCommandService(JSON.stringify(t), o);
}
function isChildOfClass(t, o) {
  return UE.KismetMathLibrary.ClassIsChildOf(t, o);
}
function isObjChildOfClass(t, o) {
  t = t.GetClass();
  return UE.KismetMathLibrary.ClassIsChildOf(t, o);
}
(exports.isValidActor = isValidActor),
  (exports.loadClass = loadClass),
  (exports.sendMessageToCommandService = sendMessageToCommandService),
  (exports.sendTextObjToCommandService = sendTextObjToCommandService),
  (exports.sendObjToCommandService = sendObjToCommandService),
  (exports.isChildOfClass = isChildOfClass),
  (exports.isObjChildOfClass = isObjChildOfClass);
let ueArrayId = 0;
function toUeArray(t, o) {
  const e = UE.NewArray(o);
  return (
    t.forEach((t) => {
      e.Add(t);
    }),
    (e.id = ueArrayId++),
    e
  );
}
function toUeSet(t, o) {
  const e = UE.NewSet(o);
  return (
    t.forEach((t) => {
      e.Add(t);
    }),
    e
  );
}
function getTotalSecond() {
  const t = ue_1.KismetMathLibrary.UtcNow();
  const o = ue_1.KismetMathLibrary.GetDayOfYear(t);
  const e = ue_1.KismetMathLibrary.GetHour(t);
  const r = ue_1.KismetMathLibrary.GetMinute(t);
  return ue_1.KismetMathLibrary.GetSecond(t) + 60 * r + 3600 * e + 86400 * o;
}
function calUpRotatorByPoints(t, o) {
  o = o.op_Subtraction(t);
  return (o.Z = 0), o.Rotation();
}
function toTsArray(o) {
  const e = [];
  for (let t = 0; t < o.Num(); t++) e.push(o.Get(t));
  return e;
}
function toTsMap(o) {
  const e = new Map();
  for (let t = 0; t < o.Num(); t++) {
    const r = o.GetKey(t);
    const n = o.Get(r);
    e.set(r, n);
  }
  return e;
}
function toVectorInfo(t, o) {
  o = o ?? Action_1.defaultVec;
  const e = (0, Action_1.eqn)(t.X, o.X) ? void 0 : (0, Action_1.toFloat2)(t.X);
  const r = (0, Action_1.eqn)(t.Y, o.Y) ? void 0 : (0, Action_1.toFloat2)(t.Y);
  var o = (0, Action_1.eqn)(t.Z, o.Z) ? void 0 : (0, Action_1.toFloat2)(t.Z);
  return void 0 === e && void 0 === r && void 0 === o
    ? {}
    : { X: e, Y: r, Z: o };
}
function toVectorInfo2(t, o) {
  o = o ?? Action_1.defaultVec;
  const e = (0, Action_1.eqn)(t.X || 0, o.X)
    ? void 0
    : (0, Action_1.toFloat2)(t.X ?? 0);
  const r = (0, Action_1.eqn)(t.Y || 0, o.Y)
    ? void 0
    : (0, Action_1.toFloat2)(t.Y ?? 0);
  var o = (0, Action_1.eqn)(t.Z || 0, o.Z)
    ? void 0
    : (0, Action_1.toFloat2)(t.Z ?? 0);
  return void 0 === e && void 0 === r && void 0 === o
    ? {}
    : { X: e, Y: r, Z: o };
}
function toRequiredVectorInfo(t) {
  return {
    X: (0, Action_1.toFloat2)(t.X),
    Y: (0, Action_1.toFloat2)(t.Y),
    Z: (0, Action_1.toFloat2)(t.Z),
  };
}
function toRequiredVectorInfoWithFloat6(t) {
  return {
    X: (0, Action_1.toFloat6)(t.X),
    Y: (0, Action_1.toFloat6)(t.Y),
    Z: (0, Action_1.toFloat6)(t.Z),
  };
}
function toRotationInfoQuat(t) {
  return toVectorInfo(t.Euler(), Action_1.defaultRot);
}
function toRotationInfo(t) {
  return toVectorInfo(t.Euler(), Action_1.defaultRot);
}
function toScaleInfo(t) {
  return toVectorInfo(t, Action_1.defaultScale);
}
function toTransformInfo(t) {
  return {
    Pos: toVectorInfo(t.GetLocation()),
    Rot: toRotationInfoQuat(t.GetRotation()),
    Scale: toScaleInfo(t.GetScale3D()),
  };
}
function toPosA(t, o) {
  return { ...toVectorInfo(t), A: o };
}
function transformToPosA(t) {
  return { ...toVectorInfo(t.GetLocation()), A: t.GetRotation().Euler().Z };
}
function toVector(t, o) {
  return (
    (o = o ?? Action_1.defaultVec),
    (t = t || o),
    new ue_1.Vector(t.X ?? o.X, t.Y ?? o.Y, t.Z ?? o.Z)
  );
}
function toRotation(t) {
  return ue_1.Rotator.MakeFromEuler(toVector(t, Action_1.defaultRot));
}
function toScale(t) {
  return toVector(t, Action_1.defaultScale);
}
function toTransform(t) {
  return new ue_1.Transform(
    toRotation(t.Rot),
    toVector(t.Pos),
    toScale(t.Scale),
  );
}
function angleToRotation(t) {
  return ue_1.Rotator.MakeFromEuler(new ue_1.Vector(0, 0, t));
}
function posaToTransform(t) {
  return (
    (t = t || Action_1.defaultPosA),
    new ue_1.Transform(
      angleToRotation(t.A ?? 0),
      toVector(t),
      toVector(Action_1.defaultScale),
    )
  );
}
function findWpActorGuidByLabels(t) {
  var t = toUeSet(t, ue_1.BuiltinString);
  var o = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
  var o = (0, puerts_1.$ref)(o);
  return (
    ue_1.EditorOperations.FindWpEditorActorGuidsByLabel(t, o),
    toTsMap((0, puerts_1.$unref)(o))
  );
}
function getWpActorsByGuids(t) {
  const o = (0, puerts_1.$ref)(void 0);
  return (
    ue_1.EditorOperations.GetWpEditorActorsByGuids(
      toUeArray(t, ue_1.BuiltinString),
      o,
    ),
    toTsArray((0, puerts_1.$unref)(o))
  );
}
function getWpActorsByPathNames(t) {
  const o = [];
  for (const r of t) {
    const e = ue_1.EditorOperations.GetWpEditorActorGuidByPathName(r);
    e && o.push(e);
  }
  return o.length > 0 ? getWpActorsByGuids(o) : [];
}
function getWpActorsByLabels(t) {
  t = findWpActorGuidByLabels(t);
  return t.size <= 0
    ? []
    : getWpActorsByGuids(Array.from(t.keys())).filter((t) => void 0 !== t);
}
function loadWpActorsByGuids(t, o) {
  ue_1.EditorOperations.LoadWpEditorActorsByGuids(
    toUeArray(t, ue_1.BuiltinString),
    o,
  );
}
function loadWpActorsByPathNames(t, o) {
  const e = [];
  for (const n of t) {
    const r = ue_1.EditorOperations.GetWpEditorActorGuidByPathName(n);
    r && e.push(r);
  }
  e.length > 0 && loadWpActorsByGuids(e, o);
}
function loadWpActorsByLabels(t, o) {
  t = findWpActorGuidByLabels(t);
  t.size <= 0 || loadWpActorsByGuids(Array.from(t.keys()), o);
}
function execPythonCommand(t, o, e) {
  return ue_1.PythonScriptLibrary.ExecutePythonCommandEx(t, o, e);
}
function getFileMd5(t) {
  if (!(0, File_1.existFile)(t))
    return (0, Log_1.error)(`get file md5 failed: file not found. (${t})`), "";
  const o = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry));
  const e = (0, puerts_1.$ref)("");
  if (
    !execPythonCommand(
      [
        "import hashlib",
        `with open(r"${t}", "rb") as f:`,
        "   file_hash = hashlib.md5()",
        "   chunk = f.read(8192)",
        "   while chunk:",
        "       file_hash.update(chunk)",
        "       chunk = f.read(8192)",
        "   print(file_hash.hexdigest())",
      ].join("\n"),
      e,
      o,
    )
  )
    return (0, Log_1.error)("get file md5 failed: " + t), "";
  t = (0, puerts_1.$unref)(o);
  let r = (0, puerts_1.$unref)(e);
  return (r = (!r || r === "None") && t.Num() > 0 ? t.Get(0).Output : r);
}
function getStringMd5(t) {
  if (!t)
    return (0, Log_1.error)("get string md5 failed: input is undefined."), "";
  const o = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry));
  const e = (0, puerts_1.$ref)("");
  var t = [
    "import hashlib",
    `text = '''${t}'''`,
    "print(hashlib.md5(text.encode('utf-8')).hexdigest())",
  ].join("\n");
  if (!execPythonCommand(t, e, o))
    return (0, Log_1.error)("get file md5 failed. pyLogic=" + t), "";
  t = (0, puerts_1.$unref)(o);
  let r = (0, puerts_1.$unref)(e);
  return (r = (!r || r === "None") && t.Num() > 0 ? t.Get(0).Output : r);
}
function isTextFile(t) {
  if (!(0, File_1.existFile)(t)) return !1;
  const o = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry));
  const e = (0, puerts_1.$ref)("");
  if (
    !execPythonCommand(
      [
        "try:",
        `    with open(r"${t}", encoding = "utf-8") as f:`,
        "        content = f.read()",
        '        print("True")',
        "except:",
        '    print("False")',
      ].join("\n"),
      e,
      o,
    )
  )
    return !1;
  t = (0, puerts_1.$unref)(o);
  let r = (0, puerts_1.$unref)(e);
  return (
    (r = (!r || r === "None") && t.Num() > 0 ? t.Get(0).Output : r) === "True"
  );
}
function sendHttpRequest(t, o, e, r, n) {
  var e = e ?? { "Content-Type": "application/json" };
  const i = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
  for (const u of Object.entries(e)) i.Add(u[0], u[1]);
  const s = (t, o, e) => {
    n && n(t, o, e), (0, puerts_1.releaseManualReleaseDelegate)(s);
  };
  ue_1.EditorRuntimeOperations.SendHttpRequest(
    t,
    o,
    i,
    r ?? "",
    (0, puerts_1.toManualReleaseDelegate)(s),
  );
}
(exports.toUeArray = toUeArray),
  (exports.toUeSet = toUeSet),
  (exports.getTotalSecond = getTotalSecond),
  (exports.calUpRotatorByPoints = calUpRotatorByPoints),
  (exports.toTsArray = toTsArray),
  (exports.toTsMap = toTsMap),
  (exports.toVectorInfo = toVectorInfo),
  (exports.toVectorInfo2 = toVectorInfo2),
  (exports.toRequiredVectorInfo = toRequiredVectorInfo),
  (exports.toRequiredVectorInfoWithFloat6 = toRequiredVectorInfoWithFloat6),
  (exports.toRotationInfoQuat = toRotationInfoQuat),
  (exports.toRotationInfo = toRotationInfo),
  (exports.toScaleInfo = toScaleInfo),
  (exports.toTransformInfo = toTransformInfo),
  (exports.toPosA = toPosA),
  (exports.transformToPosA = transformToPosA),
  (exports.toVector = toVector),
  (exports.toRotation = toRotation),
  (exports.toScale = toScale),
  (exports.toTransform = toTransform),
  (exports.angleToRotation = angleToRotation),
  (exports.posaToTransform = posaToTransform),
  (exports.findWpActorGuidByLabels = findWpActorGuidByLabels),
  (exports.getWpActorsByGuids = getWpActorsByGuids),
  (exports.getWpActorsByPathNames = getWpActorsByPathNames),
  (exports.getWpActorsByLabels = getWpActorsByLabels),
  (exports.loadWpActorsByGuids = loadWpActorsByGuids),
  (exports.loadWpActorsByPathNames = loadWpActorsByPathNames),
  (exports.loadWpActorsByLabels = loadWpActorsByLabels),
  (exports.execPythonCommand = execPythonCommand),
  (exports.getFileMd5 = getFileMd5),
  (exports.getStringMd5 = getStringMd5),
  (exports.isTextFile = isTextFile),
  (exports.sendHttpRequest = sendHttpRequest);
const actorPathNameCache = new Map();
function findActorInEditorWorld(o) {
  let e = actorPathNameCache.get(o);
  if (!e || !e.IsValid()) {
    const r = ue_1.EditorOperations.GetAllLevelActors();
    for (let t = 0; t < r.Num(); t++) {
      const n = r.Get(t);
      const i = UE.KismetSystemLibrary.GetPathName(n);
      const s = actorPathNameCache.get(i);
      (s && s.IsValid()) ||
        (ue_1.EditorOperations.IsActorLoaded(n) &&
          (actorPathNameCache.set(i, n), i === o) &&
          (e = n));
    }
  }
  return e;
}
function isInPieOrPkg() {
  return (0, Util_1.isInPie)() || Config_1.Config.IsPkgRunning;
}
function getVectorInfoFromTransformInUeClipboard(t = !1) {
  var o = (0, puerts_1.$ref)("");
  var o = (ue_1.EditorOperations.ClipboardPaste(o), (0, puerts_1.$unref)(o));
  var o =
    /\((?:Pitch=(?<Pitch>-?\d+\.?\d*),Yaw=(?<Yaw>-?\d+\.?\d*),Roll=(?<Roll>-?\d+\.?\d*),)?X=(?<X>-?\d+\.?\d*),Y=(?<Y>-?\d+\.?\d*),Z=(?<Z>-?\d+\.?\d*)\)/.exec(
      o,
    );
  let e = o?.groups?.X;
  const r = o?.groups?.Y;
  const n = o?.groups?.Z;
  var o = o?.groups?.Yaw;
  if (e && r && n)
    return (
      (e = {
        X: (0, Util_1.parseFloatSafe)(e),
        Y: (0, Util_1.parseFloatSafe)(r),
        Z: (0, Util_1.parseFloatSafe)(n),
      }),
      t && void 0 !== o && (e.A = (0, Util_1.parseFloatSafe)(o)),
      e
    );
}
function getRotatorFromTransformInUeClipboard() {
  var t = (0, puerts_1.$ref)("");
  var t = (ue_1.EditorOperations.ClipboardPaste(t), (0, puerts_1.$unref)(t));
  var t =
    /\(Pitch=(?<Pitch>-?\d+\.?\d*),Yaw=(?<Yaw>-?\d+\.?\d*),Roll=(?<Roll>-?\d+\.?\d*)\)/.exec(
      t,
    );
  const o = t?.groups?.Roll;
  const e = t?.groups?.Pitch;
  var t = t?.groups?.Yaw;
  if (o && e && t)
    return {
      X: (0, Util_1.parseFloatSafe)(o),
      Y: (0, Util_1.parseFloatSafe)(e),
      Z: (0, Util_1.parseFloatSafe)(t),
    };
}
function getVectorInfoFromTransformInClipboard() {
  let t = (0, puerts_1.$ref)("");
  ue_1.EditorOperations.ClipboardPaste(t);
  t = (0, puerts_1.$unref)(t).split(",");
  if (t.length < 2) throw new Error();
  return {
    X: (0, Util_1.parseFloatSafe)(t[0]),
    Y: (0, Util_1.parseFloatSafe)(t[1]),
    Z: (0, Util_1.parseFloatSafe)(t[2]),
  };
}
function copyVectorInfoToTransformInUeClipboard(t) {
  const o = t.X ?? 0;
  const e = t.Y ?? 0;
  const r = t.Z ?? 0;
  var t = `(${void 0 === t.A ? "" : `Pitch=0,Yaw=${t.A},Roll=0,`}X=${o},Y=${e},Z=${r})`;
  ue_1.EditorOperations.ClipboardCopy(t);
}
function copyRotatorToTransformInUeClipboard(t) {
  const o = t.X ?? 0;
  var t = `(Pitch=${t.Y ?? 0},Yaw=${t.Z ?? 0},Roll=${o})`;
  ue_1.EditorOperations.ClipboardCopy(t);
}
function isInActorPickerMode() {
  return ue_1.EditorOperations.IsInActorPickerMode();
}
function beginActorPickerMode(o, e) {
  isInActorPickerMode() ||
    ue_1.EditorOperations.BeginActorPickerMode(
      (0, puerts_1.toManualReleaseDelegate)((t) => {
        o?.(t);
      }),
      (0, puerts_1.toManualReleaseDelegate)((t) => !e || e(t)),
    );
}
function endActorPickerMode() {
  isInActorPickerMode() && ue_1.EditorOperations.EndActorPickerMode();
}
(exports.findActorInEditorWorld = findActorInEditorWorld),
  (exports.isInPieOrPkg = isInPieOrPkg),
  (exports.getVectorInfoFromTransformInUeClipboard =
    getVectorInfoFromTransformInUeClipboard),
  (exports.getRotatorFromTransformInUeClipboard =
    getRotatorFromTransformInUeClipboard),
  (exports.getVectorInfoFromTransformInClipboard =
    getVectorInfoFromTransformInClipboard),
  (exports.copyVectorInfoToTransformInUeClipboard =
    copyVectorInfoToTransformInUeClipboard),
  (exports.copyRotatorToTransformInUeClipboard =
    copyRotatorToTransformInUeClipboard),
  (exports.isInActorPickerMode = isInActorPickerMode),
  (exports.beginActorPickerMode = beginActorPickerMode),
  (exports.endActorPickerMode = endActorPickerMode);
// # sourceMappingURL=Util.js.map
