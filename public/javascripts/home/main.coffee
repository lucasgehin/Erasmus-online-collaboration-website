


















# Navigation
    slide_time = 600
    decallage_y =  -$(".navbar").eq(0).height() - 1

    $("#docs-link").on "click", (e)-> 
        e.preventDefault()
        e.stopPropagation()
        target = $(".pinned-docs-section").offset().top + decallage_y
        
        $("html, body").animate {
            scrollTop: target
        },slide_time
    

    $("#projects-link").on "click",(e)-> 
        
        
        target = $(".projects-link-section").offset().top + decallage_y
        $("html,body").animate {
            scrollTop: target
        }, slide_time
        
    
    $("#users-link").on "click",(e)-> 
        
        target = $(".users-link-section").offset().top + decallage_y
        $("html,body").animate {
            scrollTop: target
        }, slide_time
    