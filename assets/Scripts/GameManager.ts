import { _decorator, Component, Vec3, Prefab, instantiate, Node, CCInteger, Label } from 'cc'
import { PlayerController } from './PlayerController'

const { ccclass, property } = _decorator

enum BlockType {
  BT_NONE,
  BT_STONE,
}

enum GameState {
  GS_INIT,
  GS_PLAYING,
  GS_END,
}

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Mon Feb 28 2022 01:44:07 GMT-0300 (Brasilia Standard Time)
 * Author = acquati
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/Scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
  @property({ type: Prefab })
  public cubePrfb: Prefab | null = null

  @property({ type: CCInteger })
  public roadLength: Number = 50

  @property({ type: PlayerController })
  public playerCtrl: PlayerController = null

  @property({ type: Node })
  public startMenu: Node = null

  @property({ type: Label })
  public stepsLabel: Label | null = null

  private _road: number[] = []
  private _curState: GameState = GameState.GS_INIT

  start() {
    this.curState = GameState.GS_INIT
    this.playerCtrl?.node.on('JumpEnd', this.onPlayerJumpEnd, this)
  }

  init() {
    if (this.startMenu) {
      this.startMenu.active = true
    }

    this.generateRoad()
    if (this.playerCtrl) {
      this.playerCtrl.setInputActive(false)
      this.playerCtrl.node.setPosition(Vec3.ZERO)
    }

    this.playerCtrl.reset()
  }

  set curState(value: GameState) {
    switch (value) {
      case GameState.GS_INIT:
        this.init()
        break
      case GameState.GS_PLAYING:
        if (this.startMenu) {
          this.startMenu.active = false
        }
        if (this.stepsLabel) {
          //  reset the number of steps to 0
          this.stepsLabel.string = '0'
        }
        // Directly setting active will directly start monitoring
        // mouse events, and do a little delay processing
        setTimeout(() => {
          if (this.playerCtrl) {
            this.playerCtrl.setInputActive(true)
          }
        }, 0.1)
        break
      case GameState.GS_END:
        break
    }
    this._curState = value
  }

  onStartButtonClicked() {
    this.curState = GameState.GS_PLAYING
  }

  generateRoad() {
    this.node.removeAllChildren()

    this._road = []
    // startPos
    this._road.push(BlockType.BT_STONE)

    for (let i = 1; i < this.roadLength; i++) {
      if (this._road[i - 1] === BlockType.BT_NONE) {
        this._road.push(BlockType.BT_STONE)
      } else {
        this._road.push(Math.floor(Math.random() * 2))
      }
    }

    for (let j = 0; j < this._road.length; j++) {
      const block: Node = this.spawnBlockByType(this._road[j])
      if (block) {
        this.node.addChild(block)
        block.setPosition(j, -1.5, 0)
      }
    }
  }

  spawnBlockByType(type: BlockType) {
    if (!this.cubePrfb) {
      return null
    }

    let block: Node | null = null
    switch (type) {
      case BlockType.BT_STONE:
        block = instantiate(this.cubePrfb)
        break
    }

    return block
  }

  onPlayerJumpEnd(moveIndex: number) {
    this.stepsLabel.string = '' + moveIndex
    this.checkResult(moveIndex)
  }

  checkResult(moveIndex: number) {
    if (moveIndex <= this.roadLength) {
      // Jump to the empty square
      if (this._road[moveIndex] === BlockType.BT_NONE) {
        this.curState = GameState.GS_INIT
      }
    } else {
      // skipped the maximum length
      this.curState = GameState.GS_INIT
    }
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
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
