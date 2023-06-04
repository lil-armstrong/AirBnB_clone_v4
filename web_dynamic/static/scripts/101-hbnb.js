window.addEventListener('load', function () {
    //Task 100
    const statesObj = {};
    $('.locations li.s input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            statesObj[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete statesObj[$(this).data('id')];
        }
        $('.locations h4').text(Object.values(statesObj).join(', '));
    });

    const citiesObj = {};
    $('.locations li.c input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            citiesObj[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete citiesObj[$(this).data('id')];
        }
        $('.locations h4').text(Object.values(citiesObj).join(', '));
    });

    //Task 5
    const amenityObj = {};
    $('.amenities input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            amenityObj[$(this).attr('data-id')] = $(this).atrr('data-name');
        } else {
            delete amenityObj[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenityObj).join(', '));
    });

    //Task 4 and 101
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({}),
        success: function(response) {
            $('SECTION.places').empty()
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
        '<div class="reviews"><h2>',
        `<span id="${r.id}n" class="treview">Reviews</span>`,
        `<span id="${r.id}" onclick="showReviews(this)">Show</span></h2>`,
            `<ul id="${r.id}r"></ul>`,
            '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    function showReviews (obj) {
      if (obj === undefined) {
        return;
      }
      if (obj.textContent === 'Show') {
        obj.textContent = 'Hide';
        $.get(`http://0.0.0.0:5001/api/v1/places/${obj.id}/reviews`, (data, textStatus) => {
          if (textStatus === 'success') {
            $(`#${obj.id}n`).html(data.length + ' Reviews');
            for (const review of data) {
              printReview(review, obj);
            }
          }
        });
      } else {
        obj.textContent = 'Show';
        $(`#${obj.id}n`).html('Reviews');
        $(`#${obj.id}r`).empty();
      }
    }

    function printReview (review, obj) {
      const date = new Date(review.created_at);
      const month = date.toLocaleString('en', { month: 'long' });
      const day = dateOrdinal(date.getDate());

      if (review.user_id) {
        $.get(`http://0.0.0.0:5001/api/v1/users/${review.user_id}`, (data, textStatus) => {
          if (textStatus === 'success') {
            $(`#${obj.id}r`).append(
              `<li><h3>From ${data.first_name} ${data.last_name} the ${day + ' ' + month + ' ' + date.getFullYear()}</h3>
              <p>${review.text}</p>
              </li>`);
          }
        });
      }
    }

    function dateOrdinal (dom) {
      if (dom === 31 || dom === 21 || dom === 1) return dom + 'st';
      else if (dom === 22 || dom === 2) return dom + 'nd';
      else if (dom === 23 || dom === 3) return dom + 'rd';
      else return dom + 'th';
    }

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
