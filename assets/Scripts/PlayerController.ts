import { _decorator, Component, Vec3, input, Input, EventMouse, Animation } from 'cc'

const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = PlayerController
 * DateTime = Sun Feb 27 2022 12:18:52 GMT-0300 (Brasilia Standard Time)
 * Author = acquati
 * FileBasename = PlayerController.ts
 * FileBasenameNoExtension = PlayerController
 * URL = db://assets/Scripts/PlayerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('PlayerController')
export class PlayerController extends Component {
  // [1]
  // dummy = ''

  // [2]
  // @property
  // serializableDummy = 0

  // for fake tween
  private _startJump: boolean = false
  private _jumpStep: number = 0
  private _currentJumpTime: number = 0
  private _jumpTime: number = 0.1
  private _currentJumpSpeed: number = 0
  private _currentPosition: Vec3 = new Vec3()
  private _deltaPosition: Vec3 = new Vec3(0, 0, 0)
  private _targetPosition: Vec3 = new Vec3()
  private _isMoving = false

  start() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
  }

  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      this.jumpByStep(1)
    } else if (event.getButton() === 2) {
      this.jumpByStep(2)
    }
  }

  jumpByStep(step: number) {
    if (this._isMoving) {
      return
    }

    this._startJump = true
    this._jumpStep = step
    this._currentJumpTime = 0
    this._currentJumpSpeed = this._jumpStep / this._jumpTime
    this.node.getPosition(this._currentPosition)
    Vec3.add(this._targetPosition, this._currentPosition, new Vec3(this._jumpStep, 0, 0))

    this._isMoving = true
  }

  onOnceJumpEnd() {
    this._isMoving = false
  }

  update(deltaTime: number) {
    if (this._startJump) {
      this._currentJumpTime += deltaTime
      if (this._currentJumpTime > this._jumpTime) {
        // end
        this.node.setPosition(this._targetPosition)
        this._startJump = false
        this.onOnceJumpEnd()
      } else {
        // tween
        this.node.getPosition(this._currentPosition)
        this._deltaPosition.x = this._currentJumpSpeed * deltaTime
        Vec3.add(this._currentPosition, this._currentPosition, this._deltaPosition)
        this.node.setPosition(this._currentPosition)
      }
    }
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
