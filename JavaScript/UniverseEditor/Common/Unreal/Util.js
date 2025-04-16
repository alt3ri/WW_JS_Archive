"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.copyRotatorToTransformInUeClipboard =
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
    exports.toVectorDouble =
    exports.toVector =
    exports.transformToPosAndRot =
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
  (exports.isFileInUse =
    exports.endActorPickerMode =
    exports.beginActorPickerMode =
    exports.isInActorPickerMode =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Config_1 = require("../Config"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util"),
  Action_1 = require("../Operation/Action");
function isValidActor(o) {
  let t = !1;
  try {
    o.GetTransform();
  } catch (o) {
    t = !0;
  }
  return !t;
}
function loadClass(o) {
  return o.includes("/") ? ue_1.Class.Load(o) : UE[o].StaticClass();
}
function sendMessageToCommandService(o, t) {
  ue_1.EditorRuntimeOperations.SendMessage(o, "127.0.0.1", t);
}
function sendTextObjToCommandService(o, t) {
  try {
    var e = JSON.parse(o);
    sendMessageToCommandService(JSON.stringify(e), t);
  } catch (o) {}
}
function sendObjToCommandService(o, t) {
  sendMessageToCommandService(JSON.stringify(o), t);
}
function isChildOfClass(o, t) {
  return UE.KismetMathLibrary.ClassIsChildOf(o, t);
}
function isObjChildOfClass(o, t) {
  o = o.GetClass();
  return UE.KismetMathLibrary.ClassIsChildOf(o, t);
}
(exports.isValidActor = isValidActor),
  (exports.loadClass = loadClass),
  (exports.sendMessageToCommandService = sendMessageToCommandService),
  (exports.sendTextObjToCommandService = sendTextObjToCommandService),
  (exports.sendObjToCommandService = sendObjToCommandService),
  (exports.isChildOfClass = isChildOfClass),
  (exports.isObjChildOfClass = isObjChildOfClass);
let ueArrayId = 0;
function toUeArray(o, t) {
  const e = UE.NewArray(t);
  return (
    o.forEach((o) => {
      e.Add(o);
    }),
    (e.id = ueArrayId++),
    e
  );
}
function toUeSet(o, t) {
  const e = UE.NewSet(t);
  return (
    o.forEach((o) => {
      e.Add(o);
    }),
    e
  );
}
function getTotalSecond() {
  var o = ue_1.KismetMathLibrary.UtcNow(),
    t = ue_1.KismetMathLibrary.GetDayOfYear(o),
    e = ue_1.KismetMathLibrary.GetHour(o),
    r = ue_1.KismetMathLibrary.GetMinute(o);
  return ue_1.KismetMathLibrary.GetSecond(o) + 60 * r + 3600 * e + 86400 * t;
}
function calUpRotatorByPoints(o, t) {
  t = t.op_Subtraction(o);
  return (t.Z = 0), t.Rotation();
}
function toTsArray(t) {
  var e = [];
  for (let o = 0; o < t.Num(); o++) e.push(t.Get(o));
  return e;
}
function toTsMap(t) {
  var e = new Map();
  for (let o = 0; o < t.Num(); o++) {
    var r = t.GetKey(o),
      n = t.Get(r);
    e.set(r, n);
  }
  return e;
}
function toVectorInfo(o, t) {
  t = t ?? Action_1.defaultVec;
  var e = (0, Action_1.eqn)(o.X, t.X) ? void 0 : (0, Action_1.toFloat2)(o.X),
    r = (0, Action_1.eqn)(o.Y, t.Y) ? void 0 : (0, Action_1.toFloat2)(o.Y),
    t = (0, Action_1.eqn)(o.Z, t.Z) ? void 0 : (0, Action_1.toFloat2)(o.Z);
  return void 0 === e && void 0 === r && void 0 === t
    ? {}
    : { X: e, Y: r, Z: t };
}
function toVectorInfo2(o, t) {
  t = t ?? Action_1.defaultVec;
  var e = (0, Action_1.eqn)(o.X || 0, t.X)
      ? void 0
      : (0, Action_1.toFloat2)(o.X ?? 0),
    r = (0, Action_1.eqn)(o.Y || 0, t.Y)
      ? void 0
      : (0, Action_1.toFloat2)(o.Y ?? 0),
    t = (0, Action_1.eqn)(o.Z || 0, t.Z)
      ? void 0
      : (0, Action_1.toFloat2)(o.Z ?? 0);
  return void 0 === e && void 0 === r && void 0 === t
    ? {}
    : { X: e, Y: r, Z: t };
}
function toRequiredVectorInfo(o) {
  return {
    X: (0, Action_1.toFloat2)(o.X),
    Y: (0, Action_1.toFloat2)(o.Y),
    Z: (0, Action_1.toFloat2)(o.Z),
  };
}
function toRequiredVectorInfoWithFloat6(o) {
  return {
    X: (0, Action_1.toFloat6)(o.X),
    Y: (0, Action_1.toFloat6)(o.Y),
    Z: (0, Action_1.toFloat6)(o.Z),
  };
}
function toRotationInfoQuat(o) {
  return toVectorInfo(o.Euler(), Action_1.defaultRot);
}
function toRotationInfo(o) {
  return toVectorInfo(o.Euler(), Action_1.defaultRot);
}
function toScaleInfo(o) {
  return toVectorInfo(o, Action_1.defaultScale);
}
function toTransformInfo(o) {
  return {
    Pos: toVectorInfo(o.GetLocation()),
    Rot: toRotationInfoQuat(o.GetRotation()),
    Scale: toScaleInfo(o.GetScale3D()),
  };
}
function toPosA(o, t) {
  return { ...toVectorInfo(o), A: t };
}
function transformToPosA(o) {
  return { ...toVectorInfo(o.GetLocation()), A: o.GetRotation().Euler().Z };
}
function transformToPosAndRot(o) {
  return {
    ...toVectorInfo(o.GetLocation()),
    A: o.GetRotation().Euler().Z,
    Roll: o.GetRotation().Euler().X,
    Pitch: o.GetRotation().Euler().Y,
  };
}
function toVector(o, t) {
  return (
    (t = t ?? Action_1.defaultVec),
    (o = o || t),
    new ue_1.Vector(o.X ?? t.X, o.Y ?? t.Y, o.Z ?? t.Z)
  );
}
function toVectorDouble(o, t) {
  return (
    (t = t ?? Action_1.defaultVec),
    (o = o || t),
    new ue_1.VectorDouble(o.X ?? t.X, o.Y ?? t.Y, o.Z ?? t.Z)
  );
}
function toRotation(o) {
  return ue_1.Rotator.MakeFromEuler(toVector(o, Action_1.defaultRot));
}
function toScale(o) {
  return toVector(o, Action_1.defaultScale);
}
function toTransform(o) {
  return new ue_1.Transform(
    toRotation(o.Rot),
    toVector(o.Pos),
    toScale(o.Scale),
  );
}
function angleToRotation(o) {
  return ue_1.Rotator.MakeFromEuler(new ue_1.Vector(0, 0, o));
}
function posaToTransform(o) {
  return (
    (o = o || Action_1.defaultPosA),
    new ue_1.Transform(
      angleToRotation(o.A ?? 0),
      toVector(o),
      toVector(Action_1.defaultScale),
    )
  );
}
function findWpActorGuidByLabels(o) {
  var o = toUeSet(o, ue_1.BuiltinString),
    t = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString),
    t = (0, puerts_1.$ref)(t);
  return (
    ue_1.EditorOperations.FindWpEditorActorGuidsByLabel(o, t),
    toTsMap((0, puerts_1.$unref)(t))
  );
}
function getWpActorsByGuids(o) {
  var t = (0, puerts_1.$ref)(void 0);
  return (
    ue_1.EditorOperations.GetWpEditorActorsByGuids(
      toUeArray(o, ue_1.BuiltinString),
      t,
    ),
    toTsArray((0, puerts_1.$unref)(t))
  );
}
function getWpActorsByPathNames(o) {
  var t = [];
  for (const r of o) {
    var e = ue_1.EditorOperations.GetWpEditorActorGuidByPathName(r);
    e && t.push(e);
  }
  return 0 < t.length ? getWpActorsByGuids(t) : [];
}
function getWpActorsByLabels(o) {
  o = findWpActorGuidByLabels(o);
  return o.size <= 0
    ? []
    : getWpActorsByGuids(Array.from(o.keys())).filter((o) => void 0 !== o);
}
function loadWpActorsByGuids(o, t) {
  ue_1.EditorOperations.LoadWpEditorActorsByGuids(
    toUeArray(o, ue_1.BuiltinString),
    t,
  );
}
function loadWpActorsByPathNames(o, t) {
  var e = [];
  for (const n of o) {
    var r = ue_1.EditorOperations.GetWpEditorActorGuidByPathName(n);
    r && e.push(r);
  }
  0 < e.length && loadWpActorsByGuids(e, t);
}
function loadWpActorsByLabels(o, t) {
  o = findWpActorGuidByLabels(o);
  o.size <= 0 || loadWpActorsByGuids(Array.from(o.keys()), t);
}
function execPythonCommand(o, t, e) {
  return ue_1.PythonScriptLibrary.ExecutePythonCommandEx(o, t, e);
}
function getFileMd5(o) {
  if (!(0, File_1.existFile)(o))
    return (0, Log_1.error)(`get file md5 failed: file not found. (${o})`), "";
  var t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
    e = (0, puerts_1.$ref)("");
  if (
    !execPythonCommand(
      [
        "import hashlib",
        `with open(r"${o}", "rb") as f:`,
        "   file_hash = hashlib.md5()",
        "   chunk = f.read(8192)",
        "   while chunk:",
        "       file_hash.update(chunk)",
        "       chunk = f.read(8192)",
        "   print(file_hash.hexdigest())",
      ].join("\n"),
      e,
      t,
    )
  )
    return (0, Log_1.error)("get file md5 failed: " + o), "";
  o = (0, puerts_1.$unref)(t);
  let r = (0, puerts_1.$unref)(e);
  return (r = (!r || "None" === r) && 0 < o.Num() ? o.Get(0).Output : r);
}
function getStringMd5(o) {
  if (!o)
    return (0, Log_1.error)("get string md5 failed: input is undefined."), "";
  var t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
    e = (0, puerts_1.$ref)(""),
    o = [
      "import hashlib",
      `text = '''${o}'''`,
      "print(hashlib.md5(text.encode('utf-8')).hexdigest())",
    ].join("\n");
  if (!execPythonCommand(o, e, t))
    return (0, Log_1.error)("get file md5 failed. pyLogic=" + o), "";
  o = (0, puerts_1.$unref)(t);
  let r = (0, puerts_1.$unref)(e);
  return (r = (!r || "None" === r) && 0 < o.Num() ? o.Get(0).Output : r);
}
function isTextFile(o) {
  if (!(0, File_1.existFile)(o)) return !1;
  var t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
    e = (0, puerts_1.$ref)("");
  if (
    !execPythonCommand(
      [
        "try:",
        `    with open(r"${o}", encoding = "utf-8") as f:`,
        "        content = f.read()",
        '        print("True")',
        "except:",
        '    print("False")',
      ].join("\n"),
      e,
      t,
    )
  )
    return !1;
  o = (0, puerts_1.$unref)(t);
  let r = (0, puerts_1.$unref)(e);
  return (
    "True" === (r = (!r || "None" === r) && 0 < o.Num() ? o.Get(0).Output : r)
  );
}
function sendHttpRequest(o, t, e, r, n) {
  var e = e ?? { "Content-Type": "application/json" },
    i = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
  for (const c of Object.entries(e)) i.Add(c[0], c[1]);
  const s = (o, t, e) => {
    n && n(o, t, e), (0, puerts_1.releaseManualReleaseDelegate)(s);
  };
  ue_1.EditorRuntimeOperations.SendHttpRequest(
    o,
    t,
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
  (exports.transformToPosAndRot = transformToPosAndRot),
  (exports.toVector = toVector),
  (exports.toVectorDouble = toVectorDouble),
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
function findActorInEditorWorld(t) {
  let e = actorPathNameCache.get(t);
  if (!e || !e.IsValid()) {
    var r = ue_1.EditorOperations.GetAllLevelActors();
    for (let o = 0; o < r.Num(); o++) {
      var n = r.Get(o),
        i = UE.KismetSystemLibrary.GetPathName(n),
        s = actorPathNameCache.get(i);
      (s && s.IsValid()) ||
        (ue_1.EditorOperations.IsActorLoaded(n) &&
          (actorPathNameCache.set(i, n), i === t) &&
          (e = n));
    }
  }
  return e;
}
function isInPieOrPkg() {
  return (0, Util_1.isInPie)() || Config_1.Config.IsPkgRunning;
}
function getVectorInfoFromTransformInUeClipboard(o = !1, t) {
  var e = (0, puerts_1.$ref)(""),
    e = (ue_1.EditorOperations.ClipboardPaste(e), (0, puerts_1.$unref)(e)),
    e =
      /\((?:Pitch=(?<Pitch>-?\d+\.?\d*),Yaw=(?<Yaw>-?\d+\.?\d*),Roll=(?<Roll>-?\d+\.?\d*),)?X=(?<X>-?\d+\.?\d*),Y=(?<Y>-?\d+\.?\d*),Z=(?<Z>-?\d+\.?\d*)\)/.exec(
        e,
      ),
    r = e?.groups?.X,
    n = e?.groups?.Y,
    i = e?.groups?.Z,
    e = e?.groups?.Yaw;
  if (r && n && i)
    return (
      (r = {
        X: (0, Util_1.parseFloatSafe)(r, t),
        Y: (0, Util_1.parseFloatSafe)(n, t),
        Z: (0, Util_1.parseFloatSafe)(i, t),
      }),
      o && void 0 !== e && (r.A = (0, Util_1.parseFloatSafe)(e, t)),
      r
    );
}
function getRotatorFromTransformInUeClipboard() {
  var o = (0, puerts_1.$ref)(""),
    o = (ue_1.EditorOperations.ClipboardPaste(o), (0, puerts_1.$unref)(o)),
    o =
      /\(Pitch=(?<Pitch>-?\d+\.?\d*),Yaw=(?<Yaw>-?\d+\.?\d*),Roll=(?<Roll>-?\d+\.?\d*)\)/.exec(
        o,
      ),
    t = o?.groups?.Roll,
    e = o?.groups?.Pitch,
    o = o?.groups?.Yaw;
  if (t && e && o)
    return {
      X: (0, Util_1.parseFloatSafe)(t),
      Y: (0, Util_1.parseFloatSafe)(e),
      Z: (0, Util_1.parseFloatSafe)(o),
    };
}
function getVectorInfoFromTransformInClipboard() {
  var o = (0, puerts_1.$ref)("");
  ue_1.EditorOperations.ClipboardPaste(o);
  o = (0, puerts_1.$unref)(o).split(",");
  if (o.length < 2) throw new Error();
  return {
    X: (0, Util_1.parseFloatSafe)(o[0]),
    Y: (0, Util_1.parseFloatSafe)(o[1]),
    Z: (0, Util_1.parseFloatSafe)(o[2]),
  };
}
function copyVectorInfoToTransformInUeClipboard(o) {
  var t = o.X ?? 0,
    e = o.Y ?? 0,
    r = o.Z ?? 0,
    o = `(${void 0 === o.A ? "" : `Pitch=0,Yaw=${o.A},Roll=0,`}X=${t},Y=${e},Z=${r})`;
  ue_1.EditorOperations.ClipboardCopy(o);
}
function copyRotatorToTransformInUeClipboard(o) {
  var t = o.X ?? 0,
    o = `(Pitch=${o.Y ?? 0},Yaw=${o.Z ?? 0},Roll=${t})`;
  ue_1.EditorOperations.ClipboardCopy(o);
}
function isInActorPickerMode() {
  return ue_1.EditorOperations.IsInActorPickerMode();
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
  (exports.isInActorPickerMode = isInActorPickerMode);
let onActorPickFunc = void 0,
  onShouldFilterActorFunc = void 0;
function releaseActorPickerModeCallback() {
  onActorPickFunc &&
    ((0, puerts_1.releaseManualReleaseDelegate)(onActorPickFunc),
    (onActorPickFunc = void 0)),
    onShouldFilterActorFunc &&
      ((0, puerts_1.releaseManualReleaseDelegate)(onShouldFilterActorFunc),
      (onShouldFilterActorFunc = void 0));
}
function setupActorPickerModeCallback(t, e) {
  (onActorPickFunc = (o) => {
    t?.(o);
  }),
    (onShouldFilterActorFunc = (o) => !e || e(o));
}
function beginActorPickerMode(o, t) {
  isInActorPickerMode() ||
    (releaseActorPickerModeCallback(),
    setupActorPickerModeCallback(o, t),
    ue_1.EditorOperations.BeginActorPickerMode(
      (0, puerts_1.toManualReleaseDelegate)(onActorPickFunc),
      (0, puerts_1.toManualReleaseDelegate)(onShouldFilterActorFunc),
    ));
}
function endActorPickerMode() {
  isInActorPickerMode() &&
    (ue_1.EditorOperations.EndActorPickerMode(),
    releaseActorPickerModeCallback());
}
function isFileInUse(o) {
  if (!(0, File_1.existFile)(o)) return !1;
  var t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
    e = (0, puerts_1.$ref)("");
  if (
    !execPythonCommand(
      [
        "try:",
        `    with open('${o}', 'r+'):`,
        '        print("False")',
        "except IOError:",
        '    print("True")',
      ].join("\n"),
      e,
      t,
    )
  )
    return !1;
  o = (0, puerts_1.$unref)(t);
  let r = (0, puerts_1.$unref)(e);
  return (
    "True" === (r = (!r || "None" === r) && 0 < o.Num() ? o.Get(0).Output : r)
  );
}
(exports.beginActorPickerMode = beginActorPickerMode),
  (exports.endActorPickerMode = endActorPickerMode),
  (exports.isFileInUse = isFileInUse);
//# sourceMappingURL=Util.js.map
