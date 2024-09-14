"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralController = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  ConditionById_1 = require("../../Core/Define/ConfigQuery/ConditionById"),
  ConditionGroupById_1 = require("../../Core/Define/ConfigQuery/ConditionGroupById"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ErrorCodeController_1 = require("../Module/ErrorCode/ErrorCodeController"),
  CodeDefineLevelConditionInfo_1 = require("./LevelConditions/CodeDefineLevelConditionInfo"),
  LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter"),
  LevelConditionRegistry_1 = require("./LevelConditions/LevelConditionRegistry"),
  LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter"),
  LevelGeneralCommons_1 = require("./LevelGeneralCommons"),
  LevelGeneralNetworks_1 = require("./LevelGeneralNetworks");
class LevelGeneralController extends ControllerBase_1.ControllerBase {
  static pie() {
    (this.PUe = new Map()),
      (this.PDa = new Map()),
      (this.xUe = new Map()),
      (this.wUe = new Map()),
      (this.LevelEventLogOpen = !0),
      Info_1.Info.IsBuildDevelopmentOrDebug || (this.LevelEventLogOpen = !1);
  }
  static OnInit() {
    return (
      LevelGeneralCommons_1.LevelGeneralCommons.Init(),
      LevelGeneralNetworks_1.LevelGeneralNetworks.Register(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddToTickList,
        this.BUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HandleNextAction,
        this.bUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HandleActionFailure,
        this.qUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      this.pie(),
      !0
    );
  }
  static OnClear() {
    return (
      LevelGeneralCommons_1.LevelGeneralCommons.Clear(),
      LevelGeneralNetworks_1.LevelGeneralNetworks.UnRegister(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddToTickList,
        this.BUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HandleNextAction,
        this.bUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HandleActionFailure,
        this.qUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      !0
    );
  }
  static GetBehaviorTreeRunningActions() {
    if (this.PUe.size) {
      var e = new Array();
      for (const t of this.PUe.values())
        for (const n of t) 6 === n.Context.Type && e.push(n);
      return e;
    }
  }
  static ExecuteActionsNew(n, i, r) {
    var e = --this.NUe,
      r = (r && this.xUe.set(e, r), n.length);
    if (1 === r) {
      var t = n[0],
        o = EventTempData.Create();
      (o.EventType = t.Name || t.Params.constructor.name),
        (o.EventParamsNew = t.Params),
        (o.IsAsync = t.Async ?? !1),
        1 === i.Type && (o.EventEntityId = i.EntityId),
        (o.Context = i),
        (o.ActionIndex = 0),
        (o.ActionId = t.ActionId ?? 0),
        (o.ActionGuid = t.ActionGuid ?? ""),
        this.kUe(e, o);
    } else {
      var s = new Array();
      this.PUe.set(e, s);
      let t = r;
      for (let e = r - 1; -1 < e; e--) {
        var l = n[e],
          v = EventTempData.Create();
        (v.EventType = l.Name || l.Params.constructor.name),
          (v.EventParamsNew = l.Params),
          (v.IsAsync = l.Async ?? !1),
          1 === i.Type && (v.EventEntityId = i.EntityId),
          (v.Context = i),
          (v.ActionIndex = --t),
          (v.ActionId = l.ActionId ?? 0),
          s.push(v);
      }
      this.HandleNextAction(e);
    }
  }
  static ExecuteActionsByServerNotify(i, r, e, o, s, l, n) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Level",
        7,
        "开始执行行为组",
        ["PlayerId", e],
        ["SessionId", o],
        ["StartIndex", s],
        ["EndIndex", l],
      );
    var v = i.length;
    if (v <= s || v <= l)
      this.HandleFinishActions(
        e,
        o,
        s,
        `行为组开始节点超过数组上限  StartIndex：${s}，EndIndex：${l}，ActionsLen：` +
          v,
      );
    else {
      if (this.LevelEventLogOpen) {
        let t = "";
        try {
          t = JSON.stringify(r);
        } catch (e) {
          t = "无法JSON序列化的Context";
        }
        let n = "";
        try {
          n = JSON.stringify(i);
        } catch (e) {
          n = "无法JSON序列化的Actions";
        }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            7,
            "开始执行行为组",
            ["PlayerId", e],
            ["SessionId", o],
            ["StartIndex", s],
            ["EndIndex", l],
            ["Context", t],
            ["Actions", n],
          );
      }
      v = o;
      n && this.xUe.set(v, n);
      let t = this.PUe.get(v);
      if (t)
        for (let e = s; e <= l; e++) {
          var a = i[e],
            h = EventTempData.Create();
          (h.EventType = a.Name || a.Params.constructor.name),
            (h.EventParamsNew = a.Params),
            (h.IsAsync = a.Async ?? !1),
            1 === r.Type && (h.EventEntityId = r.EntityId),
            (h.Context = r),
            (h.ActionIndex = e),
            (h.ActionId = a.ActionId ?? 0),
            (h.SessionId = o),
            t.unshift(h);
        }
      else {
        (t = new Array()), this.PUe.set(v, t);
        for (let e = l; e >= s; e--) {
          var d = i[e],
            C = EventTempData.Create();
          (C.EventType = d.Name || d.Params.constructor.name),
            (C.EventParamsNew = d.Params),
            (C.IsAsync = d.Async ?? !1),
            1 === r.Type && (C.EventEntityId = r.EntityId),
            (C.Context = r),
            (C.ActionIndex = e),
            (C.ActionId = d.ActionId ?? 0),
            (C.SessionId = o),
            t.push(C);
        }
        n = new Array();
        n.push(e),
          n.push(o),
          n.push(s),
          this.wUe.set(v, n),
          this.HandleNextAction(v);
      }
    }
  }
  static HandleNextAction(e) {
    var t = this.PUe.get(e);
    this.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("LevelEvent", 7, "执行下一个行为", [
        "行为组剩余个数",
        t?.length,
      ]),
      t && 0 < t.length
        ? ((t = t.pop()), this.kUe(e, t))
        : (this.PDa.delete(e), this.PUe.delete(e), this.VUe(e));
  }
  static VUe(e, t = "") {
    var n,
      i = this.wUe.get(e);
    if (this.LevelEventLogOpen) {
      let e = "";
      (e = i
        ? `PlayerId：${i[0]} SessionId：${i[1]} StartIndex：` + i[2]
        : "空"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 7, "行为组为空，准备删除", [
            "ContextArray",
            e,
          ]);
    }
    i &&
      (this.wUe.delete(e),
      (r = i[0]),
      (n = i[1]),
      (i = i[2]),
      this.HandleFinishActions(r, n, i, t));
    var r = this.xUe.get(e);
    r && (r(1), this.xUe.delete(e));
  }
  static HandleActionsFailure(e, t, n, i) {
    var r = this.PUe.get(e);
    if (r) {
      for (; 0 < r.length; ) {
        var o = r.pop();
        EventTempData.Release(o);
      }
      this.PUe.delete(e);
    }
    var s,
      l = this.wUe.get(e),
      v =
        (l &&
          ((v = `PlayerId：${l[0]} SessionId：${l[1]} StartIndex：` + l[2]),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("LevelEvent", 7, "行为组执行失败，准备删除", [
              "ContextArray",
              v,
            ]),
          this.wUe.delete(e),
          (v = l[0]),
          (s = l[1]),
          (l = l[2]),
          this.HandleFinishActions(v, s, l, "行为:" + t + " 执行失败")),
        this.xUe.get(e));
    v && (v(n ? 3 : 2), this.xUe.delete(e)),
      LevelEventCenter_1.LevelEventCenter.RemoveEventGroup(e),
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "LevelEvent",
          7,
          "行为组执行失败（定位问题专用日志，不是报错信息）",
          ["Msg", t],
        );
  }
  static HandleFinishActions(e, t, n, i) {
    this.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Level", 7, "请求完成行为组", ["SessionId", t]),
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActionsFinish(
        e,
        t,
        n,
        i,
        (e) => {},
      );
  }
  static StopActionsExecute(e) {
    var t = this.PUe?.get(e);
    t?.splice(0, t.length), this.PDa?.get(e)?.Finish();
  }
  static CheckCondition(n, i, e = !0, ...r) {
    if ("None" === n) return !0;
    var o = ConditionGroupById_1.configConditionGroupById.GetConfig(Number(n));
    if (o) {
      let e = void 0,
        t = !1;
      if (o.Relation) {
        for (const s of o.GroupId)
          if (
            (e = ConditionById_1.configConditionById.GetConfig(s)) &&
            (t = this.HandleCondition(e, i, n, ...r))
          )
            return t;
      } else
        for (const l of o.GroupId)
          if (
            (e = ConditionById_1.configConditionById.GetConfig(l)) &&
            !(t = this.HandleCondition(e, i, n, ...r))
          )
            return t;
      return t;
    }
    return e;
  }
  static CheckConditionNew(e, t, n) {
    if (!e || !e.Conditions || 0 === e.Conditions.length) return !0;
    let i = !1;
    if (0 === e.Type) {
      for (const r of e.Conditions) if (!(i = this.HUe(r, t, n))) return i;
    } else for (const o of e.Conditions) if ((i = this.HUe(o, t, n))) return i;
    return i;
  }
  static kUe(e, t) {
    var n = t.EventType;
    -1 === t.SessionId || LevelEventCenter_1.LevelEventCenter.HasAction(n)
      ? this.jUe(e, t)
      : (this.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            `服务端驱动执行一个纯服务端逻辑的行为(${t.EventType})`,
            ["PlayerId", t.PlayerId],
            ["SessionId", t.SessionId],
            ["ActionIndex", t.ActionIndex],
          ),
        EventTempData.Release(t),
        this.HandleNextAction(e));
  }
  static jUe(e, t) {
    this.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        `执行行为组节点(${t.EventType})`,
        ["PlayerId", t.PlayerId],
        ["SessionId", t.SessionId],
        ["ActionIndex", t.ActionIndex],
      );
    var n = t.EventType,
      i = LevelEventCenter_1.LevelEventCenter.GetEvent(n);
    if (i) {
      (i.GroupId = e),
        (i.IsAsync = t.IsAsync),
        (i.SessionId = t.SessionId),
        (i.ActionIndex = t.ActionIndex),
        LevelEventCenter_1.LevelEventCenter.IsNeedTick(n) && i.OpenTick();
      try {
        this.PDa.set(e, i),
          t.EventParamsNew &&
            i.ExecuteAction(t.EventParamsNew, t.Context, t.ActionId),
          i.IsWaitEnd || i.Finish();
      } catch (e) {
        i.Failure();
        i = "行为节点：" + n + "逻辑执行异常，请检查报错信息";
        ErrorCodeController_1.ErrorCodeController.OpenConfirmBoxByText(i),
          e instanceof Error &&
            Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("LevelEvent", 7, i, e, [
              "Details",
              e.message,
            ]);
      }
    } else this.HandleNextAction(e);
    EventTempData.Release(t);
  }
  static HandleCondition(e, t, n, ...i) {
    var r = LevelConditionCenter_1.LevelConditionCenter.GetCondition(e.Type);
    return r
      ? r.Check(e, t, ...i)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelCondition",
            17,
            `条件组使用场合不恰当!!!
            该组中包含的条件类型必须要有客户端实现，
            否则条件组的判定结果始终为false，可能会出现不合预期的情况`,
            ["有问题的条件组id", n],
            ["有问题的条件id", e.Id],
            ["缺乏客户端实现的条件类型", e.Type],
          ),
        !1);
  }
  static HUe(e, t, n) {
    let i = void 0;
    return (
      !!(i =
        e instanceof CodeDefineLevelConditionInfo_1.CodeCondition
          ? LevelConditionCenter_1.LevelConditionCenter.GetCodeCondition(
              e.CodeType,
            )
          : LevelConditionCenter_1.LevelConditionCenter.GetCondition(e.Type)) &&
      i.CheckNew(e, t, n)
    );
  }
  static OnTick(e) {
    LevelEventCenter_1.LevelEventCenter.Tick(e);
  }
}
((exports.LevelGeneralController =
  LevelGeneralController).IsTickEvenPausedInternal = !0),
  (LevelGeneralController.PDa = void 0),
  (LevelGeneralController.NUe = 0),
  (LevelGeneralController.LevelEventLogOpen = !1),
  (LevelGeneralController.BUe = (e, t) => {
    e
      ? LevelEventCenter_1.LevelEventCenter.AddToTickList(!0, t)
      : LevelEventCenter_1.LevelEventCenter.AddToTickList(!1, t);
  }),
  (LevelGeneralController.bUe = (e) => {
    TimerSystem_1.TimerSystem.Next(() => {
      LevelGeneralController.HandleNextAction(e);
    });
  }),
  (LevelGeneralController.qUe = (e, t, n, i) => {
    LevelGeneralController.HandleActionsFailure(e, t, n, i);
  }),
  (LevelGeneralController.GUe = (e, t, n) => {
    LevelConditionRegistry_1.LevelConditionRegistry.RegisterEntityPawnRange(
      t.Entity,
    );
  });
class EventTempData {
  constructor() {
    (this.EventType = ""),
      (this.EventParams = void 0),
      (this.EventParamsNew = void 0),
      (this.EventEntityId = 0),
      (this.Context = void 0),
      (this.PlayerId = -1),
      (this.SessionId = -1),
      (this.ActionIndex = -1),
      (this.ActionId = 0),
      (this.ActionGuid = ""),
      (this.IsAsync = !1),
      (this.EventTrigger = void 0);
  }
  Reset() {
    (this.EventType = ""),
      (this.EventParams = void 0),
      (this.EventParamsNew = void 0),
      (this.EventType = ""),
      (this.Context = void 0),
      (this.PlayerId = -1),
      (this.SessionId = -1),
      (this.ActionIndex = -1),
      (this.ActionId = 0),
      (this.EventEntityId = 0),
      (this.EventTrigger = void 0),
      (this.IsAsync = !1);
  }
  static Create() {
    return 0 < this.RUe.length ? this.RUe.pop() : new EventTempData();
  }
  static Release(e) {
    e.Reset(), this.RUe.push(e);
  }
}
EventTempData.RUe = new Array();
//# sourceMappingURL=LevelGeneralController.js.map
