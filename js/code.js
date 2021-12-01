;
let f1Tl, f2Tl, dragItem, txt1, txt2, startX, startY, food, cheese;
let canCheck = false;
let f1Check = false;
let isGoal = false;

function firstFrameAni() {

    dragItem = gsap.to('.drag', {
        rotation: 5,
        scale: R(1.02, 0.95),
        ease: Sine.easeInOut,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        paused: true,
    });

    txt1 = gsap.to('.txt1', {
        // x: R(-7, 7),
        y: 8,
        // scale: R(1.05, 0.9),
        ease: Sine.easeInOut,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        paused: true,
    });

    txt2 = gsap.to('.txt2', {
        scale: 1.1,
        ease: Bounce.easeOut,
        yoyoEase: Power3.easeOut,
        duration: 0.4,
        stagger: 0.2,
        repeat: -1,
        // yoyo: true,
        paused: true,
    });

    food = gsap.to('.burger-after,.pizza-after', {
        x: R(-5, 5),
        y: R(-5, 5),
        scale: R(1.05, 0.95),
        ease: Sine.easeInOut,
        duration: 1,
        repeat: -1,
        yoyo: true,
        paused: true,
    });

    cheese = gsap.to('.ball', {
        // x: R(-5, 5),
        // y: R(-5, 5),
        scale: R(1.05, 0.95),
        ease: Sine.easeInOut,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        // paused: true,
    });

    f1Tl = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: 'back.out(1.5)',
            },
            onComplete: function () {
                txt1.play();
                block.adArea.addEventListener('click', ctaFunction);
            }
        })
        .to('.bg1', {
            opacity: 1,
        })
        .to('.logo', {
            opacity: 1,
            left: 0,
        }, '-=0.3')
        .to('.burger', {
            opacity: 1,
            left: 0,
            // scale: 1,
            rotation: 0,
        }, '-=0.3')
        .to('.pizza', {
            opacity: 1,
            left: 0,
            // scale: 1,
            rotation: 0,
        }, '-=0.3')
        .to('.txt1', {
            opacity: 1,
            scale: 1,
        }, '-=0.1')
        .to('.drag', {
            opacity: 1,
        }, '-=0.3')
        .to('.drag-icon, .shadow', {
            opacity: 1,
        }, '-=0.3');
};

function onDragAction(drag) {
    gsap.set('.ball', {
        // rotation: '+=5',
        scale: 1.05,
    });
}

function onDragEndActions(drag) {
    startX = drag.startX;
    startY = drag.startY;

    if (drag.hitTest('.drop-left', '50%') && !isGoal) {
        startEvent("Burger");
        drag.disable();
        isGoal = true;
        gsap.set('.shadow', {opacity: 0,})

        let tl = gsap.timeline({
            onComplete: function () {
                
            }
        })
        .to('.ball', 0.3, {
            scale: 0,
            opacity: 0,
        })
        .to('.burger, .pizza', 0.3, {
            scale: 0,
            opacity: 0,
            ease: 'power2.out',
        })
        .to('.burger-after', 0.5, {
            scale: 1,
            top: 0,
            left: 0,
            opacity: 1,
            ease: 'power2.out',
        }, '-=0.2' );
        secondFrameAni();
        
    } else if (drag.hitTest('.drop-right', '50%') && !isGoal) {
        startEvent("Pizza");
        drag.disable();
        isGoal = true;
        gsap.set('.shadow', {opacity: 0,})

        let tl = gsap.timeline({
            onComplete: function () {
                
            }
        })
        .to('.ball', 0.3, {
            scale: 0,
            opacity: 0,
        })
        .to('.burger, .pizza', 0.3, {
            scale: 0,
            opacity: 0,
            ease: 'power2.out',
        })
        .to('.pizza-after', 0.5, {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
        }, '-=0.2' );
        secondFrameAni();
    } else {
        gsap.to(drag.target, 0.6, {
            x: startX,
            y: startY,
            ease: Power2.easeOut,
            onComplete: function(){
                gsap.set('.shadow', {opacity: 1,})
            }
        })
    }
};

function dragActivity() {
    myDraggable = Draggable.create(block.drag, {
        type: "x,y",
        edgeResistance: 1,
        bounds: block.adArea,
        cursor: "move",
        inertia: true,
        onPress: function (e) {
            e.stopPropagation()
        },
        onDragStart: function (e) {
            e.stopPropagation();
            startedFunction();
            block.adArea.classList.add('has-click');
            gsap.set('.shadow', {opacity: 0,})
        },
        onDrag: function (e) {
            e.stopPropagation();
            onDragAction(this);
        },
        onDragEnd: async function (e) {
            onDragEndActions(this);
        }
    });
}

function R(max, min) {
    return Math.random() * (max - min) + min
}

function secondFrameAni() {
    txt1.kill();

    let tl = gsap.timeline({
            onComplete: function () {
                finishedFunction();
                food.play();
            }
        })
        .to('.drag, .drop', 0.5, {
            delay: 0.3,
            opacity: 0,
            scale: 0,
        })
        .to('.txt1', 0.4, {
            opacity: 0,
            top: 0,
            ease: 'power2.out',
        }, '-=0.4')
        .to('.txt2', 0.4, {
            opacity: 1,
            scale: 1,
            left: 0,
            ease: 'power2.out',
            onComplete: function(){
                gsap.to('.txt2', {
                    y: 8,
                    ease: Sine.easeInOut,
                    duration: 0.7,
                    repeat: -1,
                    yoyo: true,
                })
            }
        }, '-=0.3')
        .to('.cta', 0.5, {
            delay: 0.3,
            bottom: 10,
            opacity: 1,
            ease: 'back.out(1.5)',
            onComplete: function(){
                gsap.to('.cta', 0.5, {
                    scaleX: 0.9,
                    yoyo: true,
                    repeat: -1,
                    ease: 'back.out(2)',
                })
            }
        }, '-=0.3')
};

window.addEventListener('load', () => {

    gsap.to('#preloader', 0.1, {
        display: 'none',
        onComplete: function () {
            firstFrameAni();
            dragActivity();
        }
    });

});