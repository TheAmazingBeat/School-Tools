$('.hw-name').focus(()=>{
   $('.options').addClass('visible');

   $('.hw-date').focusin(()=>{
      $('.options').addClass('visible');
   })
   $('.hw-type').focusin(()=>{
      $('.options').addClass('visible');
   })
})

$('.hw-name').blur(()=>{
   $('.options').removeClass('visible');

   $('.hw-date').blur(() => {
     $('.options').removeClass('visible');
   });
   $('.hw-type').blur(() => {
     $('.options').removeClass('visible');
   });
})