import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, cursors}) {
    super(game, x, y, asset);
    game.physics.arcade.enable(this);
    this.body.width = 28;
    this.body.height = 28;

    this.anchor.setTo(0.5);
    this.animations.add("chomp", null, 10, true);
    this.cursors = cursors;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.angle = 180;
      this.animations.play("chomp");
      this.body.velocity.setTo(-100, 0);
    } else if (this.cursors.right.isDown) {
      this.angle = 0;
      this.animations.play("chomp");
      this.body.velocity.setTo(100, 0);
    } else if (this.cursors.up.isDown) {
      this.angle = -90;
      this.animations.play("chomp");
      this.body.velocity.setTo(0, -100);
    } else if (this.cursors.down.isDown) {
      this.angle = 90;
      this.animations.play("chomp");
      this.body.velocity.setTo(0, 100);
    } else {
      this.animations.stop();
      this.body.velocity.setTo(0, 0);
    }
  }
}
