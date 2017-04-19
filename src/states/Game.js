/* globals __DEV__ */
import Phaser from 'phaser'
import Pacman from '../sprites/Pacman'

export default class extends Phaser.State {
  constructor() {
    super();
    this.marker = {};
    this.map = null;
    this.directions = {};
    this.cursors = null;
    this.gridSize = 32;
  }
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.map = this.add.tilemap('level');
    this.map.addTilesetImage('pacman_tiles', 'pacman_tiles');
    this.wallLayer = this.map.createLayer('walls');
    this.map.setCollisionBetween(1, 5000, true, this.wallLayer);
    this.addTitle();

    this.pacman = new Pacman({
      game: this.game,
      x: 208,
      y: 240,
      asset: 'pacman'
    });

    this.game.add.existing(this.pacman);
  }

  update() {
    this.world.wrap(this.pacman, 0, true);
    this.physics.arcade.collide(this.pacman, this.wallLayer);

    this.checkKeys();
  }

  render () {
    if (__DEV__) {
      // this.game.debug.body(this.pacman);
    }
  }

  checkKeys() {
    if (this.cursors.up.isDown && this.pacman.getDirection() !== Phaser.UP) {
      this.checkDirection(Phaser.UP);
    } else if (this.cursors.down.isDown && this.pacman.getDirection() !== Phaser.DOWN) {
      this.checkDirection(Phaser.DOWN);
    } else if (this.cursors.left.isDown && this.pacman.getDirection() !== Phaser.LEFT) {
      this.checkDirection(Phaser.LEFT);
    } else if (this.cursors.right.isDown && this.pacman.getDirection() !== Phaser.RIGHT) {
      this.checkDirection(Phaser.RIGHT);
    }
  }

  checkDirection(direction) {
    if (direction === this.pacman.getDirection() || direction === this.pacman.turningDirection()) {
      return null;
    }

    const i = this.wallLayer.index;
    const x = this.math.snapToFloor(Math.floor(this.pacman.x), 32) / 32;
    const y = this.math.snapToFloor(Math.floor(this.pacman.y), 32) / 32;
    let result = null;

    switch (direction) {
      case Phaser.UP:
        result = this.map.getTileAbove(i, x, y);
        break;
      case Phaser.DOWN:
        result = this.map.getTileBelow(i, x, y);
        break;
      case Phaser.LEFT:
        result = this.map.getTileLeft(i, x, y);
        break;
      case Phaser.RIGHT:
        result = this.map.getTileRight(i, x, y);
        break;
    }

    if (result.index === -1) {
      const turnPointX = (x * this.gridSize) + (this.gridSize / 2);
      const turnPointY = (y * this.gridSize) + (this.gridSize / 2);

      // this.pacman.setDirection(direction);
      this.pacman.setTurn(direction, turnPointX, turnPointY);
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
