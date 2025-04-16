"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeComponentMessageManager = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
class MessageRegisterCallBackInfo {
  constructor() {
    (this.EnterCallbacks = []),
      (this.LeaveCallback = []),
      (this.InitCallback = []),
      (this.EnterCallbacks = []),
      (this.LeaveCallback = []),
      (this.InitCallback = []);
  }
}
class RangeComponentMessageManager {
  constructor() {
    (this.gul = new Map()), this.gul.clear();
  }
  static get Instance() {
    return (
      void 0 === this.cj && (this.cj = new RangeComponentMessageManager()),
      this.cj
    );
  }
  RegisterMessage(e, s, o, t) {
    if (this.gul.has(e)) {
      var a = this.gul.get(e);
      if (void 0 !== a)
        if (a.has(o)) {
          var r = a.get(o);
          switch (s) {
            case Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter:
              r?.EnterCallbacks.push(t);
              break;
            case Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave:
              r?.LeaveCallback.push(t);
              break;
            case Protocol_1.Aki.Protocol.i6n.Proto_RangeInit:
              r?.InitCallback.push(t);
          }
        } else {
          var c = new MessageRegisterCallBackInfo();
          switch (s) {
            case Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter:
              c?.EnterCallbacks.push(t);
              break;
            case Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave:
              c?.LeaveCallback.push(t);
              break;
            case Protocol_1.Aki.Protocol.i6n.Proto_RangeInit:
              c?.InitCallback.push(t);
          }
          a.set(o, c);
        }
    } else {
      var a = new Map(),
        i = new MessageRegisterCallBackInfo();
      switch (s) {
        case Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter:
          i?.EnterCallbacks.push(t);
          break;
        case Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave:
          i?.LeaveCallback.push(t);
          break;
        case Protocol_1.Aki.Protocol.i6n.Proto_RangeInit:
          i?.InitCallback.push(t);
      }
      a.set(o, i), this.gul.set(e, a);
    }
  }
  UnRegisterMessage(e, s, o, t) {
    if (this.gul.has(e)) {
      e = this.gul.get(e);
      if (void 0 !== e && e.has(o)) {
        var a = e.get(o);
        switch (s) {
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter:
            this.pul(a.EnterCallbacks, t);
            break;
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave:
            this.pul(a.LeaveCallback, t);
            break;
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeInit:
            this.pul(a.InitCallback, t);
        }
      }
    }
  }
  pul(e, s) {
    s = e.indexOf(s);
    -1 !== s && e.splice(s, 1);
  }
  HasMessage(e, s, o, t) {
    if (this.gul.has(e)) {
      e = this.gul.get(e);
      if (void 0 !== e && e.has(o)) {
        var a = e.get(o);
        switch (s) {
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter:
            return a?.EnterCallbacks.includes(t) ?? !1;
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave:
            return a?.LeaveCallback.includes(t) ?? !1;
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeInit:
            return a?.InitCallback.includes(t) ?? !1;
        }
      }
    }
    return !1;
  }
  EmitMessage(e, s, o, t, a) {
    if (this.gul.has(e)) {
      e = this.gul.get(e);
      if (void 0 !== e && e.has(o)) {
        var r = e.get(o);
        switch (s) {
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter:
            r?.EnterCallbacks.forEach((e) => {
              e(s, o, t, a);
            });
            break;
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave:
            r?.LeaveCallback.forEach((e) => {
              e(s, o, t, a);
            });
            break;
          case Protocol_1.Aki.Protocol.i6n.Proto_RangeInit:
            r?.InitCallback.forEach((e) => {
              e(s, o, t, a);
            });
        }
      }
    }
  }
}
(exports.RangeComponentMessageManager = RangeComponentMessageManager).cj =
  void 0;
//# sourceMappingURL=RangeComponentMessageManager.js.map
