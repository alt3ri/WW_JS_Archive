
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VisionNameText=void 0;const UE=require("ue"),LguiUtil_1=require("../../../Util/LguiUtil");class VisionNameText{constructor(i){this.Hni=void 0,this.Hni=i}Update(i){var t=i.GetMonsterName();LguiUtil_1.LguiUtil.SetLocalTextNew(this.Hni,t),this.Hni.SetColor(UE.Color.FromHex(i.GetNameColor()))}}exports.VisionNameText=VisionNameText;
//# sourceMappingURL=VisionNameText.js.map