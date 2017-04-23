var user, pc, userScore = 0, pcScore = 0;

$( document ).ready( function() {

  function checkWin() {
    // possible winning paths
    column1 = $('S1').hasClass('userTaken') &&
           $('S2').hasClass('userTaken') &&
           $('S3').hasClass('userTaken')
           ||
           $('S1').hasClass('pcTaken') &&
           $('S2').hasClass('pcTaken') &&
           $('S3').hasClass('pcTaken');

    column2 = $('S4').hasClass('userTaken') &&
           $('S5').hasClass('userTaken') &&
           $('S6').hasClass('userTaken')
           ||
           $('S4').hasClass('pcTaken') &&
           $('S5').hasClass('pcTaken') &&
           $('S6').hasClass('pcTaken');

    column3 = $('S7').hasClass('userTaken') &&
           $('S8').hasClass('userTaken') &&
           $('S9').hasClass('userTaken')
           ||
           $('S7').hasClass('pcTaken') &&
           $('S8').hasClass('pcTaken') &&
           $('S9').hasClass('pcTaken');

    row1 = $('S1').hasClass('userTaken') &&
              $('S4').hasClass('userTaken') &&
              $('S7').hasClass('userTaken')
              ||
              $('S1').hasClass('pcTaken') &&
              $('S4').hasClass('pcTaken') &&
              $('S7').hasClass('pcTaken');

    row2 = $('S2').hasClass('userTaken') &&
              $('S5').hasClass('userTaken') &&
              $('S8').hasClass('userTaken')
              ||
              $('S2').hasClass('pcTaken') &&
              $('S5').hasClass('pcTaken') &&
              $('S8').hasClass('pcTaken');

    row3 = $('S3').hasClass('userTaken') &&
              $('S6').hasClass('userTaken') &&
              $('S9').hasClass('userTaken')
              ||
              $('S3').hasClass('pcTaken') &&
              $('S6').hasClass('pcTaken') &&
              $('S9').hasClass('pcTaken');

    diag1 = $('S3').hasClass('userTaken') &&
            $('S5').hasClass('userTaken') &&
            $('S7').hasClass('userTaken')
            ||
            $('S3').hasClass('pcTaken') &&
            $('S5').hasClass('pcTaken') &&
            $('S7').hasClass('pcTaken');

    diag2 = $('S1').hasClass('userTaken') &&
            $('S5').hasClass('userTaken') &&
            $('S9').hasClass('userTaken')
            ||
            $('S1').hasClass('pcTaken') &&
            $('S5').hasClass('pcTaken') &&
            $('S9').hasClass('pcTaken');

    tie = $('S1').hasClass('off') &&
          $('S2').hasClass('off') &&
          $('S3').hasClass('off') &&
          $('S4').hasClass('off') &&
          $('S5').hasClass('off') &&
          $('S6').hasClass('off') &&
          $('S7').hasClass('off') &&
          $('S8').hasClass('off') &&
          $('S9').hasClass('off');

    switch( true ) { // checks for win or tie, if found resets game

      case column1:
        $('.A').addClass('victor');   score();   break;

      case column2:
        $('.B').addClass('victor');   score();   break;

      case column3:
        $('.C').addClass('victor');   score();   break;

      case row1:
        $('.D').addClass('victor');   score();   break;

      case row2:
        $('.E').addClass('victor');   score();   break;

      case row3:
        $('.F').addClass('victor');   score();   break;

      case diag1:
        $('.G').addClass('victor');   score();   break;

      case diag2:
        $('.H').addClass('victor');   score();   break;

      case tie:
         $('.square').addClass('tie');   break;

    };  // closes switch()

  }; // closes checkWin()

  function score() {

    if ( $( '.victor' ).hasClass( 'userTaken' ) ) {

      userScore+=1;

      $( 'human span' ).html( userScore );

      console.log( userScore );

    }

    else {

      pcScore+=1;

      $( 'pc span' ).html( pcScore );

      console.log( pcScore );

    }

  }

  function pcRandomSquare() { // pc selects random square until open, then marks it & checks for win or tie

    let R = Math.floor( Math.random() * 9 ) + 1; // assigns random number

    if ( !$( 'S' + R ).hasClass( 'off' ) ) { // if random square is open

      if ( pc === 'X' ) { // if X turn, marks X

        $( 'S' + R ).html( '<span>X</span>' );

        $( 'S' + R ).addClass( 'off pcTaken' );

        checkWin();

        if ( $('.square').hasClass('victor') || $('.square').hasClass('tie') ) {

          $('.square').addClass('removePointer');

          setTimeout( function () {

            reset();

            $('.square').removeClass('removePointer');

            if ( user === 'O') {

              $('#O').trigger('click');

            }

          }, 1000);

        }

      }

      if ( pc === 'O' ) { // if O turn, marks O

        $( 'S' + R ).html( '<span>O</span>' );

        $( 'S' + R ).addClass( 'off pcTaken' );

        checkWin();

        if ( $('.square').hasClass('victor') || $('.square').hasClass('tie') ) {

          $('.square').addClass('removePointer');

          setTimeout( function () {

            reset();

            $('.square').removeClass('removePointer');

          }, 1000);

        }

      } // closes inner-if

    }  // closes outer-if

    else { pcRandomSquare(); } // repeats process

  } // closes pcRandomSquare()

  function reset() { // resets game

    $( '.square' ).removeClass( 'off userTaken pcTaken victor tie' ).empty();

  };

  // assigns X/O to user/pc
  $( '#X' ).on( 'click', function assignsUserX() {

    user = 'X';   pc = 'O';

    $('#X').addClass('highlight1');

    $('#O').removeClass('highlight1');

    $('#O').addClass('highlight2');

    $('#X').removeClass('highlight2');

    reset();

  } );

  // assigns X/O to user/pc
  $( '#O' ).on( 'click', function assignsUserO() {

    user = 'O';   pc = 'X';

    $('#O').addClass('highlight1');

    $('#X').removeClass('highlight1');

    $('#X').addClass('highlight2');

    $('#O').removeClass('highlight2');

    reset();

    pcRandomSquare();

  } );

  // properly marks X or 0, checks for win or tie -- if none, prompts pc's turn
  $( '.square' ).on( 'click', function nextMove() {

    if ( user === 'X' ) {

      $( this ).html( '<span style="color: #0f609f">X</span>' ).addClass( 'off userTaken' );

      checkWin();

      if ( $('.square').hasClass('victor') || $('.square').hasClass('tie') ) {

        $('.square').addClass('removePointer');

        setTimeout( function () {

          reset();

          $('.square').removeClass('removePointer');

        }, 1000);

      }

      else { pcRandomSquare(); }

    }

    if ( user === 'O' ) {

      $( this ).html( '<span style="color: #0f609f">O</span>' ).addClass( 'off userTaken' );

      checkWin();

      if ( $('.square').hasClass('victor') || $('.square').hasClass('tie') ) {

        $('.square').addClass('removePointer');

        setTimeout( function () {

          reset();

          $('.square').removeClass('removePointer');

          $('#O').trigger('click');

        }, 1000);

      }

      else { pcRandomSquare(); }

    }

  } ); // closes nextMove()

} ); // closes document
