"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class HandBookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kei = new Map()),
      (this.Fei = []),
      (this.Vei = new Map()),
      (this.Hei = new Map());
  }
  UpdateHandBookActiveStateMap(e, o) {
    var e = this.GetClientHandBookType(e, o.tws),
      t = o.J4n,
      r = TimeUtil_1.TimeUtil.DateFormat4(
        new Date(o.ews * TimeUtil_1.TimeUtil.InverseMillisecond),
      ),
      a = o.ASs,
      n = o.p8n,
      i = new HandBookDefine_1.HandBookEntry(t, r, n, a),
      s = this.kei.get(e);
    if (s) {
      var l = s.length;
      let t = !1;
      for (let e = 0; e < l; e++) {
        const o = s[e];
        if (o.Id === i.Id) {
          (o.CreateTime = i.CreateTime),
            (o.IsRead = i.IsRead),
            (o.Num = i.Num),
            (t = !0);
          break;
        }
      }
      t || s.push(i);
    } else {
      t = [];
      t.push(i), this.kei.set(e, t);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookDataUpdate,
      e,
      o.J4n,
    );
  }
  ClearHandBookActiveStateMap() {
    this.kei.clear();
  }
  InitHandBookActiveStateMap(t, o) {
    var r = this.GetClientHandBookEntryList(o),
      a = [],
      n = r.length;
    if (t !== Protocol_1.Aki.Protocol.x5s.Proto_Photograph) {
      var i = this.GetClientHandBookType(t);
      for (let e = 0; e < n; e++) {
        var s = r[e];
        HandBookController_1.HandBookController.CheckConfigIsLegal(i, s.Id) &&
          a.push(s);
      }
      this.kei.set(i, a);
    } else {
      this.GGn();
      for (let e = 0; e < n; e++) {
        var l = r[e],
          _ = this.GetClientHandBookType(t, o[e].tws);
        HandBookController_1.HandBookController.CheckConfigIsLegal(_, l.Id) &&
          this.kei.get(_).push(l);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataInit);
  }
  GGn() {
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
          n = a.length;
        for (let e = 0; e < n; e++) {
          var i = a[e];
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnItemReadRedDotUpdate,
            i.Id,
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
        var n = r[e];
        if (n.Id === o) {
          (n.IsRead = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnHandBookRead,
              t,
              n.Id,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPhantomReadRedDotUpdate,
            ),
            5 === t &&
              ((n =
                ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
                  o,
                )),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnItemReadRedDotUpdate,
                n.Type,
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
        n = a.J4n,
        i = TimeUtil_1.TimeUtil.DateFormat4(
          new Date(a.ews * TimeUtil_1.TimeUtil.InverseMillisecond),
        ),
        s = a.ASs,
        a = a.p8n,
        n = new HandBookDefine_1.HandBookEntry(n, i, a, s);
      o.push(n);
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
      case Protocol_1.Aki.Protocol.x5s.Proto_Monster:
        o = 0;
        break;
      case Protocol_1.Aki.Protocol.x5s.Proto_VocalCorpse:
        o = 1;
        break;
      case Protocol_1.Aki.Protocol.x5s.Proto_ViewPoint:
        o = 2;
        break;
      case Protocol_1.Aki.Protocol.x5s.Proto_Weapon:
        o = 3;
        break;
      case Protocol_1.Aki.Protocol.x5s.Proto_Animal:
        o = 4;
        break;
      case Protocol_1.Aki.Protocol.x5s.aOs:
        o = 5;
        break;
      case Protocol_1.Aki.Protocol.x5s.Proto_Chip:
        o = 6;
        break;
      case Protocol_1.Aki.Protocol.x5s.Proto_Photograph:
        if (t)
          switch (t) {
            case Protocol_1.Aki.Protocol.tws.Proto_PhotographSub:
              o = 7;
              break;
            case Protocol_1.Aki.Protocol.tws.eTs:
              o = 9;
              break;
            case Protocol_1.Aki.Protocol.tws.MUs:
              o = 8;
              break;
            default:
              o = 7;
          }
        else o = 7;
    }
    return o;
  }
  GetServerHandBookType(e) {
    let t = void 0;
    switch (e) {
      case 0:
        t = Protocol_1.Aki.Protocol.x5s.Proto_Monster;
        break;
      case 1:
        t = Protocol_1.Aki.Protocol.x5s.Proto_VocalCorpse;
        break;
      case 2:
        t = Protocol_1.Aki.Protocol.x5s.Proto_ViewPoint;
        break;
      case 3:
        t = Protocol_1.Aki.Protocol.x5s.Proto_Weapon;
        break;
      case 4:
        t = Protocol_1.Aki.Protocol.x5s.Proto_Animal;
        break;
      case 5:
        t = Protocol_1.Aki.Protocol.x5s.aOs;
        break;
      case 6:
        t = Protocol_1.Aki.Protocol.x5s.Proto_Chip;
        break;
      default:
        t = Protocol_1.Aki.Protocol.x5s.Proto_Photograph;
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
  GetConfigListIdByType(e) {
    var t = this.Vei.get(e);
    if (t) return t;
    let o = void 0;
    switch (e) {
      case 0:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList();
        break;
      case 1:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
        break;
      case 2:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig();
        break;
      case 3:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
        break;
      case 4:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
        break;
      case 5:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList();
        break;
      case 6:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig();
        break;
      default:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
    }
    var r = o.length,
      a = [];
    for (let e = 0; e < r; e++) {
      var n = o[e];
      a.push(n.Id);
    }
    return this.Vei.set(e, a), a;
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
