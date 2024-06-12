
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TsBasePlayerController=void 0,Error.stackTraceLimit=500;const puerts_1=require("puerts"),UE=require("ue"),Log_1=require("../../Core/Common/Log"),FNameUtil_1=require("../../Core/Utils/FNameUtil"),Vector2D_1=require("../../Core/Utils/Math/Vector2D"),ObjectUtils_1=require("../../Core/Utils/ObjectUtils"),ModelManager_1=require("../Manager/ModelManager"),LogReportModel_1=require("../Module/LogReport/LogReportModel"),HotKeyViewDefine_1=require("../Module/UiNavigation/HotKeyViewDefine"),PlayerInputHandle_1=require("./PlayerInputHandle");class TsBasePlayerController extends UE.BasePlayerController{constructor(){super(...arguments),this.ActionHandleClass=void 0,this.AxisHandleClass=void 0,this.ActionHandleMap=void 0,this.AxisHandleMap=void 0,this.CurrentInputPosition=void 0,this.OnInputActionCallback=void 0,this.OnInputAxisCallback=void 0,this.PlayerInputHandle=void 0}ReceiveSetupInputComponent(){this.InitInputHandle(),this.AddInputBinding(),this.OnSetupInputComponent()}ReceiveBeginPlay(){super.ReceiveBeginPlay(),this.InitInputHandle()}ReceiveDestroyed(){ObjectUtils_1.ObjectUtils.IsValid(this)&&(this.ClearInputBinding(),this.PlayerInputHandle&&(this.PlayerInputHandle.Clear(),this.PlayerInputHandle=void 0),super.ReceiveDestroyed())}ReceiveTick(t){super.ReceiveTick(t),this.PlayerInputHandle?.Tick(t)}OnReceivedPlayer(){UE.KuroInputFunctionLibrary.ResetInputMode(this)}InitInputHandle(){this.PlayerInputHandle||(this.PlayerInputHandle=new PlayerInputHandle_1.PlayerInputHandle,this.PlayerInputHandle.Initialize())}AddInputBinding(){Log_1.Log.CheckInfo()&&Log_1.Log.Info("InputSettings",8,"添加PlayerController绑定输入",["PlayerController",this.GetName()]),this.BindActionHandle(),this.BindAxisHandle(),this.BindKeyHandle(),this.BindTouchHandle()}ClearInputBinding(){Log_1.Log.CheckInfo()&&Log_1.Log.Info("InputSettings",8,"清理PlayerController绑定输入",["PlayerController",this.GetName()]),this.ClearActionBindings(),this.ClearAxisBindings(),this.ClearKeyBindings(),this.ClearTouchBindings(),this.ClearActionHandle(),this.ClearAxisHandle(),this.OnInputActionCallback=void 0,this.OnInputAxisCallback=void 0}OnSetupInputComponent(){this.CurrentInputPosition=Vector2D_1.Vector2D.Create(0,0)}BindActionHandle(){}BindAxisHandle(){}BindKeyHandle(){this.AddKeyBinding(new UE.InputChord(new UE.Key(FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY)),!1,!1,!1,!1),0,this,new UE.FName(this.OnPressAnyKey.name)),this.AddKeyBinding(new UE.InputChord(new UE.Key(FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY)),!1,!1,!1,!1),1,this,new UE.FName(this.OnReleaseAnyKey.name))}BindTouchHandle(){this.AddTouchBinding(0,this,new UE.FName(this.OnTouchBegin.name)),this.AddTouchBinding(1,this,new UE.FName(this.OnTouchEnd.name)),this.AddTouchBinding(2,this,new UE.FName(this.OnTouchMove.name))}OnInputAction(t,e,i){LogReportModel_1.LogReportModel.RecordOperateTime(),this.PlayerInputHandle.InputAction(t,e,i)}OnInputAxis(t,e){LogReportModel_1.LogReportModel.RecordOperateTime(!0,t,e),this.PlayerInputHandle.InputAxis(t,e)}OnTouchBegin(t,e){this.PlayerInputHandle.TouchBegin(t,e),LogReportModel_1.LogReportModel.RecordOperateTime()}OnTouchEnd(t,e){this.PlayerInputHandle.TouchEnd(t,e)}OnTouchMove(t,e){this.PlayerInputHandle.TouchMove(t,e)}OnPressAnyKey(t){ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(t),LogReportModel_1.LogReportModel.RecordOperateTime(),this.PlayerInputHandle.PressAnyKey(t)}OnReleaseAnyKey(t){this.PlayerInputHandle.ReleaseAnyKey(t)}AddActionHandle(t){let e=this.GetActionHandle(t);e=e||this.NewActionHandle(t),this.OnInputActionCallback=(t,e,i)=>{this.OnInputAction(t,e,i)},e.AddActionBinding(t,this.OnInputActionCallback)}NewActionHandle(t){var e;if(this.ActionHandleClass&&this.ActionHandleClass.IsValid())return(e=UE.NewObject(this.ActionHandleClass,this)).Initialize(this),this.ActionHandleMap.Add(t,e),e;Log_1.Log.CheckError()&&Log_1.Log.Error("Controller",8,"当前Controller中的ActionHandleClass不存在",["ControllerName",this.GetName()])}RemoveActionHandle(t){var e=this.GetActionHandle(t);e&&(e.Reset(),this.ActionHandleMap.Remove(t))}GetActionHandle(t){return this.ActionHandleMap.Get(t)}ClearActionHandle(){for(let t=0;t<this.ActionHandleMap.Num();t++){var e=this.ActionHandleMap.GetKey(t),e=this.ActionHandleMap.Get(e);if(!e)return;e.Reset()}this.ActionHandleMap.Empty()}AddAxisHandle(t){let e=this.GetAxisHandle(t);e=e||this.NewAxisHandle(t),this.OnInputAxisCallback=(t,e)=>{this.OnInputAxis(t,e)},e.AddAxisBinding(t,this.OnInputAxisCallback)}NewAxisHandle(t){var e;if(this.AxisHandleClass&&this.AxisHandleClass.IsValid())return(e=UE.NewObject(this.AxisHandleClass,this)).Initialize(this),this.AxisHandleMap.Add(t,e),e;Log_1.Log.CheckError()&&Log_1.Log.Error("Controller",8,"当前Controller中的AxisHandleClass不存在",["ControllerName",this.GetName()])}RemoveAxisHandle(t){var e=this.GetActionHandle(t);e&&(e.Reset(),this.ActionHandleMap.Remove(t))}GetAxisHandle(t){return this.AxisHandleMap.Get(t)}ClearAxisHandle(){for(let t=0;t<this.AxisHandleMap.Num();t++){var e=this.AxisHandleMap.GetKey(t),e=this.AxisHandleMap.Get(e);if(!e)return;e.Reset()}this.AxisHandleMap.Empty()}GetInputPosition(t=0){var e=ModelManager_1.ModelManager.PlatformModel;return e.IsPc()?this.GetCursorPosition():e.IsMobile()?this.GetTouchPosition(t):void 0}GetCursorPosition(){var t=(0,puerts_1.$ref)(0),e=(0,puerts_1.$ref)(0);if(this.GetMousePosition(t,e))return this.CurrentInputPosition.X=(0,puerts_1.$unref)(t),this.CurrentInputPosition.Y=(0,puerts_1.$unref)(e),this.CurrentInputPosition}GetTouchPosition(t){var e=(0,puerts_1.$ref)(0),i=(0,puerts_1.$ref)(0);return this.GetInputTouchState(t,e,i,void 0),this.CurrentInputPosition.X=(0,puerts_1.$unref)(e),this.CurrentInputPosition.Y=(0,puerts_1.$unref)(i),this.CurrentInputPosition}IsInTouch(t){var e=(0,puerts_1.$ref)(!1);return this.GetInputTouchState(t,void 0,void 0,e),(0,puerts_1.$unref)(e)}SetIsPrintKeyName(t){this.PlayerInputHandle.IsPrintKeyName=t}}exports.TsBasePlayerController=TsBasePlayerController,exports.default=TsBasePlayerController;
//# sourceMappingURL=TsBasePlayerController.js.map