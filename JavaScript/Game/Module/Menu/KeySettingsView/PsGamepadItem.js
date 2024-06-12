
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PsGamepadItem=void 0;const UE=require("ue"),GamepadItemBase_1=require("./GamepadItemBase");class PsGamepadItem extends GamepadItemBase_1.GamepadItemBase{OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UISprite],[1,UE.UISprite],[2,UE.UISprite],[3,UE.UISprite],[4,UE.UISprite],[5,UE.UISprite],[6,UE.UISprite],[7,UE.UISprite],[8,UE.UISprite],[9,UE.UISprite],[10,UE.UISprite],[11,UE.UISprite],[12,UE.UISprite],[13,UE.UISprite],[14,UE.UISprite],[15,UE.UISprite],[16,UE.UISprite]]}OnStart(){this.AddKeySprite("GenericUSBController_Axis1",this.GetSprite(0)),this.AddKeySprite("GenericUSBController_Axis2",this.GetSprite(0)),this.AddKeySprite("GenericUSBController_Axis3",this.GetSprite(1)),this.AddKeySprite("GenericUSBController_Axis4",this.GetSprite(1)),this.AddKeySprite("GenericUSBController_Axis5",this.GetSprite(0)),this.AddKeySprite("GenericUSBController_Axis6",this.GetSprite(1)),this.AddKeySprite("GenericUSBController_Button11",this.GetSprite(0)),this.AddKeySprite("GenericUSBController_Button12",this.GetSprite(1)),this.AddKeySprite("GenericUSBController_Button4",this.GetSprite(6)),this.AddKeySprite("GenericUSBController_Button2",this.GetSprite(7)),this.AddKeySprite("GenericUSBController_Button1",this.GetSprite(8)),this.AddKeySprite("GenericUSBController_Button3",this.GetSprite(9)),this.AddKeySprite("GenericUSBController_Button5",this.GetSprite(10)),this.AddKeySprite("GenericUSBController_Button7",this.GetSprite(11)),this.AddKeySprite("GenericUSBController_Button6",this.GetSprite(12)),this.AddKeySprite("GenericUSBController_Button8",this.GetSprite(13)),this.AddKeySprite("GenericUSBController_Button14",this.GetSprite(14)),this.AddKeySprite("GenericUSBController_Button10",this.GetSprite(15)),this.AddKeySprite("GenericUSBController_Button9",this.GetSprite(16)),this.AddKeySprite("GenericUSBController_Button9",this.GetSprite(16)),this.AddKeySprite("GenericUSBController_Button9",this.GetSprite(16)),this.AddKeySprite("GenericUSBController_Button9",this.GetSprite(16)),this.AddKeySprite("GenericUSBController_Button16",this.GetSprite(2)),this.AddKeySprite("GenericUSBController_Button17",this.GetSprite(5)),this.AddKeySprite("GenericUSBController_Button18",this.GetSprite(3)),this.AddKeySprite("GenericUSBController_Button19",this.GetSprite(4)),this.AddKeySprite("Gamepad_LeftY",this.GetSprite(0)),this.AddKeySprite("Gamepad_LeftX",this.GetSprite(0)),this.AddKeySprite("Gamepad_LeftThumbstick",this.GetSprite(0)),this.AddKeySprite("Gamepad_RightY",this.GetSprite(1)),this.AddKeySprite("Gamepad_RightX",this.GetSprite(1)),this.AddKeySprite("Gamepad_RightThumbstick",this.GetSprite(1)),this.AddKeySprite("Gamepad_DPad_Up",this.GetSprite(2)),this.AddKeySprite("Gamepad_DPad_Down",this.GetSprite(3)),this.AddKeySprite("Gamepad_DPad_Left",this.GetSprite(4)),this.AddKeySprite("Gamepad_DPad_Right",this.GetSprite(5)),this.AddKeySprite("Gamepad_FaceButton_Top",this.GetSprite(6)),this.AddKeySprite("Gamepad_FaceButton_Bottom",this.GetSprite(7)),this.AddKeySprite("Gamepad_FaceButton_Left",this.GetSprite(8)),this.AddKeySprite("Gamepad_FaceButton_Right",this.GetSprite(9)),this.AddKeySprite("Gamepad_LeftShoulder",this.GetSprite(10)),this.AddKeySprite("Gamepad_LeftTriggerAxis",this.GetSprite(11)),this.AddKeySprite("Gamepad_LeftTrigger",this.GetSprite(11)),this.AddKeySprite("Gamepad_RightShoulder",this.GetSprite(12)),this.AddKeySprite("Gamepad_RightTriggerAxis",this.GetSprite(13)),this.AddKeySprite("Gamepad_RightTrigger",this.GetSprite(13))}}exports.PsGamepadItem=PsGamepadItem;
//# sourceMappingURL=PsGamepadItem.js.map