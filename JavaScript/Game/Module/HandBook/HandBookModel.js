"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  HandBookDefine_1 = require("./HandBookDefine");
class HandBookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kei = new Map()),
      (this.Fei = []),
      (this.Hei = new Map());
  }
  UpdateHandBookActiveStateMap(e, o) {
    var e = this.GetClientHandBookType(e, o.hws),
      t = o.s5n,
      r = TimeUtil_1.TimeUtil.DateFormat4(
        new Date(o.aws * TimeUtil_1.TimeUtil.InverseMillisecond),
      ),
      a = o.qSs,
      i = o.D8n,
      n = new HandBookDefine_1.HandBookEntry(t, r, i, a),
      s = this.kei.get(e);
    if (s) {
      var l = s.length;
      let t = !1;
      for (let e = 0; e < l; e++) {
        const o = s[e];
        if (o.Id === n.Id) {
          (o.CreateTime = n.CreateTime),
            (o.IsRead = n.IsRead),
            (o.Num = n.Num),
            (t = !0);
          break;
        }
      }
      t || s.push(n);
    } else {
      t = [];
      t.push(n), this.kei.set(e, t);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookDataUpdate,
      e,
      o.s5n,
    );
  }
  ClearHandBookActiveStateMap() {
    this.kei.clear();
  }
  InitHandBookActiveStateMap(t, o) {
    var r = this.GetClientHandBookEntryList(o),
      a = [],
      i = r.length;
    if (t !== Protocol_1.Aki.Protocol.N6s.Proto_Photograph) {
      var e = this.GetClientHandBookType(t);
      for (let e = 0; e < i; e++) {
        var n = r[e];
        a.push(n);
      }
      this.kei.set(e, a);
    } else {
      this.zGn();
      for (let e = 0; e < i; e++) {
        var s = r[e],
          l = this.GetClientHandBookType(t, o[e].hws);
        this.kei.get(l).push(s);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataInit);
  }
  zGn() {
    this.kei.set(9, []), this.kei.set(8, []), this.kei.set(7, []);
  }
  InitHandBookRedDotList(t) {
    this.Fei = [];
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var r = this.GetClientHandBookType(t[e]);
      if (5 === r) {
        var a =
            ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList(),
          i = a.length;
        for (let e = 0; e < i; e++) {
          var n = a[e];
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnItemReadRedDotUpdate,
            n.Id,
          );
        }
      }
      this.Fei.push(r);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookRedDotUpdate,
    );
  }
  UpdateRedDot(t, o) {
    var r = this.kei.get(t);
    if (r) {
      var a = r.length;
      for (let e = 0; e < a; e++) {
        var i = r[e];
        if (i.Id === o) {
          (i.IsRead = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnHandBookRead,
              t,
              i.Id,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPhantomReadRedDotUpdate,
            ),
            5 === t &&
              ((i =
                ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
                  o,
                )),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnItemReadRedDotUpdate,
                i.Type,
              ));
          break;
        }
      }
    }
  }
  IsShowRedDot(t) {
    var o = this.Fei.length;
    for (let e = 0; e < o; e++) if (t === this.Fei[e]) return !0;
    return !1;
  }
  GetCollectCount(e) {
    e = this.kei.get(e);
    return e ? e.length : 0;
  }
  GetClientHandBookEntryList(t) {
    var o = [],
      r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e],
        i = a.s5n,
        n = TimeUtil_1.TimeUtil.DateFormat4(
          new Date(a.aws * TimeUtil_1.TimeUtil.InverseMillisecond),
        ),
        s = a.qSs,
        a = a.D8n,
        i = new HandBookDefine_1.HandBookEntry(i, n, a, s);
      o.push(i);
    }
    return o;
  }
  GetHandBookInfo(e, t) {
    var o = this.kei.get(e);
    if (o) {
      var r = o.length;
      for (let e = 0; e < r; e++) {
        var a = o[e];
        if (a.Id === t) return a;
      }
    }
  }
  GetHandBookInfoList(e) {
    e = this.kei.get(e);
    if (e) return e;
  }
  GetClientHandBookType(e, t) {
    let o = void 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.N6s.Proto_Monster:
        o = 0;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_VocalCorpse:
        o = 1;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_ViewPoint:
        o = 2;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Weapon:
        o = 3;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Animal:
        o = 4;
        break;
      case Protocol_1.Aki.Protocol.N6s.mOs:
        o = 5;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Chip:
        o = 6;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Photograph:
        if (t)
          switch (t) {
            case Protocol_1.Aki.Protocol.hws.Proto_PhotographSub:
              o = 7;
              break;
            case Protocol_1.Aki.Protocol.hws.aTs:
              o = 9;
              break;
            case Protocol_1.Aki.Protocol.hws.RUs:
              o = 8;
              break;
            default:
              o = 7;
          }
        else o = 7;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Noun:
        o = 11;
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "HandBook",
            5,
            "GetClientHandBookType 错误，不在目标类型内",
            ["type", e],
          ),
          (o = 0);
    }
    return o;
  }
  GetServerHandBookType(e) {
    let t = void 0;
    switch (e) {
      case 0:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Monster;
        break;
      case 1:
        t = Protocol_1.Aki.Protocol.N6s.Proto_VocalCorpse;
        break;
      case 2:
        t = Protocol_1.Aki.Protocol.N6s.Proto_ViewPoint;
        break;
      case 3:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Weapon;
        break;
      case 4:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Animal;
        break;
      case 5:
        t = Protocol_1.Aki.Protocol.N6s.mOs;
        break;
      case 6:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Chip;
        break;
      case 7:
      case 9:
      case 8:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Photograph;
        break;
      case 11:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Noun;
        break;
      default:
        t = Protocol_1.Aki.Protocol.N6s.Proto_Photograph;
    }
    return t;
  }
  GetServerHandBookTypeList(t) {
    var o = t.length,
      r = [];
    for (let e = 0; e < o; e++) {
      var a = this.GetServerHandBookType(t[e]);
      r.push(a);
    }
    return r;
  }
  GetAnimalConfigByMeshId(e) {
    if (0 === this.Hei.size) {
      var t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList(),
        o = t.length;
      for (let e = 0; e < o; e++) {
        var r = t[e];
        this.Hei.set(r.MeshId, r);
      }
    }
    return this.Hei.get(e);
  }
}
exports.HandBookModel = HandBookModel;
//# sourceMappingURL=HandBookModel.js.map
