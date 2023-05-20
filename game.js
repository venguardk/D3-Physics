// level implementation

class Test extends Phaser.Scene{
    constructor(){
        super('test');
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('ball', 'Ball Sprite.png');
        this.load.image('ground','Ground Tile.png');
    }

    create(){
        const golf = this.physics.add.image(100, 100, 'ball');
        golf.setScale(0.5);

        golf.setCircle(50);
        golf.setCollideWorldBounds(true);
        golf.setBounce(1);
        golf.setVelocity(150);

        const platform = this.add.tileSprite(400, 400, 100 * 10, 100, 'ground');
        this.physics.add.existing(platform, true);

        this.physics.add.collider(golf, platform);
    }
}

const game = new Phaser.Game({
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 100}
        }
    },
    scene:[Test],
    title: "Physics"
});