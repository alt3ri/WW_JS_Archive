
"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var s,i=arguments.length,n=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var f=e.length-1;0<=f;f--)(s=e[f])&&(n=(i<3?s(n):3<i?s(t,o,n):s(t,o))||n);return 3<i&&n&&Object.defineProperty(t,o,n),n};Object.defineProperty(exports,"__esModule",{value:!0}),exports.VisionBuffComponent=void 0;const RegisterComponent_1=require("../../../../../../Core/Entity/RegisterComponent"),CharacterBuffComponent_1=require("./CharacterBuffComponent");let VisionBuffComponent=class VisionBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent{constructor(){super(...arguments),this.P2r=void 0}x2r(){var e,t;return void 0!==this.P2r?this.P2r:(t=this.Entity.GetComponent(47)?.GetAttributeHolder())!==this.Entity&&((t=t?.CheckGetComponent(34))&&(e=t.GetVisionId(),t=t.GetVisionData(e),this.P2r=!0===t?.buff是否转移),this.P2r??!1)}AddBuff(e,t){!(this.CreatureDataId===t.InstigatorId)&&this.x2r()?this.Entity.GetComponent(47).GetAttributeHolder().GetComponent(157).AddBuff(e,t):super.AddBuff(e,t)}RemoveBuff(e,t,o){this.x2r()&&this.Entity.GetComponent(47).GetAttributeHolder().GetComponent(157).RemoveBuff(e,t,o),super.RemoveBuff(e,t,o)}};VisionBuffComponent=__decorate([(0,RegisterComponent_1.RegisterComponent)(159)],VisionBuffComponent),exports.VisionBuffComponent=VisionBuffComponent;
//# sourceMappingURL=VisionBuffComponent.js.map