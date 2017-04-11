/* globals __DEV__ */
import Phaser from 'phaser'
import Pacman from '../sprites/Pacman'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    const cursors = this.input.keyboard.createCursorKeys();

    let map = this.add.tilemap('level');
    map.addTilesetImage('pacman_tiles', 'pacman_tiles');
    this.wallLayer = map.createLayer('walls');
    map.setCollisionBetween(1, 5000, true, this.wallLayer);
    this.addTitle();

    this.pacman = new Pacman({
      game: this.game,
      x: 192,
      y: 224,
      asset: 'pacman',
      cursors: cursors
    });

    this.game.add.existing(this.pacman);
  }

  update() {
    this.world.wrap(this.pacman, 0, true);
    this.physics.arcade.collide(this.pacman, this.wallLayer);
  }

  render () {
    if (__DEV__) {
      // this.game.debug.body(this.pacman);
    }
  }

  addTitle() {
    const bannerText = 'Pacman!'
    let banner = this.add.text(this.world.centerX, this.game.height - 32, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#ffffff'
    banner.smoothed = false
    banner.anchor.setTo(0.5)
  }
}
