class Zombie extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);

    }

    Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
    }

    update(time,delta)
    {
        this.follower.t += ENEMY_SPEED * delta;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }

        if (time > this.nextEnemy)
        {
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
            }

            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        }

    }

    startOnPath()
    {
        this.follower.t = 0;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

    }

}
this.follower = { t: 0, vec: new Phaser.Math.Vector2()};

//enemies = this.add.group({classType: Enemy, runChildUpdate: true});
this.nextEnemy = 0;

