
"use strict";var CharacterInputComponent_1,__decorate=this&&this.__decorate||function(t,i,s,e){var h,n=arguments.length,r=n<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,i,s,e);else for(var a=t.length-1;0<=a;a--)(h=t[a])&&(r=(n<3?h(r):3<n?h(i,s,r):h(i,s))||r);return 3<n&&r&&Object.defineProperty(i,s,r),r};Object.defineProperty(exports,"__esModule",{value:!0}),exports.CharacterInputComponent=void 0;const UE=require("ue"),Log_1=require("../../../../../Core/Common/Log"),Time_1=require("../../../../../Core/Common/Time"),CommonParamById_1=require("../../../../../Core/Define/ConfigCommon/CommonParamById"),EntityComponent_1=require("../../../../../Core/Entity/EntityComponent"),RegisterComponent_1=require("../../../../../Core/Entity/RegisterComponent"),ResourceSystem_1=require("../../../../../Core/Resource/ResourceSystem"),Vector_1=require("../../../../../Core/Utils/Math/Vector"),Vector2D_1=require("../../../../../Core/Utils/Math/Vector2D"),MathUtils_1=require("../../../../../Core/Utils/MathUtils"),CameraController_1=require("../../../../Camera/CameraController"),CameraUtility_1=require("../../../../Camera/CameraUtility"),EventDefine_1=require("../../../../Common/Event/EventDefine"),EventSystem_1=require("../../../../Common/Event/EventSystem"),Global_1=require("../../../../Global"),GlobalData_1=require("../../../../GlobalData"),InputController_1=require("../../../../Input/InputController"),InputEnums_1=require("../../../../Input/InputEnums"),InputFilter_1=require("../../../../Input/InputFilter"),InputFilterManager_1=require("../../../../Input/InputFilterManager"),ModelManager_1=require("../../../../Manager/ModelManager"),RoleGaitStatic_1=require("../../Role/Component/Define/RoleGaitStatic"),CharacterUnifiedStateTypes_1=require("./Abilities/CharacterUnifiedStateTypes"),CustomMovementDefine_1=require("./Move/CustomMovementDefine"),ZERO_TIME=0,NULL_CONFIG_TIME=-1,INVALID_INPUT_RESULT=0,INVALID_PRIORITY=-1,INVALID_PRIORITY_INDEX=-1,INVALID_INPUT_TIME=-1,MOVE_VECTOR_CACHE_TIME=100;class InputEvent{constructor(t,i,s){this.Action=void 0,this.State=void 0,this.Time=0,this.Action=t,this.State=i,this.Time=s}}class InputCommand{constructor(t,i,s,e){this.Action=void 0,this.State=void 0,this.Command=void 0,this.Index=0,this.Action=t,this.State=i,this.Command=s,this.Index=e}}class InputCache{constructor(t,i,s,e){this.Action=void 0,this.State=void 0,this.EventTime=0,this.Time=0,this.Action=t,this.State=i,this.EventTime=s,this.Time=e}}class AutomaticFlightData{constructor(t){this.MinFlySpeed=void 0,this.NormalFlySpeed=void 0,this.MaxFlySpeed=void 0,this.SpeedTransitionCurve=void 0,this.ForwardAxisResponseValue=void 0,this.BackwardAxisResponseValue=void 0,this.ForwardSkill=void 0,this.BackwardSkill=void 0,this.CurrentSkill=void 0,this.FlySpeed=void 0,this.LastFlySpeed=void 0,this.TargetFlySpeed=void 0,this.LastState=0,this.CurrentState=0,this.MinFlySpeed=t.低飞行速度,this.NormalFlySpeed=t.标准飞行速度,this.MaxFlySpeed=t.高飞行速度,this.SpeedTransitionCurve=t.速度过渡曲线,this.ForwardAxisResponseValue=t.前向轴输入响应比例,this.BackwardAxisResponseValue=0<t.后向轴输入响应比例?-t.后向轴输入响应比例:t.后向轴输入响应比例,this.ForwardSkill=t.前向轴输入响应技能,this.BackwardSkill=t.后向轴输入响应技能}}let CharacterInputComponent=CharacterInputComponent_1=class CharacterInputComponent extends EntityComponent_1.EntityComponent{constructor(){super(...arguments),this.Hte=void 0,this.Szo=void 0,this.Lie=void 0,this.mBe=void 0,this.rDr=void 0,this.Gce=void 0,this.aYo=void 0,this.a8r=void 0,this.h8r=void 0,this.BpInputComp=void 0,this.l8r=new Array,this._8r=new Array,this.QMe=new Map,this.XMe=void 0,this.u8r=void 0,this.c8r=void 0,this.m8r=void 0,this.d8r=INVALID_INPUT_TIME,this.cz=Vector_1.Vector.Create(),this.C8r=new Array,this.Rne=void 0,this.g8r=!1,this.f8r=void 0,this.p8r=0,this.v8r=0,this.M8r=0,this.S8r=0,this.txr=(t,i)=>{this.SetCharacterController(i),InputController_1.InputController.AddInputHandler(this)},this.ixr=(t,i)=>{this.l8r.length=0,this._8r.length=0,this.QMe.clear(),this.SetCharacterController(void 0),InputController_1.InputController.RemoveInputHandler(this)},this.XVr=()=>{this.E8r()},this.y8r=t=>{this.I8r()},this.T8r=this.L8r.bind(this),this.D8r=[],this.R8r=void 0,this.A8r=void 0,this.U8r=void 0,this.P8r=void 0,this.x8r=void 0,this.w8r=void 0,this.B8r=void 0,this.b8r=void 0,this.q8r=void 0,this.G8r=void 0,this.N8r=void 0,this.O8r=void 0,this.k8r=void 0,this.F8r=void 0,this.V8r=new Map,this.H8r=new Map}static get Dependencies(){return[3]}GetPriority(){return 0}GetInputFilter(){return this.XMe}HandlePressEvent(t,i){this.l8r.push(new InputEvent(t,1,i))}HandleReleaseEvent(t,i){this.l8r.push(new InputEvent(t,2,i)),CharacterInputComponent_1.j8r.set(t,!1)}HandleHoldEvent(t,i){this.l8r.push(new InputEvent(t,3,i))}HandleInputAxis(t,i){let s=i;if(ModelManager_1.ModelManager.PlatformModel.IsPc())switch(t){case InputEnums_1.EInputAxis.LookUp:case InputEnums_1.EInputAxis.Turn:case InputEnums_1.EInputAxis.Zoom:s/=Time_1.Time.DeltaTimeSeconds}ModelManager_1.ModelManager.PlatformModel.IsGamepad()&&t===InputEnums_1.EInputAxis.Zoom&&this.mBe?.DirectionState===CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection?this.QMe.set(t,0):this.QMe.set(t,s)}PreProcessInput(t,i){this.QMe.clear()}PostProcessInput(e,t){this.W8r(),this.K8r();const h=new Array;if(this.l8r.forEach((t,i)=>{var s=this.Q8r(e,t);s&&0!==s.CommandType&&h.push(new InputCommand(t.Action,t.State,s,i))}),0<this.D8r.length){let t=this.l8r.length;for(const n of this.D8r){var i=this.Q8r(e,n);i&&h.push(new InputCommand(n.Action,n.State,i,t)),t++}this.D8r.length=0}var s=this.X8r(h);this.$8r(s),this.l8r.length=0,3===s?.State&&CharacterInputComponent_1.j8r.set(s.Action,!0),void 0!==s&&(ModelManager_1.ModelManager.SundryModel.SceneCheckOn&&Log_1.Log.CheckDebug()&&Log_1.Log.Debug("Input",6,"ReceiveInput",["BestInputCommand",JSON.stringify(s)]),this.Y8r(s,"PostProcessInput"))}TestActionInput(t,i,s){t=new InputEvent(t,i,s);this.D8r.push(t)}Q8r(t,i){let s=void 0;switch(i.State){case 1:if(0<this.C8r.length)for(const h of this.C8r)if(h.ForbidExecuteCommand&&h.Action===i.Action&&h.State===i.State)return;this.J8r(i.Action,i.Time),s=this.z8r(i.Action,i.Time);break;case 2:if(0<this.C8r.length){for(const n of this.C8r)if(n.ReleaseHoldCache&&n.Action===i.Action&&3===n.State){for(let t=this._8r.length-1;0<=t;t--){var e=this._8r[t];e.Action===i.Action&&3===e.State&&this._8r.splice(t,1)}break}for(const r of this.C8r)if(r.ForbidExecuteCommand&&r.Action===i.Action&&r.State===i.State)return}this.Z8r(i.Action,i.Time),s=this.e9r(i.Action,i.Time);break;case 3:if(!this.t9r(i.Action,i.Time,t))return void(i.Action=InputEnums_1.EInputAction.None);if(0<this.C8r.length)for(const a of this.C8r)if(a.ForbidExecuteCommand&&a.Action===i.Action&&a.State===i.State)return;s=this.i9r(i.Action,i.Time)}return s}$8r(t){const h=this.o9r();const n=void 0!==t?t.Index:-1;this.l8r.forEach((i,t)=>{if(t!==n&&i.Action!==InputEnums_1.EInputAction.None){for(let t=this._8r.length-1;0<=t;t--){var s=this._8r[t];s.Action===i.Action&&s.State===i.State&&this._8r.slice(t,1)}if(0<this.C8r.length)for(const e of this.C8r)e.Action===i.Action&&e.State===i.State&&this._8r.push(new InputCache(i.Action,i.State,i.Time,h));else this.r9r(i.Action,i.State)!==ZERO_TIME&&this._8r.push(new InputCache(i.Action,i.State,i.Time,h))}})}SetMoveVectorCache(t,i){t.IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber)?(this.c8r=Vector2D_1.Vector2D.ZeroVector,this.m8r=Vector2D_1.Vector2D.ZeroVector):(this.c8r=t.GetSafeNormal(MathUtils_1.MathUtils.SmallNumber),this.m8r=i.GetSafeNormal(MathUtils_1.MathUtils.SmallNumber))}SetCharacterController(t){this.h8r=t}get CharacterController(){return this.h8r}get Character(){return this.a8r}SetCharacter(t){this.a8r=t}GetMoveVectorCache(){return this.u8r}GetMoveDirectionCache(){return this.c8r}GetWorldMoveDirectionCache(){if(!this.Hte.IsAutonomousProxy)return this.m8r;var t=Global_1.Global.CharacterCameraManager.GetCameraRotation().Yaw;if(this.aYo?.DirectionState===CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection){var i=ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;if(i){var s=i.TargetEntity;if(s)return s=this.n9r(s,i.TargetSocketName,t),UE.KismetMathLibrary.GetRotated2D(this.c8r,t+s)}}return UE.KismetMathLibrary.GetRotated2D(this.c8r,t)}GetMoveVector(){var t,i;return this.g8r?new UE.Vector2D(0,0):(t=this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward)??0,i=this.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight)??0,new UE.Vector2D(t,i))}GetMoveDirection(){return this.GetMoveVector().GetSafeNormal(MathUtils_1.MathUtils.SmallNumber)}GetCameraInput(){return[this.QueryInputAxis(InputEnums_1.EInputAxis.Turn)??0,this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp)??0]}GetZoomInput(){return this.QueryInputAxis(InputEnums_1.EInputAxis.Zoom)??0}QueryInputAxis(t){return this.QMe.get(t)}ClearMoveVectorCache(){this.u8r=Vector2D_1.Vector2D.ZeroVector,this.c8r=Vector2D_1.Vector2D.ZeroVector,this.m8r=Vector2D_1.Vector2D.ZeroVector,this.d8r=INVALID_INPUT_TIME}GetPhantomSkillIdBySlot(t){var i=this.a8r.GetEntityNoBlueprint();if(!i?.Valid)return INVALID_INPUT_RESULT;var i=i.GetComponent(0).GetRoleId();let s=0;return 1===t?s=ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId:2===t&&(i=ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i),s=i.GetPhantomData().GetPhantomId(t)),s=s??INVALID_INPUT_RESULT}AnimBreakPoint(){this.s9r()&&this.I8r()}ClearInputCache(i,s){if(0===i)this.I8r();else for(let t=this._8r.length-1;0<=t;t--){var e=this._8r[t];e.Action!==i||0!==e.State&&e.State!==s||this._8r.splice(t,1)}}LimitInputCache(i){this.C8r.push(i);for(let t=this._8r.length-1;0<=t;t--){var s=this._8r[t];s.Action!==i.Action||0!==s.State&&s.State!==i.State||this._8r.splice(t,1)}}CancelLimitInputCache(i){for(let t=0;t<this.C8r.length;t++)this.C8r[t]===i&&this.C8r.splice(t,1);this.AnimBreakPoint()}OnInitData(){return this.XMe=new InputFilter_1.InputFilter(InputFilterManager_1.InputFilterManager.CharacterActions,void 0,InputFilterManager_1.InputFilterManager.CharacterAxes,void 0),this.u8r=Vector2D_1.Vector2D.ZeroVector,this.c8r=Vector2D_1.Vector2D.ZeroVector,this.m8r=Vector2D_1.Vector2D.ZeroVector,this.v8r=CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionDistanceMin"),this.M8r=CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionDistanceMax"),this.S8r=CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionAngleThreshold"),!0}OnStart(){this.Hte=this.Entity.GetComponent(3);const i=this.Hte.Actor;return this.SetCharacter(i),this.h8r&&InputController_1.InputController.AddInputHandler(this),this.Szo=this.Entity.GetComponent(17),this.Lie=this.Entity.GetComponent(185),this.mBe=this.Entity.GetComponent(158),this.rDr=this.Entity.GetComponent(33),this.Gce=this.Entity.GetComponent(161),this.aYo=this.Entity.GetComponent(158),i.InputComponentClass?ResourceSystem_1.ResourceSystem.LoadAsync(i.InputComponentClass.AssetPathName?.toString(),UE.Class,t=>{this.BpInputComp=i.AddComponentByClass(t,!1,MathUtils_1.MathUtils.DefaultTransform,!1),this.BpInputComp.OwnerActor=i}):Log_1.Log.CheckError()&&Log_1.Log.Error("Input",6,"1060541 InputComponent init NoClass.",["Role",i.GetName()]),EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharAnimBreakPoint,this.T8r),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharPossessed,this.txr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharUnpossessed,this.ixr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharOnPositionStateChanged,this.XVr),EventSystem_1.EventSystem.AddWithTarget(this.Entity,EventDefine_1.EEventName.CharOnRoleDrownInjure,this.y8r),this.a9r(),!0}OnEnd(){return InputController_1.InputController.RemoveInputHandler(this),EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharAnimBreakPoint,this.T8r),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharPossessed,this.txr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharUnpossessed,this.ixr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharOnPositionStateChanged,this.XVr),EventSystem_1.EventSystem.RemoveWithTarget(this.Entity,EventDefine_1.EEventName.CharOnRoleDrownInjure,this.y8r),this.d8r=INVALID_INPUT_TIME,this.l8r.length=0,this._8r.length=0,this.QMe.clear(),this.h9r(),!0}OnTick(t){this.g8r?this.l9r(t):this.E8r()}a9r(){this.R8r=this._9r(-469423249,InputEnums_1.EInputAction.跳跃),this.A8r=this._9r(766688429,InputEnums_1.EInputAction.攀爬),this.U8r=this._9r(-542518289,InputEnums_1.EInputAction.攻击),this.P8r=this._9r(581080458,InputEnums_1.EInputAction.闪避),this.x8r=this._9r(-541178966,InputEnums_1.EInputAction.技能1),this.w8r=this._9r(-1802431900,InputEnums_1.EInputAction.幻象1),this.B8r=this._9r(-732810197,InputEnums_1.EInputAction.大招),this.b8r=this._9r(-1752099043,InputEnums_1.EInputAction.幻象2),this.q8r=this._9r(-1216591977,InputEnums_1.EInputAction.切换角色1),this.G8r=this._9r(-1199814358,InputEnums_1.EInputAction.切换角色2),this.N8r=this._9r(-1183036739,InputEnums_1.EInputAction.切换角色3),this.O8r=this._9r(-2140742267,InputEnums_1.EInputAction.锁定目标),this.k8r=this._9r(-1013832153,InputEnums_1.EInputAction.瞄准),this.F8r=this.u9r(1616400338,[InputEnums_1.EInputAxis.MoveForward,InputEnums_1.EInputAxis.MoveRight])}_9r(t,s){return this.Lie.ListenForTagAddOrRemove(t,(t,i)=>{i?this.XMe.BlockActions.add(s):this.XMe.BlockActions.delete(s)})}u9r(t,e){return this.Lie.ListenForTagAddOrRemove(t,(t,i)=>{for(const s of e)i?this.XMe.BlockAxes.add(s):this.XMe.BlockAxes.delete(s)})}h9r(){this.R8r.EndTask(),this.A8r.EndTask(),this.U8r.EndTask(),this.P8r.EndTask(),this.x8r.EndTask(),this.w8r.EndTask(),this.B8r.EndTask(),this.b8r.EndTask(),this.q8r.EndTask(),this.G8r.EndTask(),this.N8r.EndTask(),this.O8r.EndTask(),this.k8r.EndTask(),this.F8r.EndTask()}c9r(){return this.Gce?.CharacterMovement?.CustomMovementMode===CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE&&(this.Entity.GetComponent(30)?.LockRotator??!1)}E8r(){let t=void 0;if(this.Lie?.Valid&&this.mBe.Valid)if(this.Lie.HasTag(1996624497))t=this.GetWorldMoveDirectionCache(),this.Hte.SetInputDirectByNumber(t.X,t.Y,0),this.c9r()?this.Hte.SetInputRotator(this.Hte.ActorRotationProxy):this.m9r();else switch(t=this.aYo?.PositionState===CharacterUnifiedStateTypes_1.ECharPositionState.Climb||this.aYo?.MoveState===CharacterUnifiedStateTypes_1.ECharMoveState.Soar?this.GetMoveDirectionCache():this.GetWorldMoveDirectionCache(),this.Hte.SetInputDirectByNumber(t.X,t.Y,0),this.mBe.PositionState){case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:this.d9r();break;case CharacterUnifiedStateTypes_1.ECharPositionState.Air:case CharacterUnifiedStateTypes_1.ECharPositionState.Water:this.m9r()}else t=this.GetWorldMoveDirectionCache(),this.Hte.SetInputDirectByNumber(t.X,t.Y,0),this.m9r()}l9r(t){var i;this.Lie?.Valid&&this.Szo?.Valid&&(this.Lie.HasTag(1616400338)||(this.mBe.PositionState!==CharacterUnifiedStateTypes_1.ECharPositionState.Air?Log_1.Log.CheckError()&&Log_1.Log.Error("Input",30,"错误的位置状态"):void 0===this.f8r?Log_1.Log.CheckError()&&Log_1.Log.Error("Input",30,"自动飞行模式配置无效"):(this.f8r&&((i=this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward))>this.f8r.ForwardAxisResponseValue?(this.f8r.CurrentState=2,this.f8r.LastFlySpeed=this.f8r.TargetFlySpeed,this.f8r.TargetFlySpeed=this.f8r.MaxFlySpeed,this.Gce.SetMaxSpeed(this.f8r.MaxFlySpeed),0<this.f8r.ForwardSkill&&this.rDr.BeginSkill(this.f8r.ForwardSkill,{Target:this.Entity,Context:"EAutomaticFlightState.Max"})&&(this.f8r.CurrentSkill=this.f8r.ForwardSkill)):i<this.f8r.BackwardAxisResponseValue?(this.f8r.CurrentState=1,this.f8r.LastFlySpeed=this.f8r.TargetFlySpeed,this.f8r.TargetFlySpeed=this.f8r.MinFlySpeed,this.Gce.SetMaxSpeed(this.f8r.MinFlySpeed),0<this.f8r.BackwardSkill&&this.rDr.BeginSkill(this.f8r.BackwardSkill,{Target:this.Entity,Context:"EAutomaticFlightState.Min"})&&(this.f8r.CurrentSkill=this.f8r.BackwardSkill)):(this.f8r.CurrentState=0,this.f8r.LastFlySpeed=this.f8r.TargetFlySpeed,this.f8r.TargetFlySpeed=this.f8r.NormalFlySpeed,this.Gce.SetMaxSpeed(this.f8r.NormalFlySpeed),void 0!==this.f8r.CurrentSkill&&(this.rDr.EndSkill(this.f8r.CurrentSkill,"EAutomaticFlightState.Normal"),this.f8r.CurrentSkill=void 0))),this.f8r.LastState!==this.f8r.CurrentState&&(this.p8r=0),this.f8r.LastState=this.f8r.CurrentState,this.p8r+=t*MathUtils_1.MathUtils.MillisecondToSecond,i=this.f8r.SpeedTransitionCurve.GetVectorValue(this.p8r).X,this.f8r.FlySpeed=MathUtils_1.MathUtils.Lerp(this.f8r.LastFlySpeed,this.f8r.TargetFlySpeed,i),this.Hte.ActorForwardProxy.Multiply(this.f8r.FlySpeed,this.cz),this.Gce.SetForceSpeed(this.cz))))}C9r(){var t=this.Hte.Actor.Controller.GetControlRotation(),i=this.Hte.UseControllerRotation;this.Hte.SetInputRotatorByNumber(i.Pitch?t.Pitch:0,i.Yaw?t.Yaw:0,i.Roll?t.Roll:0)}d9r(){var t;this.Hte.UseControllerRotation.IsNearlyZero()?this.mBe.DirectionState===CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection&&(t=CameraController_1.CameraController.FightCamera.GetComponent(5),this.mBe.MoveState!==CharacterUnifiedStateTypes_1.ECharMoveState.Sprint)&&t?.TargetEntity&&t?.IsTargetLocationValid&&!this.Lie.HasTag(131819029)?(t.TargetLocation.Subtraction(this.Hte.ActorLocationProxy,this.cz),this.Hte.SetInputRotatorByNumber(0,this.cz.HeadingAngle()*MathUtils_1.MathUtils.RadToDeg,0)):this.m9r(!1):this.C9r()}m9r(t=!0){this.Hte.InputDirectProxy.SizeSquared2D()>MathUtils_1.MathUtils.SmallNumber?this.Hte.SetInputRotatorByNumber(0,MathUtils_1.MathUtils.GetAngleByVector2D(this.Hte.InputDirectProxy),0):t&&this.Hte.SetInputRotatorByNumber(0,this.Hte.ActorRotation.Yaw,0)}t9r(t,i,s){var[e,h]=this.GetHoldConfig(t);return h!==NULL_CONFIG_TIME&&!(i<h||!e&&(CharacterInputComponent_1.j8r.has(t)&&CharacterInputComponent_1.j8r.get(t)||!(h<i-s)))}W8r(){var t=this.GetMoveVector();this.g9r(t)?Time_1.Time.Now-this.d8r>MOVE_VECTOR_CACHE_TIME&&(this.u8r=t,this.c8r=t.GetSafeNormal(MathUtils_1.MathUtils.SmallNumber),this.d8r=INVALID_INPUT_TIME):(this.u8r=t,this.c8r=t.GetSafeNormal(MathUtils_1.MathUtils.SmallNumber),this.d8r=Time_1.Time.Now)}n9r(t,i,s){CameraUtility_1.CameraUtility.GetSocketLocation(void 0,i,this.cz,t),this.cz.SubtractionEqual(this.Hte.ActorLocationProxy);i=this.cz.Size2D();return i<this.v8r||(t=this.cz.HeadingAngle()*MathUtils_1.MathUtils.RadToDeg,t=MathUtils_1.MathUtils.WrapAngle(t-s),Math.abs(t)>this.S8r)?0:MathUtils_1.MathUtils.RangeClamp(i,this.v8r,this.M8r,0,t)}g9r(t){return 0!==ModelManager_1.ModelManager.PlatformModel.InputController?t.SizeSquared()<=MathUtils_1.MathUtils.Square(RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate()):t.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)}K8r(){var i=this.o9r();for(let t=this._8r.length-1;0<=t;t--){var s=this._8r[t],e=this.r9r(s.Action,s.State);0===this.C8r.length&&i-s.Time>e&&this._8r.splice(t,1)}}f9r(){var i=new Array;i.length=this._8r.length;for(let t=this._8r.length-1;0<=t;t--)i.push(this._8r[t]);return i}I8r(){this._8r.splice(0,this._8r.length)}s9r(){if(0===this._8r.length)return!1;var t=this.f9r();const h=new Array;t.forEach((t,i)=>{if(0<this.C8r.length)for(const e of this.C8r)if(e.ForbidExecuteCommand&&e.Action===t.Action&&e.State===t.State)return;let s=void 0;switch(t.State){case 1:s=this.z8r(t.Action,t.EventTime);break;case 2:s=this.e9r(t.Action,t.EventTime);break;case 3:s=this.i9r(t.Action,t.EventTime)}s&&0!==s.CommandType&&h.push(new InputCommand(t.Action,t.State,s,i))});t=this.X8r(h);return void 0!==t&&(3===t?.State&&CharacterInputComponent_1.j8r.set(t.Action,!0),this.Y8r(t,"QueryInputCaches"),!0)}L8r(t){this.a8r&&this.a8r.GetEntityIdNoBlueprint()===t&&this.s9r()&&this.I8r()}X8r(t){if(0!==t.length){let s=INVALID_PRIORITY,e=INVALID_PRIORITY_INDEX;return t.forEach((t,i)=>{t=this.p9r(t.Command);t>s&&(s=t,e=i)}),t[e]}}p9r(t){let i=void 0;switch(t.CommandType){case 1:i=this.v9r(t.IntValue);break;case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:i=InputController_1.InputController.QueryCommandPriority(t.CommandType)}return i=void 0===i?INVALID_PRIORITY:i}v9r(t){return(this.a8r?.CharacterActorComponent?.Entity?.GetComponent(33)).GetPriority(t)}Y8r(t,i){var s=t.Command;switch(s.CommandType){case 1:this.M9r(s.IntValue,i);break;case 2:this.S9r(s);break;case 3:this.E9r(s);break;case 4:this.y9r(s);break;case 5:this.I9r(s);break;case 6:this.T9r(s);break;case 7:this.L9r(s.IntValue);break;case 8:this.D9r(s);break;case 9:this.Szo.SendGameplayEventToActor(s.TagValue)}}S9r(t){var i=this.Entity.GetComponent(161);i.Valid&&(1===t.IntValue?i.JumpPress():i.JumpRelease())}E9r(t){this.Entity.GetComponent(31)?.ClimbPress(1===t.IntValue)}y9r(t){1===t.IntValue?this.a8r.CharacterActorComponent.Entity.CheckGetComponent(158).SprintPress():this.a8r.CharacterActorComponent.Entity.CheckGetComponent(158).SprintRelease()}I9r(t){this.a8r.CharacterActorComponent.Entity.CheckGetComponent(158).SwitchFastSwim(1===t.IntValue)}T9r(t){this.a8r.CharacterActorComponent.Entity.CheckGetComponent(158).SwitchFastClimb(1===t.IntValue)}D9r(t){this.a8r.CharacterActorComponent.Entity.CheckGetComponent(158).WalkPress()}L9r(t){}M9r(t,i){this.Entity.GetComponent(33).BeginSkill(t,{Context:"CharacterInputComponent.ExecuteSkill."+i})}o9r(){return UE.GameplayStatics.GetTimeSeconds(GlobalData_1.GlobalData.World)}SetActive(t){t?this.Rne&&(super.Enable(this.Rne,"[CharacterInputComponent.SetActive] this.DisableHandle=true"),this.Rne=void 0):this.Rne||(this.Rne=super.Disable("[CharacterInputComponent.SetActive] this.DisableHandle=false"))}J8r(t,i){if(this.Hte){if(this.BpInputComp)switch(t){case InputEnums_1.EInputAction.跳跃:this.BpInputComp.跳跃按下事件(i);break;case InputEnums_1.EInputAction.攀爬:this.BpInputComp.攀爬按下事件(i);break;case InputEnums_1.EInputAction.走跑切换:this.BpInputComp.走跑切换按下事件(i);break;case InputEnums_1.EInputAction.攻击:this.BpInputComp.攻击按下事件(i);break;case InputEnums_1.EInputAction.闪避:this.BpInputComp.闪避按下事件(i);break;case InputEnums_1.EInputAction.技能1:this.BpInputComp.技能1按下事件(i);break;case InputEnums_1.EInputAction.幻象1:this.BpInputComp.幻象1按下事件(i);break;case InputEnums_1.EInputAction.大招:this.BpInputComp.大招按下事件(i);break;case InputEnums_1.EInputAction.幻象2:this.BpInputComp.幻象2按下事件(i);break;case InputEnums_1.EInputAction.切换角色1:this.BpInputComp.切换角色1按下事件(i);break;case InputEnums_1.EInputAction.切换角色2:this.BpInputComp.切换角色2按下事件(i);break;case InputEnums_1.EInputAction.切换角色3:this.BpInputComp.切换角色3按下事件(i);break;case InputEnums_1.EInputAction.锁定目标:this.BpInputComp.锁定目标按下事件(i);break;case InputEnums_1.EInputAction.瞄准:this.BpInputComp.瞄准按下事件(i)}}else Log_1.Log.CheckError()&&Log_1.Log.Error("Input",6,"Entity Is End")}Z8r(t,i){if(this.Hte){if(this.BpInputComp)switch(t){case InputEnums_1.EInputAction.跳跃:this.BpInputComp.跳跃抬起事件(i);break;case InputEnums_1.EInputAction.攀爬:this.BpInputComp.攀爬抬起事件(i);break;case InputEnums_1.EInputAction.走跑切换:this.BpInputComp.走跑切换抬起事件(i);break;case InputEnums_1.EInputAction.攻击:this.BpInputComp.攻击抬起事件(i);break;case InputEnums_1.EInputAction.闪避:this.BpInputComp.闪避抬起事件(i);break;case InputEnums_1.EInputAction.技能1:this.BpInputComp.技能1抬起事件(i);break;case InputEnums_1.EInputAction.幻象1:this.BpInputComp.幻象1抬起事件(i);break;case InputEnums_1.EInputAction.大招:this.BpInputComp.大招抬起事件(i);break;case InputEnums_1.EInputAction.幻象2:this.BpInputComp.幻象2抬起事件(i);break;case InputEnums_1.EInputAction.切换角色1:this.BpInputComp.切换角色1抬起事件(i);break;case InputEnums_1.EInputAction.切换角色2:this.BpInputComp.切换角色2抬起事件(i);break;case InputEnums_1.EInputAction.切换角色3:this.BpInputComp.切换角色3抬起事件(i);break;case InputEnums_1.EInputAction.锁定目标:this.BpInputComp.锁定目标抬起事件(i);break;case InputEnums_1.EInputAction.瞄准:this.BpInputComp.瞄准抬起事件(i)}}else Log_1.Log.CheckError()&&Log_1.Log.Error("Input",6,"Entity Is End")}z8r(t,i){if(this.Hte){if(this.BpInputComp)switch(EventSystem_1.EventSystem.EmitWithTarget(this.Entity,EventDefine_1.EEventName.CharInputPress,t,i),t){case InputEnums_1.EInputAction.跳跃:return this.BpInputComp.跳跃按下(i);case InputEnums_1.EInputAction.攀爬:return this.BpInputComp.攀爬按下(i);case InputEnums_1.EInputAction.走跑切换:return this.BpInputComp.走跑切换按下(i);case InputEnums_1.EInputAction.攻击:return this.BpInputComp.攻击按下(i);case InputEnums_1.EInputAction.闪避:return this.BpInputComp.闪避按下(i);case InputEnums_1.EInputAction.技能1:return this.BpInputComp.技能1按下(i);case InputEnums_1.EInputAction.幻象1:return this.BpInputComp.幻象1按下(i);case InputEnums_1.EInputAction.大招:return this.BpInputComp.大招按下(i);case InputEnums_1.EInputAction.幻象2:return this.BpInputComp.幻象2按下(i);case InputEnums_1.EInputAction.切换角色1:return this.BpInputComp.切换角色1按下(i);case InputEnums_1.EInputAction.切换角色2:return this.BpInputComp.切换角色2按下(i);case InputEnums_1.EInputAction.切换角色3:return this.BpInputComp.切换角色3按下(i);case InputEnums_1.EInputAction.瞄准:return this.BpInputComp.瞄准按下(i);case InputEnums_1.EInputAction.通用交互:return this.BpInputComp.通用交互按下(i)}}else Log_1.Log.CheckError()&&Log_1.Log.Error("Input",6,"Entity Is End")}e9r(t,i){if(this.Hte){if(this.BpInputComp)switch(t){case InputEnums_1.EInputAction.跳跃:return this.BpInputComp.跳跃抬起(i);case InputEnums_1.EInputAction.攀爬:return this.BpInputComp.攀爬抬起(i);case InputEnums_1.EInputAction.走跑切换:return this.BpInputComp.走跑切换抬起(i);case InputEnums_1.EInputAction.攻击:return this.BpInputComp.攻击抬起(i);case InputEnums_1.EInputAction.闪避:return this.BpInputComp.闪避抬起(i);case InputEnums_1.EInputAction.技能1:return this.BpInputComp.技能1抬起(i);case InputEnums_1.EInputAction.幻象1:return this.BpInputComp.幻象1抬起(i);case InputEnums_1.EInputAction.大招:return this.BpInputComp.大招抬起(i);case InputEnums_1.EInputAction.幻象2:return this.BpInputComp.幻象2抬起(i);case InputEnums_1.EInputAction.切换角色1:return this.BpInputComp.切换角色1抬起(i);case InputEnums_1.EInputAction.切换角色2:return this.BpInputComp.切换角色2抬起(i);case InputEnums_1.EInputAction.切换角色3:return this.BpInputComp.切换角色3抬起(i);case InputEnums_1.EInputAction.瞄准:return this.BpInputComp.瞄准抬起(i)}}else Log_1.Log.CheckError()&&Log_1.Log.Error("Input",6,"Entity Is End")}i9r(t,i){if(this.Hte){if(this.BpInputComp)switch(t){case InputEnums_1.EInputAction.跳跃:return this.BpInputComp.跳跃长按(i);case InputEnums_1.EInputAction.攀爬:return this.BpInputComp.攀爬长按(i);case InputEnums_1.EInputAction.走跑切换:return this.BpInputComp.走跑切换长按(i);case InputEnums_1.EInputAction.攻击:return this.BpInputComp.攻击长按(i);case InputEnums_1.EInputAction.闪避:return this.BpInputComp.闪避长按(i);case InputEnums_1.EInputAction.技能1:return this.BpInputComp.技能1长按(i);case InputEnums_1.EInputAction.幻象1:return this.BpInputComp.幻象1长按(i);case InputEnums_1.EInputAction.大招:return this.BpInputComp.大招长按(i);case InputEnums_1.EInputAction.幻象2:return this.BpInputComp.幻象2长按(i);case InputEnums_1.EInputAction.切换角色1:return this.BpInputComp.切换角色1长按(i);case InputEnums_1.EInputAction.切换角色2:return this.BpInputComp.切换角色2长按(i);case InputEnums_1.EInputAction.切换角色3:return this.BpInputComp.切换角色3长按(i);case InputEnums_1.EInputAction.锁定目标:return this.BpInputComp.锁定目标长按(i);case InputEnums_1.EInputAction.瞄准:return this.BpInputComp.瞄准长按(i)}}else Log_1.Log.CheckError()&&Log_1.Log.Error("Input",6,"Entity Is End")}r9r(i,s){if(this.BpInputComp){let t=void 0;if(this.V8r.has(i)||(t=this.BpInputComp.GetUnrealCacheConfig(i),this.V8r.set(i,t)),t=t||this.V8r.get(i)){switch(s){case 1:return t.按下;case 3:return t.长按;case 2:return t.抬起}Log_1.Log.CheckError()&&Log_1.Log.Error("Character",15,"错误的输入状态 ",["state",s])}}return ZERO_TIME}GetHoldConfig(t){if(!this.BpInputComp)return[!1,NULL_CONFIG_TIME];let i=void 0;return this.H8r.has(t)||(i=this.BpInputComp.GetUnrealHoldConfig(t),this.H8r.set(t,i)),(i=i||this.H8r.get(t))?[i.连续触发,i.触发时间]:[!1,NULL_CONFIG_TIME]}TurnOnAutomaticFlightMode(t){this.g8r=!0,this.f8r=new AutomaticFlightData(t),this.Gce?.Valid&&(this.f8r.LastFlySpeed=this.f8r.NormalFlySpeed,this.f8r.TargetFlySpeed=this.f8r.NormalFlySpeed,this.Gce.SetMaxSpeed(this.f8r.NormalFlySpeed))}TurnOffAutomaticFlightMode(){this.g8r=!1,this.f8r=void 0,this.Gce?.Valid&&this.mBe.ResetCharState()}IsInAutomaticFlightMode(){return this.g8r}};CharacterInputComponent.j8r=new Map,CharacterInputComponent=CharacterInputComponent_1=__decorate([(0,RegisterComponent_1.RegisterComponent)(52)],CharacterInputComponent),exports.CharacterInputComponent=CharacterInputComponent;
//# sourceMappingURL=CharacterInputComponent.js.map