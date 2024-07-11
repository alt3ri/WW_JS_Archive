"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharPropertyModifier = exports.PropertyTimeCounter = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  RenderUtil_1 = require("../../../Utils/RenderUtil"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
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
  Init(t, i, e, r, s, o, h, n, a) {
    switch (
      ((this.Id = t),
      (this.BodyType = i),
      (this.SectionIndex = e),
      (this.SlotType = r),
      (this.PropertyName = s),
      (this.WholeTime = n),
      (this.DataType = a),
      (this.Counter = 0),
      this.DataType)
    ) {
      case 0:
        (this.CurveFloatData = o), (this.CurveColorData = void 0);
        break;
      case 1:
        (this.CurveColorData = h), (this.CurveFloatData = void 0);
    }
  }
}
exports.PropertyTimeCounter = PropertyTimeCounter;
class CharPropertyModifier extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.Aar = void 0),
      (this.Par = void 0),
      (this.xar = 0),
      (this.war = void 0);
  }
  Start() {
    (this.xar = 0), (this.Par = new Map()), (this.war = []);
    var t = this.RenderComponent.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainer,
    );
    void 0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "材质属性编辑器初始化失败，不存在CharMaterialContainer",
          ["Actor", this.GetRenderingComponent().GetOwner().GetName()],
        )
      : ((this.Aar = t), this.OnInitSuccess());
  }
  UpdateCurveData(t, i) {
    var e;
    (i.Factor = i.Counter / i.WholeTime),
      0 === i.DataType
        ? ((e = RenderUtil_1.RenderUtil.GetFloat(i.CurveFloatData, i.Factor)),
          this.SetPropertyFloat(
            i.BodyType,
            i.SectionIndex,
            i.SlotType,
            i.PropertyName,
            e,
          ))
        : ((e = RenderUtil_1.RenderUtil.GetColor(i.CurveColorData, i.Factor)),
          this.SetPropertyColor(
            i.BodyType,
            i.SectionIndex,
            i.SlotType,
            i.PropertyName,
            e,
          )),
      (i.Counter += t);
  }
  Update() {
    var t = this.GetDeltaTime();
    for (const i of this.Par.values()) this.UpdateCurveData(t, i);
    for (const e of this.Par.values())
      e.Counter >= e.WholeTime && this.war.push(e.Id);
    if (0 < this.war.length) {
      for (const r of this.war) this.Par.delete(r);
      this.war = [];
    }
  }
  SetPropertyFloat(t, i, e, r, s) {
    return void 0 !== this.Aar && (this.Aar.SetFloat(r, s, t, i, e), !0);
  }
  SetPropertyColor(t, i, e, r, s) {
    return void 0 !== this.Aar && (this.Aar.SetColor(r, s, t, i, e), !0);
  }
  SetPropertyLinearFloat(t, i, e, r, s, o = -1) {
    if (void 0 !== this.Aar) {
      if (!(o < 0))
        return (
          (o = RenderUtil_1.RenderUtil.GetFloat(s.FloatData, o)),
          this.Aar.SetFloat(r, o, t, i, e),
          !0
        );
      this.xar++,
        (o = new PropertyTimeCounter()).Init(
          this.xar,
          t,
          i,
          e,
          r,
          s.FloatData,
          void 0,
          s.Time,
          0,
        ),
        this.Par.set(this.xar, o);
    }
    return !1;
  }
  SetPropertyLinearColor(t, i, e, r, s, o = -1) {
    if (void 0 !== this.Aar) {
      if (!(o < 0))
        return (
          (o = RenderUtil_1.RenderUtil.GetColor(s.LinearColor, o)),
          this.Aar.SetColor(r, o, t, i, e),
          !0
        );
      this.xar++,
        (o = new PropertyTimeCounter()).Init(
          this.xar,
          t,
          i,
          e,
          r,
          void 0,
          s.LinearColor,
          s.Time,
          1,
        ),
        this.Par.set(this.xar, o);
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
