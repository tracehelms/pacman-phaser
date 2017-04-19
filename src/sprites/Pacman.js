import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
    this.animations.add("chomp", null, 10, true);
    this.direction = null;
    this.turning = null;
    this.turnAtX = null;
    this.turnAtY = null;
  }

  update() {
    // console.log("x", this.x);
    // console.log("y", this.y);
    // console.log("turning", this.turning);
    // console.log("turn at x", this.turnAtX);
    // console.log("turn at y", this.turnAtY);
    this.move();
    if (this.turning) {
      this.turn();
    }
  }

  getDirection() {
    this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  move() {
    switch (this.direction) {
      case Phaser.UP:
        this.scale.x = 1;
        this.angle = -90;
        this.animations.play("chomp");
        this.body.velocity.setTo(0, -100);
        break;
      case Phaser.DOWN:
        this.scale.x = 1;
        this.angle = 90;
        this.animations.play("chomp");
        this.body.velocity.setTo(0, 100);
        break;
      case Phaser.LEFT:
        this.scale.x = -1;
        this.angle = 0;
        this.animations.play("chomp");
        this.body.velocity.setTo(-100, 0);
        break;
      case Phaser.RIGHT:
        this.scale.x = 1;
        this.angle = 0;
        this.animations.play("chomp");
        this.body.velocity.setTo(100, 0);
        break;
      default:
        this.animations.stop();
        this.body.velocity.setTo(0, 0);
    }
  }

  turn() {
    const cx = Math.floor(this.x);
    const cy = Math.floor(this.y);
    const threshold = 3;

    if (this.game.math.fuzzyEqual(cx, this.turnAtX, threshold) && this.game.math.fuzzyEqual(cy, this.turnAtY, threshold)) {
      this.direction = this.turning;
      this.x = this.turnAtX;
      this.y = this.turnAtY;
      this.body.reset(this.turnAtX, this.turnAtY);
      this.turning = null;
    }
  }

  setTurn(direction, x, y) {
    this.turning = direction;
    this.turnAtX = x;
    this.turnAtY = y;
  }

  turningDirection() {
    return this.turning;
  }

}
