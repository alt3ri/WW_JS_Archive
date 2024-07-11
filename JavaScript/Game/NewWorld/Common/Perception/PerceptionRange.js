"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionRange = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PerceptionRange {
  constructor() {
    (this.Xor = void 0),
      (this.w_e = void 0),
      (this.$or = void 0),
      (this.Yor = void 0),
      (this.LHo = Vector_1.Vector.Create()),
      (this.Jor = 0),
      (this.zor = void 0),
      (this.Zor = (i) => {
        return !!this.Xor && this.Xor(i);
      }),
      (this.err = (i) => {
        this.zor && this.zor.add(i.Id), this.w_e && this.w_e(i);
      }),
      (this.trr = (i) => {
        this.zor && this.zor.delete(i.Id), this.$or && this.$or(i);
      }),
      (this.irr = () => (
        this.Yor && this.LHo.DeepCopy(this.Yor()), this.LHo.ToUeVector()
      ));
  }
  InitStatic(i, t, s, o = !1, h = void 0, e = void 0, r = void 0) {
    0 !== this.Jor
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Perception", 37, "重复初始化静态感知范围")
      : o || e || r
        ? (o && (this.zor = new Set()),
          (this.Xor = h),
          (this.w_e = e),
          (this.$or = r),
          (this.Jor = cpp_1.FKuroPerceptionInterface.AddStaticPerceptionRange(
            i.ToUeVector(),
            t,
            s,
            this,
            this.Xor ? this.Zor : void 0,
            this.w_e ? this.err : void 0,
            this.$or ? this.trr : void 0,
          )),
          0 === this.Jor &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Perception", 37, "初始化静态感知范围失败"))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Perception", 37, "初始化的静态感知范围没有意义");
  }
  InitDynamic(i, t, s, o = void 0, h = void 0, e = void 0, r = void 0, c = !1) {
    i
      ? t <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Perception",
            37,
            "初始化动态感知范围时，感知范围大小非法",
          )
        : 0 !== this.Jor
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Perception", 37, "重复初始化动态感知范围")
          : c || o || h
            ? ((this.Yor = r),
              (this.Xor = e),
              (this.w_e = o),
              (this.$or = h),
              (this.Jor =
                cpp_1.FKuroPerceptionInterface.AddDynamicPerceptionRange(
                  i,
                  t,
                  s,
                  this,
                  this.irr,
                  this.Xor ? this.Zor : void 0,
                  this.w_e ? this.err : void 0,
                  this.$or ? this.trr : void 0,
                )),
              0 === this.Jor &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error("Perception", 37, "初始化动态感知范围失败"))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Perception", 37, "初始化的动态感知范围没有意义")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Perception",
          37,
          "初始化动态感知范围绑定的实体Token非法",
        );
  }
  Clear() {
    (this.Xor = void 0),
      (this.w_e = void 0),
      (this.$or = void 0),
      (this.Yor = void 0),
      this.LHo.Reset(),
      (this.zor = void 0),
      0 !== this.Jor &&
        (cpp_1.FKuroPerceptionInterface.RemovePerceptionRange(this.Jor),
        (this.Jor = 0));
  }
  UpdateRange(i) {
    0 !== this.Jor &&
      (i <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Perception",
            37,
            "更新动态感知范围大小时，感知范围大小非法",
          )
        : cpp_1.FKuroPerceptionInterface.UpdatePerceptionRange(this.Jor, i));
  }
}
exports.PerceptionRange = PerceptionRange;
//# sourceMappingURL=PerceptionRange.js.map
