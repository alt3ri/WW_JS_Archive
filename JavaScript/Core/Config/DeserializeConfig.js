"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeserializeConfig = void 0);
const Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  RATE_10000 = 1e-4,
  MAX_CODES = 65535,
  tempCodes = new Array();
class DeserializeConfig {
  static ParseInt(e, i = 0, ...o) {
    DeserializeConfig.X9.Start();
    var s = { Success: !0, Value: 0, Position: i };
    return (
      e.byteLength >= i + 4
        ? ((e = e.getInt32(i, !0)), (s.Position = i + 4), (s.Value = e))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "配置表序列化 int32 类型出错，请检查配置表定义与配置表数据是否一致！",
              ...o,
            ),
          (s.Success = !1)),
      DeserializeConfig.X9.Stop(),
      s
    );
  }
  static ParseBigInt(e, i = 0, ...o) {
    DeserializeConfig.Y9.Start();
    var s = { Success: !0, Value: 0n, Position: i };
    return (
      e.byteLength >= i + 8
        ? ((e = e.getBigInt64(i, !0)), (s.Position = i + 8), (s.Value = e))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "配置表序列化 int64 类型出错，请检查配置表定义与配置表数据是否一致！",
              ...o,
            ),
          (s.Success = !1)),
      DeserializeConfig.Y9.Stop(),
      s
    );
  }
  static ParseFloat(e, i = 0, ...o) {
    DeserializeConfig.J9.Start();
    var s = { Success: !0, Value: 0, Position: i };
    return (
      e.byteLength >= i + 4
        ? ((e = e.getInt32(i, !0)),
          (s.Position = i + 4),
          (s.Value = e * RATE_10000))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "配置表序列化 float 类型出错，请检查配置表定义与配置表数据是否一致！",
              ...o,
            ),
          (s.Success = !1)),
      DeserializeConfig.J9.Stop(),
      s
    );
  }
  static ParseBoolean(e, i = 0, ...o) {
    DeserializeConfig.z9.Start();
    var s = { Success: !0, Value: !1, Position: i };
    return (
      e.byteLength >= i + 1
        ? ((s.Value = 1 === e.getInt8(i)), (s.Position = i + 1))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "配置表序列化 bool 类型出错，请检查配置表定义与配置表数据是否一致！",
              ...o,
            ),
          (s.Success = !1)),
      DeserializeConfig.z9.Stop(),
      s
    );
  }
  static ParseStringRange(s, t, r, ...a) {
    DeserializeConfig.Z9.Start();
    var n = { Success: !1, Value: "", Position: t };
    if (s.byteLength < t + r)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Config",
          2,
          "配置表序列化 string 类型出错，请检查配置表定义与配置表数据是否一致！",
          ...a,
        );
    else {
      if (0 !== r) {
        let i = 0;
        var g;
        let o = void 0;
        for (let e = t; e < t + r; )
          (g = s.getUint8(e)) >>> 7 == 0
            ? (tempCodes.push(s.getUint8(e)), (e += 1))
            : 252 == (252 & g)
              ? ((i = (3 & s.getUint8(e)) << 30),
                (i =
                  (i =
                    (i =
                      (i =
                        (i |= (63 & s.getUint8(e + 1)) << 24) |
                        ((63 & s.getUint8(e + 2)) << 18)) |
                      ((63 & s.getUint8(e + 3)) << 12)) |
                    ((63 & s.getUint8(e + 4)) << 6)) |
                  (63 & s.getUint8(e + 5))),
                tempCodes.push(i),
                (e += 6))
              : 248 == (248 & g)
                ? ((i = (7 & s.getUint8(e)) << 24),
                  (i =
                    (i =
                      (i =
                        (i |= (63 & s.getUint8(e + 1)) << 18) |
                        ((63 & s.getUint8(e + 2)) << 12)) |
                      ((63 & s.getUint8(e + 3)) << 6)) |
                    (63 & s.getUint8(e + 4))),
                  tempCodes.push(i),
                  (e += 5))
                : 240 == (240 & g)
                  ? ((i = (15 & s.getUint8(e)) << 18),
                    (i =
                      (i =
                        (i |= (63 & s.getUint8(e + 1)) << 12) |
                        ((63 & s.getUint8(e + 2)) << 6)) |
                      (63 & s.getUint8(e + 3))),
                    tempCodes.push(i),
                    (e += 4))
                  : 224 == (224 & g)
                    ? ((i = (31 & s.getUint8(e)) << 12),
                      (i =
                        (i |= (63 & s.getUint8(e + 1)) << 6) |
                        (63 & s.getUint8(e + 2))),
                      tempCodes.push(i),
                      (e += 3))
                    : 192 == (192 & g)
                      ? ((i = (63 & s.getUint8(e)) << 6),
                        (i |= 63 & s.getUint8(e + 1)),
                        tempCodes.push(i),
                        (e += 2))
                      : (tempCodes.push(s.getUint8(e)), (e += 1)),
            tempCodes.length === MAX_CODES &&
              ((g = String.fromCharCode.apply(void 0, tempCodes)),
              (tempCodes.length = 0),
              o ? o.push(g) : (o = [g]));
        let e = o ? o.join("") : void 0;
        0 < tempCodes.length &&
          ((a = String.fromCharCode.apply(void 0, tempCodes)),
          (tempCodes.length = 0),
          e ? (e += a) : (e = a)),
          (n.Value = e),
          (n.Position = t + r);
      }
      n.Success = !0;
    }
    return DeserializeConfig.Z9.Stop(), n;
  }
  static ParseString(e, i = 0, ...o) {
    DeserializeConfig.e7.Start();
    let s = { Success: !1, Value: "", Position: i };
    i = DeserializeConfig.ParseInt(e, i);
    if (i.Success && void 0 !== i.Value && void 0 !== i.Position) {
      var t = i.Value,
        i = i.Position;
      if (((s.Position = i), t < 0))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "配置表序列化 string 类型出错，请检查配置表定义与配置表数据是否一致！",
              ...o,
            ),
          DeserializeConfig.e7.Stop(),
          s
        );
      if (0 === t) return (s.Success = !0), DeserializeConfig.e7.Stop(), s;
      s = DeserializeConfig.ParseStringRange(e, i, t, ...o);
    }
    return DeserializeConfig.e7.Stop(), s;
  }
}
((exports.DeserializeConfig = DeserializeConfig).X9 = Stats_1.Stat.Create(
  "DeserializeConfig.ParseInt",
)),
  (DeserializeConfig.Y9 = Stats_1.Stat.Create("DeserializeConfig.ParseBigInt")),
  (DeserializeConfig.J9 = Stats_1.Stat.Create("DeserializeConfig.ParseFloat")),
  (DeserializeConfig.z9 = Stats_1.Stat.Create(
    "DeserializeConfig.ParseBoolean",
  )),
  (DeserializeConfig.Z9 = Stats_1.Stat.Create(
    "DeserializeConfig.ParseStringRange",
  )),
  (DeserializeConfig.e7 = Stats_1.Stat.Create("DeserializeConfig.ParseString"));
//# sourceMappingURL=DeserializeConfig.js.map
