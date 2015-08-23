var app = angular.module('buddybible', ['buddybible.services','buddybible.controllers', 'ngMaterial', 'ngMdIcons','mb-adaptive-backgrounds', 'ui.router', 'FBAngular'])

app.config(function($mdIconProvider, $stateProvider, $urlRouterProvider) {
  
  $mdIconProvider
     .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("add"       , "./assets/svg/ic_add.svg"                  , 24)
      .icon("add_white"       , "./assets/svg/ic_add_white.svg"                  , 24)
      .icon("alarm"       , "./assets/svg/ic_alarm.svg"                  , 24)
      .icon("album"       , "./assets/svg/ic_album.svg"                  , 24)
      .icon("back"       , "./assets/svg/ic_arrow_back.svg"                  , 24)
      .icon("cancel"       , "./assets/svg/ic_clear.svg"                  , 24)
      .icon("cast"       , "./assets/svg/ic_cast.svg"                  , 24)
      .icon("check"       , "./assets/svg/ic_check.svg"                  , 24)
      .icon("colorize"       , "./assets/svg/ic_colorize.svg"           , 24)
      .icon("edit"       , "./assets/svg/ic_edit.svg"                  , 24)
      .icon("eq"       , "./assets/svg/ic_hearing.svg"                  , 24)
      .icon("expand_less"       , "./assets/svg/ic_expand_less.svg"     , 24)
      .icon("expand_more"       , "./assets/svg/ic_expand_more.svg"     , 24)
      .icon("favorite"       , "./assets/svg/ic_favorite.svg"                  , 24)
      .icon("favorited_white"       , "./assets/svg/ic_favorite_white.svg"                  , 24)
      .icon("favorite_white"       , "./assets/svg/ic_favorite_border_white.svg"                  , 24)
      .icon("fullscreen"       , "./assets/svg/ic_fullscreen.svg"                  , 24)
      .icon("fullscreen_exit"       , "./assets/svg/ic_fullscreen_exit.svg"                  , 24)
      .icon("go-next"       , "./assets/svg/ic_go-next.svg"                  , 24)
      .icon("go-prev"       , "./assets/svg/ic_go-prev.svg"                  , 24)
      .icon("graphic_eq"       , "./assets/svg/ic_graphic_eq.svg"                  , 24)
      .icon("grid"       , "./assets/svg/ic_apps.svg"                  , 24)
      .icon("help"      , "./assets/svg/ic_help_outline.svg"                , 24)
      .icon("highlight"       , "./assets/svg/ic_highlight.svg"           , 24)
      .icon("home"       , "./assets/svg/ic_home.svg"                  , 24)
      .icon("info_outline"      , "./assets/svg/ic_info_outline.svg"        , 24)
      .icon("menu"       , "./assets/svg/ic_menu.svg"                  , 24)
      .icon("menu_white"       , "./assets/svg/ic_menu_white.svg"                  , 24)
      .icon("mic"       , "./assets/svg/ic_mic.svg"                  , 24)
      .icon("mic_none"       , "./assets/svg/ic_mic_none.svg"                  , 24)
      .icon("mic_off"       , "./assets/svg/ic_mic_off.svg"                  , 24)
      .icon("more_vert"       , "./assets/svg/ic_more_vert.svg"       , 24)      
      .icon("more_horiz"       , "./assets/svg/ic_more_horiz.svg"       , 24)      
      .icon("more_vert_white"       , "./assets/svg/ic_more_vert_white.svg"       , 24)      
      .icon("next"       , "./assets/svg/ic_next.svg"                  , 24)
      .icon("pause"       , "./assets/svg/ic_pause.svg"                  , 24)
      .icon("people_outline"       , "./assets/svg/ic_people_outline.svg" , 24)
      .icon("person"       , "./assets/svg/ic_perm_identity.svg" , 24)
      .icon("person_outline"       , "./assets/svg/ic_person_outline.svg" , 24)
      .icon("playlist"      , "./assets/svg/ic_list.svg"        , 24)
      .icon("playlist_white"      , "./assets/svg/ic_list_white.svg"        , 24)
      .icon("playlist_add"      , "./assets/svg/ic_playlist_add.svg"        , 24)
      .icon("previous"       , "./assets/svg/ic_previous.svg"                  , 24)
      .icon("reader"       , "./assets/svg/ic_screen_reader.svg"                  , 24)
      .icon("rate"       , "./assets/svg/ic_star_border.svg"                  , 24)
      .icon("remove"       , "./assets/svg/ic_remove.svg"                  , 24)
      .icon("save"       , "./assets/svg/ic_save.svg"                  , 24)
      .icon("search"       , "./assets/svg/ic_search.svg"      , 24)
      .icon("search_white"       , "./assets/svg/ic_search_white.svg" , 24)
      .icon("settings"      , "./assets/svg/ic_settings.svg"        , 24)
      .icon("share"      , "./assets/svg/share.svg"                 , 24)
      .icon("share_white"      , "./assets/svg/ic_share_white.svg"                 , 24)
      .icon("shuffle"       , "./assets/svg/ic_shuffle.svg"                  , 24)
      .icon("stories"       , "./assets/svg/ic_stories.svg"       , 24)
      .icon("stop"       , "./assets/svg/ic_stop.svg"                  , 24)
      .icon("swap_horiz"       , "./assets/svg/ic_swap_horiz.svg"      , 24)
      .icon("swap_vert"       , "./assets/svg/ic_swap_vert.svg"      , 24)
      .icon("verse_view"       , "./assets/svg/ic_verseview.svg"      , 24)
      .icon("volume_down"       , "./assets/svg/ic_volume_down.svg"      , 24)
      .icon("volume_off"       , "./assets/svg/ic_volume_off.svg"      , 24)
      .icon("volume_up"       , "./assets/svg/ic_volume_up.svg"      , 24);

  $urlRouterProvider

  .otherwise('/');

  $stateProvider
    .state('home', {
        url: "/",
        templateUrl: "./templates/home.html"
    })
    .state('bible', {
        url: "/bible",
        controller: "bibleCtrl",
        templateUrl: "./templates/bible.html"
    })
    .state('collections', {
        url: "/collections",
        controller: "collectionsCtrl",
        templateUrl: "./templates/collections.html"
    })
    .state('subscriptions', {
        url: "/subscriptions",
        controller: "subscriptionsCtrl",
        templateUrl: "./templates/subscriptions.html"
    })
    .state('resolutions', {
        url: "/resolutions",
        controller: "resolutionsCtrl",
        templateUrl: "./templates/resolutions.html"
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