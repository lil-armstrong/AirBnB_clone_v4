window.addEventListener('load', function () {
  const Ids = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      Ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete Ids[$(this).attr('data-id')];
    }

    if (Object.keys(Ids).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(Ids).join(', '));
    }
  });
});
