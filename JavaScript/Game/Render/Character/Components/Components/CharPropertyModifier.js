"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharPropertyModifier = exports.PropertyTimeCounter = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  RenderUtil_1 = require("../../../Utils/RenderUtil"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase"),
  CharMaterialContainer_1 = require("../MaterialContainer/CharMaterialContainer"),
  CharMaterialContainerV2_1 = require("./CharMaterialContainerV2");
class PropertyTimeCounter {
  constructor() {
    (this.Id = 0),
      (this.Factor = -0),
      (this.WholeTime = -0),
      (this.Counter = -0),
      (this.BodyType = 0),
      (this.SectionIndex = 0),
      (this.SlotType = 0),
      (this.PropertyName = void 0),
      (this.CurveFloatData = void 0),
      (this.CurveColorData = void 0),
      (this.DataType = 0);
  }
  Init(t, e, i, r, o, s, n, a, h) {
    switch (
      ((this.Id = t),
      (this.BodyType = e),
      (this.SectionIndex = i),
      (this.SlotType = r),
      (this.PropertyName = o),
      (this.WholeTime = a),
      (this.DataType = h),
      (this.Counter = 0),
      this.DataType)
    ) {
      case 0:
        (this.CurveFloatData = s), (this.CurveColorData = void 0);
        break;
      case 1:
        (this.CurveColorData = n), (this.CurveFloatData = void 0);
    }
  }
}
exports.PropertyTimeCounter = PropertyTimeCounter;
class CharPropertyModifier extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.Uhr = void 0),
      (this.Ahr = void 0),
      (this.Phr = 0),
      (this.xhr = void 0);
  }
  Start() {
    (this.Phr = 0),
      (this.Ahr = new Map()),
      (this.xhr = []),
      this.RenderComponent.UseMaterialContainerV2
        ? (this.Uhr = this.RenderComponent.GetComponent(
            RenderConfig_1.RenderConfig.IdMaterialContainerV2,
          ))
        : (this.Uhr = this.RenderComponent.GetComponent(
            RenderConfig_1.RenderConfig.IdMaterialContainer,
          )),
      this.Uhr
        ? this.OnInitSuccess()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            25,
            "材质属性编辑器初始化失败，不存在CharMaterialContainer",
            ["Actor", this.GetRenderingComponent().GetOwner().GetName()],
          );
  }
  UpdateCurveData(t, e) {
    var i;
    (e.Factor = e.Counter / e.WholeTime),
      0 === e.DataType
        ? ((i = RenderUtil_1.RenderUtil.GetFloat(e.CurveFloatData, e.Factor)),
          this.SetPropertyFloat(
            e.BodyType,
            e.SectionIndex,
            e.SlotType,
            e.PropertyName,
            i,
          ))
        : ((i = RenderUtil_1.RenderUtil.GetColor(e.CurveColorData, e.Factor)),
          this.SetPropertyColor(
            e.BodyType,
            e.SectionIndex,
            e.SlotType,
            e.PropertyName,
            i,
          )),
      (e.Counter += t);
  }
  Update() {
    var t = this.GetDeltaTime();
    for (const e of this.Ahr.values()) this.UpdateCurveData(t, e);
    for (const i of this.Ahr.values())
      i.Counter >= i.WholeTime && this.xhr.push(i.Id);
    if (0 < this.xhr.length) {
      for (const r of this.xhr) this.Ahr.delete(r);
      this.xhr = [];
    }
  }
  SetPropertyFloat(t, e, i, r, o) {
    return (
      !!r &&
      (0 <= e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          25,
          "SetColor: 不支持指定SectionIndex",
        ),
      this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer
        ? (this.Uhr.SetFloat(r, o, t, i), !0)
        : this.Uhr instanceof
            CharMaterialContainerV2_1.CharMaterialContainerV2 &&
          (this.Uhr.SetFloatUpdateParamPermanent(r, o, t, i), !0))
    );
  }
  SetPropertyColor(t, e, i, r, o) {
    return (
      !!r &&
      (0 <= e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          25,
          "SetColor: 不支持指定SectionIndex",
        ),
      this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer
        ? (this.Uhr.SetColor(r, o, t, i), !0)
        : this.Uhr instanceof
            CharMaterialContainerV2_1.CharMaterialContainerV2 &&
          (this.Uhr.SetColorUpdateParamPermanent(r, o, t, i), !0))
    );
  }
  SetPropertyLinearFloat(t, e, i, r, o, s = -1) {
    if (void 0 !== this.Uhr) {
      if (!(s < 0))
        return (
          0 <= e &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              25,
              "SetPropertyLinearFloat: 不支持指定SectionIndex",
            ),
          (s = RenderUtil_1.RenderUtil.GetFloat(o.FloatData, s)),
          this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer
            ? this.Uhr.SetFloat(r, s, t, i)
            : this.Uhr instanceof
                CharMaterialContainerV2_1.CharMaterialContainerV2 &&
              this.Uhr.SetFloatUpdateParamPermanent(r, s, t, i),
          !0
        );
      this.Phr++,
        (s = new PropertyTimeCounter()).Init(
          this.Phr,
          t,
          e,
          i,
          r,
          o.FloatData,
          void 0,
          o.Time,
          0,
        ),
        this.Ahr.set(this.Phr, s);
    }
    return !1;
  }
  SetPropertyLinearColor(t, e, i, r, o, s = -1) {
    if (void 0 !== this.Uhr) {
      if (!(s < 0))
        return (
          0 <= e &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              25,
              "SetPropertyLinearColor: 不支持指定SectionIndex",
            ),
          (s = RenderUtil_1.RenderUtil.GetColor(o.LinearColor, s)),
          this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer
            ? this.Uhr.SetColor(r, s, t, i)
            : this.Uhr instanceof
                CharMaterialContainerV2_1.CharMaterialContainerV2 &&
              this.Uhr.SetColorUpdateParamPermanent(r, s, t, i),
          !0
        );
      this.Phr++,
        (s = new PropertyTimeCounter()).Init(
          this.Phr,
          t,
          e,
          i,
          r,
          void 0,
          o.LinearColor,
          o.Time,
          1,
        ),
        this.Ahr.set(this.Phr, s);
    }
    return !1;
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdPropertyModifier;
  }
  GetStatName() {
    return "CharPropertyModifier";
  }
}
exports.CharPropertyModifier = CharPropertyModifier;
//# sourceMappingURL=CharPropertyModifier.js.map
