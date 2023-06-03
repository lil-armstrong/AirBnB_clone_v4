window.addEventListener('load', function () {
    //Task 4
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({}),
        success: function(response) {
            for (const r of response) {
                const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    // Task 3
    $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
        if $(data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });


    // Task 2
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
