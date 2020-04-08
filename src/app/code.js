import {
    SSL_OP_CRYPTOPRO_TLSEXT_BUG
} from "constants";

$(function () {
    $('[data-toggle]').on("click", function (e) {
        e.preventDefault();
        let dataValue = $(this).data('toggle')
        let newDataValue = $(`[data-${dataValue}]`)
        setTimeout(function () {

            newDataValue.toggleClass(`${dataValue}__show`)
            if ($('.toggleMenu').css("display") == 'none') {
                $('.toggleMenu').css('display', "flex").hide().fadeIn();
            } else {
                $('.toggleMenu').fadeOut();

            }
        }, 800)

        $('.navbar__menu').toggleClass('toggle')

        let op = $('.navbar__navItems').children("a").css('opacity');
        $('.navbar__navItems').children("a").css('position', 'relative')
        if (op == 1) {
            $('.navbar__navItems').children("a").eq(0).animate({
                opacity: 0,
                top: '-30px'
            })
            $('.navbar__navItems').children("a").eq(1).delay(200).animate({
                opacity: 0,
                top: '-30px'
            })
            $('.navbar__navItems').children("a").eq(2).delay(400).animate({
                opacity: 0,
                top: '-30px'
            })
            $('.navbar__navItems').children("a").eq(3).delay(600).animate({
                opacity: 0,
                top: '-30px'
            })


        } else if (op == 0) {
            $('.navbar__navItems').children("a").eq(0).delay(800).animate({
                opacity: 1,
                top: '0'
            })
            $('.navbar__navItems').children("a").eq(1).delay(1000).animate({
                opacity: 1,
                top: '0'
            })
            $('.navbar__navItems').children("a").eq(2).delay(1200).animate({
                opacity: 1,
                top: '0'
            })
            $('.navbar__navItems').children("a").eq(3).delay(1400).animate({
                opacity: 1,
                top: '0'
            })
        }

        let opacityMenu = $('.toggleMenu').children('a').css('opacity')
        if (opacityMenu == 0) {
            $('.toggleMenu').children('a').eq(0).delay(1000).animate({
                opacity: 1,
                fontSize: '42px'
            })
            $('.toggleMenu').children('a').eq(1).delay(1200).animate({
                opacity: 1,
                fontSize: '42px'
            })
            $('.toggleMenu').children('a').eq(2).delay(1400).animate({
                opacity: 1,
                fontSize: '42px'
            })
            $('.toggleMenu').children('a').eq(3).delay(1600).animate({
                opacity: 1,
                fontSize: '42px'
            })
            $('.toggleMenu').children('a').eq(4).delay(1800).animate({
                opacity: 1,
                fontSize: '42px'
            })

        } else if (opacityMenu == 1) {
            $('.toggleMenu').children('a').eq(0).animate({
                opacity: 0,
                fontSize: '32px'
            })
            $('.toggleMenu').children('a').eq(1).delay(200).animate({
                opacity: 0,
                fontSize: '32px'
            })
            $('.toggleMenu').children('a').eq(2).delay(400).animate({
                opacity: 0,
                fontSize: '32px'
            })
            $('.toggleMenu').children('a').eq(3).delay(600).animate({
                opacity: 0,
                fontSize: '32px'
            })
            $('.toggleMenu').children('a').eq(4).delay(800).animate({
                opacity: 0,
                fontSize: '32px'
            })

        }

    })

    $('.toggleMenu a').mouseenter(function () {
        $('.underline', this).animate({
            opacity: 1,
            top: '-4px'
        })

    })
    $('.toggleMenu a').mouseleave(function () {
        $('.underline', this).animate({
            opacity: 0,
            top: '4px'
        })
    })

    let opTextScroll
    let translateYSet
    let translateYChangeOp
    let matrixXYSet
    let opTextScrollSet
    let numPxScrolled
    let elemTopSet
    const opSetArray = []
    let elemTop

    const opTextScrollDefault = 0
    const matrixXYDefault = 0.4
    let diff = 0
    const scaleFactor = 0.001
    const opacityFactor = 0.004
    const opacityFactorFadeOut = 0.004
    let scrollHeightInitial

    $('.introduction__text').children('p').each(function (idx) {

        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height() - 100;
        let windowHeight = docViewBottom - docViewTop

        translateYSet = idx * 100;
        opTextScrollSet = opTextScrollDefault
        matrixXYSet = matrixXYDefault

        if (idx <= 4) {
            let elemTopVisb = windowHeight
            let elemTopScrolledVisb = $(this).offset().top + 100 * idx
            diff = elemTopVisb - elemTopScrolledVisb
            console.log('diff', diff)
            opTextScrollSet = opTextScrollDefault + opacityFactor * diff
            matrixXYSet = matrixXYDefault + scaleFactor * diff

        }

        elemTop = $(this).offset().top

        $(this).css({
            'transform': 'translate(0%,' + translateYSet + 'px) scale(' + matrixXYSet + ',' + matrixXYSet + ') translate3d(0px,0px,0px)',
            opacity: opTextScrollSet
        });

        scrollHeightInitial = $('.introduction__text .last').offset().top - 215

        console.log(this)

    })

    let scrollPercent
    let matrixXY
    let scaleRetrieved
    let elemTopScrolled = 0
    let translateRetrieved

    $('.introduction__text').on('scroll', function () {

        let s = $('.introduction__text').scrollTop(),
            c = $('.introduction__text').height();

        scrollPercent = (s / c) * 100;

        const translateArrayCheck = []
        const translateArraySet = []
        const matrixXYArraySet = []

        console.log(translateArraySet);


        // if(translateArraySet[0] <= 0 && translateArraySet[0] > -20){
        //     console.log('scroll fix')

        //     translateArraySet[1] = 100
        //     translateArraySet[2] = 200
        //     translateArraySet[3] = 300
        //     matrixXYArraySet[1] = 0.552
        //     matrixXYArraySet[2] = 0.452
        //     matrixXYArraySet[3] = 0.352
        // }

        $('.introduction__text').children('p').each(function (idx) {

            let m = $(this).css('transform');
            let mt = m.substring(m.indexOf('(') + 1, m.indexOf(')')).split(',');
            let yt = m.substring(m.indexOf('translate(0px, '), m.indexOf(')')).split(',');
            scaleRetrieved = +mt[0]
            translateRetrieved = +yt[5]
            translateArrayCheck.push(translateRetrieved)




            let elemHeight = $(this).height() * scaleRetrieved
            console.log('elemHeight', elemHeight)

            let translateY = idx * 100 - scrollPercent;
            translateArraySet.push(translateY)

            let translateYFirst = translateArrayCheck[0]
            console.log('trans', translateYFirst)


            // let visibleElements = isScrolledIntoView(this)

            let docViewTop = $(window).scrollTop();
            let docViewBottom = docViewTop + $(window).height() - 100;
            let windowHeight = docViewBottom - docViewTop
            console.log('windowHeight', windowHeight)
            console.log('docViewBottom', docViewBottom);
            console.log('docViewTop', docViewTop);

            let upperFadePoint = docViewTop + $(window).height() - 350;

            if (idx == 0) {
                elemTopScrolled = $(this).offset().top
            }

            if (idx <= 3) {
                console.log('run')

                let elemTopVisb = windowHeight
                let elemTopScrolledVisb = $(this).offset().top
                let diffVisb = elemTopVisb - elemTopScrolledVisb
                let diffVisbFadeOut = upperFadePoint - elemTopScrolledVisb


                if (elemTopScrolledVisb >= upperFadePoint) {
                    opTextScroll = opTextScrollDefault + opacityFactor * diffVisb
                } else {
                    opTextScroll = 1 - opacityFactorFadeOut * diffVisbFadeOut
                }
                matrixXY = matrixXYDefault + scaleFactor * diffVisb
                matrixXYArraySet.push(matrixXY)
                // if(translateYFirst <= 0 && translateYFirst > -10){
                //     console.log('scroll fix')

                //     translateArraySet[1] = 100
                //     translateArraySet[2] = 200
                //     translateArraySet[3] = 300
                //     matrixXYArraySet[1] = 0.552
                //     matrixXYArraySet[2] = 0.452
                //     matrixXYArraySet[3] = 0.352
                // }


                $(this).css({
                    transform: 'translate(0%,' + translateArraySet[idx] + 'px) scale(' + matrixXYArraySet[idx] + ',' + matrixXYArraySet[idx] + ') translate3d(0px,0px,0px)',
                    opacity: opTextScroll
                });
                console.log(this)
                console.log('diffVisb', diffVisb)


                console.log(translateArraySet)

                // console.log('translateArray', translateArraySet)

                console.log('elemTopVisb', elemTopVisb)
                console.log('elemTopScrolledVisb', elemTopScrolledVisb)

            } else if (idx > 3) {
                console.log('run')

                let elemTopHidden = windowHeight
                let elemTopScrolledHidden = $(this).offset().top
                let diffHidden = elemTopHidden - elemTopScrolledHidden
                let diffHiddenFadeOut = upperFadePoint - elemTopScrolledHidden


                if (elemTopScrolledHidden >= upperFadePoint) {
                    opTextScroll = opTextScrollDefault + opacityFactor * diffHidden
                } else {
                    opTextScroll = 1 - opacityFactorFadeOut * diffHiddenFadeOut
                }
                matrixXY = matrixXYDefault + scaleFactor * diffHidden
                matrixXYArraySet.push(matrixXY)

                $(this).css({
                    transform: 'translate(0%,' + translateArraySet[idx] + 'px) scale(' + matrixXYArraySet[idx] + ',' + matrixXYArraySet[idx] + ') translate3d(0px,0px,0px)',
                    opacity: opTextScroll
                });
                console.log(this)
                console.log(translateArraySet[idx])
                console.log('diffHidden', diffHidden)

                console.log('elemTopHidden', elemTopHidden)
                console.log('elemTopScrolledHidden', elemTopScrolledHidden)
            }


        })

        let scrollHeightCurrent = $('.introduction__text .last').offset().top - 215 + 30
        console.log('scrollHeightCurrent', scrollHeightCurrent);
        console.log('scrollHeightInitial', scrollHeightInitial);

        let width = (scrollHeightInitial - scrollHeightCurrent) * 100 / scrollHeightInitial
        console.log('width', width);

        if (width > 100) {
            width = 100
            $('.tech').css('display', 'block')
        }
        $('.active .progress-line').css({
            width: '' + width + '%'
        })


        if ($('.tech').css('display') == 'block') {
            var offset2 = $(document).height();
            var lineHF = offset2 - $("#bottommark").position().top;
    
            console.log('offset2', offset2);
            console.log('lineHF', lineHF);
            var offset1 = $(document).height();
            var offset = $(window).scrollTop();
            var lineH = offset1 - $("#bottommark").position().top - offset;
            var lineHpart = lineHF/5;
            
            $('span').html(lineH);
                if (lineH > lineHpart*4) {
                    $("#animation").attr("src", "../assets/images/frames/1_frame.jpg");
                }
                if ((lineH < lineHpart*4) && (lineH > lineHpart*3)) {
                    $("#animation").attr("src", "../assets/images/frames/2_frame.jpg");
                }
                if ((lineH < lineHpart*3) && (lineH > lineHpart*2)) {
                    $("#animation").attr("src", "../assets/images/frames/3_frame.jpg");
                }
                if (lineH < lineHpart*2 && lineH > lineHpart*1) {
                    $("#animation").attr("src", "../assets/images/frames/4_frame.jpg");
                }
                if (lineH < lineHpart) {
                    $("#animation").attr("src", "../assets/images/frames/5_frame.jpg");
                }
        }
    })
    
    

    // function isInView(elem) {
    //     let docViewTop = $(window).scrollTop();
    //     let docViewBottom = docViewTop + $(window).height();
    //     let elemHeight = $(elem).height() * matrixXYSet

    //     const firstElemHeight = 68
    //     let topHeightDiff = (firstElemHeight - elemHeight) / 2
    //     let elemTop = $(elem).offset().top + translateYSet + topHeightDiff;
    //     let elemBottom = elemTop + elemHeight;

    //     return (elemTop <= docViewBottom);
    // }
    function isScrolledIntoView(elem) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height() + 50;
        let elemHeight = $(elem).height() * scaleRetrieved

        const firstElemHeight = 68
        let topHeightDiff = (firstElemHeight - elemHeight) / 2
        let elemTop = $(elem).offset().top + topHeightDiff;
        let elemBottom = elemTop + elemHeight;

        return (elemTop <= docViewBottom);



    }

})