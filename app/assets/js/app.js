var app = angular.module('buddybible', ['buddybible.services','buddybible.controllers', 'ngMaterial', 'ngMdIcons','mb-adaptive-backgrounds', 'ui.router', 'FBAngular']);

app.directive('userAvatar', function() {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
  };
});

app.config(function($mdIconProvider, $stateProvider, $urlRouterProvider) {
  
  $mdIconProvider
     .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("add"       , "./assets/svg/ic_add.svg"                  , 24)
      .icon("add_white"       , "./assets/svg/ic_add_white.svg"                  , 24)
      .icon("alarm"       , "./assets/svg/ic_alarm.svg"                  , 24)
      .icon("album"       , "./assets/svg/ic_album.svg"                  , 24)
      .icon("back"       , "./assets/svg/ic_arrow_back.svg"                  , 24)
      .icon("cancel"       , "./assets/svg/ic_clear.svg"                  , 24)
      .icon("check"       , "./assets/svg/ic_check.svg"                  , 24)
      .icon("edit"       , "./assets/svg/ic_edit.svg"                  , 24)
      .icon("eq"       , "./assets/svg/ic_hearing.svg"                  , 24)
      .icon("graphic_eq"       , "./assets/svg/ic_graphic_eq.svg"                  , 24)
      .icon("expand_less"       , "./assets/svg/ic_expand_less.svg"     , 24)
      .icon("expand_more"       , "./assets/svg/ic_expand_more.svg"     , 24)
      .icon("favorite"       , "./assets/svg/ic_favorite.svg"                  , 24)
      .icon("favorited_white"       , "./assets/svg/ic_favorite_white.svg"                  , 24)
      .icon("favorite_white"       , "./assets/svg/ic_favorite_border_white.svg"                  , 24)
      .icon("fullscreen"       , "./assets/svg/ic_fullscreen.svg"                  , 24)
      .icon("go-next"       , "./assets/svg/ic_go-next.svg"                  , 24)
      .icon("go-prev"       , "./assets/svg/ic_go-prev.svg"                  , 24)
      .icon("grid"       , "./assets/svg/ic_apps.svg"                  , 24)
      .icon("help"      , "./assets/svg/ic_help_outline.svg"                , 24)
      .icon("home"       , "./assets/svg/ic_home.svg"                  , 24)
      .icon("info_outline"      , "./assets/svg/ic_info_outline.svg"        , 24)
      .icon("menu"       , "./assets/svg/ic_menu.svg"                  , 24)
      .icon("menu_white"       , "./assets/svg/ic_menu_white.svg"                  , 24)
      .icon("mic"       , "./assets/svg/ic_mic.svg"                  , 24)
      .icon("more_vert"       , "./assets/svg/ic_more_vert.svg"       , 24)      
      .icon("more_horiz"       , "./assets/svg/ic_more_horiz.svg"       , 24)      
      .icon("more_vert_white"       , "./assets/svg/ic_more_vert_white.svg"       , 24)      
      .icon("next"       , "./assets/svg/ic_next.svg"                  , 24)
      .icon("pause"       , "./assets/svg/ic_pause.svg"                  , 24)
      .icon("people_outline"       , "./assets/svg/ic_people_outline.svg" , 24)
      .icon("person"       , "./assets/svg/ic_perm_identity.svg" , 24)
      .icon("person_outline"       , "./assets/svg/ic_person_outline.svg" , 24)
      .icon("play"       , "./assets/svg/ic_play.svg"                  , 24)
      .icon("play_white"       , "./assets/svg/ic_play_white.svg"                  , 24)
      .icon("playlist"      , "./assets/svg/ic_list.svg"        , 24)
      .icon("playlist_white"      , "./assets/svg/ic_list_white.svg"        , 24)
      .icon("playlist_add"      , "./assets/svg/ic_playlist_add.svg"        , 24)
      .icon("previous"       , "./assets/svg/ic_previous.svg"                  , 24)
      .icon("radio"       , "./assets/svg/ic_radio.svg"                  , 24)
      .icon("rate"       , "./assets/svg/ic_rate_review.svg"                  , 24)
      .icon("repeat"       , "./assets/svg/ic_repeat.svg"                  , 24)
      .icon("repeat_one"       , "./assets/svg/ic_repeat_one.svg"        , 24)
      .icon("replay"       , "./assets/svg/ic_replay.svg"                  , 24)
      .icon("save"       , "./assets/svg/ic_save.svg"                  , 24)
      .icon("search"       , "./assets/svg/ic_search.svg"      , 24)
      .icon("search_white"       , "./assets/svg/ic_search_white.svg" , 24)
      .icon("settings"      , "./assets/svg/ic_settings.svg"        , 24)
      .icon("share"      , "./assets/svg/share.svg"                 , 24)
      .icon("share_white"      , "./assets/svg/ic_share_white.svg"                 , 24)
      .icon("shuffle"       , "./assets/svg/ic_shuffle.svg"                  , 24)
      .icon("sound_waves"       , "./assets/svg/ic_sound_waves.svg"       , 24)
      .icon("stop"       , "./assets/svg/ic_stop.svg"                  , 24)
      .icon("swap_horiz"       , "./assets/svg/ic_swap_horiz.svg"      , 24)
      .icon("swap_vert"       , "./assets/svg/ic_swap_vert.svg"      , 24)
      .icon("volume_down"       , "./assets/svg/ic_volume_down.svg"      , 24)
      .icon("volume_off"       , "./assets/svg/ic_volume_off.svg"      , 24)
      .icon("volume_up"       , "./assets/svg/ic_volume_up.svg"      , 24)
      
      .icon("google_plus", "./assets/svg/google_plus.svg"           , 512)
      .icon("hangouts"   , "./assets/svg/hangouts.svg"              , 512)
      .icon("logout"      , "./assets/svg/ic_lock_open.svg"      , 512)
      .icon("phone"      , "./assets/svg/phone.svg"                 , 512)
      .icon("twitter"    , "./assets/svg/twitter.svg"               , 512);

  $urlRouterProvider

    .when('/c?id', '/colours/:id')
    .when('/user/:id', '/colours/:id')

    .otherwise('/');

  $stateProvider
    .state('home', {
        url: "/",
        templateUrl: "./templates/albums.html"
    })
});

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
          .primaryPalette('purple')
          .accentPalette('orange')
          .warnPalette('light-green')

    $mdThemingProvider.theme('facebook')
          .primaryPalette('indigo')

    $mdThemingProvider.theme('twitter')
      .primaryPalette('light-blue')

    $mdThemingProvider.theme('google')
      .primaryPalette('red');

    $mdThemingProvider.theme('success')
      .primaryPalette('green');
    
    // This is the absolutely vital part, without this, changes will not cascade down through the DOM.
    $mdThemingProvider.alwaysWatchTheme(true);
  });

app.filter('highlight', function($sce) {
  return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span style="background-color: #CDDB71;">$1</span>')

    return $sce.trustAsHtml(text)
  }
});
app.filter('groupBy', ['$parse', function ($parse) {
    return function (list, group_by) {

        var filtered = [];
        var prev_item = null;
        var group_changed = false;
        // this is a new field which is added to each item where we append "_CHANGED"
        // to indicate a field change in the list
        //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
        var new_field = 'group_by_CHANGED';

        // loop through each item in the list
        angular.forEach(list, function (item) {

            group_changed = false;

            // if not the first item
            if (prev_item !== null) {

                // check if any of the group by field changed

                //force group_by into Array
                group_by = angular.isArray(group_by) ? group_by : [group_by];

                //check each group by parameter
                for (var i = 0, len = group_by.length; i < len; i++) {
                    if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                        group_changed = true;
                    }
                }


            }// otherwise we have the first item in the list which is new
            else {
                group_changed = true;
            }

            // if the group changed, then add a new field to the item
            // to indicate this
            if (group_changed) {
                item[new_field] = true;
            } else {
                item[new_field] = false;
            }

            filtered.push(item);
            prev_item = item;

        });

        return filtered;
    };
}]);