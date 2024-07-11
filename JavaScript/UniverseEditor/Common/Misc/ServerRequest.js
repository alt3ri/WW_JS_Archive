"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.waitForServerReloadReady =
    exports.isServerReloadReady =
    exports.sendPrepareReloadServer =
    exports.requestPlayerBuffOp =
    exports.requestEntityBuffOp =
    exports.requestServerBehaviorTreeRunningData =
    exports.requestServerEntityRunningData =
    exports.requestServerData =
    exports.requestServerResponse =
      void 0);
const Config_1 = require("../Config"),
  Util_1 = require("../Unreal/Util"),
  Async_1 = require("./Async"),
  Log_1 = require("./Log"),
  Util_2 = require("./Util");
async function requestServerResponse(e, r, t = "localhost", a) {
  if (
    !(0, Util_2.isInPie)() &&
    !Config_1.Config.IsPkgRunning &&
    !(0, Util_2.isRuntimePlatform)()
  )
    return [!1, void 0];
  let n = a;
  let o =
    `http://${t}:${(n = void 0 === a ? Config_1.Config.Instance.ServerPort : n)}/GameCurrStateDebug/` +
    e;
  r &&
    ((t = Object.entries(r)
      .map(([e, r]) => e + "=" + r)
      .join("&")),
    (o += "?" + t));
  a = await (0, Util_2.doJsonHttpPost)(o);
  return a ? [!0, a] : [!1, void 0];
}
async function requestServerData(e, r, t = "localhost", a) {
  var [e, r] = await requestServerResponse(e, r, t, a);
  return e && r && r.data && "null" !== r.data
    ? [!0, (0, Util_2.parse)(r.data)]
    : [!1, void 0];
}
async function requestServerEntityRunningData(e, r, t) {
  var a = [];
  for (let e = 0; e < r.length; e += 25) a.push(r.slice(e, e + 25));
  var n = [];
  for (const u of a) {
    var o = u.join(","),
      [i, s] = await requestServerData(
        "GetEntityCurrState",
        { playerId: e, configIdList: o, instId: -1 },
        t,
      );
    i
      ? s.States && 0 < s.States.length && n.push(...s.States)
      : (0, Log_1.warn)(
          `request server entity running data failed. playerId = ${e}, entityIds = [${o}]`,
        );
  }
  return n;
}
async function requestServerBehaviorTreeRunningData(e, r) {
  var [r, t] = await requestServerData("GetGameCurrState", { playerId: e }, r);
  if (r) return t;
  (0, Log_1.warn)(
    "request server BehaviorTree running data failed. playerId = " + e,
  );
}
async function requestEntityBuffOp(e, r, t, a) {
  var [e, r] = await requestServerResponse("AddEntityBuff", {
    playerId: e,
    configId: r,
    buffId: t,
    op: "Add" === a ? 1 : 0,
  });
  return e && void 0 !== r && 0 === r.code;
}
async function requestPlayerBuffOp(e, r, t) {
  var [e, r] = await requestServerResponse("AddPlayerBuff", {
    playerId: e,
    buffId: r,
    op: "Add" === t ? 1 : 0,
  });
  return e && void 0 !== r && 0 === r.code;
}
function getPortFromServerType(e) {
  if (e)
    switch (e) {
      case "PIE":
        return Config_1.Config.Instance.PieServerPort;
      case "Package":
        return Config_1.Config.PackageServerPort;
    }
  return Config_1.Config.Instance.ServerPort;
}
function sendPrepareReloadServer(e) {
  e = `http://localhost:${getPortFromServerType(e)}/GameManager/SetEntityConfigReloadState`;
  try {
    (0, Util_1.sendHttpRequest)("POST", e);
  } catch (e) {
    (0, Log_1.warn)("sendPrepareReloadServer failed: " + e);
  }
}
async function isServerReloadReady(e) {
  e = `http://localhost:${getPortFromServerType(e)}/GameManager/GetEntityConfigReloadState`;
  try {
    var r = await (0, Util_2.doJsonHttpGet)(e);
    return void 0 !== r && 0 === r.code;
  } catch (e) {
    return (0, Log_1.warn)("isServerReloadReady " + e), !1;
  }
}
async function waitForServerReloadReady(e, r = 90) {
  for (var t = Date.now(); Date.now() - t < 1e3 * r; ) {
    if (await isServerReloadReady(e)) return !0;
    await (0, Async_1.delay)(1);
  }
  return (0, Log_1.warn)("等待服务端准备重载数据超时"), !1;
}
(exports.requestServerResponse = requestServerResponse),
  (exports.requestServerData = requestServerData),
  (exports.requestServerEntityRunningData = requestServerEntityRunningData),
  (exports.requestServerBehaviorTreeRunningData =
    requestServerBehaviorTreeRunningData),
  (exports.requestEntityBuffOp = requestEntityBuffOp),
  (exports.requestPlayerBuffOp = requestPlayerBuffOp),
  (exports.sendPrepareReloadServer = sendPrepareReloadServer),
  (exports.isServerReloadReady = isServerReloadReady),
  (exports.waitForServerReloadReady = waitForServerReloadReady);
//# sourceMappingURL=ServerRequest.js.map
