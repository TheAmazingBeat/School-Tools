$('.hw-name').focusin(()=>{
   $('.options').addClass('visible');
})

$('.hw-name').focusout(()=>{
   $('.options').removeClass('visible');
})