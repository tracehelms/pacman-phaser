import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    // load your assets
    this.load.tilemap('level', 'assets/tilemaps/pacman_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('pacman_tiles', 'assets/images/pacman_tiles.png');
    this.load.spritesheet('pacman', 'assets/sprites/pacman_sprite.png', 32, 32);
  }

  create () {
    this.state.start('Game')
  }
}
