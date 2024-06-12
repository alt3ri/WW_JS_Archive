
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BlackboardMap=exports.BlackboardParam=void 0;const Log_1=require("../../../Core/Common/Log"),Protocol_1=require("../../../Core/Define/Net/Protocol"),MathUtils_1=require("../../../Core/Utils/MathUtils");class BlackboardParam{constructor(t){this.jSe="",this.epr=0,this.tpr=void 0,this.ipr=!1,this.rpr=0,this.npr="",this.IGe=void 0,this.spr=void 0,this.apr=void 0,this.hpr=void 0,this.S9=t}static CreateByProtocol(t){if(void 0!==t){var r=t,e=new BlackboardParam(r.Ikn),t=(e.SetKey(r.Ckn),Protocol_1.Aki.Protocol.u2s);switch(r.Ikn){case t.Proto_BlackboardParamType_Int:return e.SetIntValue(r.Z3n),e;case t.Proto_BlackboardParamType_IntArray:return e.SetIntValues(r.D7n.A7n),e;case t.Proto_BlackboardParamType_Long:return e.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(r.U7n)),e;case t.Proto_BlackboardParamType_LongArray:var s=r.R7n.A7n,a=new Array;for(const i of s)a.push(MathUtils_1.MathUtils.LongToBigInt(i));return e.SetLongValues(a),e;case t.Proto_BlackboardParamType_Boolean:return e.SetBooleanValue(r.x7n),e;case t.Proto_BlackboardParamType_String:return e.SetStringValue(r.t4n),e;case t.Proto_BlackboardParamType_StringArray:return e.SetStringValues(r.w7n.A7n),e;case t.Proto_BlackboardParamType_Float:return e.SetFloatValue(r.P7n),e;case t.Proto_BlackboardParamType_FloatArray:return e.SetFloatValues(r.B7n.A7n),e;case t.Proto_BlackboardParamType_Vector:return e.SetVectorValue(r.b7n.X,r.b7n.Y,r.b7n.Z),e;case t.Proto_BlackboardParamType_VectorArray:return e.SetVectorValues(r.q7n.A7n),e;case t.Proto_BlackboardParamType_Rotator:return e.SetRotatorValue(r.G7n.Pitch,r.G7n.Roll,r.G7n.Yaw),e;case t.Proto_BlackboardParamType_RotatorArray:return e.SetRotatorValues(r.O7n.A7n),e;case t.Proto_BlackboardParamType_Entity:return e.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(r.U7n)),e;case t.Proto_BlackboardParamType_EntityArray:var s=r.R7n.A7n,o=new Array;for(const l of s)o.push(MathUtils_1.MathUtils.LongToBigInt(l));return e.SetLongValues(o),e;default:return}}}GetKey(){return this.jSe}GetType(){return this.S9}SetKey(t){this.jSe=t}GetIntValue(){return this.epr}SetIntValue(t){this.epr=t}GetIntValues(){return this.lpr}SetIntValues(t){this.lpr=t}GetLongValue(){return this.tpr}SetLongValue(t){this.tpr=t}GetLongValues(){return this._pr}SetLongValues(t){this._pr=t}GetBooleanValue(){return this.ipr}SetBooleanValue(t){this.ipr=t}GetFloatValue(){return this.rpr}SetFloatValue(t){this.rpr=t}GetFloatValues(){return this.upr}SetFloatValues(t){this.upr=t}GetStringValue(){return this.npr}SetStringValue(t){this.npr=t}GetStringValues(){return this.cpr}SetStringValues(t){this.cpr=t}GetVectorValue(){return this.IGe}SetVectorValue(t,r,e){this.IGe||(this.IGe=Protocol_1.Aki.Protocol.VBs.create()),this.IGe.X=t,this.IGe.Y=r,this.IGe.Z=e}GetVectorValues(){return this.spr}SetVectorValues(t){this.spr=t}GetRotatorValue(){return this.apr}SetRotatorValue(t,r,e){this.apr||(this.apr=Protocol_1.Aki.Protocol.iws.create()),this.apr.Pitch=t,this.apr.Roll=r,this.apr.Yaw=e}GetRotatorValues(){return this.hpr}SetRotatorValues(t){this.hpr=t}ToString(){var t=Protocol_1.Aki.Protocol.u2s;switch(this.S9){case t.Proto_BlackboardParamType_Int:return this.epr.toString();case t.Proto_BlackboardParamType_IntArray:{let r="[";if(void 0!==this.lpr){var e=this.lpr.length;for(let t=0;t<e;t++)r+=this.lpr[t],t!==e-1&&(r+=", ")}return r+="]"}case t.Proto_BlackboardParamType_Long:return this.tpr.toString();case t.Proto_BlackboardParamType_LongArray:{let r="[";if(void 0!==this._pr){var s=this._pr.length;for(let t=0;t<s;t++)r+=this._pr[t],t!==s-1&&(r+=", ")}return r+="]"}case t.Proto_BlackboardParamType_Boolean:return this.ipr.toString();case t.Proto_BlackboardParamType_String:return this.npr;case t.Proto_BlackboardParamType_StringArray:{let r="[";if(void 0!==this.cpr){var a=this.cpr.length;for(let t=0;t<a;t++)r+=this.cpr[t],t!==a-1&&(r+=", ")}return r+="]"}case t.Proto_BlackboardParamType_Float:return this.rpr.toString();case t.Proto_BlackboardParamType_FloatArray:{let r="[";if(void 0!==this.upr){var o=this.upr.length;for(let t=0;t<o;t++)r+=this.upr[t],t!==o-1&&(r+=", ")}return r+="]"}case t.Proto_BlackboardParamType_Vector:{let t="";return void 0!==this.IGe&&(t+=`X:${this.IGe.X} Y:${this.IGe.Y} Z:`+this.IGe.Z),t}case t.Proto_BlackboardParamType_VectorArray:{let r="[";if(void 0!==this.spr){var i=this.spr.length;for(let t=0;t<i;t++){var l=this.spr[t];r+=`X:${l.X} Y:${l.Y} Z:`+l.Z,t!==i-1&&(r+=", ")}}return r+="]"}case t.Proto_BlackboardParamType_Rotator:{let t="";return void 0!==this.apr&&(t+=`Pitch:${this.apr.Pitch} Roll:${this.apr.Roll} Yaw:`+this.apr.Yaw),t}case t.Proto_BlackboardParamType_RotatorArray:{let r="[";if(void 0!==this.hpr){var u=this.hpr.length;for(let t=0;t<u;t++){var n=this.hpr[t];r+=`Pitch:${n.Pitch} Roll:${n.Roll} Yaw:`+n.Yaw,t!==u-1&&(r+=", ")}}return r+="]"}default:return""}}}exports.BlackboardParam=BlackboardParam;class BlackboardMap{constructor(){this.BlackboardMap=new Map}GetValue(t){t=this.BlackboardMap.get(t);return t||void 0}HasValue(t){return this.BlackboardMap.has(t)}SetValue(t,r){this.BlackboardMap.set(t,r)}RemoveValue(t){return this.BlackboardMap.delete(t)}Clear(){this.BlackboardMap.clear()}ToString(){let t="";for(const e of this.BlackboardMap.keys()){var r=this.BlackboardMap.get(e);t+=`key:${e}  type:${BlackboardMap.mpr(r.GetType())}  value:${r?.ToString()}
`}return t}static CheckValueType(t,r,e){return r.GetType()===e||(Log_1.Log.CheckError()&&Log_1.Log.Error("World",3,"[BlackboardMap.CheckValue] 设置黑板值失败,因为相同的Key使用了不同的数据类型。",["Key",t],["Old字段类型",BlackboardMap.mpr(r.GetType())],["New字段类型",BlackboardMap.mpr(e)]),!1)}static mpr(t){switch(t){case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None:return"none";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int:return"int";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray:return"array<int>";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long:return"long";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray:return"array<long>";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean:return"boolean";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String:return"string";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray:return"array<string>";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float:return"float";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray:return"array<float>";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector:return"vector";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray:return"array<vector>";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator:return"rotator";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray:return"array<rotator>";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity:return"entity";case Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray:return"array<entity>";default:return}}}exports.BlackboardMap=BlackboardMap;
//# sourceMappingURL=BlackboardMap.js.map