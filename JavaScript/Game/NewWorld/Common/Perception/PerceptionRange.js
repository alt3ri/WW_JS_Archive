"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionRange = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PerceptionRange {
  constructor() {
    (this.$ir = void 0),
      (this.w_e = void 0),
      (this.Yir = void 0),
      (this.Jir = void 0),
      (this.U7o = Vector_1.Vector.Create()),
      (this.zir = 0),
      (this.Zir = void 0),
      (this.eor = (i) => {
        return !!this.$ir && this.$ir(i);
      }),
      (this.tor = (i) => {
        this.Zir && this.Zir.add(i.Id), this.w_e && this.w_e(i);
      }),
      (this.ior = (i) => {
        this.Zir && this.Zir.delete(i.Id), this.Yir && this.Yir(i);
      }),
      (this.oor = () => (
        this.Jir && this.U7o.DeepCopy(this.Jir()), this.U7o.ToUeVector()
      ));
  }
  InitStatic(i, t, s, o = !1, h = void 0, e = void 0, r = void 0) {
    0 !== this.zir
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Perception", 37, "重复初始化静态感知范围")
      : o || e || r
        ? (o && (this.Zir = new Set()),
          (this.$ir = h),
          (this.w_e = e),
          (this.Yir = r),
          (this.zir = cpp_1.FKuroPerceptionInterface.AddStaticPerceptionRange(
            i.ToUeVector(),
            t,
            s,
            this,
            this.$ir ? this.eor : void 0,
            this.w_e ? this.tor : void 0,
            this.Yir ? this.ior : void 0,
          )),
          0 === this.zir &&
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
        : 0 !== this.zir
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Perception", 37, "重复初始化动态感知范围")
          : c || o || h
            ? ((this.Jir = r),
              (this.$ir = e),
              (this.w_e = o),
              (this.Yir = h),
              (this.zir =
                cpp_1.FKuroPerceptionInterface.AddDynamicPerceptionRange(
                  i,
                  t,
                  s,
                  this,
                  this.oor,
                  this.$ir ? this.eor : void 0,
                  this.w_e ? this.tor : void 0,
                  this.Yir ? this.ior : void 0,
                )),
              0 === this.zir &&
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
    (this.$ir = void 0),
      (this.w_e = void 0),
      (this.Yir = void 0),
      (this.Jir = void 0),
      this.U7o.Reset(),
      (this.Zir = void 0),
      0 !== this.zir &&
        (cpp_1.FKuroPerceptionInterface.RemovePerceptionRange(this.zir),
        (this.zir = 0));
  }
  UpdateRange(i) {
    0 !== this.zir &&
      (i <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Perception",
            37,
            "更新动态感知范围大小时，感知范围大小非法",
          )
        : cpp_1.FKuroPerceptionInterface.UpdatePerceptionRange(this.zir, i));
  }
}
exports.PerceptionRange = PerceptionRange;
//# sourceMappingURL=PerceptionRange.js.map
