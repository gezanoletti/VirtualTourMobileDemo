// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

	start();

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
  //      var parentElement = document.getElementById('deviceready');
  //      var listeningElement = parentElement.querySelector('.listening');
  //      var receivedElement = parentElement.querySelector('.received');
  //      listeningElement.setAttribute('style', 'display:none;');
		//receivedElement.setAttribute('style', 'display:block;');

		console.log("onDeviceReady()");
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
		console.log("onPause()");
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
		console.log("onResume()");
	};

	function start() {
		var panos = [
			{
				url: 'Bryce-Canyon-National-Park-Mark-Doliner.jpg',
				desc: 'Bryce Canyon National Park <b>&copy; Mark Doliner</b>',
				target: {
					longitude: 3.848,
					latitude: -0.244
				}
			}, {
				url: 'Bryce-Canyon-By-Jess-Beauchemin.jpg',
				desc: 'Bryce Canyon National Park <b>&copy; Jess Beauchemin</b>',
				target: {
					longitude: 3.715,
					latitude: 0.574
				}
			}
		];

		var viewer = new PhotoSphereViewer({
			container: 'viewer',
			panorama: panos[0].url,
			caption: panos[0].desc,
			loading_img: 'assets/photosphere-logo.gif',
			longitude_range: [-7 * Math.PI / 8, 7 * Math.PI / 8],
			latitude_range: [-3 * Math.PI / 4, 3 * Math.PI / 4],
			anim_speed: '-2rpm',
			default_fov: 50,
			fisheye: true,
			move_speed: 1.1,
			time_anim: false,
			navbar: [
				'autorotate',
				'zoom',
				'markers',
				'caption',
				'fullscreen'
			],
			markers: (function () {
				var a = [];

				for (var i = 0; i < Math.PI * 2; i += Math.PI / 4) {
					for (var j = -Math.PI / 2 + Math.PI / 4; j < Math.PI / 2; j += Math.PI / 4) {
						a.push({
							id: '#' + a.length,
							tooltip: '#' + a.length,
							latitude: j,
							longitude: i,
							image: 'assets/pin1.png',
							width: 32,
							height: 32,
							anchor: 'bottom center',
							data: {
								deletable: true
							}
						});
					}
				}

				a.push({
					id: 'lorem',
					tooltip: {
						content: 'Lorem ipsum dolor ist amet et consecturo.',
						position: 'bottom right'
					},
					content: document.getElementById('pin-content').innerHTML,
					latitude: 0,
					longitude: 0,
					image: 'assets/pin2.png',
					width: 32,
					height: 32,
					anchor: 'bottom center'
				});

				return a;
			}())
		});

		viewer.on('select-marker', function (marker, dblclick) {
			viewer.clearMarkers();
			viewer.setPanorama(panos[1].url, panos[1].target, true)
				.then(function () {
					viewer.setCaption(panos[1].desc);
				});
		});
	}
} )();